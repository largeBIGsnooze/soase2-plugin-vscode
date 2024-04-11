const { schema, object, float, percentage, integer, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class UnitBarUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
    }

    sizes() {
        return object({
            keys: {
                normal: object({
                    keys: {
                        thin_bar_height: integer(),
                        thick_bar_height: integer(),
                        vertical_gap: integer(),
                        horizontal_gap: integer(),
                        background_gap: integer(),
                    },
                }),
                large: object({
                    keys: {
                        thin_bar_height: integer(),
                        thick_bar_height: integer(),
                        vertical_gap: integer(),
                        horizontal_gap: integer(),
                        background_gap: integer(),
                    },
                }),
            },
            required: ['normal', 'large'],
        })
    }

    create() {
        return schema({
            keys: {
                min_mesh_view_width: float(),
                max_mesh_view_width: float(),
                max_shield_to_armor_width_ratio: percentage(),
                planet_health_to_shield_width_ratio: percentage(),
                shield_burst_blink_visible_duration: float(),
                shield_burst_blink_duration: float(),
                crippled_hull_blink_duration: float(),
                scuttle_blink_duration: float(),
                flat_bar_contexts: object({
                    keys: {
                        main_view_mesh: object({
                            keys: {
                                sizes: this.sizes(),
                            },
                        }),
                        main_view_icon: object({
                            keys: {
                                sizes: this.sizes(),
                            },
                        }),
                        hud_icon: object({
                            keys: {
                                background_color: color(),
                                sizes: this.sizes(),
                            },
                        }),
                        ship_window: object({
                            keys: {
                                background_color: color(),
                                sizes: this.sizes(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
