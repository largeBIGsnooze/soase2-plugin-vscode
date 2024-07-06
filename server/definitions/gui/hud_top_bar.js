const { schema, string, object, array, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudTopBar extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background: this.cache.textures,
                background_render_style: super.brush_render_style(),
                content_panel: object({
                    keys: {
                        layout: super.layout(),
                        toggle_civilian_research_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                                is_researching_text_color: this.cache.colors,
                                is_not_researching_text_color: this.cache.colors,
                            },
                        }),
                        civilian_research_text_filter_count_label: super.button(this.cache, {
                            extra_properties: {
                                tooltip_title: this.cache.localisation,
                                no_matches_description: super.label_form2(this.cache),
                            },
                        }),
                        toggle_military_research_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                                is_researching_text_color: this.cache.colors,
                                is_not_researching_text_color: this.cache.colors,
                            },
                        }),
                        military_research_text_filter_count_label: super.button(this.cache, {
                            extra_properties: {
                                tooltip_title: this.cache.localisation,
                                no_matches_description: super.label_form2(this.cache),
                            },
                        }),
                        toggle_trade_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                                has_points_text_color: this.cache.colors,
                                has_no_points_text_color: this.cache.colors,
                            },
                        }),
                        toggle_phase_resonance_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                                has_points_text_color: this.cache.colors,
                                has_no_points_text_color: this.cache.colors,
                            },
                        }),
                        toggle_empire_units_window_button: super.button(this.cache, {
                            extra_properties: {
                                text_color: this.cache.colors,
                                text_color_when_at_max_supply: this.cache.colors,
                                text_color_when_over_max_supply: this.cache.colors,
                                supply_icons: array({
                                    items: this.cache.textures,
                                    isUnique: true,
                                }),
                                highlighted_supply_icons: array({
                                    items: this.cache.textures,
                                    isUnique: true,
                                }),
                            },
                        }),
                        toggle_colonized_planets_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                        toggle_exotic_factory_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                                has_exotics_text_color: this.cache.colors,
                                has_no_exotics_text_color: this.cache.colors,
                            },
                        }),
                        toggle_players_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                        toggle_npcs_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                                new_reward_icon: this.cache.textures,
                                new_reward_layout: super.layout(),
                                auction_running_line: super.label_form(this.cache),
                            },
                        }),
                        toggle_npc_markets_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                        clock_button: super.button(this.cache, {
                            extra_properties: {
                                colon_width: float(),
                                colons_and_minutes_width: float(),
                                future_orbits_view_activated_text_color: this.cache.colors,
                            },
                        }),
                        time_control_window: object({
                            keys: {
                                layout: super.layout(),
                                pause_button: super.button(this.cache, {
                                    extra_properties: {
                                        highlighted_icon: this.cache.textures,
                                        is_paused_label_text: this.cache.localisation,
                                        is_paused_value_color: this.cache.colors,
                                    },
                                }),
                                change_time_scale_button: super.button(this.cache, {
                                    extra_properties: {
                                        title_text: this.cache.localisation,
                                        base_time_scale_label_text: this.cache.localisation,
                                        extra_time_scale_label_text: this.cache.localisation,
                                        is_change_time_scale_disabled_description: super.label_form2(this.cache),
                                    },
                                }),
                            },
                        }),
                        future_orbits_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                                title_text: this.cache.localisation,
                                description: super.label_form2(this.cache),
                                disabled_description: super.label_form2(this.cache),
                                left_click_description: super.label_form2(this.cache),
                                right_click_description: super.label_form2(this.cache),
                                scrub_description: super.label_form2(this.cache),
                            },
                        }),
                        escape_menu_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                        assets_window: object({
                            keys: {
                                layout: super.layout(),
                                background: super.background(this.cache.textures),
                                current_value_window_shared_definition: object({
                                    keys: {
                                        icon_layout: super.layout(),
                                        text_layout: super.layout(),
                                        text_font: this.cache.fonts,
                                        text_color: this.cache.colors,
                                        no_rate_text: string(),
                                        has_available_quick_market_actions_line: super.label_form(this.cache),
                                        buy_quick_market_action_line: super.label_form(this.cache),
                                        sell_quick_market_action_line: super.label_form(this.cache),
                                    },
                                }),
                                current_credits_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: super.background(this.cache.textures),
                                        tooltip_title_text: this.cache.localisation,
                                    },
                                }),
                                current_metal_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: super.background(this.cache.textures),
                                        tooltip_title_text: this.cache.localisation,
                                    },
                                }),
                                current_crystal_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: super.background(this.cache.textures),
                                        tooltip_title_text: this.cache.localisation,
                                    },
                                }),
                                delta_value_window_shared_definition: object({
                                    keys: {
                                        text_layout: super.layout(),
                                        text_font: this.cache.fonts,
                                        background: super.background(this.cache.textures),
                                        positive_color: this.cache.colors,
                                        negative_color: this.cache.colors,
                                    },
                                }),
                                delta_credits_window: object({
                                    keys: {
                                        layout: super.layout(),
                                    },
                                }),
                                delta_metal_window: object({
                                    keys: {
                                        layout: super.layout(),
                                    },
                                }),
                                delta_crystal_window: object({
                                    keys: {
                                        layout: super.layout(),
                                    },
                                }),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
