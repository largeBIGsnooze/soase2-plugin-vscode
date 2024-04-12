const { workspace } = require('vscode')
const { LanguageClient, TransportKind } = require('vscode-languageclient/node')
const path = require('path')
const { Log } = require('./utils/logger')
const Command = require('./commands')
const api = require('./api')
const { CONSTANTS } = require('./constants')

let client

const fileWatchers = [
    workspace.createFileSystemWatcher(
        '**/{brushes,colors,cursors,death_sequences,effects,entities,fonts,gdpr,gravity_well_props,gui,localized_text,gui,localized_text,meshes,mesh_materials,player_colors,player_icons,player_portraits,scenarios,shaders,skyboxes,sounds,texture_animations,uniforms,videos,welcome}/*'
    ),
]

async function activate(ctx) {
    const serverModule = ctx.asAbsolutePath(path.join('server', 'lsp-connection.js'))
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
            client.onRequest('cache/game_installation', () => workspace.getConfiguration('soase2-plugin').get('cache.game'))
            client.onRequest('ignore/folders', () => workspace.getConfiguration('soase2-plugin').get('folders.ignore'))
            client.onRequest('ignore/extensions', () => workspace.getConfiguration('soase2-plugin').get('extensions.ignore'))
            client.onRequest('formatter/tabs', () => workspace.getConfiguration('soase2-plugin').get('formatter.tabs'))
            client.onRequest('validation/language', () => workspace.getConfiguration('soase2-plugin').get('language'))
        })
        .catch((err) => Log.error(err))

    const openConfiguration = command.openConfiguration()

    const validateButton = command.validateFilesCommand('soase2-plugin.validateFilesButton')
    const changeWorkspace = command.changeWorkspaceCommand('soase2-plugin.changeWorkspace')
    const createMod = command.createModCommand('soase2-plugin.create-mod')
    const unzipScenario = command.unzipScenarioCommand('soase2-plugin.unzip-scenario')
    const zipScenario = command.zipScenarioCommand('soase2-plugin.zip-scenario')

    // setTimeout(() => {
    // 	validateButton.exec()
    // }, 2000)

    ctx.subscriptions.push(openConfiguration, validateButton.command, changeWorkspace, createMod, unzipScenario, zipScenario)

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
