const { schema, object, color, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class SettingsWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                dim_color: color(),
                dialog_frame: object({
                    keys: {
                        layout: super.layout(),
                        background: super.background(this.cache.textures),
                        close_button: super.button(this.cache),
                        view_buttons_panel: object({
                            keys: {
                                layout: super.layout(),
                                orientation: super.orientation(),
                                graphic_view_button: super.button(this.cache),
                                sound_view_button: super.button(this.cache),
                                ui_view_button: super.button(this.cache),
                                input_mapping_view_button: super.button(this.cache),
                            },
                        }),
                        view_frame: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                    },
                }),
                graphic_settings_window: object({
                    keys: {
                        layout: super.layout(),
                        resolution_label: super.button(this.cache),
                        resolution_drop_box: object({
                            keys: {
                                layout: super.layout(),
                                active_item_text_color: this.cache.colors,
                                window_mode_resizable_window_text: this.cache.localisation,
                                window_mode_virtual_fullscreen_text: this.cache.localisation,
                            },
                        }),
                        render_mesh_outlines_button: object({
                            keys: {
                                layout: super.layout(),
                                name: this.cache.localisation,
                                description: this.cache.localisation,
                            },
                        }),
                        apply_changes_button: super.button(this.cache),
                    },
                }),
                sound_settings_window: object({
                    keys: {
                        layout: super.layout(),
                        volume_window_shared_definition: object({
                            keys: {
                                label_width: float(),
                            },
                        }),
                        volume_windows_stack_panel: object({
                            keys: {
                                layout: super.layout(),
                                children_gap: float(),
                                master_volume_window: super.sound_settings_element(this.cache.localisation),
                                gui_volume_window: super.sound_settings_element(this.cache.localisation),
                                music_volume_window: super.sound_settings_element(this.cache.localisation),
                                dialogue_volume_window: super.sound_settings_element(this.cache.localisation),
                                effects_volume_window: super.sound_settings_element(this.cache.localisation),
                            },
                        }),
                    },
                }),
                input_mapping_settings_window: object({
                    keys: {
                        layout: super.layout(),
                        reset_all_button: super.button(this.cache),
                        list_box: super.settings_list_box(this.cache.localisation, this.cache.textures),
                    },
                }),
                bool_setting_button_shared_definition: object({
                    keys: {
                        style: super.style(),
                        value_text_when_true: this.cache.localisation,
                        value_text_when_false: this.cache.localisation,
                        value_color_when_true: this.cache.colors,
                        value_color_when_false: this.cache.colors,
                        anchor_location_on_button: super.anchor(),
                        anchor_location_on_tooltip: super.anchor(),
                    },
                }),
                ui_settings_window: object({
                    keys: {
                        layout: super.layout(),
                        dpi_settings_window: {
                            layout: super.layout(),
                            label: super.label(),
                            drop_box: object({
                                keys: {
                                    layout: super.layout(),
                                    auto_scaled_dpi_text_color: this.cache.colors,
                                    auto_scaled_description: super.label_form2(this.cache),
                                },
                            }),
                        },
                        buttons_panel: object({
                            keys: {
                                layout: super.layout(),
                                buttons_layout_grid: this.layout_grid(),
                                is_edge_camera_panning_enabled_button: super.grid_button(this.cache.localisation),
                                horizontal_camera_rotation_inverted_button: super.grid_button(this.cache.localisation),
                                vertical_camera_rotation_inverted_button: super.grid_button(this.cache.localisation),
                                is_show_advanced_tooltips_enabled_by_default_button: super.grid_button(this.cache.localisation),
                                is_synchronize_formation_movement_enabled_by_default_button: super.grid_button(this.cache.localisation),
                                show_planet_names_always_button: super.grid_button(this.cache.localisation),
                                build_structures_around_anchor_structure_button: super.grid_button(this.cache.localisation),
                                use_player_alliance_colors_button: super.grid_button(this.cache.localisation),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
