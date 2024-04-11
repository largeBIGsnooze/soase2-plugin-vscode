const { schema, object, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndMessageDialog extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    join_game_result_messages() {
        return object({
            keys: {
                success: this.cache.localisation,
                failed_uknown: this.cache.localisation,
                failed_joining_server: this.cache.localisation,
                failed_simulation_framework_differs: this.cache.localisation,
                failed_account_is_blocked: this.cache.localisation,
                failed_game_id_differs: this.cache.localisation,
                failed_no_slot_found_to_join: this.cache.localisation,
                failed_no_slot_found_to_rejoin: this.cache.localisation,
                failed_slot_to_rejoin_is_occupied: this.cache.localisation,
                failed_client_already_joined: this.cache.localisation,
                failed_server_is_not_setup_by_client: this.cache.localisation,
                failed_client_is_not_compatible_with_server: this.cache.localisation,
            },
        })
    }

    ico_ban_reasons() {
        return object({
            keys: {
                abusive_chat: this.cache.localisation,
                gameplay_sabotage: this.cache.localisation,
                inactivity: this.cache.localisation,
                spam: this.cache.localisation,
                cheating: this.cache.localisation,
                bad_name: this.cache.localisation,
            },
        })
    }

    create_cloud_game_server_failed_messages() {
        return object({
            keys: {
                internal_server_error: this.cache.localisation,
                no_servers_available: this.cache.localisation,
            },
        })
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                dim_color: color(),
                background_window: super.background_window(this.cache.localisation, this.cache.textures),
                join_game_result_title: this.cache.localisation,
                join_game_result_messages: this.join_game_result_messages(),
                join_game_mods_differ_message: this.cache.localisation,
                create_cloud_game_server_failed_title: this.cache.localisation,
                create_cloud_game_server_failed_messages: this.create_cloud_game_server_failed_messages(),
                get_cloud_game_code_data_failed_title: this.cache.localisation,
                get_cloud_game_code_data_failed_message: this.cache.localisation,
                ico_global_message_received_title: this.cache.localisation,
                ico_ban_received_title: this.cache.localisation,
                ico_ban_received_reason_message: this.cache.localisation,
                ico_ban_received_minutes_remaining: this.cache.localisation,
                ico_ban_received_hours_remaining: this.cache.localisation,
                ico_ban_reasons: this.ico_ban_reasons(),
            },
        })
    }
}
