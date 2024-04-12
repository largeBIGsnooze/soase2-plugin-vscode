const { schema, string, object, integer, vector2, vecInt2 } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudShipWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                bar_size: vecInt2(),
                background: super.background(this.cache.textures),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        player_ownership_window: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        picture_window: object({
                            keys: {
                                layout: super.layout(),
                                overlay: super.background(this.cache.textures),
                                unit_bar_layout: super.layout(),
                                name_text_entry_box: super.entry_box(this.cache.textures),
                                name_text_entry_underlay: super.background(this.cache.textures),
                                level_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        font: this.cache.fonts,
                                        color: this.cache.colors,
                                    },
                                }),
                            },
                        }),
                        analysis_scope_windows_panel: object({
                            keys: {
                                layout: super.layout(),
                                scope_window_shared_definition: object({
                                    keys: {
                                        analysis_scope_icons: object({
                                            keys: {
                                                weapons: this.cache.textures,
                                                defense: this.cache.textures,
                                                abilities: this.cache.textures,
                                            },
                                        }),
                                        analysis_scope_grid_coords: object({
                                            keys: {
                                                weapons: vecInt2(),
                                                defense: vecInt2(),
                                                abilities: vecInt2(),
                                            },
                                        }),
                                    },
                                }),
                                scope_windows_layout_grid: object({
                                    keys: {
                                        outer_margin: vecInt2(),
                                        element_spacing: vecInt2(),
                                        element_size: vecInt2(),
                                    },
                                }),
                            },
                        }),
                        positive_buffs_indicator_window: object({
                            keys: {
                                layout: super.layout(),
                                on_icon: this.cache.textures,
                                off_icon: this.cache.textures,
                            },
                        }),
                        negative_buffs_indicator_window: object({
                            keys: {
                                layout: super.layout(),
                                on_icon: this.cache.textures,
                                off_icon: this.cache.textures,
                            },
                        }),
                        action_bar: object({
                            keys: {
                                layout: super.layout(),
                                move_button: object({
                                    keys: {
                                        layout: super.layout(),
                                        style: super.style(),
                                        mode_defs: object({
                                            keys: {
                                                move_in_formation: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        highlighted_icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        highlighted_fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                                move_not_in_formation: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        highlighted_icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        highlighted_fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                                wide_move_in_formation: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        highlighted_icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        highlighted_fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                                wide_move_not_in_formation: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        highlighted_icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        highlighted_fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                            },
                                        }),
                                        is_synchronize_formation_movement_enabled_toggle_on_line: super.label_form(this.cache),
                                        is_synchronize_formation_movement_enabled_toggle_off_line: super.label_form(this.cache),
                                        is_wide_move_enabled_toggle_on_line: super.label_form(this.cache),
                                    },
                                }),
                                attack_button: super.button(this.cache, {
                                    extra_properties: {
                                        highlighted_icon: this.cache.textures,
                                        fleet_icon: this.cache.textures,
                                        highlighted_fleet_icon: this.cache.textures,
                                    },
                                }),
                                ai_auto_order_mode_button: super.button(this.cache, {
                                    extra_properties: {
                                        mode_definitions: object({
                                            keys: {
                                                hold_position: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                                engage_only_targets_within_range: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                                engage_any_targets: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                            },
                                        }),
                                    },
                                }),
                                ai_auto_order_mode_button: super.button(this.cache, {
                                    extra_properties: {
                                        mode_definitions: object({
                                            keys: {
                                                hold_position: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                                engage_only_targets_within_range: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                                engage_any_targets: object({
                                                    keys: {
                                                        icon: this.cache.textures,
                                                        fleet_icon: this.cache.textures,
                                                        name: this.cache.localisation,
                                                        description: this.cache.localisation,
                                                    },
                                                }),
                                            },
                                        }),
                                    },
                                }),
                                stop_button: super.button(this.cache, {
                                    extra_properties: {
                                        fleet_icon: this.cache.textures,
                                    },
                                }),
                            },
                        }),
                        ability_bar: object({
                            keys: {
                                layout: super.layout(),
                                stack_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures),
                                ability_0_button: object({
                                    keys: {
                                        layout: super.layout(),
                                    },
                                }),
                                ability_1_button: object({
                                    keys: {
                                        layout: super.layout(),
                                    },
                                }),
                                ability_2_button: object({
                                    keys: {
                                        layout: super.layout(),
                                    },
                                }),
                                ability_3_button: object({
                                    keys: {
                                        layout: super.layout(),
                                    },
                                }),
                            },
                        }),
                        items_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures),
                        toggle_advanced_ship_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                        toggle_carrier_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                                squadron_counts_overlay_layout: super.layout(),
                                squadron_counts_overlay_font: this.cache.fonts,
                                squadron_counts_overlay_color: this.cache.colors,
                            },
                        }),
                        toggle_unit_factory_window_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                    },
                }),
                increase_ability_level_bar: object({
                    keys: {
                        layout: super.layout(),
                        stack_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures),
                        ability_0_button: super.button(this.cache),
                        ability_1_button: super.button(this.cache),
                        ability_2_button: super.button(this.cache),
                        ability_3_button: super.button(this.cache),
                    },
                }),
            },
        })
    }
}
