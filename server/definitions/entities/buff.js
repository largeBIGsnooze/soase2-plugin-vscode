const { percentage, integer, string, float, schema, boolean, enumerate, array, object, version } = require('../data_types')
const Definitions = require('../definitions')
const { UnitModifiers, PlanetModifiers, WeaponModifiers } = require('../modifier_definitions')
const UI = require('../ui_definitions')

module.exports = class Buff {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    constraints() {
        return array({
            items: object({
                keys: {
                    slot_type: enumerate({
                        items: ['military'],
                    }),
                    weapon_type: Definitions.getWeaponType(),
                    tag: this.cache.weapon_tags,
                    value_a: this.cache.action_values,
                    value_b: this.cache.action_values,
                    comparison_type: Definitions.getComparisonType(),
                    constraint_type: Definitions.getConstraintType(),
                    ship_roles: Definitions.getShipRoles(),
                    unit_definition: this.cache.units,
                    permission_type: enumerate({
                        items: ['can_hyperspace'],
                    }),
                    buff: this.cache.buffs,
                    unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    unit_constraint: object({
                        keys: {
                            constraint_type: Definitions.getConstraintType(),
                            percentage_missing_threshold: float(),
                            amount_missing_threshold: float(),
                            mutation: this.cache.mutations,
                        },
                    }),
                    constraints: array({
                        items: object({
                            keys: {
                                constraint_type: Definitions.getConstraintType(),
                                amount_missing_threshold: float(),
                                percentage_missing_threshold: percentage(),
                            },
                        }),
                    }),
                    constraint: object({
                        keys: {
                            constraint_type: Definitions.getConstraintType(),
                            buff: this.cache.buffs,
                            unit: Definitions.getUnit(),
                            unit_constraint: object({
                                keys: {
                                    constraint_type: Definitions.getConstraintType(),
                                    percentage_missing_threshold: float(),
                                    amount_missing_threshold: float(),
                                    buff: this.cache.buffs,
                                    mutation: this.cache.mutations,
                                },
                            }),
                            mutation: this.cache.mutations,
                        },
                    }),
                    amount_missing_threshold: float(),
                    percentage_missing_threshold: percentage(),
                    must_be_functional: boolean(),
                },
            }),
        })
    }

    unit_constraint() {
        return object({
            keys: {
                constraint_type: Definitions.getConstraintType(),
                percentage_missing_threshold: float(),
                amount_missing_threshold: float(),
                weapon_type: Definitions.getWeaponType(),
                mutation: this.cache.mutations,
                constraints: this.constraints(),
            },
        })
    }

    math_operators() {
        return array({
            items: object({
                keys: {
                    operator_type: enumerate({
                        items: ['assign', 'subtract', 'multiply', 'add', 'max', 'min', 'clamped_lerp'],
                    }),
                    operand_value: this.cache.action_values,
                    lerp_value_lower_bound_value: this.cache.action_values,
                    lerp_range_lower_bound_value: this.cache.action_values,
                    lerp_range_upper_bound_value: this.cache.action_values,
                    lerp_value_upper_bound_value: this.cache.action_values,
                    lerp_t_value: this.cache.action_values,
                },
            }),
        })
    }

    buff_constraints() {
        return array({
            items: object({
                keys: {
                    target_filter_id: this.cache.target_filters,
                    weapon: enumerate({
                        items: ['trigger_event_weapon'],
                    }),
                    any_weapon_tags: array({
                        items: this.cache.weapon_tags,
                        isUnique: true,
                    }),
                    constraint: object({
                        keys: {
                            constraint_type: Definitions.getConstraintType(),
                            unit_a: object({
                                keys: {
                                    unit_type: Definitions.getUnitType(),
                                    memory_unit_variable_id: this.cache.unit_variables,
                                },
                            }),
                            unit_b: object({
                                keys: {
                                    unit_type: Definitions.getUnitType(),
                                },
                            }),
                        },
                    }),
                    constraint_type: Definitions.getConstraintType(),
                    value_a: this.cache.action_values,
                    value_b: this.cache.action_values,
                    weapon_tag: this.cache.weapon_tags,
                    damage_source: Definitions.getDamageSource(),
                    chance_value: this.cache.action_values,
                    comparison_type: Definitions.getComparisonType(),
                    unit: Definitions.getUnit(),
                    unit_constraint: this.unit_constraint(),
                    unit_a: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                            redirection: Definitions.getRedirection(),
                        },
                    }),
                    unit_b: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                },
            }),
        })
    }

    constraint() {
        return object({
            keys: {
                destination_unit: Definitions.getDestinationUnit(),
                damage_source: Definitions.getDamageSource(),
                constraint_type: Definitions.getConstraintType(),
                value_a: this.cache.action_values,
                value_b: this.cache.action_values,
                comparison_type: Definitions.getComparisonType(),
                bonus_damage_value: this.cache.action_values,
                weapon_tag: this.cache.weapon_tags,
                float_variable: this.cache.float_variables,
                math_operators: this.math_operators(),
                constraints: this.buff_constraints(),
                unit_constraint: this.unit_constraint(),
                target_filter_id: this.cache.target_filters,
                compare_value: this.cache.action_values,
                constraint: object({
                    keys: {
                        constraint_type: Definitions.getConstraintType(),
                        target_filter_id: this.cache.target_filters,
                        unit: Definitions.getUnit(),
                        unit_constraint: this.unit_constraint(),
                        unit_a: Definitions.getUnit(),
                        unit_b: Definitions.getUnit(),
                    },
                }),
                unit: Definitions.getUnit(),
                unit_a: object({
                    keys: {
                        unit_type: Definitions.getUnitType(),
                    },
                }),
                unit_b: object({
                    keys: {
                        unit_type: Definitions.getUnitType(),
                    },
                }),
            },
        })
    }

    ability() {
        return object({
            keys: {
                ability_type: Definitions.getAbilityType(),
                unit_with_abilities: object({
                    keys: {
                        unit_type: Definitions.getUnitType(),
                    },
                }),
                unit: Definitions.getUnit(),
            },
        })
    }

    actions() {
        return array({
            items: object({
                keys: {
                    radius_origin_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    include_radius_origin_unit: boolean(),
                    is_empowered: boolean(),
                    radius_value: this.cache.action_values,
                    gravity_well_origin_unit: Definitions.getGravityWellOriginUnit(),
                    constraint: this.constraint(),
                    attractor_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    max_linear_speed_value: this.cache.action_values,
                    time_to_max_linear_speed_value: this.cache.action_values,
                    strikecraft_carrier_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    arc_origin_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    arc_direction: object({
                        keys: {
                            direction_type: Definitions.getDirectionType(),
                            unit: Definitions.getUnit(),
                        },
                    }),
                    arc_radius_value: this.cache.action_values,
                    arc_angle_value: this.cache.action_values,
                    max_target_count_value: enumerate({
                        items: ['fixed_one'],
                    }),
                    target_sort: Definitions.getTargetSort(),
                    bonus_damage_value: this.cache.action_values,
                    operators_constraint: this.constraint(),
                    buff_constraint: object({
                        keys: {
                            constraint_type: Definitions.getConstraintType(),
                            buff: enumerate({
                                items: ['operand_buff'],
                            }),
                            mutation: this.cache.mutations,
                        },
                    }),
                    ability: this.ability(),
                    max_jump_distance_value: this.cache.action_values,
                    destination_unit: Definitions.getDestinationUnit(),
                    action_type: Definitions.getActionType(),
                    buff: enumerate({
                        items: ['all_child_buffs', 'all_buffs_on_current_spawner'],
                    }),
                    position: Definitions.getPosition(),
                    asset_type: Definitions.getResources(),
                    give_amount_id: this.cache.action_values,
                    travel_time: object({
                        keys: {
                            travel_time_source: enumerate({
                                items: ['speed_and_distance', 'explicit_time'],
                            }),
                            travel_speed_value: this.cache.action_values,
                        },
                    }),
                    damage_prevented_value: this.cache.action_values,
                    action_id: this.cache.buff_actions,
                    float_variable: this.cache.float_variables,
                    math_operators: this.math_operators(),
                    player: object({
                        keys: {
                            player_type: Definitions.getPlayerType(),
                        },
                    }),
                    exotics: this.exotics(),
                    position_operators: this.position_operators(),
                    npc_rewards: this.npc_rewards(),
                    operators: this.operators(),
                    buff_on_created_unit: this.cache.units,
                    effect_definition: this.effect_definition(),
                    hyperspace_destination_position: Definitions.getHyperspaceDestinationPosition(),
                    is_looping: boolean(),
                },
            }),
        })
    }

    operators() {
        return array({
            items: object({
                keys: {
                    special_operation_unit_kind: this.cache.special_operation_kinds,
                    float_variable: this.cache.float_variables,
                    destination_target_filter_id: this.cache.target_filters,
                    arrival_delay_value: this.cache.action_values,
                    available_supply_value: this.cache.action_values,
                    build_strikecraft_count: this.cache.action_values,
                    unit_item: this.cache.unit_items,
                    effect_alias_binding: Definitions.getBinding(),
                    damage_value: this.cache.action_values,
                    operator_type: Definitions.getOperatorType(),
                    new_owner_player: object({
                        keys: {
                            player_type: enumerate({
                                items: ['unit_owner'],
                            }),
                            owned_unit: Definitions.getUnit(),
                        },
                    }),
                    destination_position: object({
                        keys: {
                            position_type: Definitions.getPositionType(),
                        },
                    }),
                    source_gravity_well: Definitions.getUnit(),
                    destination_gravity_well: Definitions.getUnit(),
                    clone_spawn_position: object({
                        keys: {
                            position_type: Definitions.getPositionType(),
                            distance_value: this.cache.action_values,
                            direction: Definitions.getDirection(),
                            source_position: Definitions.getSourcePosition(),
                        },
                    }),
                    clone_forward: object({
                        keys: {
                            direction_type: Definitions.getDirectionType(),
                            unit: Definitions.getUnit(),
                        },
                    }),
                    clone_count: this.cache.action_values,
                    buff_on_clone: this.cache.buffs,
                    skip_player_statistics: boolean(),
                    skip_awarding_experience: boolean(),
                    constrain_available_supply_to_owner_player: boolean(),
                    check_research_prerequisites: boolean(),
                    in_hyperspace: boolean(),
                    use_source_weapon_properties: boolean(),
                    math_operators: this.math_operators(),
                    effect_definition: this.effect_definition(),
                    destination_unit: Definitions.getDestinationUnit(),
                    source_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    units: object({
                        keys: {
                            random_units: Definitions.units(this.cache.units),
                            required_units: Definitions.getRequiredUnits(this.cache),
                        },
                    }),
                    owner_player: object({
                        keys: {
                            player_type: Definitions.getPlayerType(),
                            owned_unit: object({
                                keys: {
                                    unit_type: Definitions.getUnitType(),
                                },
                            }),
                        },
                    }),
                    rewards_destination_player: object({
                        keys: {
                            player_type: Definitions.getPlayerType(),
                        },
                    }),
                    asset_type: Definitions.getResources(),
                    asset_value: this.cache.action_values,
                    damage_source: Definitions.getDamageSource(),
                    bombing_damage_value: this.cache.action_values,
                    antimatter_restore_value: this.cache.action_values,
                    damage_affect_type: Definitions.damage_affect_type(),
                    antimatter_remove_value: this.cache.action_values,
                    mesh_point: string(),
                    weapon_tags: array({
                        items: this.cache.weapon_tags,
                        isUnique: true,
                    }),
                    unit_variable: this.cache.unit_variables,
                    new_unit_value: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    duration_value: this.cache.action_values,
                    to_player: object({
                        keys: {
                            player_type: Definitions.getPlayerType(),
                        },
                    }),
                    points_value: this.cache.action_values,
                    effects: Definitions.getEffects(this.cache.particle_effects),
                    charge_duration: enumerate({
                        items: ['beam_charge_value', 'disintegration_beam_charge_value'],
                    }),
                    beam_duration: this.cache.action_values,
                    planet_track_type: Definitions.getPlanetTrackType(),
                    level_count_value: this.cache.action_values,
                    will_offset_development_track_upgrade_price: boolean(),
                    ignore_infinite_recursion_guard: boolean(),
                    penetration_value: this.cache.action_values,
                    bypass_shields_chance_value: Definitions.getBypassShieldsChanceValue(),
                    target_filter_id: this.cache.target_filters,
                    buff: this.cache.buffs,
                    affect_type: Definitions.getAffectType(),
                    repair_value: this.cache.action_values,
                    constraint: this.constraint(),
                    collision_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    initial_float_values: array({
                        items: object({
                            keys: {
                                float_variable_id: this.cache.float_variables,
                                value_id: this.cache.action_values,
                            },
                        }),
                    }),
                },
            }),
        })
    }

    position_operators() {
        return array({
            items: object({
                keys: {
                    operator_type: Definitions.getOperatorType(),
                    effect_definition: this.effect_definition(),
                    unit_to_create: this.cache.units,
                    special_operation_unit_kind: this.cache.special_operation_kinds,
                    unit_forward: Definitions.getUnitForward(),
                    is_self_building: boolean(),
                    buff_on_created_unit: this.cache.buffs,
                    torpedo_source_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    torpedo_target_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    buff_on_agent: this.cache.buffs,
                    effect_destination_unit: object({
                        keys: {
                            unit_type: Definitions.getUnitType(),
                        },
                    }),
                    effect_forward: Definitions.getEffectForward(),
                    effect_up: object({
                        keys: {
                            direction_type: Definitions.getDirectionType(),
                            unit: Definitions.getUnit(),
                        },
                    }),
                    hyperspace_destination_position: object({
                        keys: {
                            position_type: Definitions.getPositionType(),
                            distance_value: enumerate({
                                items: ['planet_surface_radius', 'replicate_forces_spawn_range_value'],
                            }),
                            direction: Definitions.getDirection(),
                            source_position: object({
                                keys: {
                                    position_type: Definitions.getPositionType(),
                                    unit: Definitions.getUnit(),
                                },
                            }),
                        },
                    }),
                    is_change_gravity_well_to_hyperspace_destination_enabled: boolean(),
                },
            }),
        })
    }

    npc_rewards() {
        return array({
            items: object({
                keys: {
                    weight: float(),
                    npc_reward: this.cache.npc_rewards,
                },
            }),
        })
    }

    effect_definition() {
        return object({
            keys: {
                binding: Definitions.getBinding(),
                effect_by_size: object({
                    keys: {
                        small_unit: this.cache.effect_alias_bindings,
                        medium_unit: this.cache.effect_alias_bindings,
                        large_unit: this.cache.effect_alias_bindings,
                    },
                }),
                effect: this.cache.effect_alias_bindings,
                mesh_point: string(),
                mesh_point_usage: enumerate({
                    items: ['index', 'all'],
                }),
                mesh_point_index: integer(),
                only_visible_if_mesh_is_visible: boolean(),
            },
        })
    }

    exotics() {
        return object({
            keys: {
                exotics_source_type: enumerate({
                    items: ['unit_build_cost', 'explicit_amount'],
                }),
                source_unit: object({
                    keys: {
                        unit_type: Definitions.getUnitType(),
                    },
                }),
                exotic_amounts: array({
                    items: object({
                        keys: {
                            exotic_type: this.cache.exotics,
                            count_value: enumerate({
                                items: ['fixed_one'],
                            }),
                        },
                    }),
                }),
            },
        })
    }

    time_actions() {
        return array({
            items: object({
                keys: {
                    executions_per_interval_value: this.cache.action_values,
                    first_action_delay_time_value: this.cache.action_values,
                    execution_interval_value: this.cache.action_values,
                    execution_interval_count_value: this.cache.action_values,
                    action_group: object({
                        keys: {
                            constraint: this.constraint(),
                            actions: this.actions(),
                        },
                    }),
                },
            }),
        })
    }

    trigger_event_actions() {
        return array({
            items: object({
                keys: {
                    trigger_event_type: Definitions.getTriggerEventType,
                    action_group: object({
                        keys: {
                            constraint: this.constraint(),
                            actions: this.actions(),
                        },
                    }),
                },
            }),
        })
    }

    create() {
        return schema({
            keys: {
                version: version(),
                make_dead_on_all_finite_time_actions_done: boolean(),
                make_dead_on_parent_buff_made_dead: boolean(),
                make_current_spawner_dead_on_buff_made_dead: boolean(),
                make_dead_when_no_child_buffs_exist: boolean(),
                make_dead_when_no_child_buffs_exist_delay_time: this.cache.action_values,
                provides_detection: boolean(),
                empire_modifiers: array({
                    items: object({
                        keys: {
                            buff_empire_modifier_id: this.cache.buff_empire_ids,
                        },
                        required: ['buff_empire_modifier_id'],
                    }),
                }),
                make_dead_on_distance_to_parent_buff_exceeded: object({
                    keys: {
                        distance: this.cache.action_values,
                    },
                }),
                make_dead_on_source_ability_released: boolean(),
                stacking_limit_met_behavior: enumerate({
                    items: ['preserve_existing_buff', 'restart_existing_buff', 'replace_existing_buff'],
                }),
                suppress_scuttle_ui_notifications: boolean(),
                make_dead_on_current_spawner_made_dead: boolean(),
                active_duration: this.cache.action_values,
                stacking_limit: enumerate({
                    items: ['fixed_one', 'disrupt_armor_stacking_limit_value'],
                }),
                stacking_ownership_type: enumerate({
                    items: ['for_all_players', 'per_player'],
                }),
                unit_factory_modifiers: array({
                    items: object({
                        keys: {
                            buff_unit_factory_modifier_id: this.cache.buff_unit_factory_modifiers,
                        },
                    }),
                }),
                time_actions: this.time_actions(),
                trigger_event_actions: this.trigger_event_actions(),
                unit_modifiers: UnitModifiers.createBuff(this.cache),
                planet_modifiers: PlanetModifiers.create(this.cache.planet_modifier_ids),
                weapon_modifiers: WeaponModifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache
                ),
                unit_mutations: array({
                    items: this.cache.mutations,
                    isUnique: true,
                }),
                are_mutations_finite: boolean(),
                gui: object({
                    keys: {
                        hud_icon: this.cache.textures,
                        name: this.cache.localisation,
                        description: this.cache.localisation,
                        alert_type: enumerate({
                            items: ['positive_buff'],
                        }),
                        is_positive_buff: boolean(),
                        is_visible_within_unit_tooltip: boolean(),
                        is_negative_buff: boolean(),
                        is_expire_time_suppressed: boolean(),
                        tooltip_line_groups: UI.tooltip_line_groups(this.cache),
                        apply_damage: object({
                            keys: {
                                damage_value: this.cache.action_values,
                                penetration_value: this.cache.action_values,
                                bypass_shields_chance_value: this.cache.action_values,
                            },
                        }),
                    },
                }),
            },
        })
    }
}
