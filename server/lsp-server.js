const onCompletionProvider = require('./providers/completion')
const onHoverProvider = require('./providers/hover')
//const onDefinitionProvider = require('./providers/definition')
const EntityDefinition = require('./definitions/entity_definition')
const onDocumentFormattingProvider = require('./providers/formatting')
const DiagnosticStorage = require('./data/diagnostic-storage')
const { Log } = require('./utils/logger')
const Parser = require('./parser')
const { CONSTANTS } = require('./constants')

module.exports = class Lsp {
    /**
     * Constructor
     * @param {options} options
     * @returns {Lsp} LspServer
     */
    static cache = {}
    constructor({ options: options }) {
        this.options = options

        this.entityDefinition = new EntityDefinition(this.options.languageService, this.options.schemaService)
        this.onCompletionProvider = new onCompletionProvider(this.options.languageService, this.options.schemaService)
        this.onHoverProvider = new onHoverProvider(this.options.languageService, this.options.schemaService, this.options.connection)
        //this.onDefinition = new onDefinitionProvider();
        this.onDocumentFormatting = new onDocumentFormattingProvider(this.options.connection)
    }
    /**
     * Returns data requested by the client
     */
    async getGameInstallationFolder() {
        return await this.options.connection.sendRequest(`cache/game_installation`).then((result) => result)
    }

    /**
     * Initializes the server's capabilities
     */
    initialize() {
        Log.info('Initializing server...')
        return { capabilities: this.options.capabilities }
    }

    async initialized() {
        let filesWithDiagnostics = []
        let results = {}
        results.gui = {}
        results.button_styles = {}
        results.label_styles = {}
        results.list_box_styles = {}
        results.text_entry_box_styles = {}
        results.drop_box_styles = {}
        results.reflect_box_styles = {}
        results.uniforms = {}
        results.effects = {}

        Object.keys(EntityDefinition.files).map((e, index) => {
            if (e.endsWith('.gui')) results.gui[index] = e
            else if (e.endsWith('.uniforms')) results.uniforms[index] = e
            else if (e.endsWith('.button_style')) results.button_styles[index] = e
            else if (e.endsWith('.label_style')) results.label_styles[index] = e
            else if (e.endsWith('.list_box_style')) results.list_box_styles[index] = e
            else if (e.endsWith('.drop_box_style')) results.drop_box_styles[index] = e
            else if (e.includes('shield_effect') || e.includes('beam_effect') || e.includes('exhaust_trail_effect')) results.effects[index] = e
            else if (e.endsWith('.reflect_box_style')) results.reflect_box_styles[index] = e
            else if (e.endsWith('.text_entry_box_style')) results.text_entry_box_styles[index] = e
            else results[index] = e
        })

        Log.info(`${CONSTANTS.source} initialized, version: ${CONSTANTS.version}`)
        Log.info('Operational files: ', JSON.stringify(results, null, 4))

        Lsp.cache = await require('./cache')(await this.getGameInstallationFolder())

        this.options.connection.onRequest(
            'function/validateFiles',
            async () => await new Parser(this.options.connection, this.options.languageService, this.options.schemaService, await this.getGameInstallationFolder(), { filesWithDiagnostics: filesWithDiagnostics }).validate().catch((e) => Log.error(e))
        )
        this.options.connection.onRequest('function/clearDiagnostics', async () => await Parser.clearDiagnostics(filesWithDiagnostics, this.options.connection))

        this.options.connection.onRequest('function/clearCache', async () => (Lsp.cache = await require('./cache')(await this.getGameInstallationFolder())))
    }

    /**
     * Validates currently opened text document
     * @param {*} params
     * @returns
     */
    async onDidChangeContent(params) {
        const text = params.document.getText()
        const uri = params.document.uri
        EntityDefinition.diagnostics = []

        if (text.trim().length === 0) new DiagnosticStorage(text, EntityDefinition.diagnostics).messages.invalidJSON()

        this.entityDefinition.init(
            {
                params: params,
                gameInstallationFolder: await this.getGameInstallationFolder(),
            },
            Lsp.cache
        )

        const diagnostics = await this.entityDefinition.jsonDoValidation(text, uri)

        return await this.options.connection.sendDiagnostics({
            uri: uri,
            diagnostics: [].concat(EntityDefinition.diagnostics, diagnostics),
        })
    }
}
