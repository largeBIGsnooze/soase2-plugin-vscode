const Document = require('./document')

module.exports = class onCompletionProvider extends Document {
    constructor(languageService, schemaService) {
        super(languageService, schemaService)
    }

    async provideCompletion(params, documents) {
        const uri = params.textDocument.uri
        const text = documents.get(uri)
        const { parseDoc, parseJSON } = super.provideDocument(uri, text.getText())
        const suggestions = await this.languageService.doComplete(parseDoc, params.position, parseJSON)
        return {
            isIncomplete: true,
            items: suggestions.items,
        }
    }
}
