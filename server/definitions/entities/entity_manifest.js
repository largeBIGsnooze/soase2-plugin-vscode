const { EntityReader } = require('../../data/file_handler')
const { schema, boolean, array, enumerate } = require('../data_types')
const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { INFO } = require('../../constants')
const loc_keys = require('../../loc_keys')
module.exports = class EntityManifest {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.reader = new EntityReader(gameInstallationFolder)
        this.MANIFEST_ENTITIES = this.reader.read([`entities/*.${fileName}`], { read: false })

        this.fileName = fileName
    }

    create() {
        try {
            for (const entity of this.MANIFEST_ENTITIES) {
                if (!this.json?.data?.ids.includes(entity.basename)) {
                    this.json.reportAtPos('/ids', `- ${this.fileName}_definition not found. id='${entity.basename}'`, INFO)
                }
            }
        } catch {}
        return schema({
            keys: {
                overwrite_ids: boolean(loc_keys.OVERWRITE_IDS),
                ids: array({
                    items: enumerate({ items: this.MANIFEST_ENTITIES.map((e) => e.basename) }),
                    isUnique: true,
                }),
            },
            required: ['ids'],
        })
    }
}
