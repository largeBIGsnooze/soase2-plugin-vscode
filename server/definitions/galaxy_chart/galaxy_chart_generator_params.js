const { schema, object, string, integer, vector2f, array, float } = require('../data_types')

module.exports = class GalaxyChartGeneratorParams {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                skybox: this.cache.random_skybox_fillings,
                player_home_planet: object({
                    keys: {
                        filling_name: this.cache.node_fillings,
                        solar_system_radius_range: vector2f(),
                        moon_filling_name: this.cache.moon_fillings,
                    },
                }),
                recommended_team_count: integer(),
                solar_systems: array({
                    items: object({
                        keys: {
                            planet_phase_lane_chance: float(),
                            planet_phase_lane_max_distance_radius_scalar: float(),
                            radius: float(),
                            max_player_count: integer(),
                            artifact_count: integer(),
                            star: object({
                                keys: {
                                    filling_name: this.cache.node_fillings,
                                },
                            }),
                            planet_ranges: array({ items: {} }),
                        },
                    }),
                }),
            },
        })
    }
}
