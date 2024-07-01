const DiagnosticStorage = require('../../data/diagnostic-storage')
const { reference } = require('../../utils/utils')
const { EntityParser } = require('../../data/file-handler')
const { schema, boolean, array, enumerate } = require('../data_types')
module.exports = class EntityManifest {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.diagStorage = new DiagnosticStorage(fileText, diagnostics)
        this.reader = new EntityParser(gameInstallationFolder)
        this.allEntities = this.reader.read(['entities/*'], { read: false })
        this.manifestEntities = this.reader.read([`entities/*.${fileName}`], { read: false })

        this.json = JSON.parse(fileText).ids
        this.fileName = fileName
    }

    create() {
        reference(this.manifestEntities, (e) => (!this.json.includes(e.basename) ? this.diagStorage.messages.unreferenced(this.fileName, e.basename) : null))
        return schema({
            keys: {
                overwrite_ids: boolean(),
                ids: array({
                    items: enumerate({ items: this.manifestEntities.map((e) => e.basename) }),
                    isUnique: true,
                }),
            },
            required: ['ids'],
        })
    }
}
