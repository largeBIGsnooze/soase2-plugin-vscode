const Document = require('./document')

module.exports = class onHoverProvider extends Document {
    constructor(languageService, schemaService) {
        super(languageService, schemaService)
    }

    async provideHover(params, documents) {
        try {
            const uri = params.textDocument.uri
            const text = documents.get(uri)

            const { parseDoc, parseJSON } = super.provideDocument(uri, text.getText())
            const hover = await this.languageService.doHover(parseDoc, params.position, parseJSON)

            return {
                range: hover.range,
                contents: hover.contents,
            }
        } catch {
            return {}
        }
    }
}
