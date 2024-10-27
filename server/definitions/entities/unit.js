const { schema, float, object, array, vector3f, boolean, enumerate, integer, vector2f, percentage, angle, vector2i } = require('../data_types')
const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const Definitions = require('../definitions')
const { UnitModifiers, PlanetModifiers } = require('../modifier_definitions')

module.exports = class Unit {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    unit_antimatter_definiton() {
        return object({
            required: ['antimatter_restore_rate', 'max_antimatter'],
            keys: {
                antimatter_restore_rate: float(),
                max_antimatter: float(),
                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
            },
        })
    }

    attack_pattern_definition(ctx, ptr) {
        try {
            const _ = [
                'alignment',
                'rotate_only_on_plane',
                'distance_to_start_pull_away',
                'distance_to_start_strafe',
                'distance_to_evade',
                'use_weapon_cooldown',
                'weapon_cooldown_percent_to_start_strafe',
                'pull_away_angle_range',
                'angle_range_off_gravity_well_plane',
            ]
            switch (ctx.type) {
                case 'strafe_and_pull_away':
                    this.json.validate_keys(
                        ptr,
                        ctx,
                        ['use_weapon_cooldown', 'weapon_cooldown_percent_to_start_strafe', 'pull_away_angle_range'],
                        _,
                        ['distance_to_start_pull_away', 'distance_to_start_strafe', 'distance_to_evade', 'use_weapon_cooldown']
                    )
                    break
                case 'stop_and_fire':
                case 'immobile':
                    this.json.validate_keys(ptr, ctx, [], _, ['alignment', 'rotate_only_on_plane'])
                    break
                case 'circle_strafe':
                    this.json.validate_keys(ptr, ctx, [], _, ['alignment', 'angle_range_off_gravity_well_plane'])
                    break
            }
        } catch {}

        return object({
            required: ['type'],
            keys: {
                rotate_only_on_plane: boolean(),
                type: enumerate({
                    items: ['immobile', 'stop_and_fire', 'strafe_and_pull_away', 'circle_strafe'],
                }),
                alignment: object({
                    required: ['angle', 'type'],
                    keys: {
                        type: Definitions.alignment_type(),
                        angle: angle(),
                        post_alignment_roll_angle: angle(),
                        allow_opposite_angle: boolean(),
                    },
                }),

                duration: array({ items: float(true) }),
                move_limits_scalars: object({
                    keys: {
                        max_angular_acceleration_scalar: float(),
                        max_angular_deceleration_scalar: float(),
                        max_angular_speed_scalar: float(),
                        max_linear_acceleration_scalar: float(),
                        max_linear_deceleration_scalar: float(),
                        max_linear_speed_scalar: float(),
                        strafe_max_linear_acceleration_scalar: float(true, '', 1),
                        strafe_max_linear_speed_scalar: float(true, '', 1),
                    },
                    required: [
                        'max_angular_acceleration_scalar',
                        'max_angular_deceleration_scalar',
                        'max_angular_speed_scalar',
                        'max_linear_acceleration_scalar',
                        'max_linear_deceleration_scalar',
                        'max_linear_speed_scalar',
                    ],
                }),
                use_weapon_cooldown: boolean(),
                weapon_cooldown_percent_to_start_strafe: percentage(),
                pull_away_angle_range: float(),
                angle_range_off_gravity_well_plane: vector2f(),
            },
        })
    }

    basis_definition() {
        return object({
            required: ['position', 'rotation'],
            keys: {
                position: vector3f(),
                rotation: array({
                    items: float(false),
                }),
            },
        })
    }

    carrier_definition() {
        return object({
            required: [
                'base_max_squadron_capacity',
                'hangar_points',
                'launch_destination_formation',
                'launch_destination_formation_offset',
                'strikecraft_kinds',
            ],
            keys: {
                base_max_squadron_capacity: integer(),
                strikecraft_kinds: array({
                    items: this.cache.strikecraft_kinds,
                    isUnique: true,
                }),
                launch_destination_formation: this.cache.formations,
                launch_destination_formation_offset: object({
                    required: ['group', 'rank'],
                    keys: {
                        rank: integer(),
                        group: integer(),
                    },
                }),
                hangar_points: array({ items: this.basis_definition() }),
            },
        })
    }

    unit_attack_definition() {
        return object({
            keys: {
                planet_bombing_attack_pattern: this.attack_pattern_definition(
                    this.json?.data?.attack?.planet_bombing_attack_pattern,
                    '/attack/planet_bombing_attack_pattern'
                ),
                attack_pattern: this.attack_pattern_definition(this.json?.data?.attack?.attack_pattern, '/attack/attack_pattern'),
                immobile_attack_pattern: this.attack_pattern_definition(
                    this.json?.data?.attack?.immobile_attack_pattern,
                    '/attack/immobile_attack_pattern'
                ),
            },
        })
    }

    unit_ai_attack_target_definition() {
        return object({
            keys: {
                attack_priority: float(),
                is_always_a_threat: boolean(),
                attack_target_type: this.cache.attack_target_types,
            },
            required: ['attack_priority', 'is_always_a_threat'],
        })
    }
    asteroid_definition() {
        return object({
            keys: {
                asset_type: Definitions.resources(),
                attached_structure_offset: vector3f(),
                extraction_rate_scalar: float(),
                placement_radius: float(),
            },
            required: ['asset_type', 'attached_structure_offset', 'extraction_rate_scalar', 'placement_radius'],
        })
    }

    unit_formation_offset_definition() {
        return object({
            required: ['rank', 'group'],
            keys: {
                rank: integer(),
                group: integer(),
            },
        })
    }

    unit_formation_definition() {
        return object({
            required: ['leader_priority'],
            keys: {
                leader_priority: integer(),
                offsets_per_formation_type: object({
                    keys: {
                        ships_and_structures: this.unit_formation_offset_definition(),
                        strikecraft_only: this.unit_formation_offset_definition(),
                    },
                }),
            },
        })
    }

    unit_ai_pursuit_definition() {
        return object({
            keys: {
                min_distance_to_target: float(),
                min_target_speed: float(),
            },
        })
    }
    unit_ai_definition() {
        return object({
            keys: {
                pursuit: this.unit_ai_pursuit_definition(),
                behaviors: array({
                    items: enumerate({
                        items: [
                            'auto_attack_all',
                            'auto_attack_all_no_move',
                            'auto_attack_threats',
                            'auto_attack_threats_no_move',
                            'auto_attack_non_threats',
                            'auto_attack_non_threats_no_move',
                            'auto_bomb_planet',
                            'auto_bomb_planet_no_move',
                            'auto_follow_unit_attacking_any_or_is_damaged',
                            'auto_follow_unit_attacking_any',
                            'auto_follow_unit_attacking_threat',
                        ],
                    }),
                    isUnique: true,
                }),
                auto_follow_target_priority: float(false),
                attack_target_type_groups: array({
                    items: this.cache.attack_target_type_groups,
                    isUnique: true,
                }),
                attack_target_type_groups_matching_weapon: this.cache.weapons,
                attack_target_type_groups_to_ignore: array({
                    items: this.cache.attack_target_type_groups,
                    isUnique: true,
                }),
            },
        })
    }

    fleet_definition() {
        return object({
            required: ['icons'],
            keys: {
                icons: array({
                    items: this.cache.textures(),
                    isUnique: true,
                }),
            },
        })
    }

    unit_build_definition() {
        return object({
            required: ['build_kind', 'build_time', 'price'],
            keys: {
                build_time: float(),
                price: Definitions.price(),
                build_kind: this.cache.build_kinds,
                build_point_offset: vector3f(),
                supply_cost: integer(),
                can_update_build_progress_by_default: boolean(),
                build_group_id: this.cache.unit_build_group_ids,
                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                build_radius: float(),
                exotic_price: Definitions.exotic_price(this.cache),
                auto_cast_instead_of_rally_when_built: boolean(),
                self_build_time_gravity_well_scalars: object({
                    keys: {
                        friendly: array({
                            items: object({
                                keys: {
                                    value: float(),
                                    prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                                },
                            }),
                        }),
                        enemy: array({
                            items: object({
                                keys: {
                                    value: float(),
                                    prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                                },
                            }),
                        }),
                        neutral: array({
                            items: object({
                                keys: {
                                    value: float(),
                                    prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                                },
                            }),
                        }),
                    },
                }),
            },
        })
    }

    unit_child_mesh_definition() {
        return array({
            items: object({
                keys: {
                    mesh_alias_name: this.cache.child_meshes,
                    mesh_point: Definitions.meshpoint(),
                    is_weapon_effects_destination: boolean(),
                    required_unit_item_level: integer(),
                    required_unit_item: this.cache.unit_items,
                    hidden_by_unit_item: this.cache.unit_items,
                },
            }),
        })
    }

    unit_health_level_definition() {
        return object({
            keys: {
                max_shield_points: float(),
                shield_point_restore_rate: float(),
                shield_burst_restore: object({
                    required: ['cooldown_duration', 'restore_percentage'],
                    keys: {
                        cooldown_duration: float(),
                        restore_percentage: float(),
                    },
                }),
                hull_crippled_percentage: percentage(),
                max_hull_points: float(),
                max_armor_points: float(),
                armor_point_restore_rate: float(),
                armor_strength: float(),
                hull_point_restore_rate: float(),
                experience_given_on_death: float(),
                armor_point_restore_cooldown_duration_after_damage_taken: float(),
                hull_point_restore_cooldown_duration_after_damage_taken: float(),
                shield_point_restore_cooldown_duration_after_damage_taken: float(),
            },
        })
    }

    unit_health_definition() {
        return object({
            required: ['levels', 'release_time_after_death'],
            keys: {
                round_max_points_up_to_5: boolean('default=true'),
                release_time_after_death: float(),
                can_ever_be_resurrected: boolean('default=false'),
                can_collide_duration_after_death: float(),
                durability: float(),
                levels: array({
                    items: this.unit_health_level_definition(),
                }),
            },
        })
    }

    unit_hyperspace_definition() {
        return object({
            required: ['charge_time', 'charge_time_variance', 'max_charge_angle', 'min_charge_angle', 'speed', 'speed_between_stars'],
            keys: {
                speed: float(),
                charge_time: float(),
                charge_time_variance: float(),
                min_charge_angle: float(),
                max_charge_angle: float(),
                speed_between_stars: float(),
                can_hyperspace_enabled_by_default: boolean(),
            },
        })
    }

    unit_culture_provider_definition() {
        return object({
            keys: {
                base_culture_rate: float(),
                base_culture_resistance_rate: float(),
                has_ability_providing_culture_rate: boolean(),
                research_prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
            },
        })
    }

    unit_abilities_definition() {
        return array({
            items: object({
                required: ['abilities'],
                keys: {
                    abilities: array({
                        items: this.cache.abilities,
                        isUnique: true,
                    }),
                    required_special_operation_unit_kind: this.cache.special_operation_kinds,
                    required_player: this.cache.players,
                },
            }),
        })
    }

    unit_debris_definition() {
        return object({
            required: ['angular_speed', 'lifetime', 'linear_speed'],
            keys: {
                lifetime: array({
                    items: float(),
                }),
                linear_speed: array({
                    items: float(),
                }),
                angular_speed: array({
                    items: float(),
                }),
            },
        })
    }

    exotic_factory_definition() {
        return object({
            keys: {
                required_mutation: this.cache.mutations,
            },
        })
    }

    gravity_well() {
        return object({
            required: [
                'gravity_well_jump_node_radius',
                'gravity_well_outer_move_area_distance',
                'gravity_well_vertical_plane_max_distance',
                'gravity_well_vertical_plane_return_distance',
                'min_gravity_well_inner_move_area_distance',
            ],
            keys: {
                gravity_well_jump_node_radius: float(),
                gravity_well_outer_move_area_distance: float(),
                gravity_well_vertical_plane_max_distance: float(),
                gravity_well_vertical_plane_return_distance: float(),
                min_gravity_well_inner_move_area_distance: float(),
            },
        })
    }

    phase_lane_definition() {
        return object({
            required: ['is_gravity_well_existence_known_when_other_explored', 'unit_group_distance_tolerance'],
            keys: {
                is_gravity_well_existence_known_when_other_explored: boolean(),
                unit_group_distance_tolerance: float(),
            },
        })
    }

    gravity_well_fixture() {
        return object({
            required: ['axis_rotation_speed', 'axis_tilt_angle', 'inner_move_distance'],
            keys: {
                inner_move_distance: float(),
                axis_rotation_speed: array({ items: float(false) }),
                axis_tilt_angle: array({ items: float(false) }),
                chance_of_retrograde_axis_rotation_direction: float(),
                is_wormhole: boolean(),
                y_offset: float(false),
            },
        })
    }

    unit_items_definition() {
        return object({
            keys: {
                levels: array({
                    items: object({
                        required: ['max_ship_component_count'],
                        keys: {
                            max_ship_component_count: integer(),
                            min_unit_level: integer(),
                            prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                requires_ship_component_shop_to_purchase_items: boolean(),
            },
        })
    }

    spawn_debris_definition() {
        return object({
            required: ['generic_counts', 'generic_group_name', 'spawn_debris_time'],
            keys: {
                spawn_debris_time: float(),
                generic_group_name: this.cache.debris,
                custom_debris: array({
                    desc: 'Specific debris are big pieces only meant for this unit.',
                    items: object({
                        required: ['basis', 'unit'],
                        keys: {
                            basis: this.basis_definition(),
                            unit: this.cache.units,
                        },
                    }),
                }),
                specific_debris: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                generic_counts: object({
                    keys: {
                        small_debris: vector2i(),
                        large_debris: vector2i(),
                    },
                }),
                spawn_loot: object({
                    required: ['assets', 'exotics', 'experience_given', 'loot_name', 'loot_unit'],
                    keys: {
                        loot_level: integer(),
                        loot_unit: this.cache.units,
                        loot_name: this.cache.localisation,
                        experience_given: float(),
                        assets: Definitions.assets_2f(),
                        exotics: array({
                            items: object({
                                required: ['bundles', 'weight'],
                                keys: {
                                    weight: float(),
                                    bundles: array({
                                        items: object({
                                            required: ['counts', 'types'],
                                            keys: {
                                                types: array({
                                                    items: this.cache.exotics,
                                                    isUnique: true,
                                                }),
                                                counts: vector2i(),
                                            },
                                        }),
                                    }),
                                },
                            }),
                        }),
                    },
                }),
            },
        })
    }

    unit_levels_definition() {
        return object({
            required: ['levels', 'type'],
            keys: {
                type: enumerate({
                    items: ['experience', 'fixed'],
                }),
                levels: array({
                    items: object({
                        required: ['unit_modifiers'],
                        keys: {
                            experience_to_next_level: float(),
                            unit_modifiers: object({
                                required: ['scalar_values', 'additive_values'],
                                keys: {
                                    additive_values: object({
                                        keys: {
                                            ability_antimatter_cost: float(),
                                            ability_armor_cost: float(),
                                            ability_cooldown_duration: float(),
                                            ability_hull_cost: float(),
                                            ability_range: float(),
                                            ability_shields_cost: float(),
                                            antimatter_restore_rate: float(),
                                            armor_point_restore_cooldown_duration_after_damage_taken: float(),
                                            armor_point_restore_rate: float(),
                                            armor_strength: float(),
                                            civilian_research_points: float(),
                                            credit_income_rate: float(),
                                            crystal_income_rate: float(),
                                            culture_rate: float(),
                                            culture_resistance_rate: float(),
                                            damage_taken: float(),
                                            experience_gained_from_loot_collection: float(),
                                            experience_gained_from_planet_bombing: float(),
                                            experience_gained_from_unit_death: float(),
                                            experience_given_on_death: float(),
                                            hull_crippled_percentage: float(),
                                            hull_point_restore_cooldown_duration_after_damage_taken: float(),
                                            hull_point_restore_rate: float(),
                                            hyperspace_charge_time: float(),
                                            hyperspace_speed: float(),
                                            loot_collection_duration: float(),
                                            max_angular_speed: float(),
                                            max_antimatter: float(),
                                            max_armor_points: float(),
                                            max_hull_points: float(),
                                            max_linear_acceleration: float(),
                                            max_linear_speed: float(),
                                            max_shield_points: float(),
                                            max_squadron_capacity: float(),
                                            metal_income_rate: float(),
                                            military_research_points: float(),
                                            phase_resonance_bonus_duration: float(),
                                            self_build_time: float(),
                                            shield_burst_restore_cooldown_duration: float(),
                                            shield_burst_restore_points: float(),
                                            shield_point_restore_cooldown_duration_after_damage_taken: float(),
                                            shield_point_restore_rate: float(),
                                            ship_component_price: float(),
                                            spell_power: float(),
                                            strikecraft_build_time: float(),
                                            trade_export_credits_points: float(),
                                            trade_export_crystal_points: float(),
                                            trade_export_metal_points: float(),
                                            trade_import_points: float(),
                                            unity_points: float(),
                                        },
                                    }),
                                    scalar_values: object({
                                        keys: {},
                                    }),
                                },
                            }),
                            weapon_modifiers: object({
                                required: ['additive_values', 'scalar_values'],
                                keys: {
                                    additive_values: object({
                                        keys: {},
                                    }),
                                    scalar_values: object({
                                        keys: {
                                            bypass_shields_chance: float(),
                                            cooldown_duration: float(false),
                                            damage: float(),
                                            range: float(),
                                            tracking_speed: float(),
                                        },
                                    }),
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }

    unit_skin_definition_group() {
        return array({
            items: object({
                required: ['skins'],
                keys: {
                    skins: array({
                        items: this.cache.unit_skins,
                        isUnique: true,
                    }),
                },
            }),
        })
    }

    unit_move_definition() {
        return object({
            required: ['follow_distance'],
            keys: {
                flight_pattern_conditions: array({
                    items: object({
                        required: ['flight_patterns', 'minimum_distance_to_destination', 'minimum_time_between_flight_patterns', 'type'],
                        keys: {
                            type: enumerate({ items: ['mirror', 'taking_fire'] }),
                            flight_patterns: array({ items: float() }),
                            minimum_distance_to_destination: float(),
                            minimum_time_between_flight_patterns: float(),
                        },
                    }),
                }),
                follow_distance: float(),
            },
        })
    }

    destroyed_planet_definition() {
        return object({
            required: ['skin', 'stripped_assets', 'stripped_exotics'],
            keys: {
                skin: this.cache.unit_skins,
                stripped_assets: Definitions.price(),
                stripped_exotics: Definitions.exotic_price(this.cache),
            },
        })
    }
    non_random_asteroids_definition(type) {
        return object({
            desc: type,
            keys: {
                tiers: array({
                    items: object({
                        keys: {
                            count: vector2i('how many asteroids?'),
                            tier: integer(false, 'binding to specific asteroid type in planet.uniforms'),
                        },
                    }),
                }),
            },
        })
    }
    planet_definition() {
        return object({
            required: [
                'build_distance_from_inner_move_radius',
                'non_random_crystal_asteroids',
                'non_random_metal_asteroids',
                'planet_type',
                'random_crystal_asteroids',
                'random_metal_asteroids',
            ],
            keys: {
                planet_type: this.cache.planets,
                build_distance_from_inner_move_radius: float(),
                metal_asteroids: object({
                    keys: {
                        tiers: array({
                            items: object({
                                keys: {
                                    tier: integer(),
                                    count: array({
                                        items: float(),
                                    }),
                                },
                            }),
                        }),
                    },
                }),
                non_random_crystal_asteroids: this.non_random_asteroids_definition('asteroids spawned with no randomness (typically home planets)'),
                non_random_metal_asteroids: this.non_random_asteroids_definition('asteroids spawned with no randomness (typically home planets)'),
                random_crystal_asteroids: this.non_random_asteroids_definition('asteroids spawned with randomness'),
                random_metal_asteroids: this.non_random_asteroids_definition('asteroids spawned with randomness'),
                crystal_asteroids: object({
                    keys: {
                        tiers: array({
                            items: object({
                                keys: {
                                    tier: integer(),
                                    count: array({
                                        items: float(),
                                    }),
                                },
                            }),
                        }),
                    },
                }),
                destroyed_planet: this.destroyed_planet_definition(),
            },
        })
    }

    unit_research_provider_definition() {
        return object({
            required: ['provided_research_points'],
            keys: {
                provided_research_points: object({
                    keys: {
                        civilian: float(false),
                        military: float(false),
                    },
                }),
            },
        })
    }

    ship_component_shop_definition() {
        return object({
            keys: {
                required_ability: this.cache.abilities,
                required_mutation: this.cache.mutations,
                required_prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
            },
        })
    }

    unit_player_ai_definition() {
        return object({
            keys: {
                max_count_to_fleet_supply_ratio: float(),
                max_empire_owned_count_percentage: percentage(),
                attack_ship_weight_scalar: float(),
                max_count_at_planet: Definitions.desired_explore_ship_count(
                    this.json?.data?.player_ai?.max_count_at_planet,
                    '/player_ai/max_count_at_planet',
                    this.json
                ),
            },
        })
    }
    unit_ruler_ship_definition() {
        return object({
            required: ['prerequisites'],
            keys: {
                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
            },
        })
    }
    unit_stages_definition() {
        return object({
            required: ['stages'],
            keys: {
                stages: array({
                    items: object({
                        required: ['requirements'],
                        keys: {
                            requirements: object({
                                keys: {
                                    requirements_type: enumerate({
                                        items: ['research_prerequisites', 'none'],
                                    }),
                                    prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }
    strikecraft_definition() {
        return object({
            required: ['build_time', 'kind', 'launch_destination_formation_offset', 'squadron_size'],
            keys: {
                kind: this.cache.strikecraft_kinds,
                build_time: float(),
                squadron_size: integer(),
                launch_destination_formation_offset: object({
                    required: ['group', 'rank'],
                    keys: {
                        rank: integer(),
                        group: integer(),
                    },
                }),
            },
        })
    }

    structure_definition() {
        return object({
            required: ['build_group_id'],
            keys: {
                slot_type: Definitions.domain(),
                slots_required: integer(),
                roles: array({
                    items: enumerate({
                        items: ['super_weapon', 'defense', 'unit_factory', 'extractor', 'exotic_factory'],
                    }),
                    isUnique: true,
                }),
                planet_modifiers: PlanetModifiers.create(this.cache),
                asteroid_asset_type: Definitions.resources(),
                build_group_id: this.cache.unit_build_group_ids,
                requires_any_research_points_to_build: boolean(),
                abilities_for_range_in_build_rendering: array({
                    items: this.cache.abilities,
                    isUnique: true,
                }),
                virtual_slot_type: Definitions.domain(
                    'Used to get non-structures into the structure build menu of colonized planets (for starbases)'
                ),
            },
        })
    }
    torpedo_definition() {
        return object({ keys: {} })
    }
    trade_port_definition() {
        return object({
            required: [
                'create_trade_ship_offset',
                'max_trade_ship_count',
                'special_operation_unit_kind',
                'trade_ship',
                'trade_ship_construction_time',
            ],
            keys: {
                max_trade_ship_count: integer(),
                trade_ship_construction_time: float(),
                trade_ship: this.cache.meshes,
                special_operation_unit_kind: this.cache.special_operation_kinds,
                create_trade_ship_offset: vector3f(),
            },
        })
    }
    unit_factory_definition(unit_factory = this.json?.data?.unit_factory) {
        try {
            if (unit_factory.will_spawn_units_in_hyperspace) {
                if (!this.json.contains(unit_factory, 'spawn_units_in_hyperspace_delay_duration')) {
                    this.json.validate_keys('/unit_factory', unit_factory, ['spawn_units_in_hyperspace_delay_duration'], [])
                }
                if (this.json.contains(unit_factory, 'will_spawn_units_in_hyperspace') && this.json.contains(unit_factory, 'base_build_point')) {
                    this.json.validate_keys('/unit_factory', unit_factory, [], ['base_build_point'])
                }
            }

            if (this.json.contains(unit_factory, 'will_spawn_units_in_hyperspace') && !unit_factory.will_spawn_units_in_hyperspace) {
                if (this.json.contains(unit_factory, 'spawn_units_in_hyperspace_delay_duration')) {
                    this.json.validate_keys('/unit_factory', unit_factory, [], ['spawn_units_in_hyperspace_delay_duration'])
                }
                if (!this.json.contains(unit_factory, 'base_build_point')) {
                    this.json.validate_keys('/unit_factory', unit_factory, ['base_build_point'], [])
                }
            }
        } catch {}
        return object({
            required: ['build_kinds'],
            keys: {
                required_ability: this.cache.abilities,
                build_kinds: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                build_rate_scalar: float(),
                default_rally_point_offset: vector3f(),
                required_mutation: this.cache.mutations,
                will_spawn_units_in_hyperspace: boolean(),
                base_build_point: object({
                    keys: {
                        position: vector3f(),
                        rotation: array({
                            items: float(false),
                        }),
                    },
                }),
                spawn_units_in_hyperspace_delay_duration: float(),
            },
        })
    }
    unit_unity_provider_definition() {
        return object({
            required: ['provided_unity_points'],
            keys: {
                provided_unity_points: float(),
            },
        })
    }
    unit_user_interface_definition() {
        return object({
            keys: {
                pip_type: this.cache.pip_groups,
                selection_priority: integer(),
                under_cursor_type: enumerate({
                    items: ['sphere', 'sphere_box', 'box_mesh'],
                }),
                selection_window_partial_stack_size: integer(false, 'max stack size if partial stacks is enabled'),
                can_be_controlled_by_selected_planet: boolean(),
                selection_group_unit_type: enumerate({
                    items: [
                        'torpedo',
                        'civilian_structure',
                        'factory_structure',
                        'military_structure',
                        'scout_ship',
                        'colony_ship',
                        'strikecraft',
                        'starbase',
                        'combat_ship',
                        'loot',
                    ],
                }),
                can_ever_be_selected: boolean(),
                can_show_mesh_overlays: boolean(),
                can_be_controlled: boolean(),
                has_sub_selection_grouping: boolean(),
                can_move: boolean(),
                can_attack: boolean(),
                can_show_distance_to_plane_line: boolean(),
                can_rotate: boolean(),
                skip_as_zoom_target_when_zooming_in_from_far: boolean(),
                can_show_max_weapon_range_in_tactical_view: boolean(),
                bar_size: enumerate({
                    items: ['normal', 'large'],
                }),
            },
        })
    }
    weapon_arc_definition() {
        return object({
            required: ['max_angle', 'min_angle'],
            keys: {
                initial_angle: float(false),
                min_angle: float(false),
                max_angle: float(false),
            },
        })
    }

    physics_definition(physics = this.json?.data?.physics) {
        const json_builder = {}
        try {
            if (physics.linear_acceleration_angle <= 0 && physics.can_move_linear && physics.can_move_angular) {
                this.json.reportAtPos(
                    '/physics/linear_acceleration_angle',
                    `- linear_acceleration_angle '${physics.linear_acceleration_angle}' must be >= '1' if can_move_linear and can_move_angualr are true.`
                )
            }

            if (physics.can_move_angular) {
                json_builder['max_bank_angle'] = float()
                json_builder['max_angular_speed'] = float(false)
                json_builder['time_to_max_angular_speed'] = float(true, '', 0.015)
            }
            if (physics.can_strafe_linear) {
                json_builder['strafe_stop_angle'] = float()
                json_builder['strafe_max_linear_speed'] = float(false)
                json_builder['time_to_strafe_max_linear_speed'] = float(true, '', 0.015)
                json_builder['strafe_start_angle'] = float()
                json_builder['strafe_speed_start_angle'] = float()
                json_builder['strafe_max_start_turning_angle'] = float()
                json_builder['strafe_max_linear_distance_spatial_radius_scalar'] = float()
            }

            if (physics.can_move_linear) {
                json_builder['arrival_tolerance_spatial_radius_scalar'] = float(false)
                json_builder['time_to_max_linear_speed'] = float(true, '', 0.015)
                json_builder['max_linear_speed'] = float(false)
                json_builder['death_linear_speed_range'] = vector2f()
                json_builder['linear_acceleration_angle'] = float(false)
            }
        } catch {}
        return object({
            keys: {
                linear_speed_floor_to_brake_for_turn: float(),
                death_angular_speed_range: vector2f(),
                do_ray_checking_for_reach_or_pass_goal_position: boolean(),
                can_move_angular: boolean(),
                can_strafe_linear: boolean(),
                can_move_linear: boolean(),
                disable_goal_tracking_on_death: boolean(),
                ...json_builder,
            },
        })
    }
    unit_weapons_definition() {
        return object({
            required: ['weapons'],
            keys: {
                weapons: array({
                    items: object({
                        required: ['forward', 'mesh_point', 'pitch_arc', 'up', 'weapon', 'weapon_position', 'yaw_arc'],
                        keys: {
                            weapon: this.cache.weapons,
                            required_unit_item: this.cache.unit_items,
                            min_required_stage_index: integer(),
                            required_research_prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                            mesh_point: Definitions.meshpoint(),
                            weapon_position: vector3f(),
                            non_turret_muzzle_positions: array({
                                items: vector3f(),
                            }),
                            forward: vector3f(),
                            up: vector3f(),
                            yaw_arc: this.weapon_arc_definition(),
                            pitch_arc: this.weapon_arc_definition(),
                        },
                    }),
                }),
                max_range_weapon_index: integer(),
            },
        })
    }

    spatial_definition() {
        try {
            // - 'if unit !can_collide then collision_rank.has_value' must be false
            let is_collidable = true
            if (this.json.contains(this.spatial, 'can_collide')) {
                is_collidable = this.spatial.can_collide
            }

            if (this.json.contains(this.spatial, 'collision_rank') && !is_collidable) {
                this.json.reportAtPos('/spatial/collision_rank', `- 'if unit !can_collide then collision_rank.has_value' must be false`)
            }
            // - 'if unit can_collide then radius' must be > 0
            if (is_collidable && this.spatial.radius <= 0) {
                this.json.reportAtPos('/spatial/radius', `- 'if unit can_collide then radius' must be > 0`)
            }
        } catch {}
        return object({
            keys: {
                surface_radius: float(),
                line_of_sight_radius: float(),
                radius: float(),
                box: object({
                    required: ['center', 'extents'],
                    keys: {
                        center: vector3f(),
                        extents: vector3f(),
                    },
                }),
                collision_rank: integer(),
                can_collide: boolean(),
                can_be_displaced_on_collision: boolean(),
                can_displace_target_on_collision: boolean(),
            },
        })
    }
    create() {
        return schema({
            required: ['spatial'],
            keys: {
                spatial: this.spatial_definition(),
                gravity_well_fixture: this.gravity_well_fixture(),
                antimatter: this.unit_antimatter_definiton(),
                planet: this.planet_definition(),
                items: this.unit_items_definition(),
                trade_port: this.trade_port_definition(),
                name: object({
                    keys: {
                        group: this.cache.unit_group_names,
                    },
                    required: ['group'],
                }),
                carrier: this.carrier_definition(),
                physics: this.physics_definition(),
                asteroid: this.asteroid_definition(),
                gravity_well: this.gravity_well(),
                phase_lane: this.phase_lane_definition(),
                hyperspace: this.unit_hyperspace_definition(),
                move: this.unit_move_definition(),
                attack: this.unit_attack_definition(),
                torpedo: this.torpedo_definition(),
                //TODO: Find out rally point stuff
                rally_point: {
                    type: 'object',
                    properties: {},
                },
                culture_provider: this.unit_culture_provider_definition(),
                passive_income: Definitions.assets(),
                is_envoy: boolean(),
                is_jump_inhibitor: boolean('identify this unit as a is_jump_inhibitor (for main view planet icons)'),
                stages: this.unit_stages_definition(),
                ai: this.unit_ai_definition(),
                player_ai: this.unit_player_ai_definition(),
                ai_attack_target: this.unit_ai_attack_target_definition(),
                user_interface: this.unit_user_interface_definition(),
                virtual_supply_cost: integer(),
                structure: this.structure_definition(),
                weapons: this.unit_weapons_definition(),
                fleet: this.fleet_definition(),
                formation: this.unit_formation_definition(),
                exotic_factory: this.exotic_factory_definition(),
                exotics_factory: this.exotic_factory_definition(),
                spawn_debris: this.spawn_debris_definition(),
                ruler_ship: this.unit_ruler_ship_definition(),
                is_buff_agent: boolean(),
                unit_factory: this.unit_factory_definition(),
                health: this.unit_health_definition(),
                levels: this.unit_levels_definition(),
                strikecraft: this.strikecraft_definition(),
                antimatter: this.unit_antimatter_definiton(),
                ship_component_shop: this.ship_component_shop_definition(),
                build: this.unit_build_definition(),
                research_provider: this.unit_research_provider_definition(),
                unity_provider: this.unit_unity_provider_definition(),
                unit_modifiers: UnitModifiers.create(this.cache),
                tags: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                is_phase_lane_stabilizer: boolean(),
                is_phase_resonance_synchronizer: boolean(),
                will_notify_enemy_player_when_entering_gravity_well_override: boolean(),
                is_loot_collector: boolean(),
                abilities: this.unit_abilities_definition(),
                player_specific_abilities: array({
                    items: object({
                        keys: {
                            ability: this.cache.abilities,
                            player: this.cache.players,
                        },
                    }),
                }),
                build_structure_ability: this.cache.abilities,
                colonize_ability: this.cache.abilities,
                ship_roles: Definitions.ship_roles(),
                can_join_fleet: boolean(),
                child_meshes: this.unit_child_mesh_definition(),
                debris: this.unit_debris_definition(),
                target_filter_unit_type: Definitions.target_filter_unit_type(), // TODO: Find out filter unit type, currently hardcoded
                skin_groups: this.unit_skin_definition_group(),
                action_effect_size: Definitions.action_effect_size(),
                is_orbital_cannon_shell: boolean(),
                is_always_detected: boolean(),
                can_add_to_kill_statistics: boolean(),
                can_player_automation_auto_level_up_abilities: boolean(),
            },
        })
    }
}
