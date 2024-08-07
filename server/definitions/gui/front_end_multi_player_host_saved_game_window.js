const { schema, object, boolean } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEndMultiPlayerHostSavedGameWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background_window: super.background_window(this.cache),
                layout: super.layout(),
                is_browsable_button: super.button(this.cache),
                is_rejoin_to_other_human_slots_enabled_button: super.button(this.cache),
                is_rejoin_to_ai_slots_enabled_button: super.button(this.cache),
                is_ai_takeover_enabled_button: super.button(this.cache),
                saved_game_picker_window_frame: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                create_online_server_button: super.button(this.cache),
                test_local_online_server_enabled: boolean(),
            },
        })
    }
}
