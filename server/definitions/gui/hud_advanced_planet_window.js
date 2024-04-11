const { schema, object, vecInt2, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudAdvancedPlanetWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                bar_size: vecInt2(),
                background_top_brush: this.cache.textures,
                background_middle_brush: this.cache.textures,
                background_bottom_brush: this.cache.textures,
                background_top_extra_height: float(),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        button_layout_grid: super.layout_grid(),
                        establish_home_planet_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        set_rally_point_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                            extra_properties: {
                                layout_grid_coord: vecInt2(),
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                        scuttle_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        rotate_structure_plate_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, {
                            extra_properties: {
                                layout_grid_coord: vecInt2(),
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                    },
                }),
            },
        })
    }
}
