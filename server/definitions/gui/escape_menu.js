const { schema, object, color, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class EscapeMenu extends Definitions {
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
                dialog_frame: object({
                    keys: {
                        layout: super.layout(),
                        background: super.background(this.cache.textures),
                        game_code_label: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        game_code_text_entry: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        buttons_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures, {
                            extra_properties: {
                                save_game_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                quit_game_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                exit_app_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                open_settings_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                close_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                children_gap: float(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
