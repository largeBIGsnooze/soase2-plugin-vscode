const { createConnection, TextDocuments, ProposedFeatures, TextDocumentSyncKind, TextEdit } = require('vscode-languageserver/node')
const schemaService = require('vscode-json-languageservice')
const { TextDocument } = require('vscode-languageserver-textdocument')
const connection = createConnection(ProposedFeatures.all)
const languageService = schemaService.getLanguageService({})
const documents = new TextDocuments(TextDocument)
const Lsp = require('./lsp_server')

function initializeServer() {
    const generateTriggerCharacters = () => {
        const triggerChars = []
        for (let i = 65; i <= 122; i++) {
            if (i > 90 && i < 97) continue
            triggerChars.push(String.fromCharCode(i))
        }
        return triggerChars
    }
    const server = new Lsp({
        options: {
            languageService: languageService,
            schemaService: schemaService,
            connection: connection,
            capabilities: {
                textDocumentSync: TextDocumentSyncKind.Incremental,
                hoverProvider: true,
                documentFormattingProvider: true,
                completionProvider: {
                    triggerCharacters: generateTriggerCharacters(),
                    resolveProvider: false,
                },
            },
        },
    })

    connection.onInitialize(() => server.initialize())
    connection.onInitialized(() => server.initialized())
    documents.onDidChangeContent((params) => server.onDidChangeContent(params))
    documents.onDidSave((params) => server.onDidSave(params))
    documents.onDidOpen((params) => server.onDidOpen(params))
    documents.onDidClose((params) => server.onDidClose(params))

    connection.onHover((params) => server.onHoverProvider.provideHover(params, documents))
    connection.onCompletion((params) => server.onCompletionProvider.provideCompletion(params, documents))
    connection.onDocumentFormatting((params) => server.onDocumentFormatting.provideFormatting(TextEdit, params, documents))
}

initializeServer()
documents.listen(connection)
connection.listen()
