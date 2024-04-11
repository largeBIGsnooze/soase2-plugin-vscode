const { schema, object, array, string, float, vector3, vector2, integer, boolean, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class GalaxyGeneratorUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    npc_fillings() {
        return array({
            items: object({
                keys: {
                    name: string(),
                    filling: object({
                        keys: {
                            player_definition: this.cache.players,
                            npc_filling_type: string(),
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
                                        skybox: string(),
                                        probability: integer(),
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
                                        distance_as_percent_of_parent_inner_move_radius: vector2(),
                                        angle: vector2(),
                                        socket_children: array({
                                            items: object({
                                                required: ['distance_as_percent_of_parent_inner_move_radius', 'angle'],
                                                keys: {
                                                    distance_as_percent_of_parent_inner_move_radius: vector2(),
                                                    angle: vector2(),
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
                                        skybox: string(),
                                        probability: integer(),
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
                            primary_random_fixture_filling_name: this.cache.fillings('fixtures'),
                            secondary_random_fixture_filling_name: this.cache.fillings('fixtures'),
                            primary_random_fixture_with_moon_filling_name: string(),
                            is_primary_fixture_player_home_planet: boolean(),
                            gravity_wells: this.cache.fillings('all'),
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
                                        planet_offset: vector2(),
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

    random_skybox_fillings() {
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
                                        probability: integer(),
                                    },
                                }),
                            }),
                        },
                    }),
                },
            }),
        })
    }

    create() {
        return schema({
            keys: {
                minimum_gravity_well_distances_by_hierarchy_depth: vector3(),
                gravity_well_y_offsets_by_hierarchy_depth: array({
                    items: vector2(),
                }),
                gravity_well_orbit_durations_by_hierarchy_depth: array({
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
                }),
                secondary_fixture_y_offset: vector2(),
                min_jumps_to_any_home_planet_for_loot_level: array({
                    items: integer(),
                }),
                player_phase_resonance_points: array({
                    items: integer(),
                }),
                fillings: object({
                    keys: {
                        random_skybox_fillings: this.random_skybox_fillings(),
                        npc_fillings: this.npc_fillings(),
                        random_gravity_well_fillings: this.random_gravity_well_fillings(),
                        gravity_well_fillings: this.gravity_well_fillings(),
                        random_fixture_fillings: this.random_fixture_fillings(),
                        node_fillings: this.node_fillings(),
                        fixture_fillings: this.fixture_fillings(),
                        moon_fillings: this.moon_fillings(),
                    },
                }),
            },
        })
    }
}
