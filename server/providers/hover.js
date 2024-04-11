const { Log } = require('../utils/logger')
const Document = require('./document')
const { readFileSync } = require('fs')
const path = require('path')

module.exports = class onHoverProvider extends Document {
    constructor(languageService, schemaService, connection) {
        super(languageService, schemaService)
        this.connection = connection
    }

    async provideHover(params, documents) {
        const document = documents.get(params.textDocument.uri)
        const text = document.getText()
        const { line, character } = params.position

        const fetchLanguage = await this.connection.sendRequest('validation/language').then((data) => data)

        const hoverInformation = readFileSync(path.resolve(__dirname, `../../hover-${fetchLanguage}.json`), 'utf-8')

        const contentLines = text.split('\n')
        const currentCharacter = contentLines[line].slice(character, character + 1)

        try {
            if (currentCharacter === ' ' || currentCharacter === ',' || currentCharacter === ':') return {}

            if (!document) return null

            for (const field of JSON.parse(hoverInformation).hover) {
                if (contentLines[line].search(`\\b${field.key}\\b`) !== -1) {
                    return {
                        contents: {
                            kind: 'markdown',
                            value: field.description,
                        },
                    }
                }
            }
        } catch (err) {
            Log.error('Error during hover event: ', err)
        }
    }
}
