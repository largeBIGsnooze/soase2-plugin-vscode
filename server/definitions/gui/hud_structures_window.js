const { schema, object, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudStructuresWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                bar_width: float(),
                background_top_brush: this.cache.textures,
                background_middle_brush: this.cache.textures,
                background_bottom_brush: this.cache.textures,
                background_top_extra_height: float(),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        build_groups_horizontal_gap: float(),
                        build_group_window_shared_definition: object({
                            keys: {
                                header_window: object({
                                    keys: {
                                        build_group_name_font: this.cache.fonts,
                                        build_group_name_color: this.cache.colors,
                                        slot_counts_font: this.cache.fonts,
                                        slot_counts_color: this.cache.colors,
                                        gap: float(),
                                    },
                                }),
                                header_window_layout: super.layout(),
                                buttons_panel_layout: super.layout(),
                                buttons_panel_shared_definition: object({
                                    keys: {
                                        button_layout_grid: super.layout_grid(),
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
