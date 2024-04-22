const DiagnosticStorage = require('../../data/diagnostic-storage')
const FileHandler = require('../../data/file-handler')
const { reference } = require('../../utils/utils')
const { schema, array, enumerate } = require('../data_types')

module.exports = class EntityManifest {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.diagStorage = new DiagnosticStorage(fileText, diagnostics)
        this.reader = new FileHandler(gameInstallationFolder)
        this.allEntities = this.reader.readEntities(['entities/*'], { readFile: false })
        this.manifestEntities = this.reader.readEntities([`entities/*.${fileName}`], { readFile: false })

        this.json = JSON.parse(fileText).ids
        this.fileName = fileName
    }

    create() {
        try {
            reference(this.manifestEntities, (e) => (!this.json.includes(e.name) ? this.diagStorage.messages.unreferenced(this.fileName, e.name) : null))
        } catch (err) {
            //Silent
        }
        return schema({
            keys: {
                ids: array({
                    items: enumerate({ items: this.manifestEntities.map((e) => e?.name) }),
                    isUnique: true,
                }),
            },
            required: ['ids'],
        })
    }
}
