const { DiagnosticReporter } = require('../../data/diagnostic-reporter')
const { prerequisites } = require('../definitions')
const { schema, enumerate, object, array, percentage, boolean, angle, vector3f, If, float, version } = require('../data_types')
const Buff = require('./buff')
const Definitions = require('../definitions')
const UI = require('../ui_definitions')

module.exports = class Ability extends Buff {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache)
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    level_source() {
        return enumerate({
            items: ['npc_reputation_level', 'research_prerequisites_per_level', 'unit_item', 'internal_level'],
        })
    }

    create() {
        return schema({
            keys: {
                version: version(),
                action_data_source: this.cache.action_data_sources,
                is_ultimate_ability: boolean(),
                level_source: this.level_source(),
                level_prerequisites: array({
                    items: prerequisites(this.cache.research_subjects),
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
                                actions: super.actions(),
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
                                max_count_in_empire: this.cache.action_values,
                                special_operation_unit_kind: this.cache.special_operation_kinds,
                                gravity_well_primary_planet_target_filter: this.cache.target_filters,
                            },
                        }),
                        targeting_ui: Definitions.getTargetingUi(),
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
                                type: Definitions.alignment_type(),
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
                                        keys: {
                                            player: object({
                                                keys: {
                                                    player_type: enumerate({
                                                        items: ['ability_npc_player'],
                                                    }),
                                                    ability: object({
                                                        keys: {
                                                            ability_type: Definitions.getAbilityType(),
                                                        },
                                                    }),
                                                },
                                            }),
                                            constraint: super.constraint(),
                                            action_type: Definitions.getActionType(),
                                            chain_target_filter_id: this.cache.target_filters,
                                            chain_range_value: this.cache.action_values,
                                            target_filter_id: this.cache.target_filters,
                                            chain_delay: float(),
                                            include_radius_origin_unit: boolean(),
                                            gravity_well_origin_unit: object({
                                                keys: {
                                                    unit_type: Definitions.getUnitType(),
                                                },
                                            }),
                                            radius_origin_unit: object({
                                                keys: {
                                                    unit_type: Definitions.getUnitType(),
                                                },
                                            }),
                                            first_source_unit: object({
                                                keys: {
                                                    unit_type: Definitions.getUnitType(),
                                                },
                                            }),
                                            first_destination_unit: object({
                                                keys: {
                                                    unit_type: Definitions.getUnitType(),
                                                },
                                            }),
                                            operators_constraint: super.constraint(),
                                            position: Definitions.getPosition(),
                                            travel_time: object({
                                                keys: {
                                                    travel_time_source: enumerate({
                                                        items: ['explicit_time', 'speed_and_distance'],
                                                    }),
                                                    explicit_time_value: this.cache.action_values,
                                                    travel_speed_value: this.cache.action_values,
                                                },
                                            }),
                                            position_operators: Definitions.getPositionOperators(this.cache),
                                            range_value: this.cache.action_values,
                                            radius_value: this.cache.action_values,
                                            max_target_count_value: this.cache.action_values,
                                            max_jump_distance_value: this.cache.action_values,
                                            destination_unit: Definitions.getDestinationUnit(),
                                            operators: super.operators(),
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
                                                    constraint_type: Definitions.getConstraintType(),
                                                    value_a: this.cache.action_values,
                                                    comparison_type: Definitions.getComparisonType(),
                                                    value_b: this.cache.action_values,
                                                    constraints: super.constraints(),
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
                                        constraints: super.constraints(),
                                        constraint_type: Definitions.getConstraintType(),
                                        unit: Definitions.getUnit(),
                                        unit_constraint: super.unit_constraint(),
                                        amount_missing_threshold: float(),
                                        percentage_missing_threshold: percentage(),
                                        radius_origin_unit: object({
                                            keys: {
                                                unit_type: Definitions.getUnitType(),
                                            },
                                        }),
                                        target_filter_id: this.cache.target_filters,
                                        radius_value: this.cache.action_values,
                                        target_count_value: this.cache.action_values,
                                    },
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
                        tooltip_lines: UI.tooltip_lines(this.cache),
                        tooltip_line_groups: UI.tooltip_line_groups(this.cache),
                        range: this.cache.action_values,
                        action: enumerate({
                            items: ['toggle_unit_factory_window', 'explore'],
                        }),
                        targeting: object({
                            keys: {
                                targeting_type: Definitions.getTargetingType(),
                                range: this.cache.action_values,
                                radius: this.cache.action_values,
                                arc_half_angle: this.cache.action_values,
                            },
                            required: ['targeting_type'],
                        }),
                    },
                }),
                ability_positions: array({
                    items: vector3f(),
                }),
            },
        })
    }
}
