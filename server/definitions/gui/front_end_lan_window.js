const { schema, object } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndLanWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_window: this.background_window(this.cache.localisation, this.cache.textures),
                overlay_window: this.background_window(this.cache.localisation, this.cache.textures),
                view_buttons_panel: object({
                    keys: {
                        layout: super.layout(),
                        orientation: super.orientation(),
                        join_game_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        host_new_game_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        host_saved_game_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    },
                }),
                view_windows_panel: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
            },
        })
    }
}
