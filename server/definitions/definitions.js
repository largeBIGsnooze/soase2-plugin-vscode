const { integer, string, vector2, enumerate, object, array, boolean, percentage, IfMap, color, vecInt2, If, float } = require('./data_types')
const { planet_modifier_types, weapon_modifier_types, unit_modifier_types, unit_factory_modifier_types, empire_modifier_types } = require('./modifier_types')

class Definitions {
    constructor() {}

    create() {
        return {
            modifiers: {
                planet_modifiers: new PlanetModifiers(),
                player_modifiers: new PlayerModifiers(),
                npc_modifiers: new NpcModifiers(),
                empire_modifiers: new EmpireModifiers(),
                unit_modifiers: new UnitModifiers(),
                weapon_modifiers: new WeaponModifiers(),
                exotic_factory_modifiers: new ExoticFactoryModifiers(),
                unit_factory_modifiers: new UnitFactoryModifiers(),
            },
            groups: {
                planet_type_groups: new PlanetTypeGroups(),
            },
        }
    }

    getResearchSubjects(subjects) {
        return array({
            items: array({
                items: subjects,
                isUnique: true,
            }),
        })
    }

    get getOperatorType() {
        return enumerate({
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

    get getAlignmentType() {
        return enumerate({
            items: ['yaw'],
        })
    }

    get getConstraintType() {
        return enumerate({
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

    get getUnit() {
        return object({
            keys: {
                unit_type: this.getUnitType,
                redirection: this.getRedirection,
            },
        })
    }

    get getActionType() {
        return enumerate({
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

    get getRedirection() {
        return enumerate({
            items: ['current_gravity_well_primary_fixture', 'current_gravity_well', 'current_phase_lane'],
        })
    }

    get getComparisonType() {
        return enumerate({
            items: ['greater_than', 'less_than_equal_to', 'greater_than_equal_to', 'less_than'],
        })
    }

    tooltip_lines(data) {
        return array({
            items: object({
                keys: {
                    visibility: enumerate({
                        items: ['upgrade_only'],
                    }),
                    trade_import_points_id: data['buff_unit_modifiers'],
                    visible_if_value_zero: boolean(),
                    is_resolved_value: boolean(),
                    rendering_type: this.rendering_type,
                    label_text: data['localisation'],
                    value_float_format: this.value_float_format,
                    unit_factory_modifier_id: data['buff_unit_factory_modifiers'],
                    empire_modifier_id: data['buff_empire_ids'],
                    value_suffix_text: data['localisation'],
                    unit_modifier_id: data['buff_unit_modifiers'],
                    value_id: data['action_values'],
                    weapon_modifier_id: data['weapon_modifier_ids'],
                    value_color: this.value_color,
                    unit_item: data['unit_items'],
                    unit: data['units'],
                    value_suffix: this.value_suffix,
                    planet_modifier_id: data['planet_modifier_ids'],
                    is_resolved_value: boolean(),
                    value_modifiers: array({
                        items: object({
                            keys: {
                                operator_type: enumerate({
                                    items: ['multiply', 'add'],
                                }),
                                operand_value: data['action_values'],
                            },
                        }),
                    }),
                },
                required: ['rendering_type'],
            }),
        })
    }

    tooltip_line_groups(data) {
        return array({
            items: object({
                keys: {
                    header_text: data['localisation'],
                    lines: this.tooltip_lines(data),
                },
            }),
        })
    }

    getBuffConstraints(data) {
        return array({
            items: object({
                keys: {
                    target_filter_id: data['target_filters'],
                    weapon: enumerate({
                        items: ['trigger_event_weapon'],
                    }),
                    any_weapon_tags: array({
                        items: data['weapon_tags'],
                        isUnique: true,
                    }),
                    constraint: object({
                        keys: {
                            constraint_type: this.getConstraintType,
                            unit_a: object({
                                keys: {
                                    unit_type: this.getUnitType,
                                    memory_unit_variable_id: data['unit_variables'],
                                },
                            }),
                            unit_b: object({
                                keys: {
                                    unit_type: this.getUnitType,
                                },
                            }),
                        },
                    }),
                    constraint_type: this.getConstraintType,
                    value_a: data['action_values'],
                    value_b: data['action_values'],
                    weapon_tag: data['weapon_tags'],
                    damage_source: this.getDamageSource,
                    chance_value: data['action_values'],
                    comparison_type: this.getComparisonType,
                    unit: this.getUnit,
                    unit_constraint: this.getUnitConstraint(data),
                    unit_a: object({
                        keys: {
                            unit_type: this.getUnitType,
                            redirection: this.getRedirection,
                        },
                    }),
                    unit_b: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                },
            }),
        })
    }

    get getShaders() {
        return enumerate({
            items: ['ship', 'planet_corona', 'planet_city', 'planet_atmosphere', 'star_atmosphere', 'star_corona'],
        })
    }

    get getBlink() {
        return object({
            keys: {
                duration: float(),
                up_function: this.getFunctions,
                down_function: this.getFunctions,
            },
            required: ['duration', 'up_function', 'down_function'],
        })
    }

    getUnitConstraint(data) {
        return object({
            keys: {
                constraint_type: this.getConstraintType,
                percentage_missing_threshold: float(),
                amount_missing_threshold: float(),
                weapon_type: this.getWeaponType,
                mutation: data['mutations'],
                constraints: this.getConstraints(data),
            },
        })
    }
    get getAffectType() {
        return enumerate({
            items: ['shields_only', 'hull_and_armor_only', 'hull_only', 'armor_only'],
        })
    }

    get getPositionType() {
        return enumerate({
            items: ['target_position', 'ability_position', 'unit_position', 'operand_position', 'distance_in_direction_from_position'],
        })
    }

    get getAbilityType() {
        return enumerate({
            items: ['source_ability', 'all_abilities'],
        })
    }

    get getSourcePosition() {
        return object({
            keys: {
                position_type: this.getPositionType,
                unit: this.getUnit,
            },
        })
    }

    get getDestinationPosition() {
        return object({
            keys: {
                position_type: this.getPositionType,
                unit: this.getUnit,
            },
        })
    }

    get getDestinationUnit() {
        return object({
            keys: {
                unit_type: this.getUnitType,
                redirection: this.getRedirection,
            },
        })
    }

    get getBinding() {
        return enumerate({
            items: ['action_data_source'],
        })
    }

    getEffectDefinition(data) {
        return object({
            keys: {
                binding: this.getBinding,
                effect_by_size: object({
                    keys: {
                        small_unit: data['effect_alias_bindings'],
                        medium_unit: data['effect_alias_bindings'],
                        large_unit: data['effect_alias_bindings'],
                    },
                }),
                effect: data['effect_alias_bindings'],
                mesh_point: string(),
                mesh_point_usage: enumerate({
                    items: ['index', 'all'],
                }),
                mesh_point_index: integer(),
                only_visible_if_mesh_is_visible: boolean(),
            },
        })
    }

    get getPlanetTrackType() {
        return enumerate({
            items: ['commerce', 'mining', 'logistics'],
        })
    }

    get getTargetingUi() {
        return enumerate({
            items: ['send_pirate_raid', 'positive', 'pick_gravity_well'],
        })
    }

    getOperators(data) {
        return array({
            items: object({
                keys: {
                    special_operation_unit_kind: data['special_operation_kinds'],
                    float_variable: data['float_variables'],
                    destination_target_filter_id: data['target_filters'],
                    arrival_delay_value: data['action_values'],
                    available_supply_value: data['action_values'],
                    build_strikecraft_count: data['action_values'],
                    unit_item: data['unit_items'],
                    effect_alias_binding: this.getBinding,
                    damage_value: data['action_values'],
                    operator_type: this.getOperatorType,
                    new_owner_player: object({
                        keys: {
                            player_type: enumerate({ items: ['unit_owner'] }),
                            owned_unit: this.getUnit,
                        },
                    }),
                    destination_position: object({
                        keys: {
                            position_type: this.getPositionType,
                        },
                    }),
                    source_gravity_well: this.getUnit,
                    destination_gravity_well: this.getUnit,
                    clone_spawn_position: object({
                        keys: {
                            position_type: this.getPositionType,
                            distance_value: data['action_values'],
                            direction: this.getDirection,
                            source_position: this.getSourcePosition,
                        },
                    }),
                    clone_forward: object({
                        keys: {
                            direction_type: this.getDirectionType,
                            unit: this.getUnit,
                        },
                    }),
                    clone_count: data['action_values'],
                    buff_on_clone: data['buffs'],
                    skip_player_statistics: boolean(),
                    skip_awarding_experience: boolean(),
                    constrain_available_supply_to_owner_player: boolean(),
                    check_research_prerequisites: boolean(),
                    in_hyperspace: boolean(),
                    use_source_weapon_properties: boolean(),
                    math_operators: this.getMathOperators(data['action_values']),
                    effect_definition: this.getEffectDefinition(data),
                    destination_unit: this.getDestinationUnit,
                    source_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    units: object({
                        keys: {
                            random_units: this.units(data['units']),
                            required_units: this.getRequiredUnits(data),
                        },
                    }),
                    owner_player: object({
                        keys: {
                            player_type: this.getPlayerType,
                            owned_unit: object({
                                keys: {
                                    unit_type: this.getUnitType,
                                },
                            }),
                        },
                    }),
                    rewards_destination_player: object({
                        keys: {
                            player_type: this.getPlayerType,
                        },
                    }),
                    asset_type: this.getResources,
                    asset_value: data['action_values'],
                    damage_source: this.getDamageSource,
                    bombing_damage_value: data['action_values'],
                    antimatter_restore_value: data['action_values'],
                    damage_affect_type: this.damageAffectType,
                    antimatter_remove_value: data['action_values'],
                    mesh_point: string(),
                    weapon_tags: array({
                        items: data['weapon_tags'],
                        isUnique: true,
                    }),
                    unit_variable: data['unit_variables'],
                    new_unit_value: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    duration_value: data['action_values'],
                    to_player: object({
                        keys: {
                            player_type: this.getPlayerType,
                        },
                    }),
                    points_value: data['action_values'],
                    effects: this.getEffects(data['particle_effects']),
                    charge_duration: enumerate({
                        items: ['beam_charge_value', 'disintegration_beam_charge_value'],
                    }),
                    beam_duration: data['action_values'],
                    planet_track_type: this.getPlanetTrackType,
                    level_count_value: data['action_values'],
                    will_offset_development_track_upgrade_price: boolean(),
                    ignore_infinite_recursion_guard: boolean(),
                    penetration_value: data['action_values'],
                    bypass_shields_chance_value: this.getBypassShieldsChanceValue,
                    target_filter_id: data['target_filters'],
                    buff: data['buffs'],
                    affect_type: this.getAffectType,
                    repair_value: data['action_values'],
                    constraint: this.getConstraint(data),
                    collision_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    initial_float_values: array({
                        items: object({
                            keys: {
                                float_variable_id: data['float_variables'],
                                value_id: data['action_values'],
                            },
                        }),
                    }),
                },
            }),
        })
    }

    sound(data) {
        return object({
            keys: {
                sound: data['ogg'],
                is_dialogue: boolean(),
            },
            required: ['sound', 'is_dialogue'],
        })
    }

    get getDamageSource() {
        return enumerate({
            items: ['ability', 'weapon'],
        })
    }

    get getPlayerType() {
        return enumerate({
            items: ['buff_owner_player', 'unit_owner'],
        })
    }

    get getBypassShieldsChanceValue() {
        return enumerate({
            items: ['bypass_shields_chance_value', 'phase_missile_swarm_bypass_shields_chance_value'],
        })
    }

    get getTargetSort() {
        return object({
            keys: {
                sort_steps: array({
                    items: object({
                        keys: {
                            sort_type: enumerate({
                                items: ['build_or_virtual_supply', 'distance_to_unit'],
                            }),
                            sort_order: enumerate({
                                items: ['ascending', 'descending'],
                            }),
                            distance_reference_unit: object({
                                keys: {
                                    unit_type: this.getUnitType,
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }

    getMathOperators(action_values) {
        return array({
            items: object({
                keys: {
                    operator_type: enumerate({
                        items: ['assign', 'subtract', 'multiply', 'add', 'max', 'min', 'clamped_lerp'],
                    }),
                    operand_value: action_values,
                    lerp_range_lower_bound_value: '',
                    lerp_value_lower_bound_value: '',
                    lerp_range_upper_bound_value: '',
                    lerp_value_upper_bound_value: '',
                    lerp_t_value: '',
                },
                condition: If({
                    key: 'operator_type',
                    value: 'clamped_lerp',
                    requires: ['lerp_t_value', 'lerp_range_lower_bound_value', 'lerp_range_lower_bound_value', 'lerp_range_upper_bound_value', 'lerp_value_upper_bound_value'],
                    properties: {
                        lerp_range_lower_bound_value: action_values,
                        lerp_range_lower_bound_value: action_values,
                        lerp_range_upper_bound_value: action_values,
                        lerp_value_upper_bound_value: action_values,
                        lerp_t_value: action_values,
                    },
                }),
            }),
        })
    }

    get getPosition() {
        return object({
            keys: {
                position_type: this.getPositionType,
                ability: object({
                    keys: {
                        ability_type: this.getAbilityType,
                        unit: this.getUnit,
                    },
                }),
                unit: this.getUnit,
                ability_position_picking_type: enumerate({
                    items: ['next_sequential'],
                }),
            },
        })
    }

    get getDirection() {
        return object({
            keys: {
                direction_type: this.getDirectionType,
                source_position: this.getSourcePosition,
                destination_position: this.getDestinationPosition,
                unit: this.getUnit,
            },
        })
    }

    get getUnitForward() {
        return object({
            keys: {
                direction_type: this.getDirectionType,
                unit: this.getUnit,
                source_position: this.getSourcePosition,
                destination_position: this.getDestinationPosition,
            },
        })
    }

    get getEffectForward() {
        return object({
            keys: {
                direction_type: this.getDirectionType,
                source_position: this.getSourcePosition,
                destination_position: this.getDestinationPosition,
            },
        })
    }

    getPositionOperators(data) {
        return array({
            items: object({
                keys: {
                    operator_type: this.getOperatorType,
                    effect_definition: this.getEffectDefinition(data),
                    unit_to_create: data['units'],
                    special_operation_unit_kind: data['special_operation_kinds'],
                    unit_forward: this.getUnitForward,
                    is_self_building: boolean(),
                    buff_on_created_unit: data['buffs'],
                    torpedo_source_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    torpedo_target_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    buff_on_agent: data['buffs'],
                    effect_destination_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    effect_forward: this.getEffectForward,
                    effect_up: object({
                        keys: {
                            direction_type: this.getDirectionType,
                            unit: this.getUnit,
                        },
                    }),
                    hyperspace_destination_position: object({
                        keys: {
                            position_type: this.getPositionType,
                            distance_value: enumerate({
                                items: ['planet_surface_radius', 'replicate_forces_spawn_range_value'],
                            }),
                            direction: this.getDirection,
                            source_position: object({
                                keys: {
                                    position_type: this.getPositionType,
                                    unit: this.getUnit,
                                },
                            }),
                        },
                    }),
                    is_change_gravity_well_to_hyperspace_destination_enabled: boolean(),
                },
            }),
        })
    }

    get getEasingFunctons() {
        return enumerate({
            items: ['linear', 'in_cubic', 'out_cubic', 'in_out_sine'],
        })
    }

    get getTriggerEventType() {
        return enumerate({
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

    get getExemptions() {
        return enumerate({
            items: ['is_not_explored'],
        })
    }

    get getFunctions() {
        return enumerate({
            items: ['in_sine', 'in_out_quad', 'out_sine'],
        })
    }

    get getShipRoles() {
        return array({
            items: enumerate({
                items: ['attack_ship', 'bomb_planet', 'colonize', 'explore', 'anti_structure', 'raid'],
            }),
            isUnique: true,
        })
    }

    getConstraints(data) {
        return array({
            items: object({
                keys: {
                    slot_type: enumerate({
                        items: ['military'],
                    }),
                    weapon_type: this.getWeaponType,
                    tag: data['weapon_tags'],
                    value_a: data['action_values'],
                    value_b: data['action_values'],
                    comparison_type: this.getComparisonType,
                    constraint_type: this.getConstraintType,
                    ship_roles: this.getShipRoles,
                    unit_definition: '',
                    permission_type: enumerate({
                        items: ['can_hyperspace'],
                    }),
                    buff: data['buffs'],
                    unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    unit_constraint: object({
                        keys: {
                            constraint_type: this.getConstraintType,
                            percentage_missing_threshold: float(),
                            amount_missing_threshold: float(),
                            mutation: data['mutations'],
                        },
                    }),
                    constraints: array({
                        items: object({
                            keys: {
                                constraint_type: this.getConstraintType,
                                amount_missing_threshold: '',
                                percentage_missing_threshold: '',
                            },
                            condition: IfMap({
                                key: 'constraint_type',
                                values: ['has_missing_antimatter', 'has_missing_armor'],
                                requires: [],
                                properties: {
                                    amount_missing_threshold: float(),
                                    percentage_missing_threshold: percentage(),
                                },
                            }),
                        }),
                    }),
                    constraint: object({
                        keys: {
                            constraint_type: this.getConstraintType,
                            buff: data['buffs'],
                            unit: this.getUnit,
                            unit_constraint: object({
                                keys: {
                                    constraint_type: this.getConstraintType,
                                    percentage_missing_threshold: float(),
                                    amount_missing_threshold: float(),
                                    buff: data['buffs'],
                                    mutation: data['mutations'],
                                },
                            }),
                            mutation: '',
                        },
                        condition: IfMap({
                            key: 'constraint_type',
                            values: ['has_mutation'],
                            requires: [],
                            properties: {
                                mutation: data['mutations'],
                            },
                        }),
                    }),
                    amount_missing_threshold: '',
                    percentage_missing_threshold: '',
                    must_be_functional: boolean(),
                },
                condition: If({
                    key: 'constraint_type',
                    value: 'has_definition',
                    requires: ['unit_definition'],
                    properties: {
                        unit_definition: data['units'],
                    },
                    additional: IfMap({
                        key: 'constraint_type',
                        values: ['has_missing_antimatter', 'has_missing_armor'],
                        requires: [],
                        properties: {
                            amount_missing_threshold: float(),
                            percentage_missing_threshold: percentage(),
                        },
                    }),
                }),
            }),
        })
    }

    get getOwnerships() {
        return array({
            items: enumerate({
                items: ['self', 'friendly', 'enemy', 'none', 'ally'],
            }),
            isUnique: true,
        })
    }

    getEffects(particle_effects) {
        return object({
            keys: {
                muzzle_effect: particle_effects,
                beam_effect: particle_effects,
                hit_hull_effect: particle_effects,
                hit_shield_effect: particle_effects,
                hit_shield_impact_radius_t: float(),
                burst_pattern: array({
                    items: float(),
                }),
                projectile_travel_effect: particle_effects,
                projectile_travel_easing_function: enumerate({ items: ['in_out_cubic'] }),
                charge_effect: particle_effects,
                muzzle_picking_behavior: enumerate({
                    items: ['sequential', 'random'],
                }),
            },
        })
    }

    get getAssets() {
        return object({
            keys: {
                credits: vector2(),
                metal: vector2(),
                crystal: vector2(),
            },
        })
    }

    get getDomain() {
        return enumerate({
            items: ['military', 'civilian'],
        })
    }

    get damageAffectType() {
        return enumerate({
            items: ['hull_and_shields', 'hull_and_armor_and_shields', 'hull_only', 'shields_only', 'hull_and_armor_only'],
        })
    }

    get value_color() {
        return enumerate({
            items: ['positive', 'negative'],
        })
    }

    get value_float_format() {
        return enumerate({
            items: ['percentage_one_decimal_place', 'percentage', 'one_decimal_place', 'no_decimal_place', 'percentage_one_decimal_place_with_sign', 'one_decimal_place_with_sign', 'no_decimal_place_with_sign', 'percentage_with_sign', 'two_decimal_place_with_sign'],
        })
    }

    get value_suffix() {
        return enumerate({
            items: ['seconds', 'per_second'],
        })
    }

    get planet_modifier_id() {
        return enumerate({
            items: ['track_build_time', 'structure_build_time'],
        })
    }

    get rendering_type() {
        return enumerate({
            items: ['buff_empire_modifier', 'unit_icon_and_name', 'unit_item_value', 'single_value', 'buff_weapon_modifier', 'buff_unit_factory_modifier', 'buff_unit_modifier', 'buff_planet_modifier', 'buff_trade_capacity'],
        })
    }

    get getTargetingType() {
        return enumerate({
            items: ['radius', 'range', 'range_and_radius', 'between_gravity_well_range', 'arc'],
        })
    }

    get build_group_id() {
        return enumerate({
            items: ['defense', 'utility', 'offense', 'infrastructure', 'economy'],
        })
    }
    exotic_price(exotics) {
        return array({
            items: object({
                keys: {
                    exotic_type: exotics,
                    count: integer(),
                },
            }),
        })
    }

    units(units) {
        return array({
            items: object({
                keys: {
                    unit: units,
                    weight: float(),
                },
            }),
        })
    }

    getRequiredUnits(data) {
        return array({
            items: object({
                keys: {
                    unit: data['units'],
                    options: object({
                        keys: {
                            is_temporary_ruler_ship: boolean(),
                            forced_leveled_up_ability: data['abilities'],
                            items: array({
                                items: data['ship_components'],
                                isUnique: true,
                            }),
                        },
                    }),
                    count: vecInt2(),
                },
            }),
        })
    }

    get getWeaponType() {
        return enumerate({
            items: ['planet_bombing', 'normal'],
        })
    }

    get getSpawnType() {
        return enumerate({
            items: ['build_from_factory', 'hyperspace_in'],
        })
    }

    get getResources() {
        return enumerate({
            items: ['credits', 'metal', 'crystal'],
        })
    }

    get price() {
        return object({
            keys: {
                credits: float(),
                metal: float(),
                crystal: float(),
            },
        })
    }

    get getTransformType() {
        return enumerate({
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

    getConstraint(data) {
        return object({
            keys: {
                destination_unit: this.getDestinationUnit,
                damage_source: this.getDamageSource,
                constraint_type: this.getConstraintType,
                value_a: data['action_values'],
                value_b: data['action_values'],
                comparison_type: this.getComparisonType,
                bonus_damage_value: data['action_values'],
                weapon_tag: data['weapon_tags'],
                float_variable: data['float_variables'],
                math_operators: this.getMathOperators(data['action_values']),
                constraints: this.getBuffConstraints(data),
                unit_constraint: this.getUnitConstraint(data),
                target_filter_id: data['target_filters'],
                compare_value: data['action_values'],
                constraint: object({
                    keys: {
                        constraint_type: this.getConstraintType,
                        target_filter_id: data['target_filters'],
                        unit: this.getUnit,
                        unit_constraint: this.getUnitConstraint(data),
                        unit_a: this.getUnit,
                        unit_b: this.getUnit,
                    },
                }),
                unit: this.getUnit,
                unit_a: object({
                    keys: {
                        unit_type: this.getUnitType,
                    },
                }),
                unit_b: object({
                    keys: {
                        unit_type: this.getUnitType,
                    },
                }),
            },
        })
    }

    ability() {
        return object({
            keys: {
                ability_type: this.getAbilityType,
                unit_with_abilities: object({
                    keys: {
                        unit_type: this.getUnitType,
                    },
                }),
                unit: this.getUnit,
            },
        })
    }

    exotics(exotics) {
        return object({
            keys: {
                exotics_source_type: enumerate({
                    items: ['unit_build_cost', 'explicit_amount'],
                }),
                source_unit: object({
                    keys: {
                        unit_type: this.getUnitType,
                    },
                }),
                exotic_amounts: array({
                    items: object({
                        keys: {
                            exotic_type: exotics,
                            count_value: enumerate({
                                items: ['fixed_one'],
                            }),
                        },
                    }),
                }),
            },
        })
    }

    npcRewards(npc_rewards) {
        return array({
            items: object({
                keys: {
                    weight: float(),
                    npc_reward: npc_rewards,
                },
            }),
        })
    }

    getTimeActions(data) {
        return array({
            items: object({
                keys: {
                    executions_per_interval_value: data['action_values'],
                    first_action_delay_time_value: data['action_values'],
                    execution_interval_value: data['action_values'],
                    execution_interval_count_value: data['action_values'],
                    action_group: object({
                        keys: {
                            constraint: this.getConstraint(data),
                            actions: this.getActions(data),
                        },
                    }),
                },
            }),
        })
    }

    getActions(data) {
        return array({
            items: object({
                keys: {
                    radius_origin_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    include_radius_origin_unit: boolean(),
                    is_empowered: boolean(),
                    radius_value: data['action_values'],
                    gravity_well_origin_unit: this.getGravityWellOriginUnit,
                    constraint: this.getConstraint(data),
                    attractor_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    max_linear_speed_value: data['action_values'],
                    time_to_max_linear_speed_value: data['action_values'],
                    strikecraft_carrier_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    arc_origin_unit: object({
                        keys: {
                            unit_type: this.getUnitType,
                        },
                    }),
                    arc_direction: object({
                        keys: {
                            direction_type: this.getDirectionType,
                            unit: this.getUnit,
                        },
                    }),
                    arc_radius_value: data['action_values'],
                    arc_angle_value: data['action_values'],
                    max_target_count_value: enumerate({
                        items: ['fixed_one'],
                    }),
                    target_sort: this.getTargetSort,
                    bonus_damage_value: data['action_values'],
                    operators_constraint: this.getConstraint(data),
                    buff_constraint: object({
                        keys: {
                            constraint_type: this.getConstraintType,
                            buff: enumerate({
                                items: ['operand_buff'],
                            }),
                            mutation: data['mutations'],
                        },
                    }),
                    ability: this.ability(),
                    max_jump_distance_value: data['action_values'],
                    destination_unit: this.getDestinationUnit,
                    action_type: this.getActionType,
                    buff: enumerate({
                        items: ['all_child_buffs', 'all_buffs_on_current_spawner'],
                    }),
                    position: this.getPosition,
                    asset_type: this.getResources,
                    give_amount_id: data['action_values'],
                    travel_time: object({
                        keys: {
                            travel_time_source: enumerate({
                                items: ['speed_and_distance', 'explicit_time'],
                            }),
                            travel_speed_value: data['action_values'],
                        },
                    }),
                    damage_prevented_value: data['action_values'],
                    action_id: data['buff_actions'],
                    float_variable: data['float_variables'],
                    math_operators: this.getMathOperators(data['action_values']),
                    player: object({
                        keys: {
                            player_type: this.getPlayerType,
                        },
                    }),
                    exotics: this.exotics(data['exotics']),
                    position_operators: this.getPositionOperators(data),
                    npc_rewards: this.npcRewards(data['npc_rewards']),
                    operators: this.getOperators(data),
                    buff_on_created_unit: data['units'],
                    effect_definition: this.getEffectDefinition(data),
                    hyperspace_destination_position: this.getHyperspaceDestinationPosition,
                    is_looping: boolean(),
                },
            }),
        })
    }

    getActionValue(float_variable_ids) {
        return object({
            keys: {
                action_value_id: string(),
                action_value: object({
                    keys: {
                        transform_type: this.getTransformType,
                        memory_float_variable_id: float_variable_ids,
                        values: array({
                            items: float(false),
                        }),
                        transform_unit: object({
                            keys: {
                                unit_type: this.getUnitType,
                            },
                        }),
                    },
                }),
            },
        })
    }

    get getGravityWellOriginUnit() {
        return object({
            keys: {
                unit_type: this.getUnitType,
            },
        })
    }

    get getDirectionType() {
        return enumerate({
            items: ['from_position_to_position', 'unit_up', 'unit_forward', 'unit_cross'],
        })
    }

    get getHyperspaceDestinationPosition() {
        return object({
            keys: {
                position_type: this.getPositionType,
                distance_value: enumerate({
                    items: ['planet_surface_radius', 'replicate_forces_spawn_range_value'],
                }),
                direction: object({
                    keys: {
                        direction_type: this.getDirectionType,
                        source_position: this.getSourcePosition,
                        destination_position: this.getDestinationPosition,
                    },
                }),
                source_position: this.getSourcePosition,
            },
        })
    }

    get getUnitType() {
        return enumerate({
            items: ['none', 'buff_memory', 'value_comparison', 'target', 'trigger_event_destination', 'first_spawner', 'current_spawner', 'previous_spawner', 'operand_destination', 'trigger_event_source'],
        })
    }

    getWindfall(exotics, units) {
        return object({
            keys: {
                units_given: object({
                    keys: {
                        required_units: array({
                            items: object({
                                keys: {
                                    unit: units,
                                    count: vector2(),
                                },
                            }),
                        }),
                    },
                }),
                exotics_given: array({
                    items: object({
                        keys: {
                            exotic_type: exotics,
                            count: integer(),
                        },
                    }),
                }),
            },
        })
    }

    get getValueBehavior() {
        return enumerate({
            items: ['scalar', 'additive'],
        })
    }

    margins() {
        return object({
            keys: {
                top: integer(true),
                bottom: integer(true),
                left: integer(true),
                right: integer(true),
            },
        })
    }

    brush_render_style() {
        return enumerate({
            items: ['stretched', 'centered'],
        })
    }

    label_form(data) {
        return object({
            keys: {
                label_text: data['localisation'],
                label_color: data['colors'],
                value_color: data['colors'],
                icon: data['textures'],
            },
        })
    }

    status(param) {
        return object({
            keys: {
                very_low: param,
                low: param,
                normal: param,
                high: param,
                very_high: param,
            },
        })
    }

    ai_dificulty_definition(data) {
        return object({
            keys: {
                icon: data['textures'],
                name: data['localisation'],
                description: data['localisation'],
            },
        })
    }

    status_values() {
        return object({
            keys: {
                very_low: float(),
                low: float(),
                normal: float(),
                high: float(),
                very_high: float(),
            },
        })
    }

    component(textures) {
        return object({
            keys: {
                layout: this.layout(),
                brush: textures,
                brush_render_style: this.brush_render_style(),
            },
        })
    }

    background(textures) {
        return object({
            keys: {
                layout: this.layout(),
                brush: textures,
                highlighted_brush: textures,
                outer_margins: this.margins(),
                use_control_brush_state: boolean(),
                brush_render_style: this.brush_render_style(),
                components: array({
                    items: this.component(textures),
                }),
            },
        })
    }

    entry_box(textures) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                brush: textures,
                brush_render_style: this.brush_render_style(),
                prefix_text: string(),
                prefix_spacing: float(),
            },
        })
    }

    messages_box(localisation, colors) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                system_message_color: colors,
                my_message_color: colors,
                other_player_message_color: colors,
                received_message_format: localisation,
                player_joined_message_format: localisation,
            },
        })
    }

    text_colors(colors) {
        return object({
            keys: {
                normal: colors,
                disabled: colors,
                hovered: colors,
            },
        })
    }

    window_frame(data, { properties: properties } = {}) {
        return object({
            keys: {
                layout: this.layout(),
                overlay: this.background(data['textures']),
                frame_overlay: enumerate({ items: ['entry_simple_frame'] }),
                font: data['fonts'],
                color: data['colors'],
                icon_size: this.icon_size(),
                ...properties,
            },
        })
    }

    style() {
        return enumerate({
            items: [
                'npcs_window_influence_points',
                'fleet_list',
                'hud_unit_name_large',
                'hud_title',
                'hud_icon_large_exotics',
                'build_exotic_header',
                'trade_window_points',
                'trade_window_change_points',
                'player_victory_dialog_phrase',
                'player_victory_dialog_status',
                'npc_market_demand',
                'diplomacy_player',
                'hud_chat_window',
                'hud_icon',
                'build_exotic_status',
                'hud_unit_name_with_dark_background',
                'title_screen',
                'basic_text_list',
                'overlay_frame_only',
                'player_theme_picker_action',
                'player_theme_picker_header_name',
                'checkbox',
                'modding_terms_of_use',
                'modding_not_authenticated',
                'dialog_title',
                'hud_increase_ability_level',
                'research_text_filter_count',
                'hud_dark_wide',
                'front_end_message',
                'hud_dark_text_display',
                'reflect_box_toggle_button',
                'social_link',
                'front_end_version',
                'settings',
                'front_end_top_bar',
                'front_end',
                'setting_window_item',
                'debug_tool_close_button',
                'debug_tool_title_label',
                'debug',
                'research_field_header',
                'icon_no_background',
                'hud_research_text_filter',
                'hud_dark_square',
                'hud_research_window_tier_button',
                'hud_icon_and_text_action',
                'colony_list',
                'unit_factory_build_group_header',
                'hud_unit_name',
                'lobby_icon_and_text_action',
                'default',
                'lobby_option',
                'front_end_lobby_dialog_player_name',
                'icon_only',
                'front_end_lobby_team_count',
                'front_end_lobby_team_panels',
                'front_end_dialogue_bar',
                'chat',
                'dialogue_with_claw_frame',
                'diplomacy_demand_title',
                'diplomacy_offer_title',
                'hud_icon_only_action',
                'hud_title_with_text_glow',
                'dialogue',
                'bind_input_mapping_dialog_input_mapping',
                'bind_input_mapping_dialog_action_name',
                'front_end_dialog_title',
                'front_end_message_dialog_message',
                'alliance_lock_duration',
            ],
        })
    }

    tooltip(data) {
        return object({
            keys: {
                anchor_location_on_button: this.anchor(),
                anchor_location_on_tooltip: this.anchor(),
                title_icon: data['textures'],
                title_text: data['localisation'],
                description: data['localisation'],
                description_blocks: array({
                    items: this.label_form2(data),
                    isUnique: true,
                }),
            },
        })
    }

    with_alliance_lock_tooltip(localisation, textures) {
        return object({
            keys: {
                title_icon: textures,
                title_text: localisation,
                description: localisation,
            },
        })
    }

    without_alliance_lock_tooltip(localisation, textures) {
        return object({
            keys: {
                title_icon: textures,
                title_text: localisation,
                description: localisation,
            },
        })
    }

    break_alliance_button(data) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                icon: data['textures'],
                tooltip: this.tooltip(data),
                text: data['localisation'],
                not_allied_on_team_description: data['localisation'],
                not_allied_description: data['localisation'],
                not_allied_color: data['colors'],
                permanently_allied_color: data['colors'],
                lock_time_remaining_line: this.label_form(data),
            },
        })
    }

    planet({ properties: properties, meshes: meshes, textures: textures }) {
        return object({
            keys: {
                mesh: meshes,
                ...properties,
                corona: object({
                    keys: {
                        shader: this.getShaders,
                        color_texture: textures,
                        color: color(),
                        radius_scalar: float(),
                        noise_texture: textures,
                        animation_speed: float(),
                        noise_1_zoom: float(),
                        basic_constants: object({
                            keys: {
                                emissive_factor: float(),
                                alpha_ramp_steepness: float(),
                                alpha_ramp_growth_delay: float(),
                                alpha_ramp_curvature: float(),
                                alpha_ramp_max_alpha_scalar: float(),
                            },
                        }),
                    },
                }),
            },
        })
    }

    cancel_button(localisation, textures) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                icon: textures,
                tooltip: this.tooltip(localisation, textures),
                behavior_definitions: object({
                    keys: {
                        cancel_create_offer: object({
                            keys: {
                                text: localisation,
                                description: localisation,
                            },
                        }),
                        decline_offer: object({
                            keys: {
                                text: localisation,
                                description: localisation,
                            },
                        }),
                    },
                }),
                refund_text: localisation,
            },
        })
    }

    ok_button(data) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                icon: data['textures'],
                tooltip: this.tooltip(data),
                text: data['localisation'],
                alliance_offer_duration_label: data['localisation'],
                behavior_definitions: object({
                    keys: {
                        create_offer: object({
                            keys: {
                                text: data['localisation'],
                                description: data['localisation'],
                            },
                        }),
                        update_offer: object({
                            keys: {
                                text: data['localisation'],
                                description: data['localisation'],
                            },
                        }),
                        accept_offer: object({
                            keys: {
                                text: data['localisation'],
                                description: data['localisation'],
                            },
                        }),
                    },
                }),
            },
        })
    }

    alliance_lock_duration_button(localisation, textures) {
        return object({
            keys: {
                text_prefix_if_has_alliance_lock: string(),
                not_included_in_offer_alpha: float(),
                alliance_lock_duration_label: localisation,
                alliance_lock_duration_seperator: string(),
                layout: this.layout(),
                style: this.style(),
                tooltip: this.tooltip(localisation, textures),
                without_alliance_lock_tooltip: this.without_alliance_lock_tooltip(localisation, textures),
                with_alliance_lock_tooltip: this.with_alliance_lock_tooltip(localisation, textures),
            },
        })
    }

    box() {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
            },
        })
    }

    progress_bar() {
        return object({
            keys: {
                layout: this.layout(),
                bar: object({
                    keys: {
                        outline_size: float(),
                        outline_color: color(),
                        backdrop_color: color(),
                        bar_color: color(),
                    },
                }),
                outline_size: float(),
                outline_color: color(),
                backdrop_color: color(),
                bar_color: color(),
            },
        })
    }

    window(textures, { properties: properties } = {}) {
        return {
            bar_size: vecInt2(),
            background: this.background(textures),
            content_window: object({
                keys: {
                    layout: this.layout(),
                    ...properties,
                },
            }),
        }
    }

    button(data, { isPrefixText: isPrefixText = false, extra_properties: extra_properties } = {}) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                icon: data['textures'],
                text: isPrefixText ? string() : data['localisation'],
                name: data['localisation'],
                tooltip_title_text: data['localisation'],
                tooltip: this.tooltip(data),
                layout_grid_coord: vecInt2(),
                compressed_icon: data['textures'],
                uncompressed_icon: data['textures'],
                tooltip_title_prefix_format: data['localisation'],
                tooltip_title_prefix_horizontal_gap: float(),
                ...extra_properties,
            },
        })
    }

    button2() {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                text: string(),
            },
        })
    }

    text_entry() {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
            },
        })
    }

    icon(textures, { extra_properties: extra_properties } = {}) {
        return object({
            keys: {
                layout: this.layout(),
                brush: textures,
                style: this.style(),
                brush_render_style: this.brush_render_style(),
                ...extra_properties,
            },
        })
    }

    header_label_style() {
        return enumerate({
            items: ['modding_filter_type_header', 'game_input_group_header', 'front_end_lobby_dialog_team_panel_header', 'unit_factory_build_group_header'],
        })
    }

    content_window() {
        return object({
            keys: {
                layout: this.layout(),
                build_groups_horizontal_gap: float(),
                build_group_window_shared_definition: object({
                    keys: {
                        header_label_style: this.header_label_style(),
                        header_label_layout: this.layout(),
                        buttons_panel_layout: this.layout(),
                        buttons_panel_shared_definition: object({
                            keys: {
                                button_layout_grid: this.layout_grid(),
                                min_row_count: integer(),
                                max_row_count: integer(),
                            },
                        }),
                    },
                }),
            },
        })
    }

    button_panel({ extra_properties: extra_properties } = {}) {
        return object({
            keys: {
                layout: this.layout(),
                button_layout_grid: this.layout_grid(),
                column_count: integer(),
                row_count: integer(),
                ...extra_properties,
            },
        })
    }

    stacks_panel() {
        return object({
            keys: {
                layout: this.layout(),
                stack_button_count: float(),
                stack_button_grid: this.layout_grid(),
            },
        })
    }

    grid_button(localisation) {
        return object({
            keys: {
                layout_grid_coord: vecInt2(),
                name: localisation,
                description: localisation,
            },
        })
    }

    layout_grid() {
        return object({
            keys: {
                outer_margin: vector2(),
                element_spacing: vector2(),
                element_size: vector2(),
            },
        })
    }

    grid_link_state_brush(textures) {
        return object({
            keys: {
                horizontal_connector_brush: textures,
                vertical_connector_brush: textures,
                junction_brushes: object({
                    keys: {
                        left_right: textures,
                        left_top: textures,
                        left_bottom: textures,
                        left_top_bottom: textures,
                        left_right_top: textures,
                        left_right_bottom: textures,
                        left_right_top_bottom: textures,
                        top_bottom: textures,
                        top_right: textures,
                        top_bottom_right: textures,
                        bottom_right: textures,
                    },
                }),
                arrow_brushes: object({
                    keys: {
                        to_right: textures,
                        to_top: textures,
                        to_bottom: textures,
                    },
                }),
            },
        })
    }

    buttons_panel(textures) {
        return object({
            keys: {
                layout: this.layout(),
                button_shared_definition: this.button_shared_definition(textures),
                background_outer_margins: this.margins(),
                background_components: object({
                    keys: {
                        left: textures,
                        right: textures,
                        center: textures,
                    },
                }),
                buttons_layout_grid: this.layout_grid(),
                max_button_count: float(),
            },
        })
    }

    button_shared_definition(textures, { extra_properties: extra_properties } = {}) {
        return object({
            keys: {
                style: this.style(),
                drop_shadow: this.drop_shadow(textures),
                frame: object({
                    keys: {
                        brush: textures,
                        brush_render_style: this.brush_render_style(),
                    },
                }),
                glass: textures,
                disabled: textures,
                ...extra_properties,
            },
        })
    }

    drop_shadow(textures) {
        return object({
            keys: {
                brush: textures,
                brush_render_style: this.brush_render_style(),
                outer_margins: this.margins(),
            },
        })
    }

    label(data) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                text: data['localisation'],
                icon: data['textures'],
                icon_size: this.icon_size(),
            },
        })
    }

    icon_size() {
        return enumerate({
            items: ['large'],
        })
    }

    icon_style() {
        return enumerate({
            items: ['hud_icon_only'],
        })
    }

    portrait_window() {
        return object({
            keys: {
                layout: this.layout(),
                background: object({
                    keys: {
                        layout: this.layout(),
                    },
                }),
                overlay: enumerate({ items: ['entry_simple_frame'] }),
            },
        })
    }

    anchor() {
        return enumerate({
            items: ['top_center', 'top_left', 'bottom_center', 'top_right', 'bottom_left', 'center_right', 'center_left', 'bottom_right'],
        })
    }

    pan() {
        return object({
            keys: {
                layout: this.layout(),
                text: string(),
            },
        })
    }

    initial_state() {
        return object({
            keys: {
                // TODO: Find out status stuff in .gui ....
                status: enumerate({ items: ['docked'] }),
                floating_area: object({
                    keys: {
                        top_left: vecInt2(),
                        size: vecInt2(),
                    },
                }),
                dock_direction: this.alignment(),
                dock_size: vecInt2(),
            },
        })
    }

    line_definition(fonts, colors) {
        return object({
            keys: {
                icon_size: vecInt2(),
                icon_and_text_gap: float(),
                label_font: fonts,
                value_font: fonts,
                label_color: colors,
                value_offset: float(),
                post_value_color: colors,
                bottom_gap: float(),
            },
        })
    }

    content_panel(data) {
        return object({
            keys: {
                layout: this.layout(),
                title_label: this.label(data),
                message_label: this.label(data),
                close_button: this.label(data),
                action_name_label: this.label(data),
                input_mapping_label: this.label(data),
                bind_button: this.label(data),
                cancel_button: this.label(data),
                welcome_dialog_list_box: this.list_box(data['localisation']),
                sins2_link_icon: this.icon(data['textures']),
                sins2_link_label: this.label(data),
                sins2_link_text_entry: this.text_entry(),
                sins2_link_open_button: this.button(data),
                discord_link_icon: this.icon(data['textures']),
                discord_link_label: this.label(data),
                discord_link_text_entry: this.text_entry(),
                discord_link_open_button: this.button(data),
            },
        })
    }

    orientation() {
        return enumerate({
            items: ['horizontal', 'vertical'],
        })
    }

    overlays(textures) {
        return array({
            items: object({
                keys: {
                    layout: this.layout(),
                    brush: textures,
                    brush_render_style: this.brush_render_style(),
                },
            }),
        })
    }

    tweaks_window() {
        return object({
            keys: {
                layout: this.layout(),
                reflect_box: object({
                    keys: {
                        layout: this.layout(),
                    },
                }),
                controls_panel: object({
                    keys: {
                        layout: this.layout(),
                    },
                }),
                local_space_button: this.button2(),
                local_space_button: this.button2(),
                global_space_button: this.button2(),
                pan_x_negative_button: this.button2(),
                pan_x_positive_button: this.button2(),
                pan_y_negative_button: this.button2(),
                pan_y_positive_button: this.button2(),
                pan_z_negative_button: this.button2(),
                pan_z_positive_button: this.button2(),
                yaw_negative_button: this.button2(),
                yaw_positive_button: this.button2(),
                pitch_negative_button: this.button2(),
                pitch_positive_button: this.button2(),
                roll_negative_button: this.button2(),
                roll_positive_button: this.button2(),
            },
        })
    }

    animation(textures) {
        return object({
            keys: {
                left_to_right_blip: textures,
                top_to_bottom_blip: textures,
                right_to_left_blip: textures,
                bottom_to_top_blip: textures,
                glow: textures,
                travel_speed: integer(),
            },
        })
    }

    panel(localisation, colors, textures, { extra_properties: extra_properties } = {}) {
        return object({
            keys: {
                layout: this.layout(),
                orientation: this.orientation(),
                sub_collection_size: integer(),
                sub_collection_gap: integer(),
                children_gap: integer(),
                row_count: integer(),
                background: this.background(textures),
                child_layout_grid: this.layout_grid(),
                button_layout_grid: this.layout_grid(),
                ...extra_properties,
                button_shared_definition: object({
                    keys: {
                        not_included_in_offer_alpha: float(),
                        style: this.style(),
                        layout: this.layout(),
                        tooltip: this.tooltip(localisation, textures),
                        tooltip_title_prefix_text: localisation,
                        tooltip_available_exotic_count_label: localisation,
                        tooltip_available_exotic_count_color: colors,
                        count_layout: this.layout(),
                        count_font: string(),
                        count_color: colors,
                    },
                }),
            },
        })
    }

    background_window(data) {
        return object({
            keys: {
                layout: this.layout(),
                content_panel: this.content_panel(data),
                brush: data['textures'],
                brush_render_style: this.brush_render_style(),
                components: array({
                    items: this.component(data['textures']),
                    isUnique: true,
                }),
            },
        })
    }

    alignment() {
        return enumerate({
            items: ['top', 'bottom', 'stretch', 'center', 'left', 'right', 'top_left', 'top_right'],
        })
    }

    status_definition(data) {
        return object({
            keys: {
                icon: data['textures'],
                name: data['localisation'],
                description: data['localisation'],
            },
        })
    }

    area() {
        return object({
            keys: {
                top_left: vecInt2(),
                size: vecInt2(),
            },
        })
    }
    layout() {
        return object({
            keys: {
                vertical_alignment: this.alignment(),
                horizontal_alignment: this.alignment(),
                width: float(),
                height: float(),
                margins: this.margins(),
                area: this.area(),
            },
        })
    }
    label_form2(data) {
        return object({
            keys: {
                text: data['localisation'],
                color: data['colors'],
            },
        })
    }

    label_style() {
        return enumerate({
            items: ['hud_phase_resonance_level', 'game_input_action_name', 'default'],
        })
    }

    box_style() {
        return enumerate({
            items: ['mod_description'],
        })
    }

    settings_list_box(localisation, textures) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                group_header_window_shared_definition: object({
                    keys: {
                        height: float(),
                        label_style: this.header_label_style(),
                        label_layout: this.layout(),
                        background: object({
                            keys: {
                                fill_color: color(),
                            },
                        }),
                        icon_layout: this.layout(),
                        minimized_icon: textures,
                        expanded_icon: textures,
                    },
                }),
                action_window_shared_definition: object({
                    keys: {
                        height: float(),
                        name_label_style: this.label_style(),
                        mapping_button_style: this.style(),
                        name_label_layout: this.layout(),
                        mapping_button_0_layout: this.layout(),
                        mapping_button_1_layout: this.layout(),
                        even_background_color: color(),
                        odd_background_color: color(),
                    },
                }),
                group_header_windows: object({
                    keys: {
                        core: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        ships: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        ship_abilities: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        ship_items: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        planet_items: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        planets: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        hud: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        control_groups: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        selection: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        future_orbits: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        chat: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        camera: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        debug: object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                    },
                }),
            },
        })
    }

    sound_settings_element(localisation) {
        return object({
            keys: {
                layout: this.layout(),
                label: object({
                    keys: {
                        style: this.style(),
                        text: localisation,
                    },
                }),
                scroll_bar: object({
                    keys: {
                        layout: this.layout(),
                        style: this.style(),
                    },
                }),
            },
        })
    }

    scroll_bar_layout() {
        return object({
            keys: {
                margins: this.margins(),
                horizontal_alignment: this.alignment(),
                width: integer(),
            },
        })
    }

    drop_box(data) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                ffa_name: data['localisation'],
                teams_postfix: data['localisation'],
                drag_and_drop_hint_description: this.label_form2(data),
            },
        })
    }

    list_box_styles() {
        return enumerate({
            items: ['debug', 'drop_box_list', 'mods'],
        })
    }
    drop_box_styles() {
        return enumerate({
            items: ['debug', 'drop_box_list'],
        })
    }

    backgrounds(textures) {
        return array({
            items: this.background(textures),
            isUnique: true,
        })
    }

    list_box(localisation) {
        return object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                text: localisation,
            },
        })
    }
}

class UnitModifiers extends Definitions {
    constructor() {
        super()
    }

    create({ hasArrayValues: hasArrayValues, prerequisites: prerequisites = {} }, data) {
        let result

        if (hasArrayValues)
            result = {
                values: array({
                    items: float(false),
                }),
            }
        else
            result = {
                value: float(false),
            }

        return array({
            items: object({
                keys: {
                    is_pseudo_positive_buff: boolean(),
                    buff_unit_modifier_id: data['buff_unit_modifiers'],
                    modifier_type: enumerate({
                        items: unit_modifier_types(),
                    }),
                    value_behavior: super.getValueBehavior,
                    value_id: data['action_values'],
                    ...result,
                    tags: array({
                        items: data['ship_tags'],
                        isUnique: true,
                    }),
                    tag: data['ship_tags'],
                    prerequisites,
                },
            }),
        })
    }
}

class WeaponModifiers extends Definitions {
    constructor() {
        super()
    }

    create({ hasArrayValues: hasArrayValues }, data) {
        let result

        if (hasArrayValues)
            result = {
                values: array({
                    items: float(false),
                }),
            }
        else
            result = {
                value: float(false),
            }

        return array({
            items: object({
                keys: {
                    weapon_type: super.getWeaponType,
                    modifier_type: enumerate({
                        items: weapon_modifier_types(),
                    }),
                    value_behavior: super.getValueBehavior,
                    buff_weapon_modifier_id: data['weapon_modifier_ids'],
                    value_id: data['action_values'],
                    ...result,
                    prerequisites: super.getResearchSubjects(data['research_subjects']),
                    tags: array({
                        items: data['weapon_tags'],
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class ExoticFactoryModifiers extends Definitions {
    constructor() {
        super()
    }

    create(exotics) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: unit_factory_modifier_types(),
                    }),
                    value_behavior: super.getValueBehavior,
                    value: float(false),
                    exotic_types: array({
                        items: exotics,
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class PlanetModifiers extends Definitions {
    constructor() {
        super()
    }

    createResearchSubject(planets) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: planet_modifier_types(),
                    }),
                    value_behavior: super.getValueBehavior,
                    value: float(false),
                    planet_types: array({
                        items: planets,
                        isUnique: true,
                    }),
                    dynamic_multiplier: enumerate({
                        items: ['inverse_used_supply_percentage'],
                    }),
                },
                required: ['modifier_type', 'value_behavior', 'value'],
            }),
        })
    }

    create(planet_modifier_ids) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: planet_modifier_types(),
                    }),
                    value_behavior: super.getValueBehavior,
                    buff_planet_modifier_id: planet_modifier_ids,
                    values: array({
                        items: float(false),
                    }),
                },
            }),
        })
    }
}

class PlanetTypeGroups extends Definitions {
    constructor() {
        super()
    }

    create(planets, research_subjects) {
        return array({
            items: object({
                keys: {
                    planet_types: array({
                        items: planets,
                        isUnique: true,
                    }),
                    build_prerequisites: research_subjects,
                },
            }),
        })
    }
}

class UnitFactoryModifiers extends Definitions {
    constructor() {
        super()
    }

    create({ hasArrayValues: hasArrayValues }, build_kinds) {
        let arrayResults

        if (hasArrayValues)
            arrayResults = {
                values: array({
                    items: float(false),
                }),
            }
        else
            arrayResults = {
                value: float(false),
            }

        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: unit_factory_modifier_types(),
                    }),
                    value_behavior: super.getValueBehavior,
                    ...arrayResults,
                    build_kinds: array({
                        items: build_kinds,
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class PlayerModifiers extends Definitions {
    constructor() {
        super()
    }

    create(research_subjects) {
        return object({
            keys: {
                npc_modifiers: super.create().modifiers.npc_modifiers.create(research_subjects),
                empire_modifiers: super.create().modifiers.empire_modifiers.create(),
                planet_modifiers: super.create().modifiers.planet_modifiers.create(),
            },
        })
    }
    createResearchSubject(research_subjects, planets) {
        return object({
            keys: {
                npc_modifiers: super.create().modifiers.npc_modifiers.create(research_subjects),
                empire_modifiers: super.create().modifiers.empire_modifiers.create(),
                planet_modifiers: super.create().modifiers.planet_modifiers.createResearchSubject(planets),
            },
        })
    }
}

class NpcModifiers extends Definitions {
    constructor() {
        super()
    }

    get getNpcModifierTypes() {
        return enumerate({
            items: ['sell_exotic_credits_received', 'auction_lost_refund_percentage', 'buy_metal_credits_cost', 'buy_crystal_credits_cost', 'send_raid_supply', 'auction_bid_any', 'sell_crystal_credits_received', 'sell_metal_credits_received', 'reputation_ability_cooldown_duration'],
        })
    }

    get getTags() {
        return array({
            items: enumerate({
                items: ['pirates'],
            }),
        })
    }

    create(research_subjects) {
        return array({
            items: object({
                keys: {
                    modifier_type: this.getNpcModifierTypes,
                    value_behavior: super.getValueBehavior,
                    value: float(false),
                    prerequisites: research_subjects,
                    tags: this.getTags,
                },
            }),
        })
    }
}

class EmpireModifiers extends Definitions {
    constructor() {
        super()
    }

    create() {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: empire_modifier_types(),
                    }),
                    value_behavior: super.getValueBehavior,
                    value: float(false),
                },
            }),
        })
    }
}

module.exports = Definitions
