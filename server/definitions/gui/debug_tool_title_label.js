const { schema, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugToolTitleLabelLabelStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                font: this.cache.fonts,
                font_alignment: super.alignment(),
                background_fill_color: color(),
                text_color: this.cache.colors,
                text_layout: super.layout(),
            },
        })
    }
}
