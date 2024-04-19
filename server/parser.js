const path = require('path')
const { pathToFileURL } = require('url')
const fs = require('fs')
const EntityDefinition = require('./definitions/entity_definition')
const DiagnosticStorage = require('./data/diagnostic-storage')
const { Log } = require('./utils/logger')

module.exports = class Parser {
    /**
     * Constructor
     * @param {connection} connection
     * @param {languageService} languageService
     * @param {schemaService} schemaService
     * @param {String} gameInstallationFolder
     * @param {Array} filesWithDiagnostics
     */
    constructor(connection, languageService, schemaService, gameInstallationFolder, { filesWithDiagnostics: filesWithDiagnostics }) {
        this.connection = connection
        this.languageService = languageService
        this.schemaService = schemaService
        this.gameInstallationFolder = gameInstallationFolder
        this.entityDefinition = new EntityDefinition(languageService, schemaService)

        this.filesWithDiagnostics = filesWithDiagnostics
    }
    /**
     * Retrieves data from the client
     */
    async fetchRequests() {
        const [folders, extensions] = await Promise.all([await this.connection.sendRequest('ignore/folders'), await this.connection.sendRequest('ignore/extensions')])

        return {
            folders: folders,
            extensions: extensions,
        }
    }
    /**
     * Validates all files against their relevant schemas
     */
    async validate() {
        await Parser.clearDiagnostics(this.filesWithDiagnostics, this.connection)
        const { folders, extensions } = await this.fetchRequests()
        const cache = await require('./cache')(this.gameInstallationFolder)
        const start = process.hrtime()

        await this.processFolder(this.gameInstallationFolder, folders, extensions, cache)

        Log.info('Execution time:', `${process.hrtime(start)[0]}s`)
        return process.hrtime(start)[0]
    }
    /**
     * Reads all folders with specified filters
     * @param {string} filePath
     * @param {array} filterFolders
     * @param {array} filterExtensions
     * @param {cache} cache
     */
    async processFolder(filePath, filterFolders, filterExtensions, cache) {
        const isIgnoredFolder = (arr, filePath) => {
            return arr.some((e) => filePath.endsWith(e))
        }
        const isValidExtension = (file) => {
            return require('../package.json').contributes.languages[0].extensions.some((value) => file.includes(value))
        }

        try {
            for (const file of fs.readdirSync(filePath)) {
                const currentFilePath = path.resolve(filePath, file)
                const lstat = fs.lstatSync(currentFilePath)

                if (currentFilePath.endsWith('textures') || currentFilePath.endsWith('meshes')) continue
                if (isIgnoredFolder(filterFolders, currentFilePath)) continue
                if (lstat.isDirectory()) await this.processFolder(currentFilePath, filterFolders, filterExtensions, cache)
                else {
                    if (isValidExtension(file)) {
                        if (isIgnoredFolder(filterExtensions, currentFilePath)) continue

                        const start = process.hrtime()
                        await this.processFile(currentFilePath, cache)

                        Log.info(file, `- ${(process.hrtime(start)[1] / 1000000).toFixed(3)}ms`)
                    } else Log.info(`Skipping: ${file}`)
                }
            }
        } catch (err) {
            Log.error(err.message)
        }
    }
    /**
     * Applies syntax and JSON Schema validation to file
     * @param {string} filePath
     * @param {cache} cache
     */
    async processFile(filePath, cache) {
        try {
            const fileText = fs.readFileSync(filePath, 'utf-8')

            EntityDefinition.diagnostics = []
            const diagStorage = new DiagnosticStorage(fileText, EntityDefinition.diagnostics)

            if (fileText.trim().length === 0) diagStorage.messages.invalidJSON()
            else if (!JSON.parse(fileText)) return

            this.entityDefinition.init(
                {
                    gameInstallationFolder: this.gameInstallationFolder,
                    fileText: fileText,
                    filePath: filePath,
                },
                cache
            )
            const generalDiagnostics = await this.entityDefinition.jsonDoValidation(fileText, filePath)

            if (generalDiagnostics[0] || Array.from(EntityDefinition.diagnostics).length > 0) this.filesWithDiagnostics.push(filePath)

            await this.connection.sendDiagnostics({
                uri: pathToFileURL(filePath).href,
                diagnostics: [].concat(generalDiagnostics, EntityDefinition.diagnostics),
            })
        } catch (err) {
            Log.error(`Error during processing file: '${path.basename(filePath)}' with error: ${err.message}`)
        }
    }
    /**
     * Clears all diagnostics from files
     * @param {Array} files
     * @param {connection} connection
     */
    static async clearDiagnostics(files, connection) {
        if (files.length === 0) return
        for (const file of files) await connection.sendDiagnostics({ uri: pathToFileURL(file).href, diagnostics: [] })
        files.length = 0
    }
}
