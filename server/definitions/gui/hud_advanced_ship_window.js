const { schema, object, vecInt2, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudAdvancedShipWindow extends Definitions {
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
                        fleet_ownership_window: super.window_frame(this.cache),
                        fleet_name_text_entry_box: super.text_entry(),
                        button_layout_grid: super.layout_grid(),
                        set_rally_point_button: super.button(this.cache, {
                            extra_properties: {
                                layout_grid_coord: vecInt2(),
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                        leave_fleet_button: super.button(this.cache),
                        scuttle_button: super.button(this.cache),
                        rotate_button: super.button(this.cache, {
                            extra_properties: {
                                layout_grid_coord: vecInt2(),
                                spin_structure_plate_description: super.label_form2(this.cache),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
