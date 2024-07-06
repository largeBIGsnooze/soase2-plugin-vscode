const { schema, color, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEndMessageListBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background: super.background(this.cache.textures),
                font: this.cache.fonts,
                text_color: color(),
                text_layout: super.layout(),
                item_height: float(),
                item_margins: super.margins(),
                scroll_bar_layout: super.layout(),
            },
        })
    }
}
