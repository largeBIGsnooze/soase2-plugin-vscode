const {
    window,
    StatusBarAlignment,
    commands,
    workspace,
    ConfigurationTarget,
    QuickPickItemKind,
    Uri,
    ProgressLocation,
    MarkdownString,
} = require('vscode')
const path = require('path')
const fs = require('fs')
const ModMetaData = require('./definitions/mod_meta_data/mod_meta_data')
const { CONSTANTS } = require('./constants')
const { execFile } = require('child_process')
const { EntityReader } = require('./data/file_handler')
const Config = require('./utils/config')
const { base64images } = require('./utils/base64images')
module.exports = class Command {
    constructor(client) {
        this.client = client
        this.winrarPath = path.resolve(process.env.ProgramFiles, 'winrar/winrar.exe')
        this.sinsAppdataPath = path.resolve(process.env.LOCALAPPDATA, 'sins2')
        this.enabledModsPath = path.resolve(this.sinsAppdataPath, 'settings', '.enabled_mods')
    }

    openConfiguration(commandName) {
        return commands.registerCommand(commandName, async () => {
            this.showQuickpicks(
                [
                    {
                        label: '$(wrench) Validate Files',
                        detail: 'Select to validate all the files in current directory',
                    },
                    {
                        label: '$(file-directory) Change Mod workspace',
                        detail: 'Change the directory where the mod indexing will be performed.',
                    },
                    {
                        label: '$(folder) Change Vanilla installation location',
                        detail: 'Change the directory where the game is installed.',
                    },
                    {
                        label: '$(game) Create mod',
                        detail: 'Create a mod directory along with its metadata',
                    },
                    {
                        label: '$(extensions-view-icon) Enable/Disable Mods',
                        detail: 'Enable/Disable selected local Sins 2 mods',
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
                        case arr[0].label:
                            commands.executeCommand('soase2-plugin.validateFilesButton')
                            break

                        case arr[1].label:
                            commands.executeCommand('soase2-plugin.changeWorkspace')
                            break

                        case arr[2].label:
                            commands.executeCommand('soase2-plugin.changeVanillaFolder')
                            break

                        case arr[3].label:
                            commands.executeCommand('soase2-plugin.create-mod')
                            break

                        case arr[4].label:
                            commands.executeCommand('soase2-plugin.manage-mods')
                            break

                        case arr[6].label:
                            commands.executeCommand('soase2-plugin.zip-scenario')
                            break

                        case arr[7].label:
                            commands.executeCommand('soase2-plugin.unzip-scenario')
                            break

                        case arr[9].label:
                            const settingsPath = path.resolve(this.sinsAppdataPath, 'settings', 'settings.json')
                            workspace.openTextDocument(Uri.parse(settingsPath).fsPath).then((e) => window.showTextDocument(e))
                            break

                        default:
                            break
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

    async getAvaliableScenarioFoldersQuickpicks() {
        return new EntityReader(await Config.getModFolder())
            .read(['scenarios/*'], { directories: true })
            .map((e) => ({ label: e.basename, detail: e.uri }))
    }

    async getAvaliableScenarioQuickpicks() {
        return new EntityReader(await Config.getModFolder()).read(['scenarios/*.scenario']).map((e) => ({ label: e.basename, detail: e.uri }))
    }

    zipScenarioCommand(commandName) {
        return commands.registerCommand(commandName, async () => {
            this.showQuickpicks(
                await this.getAvaliableScenarioFoldersQuickpicks(),
                async (option) =>
                    await this.manageScenario(option, {
                        mode: 'zip',
                    })
            )
        })
    }

    unzipScenarioCommand(commandName) {
        return commands.registerCommand(commandName, async () => {
            this.showQuickpicks(
                await this.getAvaliableScenarioQuickpicks(),
                async (option) =>
                    await this.manageScenario(option, {
                        mode: 'unzip',
                    })
            )
        })
    }

    static async showModFolderSelectionIfInvalid() {
        if (!Config.isValidModPath(await Config.getModFolder())) {
            const selection = await window.showErrorMessage('Could not locate mod metadata. Would you like to change path?', 'Set Folder', 'Cancel')

            if (selection === 'Set Folder') {
                commands.executeCommand('soase2-plugin.changeWorkspace')
                return
            }
        }
    }

    statusBarSettings(commandName) {
        const item = window.createStatusBarItem(StatusBarAlignment.Left)

        item.text = '$(game) Sins of a Solar Empire 2'
        item.tooltip = new MarkdownString(`Show \`${CONSTANTS.source}\` commands`)
        item.command = commandName
        item.show()

        return commands.registerCommand(commandName, async () => commands.executeCommand('soase2-plugin-open-menu'))
    }

    validateFilesCommand(commandName) {
        const button = window.createStatusBarItem(StatusBarAlignment.Left)

        const states = {
            idle: '$(wrench) Validate Files',
            loading: '$(loading~spin) Validating...',
        }

        button.text = states.idle

        let isValidating = false
        const command = commands.registerCommand(commandName, async () => {
            await Command.showModFolderSelectionIfInvalid()

            if (isValidating) return
            try {
                button.text = states.loading
                isValidating = true
                button.show()
                const results = await this.client.sendRequest('function/validateFiles')
                button.text = states.idle
                isValidating = false
                button.hide()
                return results
            } catch (err) {
                this.client.debug('Response failed: ', err)
            }
        })
        return {
            command: command,
            exec: async () => {
                await commands.executeCommand(commandName)
            },
        }
    }

    async showSelectFolderDialog(callback, { title: title, openLabel: openLabel } = {}) {
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

    manageMod(enabledMods, modFolder, modData, label) {
        if (!fs.existsSync(modData)) return

        if (!enabledMods.enabled_mods.some((e) => e.folder_name === modFolder)) {
            modData = JSON.parse(fs.readFileSync(modData, 'utf-8'))

            enabledMods.enabled_mods.push({
                type: 0,
                folder_name: modFolder,
                display_name: modData.display_name,
                display_version: modData.display_version,
            })
            window.showInformationMessage('Mod enabled: ' + label)
        } else {
            enabledMods.enabled_mods.splice(
                enabledMods.enabled_mods.findIndex((e) => e === modFolder),
                1
            )
            window.showInformationMessage('Mod disabled: ' + label)
        }
        fs.writeFileSync(this.enabledModsPath, JSON.stringify(enabledMods, null, 2))
    }

    manageMods(commandName) {
        return commands.registerCommand(commandName, async () => {
            const enabledModsFile = JSON.parse(fs.readFileSync(this.enabledModsPath, 'utf-8'))
            const picks = new EntityReader(path.resolve(this.sinsAppdataPath, 'mods'))
                .read(['*'], { directories: true, lower: false })
                .flatMap((e) => {
                    const isEnabled = enabledModsFile.enabled_mods.some((y) => y.folder_name === e.basename)
                    const displayName = JSON.parse(
                        fs.readFileSync(path.resolve(path.normalize(e.uri, '../'), '.mod_meta_data'), 'utf-8')
                    ).display_name

                    return [
                        {
                            label: displayName || e.basename,
                            detail: e.uri,
                            description: isEnabled ? 'Mod Enabled' : '',
                            hidden: e.basename,
                        },
                        {
                            label: '',
                            kind: QuickPickItemKind.Separator,
                        },
                    ]
                })

            this.showQuickpicks(picks, (label, _, hidden) => {
                try {
                    const metadataPath = path.resolve(this.sinsAppdataPath, 'mods', hidden, '.mod_meta_data')
                    this.manageMod(enabledModsFile, hidden, metadataPath, label)
                } catch {}
            })
        })
    }

    async manageScenario(zip, { mode: mode }) {
        const gamePath = await Config.getModFolder()

        if (!fs.existsSync(this.winrarPath)) {
            window.showErrorMessage('Make sure you have winrar installed on your computer')
            return
        }

        if (!fs.existsSync(path.resolve(gamePath, 'scenarios'))) {
            window.showErrorMessage('Scenarios not found')
            return
        }
        const zipPath = path.resolve(gamePath, 'scenarios', zip)

        if (mode === 'unzip') {
            if (!fs.existsSync(`${zipPath}.scenario`)) {
                window.showErrorMessage('Scenario not found')
                return
            }
            try {
                fs.mkdirSync(path.join(gamePath, 'scenarios', zip))
                execFile(this.winrarPath, ['e', '-ep1', '-inul', '-o', `${zipPath}.scenario`, `${zipPath}/`], (err) =>
                    err ? this.client.debug(err) : null
                ).on('exit', () => fs.unlinkSync(`${zipPath}.scenario`))
                window.showInformationMessage(`Scenario unzipped at: ${zipPath}`)
            } catch (e) {
                window.showErrorMessage(`Scenario: ${zipPath}, already exists`)
            }
        } else {
            try {
                if (!fs.existsSync(zipPath)) {
                    window.showErrorMessage('Cannot zip the selected scenario. Try unzipping it first')
                    return
                }
                execFile(this.winrarPath, ['a', '-afzip', '-m0', '-inul', '-ep1', `${zipPath}.scenario`, `${zipPath}\\*`], (err) =>
                    err ? this.client.debug(err) : null
                ).on('exit', () => {
                    fs.readdirSync(zipPath)?.map((e) => fs.unlinkSync(path.resolve(zipPath, e)))
                    fs.rmdirSync(zipPath)
                })
                window.showInformationMessage(`Scenario zipped: ${zipPath}`)
            } catch (e) {
                window.showErrorMessage(`Packing scenario failed: ${e.message}`)
            }
        }
    }

    async updateWorkspaceAndCache(dir) {
        await window.withProgress(
            {
                cancellable: false,
                location: ProgressLocation.Notification,
            },
            async (prog) => {
                prog.report({ message: 'Reloading cache...' })
                await this.client.sendRequest('function/clearDiagnostics')
                await Config.setFolder(dir, 'mod', ConfigurationTarget.Global)
                await this.client.sendRequest('function/clearCache')
            }
        )
        const selection = await window.showInformationMessage(`Workspace set to: '${dir}', would you like to switch?`, 'Yes', 'Cancel')

        if (selection === 'Yes') {
            commands.executeCommand('vscode.openFolder', Uri.file(dir))
        }
    }

    showQuickpicks(picks, callback) {
        window
            .showQuickPick(picks, {
                // ignoreFocusOut: true,
                placeHolder: 'Type your option...',
            })
            .then((option) => callback(option?.label, picks, option?.hidden))
    }
    changeVanillaFolderCommand(commandName) {
        return commands.registerCommand(commandName, async () => {
            this.showSelectFolderDialog(async (dir) => {
                await Config.setFolder(dir, 'vanilla', ConfigurationTarget.Global)
                window
                    .showInformationMessage(
                        `Vanilla location set to: '${dir}'. Reload VS Code for it to take effect, do it now?`,
                        'Restart',
                        'Cancel'
                    )
                    .then((option) => {
                        if (option === 'Restart') {
                            commands.executeCommand('workbench.action.reloadWindow')
                        }
                    })
            })
        })
    }

    changeWorkspaceCommand(commandName) {
        return commands.registerCommand(commandName, async () => {
            window.showInformationMessage('Ensure that you select the root directory of the game')
            this.showSelectFolderDialog(async (dir) => {
                if (!Config.isValidModPath(dir)) {
                    window.showWarningMessage('Could not locate mod metadata. Ensure it is the root directory')
                    return
                }
                await this.updateWorkspaceAndCache(dir)
            })
        })
    }

    writeModData(filePath, folderName) {
        fs.mkdirSync(path.resolve(filePath, 'entities'))
        fs.writeFileSync(path.resolve(filePath, '.mod_meta_data'), JSON.stringify(ModMetaData.boilerPlate(folderName), null, 4))
    }

    showModCreatedDialog(folderPath) {
        window
            .showInformationMessage(`Mod created: '${folderPath}', would you like to set it as the current workspace?`, 'Yes', 'Cancel')
            .then(async (e) => {
                if (e === 'Yes') {
                    await this.updateWorkspaceAndCache(folderPath)
                }
            })
    }

    generateBoilerModImages(filePath) {
        fs.writeFileSync(path.resolve(filePath, `${path.basename(filePath)}_small.png`), Buffer.from(base64images[0], 'base64'))
        fs.writeFileSync(path.resolve(filePath, `${path.basename(filePath)}_large.png`), Buffer.from(base64images[1], 'base64'))
    }

    createCustomDirMod(folderName) {
        this.showSelectFolderDialog(
            async (dir) => {
                const customPath = path.join(dir, folderName)
                this.writeMod(customPath)
            },
            {
                title: 'Create a mod',
                openLabel: 'Save',
            }
        )
    }

    writeMod(folderPath) {
        fs.mkdirSync(folderPath)
        this.showModCreatedDialog(folderPath)
        this.writeModData(folderPath, path.basename(folderPath))
        this.generateBoilerModImages(folderPath)
    }

    createLocalDirMod(modFolderName, localPath = path.resolve(this.sinsAppdataPath, 'mods', modFolderName)) {
        if (fs.existsSync(localPath)) {
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
                            case arr[0].label:
                                this.createLocalDirMod(value)
                                break

                            case arr[1].label:
                                this.createCustomDirMod(value)
                                break
                        }
                    }
                )
            })
        })
    }
}
