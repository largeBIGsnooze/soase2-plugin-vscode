const { schema, object, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudPlayerVictoryDialog extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                dim_color: color(),
                background: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        status_label: super.label(this.cache.localisation),
                        phrase_label: super.label(this.cache.localisation),
                        quit_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        continue_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    },
                }),
            },
        })
    }
}
