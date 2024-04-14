const { window, StatusBarAlignment, commands, workspace, ConfigurationTarget, QuickPickItemKind, Uri, ProgressLocation } = require('vscode')
const path = require('path')
const { mkdirSync, writeFileSync, existsSync, unlinkSync, rmdirSync } = require('fs')
const ModMetaData = require('./definitions/mod_meta_data/mod_meta_data')
const { CONSTANTS } = require('./constants')
const { execFile } = require('child_process')
const { readdirSync } = require('fs')
const FileHandler = require('./data/file-handler')

module.exports = class Command {
    constructor(client) {
        this.client = client

        this.winrarPath = path.resolve(process.env.ProgramFiles, 'winrar/winrar.exe')
    }

    openConfiguration() {
        commands.registerCommand('soase2-plugin-open-menu', async () => {
            this.showQuickpicks(
                [
                    {
                        label: '$(wrench) Validate Files',
                        detail: 'Select to validate all the files in current directory',
                    },
                    {
                        label: '$(file-directory) Change Workspace',
                        detail: 'Change the directory from where the validation will be performed.',
                    },
                    {
                        label: '$(game) Create mod',
                        detail: 'Create a mod directory along with its metadata',
                    },
                    {
                        label: '',
                        kind: QuickPickItemKind.Separator,
                    },
                    {
                        label: '$(fold-up) Zip scenario file',
                        detail: 'Zips typed scenario in the scenarios folder',
                    },
                    {
                        label: '$(fold-down) Un-zip scenario file',
                        detail: 'Un-zips typed scenario in the scenarios folder',
                    },
                    {
                        label: '',
                        kind: QuickPickItemKind.Separator,
                    },
                    {
                        label: '$(gear) Sins 2 - Configuration',
                        detail: 'Opens the Sins 2 settings.json file',
                    },
                ],
                (option, arr) => {
                    switch (option) {
                        case arr[0].label: {
                            commands.executeCommand('soase2-plugin.validateFilesButton')
                            break
                        }
                        case arr[1].label: {
                            commands.executeCommand('soase2-plugin.changeWorkspace')
                            break
                        }
                        case arr[2].label: {
                            commands.executeCommand('soase2-plugin.create-mod')
                            break
                        }
                        case arr[4].label: {
                            commands.executeCommand('soase2-plugin.zip-scenario')
                            break
                        }
                        case arr[5].label: {
                            commands.executeCommand('soase2-plugin.unzip-scenario')
                            break
                        }
                        case arr[7].label: {
                            const settingsPath = path.resolve(process.env.LOCALAPPDATA, 'sins2/settings/settings.json')
                            workspace.openTextDocument(Uri.parse(settingsPath).fsPath).then((e) => window.showTextDocument(e))
                            break
                        }
                        default: {
                        }
                    }
                }
            )
        })
    }

    async showInput(placeholder, callback) {
        const value = await window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: placeholder,
            validateInput: (e) => (CONSTANTS.folderRegex.test(e) ? null : 'Invalid name'),
        })
        if (value && value.trim() !== '') {
            return callback(value)
        }
    }

    async getAvaliableScenarioQuickpicks() {
        const quickpicks = []
        const scenarios = new FileHandler(await this.getInstallationFolder())
            .readEntities(['scenarios/*.scenario'])
            .map((e) => {
                return { label: e?.name, detail: e?.entityUri }
            })
            .sort()

        for (const scenario of scenarios) {
            quickpicks.push({ label: scenario.label, detail: scenario.detail })
        }
        return quickpicks
    }

    zipScenarioCommand(commandName) {
        commands.registerCommand(commandName, async () => {
            this.showQuickpicks(await this.getAvaliableScenarioQuickpicks(), async (option) => await this.manageScenario(option, { mode: 'zip' }))
        })
    }

    unzipScenarioCommand(commandName) {
        commands.registerCommand(commandName, async () => {
            this.showQuickpicks(await this.getAvaliableScenarioQuickpicks(), async (option) => await this.manageScenario(option, { mode: 'unzip' }))
        })
    }

    isValidGamePath(basePath) {
        if (path.basename(basePath).startsWith('SinsII')) return true
        if (basePath !== '' && readdirSync(basePath).some((e) => e.includes('.mod_meta_data'))) return true
        return false
    }

    validateFilesCommand(commandName) {
        const button = window.createStatusBarItem(StatusBarAlignment.Left)

        const states = {
            idle: '$(wrench) Validate Files',
            loading: '$(loading~spin) Validating...',
        }

        button.text = states.idle
        button.tooltip = 'Press to validate all files in current directory'
        button.command = commandName
        button.show()

        let isValidating = false
        commands.registerCommand(commandName, async () => {
            if (!this.isValidGamePath(await this.getInstallationFolder())) {
                const selection = await window.showErrorMessage('Could not locate mod metadata. Would you like to change path?', 'Set Folder', 'Cancel')

                if (selection === 'Set Folder') {
                    commands.executeCommand('soase2-plugin.changeWorkspace')
                    return
                }
                return
            }

            if (isValidating) return
            try {
                button.text = states.loading
                isValidating = true
                const results = await this.client.sendRequest('function/validateFiles')
                button.text = states.idle
                isValidating = false
                return results
            } catch (err) {
                this.client.debug('Response failed: ', err)
            }
        })
        return {
            command: button,
            exec: async () => {
                await commands.executeCommand(commandName)
            },
        }
    }

    async showSelectFolderDialog({ title: title, openLabel: openLabel, showRootInformation: showRootInformation = false } = {}, callback) {
        if (showRootInformation) window.showInformationMessage('Ensure that you select the root directory of the game')
        await window
            .showOpenDialog({
                title: title,
                openLabel: openLabel,
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
            })
            .then(async (dir) => {
                if (!dir && !dir[0]) window.showErrorMessage('Error in setting the path')
                return await callback(dir[0].path.substring(1))
            })
    }

    async manageScenario(zip, { mode: mode }) {
        const gamePath = await this.getInstallationFolder()

        if (!existsSync(this.winrarPath)) {
            window.showErrorMessage('Make sure you have winrar installed on your computer')
            return
        }

        if (!existsSync(path.resolve(gamePath, 'scenarios'))) {
            window.showErrorMessage('Scenarios not found')
            return
        }
        const zipPath = path.resolve(gamePath, 'scenarios', zip)

        if (!existsSync(`${zipPath}.scenario`)) {
            window.showErrorMessage('Scenario not found')
            return
        }

        if (mode === 'unzip') {
            try {
                mkdirSync(path.join(gamePath, 'scenarios', zip))
                execFile(this.winrarPath, ['e', '-ep1', '-inul', '-o', `${zipPath}.scenario`, `${zipPath}/`], (err) => (err ? this.client.debug(err) : null))
            } catch (e) {
                window.showErrorMessage(`Scenario: ${zipPath}, already exists`)
            }
        } else {
            try {
                if (!existsSync(zipPath)) {
                    window.showErrorMessage('Cannot zip the selected scenario. Try unzipping it first')
                    return
                }
                execFile(this.winrarPath, ['a', '-afzip', '-m0', '-inul', '-ep1', `${zipPath}.scenario`, `${zipPath}\\*`], (err) => (err ? this.client.debug(err) : null)).on('exit', () => {
                    readdirSync(zipPath)?.map((e) => unlinkSync(path.resolve(zipPath, e)))
                    rmdirSync(zipPath)
                })
            } catch (e) {
                window.showErrorMessage(`Packing scenario failed: ${e.message}`)
            }
        }
    }

    async getInstallationFolder() {
        return await workspace.getConfiguration('soase2-plugin').get('cache.game')
    }

    async setWorkspace(dir) {
        return await workspace.getConfiguration('soase2-plugin').update(`cache.game`, dir, ConfigurationTarget.Global)
    }

    async updateWorkspaceAndCache(dir) {
        window.withProgress({ cancellable: false, location: ProgressLocation.Notification }, async (prog) => {
            prog.report({
                message: 'Reloading cache...',
            })
            await this.client.sendRequest('function/clearDiagnostics')
            await this.setWorkspace(dir)
            await this.client.sendRequest('function/clearCache')
            window.showInformationMessage(`Workspace set to: '${dir}'. Happy modding! 🙂`)
        })
    }

    showQuickpicks(picks, callback) {
        window
            .showQuickPick(picks, {
                ignoreFocusOut: true,
                placeHolder: 'Type your option...',
            })
            .then((option) => callback(option.label, picks))
    }

    changeWorkspaceCommand(commandName) {
        return commands.registerCommand(commandName, async () => {
            this.showSelectFolderDialog({ showRootInformation: true }, async (dir) => {
                if (!this.isValidGamePath(dir)) {
                    window.showErrorMessage('Could not locate mod metadata')
                    return
                }

                await this.updateWorkspaceAndCache(dir)
            })
        })
    }

    writeModMetaData(filePath, folderName) {
        writeFileSync(path.resolve(filePath, '.mod_meta_data'), JSON.stringify(ModMetaData.boilerPlate(folderName), null, 4))
    }

    showModCreatedDialog(folderPath) {
        window.showInformationMessage(`Mod created: ${folderPath}, would you like to set it as the current working folder?`, 'Yes', 'No', 'Reveal in explorer').then(async (e) => {
            switch (e) {
                case 'Yes': {
                    await this.updateWorkspaceAndCache(folderPath)
                    window.showInformationMessage('Happy modding! 🙂')
                    break
                }
                case 'Reveal in explorer': {
                    commands.executeCommand('revealFileInOS', Uri.file(folderPath))
                    break
                }
                default: {
                }
            }
        })
    }

    generateImage(filePath, fileName, base64) {
        writeFileSync(path.resolve(filePath, fileName), Buffer.from(base64, 'base64'))
    }

    generateBoilerModImages(filePath) {
        this.generateImage(filePath, `${path.basename(filePath)}_small.png`, CONSTANTS.mods.meta_data.small_logo)
        this.generateImage(filePath, `${path.basename(filePath)}_large.png`, CONSTANTS.mods.meta_data.large_logo)
    }

    createCustomDirMod(folderName) {
        this.showSelectFolderDialog({ title: 'Create a mod', openLabel: 'Save' }, async (dir) => {
            const customPath = path.join(dir, folderName)
            this.writeMod(customPath)
        })
    }

    writeMod(folderPath) {
        mkdirSync(folderPath)
        this.showModCreatedDialog(folderPath)
        this.writeModMetaData(folderPath, path.basename(folderPath))
        this.generateBoilerModImages(folderPath)
    }

    createLocalDirMod(modFolderName, localPath = path.resolve(process.env.LOCALAPPDATA, 'sins2', 'mods', modFolderName)) {
        if (existsSync(localPath)) {
            window.showErrorMessage('A mod with that name already exists in the local mod folder.')
            return
        }
        this.writeMod(localPath)
    }

    createModCommand(commandName) {
        return commands.registerCommand(commandName, async () => {
            await this.showInput('Enter mod folder name...', (value) => {
                this.showQuickpicks(
                    [
                        {
                            label: '$(root-folder) Local',
                            detail: "Installs the mod in the game's local mod directory",
                        },
                        {
                            label: '$(new-folder) Custom',
                            detail: 'Installs the mod in a custom location prompting a dialog',
                        },
                    ],
                    (option, arr) => {
                        switch (option) {
                            case arr[0].label: {
                                this.createLocalDirMod(value)
                                break
                            }
                            case arr[1].label: {
                                this.createCustomDirMod(value)
                                break
                            }
                        }
                    }
                )
            })
        })
    }
}
