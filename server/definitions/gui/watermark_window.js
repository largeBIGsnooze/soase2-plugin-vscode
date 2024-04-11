const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class WaterMarkWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                watermark_layout: super.layout(),
                watermark_brush: this.cache.textures,
                logo_layout: super.layout(),
                logo_brush: this.cache.textures,
            },
        })
    }
}
