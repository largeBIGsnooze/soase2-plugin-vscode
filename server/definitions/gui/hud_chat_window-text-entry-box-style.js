const { schema, object, color } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudChatWindowTextEntryBoxStyle extends Definitions {
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
                        border_color_focused: color(),
                    },
                }),
                font: this.cache.fonts,
                text_layout: super.layout(),
                text_color: color(),
                selected_text_color: color(),
                selected_rect_fill_color: color(),
            },
        })
    }
}
