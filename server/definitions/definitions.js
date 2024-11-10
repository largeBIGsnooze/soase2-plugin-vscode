const loc_keys = require('../loc_keys')
const _ = require('./data_types')

module.exports = class Definitions {
    static research_prerequisites(subjects) {
        return _.array({
            items: Definitions.prerequisites(subjects),
        })
    }
    static prerequisites(subjects) {
        return _.array({
            items: subjects,
            isUnique: true,
        })
    }

    static action_weapon() {
        return _.enumerate({
            items: ['source_weapon', 'trigger_event_weapon'],
        })
    }

    static redirection() {
        return _.enumerate({
            items: ['none', 'current_gravity_well', 'current_gravity_well_primary_fixture', 'current_phase_lane'],
        })
    }

    static music_pool_type() {
        return _.enumerate({
            items: [
                'front_end',
                'loading',
                'ambient',
                'early_game_neutral',
                'early_game_winning',
                'early_game_losing',
                'mid_game_neutral',
                'mid_game_winning',
                'mid_game_losing',
                'late_game_neutral',
                'late_game_winning',
                'late_game_losing',
                'battle_neutral',
                'battle_winning',
                'battle_losing',
                'game_lost',
                'game_won',
            ],
        })
    }

    static relationship_type(desc = '') {
        return _.enumerate({
            desc: desc,
            items: ['self', 'ally', 'enemy', 'none'],
        })
    }

    static comparison_type() {
        return _.enumerate({
            items: ['less_than', 'less_than_equal_to', 'equal_to', 'equal_to_less_one', 'greater_than_equal_to', 'greater_than'],
        })
    }

    static math_operator_type() {
        return _.enumerate({
            items: ['assign', 'negate', 'add', 'subtract', 'multiply', 'divide', 'mod', 'max', 'min', 'roof', 'floor', 'clamped_lerp'],
        })
    }

    static value_source() {
        return _.enumerate({
            items: ['constraint_params', 'internal'],
        })
    }

    static required_units(data) {
        return _.array({
            items: _.object({
                required: ['unit'],
                keys: {
                    unit: data['units'],
                    options: _.object({
                        keys: {
                            forced_leveled_up_ability: data['abilities'],
                            forced_strikecraft_index: _.integer(),
                            is_temporary_ruler_ship: _.boolean(),
                            level: _.integer(),
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

    static exotic_price(cache) {
        return _.array({
            items: _.object({
                keys: {
                    exotic_type: cache['exotics'],
                    count: _.integer(),
                },
                required: ['count', 'exotic_type'],
            }),
        })
    }

    static random_units(data) {
        return _.array({
            items: _.object({
                required: ['unit', 'weight'],
                keys: {
                    options: _.object({
                        keys: {
                            forced_leveled_up_ability: data['abilities'],
                            forced_strikecraft_index: _.integer(),
                            is_temporary_ruler_ship: _.boolean(),
                            items: _.array({ items: data['ship_components'], isUnique: true }),
                            level: _.integer(),
                        },
                    }),
                    unit: data['units'],
                    weight: _.float(),
                },
            }),
        })
    }

    static targeting_type() {
        return _.enumerate({
            items: ['range', 'range_and_radius', 'between_gravity_well_range', 'radius', 'line', 'arc'],
        })
    }

    static action_effect_size() {
        return _.enumerate({
            items: ['medium_unit', 'large_unit', 'small_unit'],
        })
    }
    static muzzle_picking_behavior(desc = '') {
        return _.enumerate({
            desc: desc,
            items: ['sequential', 'random', 'all'],
        })
    }

    static spawn_units_definition(cache) {
        return _.object({
            keys: {
                formation_type: this.formation_type(),
                random_units: this.random_units(cache),
                required_units: this.required_units(cache),
            },
        })
    }
    static weapon_effects_definition(data) {
        return _.object({
            keys: {
                hit_shield_effect: data['particle_effects'],
                muzzle_effect: data['particle_effects'],
                hit_hull_effect: data['particle_effects'],
                charge_effect: data['particle_effects'],
                beam_effect: data['particle_effects'],
                muzzle_picking_behavior: this.muzzle_picking_behavior('default=all'),
                burst_pattern: _.array({ items: _.float() }),
                hit_shield_impact_radius_t: _.float('default=0.5'),
                max_planet_equator_variance: _.float('default=10'),
                projectile_travel_effect: data['particle_effects'],
                projectile_travel_easing_function: this.easing_functions('default=linear'),
            },
        })
    }

    static action_value_ratio() {
        return _.object({
            keys: {
                ratio_type: _.enumerate({ items: ['per_spell_power'] }),
                ratio_values: _.array({ items: _.float(false) }),
            },
        })
    }

    static action_effect_mesh_point_usage(desc = '') {
        return _.enumerate({
            desc: desc,
            items: ['first', 'index', 'all'],
        })
    }

    static transform_type() {
        return _.enumerate({
            items: [
                'fixed',
                'simulation_time',
                'action_level',
                'current_buff_memory_value',
                'operand_buff_memory_value',
                'pending_child_buff_count',
                'active_child_buff_count',
                'pending_and_active_child_buff_count',
                'per_raw_damage_dealt',
                'per_total_resolved_damage_dealt',
                'per_resolved_shield_damage_dealt',
                'per_resolved_armor_damage_dealt',
                'per_resolved_hull_damage_dealt',
                'per_resolved_planet_health_damage_dealt',
                'per_damage_event_penetration',
                'per_trigger_event_antimatter',
                'per_current_antimatter',
                'per_max_antimatter',
                'per_planet_level',
                'per_planet_future_level',
                'per_planet_current_health_points',
                'per_planet_max_health_points',
                'per_planet_current_shield_points',
                'per_planet_max_shield_points',
                'per_planet_max_civilian_slots',
                'per_planet_max_military_slots',
                'per_planet_commerce_track_credit_income',
                'per_planet_mining_track_metal_income',
                'per_planet_mining_track_crystal_income',
                'per_current_hull_points',
                'per_missing_hull_points',
                'per_max_hull_points',
                'per_percent_missing_hull_points',
                'per_current_crippled_hull_points',
                'per_missing_crippled_hull_points',
                'per_max_crippled_hull_points',
                'per_percent_missing_crippled_hull_points',
                'per_current_armor_points',
                'per_missing_armor_points',
                'per_max_armor_points',
                'per_percent_missing_armor_points',
                'per_current_shield_points',
                'per_missing_shield_points',
                'per_max_shield_points',
                'source_ability_range',
                'surface_radius',
                'per_credit_price',
                'per_metal_price',
                'per_crystal_price',
                'per_allied_player_in_gravity_well',
                'per_enemy_unit_in_gravity_well',
                'per_unit_level',
                'per_build_or_virtual_supply',
                'per_unit_id',
            ],
        })
    }

    static unit_type() {
        return _.enumerate({
            items: [
                'none',
                'first_spawner',
                'previous_spawner',
                'current_spawner',
                'target',
                'buff_memory',
                'operand_source',
                'operand_destination',
                'trigger_event_source',
                'trigger_event_destination',
                'home_planet',
            ],
        })
    }

    static unit() {
        return _.object({
            keys: {
                unit_type: this.unit_type(),
                redirection: this.redirection(),
            },
        })
    }

    static action_type() {
        return _.enumerate({
            items: [
                'abort_make_dead',
                'augment_damage',
                'change_ability_charges',
                'change_ability_is_empowered',
                'change_ability_remaining_cooldown',
                'change_buff_memory_float_value',
                'change_buff_memory_unit_value',
                'make_buff_dead',
                'start_buff_effect',
                'stop_buff_effect',
                'give_assets',
                'give_exotics',
                'give_influence_points',
                'give_mana',
                'prevent_damage',
                'resurrect_units_in_gravity_well_of_unit',
                'add_notification',
                'start_attract_to_unit',
                'stop_attract_to_unit',
                'start_brake_to_stop',
                'stop_brake_to_stop',
                'start_repel_from_unit',
                'stop_repel_from_unit',
                'start_force_attack',
                'stop_force_attack',
                'use_position_operators_on_single_position',
                'use_position_operators_on_vector_of_positions',
                'use_unit_operators_on_single_unit',
                'use_unit_operators_on_chained_units',
                'use_unit_operators_on_child_strikecraft_of_unit',
                'use_unit_operators_on_units_in_gravity_well_of_unit',
                'use_unit_operators_on_phase_lanes',
                'use_unit_operators_on_gravity_wells',
                'use_unit_operators_on_units_in_radius_of_unit',
                'use_unit_operators_on_units_in_arc_of_unit',
                'use_unit_operators_on_units_in_phase_lanes',
                'use_unit_operators_on_closest_owned_planet',
                'use_unit_operators_on_units_owned_by_player',
                'use_unit_operators_on_units_with_child_buffs_of_parent_buff',
            ],
        })
    }

    static permission_type() {
        return _.enumerate({
            items: [
                'can_hyperspace',
                'can_be_targeted_by_allies',
                'can_be_targeted_by_enemies',
                'can_be_damaged',
                'can_planet_be_damaged',
                'can_have_hull_restored',
                'can_have_armor_restored',
                'can_have_shields_restored',
                'can_have_shields_burst_restored',
                'can_have_shields_bypassed',
                'can_passively_regenerate_hull',
                'can_passively_regenerate_armor',
                'can_passively_regenerate_shields',
                'can_update_build_progress',
                'can_use_weapons',
                'can_use_weapons_when_crippled',
                'can_use_active_abilities',
                'can_use_abilities_when_crippled',
                'can_be_colonized',
                'can_launch_or_dock_strikecraft',
                'can_update_unit_production',
                'can_create_retargeting_torpedoes',
            ],
        })
    }

    static action_constraint_type() {
        return _.enumerate({
            items: [
                'none',
                'all_finite_time_actions_done',
                'buff_has_mutation',
                'buff_time_elapsed',
                'buff_made_dead_has_context',
                'damage_can_be_propagated',
                'damage_has_damage_source',
                'damage_has_weapon_tag',
                'distance_between_units_comparison',
                'has_resurrectable_units_in_gravity_well',
                'has_enemy_units_in_gravity_well',
                'has_valid_targets_in_radius',
                'is_empowered',
                'player_has_available_supply',
                'players_have_alliance_relationship',
                'random_chance',
                'research_prerequisites_are_met',
                'unit_comparison',
                'unit_passes_target_filter',
                'unit_passes_unit_constraint',
                'value_comparison',
                'weapon_has_weapon_tag',
                'composite_not',
                'composite_and',
                'composite_or',
            ],
        })
    }
    static constraint_type() {
        return _.enumerate({
            items: [
                'has_definition',
                'has_ability',
                'has_adjacent_planet_with_ownership',
                'has_antimatter',
                'has_buff',
                'has_missing_hull',
                'has_missing_armor',
                'has_missing_shields',
                'has_missing_antimatter',
                'has_missing_strikecraft',
                'has_mutation',
                'has_orders',
                'has_permission',
                'has_recently_been_damaged',
                'has_recently_fired_weapon',
                'has_build_price',
                'has_health',
                'has_shields',
                'has_weapon',
                'has_experience',
                'has_planet_type',
                'has_ship_role',
                'has_unit_level',
                'weapon_has_target',
                'is_always_a_threat',
                'is_bombing_planet',
                'is_carrier',
                'is_asteroid',
                'is_colonizable_planet',
                'is_culture_provider',
                'is_explored_planet',
                'is_fully_built',
                'is_home_planet',
                'is_unit_factory',
                'is_unit_factory_building_units',
                'is_structure_with_slot_type',
                'is_structure_plate_spin_changing',
                'is_building_structures',
                'is_detected',
                'is_dead_soon',
                'is_friendly',
                'is_in_fleet',
                'is_in_current_gravity_well',
                'is_in_dominant_culture',
                'is_inner_planet',
                'can_ever_hyperspace',
                'can_ever_move',
                'is_structure_builder',
                'not_self',
                'composite_not',
                'composite_and',
                'composite_or',
            ],
        })
    }

    static target_filter_unit_type() {
        // TODO: Change this once it gets de-hardcoded
        return _.enumerate({
            items: [
                'strikecraft',
                'corvette',
                'frigate',
                'cruiser',
                'capital_ship',
                'titan',
                'structure',
                'starbase',
                'planet',
                'star',
                'gravity_well',
                'phase_lane',
                'asteroid',
                'torpedo',
                'cannon_shell',
                'loot',
                'debris',
                'untargetable',
            ],
        })
    }

    static notification_type() {
        return _.enumerate({
            items: ['planet_conversion_started', 'planet_conversion_colonized'],
        })
    }

    static weapon_type() {
        return _.enumerate({
            desc: 'default=normal',
            items: ['planet_bombing', 'normal'],
        })
    }

    static prim3d_basic_cb_data() {
        return _.object({
            keys: {
                alpha_ramp_curvature: _.float(true, 'default=1'),
                emissive_factor: _.float(true, 'default=1'),
                alpha_ramp_steepness: _.float(true, 'default=0.3'),
                alpha_ramp_growth_delay: _.float(true, 'default=2.2'),
                depth_fade_distance: _.float(true, 'default=1'),
                depth_fade_opacity: _.float(true, 'default=1'),
                alpha_ramp_max_alpha_scalar: _.float(true, 'default=1'),
            },
        })
    }

    static value_behavior() {
        return _.enumerate({
            items: ['scalar', 'additive'],
        })
    }

    static alignment_type() {
        return _.enumerate({
            items: ['yaw', 'pitch', 'roll'],
        })
    }

    static target_alert() {
        return _.enumerate({
            items: ['ping_attention', 'ping_attack', 'ping_defend', 'rallied_to', 'positive_buff', 'negative_buff', 'targeted_by_ability'],
        })
    }

    static action_operator_type() {
        return _.enumerate({
            items: ['create_buff_agent', 'create_unit', 'play_point_effect'],
        })
    }

    static operator_type() {
        return _.enumerate({
            items: [
                'apply_buff',
                'apply_damage',
                'bomb_planet',
                'change_buff_memory_float_value',
                'change_buff_memory_unit_value',
                'change_owner_player',
                'colonize_planet',
                'create_clones',
                'create_phase_lane',
                'give_assets',
                'give_destroy_planet_rewards',
                'give_experience',
                'give_exotics',
                'make_dead',
                'play_point_effect',
                'play_weapon_effects',
                'remove_antimatter',
                'restore_antimatter',
                'repair_damage',
                'restore_planet_health',
                'stop_move',
                'teleport',
                'teleport_to_gravity_well',
                'explore',
                'spawn_units',
                'destroy_planet',
                'build_instant_strikecraft',
                'spawn_detached_strikecraft',
                'increase_planet_track_level',
                'remove_unit_item',
                'add_unit_item',
            ],
        })
    }
    static easing_functions(desc = '') {
        return _.enumerate({
            desc: desc,
            items: [
                'linear',
                'in_sine',
                'out_sine',
                'in_out_sine',
                'in_quad',
                'out_quad',
                'in_out_quad',
                'in_cubic',
                'out_cubic',
                'in_out_cubic',
                'in_quart',
                'out_quart',
                'in_out_quart',
                'in_quint',
                'out_quint',
                'in_out_quint',
                'in_expo',
                'out_expo',
                'in_out_expo',
            ],
        })
    }

    static behavior() {
        return _.enumerate({
            items: ['never', 'always', 'if_no_deliverable_destination'],
        })
    }

    static ship_roles() {
        return _.array({
            items: _.enumerate({
                items: ['explore', 'colonize', 'attack_ship', 'anti_structure', 'bomb_planet', 'raid'],
            }),
            isUnique: true,
        })
    }
    static exemptions() {
        return _.enumerate({
            items: ['is_dead', 'is_fully_unbuilt', 'is_not_explored', 'is_in_phase_space'],
        })
    }

    static assets() {
        return _.object({
            keys: {
                credits: _.float(),
                metal: _.float(),
                crystal: _.float(),
            },
        })
    }

    static desired_explore_ship_count(ctx, ptr, json) {
        try {
            switch (ctx.type) {
                case 'constant':
                    json.validate_keys(ptr, ctx, [], ['per_count', 'max_value'], ['value'])
                    break
                case 'per_used_military_slots_at_planet':
                    json.validate_keys(ptr, ctx, ['per_count'], [], ['max_value', 'per_count'])
                    break
            }
        } catch {}
        return _.object({
            required: ['type'],
            keys: {
                type: _.enumerate({
                    items: ['constant', 'per_planet_count', 'per_max_supply', 'per_built_supply', 'per_used_military_slots_at_planet'],
                }),
                per_count: _.integer(),
                max_value: _.float(),
                value: _.float(),
            },
        })
    }

    static assets_2f() {
        return _.object({
            keys: {
                credits: _.vector2f(),
                metal: _.vector2f(),
                crystal: _.vector2f(),
            },
        })
    }
    static ownerships() {
        return _.array({
            items: _.enumerate({
                items: ['self', 'friendly', 'enemy', 'none', 'ally'],
            }),
            isUnique: true,
        })
    }
    static blink() {
        return _.object({
            keys: {
                duration: _.float(),
                up_function: this.easing_functions(),
                down_function: this.easing_functions(),
            },
            required: ['duration', 'up_function', 'down_function'],
        })
    }
    static shaders() {
        return _.enumerate({
            items: ['basic', 'ship', 'planet_surface', 'debug_normals', 'test_multi_uv', 'test_mask'],
        })
    }

    static damage_source_type() {
        return _.enumerate({
            items: ['ability', 'debug', 'weapon'],
        })
    }

    static damage_affect_type() {
        return _.enumerate({
            items: [
                'hull_only',
                'armor_only',
                'shields_only',
                'hull_and_shields_only',
                'armor_and_shields_only',
                'hull_and_armor_only',
                'hull_and_armor_and_shields',
            ],
        })
    }
    static value_color() {
        return _.enumerate({
            desc: 'default=neutral',
            items: ['neutral', 'positive', 'negative'],
        })
    }

    static change_type() {
        return _.enumerate({
            desc: 'default=active',
            items: ['set_value', 'reset', 'reduce_fixed', 'reduce_percentage_of_remaining', 'reduce_percentage_of_total'],
        })
    }
    static cooldown_type() {
        return _.enumerate({
            items: ['passive', 'active'],
        })
    }

    static tooltip_line(ctx, ptr, json, cache) {
        return _.array({
            items: _.object({
                keys: {
                    asset_value_ids: _.object({
                        keys: {
                            credits: cache.action_values(),
                            crystal: cache.action_values(),
                            metal: cache.action_values(),
                        },
                    }),
                    exotic_counts: _.array({
                        items: _.object({
                            keys: {
                                count: cache.action_values(),
                                type: cache.exotics,
                            },
                        }),
                    }),
                    trade_import_points_id: cache.buff_unit_modifiers,
                    trade_export_metal_points_id: cache.buff_unit_modifiers,
                    trade_export_credits_points_id: cache.buff_unit_modifiers,
                    trade_export_crystal_points_id: cache.buff_unit_modifiers,
                    ratio_float_format: Definitions.value_float_format('default=no_decimal_place_with_sign'),
                    value_float_format: Definitions.value_float_format('default=no_decimal_place'),
                    is_culture_rate: _.boolean(),
                    is_resolved_value: _.boolean(),
                    visibility: Definitions.visibility(),
                    visible_if_value_zero: _.boolean('default=false'),
                    is_resolved_value: _.boolean(),
                    rendering_type: Definitions.rendering_type(),
                    label_text: cache.localisation,
                    unit_factory_modifier_id: cache.buff_unit_factory_modifiers,
                    empire_modifier_id: cache.buff_empire_ids,
                    value_suffix_text: cache.localisation,
                    unit_modifier_id: cache.buff_unit_modifiers,
                    exotics: _.array({ items: cache.exotics, isUnique: true }),
                    value_id: cache.action_values(),
                    weapon_modifier_id: cache.weapon_modifier_ids,
                    value_color: Definitions.value_color(),
                    unit_item: cache.unit_items,
                    unit: cache.units,
                    value_suffix: Definitions.value_suffix(),
                    planet_modifier_id: cache.planet_modifier_ids,
                    is_resolved_value: _.boolean(),
                    value_modifiers: _.array({ items: this.action_math_operator(json, cache, ctx, ptr) }),
                },
            }),
        })
    }

    static tooltip_line_groups(ctx, ptr, json, cache) {
        return _.array({
            items: _.object({
                keys: {
                    header_text: cache.localisation,
                    is_visible_constraint: this.action_constraint(ctx, ptr, cache, json, 0, 2),
                    lines: this.tooltip_line(ctx, ptr, json, cache),
                },
            }),
        })
    }

    static action_math_operator(json, cache, ctx = '', ptr = '') {
        const properties = [
            'lerp_range_lower_bound_value',
            'lerp_range_upper_bound_value',
            'lerp_t_value',
            'lerp_value_lower_bound_value',
            'lerp_value_upper_bound_value',
            'operand_value',
        ]
        try {
            const validateTooltipLines = (actionIdx, lines, propName) => {
                if (lines) {
                    lines.forEach((line, lineIdx) => {
                        if (line?.value_modifiers) {
                            line.value_modifiers.forEach((value, valueIdx) => {
                                const line_ptr = ptr + `/${actionIdx}/${propName}/${lineIdx}/value_modifiers/${valueIdx}`
                                this.action_math_operator(json, cache, value, line_ptr)
                            })
                        }
                    })
                }
            }
            if (Array.isArray(ctx)) {
                ctx.forEach((action, actionIdx) => {
                    validateTooltipLines(actionIdx, action?.lines, 'lines')
                    validateTooltipLines(actionIdx, action?.tooltip_lines, 'tooltip_lines')

                    if (Array.isArray(action.math_operators)) {
                        action.math_operators.forEach((math_op, math_op_idx) => {
                            this.action_math_operator(json, cache, math_op, ptr + `/${actionIdx}/math_operators/${math_op_idx}`)
                        })
                    }
                })
            } else if (Array.isArray(ctx.math_operators)) {
                ctx.math_operators.forEach((math_op, idx) => this.action_math_operator(json, cache, math_op, ptr + `/${idx}`))
            }
            switch (ctx.operator_type) {
                case 'min':
                case 'max':
                case 'add':
                case 'mod':
                case 'subtract':
                case 'assign':
                case 'multiply':
                    json.validate_keys(
                        ptr,
                        ctx,
                        ['operand_value'],
                        [
                            'lerp_range_lower_bound_value',
                            'lerp_range_upper_bound_value',
                            'lerp_t_value',
                            'lerp_value_lower_bound_value',
                            'lerp_value_upper_bound_value',
                        ],
                        properties
                    )
                    break
                case 'clamped_lerp':
                    json.validate_keys(
                        ptr,
                        ctx,
                        [
                            'lerp_range_lower_bound_value',
                            'lerp_range_upper_bound_value',
                            'lerp_t_value',
                            'lerp_value_lower_bound_value',
                            'lerp_value_upper_bound_value',
                        ],
                        ['operand_value'],
                        properties
                    )
                    break
                default:
                    break
            }
        } catch {}
        return _.object({
            required: ['operator_type'],
            keys: {
                operator_type: this.math_operator_type(),
                lerp_range_lower_bound_value: cache.action_values(),
                lerp_range_upper_bound_value: cache.action_values(),
                lerp_t_value: cache.action_values(),
                lerp_value_lower_bound_value: cache.action_values(),
                lerp_value_upper_bound_value: cache.action_values(),
                operand_value: cache.action_values(),
            },
        })
    }

    static alert_type() {
        return _.enumerate({
            items: ['ping_attention', 'ping_attack', 'ping_defend', 'rallied_to', 'positive_buff', 'negative_buff', 'targeted_by_ability'],
        })
    }

    static domain(desc = '') {
        return _.enumerate({
            desc: desc,
            items: ['military', 'civilian'],
        })
    }
    static value_float_format(desc = '') {
        return _.enumerate({
            desc: desc,
            items: [
                'no_decimal_place',
                'one_decimal_place',
                'one_decimal_place_if_not_whole',
                'two_decimal_place',
                'no_decimal_place_with_sign',
                'one_decimal_place_with_sign',
                'two_decimal_place_with_sign',
                'percentage',
                'percentage_one_decimal_place',
                'percentage_with_sign',
                'percentage_one_decimal_place_with_sign',
            ],
        })
    }

    static rendering_type() {
        return _.enumerate({
            items: [
                'single_value',
                'asset_values',
                'single_line',
                'unit_item_value',
                'unit_icon_and_name',
                'exotic_counts',
                'buff_unit_modifier',
                'buff_planet_modifier',
                'buff_weapon_modifier',
                'buff_empire_modifier',
                'buff_unit_factory_modifier',
                'buff_trade_capacity',
                'exotic_income',
            ],
        })
    }
    static value_suffix() {
        return _.enumerate({
            items: ['seconds', 'minutes', 'per_second', 'per_minute'],
        })
    }

    static visibility() {
        return _.enumerate({
            desc: 'default=any',
            items: ['any', 'use_only', 'upgrade_only'],
        })
    }

    static action_player(cache) {
        return _.object({
            required: ['player_type'],
            keys: {
                ability: this.action_ability(cache),
                owned_unit: this.action_unit({ cache: cache }),
                player_type: Definitions.player_type(),
            },
        })
    }

    static exotic_context() {
        return _.enumerate({
            desc: 'default=action',
            items: [
                'starting',
                'npc_reward',
                'surveying',
                'factory',
                'alliance_offer',
                'derelict_loot',
                'wreckage_loot',
                'refund',
                'action',
                'research_windfall',
                'destroy_planet_rewards',
            ],
        })
    }

    static action_buff() {
        return _.enumerate({
            desc: 'default=current_buff',
            items: ['current_buff', 'parent_buff', 'all_child_buffs', 'all_buffs_on_current_spawner'],
        })
    }

    static action_ability(cache) {
        return _.object({
            required: ['ability_type'],
            keys: {
                ability_type: this.ability_type(),
                unit_with_abilities: this.action_unit({ cache: cache }),
                ability_index: _.integer(),
            },
        })
    }

    static validatePositionOperator(ctx, ptr, json) {
        const _ = [
            'buff_agent_effect_size_reference_unit',
            'is_culture_provider',
            'buff_on_created_unit',
            'copy_parent_buff_memory_values',
            'hyperspace_destination_position',
            'is_change_gravity_well_to_hyperspace_destination_enabled',
            'is_self_building',
            'special_operation_unit_kind',
            'unit_forward',
            'unit_to_create',
            'bypass_shields_chance_value',
            'damage_affect_type',
            'damage_value',
            'duration_value',
            'penetration_value',
            'buff_on_agent',
            'torpedo_can_retarget',
            'torpedo_enable_steering_distance_as_radius_scalar_value',
            'torpedo_forward',
            'torpedo_source_unit',
            'torpedo_target_position',
            'torpedo_target_unit',
            'torpedo_to_create',
            'effect_definition',
            'effect_destination_unit',
            'effect_up',
            'effect_forward',
        ]
        try {
            switch (ctx.operator_type) {
                case 'create_buff_agent':
                    json.validate_keys(ptr, ctx, ['buff_on_agent'], _, [
                        'buff_agent_effect_size_reference_unit',
                        'copy_parent_buff_memory_values',
                        'is_culture_provider',
                    ])
                    break
                case 'create_unit':
                    json.validate_keys(ptr, ctx, ['unit_forward', 'unit_to_create'], _, [
                        'buff_on_created_unit',
                        'copy_parent_buff_memory_values',
                        'hyperspace_destination_position',
                        'is_change_gravity_well_to_hyperspace_destination_enabled',
                        'is_self_building',
                        'special_operation_unit_kind',
                        'unit_forward',
                        'unit_to_create',
                    ])
                    break
                case 'create_torpedo':
                    json.validate_keys(
                        ptr,
                        ctx,
                        [
                            'damage_affect_type',
                            'damage_value',
                            'duration_value',
                            'penetration_value',
                            'torpedo_forward',
                            'torpedo_source_unit',
                            'torpedo_to_create',
                        ],
                        _,
                        [
                            'torpedo_target_unit',
                            'torpedo_target_position',
                            'torpedo_enable_steering_distance_as_radius_scalar_value',
                            'torpedo_can_retarget',
                            'bypass_shields_chance_value',
                        ]
                    )
                    break
                case 'play_point_effect':
                    json.validate_keys(ptr, ctx, ['effect_definition', 'effect_destination_unit', 'effect_forward'], _, ['effect_up'])
                    break
            }
        } catch {}
    }

    static position_operators(ctx, ptr, cache, json) {
        return _.array({
            items: _.object({
                required: ['operator_type'],
                keys: {
                    operator_type: _.enumerate({ items: ['create_buff_agent', 'create_unit', 'create_torpedo', 'play_point_effect'] }),
                    buff_agent_effect_size_reference_unit: this.action_unit({
                        cache: cache,
                        desc: loc_keys.BUFF_AGENT_EFFECT_SIZE_REFERENCE_UNIT,
                    }),
                    is_culture_provider: _.boolean(loc_keys.IS_CULTURE_PROVIDER),

                    buff_on_created_unit: cache.buffs,
                    buff_on_agent: cache.buffs,
                    copy_parent_buff_memory_values: _.boolean('default=false'),
                    hyperspace_destination_position: this.action_position(ctx, ptr, cache, json, 0, 2),
                    is_change_gravity_well_to_hyperspace_destination_enabled: _.boolean(
                        loc_keys.IS_CHANGE_GRAVITY_WELL_TO_HYPERSPACE_DESTINATION_ENABLED
                    ),
                    is_self_building: _.boolean('default=false'),
                    special_operation_unit_kind: cache.special_operation_kinds,
                    unit_forward: Definitions.action_direction(ctx, ptr, cache),
                    unit_to_create: cache.units,

                    bypass_shields_chance_value: cache.action_values(),
                    damage_affect_type: Definitions.damage_affect_type(),
                    damage_value: cache.action_values(),
                    duration_value: cache.action_values(),
                    penetration_value: cache.action_values(),
                    torpedo_can_retarget: _.boolean('default=empty'),
                    torpedo_enable_steering_distance_as_radius_scalar_value: cache.action_values(),
                    torpedo_forward: Definitions.action_direction(ctx, ptr, cache),
                    torpedo_source_unit: this.action_unit({ cache: cache }),
                    torpedo_target_position: this.action_position(ctx, ptr, cache, json, 0, 2),
                    torpedo_target_unit: this.action_unit({ cache: cache }),
                    torpedo_to_create: cache.units,

                    effect_definition: this.effect_definition(cache),
                    effect_destination_unit: this.action_unit({ cache: cache, desc: 'the unit the effect is attached to' }),
                    effect_up: Definitions.action_direction(ctx, ptr, cache),
                    effect_forward: Definitions.action_direction(ctx, ptr, cache),
                },
            }),
        })
    }

    static validateActionDirection(ctx, ptr, json) {
        try {
            switch (ctx.direction_type) {
                case 'from_unit_to_target_position':
                    json.validate_keys(ptr, ctx, ['unit'], ['destination_position', 'source_position'])
                    break
                case 'from_position_to_position':
                    json.validate_keys(ptr, ctx, ['destination_position', 'source_position'], ['unit'])
                    break
                case 'unit_up':
                case 'unit_forward':
                case 'unit_cross':
                    json.validate_keys(ptr, ctx, ['unit'], ['destination_position', 'source_position'])
                    break
            }
        } catch {}
        if (ctx.direction) {
            this.validateActionDirection(ctx?.direction, ptr + '/direction', json)
        }
        if (ctx.unit_forward) {
            this.validateActionDirection(ctx?.unit_forward, ptr + '/unit_forward', json)
        }
        if (ctx.torpedo_forward) {
            this.validateActionDirection(ctx?.torpedo_forward, ptr + '/torpedo_forward', json)
        }
        if (ctx.effect_forward) {
            this.validateActionDirection(ctx?.effect_forward, ptr + '/effect_forward', json)
        }
        if (ctx.clone_forward) {
            this.validateActionDirection(ctx?.clone_forward, ptr + '/clone_forward', json)
        }
        if (ctx.effect_up) {
            this.validateActionDirection(ctx?.effect_up, ptr + '/effect_up', json)
        }
        if (ctx.arc_direction) {
            this.validateActionDirection(ctx?.arc_direction, ptr + '/arc_direction', json)
        }
        if (ctx.hyperspace_destination_position) {
            this.validateActionDirection(ctx?.hyperspace_destination_position, ptr + '/hyperspace_destination_position', json)
        }
    }

    static validateTravelTime(ctx, ptr, json) {
        try {
            switch (ctx.travel_time.travel_time_source) {
                case 'explicit_time':
                    json.validate_keys(ptr + '/travel_time', ctx.travel_time, ['explicit_time_value'], ['travel_speed_value'], [])
                    break
                case 'speed_and_distance':
                    json.validate_keys(ptr + '/travel_time', ctx.travel_time, ['travel_speed_value'], ['explicit_time_value'], [])
                    break
            }
        } catch {}
    }

    static travel_time(cache) {
        return _.object({
            required: ['travel_time_source'],
            keys: {
                travel_time_source: _.enumerate({ items: ['explicit_time', 'speed_and_distance'] }),
                explicit_time_value: cache.action_values(),
                travel_speed_value: cache.action_values(),
            },
        })
    }

    static validateActionPosition(ctx, ptr, json) {
        try {
            if (ctx?.ability_position_picking_type === 'at_index') {
                json.validate_keys(ptr, ctx, ['ability_position_index'], [])
            } else {
                json.validate_keys(ptr, ctx, [], ['ability_position_index'])
            }

            if (ctx?.ability?.ability_type === 'all_abilities') {
                json.validate_keys(ptr + '/ability', ctx.ability, ['unit_with_abilities'], ['ability_index'])
            } else if (ctx.ability.ability_type === 'ability_at_index') {
                json.validate_keys(ptr + '/ability', ctx.ability, ['unit_with_abilities', 'ability_index'], [])
            }
        } catch {}

        if (ctx?.player) {
            this.validateActionPosition(ctx?.player, ptr + '/player', json)
        }
        if (ctx?.destination_position) {
            this.validateActionPosition(ctx?.destination_position, ptr + '/destination_position', json)
        }
        if (ctx?.clone_spawn_position) {
            this.validateActionPosition(ctx?.clone_spawn_position, ptr + '/clone_spawn_position', json)
        }
        if (ctx?.hyperspace_destination_position) {
            this.validateActionPosition(ctx?.hyperspace_destination_position, ptr + '/hyperspace_destination_position', json)
        }
    }

    static validateActionUnitOperator(ctx, ptr, json) {
        try {
            const _ = [
                'copy_parent_buff_memory_values',
                'buff',
                'destination_target_filter_id',
                'destination_unit',
                'initial_float_values',
                'override_ownership_player',
                'override_ownership_unit',
                'bypass_shields_chance_value',
                'can_damage_be_propagated',
                'damage_value',
                'ignore_infinite_recursion_guard',
                'penetration_value',
                'source_unit',
                'use_source_weapon_properties',
                'bombing_damage_value',
                'damage_source',
                'show_enemy_planet_made_dead_from_bombing_notification',
                'weapon_tags',
                'float_variable',
                'math_operators',
                'new_unit_value',
                'unit_variable',
                'auto_add_to_source_unit_fleet',
                'keep_planet_track_levels',
                'new_owner_player',
                'buff_on_planet',
                'copy_parent_buff_memory_values',
                'initial_float_values',
                'override_ownership_player',
                'override_ownership_unit',
                'show_planet_colonized_notification',
                'buff_on_clone',
                'clone_count',
                'clone_forward',
                'clone_spawn_position',
                'copy_destination_unit_state',
                'copy_parent_buff_memory_values',
                'initial_float_values',
                'override_ownership_unit',
                'asset_type',
                'asset_value',
                'context',
                'destination_unit',
                'log_different_fixtures_as_unique_events',
                'give_assets_context',
                'give_exotic_context',
                'rewards_destination_player',
                'experience_value',
                'level_cap_value',
                'exotics',
                'skip_awarding_experience',
                'skip_death_sequence',
                'skip_player_statistics',
                'effect_definition',
                'mesh_point',
                'effects',
                'effect_alias_binding',
                'charge_duration',
                'beam_duration',
                'antimatter_remove_value',
                'antimatter_restore_value',
                'affect_type',
                'can_damage_be_propagated',
                'ignore_infinite_recursion_guard',
                'repair_value',
                'source_unit',
                'restore_amount_value',
                'destination_position',
                'destination_reference_unit',
                'units',
                'arrival_delay_value',
                'available_supply_value',
                'check_research_prerequisites',
                'constrain_available_supply_to_owner_player',
                'in_hyperspace',
                'owner_player',
                'special_operation_unit_kind',
                'suppress_ui_notifications',
                'build_strikecraft_count',
                'buff_on_strikecraft',
                'strikecraft_count_value',
                'ignore_research',
                'level_count_value',
                'planet_track_type',
                'will_offset_development_track_upgrade_price',
                'unit_item',
            ]
            switch (ctx.operator_type) {
                case 'apply_buff':
                    json.validate_keys(ptr, ctx, ['buff'], _, [
                        'copy_parent_buff_memory_values',
                        'destination_target_filter_id',
                        'destination_unit',
                        'initial_float_values',
                        'override_ownership_player',
                        'override_ownership_unit',
                    ])
                    break
                case 'apply_damage':
                    if (ctx?.use_source_weapon_properties || ctx?.use_source_weapon_properties == true) {
                        json.validate_keys(ptr, ctx, ['damage_affect_type', 'damage_source'], _, ['weapon_tags', 'use_source_weapon_properties'])
                    } else {
                        json.validate_keys(ptr, ctx, ['damage_value', 'penetration_value'], _, [
                            'bypass_shields_chance_value',
                            'can_damage_be_propagated',
                            'ignore_infinite_recursion_guard',
                            'source_unit',
                            'use_source_weapon_properties',
                            'damage_source',
                        ])
                    }
                    break
                case 'bomb_planet':
                    json.validate_keys(ptr, ctx, ['bombing_damage_value', 'damage_source'], _, [
                        'weapon_tags',
                        'show_enemy_planet_made_dead_from_bombing_notification',
                    ])
                    break
                case 'change_buff_memory_float_value':
                    json.validate_keys(ptr, ctx, ['float_variable', 'math_operators'], _, ['buff'])
                    break
                case 'change_buff_memory_unit_value':
                    json.validate_keys(ptr, ctx, ['new_unit_value', 'unit_variable'], _, ['buff'])
                    break
                case 'change_owner_player':
                    json.validate_keys(ptr, ctx, ['new_owner_player'], _, ['auto_add_to_source_unit_fleet', 'keep_planet_track_levels'])
                    break
                case 'colonize_planet':
                    json.validate_keys(ptr, ctx, [], _, [
                        'buff_on_planet',
                        'copy_parent_buff_memory_values',
                        'initial_float_values',
                        'override_ownership_player',
                        'override_ownership_unit',
                        'show_planet_colonized_notification',
                    ])
                    break
                case 'create_clones':
                    json.validate_keys(ptr, ctx, ['clone_forward', 'clone_spawn_position'], _, [
                        'buff_on_clone',
                        'clone_count',
                        'copy_destination_unit_state',
                        'copy_parent_buff_memory_values',
                        'initial_float_values',
                        'override_ownership_unit',
                    ])
                    break
                case 'create_phase_lane':
                    json.validate_keys(ptr, ctx, ['destination_gravity_well', 'owner_player', 'source_gravity_well'], _, ['buff'])
                    break
                case 'give_assets':
                    json.validate_keys(ptr, ctx, ['asset_type', 'asset_value'], _, [
                        'context',
                        'destination_unit',
                        'log_different_fixtures_as_unique_events',
                    ])
                    break
                case 'give_destroy_planet_rewards':
                    json.validate_keys(ptr, ctx, [], _, ['give_assets_context', 'give_exotic_context', 'rewards_destination_player'])
                    break
                case 'give_experience':
                    json.validate_keys(ptr, ctx, ['experience_value'], _, ['level_cap_value', 'context'])
                    break
                case 'give_exotics':
                    json.validate_keys(ptr, ctx, ['exotics'], _, ['context', 'destination_unit'])
                    break
                case 'make_dead':
                    json.validate_keys(ptr, ctx, [], _, ['skip_awarding_experience', 'skip_death_sequence', 'skip_player_statistics'])
                    break
                case 'play_point_effect':
                    json.validate_keys(ptr, ctx, ['effect_definition'], _, [])
                    break
                case 'play_weapon_effects':
                    json.validate_keys(ptr, ctx, ['effect_alias_binding', 'effects', 'mesh_point'], _, [
                        'beam_duration',
                        'charge_duration',
                        'effect_alias_binding',
                        'effects',
                        'mesh_point',
                    ])
                    break
                case 'remove_antimatter':
                    json.validate_keys(ptr, ctx, ['antimatter_remove_value'], _, [])
                    break
                case 'restore_antimatter':
                    json.validate_keys(ptr, ctx, ['antimatter_restore_value'], _, [])
                    break
                case 'repair_damage':
                    json.validate_keys(ptr, ctx, ['affect_type', 'repair_value'], _, [
                        'can_damage_be_propagated',
                        'destination_unit',
                        'ignore_infinite_recursion_guard',
                        'source_unit',
                    ])
                    break
                case 'restore_planet_health':
                    json.validate_keys(ptr, ctx, ['restore_amount_value'], _, ['damage_source', 'weapon_tags'])
                    break
                case 'teleport':
                    json.validate_keys(ptr, ctx, ['destination_position'], _)
                    break
                case 'teleport_to_gravity_well':
                    json.validate_keys(ptr, ctx, ['destination_reference_unit'], _)
                    break
                case 'spawn_units':
                    json.validate_keys(
                        ptr,
                        ctx,
                        [
                            'arrival_delay_value',
                            'check_research_prerequisites',
                            'constrain_available_supply_to_owner_player',
                            'in_hyperspace',
                            'owner_player',
                            'units',
                        ],
                        _,
                        ['available_supply_value', 'special_operation_unit_kind']
                    )
                    break
                case 'destroy_planet':
                    json.validate_keys(ptr, ctx, [], _, ['suppress_ui_notifications'])
                    break
                case 'build_instant_strikecraft':
                    json.validate_keys(ptr, ctx, ['build_strikecraft_count'], _, [])
                    break
                case 'spawn_detached_strikecraft':
                    json.validate_keys(ptr, ctx, ['buff_on_strikecraft', 'strikecraft_count_value'], _, [])
                    break
                case 'increase_planet_track_level':
                    json.validate_keys(ptr, ctx, ['ignore_research', 'planet_track_type', 'will_offset_development_track_upgrade_price'], _, [
                        'level_count_value',
                    ])
                    break
                case 'add_unit_item':
                case 'remove_unit_item':
                    json.validate_keys(ptr, ctx, ['unit_item'], _, [])
                    break
                case 'explore':
                case 'stop_move':
                    break
            }
        } catch {}
    }

    static effect_alias_bindings_definition(cache) {
        return _.array({
            items: _.object({
                keys: {
                    alias_name: _.string(),
                    alias_binding: _.object({
                        keys: {
                            beam: cache.beam_effects,
                            particle_effect: cache.particle_effects,
                            sounds: _.array({
                                items: cache.sounds,
                            }),
                        },
                    }),
                },
            }),
        })
    }

    static action_effect_alias_binding() {
        return _.enumerate({
            items: ['unit_skin', 'action_data_source'],
        })
    }

    static validateActionConstraintType(ctx, ptr, json) {
        try {
            const _ = [
                'buff',
                'mutation',
                'duration_value',
                'buff_made_dead_context',
                'damage_source',
                'weapon_tag',
                'unit_a',
                'unit_b',
                'comparison_type',
                'compare_value',
                'unit_types_to_resurrect',
                'min_target_count_value',
                'min_supply_value',
                'gravity_well_reference_unit',
                'radius_origin_unit',
                'radius_value',
                'include_future_supply',
                'minimum_available_supply',
                'player',
                'target_count_value',
                'target_filter_id',
                'dead_units_player',
                'player_a',
                'player_b',
                'value_a',
                'value_b',
                'any_weapon_tags',
                'weapon',
                'relationship_type',
                'chance_value',
                'prerequisites',
                'unit',
                'unit_constraint',
                "constraints"
            ]
            switch (ctx.constraint_type) {
                case 'all_finite_time_actions_done':
                    json.validate_keys(ptr, ctx, [], _, ['buff'])
                    break
                case 'buff_has_mutation':
                    json.validate_keys(ptr, ctx, ['mutation'], _, ['buff'])
                    break
                case 'buff_time_elapsed':
                    json.validate_keys(ptr, ctx, ['duration_value'], _, ['buff'])
                    break
                case 'buff_made_dead_has_context':
                    json.validate_keys(ptr, ctx, ['buff_made_dead_context'], _)
                    break
                case 'damage_has_damage_source':
                    json.validate_keys(ptr, ctx, ['damage_source'], _)
                    break
                case 'damage_has_weapon_tag':
                    json.validate_keys(ptr, ctx, ['weapon_tag'], _, [])
                    break
                case 'distance_between_units_comparison':
                    json.validate_keys(ptr, ctx, ['compare_value', 'comparison_type', 'unit_a', 'unit_b'], _)
                    break
                case 'has_resurrectable_units_in_gravity_well':
                    json.validate_keys(ptr, ctx, ['dead_units_player', 'gravity_well_reference_unit', 'unit_types_to_resurrect'], _, [
                        'min_supply_value',
                    ])
                    break
                case 'has_enemy_units_in_gravity_well':
                    json.validate_keys(ptr, ctx, ['gravity_well_reference_unit', 'target_filter_id'], _)
                    break
                case 'has_valid_targets_in_radius':
                    json.validate_keys(ptr, ctx, ['radius_origin_unit', 'radius_value', 'target_count_value', 'target_filter_id'], _)
                    break
                case 'player_has_available_supply':
                    json.validate_keys(ptr, ctx, ['player'], _, ['minimum_available_supply'])
                    break
                case 'players_have_alliance_relationship':
                    json.validate_keys(ptr, ctx, ['player_a', 'player_b', 'relationship_type'], _)
                    break
                case 'random_chance':
                    json.validate_keys(ptr, ctx, ['chance_value'], _)
                    break
                case 'research_prerequisites_are_met':
                    json.validate_keys(ptr, ctx, ['player', 'prerequisites'], _)
                    break
                case 'unit_comparison':
                    json.validate_keys(ptr, ctx, ['unit_a', 'unit_b'], _)
                    break
                case 'unit_passes_target_filter':
                    json.validate_keys(ptr, ctx, ['target_filter_id', 'unit'], _, ['player'])
                    break
                case 'unit_passes_unit_constraint':
                    json.validate_keys(ptr, ctx, ['unit', 'unit_constraint'], _)
                    break
                case 'value_comparison':
                    json.validate_keys(ptr, ctx, ['comparison_type', 'value_a', 'value_b'], _)
                    break
                case 'weapon_has_weapon_tag':
                    json.validate_keys(ptr, ctx, ['weapon'], _, ['any_weapon_tags'])
                    break
                case 'composite_not':
                    json.validate_keys(ptr, ctx, ['constraint'], _, [])
                    this.validateActionConstraintType(ctx?.constraint, ptr + '/constraint', json)
                    break
                case 'composite_and':
                case 'composite_or':
                    json.validate_keys(ptr, ctx, ['constraints'], _, [])
                    if (Array.isArray(ctx?.constraints)) {
                        ctx.constraints.forEach((action, idx) => {
                            this.validateActionConstraintType(action, ptr + `/constraints/${idx}`, json)
                        })
                    }
                    break
                case 'is_empowered':
                case 'damage_can_be_propagated':
                case 'none':
                    break
            }
        } catch {}

        // if (ctx?.constraint) {
        //     // this.validateActionConstraintType(ctx?.constraint, ptr + '/constraint', json)
        // }
    }

    static action_constraint(ctx, ptr, cache, json, depth = 0, maxDepth = 5) {
        if (depth > maxDepth) return {}
        try {
            if (Array.isArray(ctx)) {
                ctx.forEach((action, idx) => {
                    if (Array.isArray(action?.operators)) {
                        action.operators.forEach((op, op_idx) => {
                            this.validateActionConstraintType(op?.constraint, `${ptr}/${idx}/operators/${op_idx}/constraint`, json)
                        })
                    }
                    if (action?.action_group) {
                        this.validateActionConstraintType(action?.action_group?.constraint, `${ptr}/${idx}/action_group/constraint`, json)
                    }
                    if (action?.constraint) {
                        this.validateActionConstraintType(action?.constraint, `${ptr}/${idx}/constraint`, json)
                    }
                    if (action?.buff_constraint) {
                        this.validateActionConstraintType(action?.buff_constraint, `${ptr}/${idx}/buff_constraint`, json)
                    }
                    if (action?.resurrection_constraint) {
                        this.validateActionConstraintType(action?.resurrection_constraint, `${ptr}/${idx}/resurrection_constraint`, json)
                    }
                    if (action?.target_constraint) {
                        this.validateActionConstraintType(action?.target_constraint, `${ptr}/${idx}/target_constraint`, json)
                    }
                    if (action?.is_visible_constraint) {
                        this.validateActionConstraintType(action?.is_visible_constraint, `${ptr}/${idx}/is_visible_constraint`, json)
                    }
                })
            } else {
                this.validateActionConstraintType(ctx, ptr, json)
            }
        } catch {}
        return _.object({
            required: ['constraint_type'],
            keys: {
                constraint_type: Definitions.action_constraint_type(),
                buff: Definitions.action_constraint_buff_type(),
                mutation: cache.mutations,
                duration_value: cache.action_values(),
                buff_made_dead_context: Definitions.buff_made_dead_context(),
                damage_source: Definitions.damage_source(),
                weapon_tag: cache.weapon_tags,
                unit_a: Definitions.action_unit({ cache: cache }),
                unit_b: Definitions.action_unit({ cache: cache }),
                comparison_type: Definitions.comparison_type(),
                compare_value: cache.action_values(),
                unit_types_to_resurrect: _.array({ items: Definitions.target_filter_unit_type(), isUnique: true }),
                min_target_count_value: cache.action_values(),
                min_supply_value: cache.action_values(),
                gravity_well_reference_unit: Definitions.action_unit({ cache: cache }),
                radius_origin_unit: Definitions.action_unit({ cache: cache }),
                radius_value: cache.action_values(),
                include_future_supply: _.boolean('default=false'),
                minimum_available_supply: cache.action_values(),
                player: Definitions.action_player(cache),
                target_count_value: cache.action_values(),
                target_filter_id: cache.target_filters,
                dead_units_player: Definitions.action_player(cache),
                constraint: this.action_constraint(ctx?.constraint, ptr + '/constraint', cache, json, depth + 1, 2),
                constraints: _.exclusiveArray({
                    items: this.action_constraint(ctx?.constraints, ptr + '/constraints', cache, json, depth + 1, 1),
                    minItems: 2,
                    maxItems: 5,
                }),
                player_a: Definitions.action_player(cache),
                player_b: Definitions.action_player(cache),

                value_a: cache.action_values(),
                value_b: cache.action_values(),

                any_weapon_tags: _.array({ items: cache.weapon_tags, isUnique: true }),
                weapon: Definitions.action_weapon(),

                relationship_type: Definitions.relationship_type(),

                chance_value: cache.action_values(loc_keys.CHANCE_VALUE),

                prerequisites: Definitions.research_prerequisites(cache.research_subjects),

                unit: Definitions.action_unit({ cache: cache }),

                unit_constraint: Definitions.constraint(ctx?.unit_constraint, ptr + '/unit_constraint', cache, json),
            },
        })
    }

    static action(ctx, ptr, cache, json, json_builder) {
        return _.object({
            // required: ['action_type'],
            keys: {
                action_id: _.string(loc_keys.ACTION_ID),
                action_type: Definitions.action_type(),
                constraint: Definitions.action_constraint(ctx, ptr, cache, json, 0, 2),
                bonus_damage_value: cache.action_values(),
                ability: Definitions.action_ability(cache),
                is_empowered: _.boolean(),
                change_type: Definitions.change_type(),
                cooldown_type: Definitions.cooldown_type(),
                reduction_value: cache.action_values(),
                buff: Definitions.action_buff(),
                float_variable: cache.float_variables,
                buff_constraint: Definitions.action_constraint(ctx, ptr, cache, json, 0, 2),

                is_looping: _.boolean('default=true'),
                effect_definition: Definitions.effect_definition(cache),

                asset_type: Definitions.resources(),
                exotics: Definitions.exotics(cache),
                give_amount_id: cache.action_values(),
                log_different_fixtures_as_unique_events: _.boolean('default=false'),
                player: Definitions.action_player(cache),

                influence_points_given_value: cache.action_values(),
                mana_given_value: cache.action_values(),
                damage_prevented_value: cache.action_values(),

                auto_add_to_fleet_unit: Definitions.action_unit({ cache: cache, desc: 'default=first_spawner' }),
                buff_on_resurrected_units: cache.buffs,
                constrain_to_available_supply: _.boolean('default=true'),
                copy_parent_buff_memory_values: _.boolean('default=false'),
                dead_units_player: Definitions.action_player(cache),
                gravity_well_origin_unit: Definitions.unit(),
                max_supply_value: cache.action_values(),
                max_target_count_value: cache.action_values(),
                override_ownership_unit: Definitions.action_unit({ cache: cache }),
                resurrection_constraint: Definitions.action_constraint(ctx, ptr, cache, json, 0, 2),
                resurrection_sort: Definitions.target_sort_steps(ctx, ptr, cache, json),
                source_unit: Definitions.action_unit({ cache: cache, desc: 'default=current_spawner' }),
                specific_unit_ids: _.array({ items: cache.action_values(), isUnique: true }),
                unit_types_to_resurrect: _.array({ items: Definitions.target_filter_unit_type(), isUnique: true }),

                position: Definitions.action_position(ctx, ptr, cache, json, 0, 2),
                positions: _.array({
                    items: Definitions.action_position(ctx, ptr, cache, json, 0, 2),
                }),
                position_operators: Definitions.position_operators(ctx, ptr, cache, json),

                notification_type: _.enumerate({ items: ['planet_conversion_started', 'planet_conversion_colonized'] }),
                planet: Definitions.action_unit({ cache: cache }),

                attractor_unit: Definitions.action_unit({ cache: cache }),
                max_linear_speed_value: cache.action_values(),
                time_to_max_linear_speed_value: cache.action_values(),

                target_unit: Definitions.action_unit({ cache: cache }),
                max_jump_distance_value: cache.action_values(),

                repulsion_origin_unit: Definitions.action_unit({ cache: cache }),
                starting_linear_speed_value: cache.action_values(),
                terminal_linear_speed_value: cache.action_values(),
                time_to_terminal_linear_speed_value: cache.action_values(),

                new_unit_value: Definitions.action_unit({ cache: cache }),
                math_operators: _.array({
                    items: Definitions.action_math_operator(json, cache, ctx, ptr),
                }),
                travel_time: Definitions.travel_time(cache),

                constraint_not_satisified_operators: _.array({
                    items: Definitions.action_unit_operator(ctx, ptr, cache, json),
                }),
                operators: _.array({
                    items: Definitions.action_unit_operator(ctx, ptr, cache, json),
                }),
                operators_constraint: Definitions.action_constraint(ctx, ptr, cache, json),
                destination_unit: Definitions.action_unit({ cache: cache }),
                range_value: cache.action_values(),

                chain_delay: _.float(),
                chain_range_value: cache.action_values(),
                chain_target_filter_id: cache.target_filters,
                first_destination_unit: Definitions.action_unit({ cache: cache }),
                first_source_unit: Definitions.action_unit({ cache: cache }),
                max_target_count_value: cache.action_values(),
                target_sort: Definitions.target_sort_steps(ctx, ptr, cache, json),
                strikecraft_carrier_unit: Definitions.action_unit({ cache: cache }),

                include_radius_origin_unit: _.boolean('default=true'),
                include_y_axis_in_radius_check: _.boolean('default=true'),
                radius_origin_unit: Definitions.action_unit({ cache: cache }),
                radius_value: cache.action_values(),

                arc_angle_value: cache.action_values(),
                arc_direction: Definitions.action_direction(ctx, ptr, cache),
                arc_origin_unit: Definitions.action_unit({ cache: cache }),
                arc_radius_value: cache.action_values(),

                traveling_from_gravity_well_origin: _.boolean(),
                traveling_to_gravity_well_origin: _.boolean(),

                include_current_child_buff_unit: _.boolean('default=false'),
                ...json_builder,
            },
        })
    }

    static action_unit_operator(ctx, ptr, cache, json) {
        return _.object({
            condition: _.allOf({
                properties: [
                    _.If({
                        key: 'operator_type',
                        value: 'create_phase_lane',
                        properties: {
                            buff: cache.buffs,
                        },
                    }),
                    _.If({
                        key: 'operator_type',
                        value: 'change_buff_memory_unit_value',
                        properties: {
                            buff: this.action_buff(),
                        },
                    }),
                    _.If({
                        key: 'operator_type',
                        value: 'change_buff_memory_float_value',
                        properties: {
                            buff: this.action_buff(),
                        },
                    }),
                    _.If({
                        key: 'operator_type',
                        value: 'apply_buff',
                        properties: {
                            buff: cache.buffs,
                        },
                    }),
                    _.If({
                        key: 'operator_type',
                        value: 'give_experience',
                        properties: {
                            context: _.enumerate({
                                desc: 'default=buff',
                                items: ['debug', 'create_unit', 'buff', 'unit_death', 'planet_bombing', 'loot_collection'],
                            }),
                        },
                    }),
                    _.If({
                        key: 'operator_type',
                        value: 'give_assets',
                        properties: {
                            context: this.player_asset_delta_source(),
                        },
                    }),
                    _.If({
                        key: 'operator_type',
                        value: 'give_exotics',
                        properties: {
                            context: this.exotic_context(),
                        },
                    }),
                ],
            }),
            required: ['operator_type'],
            keys: {
                operator_type: this.operator_type(),
                copy_parent_buff_memory_values: _.boolean('default=true'),
                buff: '',
                destination_target_filter_id: cache.target_filters,
                destination_unit: this.action_unit({ cache: cache, desc: 'default=operand_destination' }),
                override_ownership_player: this.action_player(cache),
                override_ownership_unit: this.action_unit({ cache: cache }),

                bypass_shields_chance_value: cache.action_values(),
                can_damage_be_propagated: _.boolean('default=true'),
                damage_value: cache.action_values(),
                ignore_infinite_recursion_guard: _.boolean('default=false'),
                penetration_value: cache.action_values(),
                source_unit: this.action_unit({ cache: cache, desc: 'default=first_spawner' }),
                use_source_weapon_properties: _.boolean('default=false'),

                bombing_damage_value: cache.action_values(),
                damage_source: Definitions.damage_source_type(),
                damage_affect_type: Definitions.damage_affect_type(),
                show_enemy_planet_made_dead_from_bombing_notification: _.boolean('default=true'),
                weapon_tags: _.array({ items: cache.weapon_tags, isUnique: true }),
                float_variable: cache.float_variables,
                math_operators: _.array({
                    items: Definitions.action_math_operator(json, cache, '', ''),
                }),
                new_unit_value: this.action_unit({ cache: cache }),
                unit_variable: cache.float_variables,

                auto_add_to_source_unit_fleet: this.action_unit({ cache: cache }),
                keep_planet_track_levels: _.boolean('default=false'),
                new_owner_player: this.action_player(cache),

                buff_on_planet: cache.buffs,
                copy_parent_buff_memory_values: _.boolean('default=false'),
                override_ownership_player: this.action_player(cache),
                override_ownership_unit: this.action_unit({ cache: cache }),
                show_planet_colonized_notification: _.boolean('default=true'),

                buff_on_clone: cache.buffs,
                clone_count: cache.action_values('default=1'),
                clone_forward: Definitions.action_direction(ctx, ptr, cache),
                clone_spawn_position: Definitions.action_position(ctx, ptr, cache, json, 0, 2),
                copy_destination_unit_state: _.boolean('default=false'),
                copy_parent_buff_memory_values: _.boolean('default=false'),
                initial_float_values: _.exclusiveArray({
                    items: _.object({
                        required: ['float_variable_id', 'value_id'],
                        keys: {
                            float_variable_id: cache.float_variables,
                            value_id: cache.action_values(),
                        },
                    }),
                    minItems: 1,
                    maxItems: 4,
                }),
                override_ownership_unit: this.action_unit({ cache: cache }),

                asset_type: Definitions.resources(),
                asset_value: cache.action_values(),
                context: '',
                destination_unit: this.action_unit({ cache: cache, desc: 'default=operand_destination' }),
                log_different_fixtures_as_unique_events: _.boolean('default=false'),

                give_assets_context: this.player_asset_delta_source('default=action'),
                give_exotic_context: this.exotic_context(),
                rewards_destination_player: this.action_player(cache),
                experience_value: cache.action_values(),
                level_cap_value: cache.action_values(),

                exotics: this.exotics(cache),

                skip_awarding_experience: _.boolean('default=true'),
                skip_death_sequence: _.boolean('default=false'),
                skip_player_statistics: _.boolean('default=true'),

                effect_definition: Definitions.effect_definition(cache),
                mesh_point: Definitions.meshpoint(),
                effects: Definitions.weapon_effects_definition(cache),
                effect_alias_binding: Definitions.action_effect_alias_binding(),
                charge_duration: cache.action_values(),
                beam_duration: cache.action_values(),

                antimatter_remove_value: cache.action_values(),
                antimatter_restore_value: cache.action_values(),

                affect_type: Definitions.damage_affect_type(),
                can_damage_be_propagated: _.boolean('default=true'),
                ignore_infinite_recursion_guard: _.boolean('default=false'),
                repair_value: cache.action_values(),
                source_unit: Definitions.action_unit({ cache: cache, desc: 'default=first_spawner' }),
                restore_amount_value: cache.action_values(),

                destination_position: this.action_position(ctx, ptr, cache, json, 0, 2),
                destination_reference_unit: Definitions.action_unit({ cache: cache }),
                units: Definitions.spawn_units_definition(cache),
                arrival_delay_value: cache.action_values(),
                available_supply_value: cache.action_values(),
                check_research_prerequisites: _.boolean(),
                constrain_available_supply_to_owner_player: _.boolean(),
                in_hyperspace: _.boolean(),
                owner_player: Definitions.action_player(cache),
                source_gravity_well: Definitions.action_unit({ cache: cache }),
                destination_gravity_well: Definitions.action_unit({ cache: cache }),
                special_operation_unit_kind: cache.special_operation_kinds,
                suppress_ui_notifications: _.boolean('default=true'),
                build_strikecraft_count: cache.action_values(),
                buff_on_strikecraft: cache.buffs,
                strikecraft_count_value: cache.action_values(),

                ignore_research: _.boolean('if true the levels added even if player does not have research to support these track levels'),
                level_count_value: cache.action_values(),
                planet_track_type: Definitions.planet_track_type(),
                will_offset_development_track_upgrade_price: _.boolean(),
                unit_item: cache.unit_items,

                constraint: this.action_constraint(ctx, ptr, cache, json),
            },
        })
    }

    static action_position(ctx, ptr, cache, json, depth = 0, maxDepth = 5) {
        if (depth > maxDepth) return {}

        try {
            if (ctx?.source_position) {
                this.validateActionPosition(ctx.source_position, ptr + '/source_position', json)
            }
            if (ctx?.clone_spawn_position) {
                this.validateActionPosition(ctx.clone_spawn_position, ptr + '/clone_spawn_position', json)
            }
        } catch {}

        return _.object({
            required: ['position_type'],
            keys: {
                position_type: this.position_type(),
                ability: this.action_ability(cache),
                ability_position_picking_type: this.ability_position_picking_type(),
                direction: Definitions.action_direction(ctx, ptr, cache, depth + 1, 2),
                unit_forward: Definitions.action_direction(ctx, ptr, cache, depth + 1, 2),
                distance_value: cache.action_values(),
                ability_position_index: _.integer(),
                offset_position: _.vector3f(),
                offset_rotation: _.vector9f(),
                source_position: this.action_position(ctx, ptr, cache, json, depth + 1, maxDepth),
                unit: this.action_unit({ cache: cache }),
            },
        })
    }

    static target_sort_steps(ctx, ptr, cache, json) {
        try {
            if (Array.isArray(ctx)) {
                ctx.forEach((action, idx) => {
                    const sort_steps = action.resurrection_sort.sort_steps || action.target_sort.sort_steps
                    for (let i = 0; i < sort_steps.length; i++) {
                        if (sort_steps[i].sort_type == 'distance_to_unit') {
                            json.validate_keys(ptr + `/${idx}/resurrection_sort/sort_steps/${i}`, sort_steps[i], ['distance_reference_unit'], [])
                        } else {
                            json.validate_keys(ptr + `/${idx}/resurrection_sort/sort_steps/${i}`, sort_steps[i], [], ['distance_reference_unit'])
                        }
                    }
                })
            }
        } catch {}
        return _.object({
            keys: {
                sort_steps: _.array({
                    items: _.object({
                        required: ['sort_order', 'sort_type'],
                        keys: {
                            sort_type: _.enumerate({
                                items: ['build_or_virtual_supply', 'distance_to_unit'],
                            }),
                            sort_order: _.enumerate({
                                items: ['ascending', 'descending'],
                            }),
                            distance_reference_unit: this.action_unit({ cache: cache }),
                        },
                    }),
                }),
            },
        })
    }

    static action_unit({ cache: cache, desc: desc = '' }) {
        return _.object({
            desc: desc,
            required: ['unit_type'],
            keys: {
                memory_unit_variable_id: cache.unit_variables,
                unit_type: Definitions.unit_type(),
                redirection: Definitions.redirection(),
            },
        })
    }

    static validateConstraints(ctx, ptr, json) {
        const _ = [
            'constraint',
            'constraints',
            'unit_definition',
            'max_jump_distance',
            'targeter_relationship_type',
            'buff',
            'include_pending_buffs',
            'amount_missing_threshold',
            'percentage_missing_threshold',
            'strikecraft_kind',
            'mutation',
            'comparison_type',
            'permission_type',
            'weapon_type',
            'tag',
            'planet_types',
            'asset_type',
            'ship_roles',
            'value_source',
            'internal_level',
            'must_be_functional',
            'ignore_current_ownership',
            'has_base_culture_rate',
            'slot_type',
            'dominant_culture_player_relationship',
        ]
        try {
            switch (ctx.constraint_type) {
                case 'composite_not':
                    json.validate_keys(ptr, ctx, ['constraint'], _)
                    if (ctx.constraint) {
                        this.validateConstraints(ctx.constraint, `${ptr}/constraint`, json)
                    }
                    break
                case 'composite_or':
                case 'composite_and':
                    json.validate_keys(ptr, ctx, ['constraints'], _)
                    if (Array.isArray(ctx.constraints)) {
                        ctx.constraints.forEach((_cns, cnsIdx) => {
                            this.validateConstraints(_cns, `${ptr}/constraints/${cnsIdx}`, json)
                        })
                    }
                    break
                case 'has_definition':
                    json.validate_keys(ptr, ctx, ['unit_definition'], _)
                    break
                case 'has_adjacent_planet_with_ownership':
                    json.validate_keys(ptr, ctx, ['targeter_relationship_type'], _, ['max_jump_distance'])
                    break
                case 'has_buff':
                    json.validate_keys(ptr, ctx, ['buff'], _, ['include_pending_buffs'])
                    break
                case 'has_missing_hull':
                case 'has_missing_armor':
                case 'has_missing_antimatter':
                case 'has_missing_shields':
                    json.validate_keys(ptr, ctx, [], _, ['percentage_missing_threshold', 'amount_missing_threshold'])
                    break
                case 'has_missing_strikecraft':
                    json.validate_keys(ptr, ctx, [], _, ['percentage_missing_threshold', 'amount_missing_threshold', 'strikecraft_kind'])
                    break
                case 'has_mutation':
                    json.validate_keys(ptr, ctx, ['mutation'], _)
                    break
                case 'has_permission':
                    json.validate_keys(ptr, ctx, ['permission_type'], _)
                    break
                case 'has_recently_fired_weapon':
                    json.validate_keys(ptr, ctx, [], _, ['weapon_type'])
                    break
                case 'has_weapon':
                    json.validate_keys(ptr, ctx, [], _, ['weapon_type', 'tag'])
                    break
                case 'has_planet_type':
                    json.validate_keys(ptr, ctx, ['planet_types'], _)
                    break
                case 'has_ship_role':
                    json.validate_keys(ptr, ctx, ['ship_roles'], _)
                    break
                case 'has_unit_level':
                    if (ctx?.value_source == 'internal') {
                        json.validate_keys(ptr, ctx, ['internal_level'], _)
                    }
                    json.validate_keys(ptr, ctx, ['comparison_type', 'value_source'], _)
                    break
                case 'weapon_has_target':
                    json.validate_keys(ptr, ctx, [], _, ['weapon_type'])
                    break
                case 'is_asteroid':
                    json.validate_keys(ptr, ctx, ['asset_type'], _)
                    break
                case 'is_colonizable_planet':
                    json.validate_keys(ptr, ctx, [], _, ['ignore_current_ownership'])
                    break
                case 'is_culture_provider':
                    json.validate_keys(ptr, ctx, [], _, ['has_base_culture_rate'])
                    break
                case 'is_home_planet':
                    json.validate_keys(ptr, ctx, [], _, ['targeter_relationship_type'])
                    break
                case 'is_unit_factory':
                    json.validate_keys(ptr, ctx, [], _, ['must_be_functional'])
                    break
                case 'is_structure_with_slot_type':
                    json.validate_keys(ptr, ctx, ['slot_type'], _, [])
                    break
                case 'is_in_dominant_culture':
                    json.validate_keys(ptr, ctx, ['dominant_culture_player_relationship'], _, [])
                    break
                case 'is_in_current_gravity_well':
                case 'is_in_fleet':
                case 'is_friendly':
                case 'is_detected':
                case 'is_dead_soon':
                case 'is_building_structures':
                case 'has_orders':
                case 'has_recently_been_damaged':
                case 'is_structure_plate_spin_changing':
                case 'has_ability':
                case 'is_fully_built':
                case 'has_build_price':
                case 'is_unit_factory_building_units':
                case 'is_explored_planet':
                case 'is_bombing_planet':
                case 'is_carrier':
                case 'is_always_a_threat':
                case 'has_experience':
                case 'has_shields':
                case 'has_health':
                case 'not_self':
                case 'is_structure_builder':
                case 'can_ever_move':
                case 'is_inner_planet':
                case 'has_antimatter':
                case 'can_ever_hyperspace':
                    json.validate_keys(ptr, ctx, [], _)
                    break
                default:
                    break
            }
        } catch {}

        if (ctx?.constraint) {
            this.validateConstraints(ctx?.constraint, `${ptr}/constraint`, json)
        } else if (ctx?.unit_constraint) {
            this.validateConstraints(ctx?.unit_constraint, `${ptr}/unit_constraint`, json)
        } else if (ctx?.operators_constraint) {
            this.validateConstraints(ctx?.operators_constraint, `${ptr}/operators_constraint`, json)
        }
    }

    static target_filter_definition(ctx, ptr, cache, json) {
        try {
            if (Array.isArray(ctx.constraints)) {
                ctx.constraints.forEach((constraint, idx) => {
                    Definitions.validateConstraints(constraint, `${ptr}/constraints/${idx}`, json)
                })
            }

            if (Array.isArray(ctx)) {
                ctx.forEach((_target_filter, idx) => {
                    let target_filter_ptr = ptr + `/${idx}/target_filter`
                    const target_filter = _target_filter.target_filter

                    target_filter.constraints.forEach((constraint, constraintIdx) => {
                        Definitions.validateConstraints(constraint, `${target_filter_ptr}/constraints/${constraintIdx}`, json)
                    })
                })
            }
        } catch {}
        return _.object({
            required: ['ownerships'],
            keys: {
                ownerships: Definitions.ownerships(),
                constraints: _.array({
                    items: this.constraint(ctx, ptr, cache, json, 0, 1),
                }),
                respect_can_be_targeted_permissions: _.boolean('default=true'),
                unit_types: _.array({ items: Definitions.target_filter_unit_type(), isUnique: true }),
                unit_definitions: _.array({ items: cache.units, isUnique: true }),
                exemptions: _.array({ items: this.exemptions(), isUnique: true }),
            },
        })
    }

    static constraint(ctx, ptr, cache, json, depth = 0, maxDepth = 5) {
        if (depth > maxDepth) return {}

        Definitions.validateConstraints(ctx, ptr, json)

        return _.object({
            required: ['constraint_type'],
            keys: {
                constraint_type: Definitions.constraint_type(),
                constraint: this.constraint(ctx?.constraint, ptr + '/constraint', cache, json, depth + 1, maxDepth),
                constraints: _.array({
                    items: this.constraint(ctx?.constraints, ptr + '/constraints', cache, json, depth + 1, maxDepth),
                }),
                unit_definition: cache.units,
                max_jump_distance: _.integer(true, 'how many jumps to consider as adjacent. Must be > 0. Default = 1'),
                targeter_relationship_type: Definitions.relationship_type(),
                buff: cache.buffs,
                include_pending_buffs: _.boolean('default=false'),
                amount_missing_threshold: _.float(),
                percentage_missing_threshold: _.percentage(),
                strikecraft_kind: cache.strikecraft_kinds,
                mutation: cache.mutations,
                comparison_type: Definitions.comparison_type(),
                permission_type: Definitions.permission_type(),
                weapon_type: Definitions.weapon_type(),
                tag: cache.weapon_tags,
                planet_types: _.array({ items: cache.planets, isUnique: true }),
                asset_type: Definitions.resources(),
                ship_roles: Definitions.ship_roles(),
                value_source: Definitions.value_source(),
                internal_level: _.integer(),
                must_be_functional: _.boolean('default=false'),
                ignore_current_ownership: _.boolean('default=false'),
                has_base_culture_rate: _.boolean(),
                slot_type: Definitions.domain(),
                dominant_culture_player_relationship: Definitions.relationship_type('relationship between targeter player and culture player'),
            },
        })
    }

    static target_filter(json, cache, ctx = '', ptr = '') {
        return _.object({
            required: ['ownerships'],
            keys: {
                exemptions: _.array({ items: this.exemptions(), isUnique: true }),
                ownerships: this.ownerships(),
                respect_can_be_targeted_permissions: _.boolean('default=true'),
                unit_definitions: _.array({ items: cache.units, isUnique: true }),
                unit_types: _.array({ items: this.target_filter_unit_type(), isUnique: true }),
                constraints: Definitions.constraint(ctx, ptr, cache, json),
            },
        })
    }

    static sound(data) {
        return _.object({
            keys: {
                sound: data['ogg'],
                is_dialogue: _.boolean(),
            },
            required: ['sound'],
        })
    }
    static direction_type() {
        return _.enumerate({
            items: [
                'random_direction',
                'from_unit_to_target_position',
                'from_position_to_position',
                'operand_position_forward',
                'unit_forward',
                'unit_cross',
                'unit_up',
                'galaxy_up',
            ],
        })
    }
    static position_type() {
        return _.enumerate({
            items: ['target_position', 'ability_position', 'unit_position', 'operand_position', 'distance_in_direction_from_position'],
        })
    }

    static action_direction(ctx, ptr, cache, depth = 0, maxDepth = 2) {
        if (depth > maxDepth) return {}
        return _.object({
            required: ['direction_type'],
            keys: {
                direction_type: this.direction_type(),
                source_position: this.action_position(ctx, ptr, cache, depth + 1, maxDepth),
                destination_position: this.action_position(ctx, ptr, cache, depth + 1, maxDepth),
                unit: this.action_unit({ cache: cache }),
            },
        })
    }
    static ability_type() {
        return _.enumerate({
            items: ['source_ability', 'all_abilities', 'ability_at_index', 'trigger_event_context_ability'],
        })
    }
    static action_effect_alias_binding(desc = '') {
        return _.enumerate({
            desc: desc,
            items: ['unit_skin', 'action_data_source'],
        })
    }

    static planet_track_type() {
        return _.enumerate({
            items: ['defense', 'logistics', 'commerce', 'mining', 'research', 'surveying'],
        })
    }

    static targeting_ui() {
        return _.enumerate({
            items: ['positive', 'negative', 'send_pirate_raid'],
        })
    }
    static damage_source() {
        return _.enumerate({
            items: ['ability', 'debug', 'weapon'],
        })
    }

    static player_type() {
        return _.enumerate({
            items: ['unit_owner', 'buff_owner_player', 'ability_npc_player'],
        })
    }

    static ability_position_picking_type() {
        return _.enumerate({
            items: ['random', 'next_sequential', 'at_index'],
        })
    }

    static effect_by_size(cache) {
        return _.object({
            required: ['large_unit', 'medium_unit', 'small_unit'],
            keys: {
                small_unit: cache['effect_alias_bindings'],
                medium_unit: cache['effect_alias_bindings'],
                large_unit: cache['effect_alias_bindings'],
            },
        })
    }

    static meshpoint() {
        return _.string("Name of the mesh point assigned to the ship's model")
    }

    static effect_definition(cache) {
        return _.object({
            keys: {
                /* game_version v28.16 */
                allow_binding_of_unit_skin_without_unit: _.boolean('default=false'),
                /* */
                binding: this.action_effect_alias_binding(),
                effect_by_size: this.effect_by_size(cache),
                effect: cache['effect_alias_bindings'],
                mesh_point: this.meshpoint(),
                mesh_point_usage: _.enumerate({
                    desc: 'default=first',
                    items: ['index', 'index', 'all'],
                }),
                mesh_point_index: _.integer(),
                only_visible_if_mesh_is_visible: _.boolean(),
            },
        })
    }

    static ability() {
        return _.object({
            keys: {
                ability_type: this.ability_type(),
                unit_with_abilities: _.object({
                    keys: {
                        unit_type: this.unit_type(),
                    },
                }),
                unit: this.unit(),
            },
        })
    }

    static npc_sound_ids() {
        return _.enumerate({
            items: [
                'use_ability_generic',
                'use_ability_raid_0',
                'use_ability_raid_1',
                'use_ability_purchase_item',
                'reputation_level_increased',
                'insufficient_influence_points',
                'auction_started',
                'auction_won',
                'auction_lost',
                'auction_ignored',
                'attacking',
            ],
        })
    }

    static sound_ids() {
        return _.enumerate({
            items: [
                'set_rally_point',
                'set_unit_factory_deliverable_destination',
                'build_structure',
                'set_planet_structure_plate_spin',
                'ping_attention',
                'ping_attack',
                'ping_defend',
                'ping_received_attention',
                'ping_received_attack',
                'ping_received_defend',
                'control_group_created',
                'civilian_research_subject_completed',
                'military_research_subject_completed',
                'victory_condition_alliance_guard_research_subject_completed',
                'ally_victory_condition_alliance_guard_research_subject_completed',
                'civilian_research_domain_tier_acquired',
                'military_research_domain_tier_acquired',
                'planet_being_bombed',
                'ally_planet_being_bombed',
                'planet_discovered',
                'planet_colonized',
                'planet_lost',
                'ally_planet_lost',
                'capital_planet_changed',
                'capital_planet_being_bombed',
                'ally_capital_planet_being_bombed',
                'capital_planet_nearly_lost',
                'capital_planet_lost',
                'ally_capital_planet_lost',
                'enemy_capital_planet_lost',
                'player_won',
                'player_won_diplomatic',
                'player_lost',
                'ally_player_lost',
                'enemy_player_lost',
                'enemy_player_lost_by_player',
                'nothing_surveyed',
                'exotics_surveyed',
                'planet_artifact_surveyed',
                'planet_bonus_surveyed',
                'planet_track_upgrade_defense_completed',
                'planet_track_upgrade_logistics_completed',
                'planet_track_upgrade_commerce_completed',
                'planet_track_upgrade_mining_completed',
                'planet_track_upgrade_research_completed',
                'planet_component_finished_building',
                'orbital_cannon_shell_detected',
                'enemy_units_incoming',
                'enemy_units_arrived',
                'enemy_planet_made_dead_from_bombing',
                'pirate_units_arrived',
                'ally_special_operations_units_arrived',
                'enemy_special_operations_units_arrived',
                'insufficient_credits',
                'insufficient_metal',
                'insufficient_crystal',
                'insufficient_civilian_structure_slots',
                'insufficient_civilian_structure_slots_at_max',
                'insufficient_military_structure_slots',
                'insufficient_military_structure_slots_at_max',
                'insufficient_unit_supply',
                'insufficient_unit_supply_at_max_supply',
                'insufficient_antimatter',
                'research_prerequisites_not_met',
                'wormhole_travel_research_prerequisites_not_met',
                'insufficient_civilian_research_points',
                'insufficient_military_research_points',
                'position_has_overlapped_unit',
                'generic_order_issued',
                'generic_attack_order_issued',
                'generic_cannot_hyperspace',
                'generic_joined_fleet',
                'fleet_created',
                'buy_npc_market_asset',
                'sell_npc_market_asset',
                'npc_metal_market_exclusive_player_started_positive',
                'npc_metal_market_exclusive_player_started_negative',
                'npc_crystal_market_exclusive_player_started_positive',
                'npc_crystal_market_exclusive_player_started_negative',
                'ally_capital_ship_destroyed',
                'ally_starbase_destroyed',
                'ally_titan_destroyed',
                'ally_titan_built',
                'enemy_titan_built',
                'military_structure_built',
                'civilian_structure_built',
                'enemy_phase_jump_inhibitor_built',
                'player_units_arrived_at_enemy_phase_jump_inhibitor',
                'fleet_arrived',
                'ally_fleet_arrived',
                'reinforcing_fleet_arrived',
                'ally_reinforcing_fleet_arrived',
                'ally_reinforcing_fleet_incoming',
                'fleet_under_attack',
                'ally_fleet_under_attack',
                'destroy_planet_started',
                'destroy_planet_rewards_given',
                'game_paused',
                'game_unpaused',
                'small_unit_factory_needed',
                'medium_unit_factory_needed',
                'large_unit_factory_needed',
                'insufficient_offense_exotics',
                'insufficient_defense_exotics',
                'insufficient_utility_exotics',
                'insufficient_economic_exotics',
                'insufficient_ultimate_exotics',
                'insufficient_generic_exotics',
                'scuttle_planet_started',
                'scuttle_unit_started',
                'insufficient_unity_points',
                'insufficient_unity_mana',
                'unity_ability_cooldown_is_not_completed',
                'player_added_first_ruler_ship',
                'planet_conversion_started',
                'planet_conversion_colonized',
                'alliance_offered_cease_fire',
                'alliance_offered_share_vision',
                'alliance_offered_synergy',
                'alliance_accepted_cease_fire',
                'alliance_accepted_share_vision',
                'alliance_accepted_synergy',
                'alliance_broken_cease_fire',
                'alliance_offered_share_vision_aggressive',
                'alliance_offered_synergy_aggressive',
                'alliance_accepted_share_vision_aggressive',
                'alliance_accepted_synergy_aggressive',
                'alliance_broken_cease_fire_aggressive',
                'artifact_captured',
                'click_failed',
            ],
        })
    }

    static arbitary_research_line_definition(cache) {
        return _.object({
            keys: {
                after_number: _.integer(),
                after_text: _.string(),
                before_after_heading: _.string(),
                before_number: _.integer(),
                float_format: this.value_float_format(),
                heading: cache.localisation,
                sub_heading_before_empire_modifier: cache.localisation,
                unit_label: cache.localisation,
                units_listing: _.array({ items: cache.units, isUnique: true }),
                unlock_label: cache.localisation,
                upgrade_label: cache.localisation,
            },
        })
    }

    static buff_made_dead_context() {
        return _.enumerate({
            items: [
                'duration_expired',
                'all_finite_time_actions_done',
                'owner_unit_made_dead',
                'necessary_parent_buff_made_dead',
                'necessary_child_buff_made_dead',
                'necessary_source_ability_released',
                'necessary_source_ability_slot_made_unbuilt',
                'watched_buff_ability_stopped',
                'distance_to_parent_buff_exceeded',
                'made_dead_by_action',
                'stack_limit_exceeded',
                'no_longer_affected_by_buff_provider_research',
                'passive_action_not_operational',
                'current_spawner_ownership_changed',
            ],
        })
    }

    static action_constraint_buff_type(desc = '') {
        return _.enumerate({ desc: desc, items: ['current_buff', 'parent_buff', 'operand_buff'] })
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

    static windfall_definition(data) {
        return _.object({
            keys: {
                units_given: this.spawn_units_definition(data),
                mana_given: _.float(),
                influence_points_given: _.integer(),
                exotics_given: _.array({
                    items: _.object({
                        required: ['count', 'exotic_type'],
                        keys: {
                            exotic_type: data['exotics'],
                            count: _.integer(),
                        },
                    }),
                }),
            },
        })
    }

    static npc_rewards(npc_rewards) {
        return _.array({
            items: _.object({
                keys: {
                    weight: _.float(),
                    npc_reward: npc_rewards,
                },
            }),
        })
    }

    static exotic_amounts(cache) {
        return _.array({
            items: _.object({
                required: ['count_value', 'exotic_type'],
                keys: {
                    exotic_type: cache.exotics,
                    count_value: cache.action_values(),
                },
            }),
        })
    }

    static exotics(cache) {
        return _.object({
            keys: {
                exotics_source_type: _.enumerate({
                    items: ['unit_build_cost', 'explicit_amount'],
                }),
                source_unit: _.object({
                    keys: {
                        unit_type: this.unit_type(),
                    },
                }),
                exotic_amounts: this.exotic_amounts(cache),
            },
        })
    }

    static spawn_type() {
        return _.enumerate({
            items: ['build_from_factory', 'hyperspace_in'],
        })
    }

    static formation_type() {
        return _.enumerate({ items: ['ships_and_structures', 'strikecraft_only'] })
    }

    static resources() {
        return _.enumerate({
            items: ['credits', 'metal', 'crystal'],
        })
    }

    static give_exotic_context(desc = '') {
        return _.enumerate({
            desc: desc,
            items: [
                'starting',
                'npc_reward',
                'surveying',
                'factory',
                'alliance_offer',
                'derelict_loot',
                'wreckage_loot',
                'refund',
                'action',
                'research_windfall',
                'destroy_planet_rewards',
            ],
        })
    }

    static validateExoticsAction(ctx, ptr, json) {
        try {
            switch (ctx?.exotics?.exotics_source_type) {
                case 'explicit_amount':
                    json.validate_keys(ptr + `/exotics`, ctx?.exotics, ['exotic_amounts'], ['source_unit'], [])
                    break
                case 'unit_build_cost':
                    json.validate_keys(ptr + `/exotics`, ctx?.exotics, ['source_unit'], ['exotic_amounts'], [])
                    break
            }
        } catch {}
    }

    static action_exotics(ctx, ptr, cache, json) {
        const json_builder = {}
        try {
            if (Array.isArray(ctx)) {
                ctx.forEach((action, idx) => {
                    switch (action.exotics.exotics_source_type) {
                        case 'explicit_amount':
                            json_builder['exotic_amounts'] = this.exotic_amounts(cache)
                            json.validate_keys(ptr + `/${idx}/exotics`, action.exotics, ['exotic_amounts'], ['source_unit'])
                            break
                        case 'unit_build_cost':
                            json_builder['source_unit'] = this.action_unit({ cache: cache })
                            json.validate_keys(ptr + `/${idx}/exotics`, action.exotics, ['source_unit'], ['exotic_amounts'])
                            break
                    }
                })
            }
        } catch {}
        return _.object({
            required: ['exotics_source_type'],
            keys: {
                exotics_source_type: _.enumerate({ items: ['explicit_amount', 'unit_build_cost'] }),
                ...json_builder,
            },
        })
    }

    static player_asset_delta_source(desc = '') {
        return _.enumerate({
            desc: desc,
            items: [
                'debug',
                'npc_reward',
                'npc_market_buy_metal',
                'npc_market_sell_metal',
                'npc_market_buy_crystal',
                'npc_market_sell_crystal',
                'npc_market_sell_exotic',
                'alliance_offer_updated',
                'alliance_offer_accepted',
                'derelict_loot',
                'wreckage_loot',
                'action',
                'refund',
                'losing_auction_refund',
                'starting',
                'trade_ship_killed',
                'synergy_ally_dead',
                'surveying_reward',
            ],
        })
    }

    static price(desc = '') {
        return _.object({
            keys: {
                credits: _.float(true, desc),
                metal: _.float(true, desc),
                crystal: _.float(true, desc),
            },
        })
    }

    static trigger_event_type() {
        return _.enumerate({
            items: [
                'on_ability_started',
                'on_ability_executed',
                'on_ability_level_changed',
                'on_buff_started',
                'on_child_buff_started',
                'on_buff_stacking_limit_met',
                'on_buff_made_dead',
                'on_parent_buff_made_dead',
                'on_child_buff_made_dead',
                'on_current_spawner_antimatter_consumed',
                'on_current_spawner_antimatter_restored',
                'on_current_spawner_antimatter_removed',
                'on_current_spawner_augment_pending_damage_as_source',
                'on_current_spawner_augment_pending_damage_as_destination',
                'on_current_spawner_damaged',
                'on_current_spawner_planet_bombed',
                'on_current_spawner_hull_restored',
                'on_current_spawner_armor_restored',
                'on_current_spawner_shields_restored',
                'on_current_spawner_try_make_dead',
                'on_current_spawner_made_dead',
                'on_current_spawner_planet_made_dead',
                'on_current_spawner_planet_track_completed',
                'on_current_spawner_planet_track_queue_increased',
                'on_current_spawner_player_ownership_changed',
                'on_current_spawner_current_gravity_well_changed',
                'on_current_spawner_current_gravity_well_fixture_ownership_changed',
                'on_current_spawner_current_gravity_well_occupied_with_enemy_units',
                'on_current_spawner_current_gravity_well_unoccupied_with_enemy_units',
                'on_current_spawner_current_gravity_well_allied_player_count_changed',
                'on_current_spawner_physics_destination_reached',
                'on_current_spawner_spawned_strikecraft',
                'on_current_spawner_spawned_torpedo',
                'on_current_spawner_hyperspace_started',
                'on_current_spawner_hyperspace_stopped',
                'on_current_spawner_planet_scuttle_completed',
                'on_current_spawner_planet_colonized',
                'on_current_spawner_unit_level_changed',
                'on_try_prevent_damage',
                'on_unit_antimatter_removed_by_current_spawner',
                'on_unit_antimatter_restored_by_current_spawner',
                'on_unit_damaged_by_current_spawner',
                'on_unit_planet_bombed_by_current_spawner',
                'on_unit_hull_restored_by_current_spawner',
                'on_unit_armor_restored_by_current_spawner',
                'on_unit_shields_restored_by_current_spawner',
                'on_unit_made_dead_by_current_spawner',
                'on_unit_planet_made_dead_by_current_spawner',
                'on_phase_lanes_changed',
                'on_unit_finished_building_in_gravity_well',
            ],
        })
    }
}
