const { schema, object, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugTextEntryBoxStyle extends Definitions {
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
                font: this.cache.fonts,
                text_layout: super.layout(),
                text_color: color(),
                selected_text_color: color(),
                selected_rect_fill_color: color(),
            },
        })
    }
}
