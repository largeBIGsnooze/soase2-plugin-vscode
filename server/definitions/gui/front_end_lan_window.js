const { schema, object } = require('../data_types')
const Definitions = require('../modifier_definitions')

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
                background_window: this.background_window(this.cache),
                overlay_window: this.background_window(this.cache),
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
            },
        })
    }
}
