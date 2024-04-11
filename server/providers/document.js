const { CONSTANTS } = require('../constants')

module.exports = class Document {
    constructor(languageService, schemaService) {
        this.languageService = languageService
        this.schemaService = schemaService
    }

    provideDocument(params, documents) {
        const parseDocument = this.schemaService.TextDocument.create(params, CONSTANTS.name, CONSTANTS.version, documents)
        const parseJSON = this.languageService.parseJSONDocument(parseDocument)

        return {
            parseDoc: parseDocument,
            parseJSON: parseJSON,
        }
    }
}
