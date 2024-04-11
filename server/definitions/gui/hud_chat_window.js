const { schema, object, float, enumerate, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudChatWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                entry_window: object({
                    keys: {
                        layout: super.layout(),
                        entry_box: object({
                            keys: {
                                style: super.style(),
                                layout: super.layout(),
                                prefix_spacing: float(),
                                prefix_definitions: object({
                                    keys: {
                                        all: super.label_form2(this.cache.localisation, this.cache.colors),
                                        allies: super.label_form2(this.cache.localisation, this.cache.colors),
                                        player: super.label_form2(this.cache.localisation, this.cache.colors),
                                    },
                                }),
                            },
                        }),
                        ping_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                            extra_properties: {
                                tooltip_titles: object({
                                    keys: {
                                        attention: this.cache.localisation,
                                        attack: this.cache.localisation,
                                        defend: this.cache.localisation,
                                    },
                                }),
                            },
                        }),
                    },
                }),
                messages_box: object({
                    keys: {
                        style: super.style(),
                        layout: super.layout(),
                        message_visible_duration: float(),
                        message_fade_duration: float(),
                        chat_message_colors: object({
                            keys: {
                                all: this.cache.colors,
                                allies: this.cache.colors,
                                player: this.cache.colors,
                            },
                        }),
                        system_message_color: this.cache.colors,
                        received_message_format: enumerate({
                            items: ['hud_chat_received_message_format'],
                        }),
                        message_background_color: color(),
                    },
                }),
                system_messages: object({
                    keys: {
                        paused: this.cache.localisation,
                        paused_by_player_with_requests_remaining: this.cache.localisation,
                        paused_by_player_without_requests_remaining: this.cache.localisation,
                        unpaused: this.cache.localisation,
                        unpaused_by_player: this.cache.localisation,
                        simulation_time_scale_changed: this.cache.localisation,
                        simulation_time_scale_changed_by_player: this.cache.localisation,
                        disconnected: this.cache.localisation,
                        other_player_disconnected: this.cache.localisation,
                        other_player_connected: this.cache.localisation,
                        other_player_connected_with_new_name: this.cache.localisation,
                        ico_global_message: this.cache.localisation,
                    },
                }),
            },
        })
    }
}
