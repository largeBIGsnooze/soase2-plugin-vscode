const { schema, object, float, boolean, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndPlayerThemePickerDialog extends Definitions {
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
                button_selected_animation: super.animation(this.cache.textures),
                selected_button_overlay: object({
                    keys: {
                        use_button_flash: boolean(),
                        button_flash: object({
                            keys: {
                                brush: this.cache.textures,
                                duration: float(),
                            },
                        }),
                        auto_cast_animation: super.animation(this.cache.textures),
                    },
                }),
                background_window: object({
                    keys: {
                        layout: super.layout(),
                        content_panel: object({
                            keys: {
                                layout: super.layout(),
                                header_icon_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        random_icon: this.cache.textures,
                                    },
                                }),
                                header_name_label: super.label(this.cache.localisation),
                                race_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                                    extra_properties: {
                                        random_player_race_name: this.cache.localisation,
                                    },
                                }),
                                faction_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                mesh_preview_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        initial_horizontal_angle: float(),
                                        initial_vertical_angle: float(),
                                        frame_outer_margins: super.margins(),
                                        frame_components: object({
                                            keys: {
                                                left: this.cache.textures,
                                                right: this.cache.textures,
                                                center: this.cache.textures,
                                            },
                                        }),
                                        minimal_team_color_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                                            extra_properties: {
                                                enabled_text: this.cache.localisation,
                                                disabled_text: this.cache.localisation,
                                                enabled_description: this.cache.localisation,
                                                disabled_description: this.cache.localisation,
                                            },
                                        }),
                                        cycle_mesh_backward_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                        cycle_mesh_forward_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                    },
                                }),
                                apply_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                close_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                color_group_buttons_panel: super.buttons_panel(this.cache.textures),
                                secondary_color_buttons_panel: super.buttons_panel(this.cache.textures),
                                icon_buttons_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        button_shared_definition: super.button_shared_definition(this.cache.textures, {
                                            extra_properties: {
                                                normal_background: this.cache.textures,
                                                selected_background: this.cache.textures,
                                                disabled_background: this.cache.textures,
                                                disabled_icon_color: color(),
                                            },
                                        }),
                                        background_outer_margins: super.margins(),
                                        background_components: object({
                                            keys: {
                                                left: this.cache.textures,
                                                right: this.cache.textures,
                                                center: this.cache.textures,
                                            },
                                        }),
                                        column_count: float(),
                                        max_button_count: float(),
                                        buttons_layout_grid: super.layout_grid(),
                                    },
                                }),
                                portrait_buttons_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        button_shared_definition: super.button_shared_definition(this.cache.textures, {
                                            extra_properties: {
                                                frame: object({
                                                    keys: {
                                                        brush: this.cache.textures,
                                                        brush_render_style: super.brush_render_style(),
                                                    },
                                                }),
                                                disabled_frame: object({
                                                    keys: {
                                                        brush: this.cache.textures,
                                                        brush_render_style: super.brush_render_style(),
                                                    },
                                                }),
                                            },
                                        }),
                                        background_outer_margins: super.margins(),
                                        background_components: object({
                                            keys: {
                                                left: this.cache.textures,
                                                right: this.cache.textures,
                                                center: this.cache.textures,
                                            },
                                        }),
                                        column_count: float(),
                                        max_button_count: float(),
                                        buttons_layout_grid: super.layout_grid(),
                                    },
                                }),
                                portrait_picture_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        frame_outer_margins: super.margins(),
                                        frame_components: object({
                                            keys: {
                                                left: this.cache.textures,
                                                right: this.cache.textures,
                                                center: this.cache.textures,
                                            },
                                        }),
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
