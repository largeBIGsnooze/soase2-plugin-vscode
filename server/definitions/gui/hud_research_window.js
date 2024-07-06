const { schema, string, object, integer, float, percentage, array, boolean, color } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudResearchWindow extends Definitions {
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
                container_window: object({
                    keys: {
                        layout: super.layout(),
                        research_subject_icon_button_shared_definition: object({
                            keys: {
                                does_not_pass_text_filter_alpha: percentage(),
                                is_unlocked_in_future_alpha: percentage(),
                            },
                        }),
                        top_content_window: object({
                            keys: {
                                layout: super.layout(),
                                background: object({
                                    keys: {
                                        components: array({
                                            items: object({
                                                keys: {
                                                    layout: super.layout(),
                                                    brush: this.cache.textures,
                                                    brush_render_style: super.brush_render_style(),
                                                },
                                            }),
                                        }),
                                    },
                                }),
                                domain_name_postfix: this.cache.localisation,
                                header_label: super.label(this.cache),
                                view_is_compressed_button: super.button(this.cache),
                                text_filter: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: object({
                                            keys: {
                                                brush: this.cache.textures,
                                                brush_render_style: super.brush_render_style(),
                                            },
                                        }),
                                        icon: super.icon(this.cache.textures),
                                        text_entry: object({
                                            keys: {
                                                layout: super.layout(),
                                                style: super.style(),
                                            },
                                        }),
                                        clear_button: super.button(this.cache),
                                        tooltip_header_label: this.cache.localisation,
                                        tooltip_description: super.label_form2(this.cache),
                                    },
                                }),
                                tier_buttons_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        tier_count: integer(),
                                        button_shared_definition: object({
                                            keys: {
                                                style: super.style(),
                                                not_completed_overlays: super.overlays(this.cache.textures),
                                                completed_overlays: super.overlays(this.cache.textures),
                                                build_overlay: object({
                                                    keys: {
                                                        fill: string(),
                                                        glow: string(),
                                                    },
                                                }),
                                                status_icon_margins: super.margins(),
                                                cannot_acquire_icon_layout: super.layout(),
                                                cannot_acquire_icon_background: string(),
                                                waiting_icon_layout: super.layout(),
                                                waiting_icon_background: string(),
                                                is_not_available_alpha: percentage(),
                                                acquired_flash: object({
                                                    keys: {
                                                        brush: this.cache.textures,
                                                        duration: float(),
                                                    },
                                                }),
                                            },
                                        }),
                                        button_layout_grid: super.layout_grid(),
                                        link_brushes: object({
                                            keys: {
                                                normal: object({
                                                    keys: {
                                                        horizontal_connector_brush: string(),
                                                        arrow_brush: string(),
                                                    },
                                                }),
                                                completed: object({
                                                    keys: {
                                                        horizontal_connector_brush: string(),
                                                        arrow_brush: string(),
                                                    },
                                                }),
                                            },
                                        }),
                                    },
                                }),
                            },
                        }),
                        bottom_content_window: object({
                            keys: {
                                opening_duration: float(),
                                closing_duration: float(),
                                fade_function: string(),
                                move_function: string(),
                                popup_container_layout: super.layout(),
                                background: object({
                                    keys: {
                                        components: array({
                                            items: object({
                                                keys: {
                                                    layout: super.layout(),
                                                    brush: this.cache.textures,
                                                    brush_render_style: super.brush_render_style(),
                                                },
                                            }),
                                        }),
                                    },
                                }),
                                researching_research_subject_buttons_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        button_layout_grid: super.layout_grid(),
                                        max_buttons_count: integer(),
                                        components: array({
                                            items: [],
                                        }),
                                    },
                                }),
                            },
                        }),
                        research_subjects_container_window: object({
                            keys: {
                                layout: super.layout(),
                                tree_window_shared_definition: object({
                                    keys: {
                                        background: object({
                                            keys: {
                                                layout: super.layout(),
                                                brush: this.cache.textures,
                                                brush_render_style: super.brush_render_style(),
                                            },
                                        }),
                                        scrollable_container: object({
                                            keys: {
                                                mouse_wheel_scroll_speed: float(),
                                                scroll_bar_layout: super.scroll_bar_layout(),
                                                scroll_bar_style: super.style(),
                                                field_windows_panel: object({
                                                    keys: {
                                                        seperator_height: integer(),
                                                        seperator_brush: string(),
                                                        field_window: object({
                                                            keys: {
                                                                header_picture: object({
                                                                    keys: {
                                                                        is_scale_to_fit_enabled: boolean(),
                                                                    },
                                                                }),
                                                                header_label: object({
                                                                    keys: {
                                                                        style: super.style(),
                                                                        layout: super.layout(),
                                                                    },
                                                                }),
                                                                background_colors: array({
                                                                    items: color(),
                                                                }),
                                                                buttons_panel: object({
                                                                    keys: {
                                                                        outer_margins: super.margins(),
                                                                        column_grid: super.layout_grid(),
                                                                        uncompressed_icon_buttons_grid: super.layout_grid(),
                                                                        compressed_icon_buttons_grid: super.layout_grid(),
                                                                        does_not_pass_text_filter_grid_link_alpha: percentage(),
                                                                        grid_link_state_brushes: object({
                                                                            keys: {
                                                                                normal: super.grid_link_state_brush(this.cache.textures),
                                                                                completed: super.grid_link_state_brush(this.cache.textures),
                                                                                unavailable: super.grid_link_state_brush(this.cache.textures),
                                                                            },
                                                                        }),
                                                                        debug_font: this.cache.fonts,
                                                                    },
                                                                }),
                                                            },
                                                        }),
                                                    },
                                                }),
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
