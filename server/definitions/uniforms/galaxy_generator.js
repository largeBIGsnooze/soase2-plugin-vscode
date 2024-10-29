const { schema, object, array, string, float, vector3f, vector2f, integer, boolean, color, enumerate } = require('../data_types')

// TODO: Re-check for newer versions
module.exports = class GalaxyGeneratorUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    npc_filling_type() {
        return enumerate({
            items: ['guardian', 'militia', 'enemy_faction', 'friendly_faction'],
        })
    }

    npc_fillings() {
        return array({
            items: object({
                keys: {
                    name: string(),
                    filling: object({
                        keys: {
                            player_definition: this.cache.players,
                            npc_filling_type: this.npc_filling_type(),
                            npc_id: string(),
                        },
                    }),
                },
            }),
        })
    }

    random_fixture_fillings() {
        return array({
            items: object({
                keys: {
                    name: string(),
                    filling: object({
                        required: ['items'],
                        keys: {
                            items: array({
                                items: object({
                                    keys: {
                                        skybox: this.cache.skyboxes,
                                        probability: float(),
                                        name: this.cache.fixture_fillings,
                                    },
                                }),
                            }),
                        },
                    }),
                },
            }),
        })
    }

    gravity_well_fillings() {
        return array({
            items: object({
                keys: {
                    name: string(),
                    filling: object({
                        required: ['sockets'],
                        keys: {
                            sockets: array({
                                items: object({
                                    keys: {
                                        distance_as_percent_of_parent_inner_move_radius: vector2f(),
                                        angle: vector2f(),
                                        socket_children: array({
                                            items: object({
                                                required: ['distance_as_percent_of_parent_inner_move_radius', 'angle'],
                                                keys: {
                                                    distance_as_percent_of_parent_inner_move_radius: vector2f(),
                                                    angle: vector2f(),
                                                },
                                            }),
                                        }),
                                    },
                                }),
                            }),
                        },
                    }),
                },
            }),
        })
    }

    random_gravity_well_fillings() {
        return array({
            items: object({
                keys: {
                    name: string(),
                    filling: object({
                        keys: {
                            items: array({
                                items: object({
                                    keys: {
                                        skybox: this.cache.skyboxes,
                                        probability: float(),
                                        name: string(),
                                    },
                                }),
                            }),
                        },
                    }),
                },
            }),
        })
    }
    node_fillings() {
        return array({
            items: object({
                keys: {
                    name: string(),
                    filling: object({
                        keys: {
                            editor_color: color(),
                            is_existence_known_to_all: boolean(),
                            editor_visual_tag: string(),
                            primary_random_fixture_filling_name: this.cache.random_fixture_fillings,
                            secondary_random_fixture_filling_name: this.cache.random_fixture_fillings,
                            primary_random_fixture_with_moon_filling_name: this.cache.random_fixture_fillings,
                            is_primary_fixture_player_home_planet: boolean(),
                            gravity_wells: this.cache.gravity_wells,
                        },
                    }),
                },
            }),
        })
    }
    fixture_fillings() {
        return array({
            items: object({
                keys: {
                    name: string(),
                    filling: object({
                        keys: {
                            entity_definition: this.cache.units,
                            required_planet_bonuses: array({
                                items: this.cache.planet_bonuses,
                                isUnique: true,
                            }),
                            militia_supply: array({
                                items: float(),
                            }),
                        },
                    }),
                },
            }),
        })
    }
    moon_fillings() {
        return array({
            items: object({
                keys: {
                    name: string(),
                    filling: object({
                        keys: {
                            moons: array({
                                items: object({
                                    keys: {
                                        filling_name: string(),
                                        orbit_parent: boolean(),
                                        sync_orbit_to_parent: boolean(),
                                        use_parent_ownership: boolean(),
                                        ignore_orbit_overlap_checks: boolean(),
                                        orbit_speed_scalar: float(),
                                        planet_offset: vector2f(),
                                        counts: array({
                                            items: object({
                                                keys: {
                                                    count: integer(),
                                                    probability: float(),
                                                },
                                            }),
                                        }),
                                    },
                                }),
                            }),
                        },
                    }),
                },
            }),
        })
    }

    gravity_well_orbit_durations_by_hierarchy_depth_definition() {
        return array({
            items: object({
                keys: {
                    min: object({
                        keys: {
                            radius: float(),
                            time_in_hours: float(),
                        },
                    }),
                    max: object({
                        keys: {
                            radius: float(),
                            time_in_hours: float(),
                        },
                    }),
                },
            }),
        })
    }

    fillings_definition() {
        return object({
            keys: {
                npc_fillings: this.npc_fillings(),
                random_gravity_well_fillings: this.random_gravity_well_fillings(),
                gravity_well_fillings: this.gravity_well_fillings(),
                random_fixture_fillings: this.random_fixture_fillings(),
                node_fillings: this.node_fillings(),
                fixture_fillings: this.fixture_fillings(),
                moon_fillings: this.moon_fillings(),
            },
        })
    }

    create() {
        return schema({
            keys: {
                minimum_gravity_well_distances_by_hierarchy_depth: vector3f(),
                gravity_well_y_offsets_by_hierarchy_depth: array({
                    items: vector2f(),
                }),
                gravity_well_orbit_durations_by_hierarchy_depth: this.gravity_well_orbit_durations_by_hierarchy_depth_definition(),
                secondary_fixture_y_offset: vector2f(),
                min_jumps_to_any_home_planet_for_loot_level: array({
                    items: integer(),
                }),
                player_phase_resonance_points: array({
                    items: integer(),
                }),
                fillings: this.fillings_definition(),
            },
        })
    }
}
