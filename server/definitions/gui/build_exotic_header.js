const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class BuildExoticHeaderLabelStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                font: this.cache.fonts,
                text_color: this.cache.colors,
                font_alignment: super.alignment(),
                attach_icon_to_text_with_spacing: integer(),
            },
        })
    }
}
