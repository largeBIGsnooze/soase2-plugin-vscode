const { schema, object } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndMultiPlayerWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_window: super.background(this.cache.textures),
                overlay_window: super.background(this.cache.textures),
                view_buttons_panel: object({
                    keys: {
                        layout: super.layout(),
                        orientation: super.orientation(),
                        join_game_button: super.button(this.cache),
                        host_new_game_button: super.button(this.cache),
                        host_saved_game_button: super.button(this.cache),
                    },
                }),
                view_windows_panel: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                bool_option_button_shared_definition: object({
                    keys: {
                        name_font: this.cache.fonts,
                        name_color: this.cache.colors,
                        name_layout: super.layout(),
                        value_font: this.cache.fonts,
                        value_layout: super.layout(),
                        value_text_when_true: this.cache.localisation,
                        value_text_when_false: this.cache.localisation,
                        value_color_when_true: this.cache.colors,
                        value_color_when_false: this.cache.colors,
                    },
                }),
            },
        })
    }
}
