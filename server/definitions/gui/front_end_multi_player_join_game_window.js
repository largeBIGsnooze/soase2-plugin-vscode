const { schema, object } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndMultiPlayerJoinGameWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_window: super.background_window(this.cache),
                cancel_button: super.button(this.cache),
                game_server_picker_list_box: object({
                    keys: {
                        layout: super.layout(),
                        style: super.style(),
                        color_when_is_game_started: this.cache.colors,
                        color_when_is_game_not_started: this.cache.colors,
                        scenario_label: this.cache.localisation,
                        host_label: this.cache.localisation,
                        open_slots_label: this.cache.localisation,
                        max_slots_label: this.cache.localisation,
                        is_game_started_label: this.cache.localisation,
                    },
                }),
                game_server_picker_picked_details_window: object({
                    keys: {
                        layout: super.layout(),
                        background: super.background(this.cache.textures),
                    },
                }),
                refresh_game_servers_button: super.button(this.cache),
                join_picked_game_server_button: super.button(this.cache),
                rejoin_game_server_button: super.button(this.cache),
                join_game_server_with_code_button: super.button(this.cache),
                quick_join_button: super.button(this.cache),
            },
        })
    }
}
