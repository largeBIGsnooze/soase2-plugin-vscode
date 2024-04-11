const { schema, object, color, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class BasicTextListButtonStyle extends Definitions {
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
                        brush: this.cache.textures,
                    },
                }),
                not_selected_item_background: object({
                    keys: {
                        brush: this.cache.textures,
                    },
                }),
                selected_item_background: object({
                    keys: {
                        brush: this.cache.textures,
                    },
                }),
                font: this.cache.fonts,
                text_color: color(),
                text_layout: object({
                    keys: {
                        margins: super.margins(),
                    },
                }),
                item_height: float(),
                item_margins: super.margins(),
                scroll_bar_layout: super.scroll_bar_layout(),
            },
        })
    }
}
