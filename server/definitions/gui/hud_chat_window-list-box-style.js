const { schema, object, color, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudChatWindowListBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background: object({
                    keys: {
                        fill_color: color(),
                    },
                }),
                not_selected_item_background: object({
                    keys: {
                        fill_color: color(),
                    },
                }),
                selected_item_background: object({
                    keys: {
                        fill_color: color(),
                    },
                }),
                font: this.cache.fonts,
                text_color: color(),
                text_layout: super.layout(),
                item_height: float(),
                item_margins: super.margins(),
                scroll_bar_style: super.style(),
                scroll_bar_layout: super.layout(),
            },
        })
    }
}
