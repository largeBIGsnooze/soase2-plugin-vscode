const { schema, object, color, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class ColonyListBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background: object({
                    keys: {},
                }),
                not_selected_item_background: object({
                    keys: {
                        border_color_focused: color(),
                    },
                }),
                selected_item_background: object({
                    keys: {
                        fill_color: color(),
                        border_color_focused: color(),
                    },
                }),
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
