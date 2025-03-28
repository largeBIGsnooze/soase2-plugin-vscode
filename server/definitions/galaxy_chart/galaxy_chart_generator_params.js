const { schema, object, string, integer, vector2f, array, float, percentage, enumerate } = require('../data_types')

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
                /* game_version v1.40.14 */
                extra_solar_system_offset_scalar: vector2f(),
                generate_random_star_amount_from_solar_systems: vector2f(),
                /* */
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
                            planet_ranges: array({
                                items: object({
                                    keys: {
                                        count: vector2f(),
                                        planet: object({
                                            keys: {
                                                filling_name: string(),
                                                solar_system_radius_range: vector2f(),
                                                chance_of_retrograde_orbit: percentage(),
                                            },
                                        }),
                                    },
                                }),
                            }),
                            /* game_version v1.40.14 */
                            npcs: array({
                                items: object({
                                    keys: {
                                        npc_filling_name: string(),
                                        planet: object({
                                            keys: {
                                                filling_name: this.cache.node_fillings,
                                                count: integer(),
                                                npc_filling_type: enumerate({ items: 'friendly_faction' }),
                                                solar_system_radius_range: vector2f(),
                                                chance_of_retrograde_orbit: percentage(),
                                                chance_of_first_planet_bonus: percentage(),
                                                chance_of_second_planet_bonus: percentage(),
                                                orbit_speed_scalar: float(),
                                            },
                                        }),
                                    },
                                }),
                            }),
                            /* */
                        },
                    }),
                }),
            },
        })
    }
}
