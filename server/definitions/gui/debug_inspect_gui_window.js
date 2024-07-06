const { schema, string, object, percentage, float, color } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DebugInspectGuiWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                title_text: string(),
                initial_state: super.initial_state(),
                content_window: object({
                    keys: {
                        show_selected_area_overlay_toggle_button: super.button2(),
                        show_selected_children_areas_overlay_toggle_button: super.button2(),
                        show_grid_lines_toggle_button: super.button2(),
                        split_panel: object({
                            keys: {
                                layout: super.layout(),
                                orientation: super.orientation(),
                                split_percentage: percentage(),
                                tree_box: object({
                                    keys: {
                                        indent_width: float(),
                                        expand_arrow_width: float(),
                                        expand_arrow_layout: super.layout(),
                                        expanded_arrow: this.cache.textures,
                                        not_expanded_arrow: this.cache.textures,
                                        default_text_color: color(),
                                        not_visible_text_color: color(),
                                        not_enabled_text_color: color(),
                                        focused_text_color: color(),
                                        window_event_text_width: float(),
                                        window_event_not_trapped_color: color(),
                                        window_event_trapped_by_self_color: color(),
                                        window_event_trapped_by_children_color: color(),
                                        window_event_visible_duration: float(),
                                        window_event_fade_duration: float(),
                                    },
                                }),
                                reflect_box: object({
                                    keys: {},
                                }),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
