const DiagnosticStorage = require('../../data/diagnostic-storage')
const FileHandler = require('../../data/file-handler')
const { Log } = require('../../utils/logger')
const { exists, reference } = require('../../utils/utils')
const { schema, string, array } = require('../data_types')

module.exports = class EntityManifest {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.diagStorage = new DiagnosticStorage(fileText, diagnostics)
        this.reader = new FileHandler(gameInstallationFolder)
        this.entities = this.reader.readEntities(['entities/*'], { readFile: false })
        this.manifest = this.reader.readEntities([`entities/*.${fileName}`], { readFile: false })

        this.json = JSON.parse(fileText).ids
        this.fileName = fileName
    }

    create() {
        try {
            exists(this.json, (y) => !this.entities.map((e) => e?.name).includes(y)).map((z) => this.diagStorage.messages.nullReference(z))
            reference(this.manifest, (e) => (!this.json.includes(e.name) ? this.diagStorage.messages.unreferenced(this.fileName, e.name) : null))
        } catch (err) {
            //Silent
            Log.error(err)
        }
        return schema({
            keys: {
                ids: array({
                    items: string(),
                    isUnique: true,
                }),
            },
            required: ['ids'],
        })
    }
}
