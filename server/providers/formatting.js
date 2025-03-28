module.exports = class onDocumentFormattingProvider {
    constructor(connection) {
        this.connection = connection
    }

    async provideFormatting(TextEdit, params, documents) {
        const tabQuantity = await this.connection.sendRequest('formatter/tabs').then((data) => data)
        try {
            const document = documents.get(params.textDocument.uri)
            const text = document.getText()
            return [
                TextEdit.replace(
                    {
                        start: {
                            line: 0,
                            character: 0,
                        },
                        end: {
                            line: text.split('\n').length,
                            character: 0,
                        },
                    },
                    JSON.stringify(JSON.parse(text), null, tabQuantity)
                ),
            ]
        } catch {
            return []
        }
    }
}
