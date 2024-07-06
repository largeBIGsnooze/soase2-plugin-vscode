const { EntityParser } = require('../../data/file-handler')
const { schema, boolean, array, enumerate } = require('../data_types')
const { DiagnosticReporter } = require('../../data/diagnostic-reporter')
const { WARN } = require('../../constants')
module.exports = class EntityManifest {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.reader = new EntityParser(gameInstallationFolder)
        this.manifestEntities = this.reader.read([`entities/*.${fileName}`], {
            read: false,
        })

        this.fileName = fileName
    }

    create() {
        for (const entity of this.manifestEntities) {
            if (!this.json.data.ids.includes(entity.basename)) {
                this.json.createPointerDiagnostic('/ids', `- ${this.fileName}_definition not found. id='${entity.basename}'`, WARN)
            }
        }

        return schema({
            keys: {
                overwrite_ids: boolean(),
                ids: array({
                    items: enumerate({
                        items: this.manifestEntities.map((e) => e.basename),
                    }),
                    isUnique: true,
                }),
            },
            required: ['ids'],
        })
    }
}
