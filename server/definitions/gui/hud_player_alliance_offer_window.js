const { schema, string, object, integer, float, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudPlayerAllianceOfferWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    components() {
        return array({
            items: object({
                keys: {
                    layout: super.layout(),
                    brush: this.cache.textures,
                    brush_render_style: super.brush_render_style(),
                },
            }),
        })
    }

    asset_button_shared_definition() {
        return object({
            keys: {
                not_included_in_offer_alpha: integer(),
                tooltip_available_assets_label: this.cache.localisation,
                tooltip_available_assets_color: this.cache.colors,
            },
        })
    }

    planet_button_shared_definition() {
        return object({
            keys: {
                not_included_in_offer_alpha: float(),
                empty_icon: string(),
                empty_title: this.cache.localisation,
                empty_description: this.cache.localisation,
                unconfirmed_planet_notification_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                unconfirmed_planet_description: this.cache.localisation,
                unconfirmed_planet_description_color: this.cache.colors,
                occupied_description: this.cache.localisation,
                occupied_description_color: this.cache.colors,
                anchor_location_on_button: super.anchor(),
                anchor_location_on_tooltip: super.anchor(),
                confirm_planet_icon_layout: super.layout(),
                confirmed_planet_icon: string(),
                unconfirmed_planet_icon: string(),
            },
        })
    }

    alliance_type_button_shared_definition() {
        return object({
            keys: {
                not_included_in_offer_alpha: float(),
                already_allied_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                root_alliance_required_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
            },
        })
    }

    content_window() {
        return object({
            keys: {
                title_label: super.label(this.cache.localisation),
                demand_label: super.label(this.cache.localisation),
                offer_label: super.label(this.cache.localisation),
                my_player_panel: {
                    player_theme_icon_window: super.label(this.cache.localisation),
                    player_name_label: super.label(this.cache.localisation),
                    portrait_window: super.portrait_window(),
                    credits_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    metal_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    crystal_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    planet_button_0: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    planet_button_1: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    planet_button_2: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    exotic_buttons_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures),
                },
                other_player_panel: {
                    layout: super.layout(),
                    asset_button_shared_definition: this.asset_button_shared_definition(),
                    planet_button_shared_definition: this.planet_button_shared_definition(),
                    player_theme_icon_window: super.label(this.cache.localisation),
                    player_name_label: super.label(this.cache.localisation),
                    portrait_window: super.portrait_window(),
                    credits_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    metal_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    crystal_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    planet_button_0: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    planet_button_1: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    planet_button_2: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                    exotic_buttons_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures),
                },
                alliance_type_button_shared_definition: this.alliance_type_button_shared_definition(),
                cease_fire_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                share_vision_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                synergy_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                alliance_lock_duration_button: super.alliance_lock_duration_button(this.cache.localisation, this.cache.textures),
                cancel_button: super.cancel_button(this.cache.localisation),
                ok_button: super.ok_button(this.cache.localisation, this.cache.textures, this.cache.textures),
                break_alliance_button: super.break_alliance_button(this.cache.localisation, this.cache.colors),
                chat_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
            },
        })
    }

    container_window() {
        return object({
            keys: {
                layout: super.layout(),
                background: object({
                    keys: {
                        components: this.components(),
                    },
                }),
            },
        })
    }

    create() {
        return schema({
            keys: {
                opening_duration: float(),
                closing_duration: float(),
                fade_function: string(),
                move_function: string(),
                container_window: object({
                    keys: {
                        layout: super.layout(),
                        background: object({
                            keys: {
                                components: this.components(),
                            },
                        }),
                        content_window: this.content_window(),
                    },
                }),
            },
        })
    }
}
