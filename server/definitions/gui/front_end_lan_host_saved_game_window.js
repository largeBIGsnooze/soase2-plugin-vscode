const { schema, object, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndLanHostSavedGameWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background_window: object({
                    keys: {
                        components: array({
                            items: super.component(this.cache.textures),
                        }),
                    },
                }),
                layout: super.layout(),
                saved_game_picker_window_frame: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                create_lobby_button: super.button(this.cache),
            },
        })
    }
}
