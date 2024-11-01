const { workspace, window } = require('vscode')
const { LanguageClient, TransportKind } = require('vscode-languageclient/node')
const path = require('path')
const Command = require('./commands')
const api = require('./api')
const { CONSTANTS } = require('./constants')
const Config = require('./utils/config')
const Lsp = require('./lsp_server')

let client

const fileWatchers = [
    workspace.createFileSystemWatcher(
        '**/{brushes,colors,cursors,death_sequences,effects,entities,fonts,gdpr,gravity_well_props,gui,localized_text,meshes,mesh_materials,player_colors,player_icons,player_portraits,scenarios,shaders,skyboxes,sounds,texture_animations,uniforms,videos,welcome}/*'
    ),
]

async function activate(ctx) {
    const serverModule = ctx.asAbsolutePath(path.join('server', 'lsp_connection.js'))
    const serverOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: {
                execArgv: ['--inspect=6009'],
            },
        },
    }
    const clientOptions = {
        documentSelector: [
            {
                scheme: 'file',
                language: 'sins_of_a_solar_empire_ii',
            },
        ],
        synchronize: {
            fileEvents: fileWatchers,
        },
    }

    client = new LanguageClient('sins_of_a_solar_empire_ii', CONSTANTS.source, serverOptions, clientOptions)
    const command = new Command(client)

    client
        .start()
        .then(async () => {
            client.onRequest('cache/game_installation', () => Config.getWorkspaceFolder())
            client.onRequest('ignore/folders', () => Config.getIgnoredFolders())
            client.onRequest('ignore/extensions', () => Config.getIgnoredExtensions())
            client.onRequest('formatter/tabs', () => Config.getFormatterTabsAmount())
        })
        .catch((err) => this.client.debug(err))

    window.onDidChangeActiveTextEditor(async (editor) => {
        if (editor) {
            const fileText = editor.document.getText()
            await client.sendRequest('change/editor', {
                document: editor.document,
                fileText: fileText,
            })
        }
    })

    ctx.subscriptions.push(
        command.openConfiguration(),
        command.validateFilesCommand('soase2-plugin.validateFilesButton').command,
        command.changeWorkspaceCommand('soase2-plugin.changeWorkspace'),
        command.createModCommand('soase2-plugin.create-mod'),
        command.unzipScenarioCommand('soase2-plugin.unzip-scenario'),
        command.zipScenarioCommand('soase2-plugin.zip-scenario')
    )

    return api
}

function deactivate() {
    if (!client) return undefined
    return client.stop()
}

module.exports = {
    activate,
    deactivate,
}
