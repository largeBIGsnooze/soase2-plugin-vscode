const { schema, string, object, integer, float, array, percentage, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudColonizedPlanetsWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
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
                                components: array({
                                    items: object({
                                        keys: {
                                            layout: super.layout(),
                                            brush: string(),
                                            brush_render_style: super.brush_render_style(),
                                        },
                                    }),
                                }),
                            },
                        }),
                        content_window: object({
                            keys: {
                                layout: super.layout(),
                                colonized_planet_window_shared_definition: object({
                                    keys: {
                                        height: float(),
                                        // TODO: Find out properties of this
                                        other_planet_popup_open_window_overlay: object({
                                            keys: {},
                                        }),
                                        picture_window: object({
                                            keys: {
                                                layout: super.layout(),
                                            },
                                        }),
                                        name_text_entry_box_style: super.style(),
                                        name_text_entry_box_layout: super.layout(),
                                        track_button_shared_definition: object({
                                            keys: {
                                                tooltip_name_color: this.cache.colors,
                                                tooltip_level_color: this.cache.colors,
                                            },
                                        }),
                                        structure_stack_button_shared_definition: object({
                                            keys: {
                                                no_structures_alpha: percentage(),
                                            },
                                        }),
                                        structure_slots_window_shared_definition: object({
                                            keys: {
                                                show_icon: boolean(),
                                                text_layout: super.layout(),
                                                icon_layout: super.layout(),
                                                font: this.cache.fonts,
                                                partially_used_slots_color: this.cache.colors,
                                                fully_used_slots_color: this.cache.colors,
                                            },
                                        }),

                                        summary_view_window: object({
                                            keys: {
                                                asset_income_window_shared_definition: object({
                                                    keys: {
                                                        text_layout: super.layout(),
                                                        icon_layout: super.layout(),
                                                        font: this.cache.fonts,
                                                    },
                                                }),
                                                credit_income_window: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                    },
                                                }),
                                                metal_income_window: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                    },
                                                }),
                                                crystal_income_window: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                    },
                                                }),
                                                defense_track_button: super.button(this.cache),
                                                commerce_track_button: super.button(this.cache),
                                                mining_track_button: super.button(this.cache),
                                                excavation_track_button: super.button(this.cache),
                                                logistics_track_button: super.button(this.cache),
                                            },
                                        }),
                                        planet_components_view_window: object({
                                            keys: {
                                                logistics_track_button: super.button(this.cache),
                                                structure_slots_window: super.button(this.cache),
                                                planet_components_panel: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        row_count: float(),
                                                        button_layout_grid: super.layout_grid(),
                                                    },
                                                }),
                                                structure_stacks_panel: super.stacks_panel(),
                                                asteroids_panel: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        button_layout_grid: super.layout_grid(),
                                                    },
                                                }),
                                            },
                                        }),
                                        button_layout_grid: object({
                                            keys: {
                                                logistics_track_button: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                    },
                                                }),
                                                structure_slots_window: super.button(this.cache),
                                                structure_stacks_panel: super.stacks_panel(),
                                            },
                                        }),
                                        civilian_structures_view_window: object({
                                            keys: {
                                                logistics_track_button: super.button(this.cache),
                                                structure_slots_window: super.button(this.cache),
                                                structure_stacks_panel: super.stacks_panel(),
                                                asteroids_panel: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        button_layout_grid: super.layout_grid(),
                                                    },
                                                }),
                                            },
                                        }),
                                        military_structures_view_window: object({
                                            keys: {
                                                defense_track_button: super.button(this.cache),
                                                structure_slots_window: super.button(this.cache),
                                                structure_stacks_panel: super.stacks_panel(),
                                                asteroids_panel: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        button_layout_grid: super.layout_grid(),
                                                    },
                                                }),
                                            },
                                        }),
                                    },
                                }),
                                purchase_unit_item_window: object({
                                    keys: {
                                        background: object({
                                            keys: {
                                                brush: this.cache.textures,
                                            },
                                        }),
                                        content_window: super.content_window(),
                                    },
                                }),
                                planets_list_box: this.list_box(this.cache.localisation),
                                view_buttons_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        orientation: super.orientation(),
                                        children_gap: integer(),
                                        summary_view_button: super.button(this.cache),
                                        planet_components_view_button: super.button(this.cache),
                                        civilian_structures_view_button: super.button(this.cache),
                                        military_structures_view_button: super.button(this.cache),
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
