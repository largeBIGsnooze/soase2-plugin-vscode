const { schema, object, string, array, enumerate, vector2f, float, percentage, boolean, integer } = require('../data_types')

module.exports = class PlanetUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                planets: array({
                    items: this.cache.planet_files,
                    isUnique: true,
                }),
                metal_asteroids: array({
                    items: this.cache.metal_asteroids,
                    isUnique: true,
                }),
                crystal_asteroids: array({
                    items: this.cache.crystal_asteroids,
                    isUnique: true,
                }),
                asteroid_y_offset_range: vector2f(),
                scuttle_duration: float(),
                give_bounty_min_supply: float(),
                give_bounty_max_supply: float(),
                give_bounty_min_rate: float(),
                give_bounty_max_rate: float(),
                destroyed_planet_mutation: this.cache.mutations,
                min_elevator_buffer_distance_surface_radius_scalar: float(),
                max_elevator_connection_distance_surface_radius_scalar: float(),
                chance_of_first_planet_bonus: percentage(),
                chance_of_second_planet_bonus: percentage(),
                structure_plate_spin_speed: float(),
                random_planet_bonuses: array({
                    items: this.cache.planet_bonuses,
                    isUnique: true,
                }),
                chance_of_easter_egg_planet_bonus: percentage(),
                easter_egg_planet_bonuses: array({
                    items: this.cache.planet_bonuses,
                    isUnique: true,
                }),
                planet_artifacts: array({
                    items: this.cache.planet_artifacts,
                    isUnique: true,
                }),
                planet_types: array({
                    items: object({
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                            can_have_planet_elevators: boolean(),
                            excavation_track_levels: array({
                                items: object({
                                    keys: {
                                        rewards: array({
                                            items: object({
                                                keys: {
                                                    weight: float(),
                                                    reward: object({
                                                        keys: {
                                                            type: enumerate({
                                                                items: ['exotics'],
                                                            }),
                                                            exotic_count: integer(),
                                                            exotic_type: this.cache.exotics,
                                                        },
                                                    }),
                                                },
                                            }),
                                        }),
                                    },
                                }),
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
