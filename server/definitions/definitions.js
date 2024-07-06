const _ = require('./data_types')

module.exports = class Definitions {
    static prerequisites(subjects) {
        return _.array({
            items: _.array({
                items: subjects,
                isUnique: true,
            }),
        })
    }

    static getRedirection() {
        return _.enumerate({
            items: ['current_gravity_well_primary_fixture', 'current_gravity_well', 'current_phase_lane'],
        })
    }

    static getComparisonType() {
        return _.enumerate({
            items: ['greater_than', 'less_than_equal_to', 'greater_than_equal_to', 'less_than'],
        })
    }

    static getRequiredUnits(data) {
        return _.array({
            items: _.object({
                keys: {
                    unit: data['units'],
                    options: _.object({
                        keys: {
                            is_temporary_ruler_ship: _.boolean(),
                            forced_leveled_up_ability: data['abilities'],
                            items: _.array({
                                items: data['ship_components'],
                                isUnique: true,
                            }),
                        },
                    }),
                    count: _.vector2i(),
                },
            }),
        })
    }

    static exotic_price(exotics) {
        return _.array({
            items: _.object({
                keys: {
                    exotic_type: exotics,
                    count: _.integer(),
                },
            }),
        })
    }

    static units(units) {
        return _.array({
            items: _.object({
                keys: {
                    unit: units,
                    weight: _.float(),
                },
            }),
        })
    }

    static getTargetingType() {
        return _.enumerate({
            items: ['radius', 'range', 'range_and_radius', 'between_gravity_well_range', 'arc'],
        })
    }
    static getEffects(particle_effects) {
        return _.object({
            keys: {
                muzzle_effect: particle_effects,
                beam_effect: particle_effects,
                hit_hull_effect: particle_effects,
                hit_shield_effect: particle_effects,
                hit_shield_impact_radius_t: _.float(),
                burst_pattern: _.array({
                    items: _.float(),
                }),
                projectile_travel_effect: particle_effects,
                projectile_travel_easing_function: _.enumerate({
                    items: ['in_out_cubic'],
                }),
                charge_effect: particle_effects,
                muzzle_picking_behavior: _.enumerate({
                    items: ['sequential', 'random'],
                }),
            },
        })
    }

    static getTransformType() {
        return _.enumerate({
            items: [
                'per_percent_missing_hull_points',
                'per_max_shield_points',
                'per_max_hull_points',
                'per_max_antimatter',
                'per_crystal_price',
                'per_metal_price',
                'per_build_or_virtual_supply',
                'per_max_armor_points',
                'per_planet_max_military_slots',
                'per_missing_armor_points',
                'per_missing_hull_points',
                'source_ability_range',
                'surface_radius',
                'per_damage_dealt',
                'per_missing_shield_points',
                'current_buff_memory_value',
                'fixed',
                'pending_and_active_child_buff_count',
                'action_level',
                'simulation_time',
                'fixed_one',
                'fixed_zero',
                'per_damage_event_penetration',
                'per_current_shield_points',
            ],
        })
    }

    static getUnitType() {
        return _.enumerate({
            items: ['none', 'buff_memory', 'value_comparison', 'target', 'trigger_event_destination', 'first_spawner', 'current_spawner', 'previous_spawner', 'operand_destination', 'trigger_event_source'],
        })
    }

    static getUnit() {
        return _.object({
            keys: {
                unit_type: this.getUnitType(),
                redirection: this.getRedirection(),
            },
        })
    }

    static getActionType() {
        return _.enumerate({
            items: [
                'use_unit_operators_on_units_owned_by_player',
                'use_unit_operators_on_chained_units',
                'use_unit_operators_on_gravity_wells',
                'use_unit_operators_on_phase_lanes',
                'abort_make_dead',
                'stop_attract_to_unit',
                'start_attract_to_unit',
                'use_unit_operators_on_child_strikecraft_of_unit',
                'change_ability_is_empowered',
                'augment_damage',
                'use_unit_operators_on_phase_lanes',
                'prevent_damage',
                'give_assets',
                'start_buff_effect',
                'use_unit_operators_on_single_unit',
                'use_unit_operators_on_units_in_gravity_well_of_unit',
                'give_weighted_npc_rewards',
                'use_unit_operators_on_units_in_radius_of_unit',
                'make_buff_dead',
                'give_exotics',
                'change_buff_memory_float_value',
                'use_position_operators_on_single_position',
                'use_unit_operators_on_units_in_arc_of_unit',
                'disable_collision_displacement',
            ],
        })
    }
    static getConstraintType() {
        return _.enumerate({
            items: [
                'has_ship_role',
                'has_definition',
                'has_ability',
                'is_loot_collection_active',
                'is_in_fleet',
                'has_orders',
                'has_permission',
                'is_unit_factory_building_units',
                'is_building_structures',
                'is_friendly',
                'has_missing_strikecraft',
                'weapon_has_target',
                'has_recently_fired_weapon',
                'has_valid_targets_in_radius',
                'is_credits_market',
                'is_metal_market',
                'is_crystal_market',
                'is_in_current_gravity_well',
                'is_bombing_planet',
                'is_detected',
                'composite_or',
                'has_missing_armor',
                'has_recently_been_damaged',
                'is_culture_provider',
                'has_missing_hull',
                'is_dead_soon',
                'not_self',
                'has_buff',
                'has_missing_antimatter',
                'is_always_a_threat',
                'has_antimatter',
                'random_chance',
                'has_mutation',
                'buff_has_mutation',
                'damage_has_weapon_tag',
                'can_ever_move',
                'is_empowered',
                'weapon_has_weapon_tag',
                'has_missing_shields',
                'unit_passes_unit_constraint',
                'value_comparison',
                'unit_comparison',
                'damage_has_damage_source',
                'is_unit_factory',
                'is_structure_with_slot_type',
                'has_weapon',
                'can_ever_hyperspace',
                'is_carrier',
                'composite_and',
                'is_colonizable_planet',
                'composite_not',
                'is_fully_built',
                'is_structure_plate_spin_changing',
                'distance_between_units_comparison',
                'unit_passes_target_filter',
            ],
        })
    }

    static getWeaponType() {
        return _.enumerate({
            items: ['planet_bombing', 'normal'],
        })
    }

    static value_behavior() {
        return _.enumerate({
            items: ['scalar', 'additive'],
        })
    }

    static alignment_type() {
        return _.enumerate({
            items: ['yaw'],
        })
    }

    static getOperatorType() {
        return _.enumerate({
            items: [
                'change_owner_player',
                'create_phase_lane',
                'teleport',
                'create_clones',
                'explore',
                'build_instant_strikecraft',
                'spawn_units',
                'destroy_planet',
                'remove_unit_item',
                'add_unit_item',
                'give_destroy_planet_rewards',
                'change_buff_memory_float_value',
                'give_assets',
                'create_buff_agent',
                'change_buff_memory_unit_value',
                'brake_to_stop',
                'increase_planet_track_level',
                'colonize_planet',
                'create_unit',
                'repair_damage',
                'apply_buff',
                'apply_damage',
                'add_npc_reputation',
                'play_point_effect',
                'bomb_planet',
                'make_dead',
                'restore_antimatter',
                'remove_antimatter',
                'play_weapon_effects',
            ],
        })
    }
    static getFunctions() {
        return _.enumerate({
            items: ['in_sine', 'in_out_quad', 'out_sine'],
        })
    }

    static getShipRoles() {
        return _.array({
            items: _.enumerate({
                items: ['attack_ship', 'bomb_planet', 'colonize', 'explore', 'anti_structure', 'raid'],
            }),
            isUnique: true,
        })
    }
    static getExemptions() {
        return _.enumerate({
            items: ['is_not_explored'],
        })
    }

    static getAssets() {
        return _.object({
            keys: {
                credits: _.vector2f(),
                metal: _.vector2f(),
                crystal: _.vector2f(),
            },
        })
    }
    static getOwnerships() {
        return _.array({
            items: _.enumerate({
                items: ['self', 'friendly', 'enemy', 'none', 'ally'],
            }),
            isUnique: true,
        })
    }
    static getBlink() {
        return _.object({
            keys: {
                duration: _.float(),
                up_function: this.getFunctions(),
                down_function: this.getFunctions(),
            },
            required: ['duration', 'up_function', 'down_function'],
        })
    }
    static getShaders() {
        return _.enumerate({
            items: ['ship', 'planet_corona', 'planet_city', 'planet_atmosphere', 'star_atmosphere', 'star_corona'],
        })
    }

    static damage_affect_type() {
        return _.enumerate({
            items: ['hull_and_shields', 'hull_and_armor_and_shields', 'hull_only', 'shields_only', 'hull_and_armor_only'],
        })
    }
    static value_color() {
        return _.enumerate({
            items: ['positive', 'negative'],
        })
    }
    static getDomain() {
        return _.enumerate({
            items: ['military', 'civilian'],
        })
    }
    static value_float_format() {
        return _.enumerate({
            items: ['percentage_one_decimal_place', 'percentage', 'one_decimal_place', 'no_decimal_place', 'percentage_one_decimal_place_with_sign', 'one_decimal_place_with_sign', 'no_decimal_place_with_sign', 'percentage_with_sign', 'two_decimal_place_with_sign'],
        })
    }

    static planet_modifier_id() {
        return _.enumerate({
            items: ['track_build_time', 'structure_build_time'],
        })
    }

    static rendering_type() {
        return _.enumerate({
            items: ['buff_empire_modifier', 'unit_icon_and_name', 'unit_item_value', 'single_value', 'buff_weapon_modifier', 'buff_unit_factory_modifier', 'buff_unit_modifier', 'buff_planet_modifier', 'buff_trade_capacity'],
        })
    }
    static value_suffix() {
        return _.enumerate({
            items: ['seconds', 'per_second'],
        })
    }
    static sound(data) {
        return _.object({
            keys: {
                sound: data['ogg'],
                is_dialogue: _.boolean(),
            },
            required: ['sound', 'is_dialogue'],
        })
    }
    static getDirectionType() {
        return _.enumerate({
            items: ['from_position_to_position', 'unit_up', 'unit_forward', 'unit_cross'],
        })
    }
    static getPositionType() {
        return _.enumerate({
            items: ['target_position', 'ability_position', 'unit_position', 'operand_position', 'distance_in_direction_from_position'],
        })
    }

    static getSourcePosition() {
        return _.object({
            keys: {
                position_type: this.getPositionType(),
                unit: this.getUnit(),
            },
        })
    }
    static getDestinationUnit() {
        return _.object({
            keys: {
                unit_type: this.getUnitType(),
                redirection: this.getRedirection(),
            },
        })
    }
    static getDestinationPosition() {
        return _.object({
            keys: {
                position_type: this.getPositionType(),
                unit: this.getUnit(),
            },
        })
    }
    static getDirection() {
        return _.object({
            keys: {
                direction_type: this.getDirectionType(),
                source_position: this.getSourcePosition(),
                destination_position: this.getDestinationPosition(),
                unit: this.getUnit(),
            },
        })
    }
    static getAffectType() {
        return _.enumerate({
            items: ['shields_only', 'hull_and_armor_only', 'hull_only', 'armor_only'],
        })
    }

    static getAbilityType() {
        return _.enumerate({
            items: ['source_ability', 'all_abilities'],
        })
    }
    static getBlink() {
        return _.object({
            keys: {
                duration: _.float(),
                up_function: this.getFunctions(),
                down_function: this.getFunctions(),
            },
            required: ['duration', 'up_function', 'down_function'],
        })
    }
    static getBinding() {
        return _.enumerate({
            items: ['action_data_source'],
        })
    }

    static getPlanetTrackType() {
        return _.enumerate({
            items: ['commerce', 'mining', 'logistics'],
        })
    }

    static getTargetingUi() {
        return _.enumerate({
            items: ['send_pirate_raid', 'positive', 'pick_gravity_well'],
        })
    }
    static getDamageSource() {
        return _.enumerate({
            items: ['ability', 'weapon'],
        })
    }

    static getPlayerType() {
        return _.enumerate({
            items: ['buff_owner_player', 'unit_owner'],
        })
    }

    static getUnitForward() {
        return _.object({
            keys: {
                direction_type: this.getDirectionType(),
                unit: this.getUnit(),
                source_position: this.getSourcePosition(),
                destination_position: this.getDestinationPosition(),
            },
        })
    }
    static getPosition() {
        return _.object({
            keys: {
                position_type: this.getPositionType(),
                ability: _.object({
                    keys: {
                        ability_type: this.getAbilityType(),
                        unit: this.getUnit(),
                    },
                }),
                unit: this.getUnit(),
                ability_position_picking_type: _.enumerate({
                    items: ['next_sequential'],
                }),
            },
        })
    }
    static getGravityWellOriginUnit() {
        return _.object({
            keys: {
                unit_type: this.getUnitType(),
            },
        })
    }

    static getEffectDefinition(data) {
        return _.object({
            keys: {
                binding: this.getBinding(),
                effect_by_size: _.object({
                    keys: {
                        small_unit: data['effect_alias_bindings'],
                        medium_unit: data['effect_alias_bindings'],
                        large_unit: data['effect_alias_bindings'],
                    },
                }),
                effect: data['effect_alias_bindings'],
                mesh_point: _.string(),
                mesh_point_usage: _.enumerate({
                    items: ['index', 'all'],
                }),
                mesh_point_index: _.integer(),
                only_visible_if_mesh_is_visible: _.boolean(),
            },
        })
    }

    static planet({ properties: properties, meshes: meshes, textures: textures }) {
        return _.object({
            keys: {
                mesh: meshes,
                ...properties,
                corona: _.object({
                    keys: {
                        shader: this.getShaders(),
                        color_texture: textures,
                        color: _.color(),
                        radius_scalar: _.float(),
                        noise_texture: textures,
                        animation_speed: _.float(),
                        noise_1_zoom: _.float(),
                        basic_constants: _.object({
                            keys: {
                                emissive_factor: _.float(),
                                alpha_ramp_steepness: _.float(),
                                alpha_ramp_growth_delay: _.float(),
                                alpha_ramp_curvature: _.float(),
                                alpha_ramp_max_alpha_scalar: _.float(),
                            },
                        }),
                    },
                }),
            },
        })
    }

    static ability() {
        return _.object({
            keys: {
                ability_type: this.getAbilityType(),
                unit_with_abilities: _.object({
                    keys: {
                        unit_type: this.getUnitType(),
                    },
                }),
                unit: this.getUnit(),
            },
        })
    }

    static ai_dificulty_definition(data) {
        return _.object({
            keys: {
                icon: data['textures'],
                name: data['localisation'],
                description: data['localisation'],
            },
        })
    }

    static getWindfall(exotics, units) {
        return _.object({
            keys: {
                units_given: _.object({
                    keys: {
                        required_units: _.array({
                            items: _.object({
                                keys: {
                                    unit: units,
                                    count: _.vector2f(),
                                },
                            }),
                        }),
                    },
                }),
                exotics_given: _.array({
                    items: _.object({
                        keys: {
                            exotic_type: exotics,
                            count: _.integer(),
                        },
                    }),
                }),
            },
        })
    }

    static npcRewards(npc_rewards) {
        return _.array({
            items: _.object({
                keys: {
                    weight: _.float(),
                    npc_reward: npc_rewards,
                },
            }),
        })
    }

    static exotics(exotics) {
        return _.object({
            keys: {
                exotics_source_type: _.enumerate({
                    items: ['unit_build_cost', 'explicit_amount'],
                }),
                source_unit: _.object({
                    keys: {
                        unit_type: this.getUnitType(),
                    },
                }),
                exotic_amounts: _.array({
                    items: _.object({
                        keys: {
                            exotic_type: exotics,
                            count_value: _.enumerate({
                                items: ['fixed_one'],
                            }),
                        },
                    }),
                }),
            },
        })
    }

    static getPositionOperators(data) {
        return _.array({
            items: _.object({
                keys: {
                    operator_type: this.getOperatorType(),
                    effect_definition: this.getEffectDefinition(data),
                    unit_to_create: data['units'],
                    special_operation_unit_kind: data['special_operation_kinds'],
                    unit_forward: this.getUnitForward(),
                    is_self_building: _.boolean(),
                    buff_on_created_unit: data['buffs'],
                    torpedo_source_unit: _.object({
                        keys: {
                            unit_type: this.getUnitType(),
                        },
                    }),
                    torpedo_target_unit: _.object({
                        keys: {
                            unit_type: this.getUnitType(),
                        },
                    }),
                    buff_on_agent: data['buffs'],
                    effect_destination_unit: _.object({
                        keys: {
                            unit_type: this.getUnitType(),
                        },
                    }),
                    effect_forward: this.getEffectForward(),
                    effect_up: _.object({
                        keys: {
                            direction_type: this.getDirectionType(),
                            unit: this.getUnit(),
                        },
                    }),
                    hyperspace_destination_position: _.object({
                        keys: {
                            position_type: this.getPositionType(),
                            distance_value: _.enumerate({
                                items: ['planet_surface_radius', 'replicate_forces_spawn_range_value'],
                            }),
                            direction: this.getDirection(),
                            source_position: _.object({
                                keys: {
                                    position_type: this.getPositionType(),
                                    unit: this.getUnit(),
                                },
                            }),
                        },
                    }),
                    is_change_gravity_well_to_hyperspace_destination_enabled: _.boolean(),
                },
            }),
        })
    }
    static getHyperspaceDestinationPosition() {
        return _.object({
            keys: {
                position_type: this.getPositionType(),
                distance_value: _.enumerate({
                    items: ['planet_surface_radius', 'replicate_forces_spawn_range_value'],
                }),
                direction: _.object({
                    keys: {
                        direction_type: this.getDirectionType(),
                        source_position: this.getSourcePosition(),
                        destination_position: this.getDestinationPosition(),
                    },
                }),
                source_position: this.getSourcePosition(),
            },
        })
    }

    static getTargetSort() {
        return _.object({
            keys: {
                sort_steps: _.array({
                    items: _.object({
                        keys: {
                            sort_type: _.enumerate({
                                items: ['build_or_virtual_supply', 'distance_to_unit'],
                            }),
                            sort_order: _.enumerate({
                                items: ['ascending', 'descending'],
                            }),
                            distance_reference_unit: _.object({
                                keys: {
                                    unit_type: this.getUnitType(),
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }
    static getEffectForward() {
        return _.object({
            keys: {
                direction_type: this.getDirectionType(),
                source_position: this.getSourcePosition(),
                destination_position: this.getDestinationPosition(),
            },
        })
    }

    static getBypassShieldsChanceValue() {
        return _.enumerate({
            items: ['bypass_shields_chance_value', 'phase_missile_swarm_bypass_shields_chance_value'],
        })
    }

    static getSpawnType() {
        return _.enumerate({
            items: ['build_from_factory', 'hyperspace_in'],
        })
    }

    static getResources() {
        return _.enumerate({
            items: ['credits', 'metal', 'crystal'],
        })
    }

    static price() {
        return _.object({
            keys: {
                credits: _.float(),
                metal: _.float(),
                crystal: _.float(),
            },
        })
    }
    static getEasingFunctons() {
        return _.enumerate({
            items: ['linear', 'in_cubic', 'out_cubic', 'in_out_sine'],
        })
    }
    static getTriggerEventType() {
        return _.enumerate({
            items: [
                'on_current_spawner_hyperspace_stopped',
                'on_child_buff_started',
                'on_current_spawner_spawned_strikecraft',
                'on_buff_stacking_limit_met',
                'on_child_buff_made_dead',
                'on_current_spawner_try_make_dead',
                'on_current_spawner_augment_pending_damage_as_destination',
                'on_unit_finished_building_in_gravity_well',
                'on_parent_buff_made_dead',
                'on_phase_lanes_changed',
                'on_current_spawner_current_gravity_well_unoccupied_with_enemy_units',
                'on_current_spawner_current_gravity_well_changed',
                'on_current_spawner_collision_detected',
                'on_buff_started',
                'on_current_spawner_made_dead',
                'on_current_spawner_current_gravity_well_occupied_with_enemy_units',
                'on_current_spawner_current_gravity_well_fixture_ownership_changed',
                'on_try_prevent_damage',
                'on_current_spawner_physics_destination_reached',
                'on_unit_planet_bombed_by_current_spawner',
                'on_unit_made_dead_by_current_spawner',
                'on_current_spawner_player_ownership_changed',
                'on_buff_made_dead',
                'on_unit_damaged_by_current_spawner',
                'on_current_spawner_hyperspace_started',
                'on_current_spawner_planet_colonized',
                'on_current_spawner_damaged',
                'on_current_spawner_augment_pending_damage_as_source',
                'on_current_spawner_planet_scuttle_completed',
            ],
        })
    }
}
