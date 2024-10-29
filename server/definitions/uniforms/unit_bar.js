const { schema, object, float, percentage, integer, color } = require('../data_types')

module.exports = class UnitBarUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {}

    sizes() {
        return object({
            keys: {
                normal: object({
                    required: ['horizontal_gap', 'thick_bar_height', 'thin_bar_height', 'vertical_gap'],
                    keys: {
                        thin_bar_height: integer(),
                        thick_bar_height: integer(),
                        vertical_gap: integer(),
                        horizontal_gap: integer(),
                        background_gap: integer(),
                    },
                }),
                large: object({
                    required: ['horizontal_gap', 'thick_bar_height', 'thin_bar_height', 'vertical_gap'],
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

    flat_bar_contexts_definition() {
        return object({
            required: ['hud_icon', 'main_view_icon', 'main_view_mesh', 'ship_window'],
            keys: {
                main_view_mesh: object({
                    required: ['sizes'],
                    keys: {
                        background_color: color(),
                        sizes: this.sizes(),
                    },
                }),
                main_view_icon: object({
                    required: ['sizes'],
                    keys: {
                        background_color: color(),
                        sizes: this.sizes(),
                    },
                }),
                hud_icon: object({
                    required: ['sizes'],
                    keys: {
                        background_color: color(),
                        sizes: this.sizes(),
                    },
                }),
                ship_window: object({
                    required: ['sizes'],
                    keys: {
                        background_color: color(),
                        sizes: this.sizes(),
                    },
                }),
            },
        })
    }

    create() {
        return schema({
            required: [
                'crippled_hull_blink_duration',
                'flat_bar_contexts',
                'max_mesh_view_width',
                'max_shield_to_armor_width_ratio',
                'min_mesh_view_width',
                'planet_health_to_shield_width_ratio',
                'scuttle_blink_duration',
                'shield_burst_blink_duration',
                'shield_burst_blink_visible_duration',
            ],
            keys: {
                min_mesh_view_width: float(),
                max_mesh_view_width: float(),
                max_shield_to_armor_width_ratio: percentage(),
                planet_health_to_shield_width_ratio: percentage(),
                shield_burst_blink_visible_duration: float(),
                shield_burst_blink_duration: float(),
                crippled_hull_blink_duration: float(),
                scuttle_blink_duration: float(),
                flat_bar_contexts: this.flat_bar_contexts_definition(),
            },
        })
    }
}
