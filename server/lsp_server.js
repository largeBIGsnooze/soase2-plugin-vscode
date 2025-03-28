const onCompletionProvider = require('./providers/completion')
const onHoverProvider = require('./providers/hover')
const EntityLoader = require('./definitions/entity_loader')
const onDocumentFormattingProvider = require('./providers/formatting')
const { Log } = require('./utils/logger')
const Parser = require('./parser')
const { CONSTANTS } = require('./constants')
const { DiagnosticReporter } = require('./data/diagnostic_reporter')

module.exports = class Lsp {
    /**
     * Constructor
     * @param {options} options
     * @returns {Lsp} LspServer
     */
    static cache = {}
    constructor({ options: options }) {
        this.options = options
        this.modFilewatchers = new Map()
        this.entityDefinition = new EntityLoader(this.options.languageService, this.options.schemaService)
        this.onCompletionProvider = new onCompletionProvider(this.options.languageService, this.options.schemaService)
        this.onHoverProvider = new onHoverProvider(this.options.languageService, this.options.schemaService)
        this.onDocumentFormatting = new onDocumentFormattingProvider(this.options.connection)
        this.onDidChangeContent = this.debounceDocument(this.onDidChangeContent.bind(this), 250)
    }
    /**
     * Debouncing function
     */
    debounceDocument(func, timeout) {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => func.apply(this, args), timeout)
        }
    }
    /**
     * Returns data requested by the client
     */
    async getFolders() {
        const [modFolder, vanillaFolder] = await Promise.all([
            this.options.connection.sendRequest('cache/mod'),
            this.options.connection.sendRequest('cache/vanilla'),
        ])
        return {
            modFolder,
            vanillaFolder,
        }
    }

    /**
     * Initializes the server's capabilities
     */
    initialize() {
        Log.info('Initializing server...')
        return {
            capabilities: this.options.capabilities,
        }
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

        Object.keys(EntityLoader.files).map((e, index) => {
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
        // Log.info('Operational files: ', JSON.stringify(results, null, 4))
        Log.info(`Validating: ${Object.keys(results).length} entity types!`)

        const { modFolder, vanillaFolder } = await this.getFolders()
        Lsp.cache = await require('./cache')({
            modFolder: modFolder,
            vanillaFolder: vanillaFolder,
            modFilewatchers: this.modFilewatchers,
        })

        this.options.connection.onRequest('function/validateFiles', async () => {
            const { modFolder, vanillaFolder } = await this.getFolders()
            await new Parser(
                this.options.connection,
                this.options.languageService,
                this.options.schemaService,
                modFolder,
                vanillaFolder,
                filesWithDiagnostics,
                Lsp.cache
            )
                .validate()
                .catch((e) => Log.error(e))
        })
        this.options.connection.onRequest(
            'function/clearDiagnostics',
            async () => await Parser.clearDiagnostics(filesWithDiagnostics, this.options.connection)
        )

        this.options.connection.onRequest('function/clearCache', async () => {
            const { modFolder, vanillaFolder } = await this.getFolders()
            Lsp.cache = await require('./cache')({
                vanillaFolder: vanillaFolder,
                modFolder: modFolder,
                modFilewatchers: this.modFilewatchers,
            })
        })

        this.options.connection.onRequest('change/editor', async ({ document, fileText }) => {
            this.entityDefinition.init({
                gameInstallationFolder: (await this.getFolders()).modFolder,
                fileText: fileText,
                filePath: document.uri.fsPath,
                cache: Lsp.cache,
            })
        })
    }

    async onDidSave(params) {}

    async onDidOpen(params) {}

    async onDidClose(params) {
        return await this.options.connection.sendDiagnostics({
            uri: params.document.uri,
            diagnostics: [],
        })
    }

    /**
     * Validates currently opened text document
     * @param {*} params
     * @returns
     */
    async onDidChangeContent(params) {
        const text = params.document.getText()
        const uri = params.document.uri
        EntityLoader.diagnostics = []

        this.entityDefinition.init({
            params: params,
            gameInstallationFolder: (await this.getFolders()).modFolder,
            cache: Lsp.cache,
        })
        if (text.trim().length === 0) new DiagnosticReporter(text, EntityLoader.diagnostics).invalidJSON()
        const generalDiagnostics = await this.entityDefinition.jsonDoValidation(text, uri)

        await this.options.connection.sendDiagnostics({
            uri: uri,
            diagnostics: [...generalDiagnostics, ...Parser.clearDuplicateDiagnostics(EntityLoader.diagnostics)],
        })
    }
}
