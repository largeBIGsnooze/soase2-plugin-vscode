const { schema, object, float, color } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudSelectionWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                offset_from_top_when_side_by_side_top_bar: float(),
                offset_from_top_when_below_top_bar: float(),
                offset_from_bottom_when_side_by_side_bottom_bar: float(),
                offset_from_bottom_bar_top_when_above_bottom_bar: float(),
                embedded_style: object({
                    keys: {
                        item_margins: super.margins(),
                        scroll_bar_layout: super.layout(),
                    },
                }),
                background: object({
                    keys: {
                        fill_color: color(),
                    },
                }),
                shared_definition: object({
                    keys: {
                        unit_window_column_count: float(),
                        unit_window_layout_grid: super.layout_grid(),
                        primary_fixture_height: float(),
                        primary_fixture_window: object({
                            keys: {
                                icon_layout: super.layout(),
                                bars_layout: super.layout(),
                                level_layout: super.layout(),
                                player_icon_layout: super.layout(),
                                name_text_entry_layout: super.layout(),
                                corner_wedge_layout: super.layout(),
                                name_text_entry_style: super.style(),
                                level_alignment: super.alignment(),
                                level_font: this.cache.fonts,
                                unowned_player_icon: this.cache.textures,
                                never_detected_gravity_well_fixture_icon: this.cache.textures,
                                home_planet_overlay: this.cache.textures,
                                corner_wedge_icon: this.cache.textures,
                            },
                        }),
                        unit_window: object({
                            keys: {
                                icon_layout: super.layout(),
                                bars_layout: super.layout(),
                                level_layout: super.layout(),
                                stack_count_layout: super.layout(),
                                stack_count_font: this.cache.fonts,
                                stack_count_alignment: super.alignment(),
                                stack_count_color: this.cache.colors,
                                level_font: this.cache.fonts,
                                level_alignment: super.alignment(),
                                user_interface_status_fill_color_when_selected: color(),
                                user_interface_status_fill_color_when_sub_selected: color(),
                                user_interface_status_fill_color_when_under_cursor_or_bandboxed: color(),
                                toggle_should_stack_unit_input_line: super.label_form(this.cache),
                                right_click_attack_all_input_line: super.label_form(this.cache),
                                select_all_of_same_type_of_unit_input_line: super.label_form(this.cache),
                            },
                        }),
                        user_interface_status_border_width: float(),
                        user_interface_status_border_color: color(),
                        grid_line_width: float(),
                        grid_line_color: color(),
                    },
                }),
            },
        })
    }
}
