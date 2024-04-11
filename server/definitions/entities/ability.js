const { schema, enumerate, object, array, IfMap, percentage, boolean, angle, vector3, If, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Ability extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache

        this.json = JSON.parse(fileText)
    }

    level_source() {
        return enumerate({
            items: ['npc_reputation_level', 'research_prerequisites_per_level', 'unit_item', 'internal_level'],
        })
    }

    create() {
        return schema({
            keys: {
                version: float(),
                action_data_source: this.cache.action_data_sources,
                is_ultimate_ability: boolean(),
                level_source: this.level_source(),
                level_prerequisites: array({
                    items: super.getResearchSubjects(this.cache.research_subjects),
                    isUnique: true,
                }),
                min_required_unit_levels: array({
                    items: float(),
                }),
                min_required_npc_reputation_levels: array({
                    items: float(),
                }),
                passive_actions: object({
                    keys: {
                        update_interval: float(),
                        persistant_buff: this.cache.buffs,
                        only_if_owner_unit_operational: boolean(),
                        actions: object({
                            keys: {
                                actions: super.getActions({
                                    weapon_tags: this.cache.weapon_tags,
                                    buffs: this.cache.buffs,
                                    mutations: this.cache.mutations,
                                    npc_rewards: this.cache.npc_rewards,
                                    exotics: this.cache.exotics,
                                    units: this.cache.units,
                                    unit_items: this.cache.unit_items,
                                    abilities: this.cache.abilities,
                                    action_values: this.cache.action_values,
                                    target_filters: this.cache.target_filters,
                                    particle_effects: this.cache.particle_effects,
                                    effect_alias_bindings: this.cache.effect_alias_bindings,
                                    float_variables: this.cache.float_variables,
                                    buff_actions: this.cache.buff_actions,
                                    unit_variables: this.cache.unit_variables,
                                    special_operation_unit_kind: this.cache.special_operation_kinds,
                                }),
                            },
                        }),
                    },
                }),
                active_actions: object({
                    keys: {
                        stop_use_type: enumerate({
                            items: ['on_spawned_buff_removed'],
                        }),
                        targeting_type: enumerate({
                            items: ['untargeted', 'unit_targeted', 'position_targeted'],
                        }),
                        spawned_unit: object({
                            keys: {
                                unit: this.cache.units,
                                max_count_in_gravity_well: this.cache.action_values,
                                special_operation_unit_kind: this.cache.special_operation_kinds,
                                gravity_well_primary_planet_target_filter: this.cache.target_filters,
                            },
                        }),
                        targeting_ui: super.getTargetingUi,
                        target_alert: enumerate({
                            items: ['targeted_by_ability'],
                        }),
                        target_filters: array({
                            items: this.cache.target_filters,
                            isUnique: true,
                        }),
                        between_gravity_well_range: this.cache.action_values,
                        range: this.cache.action_values,
                        spawned_unit_for_queries: this.cache.units,
                        use_build_radius_as_targeting_radius: boolean(),
                        watched_buff: this.cache.buffs,
                        move_alignment: object({
                            keys: {
                                type: super.getAlignmentType,
                                angle: angle(),
                                allow_opposite_angle: boolean(),
                            },
                        }),
                        firing_angle: angle(),
                        cooldown_time: this.cache.action_values,
                        credits_cost: this.cache.action_values,
                        required_available_supply: this.cache.action_values,
                        antimatter_cost: this.cache.action_values,
                        hull_cost: this.cache.action_values,
                        radius: this.cache.action_values,
                        actions: object({
                            keys: {
                                actions: array({
                                    items: object({
                                        condition: If({
                                            key: 'action_type',
                                            value: 'use_unit_operators_on_units_owned_by_player',
                                            requires: ['player'],
                                            properties: {
                                                player: object({
                                                    keys: {
                                                        player_type: enumerate({ items: ['ability_npc_player'] }),
                                                        ability: object({
                                                            keys: {
                                                                ability_type: super.getAbilityType,
                                                            },
                                                        }),
                                                    },
                                                }),
                                            },
                                        }),
                                        keys: {
                                            player: '',
                                            constraint: super.getConstraint(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.target_filters, this.cache.float_variables, this.cache.unit_variables, this.cache.units),
                                            action_type: super.getActionType,
                                            chain_target_filter_id: this.cache.target_filters,
                                            chain_range_value: this.cache.action_values,
                                            target_filter_id: this.cache.target_filters,
                                            chain_delay: float(),
                                            include_radius_origin_unit: boolean(),
                                            gravity_well_origin_unit: object({
                                                keys: {
                                                    unit_type: super.getUnitType,
                                                },
                                            }),
                                            radius_origin_unit: object({
                                                keys: {
                                                    unit_type: super.getUnitType,
                                                },
                                            }),
                                            first_source_unit: object({
                                                keys: {
                                                    unit_type: super.getUnitType,
                                                },
                                            }),
                                            first_destination_unit: object({
                                                keys: {
                                                    unit_type: super.getUnitType,
                                                },
                                            }),
                                            operators_constraint: this.getConstraint(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.target_filters, this.cache.float_variables, this.cache.unit_variables, this.cache.units),
                                            position: super.getPosition,
                                            travel_time: object({
                                                keys: {
                                                    travel_time_source: enumerate({
                                                        items: ['explicit_time', 'speed_and_distance'],
                                                    }),
                                                    explicit_time_value: this.cache.action_values,
                                                    travel_speed_value: this.cache.action_values,
                                                },
                                            }),
                                            position_operators: super.getPositionOperators(this.cache.particle_effects, this.cache.effect_alias_bindings, this.cache.units, this.cache.buffs, this.cache.special_operation_kinds),
                                            range_value: this.cache.action_values,
                                            radius_value: this.cache.action_values,
                                            max_target_count_value: this.cache.action_values,
                                            max_jump_distance_value: this.cache.action_values,
                                            destination_unit: super.getDestinationUnit,
                                            operators: super.getOperators({
                                                units: this.cache.units,
                                                unit_items: this.cache.unit_items,
                                                abilities: this.cache.abilities,
                                                weapon_tags: this.cache.weapon_tags,
                                                action_values: this.cache.action_values,
                                                buffs: this.cache.buffs,
                                                mutations: this.cache.mutations,
                                                particle_effects: this.cache.particle_effects,
                                                effect_alias_bindings: this.cache.effect_alias_bindings,
                                                target_filters: this.cache.target_filters,
                                                float_variables: this.cache.float_variables,
                                                unit_variables: this.cache.unit_variables,
                                                special_operation_unit_kind: this.cache.special_operation_kinds,
                                            }),
                                        },
                                    }),
                                }),
                            },
                        }),
                        auto_cast: object({
                            keys: {
                                type: enumerate({
                                    items: ['pick_planet_anywhere', 'pick_planet_within_gravity_well_distance'],
                                }),
                                gravity_well_distance_range: this.cache.action_values,
                                enabled_by_default_behavior: enumerate({
                                    items: ['always', 'never', 'if_no_deliverable_destination'],
                                }),
                                disabled_if_any_enemy_primary_ship_role_in_gravity_well_exists: enumerate({
                                    items: ['bomb_planet'],
                                }),
                                target_definitions: array({
                                    items: object({
                                        keys: {
                                            target_filter: this.cache.target_filters,
                                            target_constraint: object({
                                                keys: {
                                                    constraint_type: super.getConstraintType,
                                                    value_a: this.cache.action_values,
                                                    comparison_type: super.getComparisonType,
                                                    value_b: this.cache.action_values,
                                                    constraints: super.getConstraints(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.units),
                                                },
                                            }),
                                        },
                                    }),
                                }),
                                planet_preference: enumerate({
                                    items: ['highest_mining_track_crystal_income_rate', 'highest_mining_track_metal_income_rate', 'highest_mining_track_credits_income_rate'],
                                }),
                                caster_constraint: object({
                                    keys: {
                                        constraints: super.getConstraints(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.units),
                                        constraint_type: super.getConstraintType,
                                        unit: super.getUnit,
                                        unit_constraint: super.getUnitConstraint(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.units),
                                        percentage_missing_threshold: '',
                                        amount_missing_threshold: '',
                                        radius_origin_unit: object({
                                            keys: {
                                                unit_type: super.getUnitType,
                                            },
                                        }),
                                        target_filter_id: this.cache.target_filters,
                                        radius_value: this.cache.action_values,
                                        target_count_value: this.cache.action_values,
                                    },
                                    condition: IfMap({
                                        key: 'constraint_type',
                                        values: ['has_missing_antimatter', 'has_missing_armor', 'has_missing_strikecraft'],
                                        requires: [],
                                        properties: {
                                            amount_missing_threshold: float(),
                                            percentage_missing_threshold: percentage(),
                                        },
                                    }),
                                }),
                            },
                        }),
                    },
                }),
                gui: object({
                    keys: {
                        hud_icon: this.cache.textures,
                        tooltip_icon: this.cache.textures,
                        name: this.cache.localisation,
                        description: this.cache.localisation,
                        tooltip_lines: super.tooltip_lines(this.cache.localisation, this.cache.unit_items, this.cache.units, this.cache.action_values, this.cache.buff_unit_modifiers, this.cache.weapon_modifier_ids, this.cache.planet_modifier_ids, this.cache.buff_unit_factory_modifiers),
                        tooltip_line_groups: super.tooltip_line_groups(this.cache.localisation, this.cache.unit_items, this.cache.units, this.cache.action_values, this.cache.buff_unit_modifiers, this.cache.weapon_modifier_ids, this.cache.planet_modifier_ids, this.cache.buff_unit_factory_modifiers),
                        range: this.cache.action_values,
                        action: enumerate({
                            items: ['toggle_unit_factory_window', 'explore'],
                        }),
                        targeting: object({
                            keys: {
                                targeting_type: super.getTargetingType,
                                range: '',
                                radius: '',
                                arc_half_angle: '',
                            },
                            condition: If({
                                key: 'targeting_type',
                                value: 'range',
                                requires: ['range'],
                                properties: {
                                    range: this.cache.action_values,
                                },
                                additional: If({
                                    key: 'targeting_type',
                                    value: 'radius',
                                    requires: ['radius'],
                                    properties: {
                                        radius: this.cache.action_values,
                                    },
                                    additional: If({
                                        key: 'targeting_type',
                                        value: 'arc',
                                        requires: ['arc_half_angle'],
                                        properties: {
                                            arc_half_angle: this.cache.action_values,
                                        },
                                        additional: If({
                                            key: 'targeting_type',
                                            value: 'between_gravity_well_range',
                                            requires: ['range'],
                                            properties: {
                                                radius: this.cache.action_values,
                                            },
                                        }),
                                    }),
                                }),
                            }),
                            required: ['targeting_type'],
                        }),
                    },
                }),
                ability_positions: array({
                    items: vector3(),
                }),
            },
        })
    }
}
