const { schema, object, integer, vecInt2, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudCarrierWindow extends Definitions {
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
                slot_buttons_panel: object({
                    keys: {
                        layout: super.layout(),
                        orientation: super.orientation(),
                        children_gap: float(),
                        max_slot_buttons_count: float(),
                        button_shared_definition: object({
                            keys: {
                                style: super.style(),
                                button_layout: object({
                                    keys: {
                                        width: float(),
                                        height: float(),
                                    },
                                }),
                                tooltip: object({
                                    keys: {
                                        title_name_color: this.cache.colors,
                                        title_count_color: this.cache.colors,
                                        squadron_size_label_text: this.cache.localisation,
                                        squadron_size_value_color: this.cache.colors,
                                        available_capacity_header_text: this.cache.localisation,
                                        available_capacity_value_color: this.cache.colors,
                                        building_strikecraft_header_text: this.cache.localisation,
                                        building_strikecraft_count_color: this.cache.colors,
                                        max_carrier_line_count: integer(),
                                    },
                                }),
                            },
                        }),
                    },
                }),
                launch_button: super.button(this.cache, {
                    extra_properties: {
                        highlighted_icon: this.cache.textures,
                    },
                }),
                dock_button: super.button(this.cache, {
                    extra_properties: {
                        highlighted_icon: this.cache.textures,
                    },
                }),
            },
        })
    }
}
