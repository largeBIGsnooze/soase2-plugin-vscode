const { schema, object, float, color, vecInt2 } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudBookmarksWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    pip_type() {
        return object({
            keys: {
                size: vecInt2(),
                icon: this.cache.textures,
                supply: float(false),
            },
        })
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                top_bar_overlap_offset_y: float(false),
                drop_area_border_color: color(),
                add_bookmark_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                bookmark_window_definition: object({
                    keys: {
                        height: float(),
                        icon_layout: super.layout(),
                        pip_groups_top_left_begin_offset: vecInt2(),
                        pip_group_spacing: float(),
                        pip_size: vecInt2(),
                        pip_group_border_size: vecInt2(),
                        max_pip_row_count: float(),
                        min_pip_column_count: float(),
                        pip_group_backdrop_when_hovered: this.cache.textures,
                        pip_icon: this.cache.textures,
                        pip_selected_color: color(),
                        pip_types: object({
                            keys: {
                                strikecraft: this.pip_type(),
                                frigate: this.pip_type(),
                                cruiser: this.pip_type(),
                                capital_ship: this.pip_type(),
                                titan: this.pip_type(),
                                starbase: this.pip_type(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
