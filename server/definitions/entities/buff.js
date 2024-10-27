const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { object, array, string, enumerate, boolean, float, schema } = require('../data_types')
const Definitions = require('../definitions')
const {
    empire_modifier_types,
    exotic_factory_modifier_types,
    planet_modifier_types,
    unit_factory_modifier_types,
    unit_modifier_types,
    weapon_modifier_types,
} = require('../modifier_types')
const Ability = require('./ability')

module.exports = class Buff extends Ability {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache)
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    empire_modifiers_definition() {
        return array({
            items: object({
                keys: {
                    buff_empire_modifier_id: string('id of buff_empire_modifier found in action_data_source'),
                    modifier_type: enumerate({
                        items: empire_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value_id: this.cache.action_values(),
                },
            }),
        })
    }

    exotic_factory_modifiers_definition() {
        return array({
            items: object({
                required: ['modifier_type', 'value_behavior', 'value_id'],
                keys: {
                    modifier_type: enumerate({
                        items: exotic_factory_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value_id: this.cache.action_values(),
                },
            }),
        })
    }

    gui_definition(ctx, ptr) {
        return object({
            keys: {
                alert_type: Definitions.alert_type(),
                apply_damage: object({
                    description: 'used for showing torpedo damage on tooltip',
                    keys: {
                        bypass_shields_chance_value: this.cache.action_values(),
                        damage_value: this.cache.action_values(),
                        penetration_value: this.cache.action_values(),
                    },
                }),
                name: this.cache.localisation,
                description: this.cache.localisation,
                hud_icon: this.cache.textures(),
                is_expire_time_suppressed: boolean(),
                is_visible_within_unit_tooltip: boolean(),
                show_duplicate_buffs: boolean('default=true'),
                tooltip_icon: this.cache.textures(),
                tooltip_line_groups: Definitions.tooltip_line_groups(ctx?.tooltip_line_groups, ptr + '/tooltip_line_groups', this.json, this.cache),
                visibility_scope: enumerate({ items: ['positive', 'negative'] }),
            },
        })
    }

    planet_modifiers_definition() {
        return array({
            items: object({
                keys: {
                    buff_planet_modifier_id: string('id of buff_planet_modifier_id found in action_data_source'),
                    modifier_type: enumerate({
                        items: planet_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value_id: this.cache.action_values(),
                },
            }),
        })
    }

    time_actions_definition(ctx, ptr) {
        return array({
            items: object({
                required: ['action_group'],
                keys: {
                    action_group: super.action_group_definition(ctx, ptr),
                    execution_interval_count_value: this.cache.action_values(
                        'Maximum number of executions. If not specified will execute infinitely.'
                    ),
                    execution_interval_value: this.cache.action_values(
                        'Interval between each execution. If not specified will be executed every update.'
                    ),
                    executions_per_interval_value: this.cache.action_values('How many executions per interval. Default to 1.'),
                    first_action_delay_time_value: this.cache.action_values('Delay before first execution'),
                },
            }),
        })
    }

    trigger_event_actions_definition(ctx, ptr) {
        return array({
            items: object({
                required: ['action_group', 'trigger_event_type'],
                keys: {
                    trigger_event_type: Definitions.trigger_event_type(),
                    action_group: super.action_group_definition(ctx, ptr),
                },
            }),
        })
    }

    unit_factory_modifiers_definition() {
        return array({
            items: object({
                keys: {
                    buff_unit_factory_modifier_id: string('id of unit_factory_modifier found in action_data_source'),
                    modifier_type: enumerate({
                        items: unit_factory_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value_id: this.cache.action_values(),
                },
            }),
        })
    }
    unit_modifiers_definition() {
        return array({
            items: object({
                keys: {
                    buff_unit_modifier_id: string('id of buff_unit_modifier found in action_data_source'),
                    modifier_type: enumerate({
                        items: unit_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value_id: this.cache.action_values(),
                },
            }),
        })
    }
    weapon_modifiers_definition() {
        return array({
            items: object({
                keys: {
                    buff_weapon_modifier_id: string('id of buff_weapon_modifier found in action_data_source'),
                    modifier_type: enumerate({
                        items: weapon_modifier_types(),
                    }),
                    tags: array({
                        desc: 'If not empty, this modifier will only be applied to weapons that contain one of these tags.',
                        items: this.cache.weapon_tags,
                        isUnique: true,
                    }),
                    weapon_type: Definitions.weapon_type(),
                    value_behavior: Definitions.value_behavior(),
                    value_id: this.cache.action_values(),
                },
            }),
        })
    }

    create() {
        return schema({
            keys: {
                active_duration: this.cache.action_values('This buff will be made dead after this duration time has elapsed'),
                are_mutations_finite: boolean(
                    "Change how the other parts of the simulation handle these mutations. For example if finite disabling mutations won't cause other queries to fail based on capabilities of the unit (`can_hypersapace`). default=true"
                ),
                disable_collision_displacement_with_first_spawner: boolean('default=false'),
                empire_modifiers: this.empire_modifiers_definition(),
                exotic_factory_modifiers: this.exotic_factory_modifiers_definition(),
                gui: this.gui_definition(this.json?.data?.gui, '/gui'),
                make_current_spawner_dead_on_buff_made_dead: boolean(
                    'only valid to be specified for buffs intended to go on killable units. default=false'
                ),
                make_dead_on_all_finite_time_actions_done: boolean('default=false'),
                make_dead_on_current_spawner_made_dead: boolean(
                    'only valid to be specified for buffs intended to go on killable units. default=true'
                ),
                make_dead_on_current_spawner_ownership_changed_from_buff_ownership: boolean('default=false'),
                make_dead_on_distance_to_parent_buff_exceeded: object({
                    required: ['distance'],
                    keys: {
                        distance: this.cache.action_values(),
                        tolerance: float(true, 'default=10'),
                    },
                }),
                make_dead_on_parent_buff_made_dead: boolean('default=false'),
                make_dead_on_source_ability_released: boolean('default=false'),
                make_dead_when_no_child_buffs_exist: boolean('default=false'),
                make_dead_when_no_child_buffs_exist_delay_time: this.cache.action_values(
                    'Delay time before make_dead_when_no_child_buffs_exist is evaluated. Purpose is to allow child buffs time to be created.'
                ),
                planet_modifiers: this.planet_modifiers_definition(),
                provides_detection: boolean('default=false'),
                restart_other_stacked_buffs_when_started: boolean('default=true'),
                stacking_limit: object({
                    required: ['stacking_limit', 'stacking_limit_met_behavior'],
                    keys: {
                        stacking_limit: this.cache.action_values(),
                        stacking_limit_met_behavior: enumerate({
                            desc: 'Controls what happens when stack limit is met',
                            items: ['replace_existing_buff', 'restart_existing_buff', 'preserve_existing_buff'],
                        }),
                    },
                }),
                stacking_ownership_type: enumerate({
                    desc: 'Controls how duplicate instances are gr<ouped together for stacking. per_player=each player has their own stack. for_all_players=all players share the same stack. default=for_all_players',
                    items: ['per_player', 'for_all_players', 'per_source_ability'],
                }),
                suppress_scuttle_ui_notifications: boolean('default=false'),
                time_actions: this.time_actions_definition(this.json?.data?.time_actions, '/time_actions'),
                trigger_event_actions: this.trigger_event_actions_definition(this.json?.data?.trigger_event_actions, '/trigger_event_actions'),
                unit_factory_modifiers: this.unit_factory_modifiers_definition(),
                unit_modifiers: this.unit_modifiers_definition(),
                weapon_modifiers: this.weapon_modifiers_definition(),
                unit_mutations: array({ items: this.cache.mutations, isUnique: true }),
            },
        })
    }
}
