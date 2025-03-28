const path = require('path')
const { pathToFileURL } = require('url')
const fs = require('fs')
const EntityLoader = require('./definitions/entity_loader')
const { Log } = require('./utils/logger')
const { DiagnosticReporter } = require('./data/diagnostic_reporter')

module.exports = class Parser {
    /**
     * Constructor
     * @param {connection} connection
     * @param {languageService} languageService
     * @param {schemaService} schemaService
     * @param {String} gameInstallationFolder
     * @param {Array} filesWithDiagnostics
     */
    constructor(connection, languageService, schemaService, modFolder, vanillaInstallationFolder, filesWithDiagnostics, cache) {
        this.connection = connection
        this.languageService = languageService
        this.schemaService = schemaService
        this.modFolder = modFolder
        this.vanillaInstallationFolder = vanillaInstallationFolder
        this.entityDefinition = new EntityLoader(languageService, schemaService)

        this.cache = cache
        this.filesWithDiagnostics = filesWithDiagnostics
        this.validatedFiles = 0

        this.entityManifests = [
            'weapon.entity_manifest',
            'unit_skin.entity_manifest',
            'unit_item.entity_manifest',
            'unit.entity_manifest',
            'research_subject.entity_manifest',
            'player.entity_manifest',
            'npc_reward.entity_manifest',
            'formation.entity_manifest',
            'flight_pattern.entity_manifest',
            'exotic.entity_manifest',
            'buff.entity_manifest',
            'action_data_source.entity_manifest',
            'ability.entity_manifest',
        ]
    }
    /**
     * Retrieves data from the client
     */
    async fetchRequests() {
        const [folders, extensions] = await Promise.all([
            this.connection.sendRequest('ignore/folders'),
            this.connection.sendRequest('ignore/extensions'),
        ])

        return { folders, extensions }
    }
    /**
     * Validates all files against their relevant schemas
     */
    async validate() {
        await Parser.clearDiagnostics(this.filesWithDiagnostics, this.connection)
        const { folders, extensions } = await this.fetchRequests()
        const start = process.hrtime()

        await this.processFolder(this.modFolder, folders, extensions, this.cache)

        Log.info('Execution time:', `${process.hrtime(start)[0]}s, validated: ${this.validatedFiles} entities`)
        return process.hrtime(start)[0]
    }

    /**
     * Processes the entity and logs it
     */

    async processEntity(file, filePath, cache) {
        const start = process.hrtime()
        await this.processFile(filePath, cache)
        this.validatedFiles++
        Log.info(file, `- ${(process.hrtime(start)[1] / 1e6).toFixed(3)}ms`)
    }

    /**
     * Reads all folders with specified filters
     * @param {string} filePath
     * @param {array} filterFolders
     * @param {array} filterExtensions
     * @param {cache} cache
     */
    async processFolder(filePath, filterFolders, filterExtensions, cache) {
        const defaultIgnoredFolders = (e) => ['textures', 'meshes', 'videos'].some((y) => e.endsWith(y))
        const defaultIgnoredExtensions = (e) => ['.scenario', '.dll', '.fxco', '.ogg'].some((y) => e.endsWith(y))

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

                if (defaultIgnoredFolders(currentFilePath) || isIgnoredFolder(filterFolders, currentFilePath)) continue

                if (path.basename(path.dirname(currentFilePath)) === 'entities') {
                    const ids = JSON.parse(fs.readFileSync(currentFilePath, 'utf-8'))?.ids || []
                    if (this.entityManifests.includes(file)) {
                        for (const id of ids) {
                            const entity = `${id}.${path.basename(file, path.extname(file))}`
                            await this.processEntity(entity, path.join(path.dirname(currentFilePath), entity), cache)
                        }
                    }
                } else if (lstat.isDirectory()) {
                    await this.processFolder(currentFilePath, filterFolders, filterExtensions, cache)
                } else {
                    if (!isValidExtension(file) || defaultIgnoredExtensions(file) || isIgnoredFolder(filterExtensions, currentFilePath)) continue

                    await this.processEntity(file, currentFilePath, cache)
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

            EntityLoader.diagnostics = []

            if (fileText.trim().length === 0) new DiagnosticReporter(fileText, EntityLoader.diagnostics).invalidJSON()
            else if (!JSON.parse(fileText)) return

            this.entityDefinition.init({ gameInstallationFolder: this.modFolder, fileText: fileText, filePath: filePath, cache: cache })
            const generalDiagnostics = await this.entityDefinition.jsonDoValidation(fileText, filePath)

            if (generalDiagnostics[0] || Array.from(EntityLoader.diagnostics).length > 0) this.filesWithDiagnostics.push(filePath)

            await this.connection.sendDiagnostics({
                uri: pathToFileURL(filePath).href,
                diagnostics: [...Parser.clearDuplicateDiagnostics(EntityLoader.diagnostics), ...generalDiagnostics],
            })
        } catch (err) {
            Log.error(`Error during processing file: '${path.basename(filePath)}' with error: ${err.message}`)
        }
    }

    static clearDuplicateDiagnostics(diagnostics) {
        const uniqueDiagnostics = new Set()
        return diagnostics.filter((diag) => {
            const key = `${diag.message}-${diag.range.start.line}:${diag.range.start.character}-${diag.range.end.line}:${diag.range.end.character}`

            if (!uniqueDiagnostics.has(key)) {
                uniqueDiagnostics.add(key)
                return true
            }
            return false
        })
    }

    /**
     * Clears all diagnostics from files
     * @param {Array} files
     * @param {connection} connection
     */
    static async clearDiagnostics(files, connection) {
        if (files.length === 0) return
        for (const file of files)
            await connection.sendDiagnostics({
                uri: pathToFileURL(file).href,
                diagnostics: [],
            })
        files.length = 0
    }
}
