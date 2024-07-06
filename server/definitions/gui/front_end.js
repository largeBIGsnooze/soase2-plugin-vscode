const { schema, string, object, color, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEnd extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                backdrop_scenario: object({
                    keys: {
                        scenario: 'front_end',
                        focus_unit: 'trader_light_frigate',
                        distance_to_focus_unit: 200,
                    },
                }),
                dim_color: color(),
                top_bar: object({
                    keys: {
                        layout: super.layout(),
                        background: super.background(this.cache.textures),
                        content_panel: object({
                            keys: {
                                layout: super.layout(),
                                logo: object({
                                    keys: {
                                        layout: super.layout(),
                                        brush: this.cache.textures,
                                        brush_render_style: super.brush_render_style(),
                                    },
                                }),
                                buttons_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        single_player_button: super.button(this.cache),
                                        multi_player_button: super.button(this.cache),
                                        multi_player_status_window: object({
                                            keys: {
                                                layout: super.layout(),
                                                gdpr_not_accepted_description: super.label_form2(this.cache),
                                                login_error_message_color: this.cache.colors,
                                                status_definitions: object({
                                                    keys: {
                                                        logged_out: object({
                                                            keys: {
                                                                icon: this.cache.textures,
                                                                text: this.cache.localisation,
                                                                text_color: this.cache.colors,
                                                            },
                                                        }),
                                                        logging_in: object({
                                                            keys: {
                                                                icon: this.cache.textures,
                                                                text: this.cache.localisation,
                                                                text_color: this.cache.colors,
                                                            },
                                                        }),
                                                        logged_in: object({
                                                            keys: {
                                                                icon: this.cache.textures,
                                                                text: this.cache.localisation,
                                                                text_color: this.cache.colors,
                                                            },
                                                        }),
                                                        banned: object({
                                                            keys: {
                                                                icon: this.cache.textures,
                                                                text: this.cache.localisation,
                                                                text_color: this.cache.colors,
                                                            },
                                                        }),
                                                    },
                                                }),
                                            },
                                        }),
                                        lan_button: super.button(this.cache),
                                        watching_button: super.button(this.cache),
                                        modding_button: super.button(this.cache),
                                        open_escape_menu_button: super.button(this.cache),
                                    },
                                }),
                            },
                        }),
                    },
                }),
                view_container_window: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                lobby_container_window: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                version_label: super.label(this.cache),
                lobby_chat_window_restore_button: super.button(this.cache),
                social_link_buttons_panel: object({
                    keys: {
                        layout: super.layout(),
                        orientation: super.orientation(),
                        children_gap: float(),
                        tips_button: super.button(this.cache, {
                            extra_properties: {
                                tip_id_prefix: string(),
                                tooltip_title_label: this.cache.localisation,
                            },
                        }),
                        discord_link_button: super.button(this.cache, {
                            extra_properties: {
                                url: string(),
                            },
                        }),
                        forums_link_button: super.button(this.cache, {
                            extra_properties: {
                                url: string(),
                            },
                        }),
                        player_guide_link_button: super.button(this.cache, {
                            extra_properties: {
                                url: string(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
