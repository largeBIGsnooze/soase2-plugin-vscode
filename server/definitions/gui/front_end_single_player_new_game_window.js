const { schema, object } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEndSinglePlayerNewGameWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_window: object({
                    keys: {},
                }),
                create_lobby_button: super.button(this.cache),
                scenario_picker_window_frame: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
            },
        })
    }
}
