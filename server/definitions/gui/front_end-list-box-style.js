const { schema, object, float, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndListBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background: object({ keys: {} }),
                not_selected_item_background: super.background(this.cache.textures),
                selected_item_background: super.background(this.cache.textures),
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
