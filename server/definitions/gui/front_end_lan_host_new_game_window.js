const { schema, object } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndLanHostNewGameWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background_window: super.background_window(this.cache.localisation, this.cache.textures),
                layout: super.layout(),
                create_lobby_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                scenario_picker_window_frame: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
            },
        })
    }
}
