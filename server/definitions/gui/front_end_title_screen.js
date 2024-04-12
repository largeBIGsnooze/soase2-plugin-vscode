const { schema, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndTitleScreen extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                fill_color: color(),
                label: super.label(this.cache),
                background: super.background(this.cache.textures),
            },
        })
    }
}
