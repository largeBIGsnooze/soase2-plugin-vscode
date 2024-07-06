const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudIconAndTextLabelStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                font: this.cache.fonts,
                icon_layout_with_text: super.layout(),
                text_layout: super.layout(),
                text_color: this.cache.colors,
            },
        })
    }
}
