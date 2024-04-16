const { CompletionItemKind, InsertTextFormat } = require('vscode-languageserver')
const fs = require('fs')
const path = require('path')
module.exports = class Snippets {
    constructor() {
        this.cache = null
    }

    parse() {
        if (this.cache) return this.cache
        const snippetObj = {}
        try {
            for (const file of fs.readdirSync(path.resolve(__dirname, 'snippets')).filter((e) => e !== 'schema.snippet.json')) {
                const name = path.basename(file, path.extname(file))
                const snippetData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'snippets', file), 'utf8'))
                const snippets = Object.keys(snippetData).map((e) => ({
                    label: snippetData[e].name,
                    kind: CompletionItemKind.Snippet,
                    detail: snippetData[e].description,
                    documentation: JSON.stringify(snippetData[e].body[0], null, 4),
                    insertText: JSON.stringify(snippetData[e].body[0], null, 4),
                    insertTextFormat: InsertTextFormat.Snippet,
                }))
                snippetObj[name] = snippets
            }
            this.cache = snippetObj
            return snippetObj
        } catch (e) {
            return []
        }
    }

    static async load(connection, documentUri) {
        const is_snippets_enabled = await connection.sendRequest('validation/snippets_enabled').then((data) => data)
        if (is_snippets_enabled) {
            const snippets = new Snippets().parse()
            return snippets[path.extname(documentUri).slice(1)] ?? snippets[path.basename(documentUri)] ?? []
        } else return []
    }
}
