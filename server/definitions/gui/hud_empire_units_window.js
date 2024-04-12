const { schema, string, object, integer, float, array, vecInt2 } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudEmpireUnitsWindow extends Definitions {
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
                                    items: this.component(this.cache.textures),
                                    isUnique: true,
                                }),
                            },
                        }),
                        content_window: object({
                            keys: {
                                layout: super.layout(),
                                empire_unit_window_shared_definition: {
                                    other_unit_popup_open_window_overlay: object({
                                        keys: {},
                                    }),
                                    fleet_view_window: object({
                                        keys: {
                                            height: float(),
                                            picture_window: super.window_frame(this.cache),
                                            name_text_entry_box_style: super.style(),
                                            name_text_entry_box_layout: super.layout(),
                                            delete_fleet_button: super.button(this.cache),
                                        },
                                    }),
                                    capital_ship_view_window: object({
                                        keys: {
                                            height: float(),
                                            picture_window: super.window_frame(this.cache),
                                            name_text_entry_box_style: super.style(),
                                            name_text_entry_box_layout: super.layout(),
                                            ability_buttons_panel: object({
                                                keys: {
                                                    layout: super.layout(),
                                                    button_size: vecInt2(),
                                                    button_stride: vecInt2(),
                                                },
                                            }),
                                            ship_components_panel: object({
                                                keys: {
                                                    layout: super.layout(),
                                                    row_count: integer(),
                                                    button_layout_grid: super.layout_grid(),
                                                },
                                            }),
                                        },
                                    }),
                                    starbase_view_window: object({
                                        keys: {
                                            height: float(),
                                            gravity_well_fixture_picture_window: super.window_frame(this.cache),
                                            starbase_picture_window: super.window_frame(this.cache),
                                            planet_name_label_style: super.style(),
                                            planet_name_layout: super.layout(),
                                            ship_components_panel: object({
                                                keys: {
                                                    layout: super.layout(),
                                                    row_count: integer(),
                                                    button_layout_grid: super.layout_grid(),
                                                },
                                            }),
                                        },
                                    }),
                                },
                                purchase_unit_item_window: object({
                                    keys: {
                                        background: super.background(this.cache.textures),
                                        content_window: object({
                                            keys: {
                                                build_groups_horizontal_gap: float(),
                                                build_group_window_shared_definition: object({
                                                    keys: {
                                                        header_label_style: super.header_label_style(),
                                                        header_label_layout: super.layout(),
                                                        buttons_panel_layout: super.layout(),
                                                        buttons_panel_shared_definition: object({
                                                            keys: {
                                                                button_layout_grid: super.layout_grid(),
                                                                min_row_count: integer(),
                                                                max_row_count: integer(),
                                                            },
                                                        }),
                                                    },
                                                }),
                                            },
                                        }),
                                    },
                                }),
                                units_list_box: super.list_box(this.cache.localisation),
                                view_buttons_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        orientation: 'horizontal',
                                        children_gap: 5,
                                        capital_ship_view_button: super.button(this.cache),
                                        starbase_view_button: super.button(this.cache),
                                    },
                                }),
                                toggle_auto_level_up_abilities_button: super.button(this.cache, {
                                    extra_properties: {
                                        enabled_text: super.label_form2(this.cache),
                                        disabled_text: super.label_form2(this.cache),
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
