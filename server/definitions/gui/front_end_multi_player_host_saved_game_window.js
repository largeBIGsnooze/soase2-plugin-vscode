const { schema, object, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndMultiPlayerHostSavedGameWindow extends Definitions {
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
                is_browsable_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                is_rejoin_to_other_human_slots_enabled_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                is_rejoin_to_ai_slots_enabled_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                is_ai_takeover_enabled_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                saved_game_picker_window_frame: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                create_online_server_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                test_local_online_server_enabled: boolean(),
            },
        })
    }
}
