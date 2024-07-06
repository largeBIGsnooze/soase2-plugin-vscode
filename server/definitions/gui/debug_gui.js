const { schema, object, vecInt2, float, color } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DebugGui extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                docking_frame_window_style: object({
                    keys: {
                        min_window_size: vecInt2(),
                        resize_edge_tolerance: float(),
                        split_bar_tolerance: float(),
                        dragging_activation_distance: float(),
                        drag_drop_button_frame_margins: super.margins(),
                        drag_drop_button_size: vecInt2(),
                        drag_drop_button_background: object({
                            keys: {
                                fill_color: color(),
                                fill_color_hovered: color(),
                                border_color: color(),
                            },
                        }),
                        tab_text_margins: super.margins(),
                        tab_text_font: this.cache.fonts,
                        tab_text_color: color(),
                        active_tab_button_background: object({
                            keys: {
                                fill_color: color(),
                                border_color: color(),
                            },
                        }),
                        inactive_tab_button_background: object({
                            keys: {
                                fill_color: color(),
                                border_color: color(),
                            },
                        }),
                        dockable_window_style: object({
                            keys: {
                                close_button_layout: super.layout(),
                                title_layout: super.layout(),
                                content_layout: super.layout(),
                                content_layout_without_title_bar: super.layout(),
                                title_label_style: super.style(),
                                close_button_style: super.style(),
                                background: object({
                                    keys: {
                                        fill_color: color(),
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
