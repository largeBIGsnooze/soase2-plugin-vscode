const loc_keys = require('../../loc_keys')
const { schema, object, string, array, enumerate, vector2f, float, percentage, boolean, integer } = require('../data_types')

module.exports = class PlanetUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    surveying_track_levels_definition() {
        return array({
            items: object({
                required: ['exotics'],
                keys: {
                    rewards: array({
                        items: object({
                            required: ['weight'],
                            keys: {
                                reward: object({
                                    required: ['assets_amount', 'exotic_count', 'exotic_type', 'item', 'type'],
                                    keys: {
                                        assets_amount: integer(),
                                        exotic_count: integer(),
                                        exotic_type: this.cache.exotics,
                                        item: string('not quite sure what this is'), // TODO: Find out what this is,
                                        type: enumerate({
                                            items: ['assets', 'exotics', 'unit_item'],
                                        }),
                                    },
                                }),
                                weight: float(),
                            },
                        }),
                    }),
                    exotics: object({
                        required: ['bonus_exotic_chances', 'guaranteed_counts'],
                        keys: {
                            guaranteed_counts: array({
                                items: object({
                                    required: ['count', 'exotic_type'],
                                    keys: {
                                        count: array({ items: float() }),
                                        exotic_type: this.cache.exotics,
                                    },
                                }),
                            }),
                            bonus_exotic_chances: array({
                                items: object({
                                    required: ['chance', 'exotic_type'],
                                    keys: {
                                        exotic_type: this.cache.exotics,
                                        chance: percentage(),
                                    },
                                }),
                            }),
                        },
                    }),
                },
            }),
        })
    }

    population_definition() {
        return object({
            keys: {
                starting_population: integer(true),
                population_maximum: integer(true),
                growth_rate: float(true),
                growth_rate_if_above_max_population: float(false),
            },
        })
    }

    create() {
        return schema({
            required: [
                'artifact_to_planet_count_ratio',
                'artifacts',
                'asteroid_y_offset_range',
                'chance_of_easter_egg_planet_bonus',
                'chance_of_first_planet_bonus',
                'chance_of_second_planet_bonus',
                'crystal_asteroids',
                'destroyed_planet_mutation',
                'easter_egg_planet_bonuses',
                'max_elevator_connection_distance_surface_radius_scalar',
                'metal_asteroids',
                'min_elevator_buffer_distance_surface_radius_scalar',
                'planet_types',
                'planets',
                'random_planet_bonuses',
                'scuttle_duration',
                'structure_plate_spin_speed',
            ],
            keys: {
                /* game_version v1.30.3 */
                overwrite_metal_asteroids: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_crystal_asteroids: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_planets: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_planet_types: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_random_planet_bonuses: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_easter_egg_planet_bonuses: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_artifacts: boolean(loc_keys.OVERWRITE_IDS),
                /* */
                artifact_to_planet_count_ratio: float(),
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
                artifacts: array({
                    items: this.cache.planet_artifacts,
                    isUnique: true,
                }),
                planet_types: array({
                    items: object({
                        required: ['localized_name', 'name', 'surveying_track_levels', 'tooltip_icon'],
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                            tooltip_icon: this.cache.textures(),
                            can_have_planet_elevators: boolean(),
                            surveying_track_levels: this.surveying_track_levels_definition(),
                            can_have_artifacts: boolean(),
                            population: this.population_definition(),
                        },
                    }),
                }),
            },
        })
    }
}
