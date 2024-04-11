const { schema, object, vecInt2, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudPlanetWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: super.window(this.cache.textures, {
                properties: {
                    player_ownership_window: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                    picture_window: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors, {
                        properties: {
                            unit_bar_layout: super.layout(),
                            name_text_entry_box: super.entry_box(this.cache.textures),
                            name_text_entry_underlay: super.entry_box(this.cache.textures),
                            level_window: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                            unknown_picture: this.cache.textures,
                        },
                    }),
                    home_planet_indicator_window: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors, {
                        properties: {
                            icon: this.cache.textures,
                            tooltip_title: this.cache.localisation,
                        },
                    }),
                    culture_indicator_window: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors, {
                        properties: {
                            icon: this.cache.textures,
                            blink_duration: float(),
                        },
                    }),
                    income_analysis_windows_panel: object({
                        keys: {
                            layout: super.layout(),
                            credits_window: object({
                                keys: {
                                    layout_grid_coord: vecInt2(),
                                    icon: this.cache.textures,
                                },
                            }),
                            metal_window: object({
                                keys: {
                                    layout_grid_coord: vecInt2(),
                                    icon: this.cache.textures,
                                },
                            }),
                            crystal_window: object({
                                keys: {
                                    layout_grid_coord: vecInt2(),
                                    icon: this.cache.textures,
                                },
                            }),
                            layout_grid: super.layout_grid(),
                        },
                    }),
                    toggle_structures_window_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                        extra_properties: {
                            highlighted_icon: this.cache.textures,
                            tooltip_title_text: this.cache.localisation,
                            auto_structure_placement_enabled_tooltip_label: this.cache.localisation,
                            auto_structure_placement_tooltip_description: this.cache.localisation,
                        },
                    }),
                    toggle_advanced_planet_window_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                        extra_properties: {
                            highlighted_icon: this.cache.textures,
                        },
                    }),
                    toggle_unit_factory_window_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                        extra_properties: {
                            highlighted_icon: this.cache.textures,
                        },
                    }),
                    toggle_carrier_window_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                        extra_properties: {
                            squadron_counts_overlay_layout: super.layout(),
                            squadron_counts_overlay_font: this.cache.fonts,
                            squadron_counts_overlay_color: this.cache.colors,
                        },
                    }),
                    track_button_shared_definition: object({
                        keys: {
                            tooltip_name_color: this.cache.colors,
                            tooltip_level_color: this.cache.colors,
                        },
                    }),
                    core_track_buttons_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures, {
                        extra_properties: {
                            defense_track_button: object({
                                keys: {
                                    layout_grid_coord: vecInt2(),
                                },
                            }),
                            logistics_track_button: object({
                                keys: {
                                    layout_grid_coord: vecInt2(),
                                },
                            }),
                            commerce_track_button: object({
                                keys: {
                                    layout_grid_coord: vecInt2(),
                                },
                            }),
                            mining_track_button: object({
                                keys: {
                                    layout_grid_coord: vecInt2(),
                                },
                            }),
                        },
                    }),
                    excavation_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures, {
                        extra_properties: {
                            excavation_track_button: {
                                layout_grid_coord: vecInt2(),
                                style: super.style(),
                            },
                            planet_artifact_button: {
                                layout_grid_coord: vecInt2(),
                                style: super.style(),
                            },
                            planet_bonus_0_button: {
                                layout_grid_coord: vecInt2(),
                                style: super.style(),
                            },
                            planet_bonus_1_button: {
                                layout_grid_coord: vecInt2(),
                                style: super.style(),
                            },
                        },
                    }),
                    npc_reputation_ability_buttons_panel: super.button_panel({
                        extra_properties: {
                            button_layout_grid: super.layout_grid(),
                            button_shared_definition: object({
                                keys: {
                                    style: super.style(),
                                },
                            }),
                        },
                    }),
                    planet_components_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures),
                    increase_bounty_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                        extra_properties: {
                            increase_amount_label: this.cache.localisation,
                        },
                    }),
                },
            }),
        })
    }
}
