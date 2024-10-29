const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { schema, enumerate, array, object, float, vector3f, boolean, string, integer, vector9f, angle } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Ability {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    weapon_positions_definition() {
        return array({
            items: object({
                required: ['position'],
                keys: {
                    position: vector3f(),
                    rotation: vector9f(),
                },
            }),
        })
    }

    validateActionType(ctx, ptr, json, json_builder) {
        try {
            const _ = [
                'bonus_damage_value',
                'ability',
                'is_empowered',
                'change_type',
                'cooldown_type',
                'reduction_value',
                'buff',
                'float_variable',
                'buff_constraint',
                'is_looping',
                'effect_definition',
                'asset_type',
                'exotics',
                'give_amount_id',
                'log_different_fixtures_as_unique_events',
                'player',
                'influence_points_given_value',
                'mana_given_value',
                'damage_prevented_value',
                'auto_add_to_fleet_unit',
                'buff_on_resurrected_units',
                'constrain_to_available_supply',
                'copy_parent_buff_memory_values',
                'dead_units_player',
                'gravity_well_origin_unit',
                'max_supply_value',
                'max_target_count_value',
                'override_ownership_unit',
                'resurrection_constraint',
                'resurrection_sort',
                'source_unit',
                'specific_unit_ids',
                'unit_types_to_resurrect',
                'position',
                'positions',
                'max_jump_distance_value',
                'position_operators',
                'notification_type',
                'planet',
                'attractor_unit',
                'max_linear_speed_value',
                'time_to_max_linear_speed_value',
                'target_unit',
                'repulsion_origin_unit',
                'starting_linear_speed_value',
                'terminal_linear_speed_value',
                'time_to_terminal_linear_speed_value',
                'new_unit_value',
                'math_operators',
                'travel_time',
                'constraint_not_satisified_operators',
                'operators',
                'operators_constraint',
                'destination_unit',
                'chain_delay',
                'chain_range_value',
                'chain_target_filter_id',
                'first_destination_unit',
                'first_source_unit',
                'max_target_count_value',
                'target_sort',
                'strikecraft_carrier_unit',
                'include_radius_origin_unit',
                'include_y_axis_in_radius_check',
                'radius_origin_unit',
                'radius_value',
                'arc_angle_value',
                'arc_direction',
                'arc_origin_unit',
                'arc_radius_value',
                'traveling_from_gravity_well_origin',
                'traveling_to_gravity_well_origin',
                'include_current_child_buff_unit',
            ]
            switch (ctx.action_type) {
                case 'change_buff_memory_float_value':
                    json.validate_keys(ptr, ctx, ['math_operators', 'float_variable'], _, [])
                    break
                case 'change_ability_remaining_cooldown':
                    json.validate_keys(ptr, ctx, ['ability', 'change_type', 'reduction_value'], _, ['cooldown_type'])
                    break
                case 'change_ability_is_empowered':
                    json.validate_keys(ptr, ctx, ['ability', 'is_empowered'], _, [])
                    break
                case 'change_ability_charges':
                    json.validate_keys(ptr, ctx, ['ability', 'math_operators'], _, [])
                    break
                case 'augment_damage':
                    json.validate_keys(ptr, ctx, [], _, ['bonus_damage_value'])
                    break
                case 'change_buff_memory_unit_value':
                    json.validate_keys(ptr, ctx, ['new_unit_value', 'unit_variable'], _)
                    break
                case 'make_buff_dead':
                    json.validate_keys(ptr, ctx, [], _, ['buff', 'buff_constraint'])
                    break
                case 'start_buff_effect':
                    json.validate_keys(ptr, ctx, ['effect_definition'], _, ['is_looping'])
                    break
                case 'give_assets':
                    json_builder['context'] = Definitions.player_asset_delta_source('default=action')
                    json.validate_keys(ptr, ctx, ['asset_type', 'give_amount_id'], _, [])
                    break
                case 'give_exotics':
                    json_builder['context'] = Definitions.exotic_context()
                    json.validate_keys(ptr, ctx, ['exotics'], _, ['player'])
                    break
                case 'give_influence_points':
                    json.validate_keys(ptr, ctx, ['influence_points_given_value'], _, ['player'])
                    break
                case 'give_mana':
                    json.validate_keys(ptr, ctx, ['mana_given_value'], _, ['player'])
                    break
                case 'prevent_damage':
                    json.validate_keys(ptr, ctx, ['damage_prevented_value'], _, [])
                    break
                case 'resurrect_units_in_gravity_well_of_unit':
                    json.validate_keys(ptr, ctx, ['dead_units_player', 'gravity_well_origin_unit', 'unit_types_to_resurrect'], _, [
                        'auto_add_to_fleet_unit',
                        'buff_on_resurrected_units',
                        'constrain_to_available_supply',
                        'copy_parent_buff_memory_values',
                        'initial_float_values',
                        'max_supply_value',
                        'max_target_count_value',
                        'override_ownership_unit',
                        'resurrection_constraint',
                        'resurrection_sort',
                        'source_unit',
                        'specific_unit_ids',
                    ])
                    break
                case 'add_notification':
                    json.validate_keys(ptr, ctx, ['notification_type'], _, ['planet'])
                    break
                case 'start_attract_to_unit':
                    json.validate_keys(ptr, ctx, ['attractor_unit', 'max_linear_speed_value', 'time_to_max_linear_speed_value'], _, [])
                    break
                case 'start_repel_from_unit':
                    json.validate_keys(
                        ptr,
                        ctx,
                        [
                            'repulsion_origin_unit',
                            'starting_linear_speed_value',
                            'terminal_linear_speed_value',
                            'time_to_terminal_linear_speed_value',
                        ],
                        _,
                        []
                    )
                    break
                case 'start_force_attack':
                    json.validate_keys(ptr, ctx, ['target_unit'], _, [])
                    break
                case 'use_position_operators_on_single_position':
                    json.validate_keys(ptr, ctx, ['position', 'position_operators'], _, ['travel_time'])
                    break
                case 'use_position_operators_on_vector_of_positions':
                    json.validate_keys(ptr, ctx, ['positions', 'position_operators'], _, ['travel_time'])
                    break
                case 'use_unit_operators_on_single_unit':
                    json.validate_keys(ptr, ctx, ['operators'], _, [
                        'constraint_not_satisified_operators',
                        'destination_unit',
                        'operators',
                        'operators_constraint',
                        'source_unit',
                        'travel_time',
                    ])
                    break
                case 'use_unit_operators_on_chained_units':
                    json.validate_keys(
                        ptr,
                        ctx,
                        ['chain_delay', 'chain_range_value', 'chain_target_filter_id', 'first_destination_unit', 'first_source_unit', 'operators'],
                        _,
                        ['constraint_not_satisified_operators', 'max_target_count_value', 'operators_constraint', 'target_sort', 'travel_time']
                    )
                    break
                case 'use_unit_operators_on_child_strikecraft_of_unit':
                    json.validate_keys(ptr, ctx, ['operators', 'strikecraft_carrier_unit'], _, [
                        'constraint_not_satisified_operators',
                        'operators_constraint',
                        'source_unit',
                    ])
                    break
                case 'use_unit_operators_on_units_in_gravity_well_of_unit':
                    json.validate_keys(ptr, ctx, ['gravity_well_origin_unit'], _, [
                        'max_target_count_value',
                        'operators',
                        'operators_constraint',
                        'source_unit',
                        'target_sort',
                    ])
                    break
                case 'use_unit_operators_on_phase_lanes':
                    json.validate_keys(ptr, ctx, ['gravity_well_origin_unit', 'max_jump_distance_value', 'operators'], _, [
                        'constraint_not_satisified_operators',
                        'operators_constraint',
                    ])
                    break
                case 'use_unit_operators_on_gravity_wells':
                    json.validate_keys(ptr, ctx, ['gravity_well_origin_unit', 'max_jump_distance_value', 'operators'], _, [
                        'constraint_not_satisified_operators',
                        'operators_constraint',
                    ])
                    break
                case 'use_unit_operators_on_units_in_radius_of_unit':
                    json.validate_keys(ptr, ctx, ['operators', 'radius_origin_unit', 'radius_value'], _, [
                        'constraint_not_satisified_operators',
                        'include_radius_origin_unit',
                        'include_y_axis_in_radius_check',
                        'max_target_count_value',
                        'operators_constraint',
                        'target_sort',
                        'travel_time',
                    ])
                    break
                case 'use_unit_operators_on_units_in_arc_of_unit':
                    json.validate_keys(ptr, ctx, ['arc_angle_value', 'arc_direction', 'arc_origin_unit', 'operators'], _, [
                        'arc_radius_value',
                        'constraint_not_satisified_operators',
                        'max_target_count_value',
                        'operators_constraint',
                        'target_sort',
                        'travel_time',
                    ])
                    break
                case 'use_unit_operators_on_units_in_phase_lanes':
                    json.validate_keys(ptr, ctx, ['gravity_well_origin_unit', 'operators'], _, [
                        'constraint_not_satisified_operators',
                        'operators_constraint',
                        'source_unit',
                        'traveling_from_gravity_well_origin',
                        'traveling_to_gravity_well_origin',
                    ])
                    break
                case 'use_unit_operators_on_closest_owned_planet':
                    json.validate_keys(ptr, ctx, ['operators', 'origin_unit'], _, [
                        'constraint_not_satisified_operators',
                        'operators',
                        'operators_constraint',
                        'origin_unit',
                    ])
                    break
                case 'use_unit_operators_on_units_owned_by_player':
                    json.validate_keys(ptr, ctx, ['operators', 'player'], _, ['constraint_not_satisified_operators', 'operators_constraint'])
                    break
                case 'use_unit_operators_on_units_with_child_buffs_of_parent_buff':
                    json.validate_keys(ptr, ctx, ['operators'], _, [
                        'constraint_not_satisified_operators',
                        'include_current_child_buff_unit',
                        'max_target_count_value',
                        'operators',
                        'operators_constraint',
                        'target_sort',
                        'travel_time',
                    ])
                    break
                case 'stop_buff_effect':
                case 'stop_attract_to_unit':
                case 'start_brake_to_stop':
                case 'stop_brake_to_stop':
                case 'stop_force_attack':
                case 'stop_repel_from_unit':
                case 'abort_make_dead':
                    break
            }
        } catch {}
        return json_builder
    }

    validateOperators(constraint, action_ptr, constraint_idx) {
        Definitions.validateConstraints(constraint, action_ptr + `/${constraint_idx}`, this.json)
        Definitions.validateActionUnitOperator(constraint, action_ptr + `/${constraint_idx}`, this.json)
        Definitions.validateActionPosition(constraint, action_ptr + `/${constraint_idx}`, this.json)
        Definitions.validateActionDirection(constraint, action_ptr + `/${constraint_idx}`, this.json)

        if (constraint?.math_operators) {
            constraint.math_operators.forEach((math_op, mat_idx) => {
                Definitions.action_math_operator(this.json, this.cache, math_op, action_ptr + `/${constraint_idx}/math_operators/${mat_idx}`)
            })
        }
    }

    // Buff

    action_group_definition(ctx, ptr) {
        const json_builder = {}
        try {
            if (Array.isArray(ctx)) {
                ctx.forEach((time_action, idx) => {
                    if (time_action?.action_group?.actions) {
                        time_action.action_group.actions.forEach((action, action_group_idx) => {
                            const action_ptr = ptr + `/${idx}/action_group/actions/${action_group_idx}`
                            this.validateAction(ctx, ptr, action, action_ptr, json_builder)
                        })
                    }
                })
            }
        } catch {}

        return object({
            keys: {
                constraint: Definitions.action_constraint(ctx?.time_actions, ptr + '/time_actions', this.cache, this.json),
                actions: array({
                    items: Definitions.action(ctx, ptr, this.cache, this.json, json_builder),
                }),
            },
        })
    }

    validateAction(ctx, ptr, action, action_ptr, json_builder, validate_action_type = true) {
        Definitions.validateConstraints(action, action_ptr, this.json)
        Definitions.validateActionConstraintType(action, action_ptr, this.json)
        Definitions.validateTravelTime(action, action_ptr, this.json)
        Definitions.validateExoticsAction(action, action_ptr, this.json)
        Definitions.validateActionDirection(action, action_ptr, this.json)
        Definitions.validateActionPosition(action, action_ptr, this.json)
        if (validate_action_type) {
            this.validateActionType(action, action_ptr, this.json, json_builder)
        }

        if (action?.position) {
            Definitions.validateActionPosition(action?.position, action_ptr + `/position`, this.json)
            Definitions.validateActionDirection(action?.position, action_ptr + `/position`, this.json)
        }

        if (action?.positions && Array.isArray(action?.positions)) {
            action?.positions.forEach((pos, pos_idx) => {
                Definitions.validateActionPosition(pos, action_ptr + `/positions/${pos_idx}`, this.json)
                Definitions.validateActionDirection(pos, action_ptr + `/positions/${pos_idx}`, this.json)
            })
        }

        if (Array.isArray(action?.constraint_not_satisified_operators)) {
            action.constraint_not_satisified_operators.forEach((constraint, constraint_idx) => {
                this.validateOperators(constraint, action_ptr + '/constraint_not_satisified_operators', constraint_idx)
            })
        }
        if (Array.isArray(action?.operators)) {
            action.operators.forEach((constraint, constraint_idx) => {
                this.validateOperators(constraint, action_ptr + '/operators', constraint_idx)
            })
        }

        if (Array.isArray(action?.position_operators)) {
            action?.position_operators.forEach((position_op, pos_op_idx) => {
                Definitions.validateActionPosition(position_op, action_ptr + `/position_operators/${pos_op_idx}`, this.json)
                Definitions.validateActionDirection(position_op, action_ptr + `/position_operators/${pos_op_idx}`, this.json)
                Definitions.validatePositionOperator(position_op, action_ptr + `/position_operators/${pos_op_idx}`, this.json)
                if (position_op?.torpedo_target_position) {
                    Definitions.validateActionPosition(
                        position_op.torpedo_target_position,
                        action_ptr + `/position_operators/${pos_op_idx}/torpedo_target_position`,
                        this.json
                    )
                }
            })
        }
    }

    // Ability
    actions_definition(ctx, ptr) {
        const json_builder = {}
        try {
            const json_builder = {}
            if (Array.isArray(ctx?.actions)) {
                ctx.actions.forEach((action, idx) => {
                    const action_ptr = ptr + `/actions/${idx}`
                    this.validateAction(ctx, ptr, action, action_ptr, json_builder)
                })
            }
        } catch {}

        return object({
            keys: {
                constraint: Definitions.action_constraint(ctx?.constraint, ptr + '/constraint', this.cache, this.json, 0, 2),
                actions: array({
                    items: Definitions.action(ctx, ptr, this.cache, this.json, json_builder),
                }),
            },
        })
    }

    ability_auto_cast_target_definition(ctx, ptr) {
        return array({
            items: object({
                required: ['target_filter'],
                keys: {
                    target_constraint: Definitions.action_constraint(ctx, ptr, this.cache, this.json, 0, 2),
                    target_filter: this.cache.target_filters,
                },
            }),
        })
    }

    auto_cast_definition(ctx, ptr) {
        return object({
            keys: {
                caster_constraint: Definitions.action_constraint(ctx?.caster_constraint, ptr + '/caster_constraint', this.cache, this.json, 0, 2),
                disabled_if_any_enemy_primary_ship_role_in_gravity_well_exists: enumerate({
                    items: ['explore', 'colonize', 'attack_ship', 'anti_structure', 'bomb_planet', 'raid'],
                }),
                enabled_by_default_behavior: enumerate({
                    items: ['never', 'always', 'if_no_deliverable_destination'],
                }),
                gravity_well_distance_range: this.cache.action_values(),
                jump_count_range: string('???'),
                planet_preference: string('???'),
                target_definitions: this.ability_auto_cast_target_definition(ctx?.target_definitions, ptr + '/target_definitions'),
                type: enumerate({
                    items: [
                        'pick_target_within_current_gravity_well',
                        'pick_planet_within_jump_count',
                        'pick_planet_within_gravity_well_distance',
                        'pick_planet_anywhere',
                    ],
                }),
            },
        })
    }

    active_actions_definition(ctx, ptr) {
        return object({
            keys: {
                actions: this.actions_definition(ctx?.actions, ptr + '/actions'),
                antimatter_cost: this.cache.action_values(),
                auto_cast: this.auto_cast_definition(ctx?.auto_cast, ptr + '/auto_cast'),
                between_gravity_well_range: this.cache.action_values(),
                channeling_will_disable_weapons: boolean(),
                cooldown_reset_type: enumerate({
                    items: ['on_start_use_ability', 'on_spawned_buff_made_dead'],
                }),
                cooldown_time: this.cache.action_values(),
                credits_cost: this.cache.action_values(),
                crystal_cost: this.cache.action_values(),
                execute_time: float(),
                firing_angle: angle(),
                hull_cost: this.cache.action_values(),
                jump_count_range: this.cache.action_values(),
                max_charge_count: this.cache.action_values(),
                metal_cost: this.cache.action_values(),
                move_alignment: object({
                    required: ['angle', 'type'],
                    keys: {
                        allow_opposite_angle: boolean(),
                        angle: angle(),
                        post_alignment_roll_angle: float(),
                        type: Definitions.alignment_type(),
                    },
                }),
                planet_health_cost: this.cache.action_values(),
                range: this.cache.action_values(),
                required_available_supply: this.cache.action_values(),
                shields_cost: this.cache.action_values(),
                spawned_unit: object({
                    required: ['unit'],
                    keys: {
                        gravity_well_primary_planet_target_filter: this.cache.target_filters,
                        max_count_in_empire: this.cache.action_values(),
                        max_count_in_gravity_well: this.cache.action_values(),
                        special_operation_unit_kind: this.cache.special_operation_kinds,
                        unit: this.cache.units,
                    },
                }),
                stop_time: float(),
                stop_use_type: enumerate({
                    items: ['on_stop_time_elapsed', 'on_spawned_buff_removed'],
                }),
                target_alert: Definitions.target_alert(),
                target_filters: array({
                    items: this.cache.target_filters,
                    isUnique: true,
                }),
                targeting_type: enumerate({
                    items: ['untargeted', 'unit_targeted', 'position_targeted', 'line_targeted'],
                }),
                targeting_ui: enumerate({
                    items: ['none', 'pick_gravity_well'],
                }),
                targeting_use_single_unit: boolean(),
                unity_mana_cost: this.cache.action_values(),
                watched_buff: this.cache.buffs,
            },
        })
    }

    ability_gui_targeting_values() {
        return object({
            keys: {
                arc_half_angle: this.cache.action_values(),
                line_half_width: this.cache.action_values(),
                radius: this.cache.action_values(),
                range: this.cache.action_values(),
            },
        })
    }

    ability_gui_targeting_definition(ctx, ptr) {
        return object({
            required: ['targeting_type'],
            keys: {
                constraint: Definitions.action_constraint(ctx, ptr, this.cache, this.json, 0, 2),
                constraint_passed_values: this.ability_gui_targeting_values(),
                targeting_type: Definitions.targeting_type(),
                values: this.ability_gui_targeting_values(),
            },
        })
    }

    gui_definition(ctx, ptr) {
        return object({
            keys: {
                action: enumerate({
                    items: ['explore', 'set_rally_point', 'toggle_unit_factory_window', 'toggle_structures_window'],
                }),
                name: this.cache.localisation,
                description: this.cache.localisation,
                hud_icon: this.cache.textures(),
                tooltip_icon: this.cache.textures(),
                targeting: this.ability_gui_targeting_definition(ctx?.targeting, ptr + '/targeting'),
                tooltip_line_groups: Definitions.tooltip_line_groups(ctx?.tooltip_line_groups, ptr + '/tooltip_line_groups', this.json, this.cache),
                tooltip_picture: this.cache.textures(),
                unity_window_picture: this.cache.textures(),
            },
        })
    }

    create() {
        try {
            const _ = ['min_required_unit_levels', 'level_prerequisites', 'min_required_npc_reputation_levels', 'total_required_unity_points']
            switch (this.json?.data.level_source) {
                case 'internal_level':
                    this.json.validate_keys('', this.json?.data, ['min_required_unit_levels'], _)
                    break
                case 'research_prerequisites_per_level':
                    this.json.validate_keys('', this.json?.data, ['level_prerequisites'], _)
                    break
                case 'npc_reputation_level':
                    this.json.validate_keys('', this.json?.data, ['min_required_npc_reputation_levels'], _)
                    break
                case 'unity_ability_level':
                    this.json.validate_keys('', this.json?.data, ['total_required_unity_points'], _)
                    break
            }
        } catch {}
        return schema({
            keys: {
                ability_positions: this.weapon_positions_definition(),
                action_data_source: this.cache.action_data_sources,
                active_actions: this.active_actions_definition(this.json?.data?.active_actions, '/active_actions'),
                gui: this.gui_definition(this.json?.data?.gui, '/gui'),
                is_ultimate_ability: boolean(),
                make_dead_on_all_finite_time_actions_done: boolean(),
                passive_actions: object({
                    keys: {
                        only_if_owner_unit_operational: boolean(),
                        passive_cooldown_time: this.cache.action_values(),
                        persistant_buff: this.cache.buffs,
                    },
                }),
                required_structure_in_gravity_well: this.cache.units,
                unit_constraint_params: object({
                    required: ['unit_level_for_has_unit_level_constraint_value'],
                    keys: {
                        unit_level_for_has_unit_level_constraint_value: this.cache.action_values(),
                    },
                }),
                level_source: enumerate({
                    items: [
                        'fixed_level_0',
                        'internal_level',
                        'research_prerequisites_per_level',
                        'npc_reward_level',
                        'npc_reputation_level',
                        'unit_item',
                        'unity_ability_level',
                    ],
                }),
                min_required_unit_levels: array({ items: integer() }),
                level_prerequisites: array({ items: Definitions.research_prerequisites(this.cache.research_subjects) }),
                min_required_npc_reputation_levels: array({ items: integer() }),
                total_required_unity_points: array({ items: integer() }),
            },
        })
    }
}
