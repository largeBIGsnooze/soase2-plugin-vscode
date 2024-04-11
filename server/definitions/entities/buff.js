const { schema, boolean, enumerate, array, object, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Buff extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    get getTriggerEventActions() {
        return array({
            items: object({
                keys: {
                    trigger_event_type: super.getTriggerEventType,
                    action_group: object({
                        keys: {
                            constraint: super.getConstraint(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.target_filters, this.cache.float_variables, this.cache.unit_variables, this.cache.units),
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
        })
    }

    create() {
        return schema({
            keys: {
                version: float(),
                make_dead_on_all_finite_time_actions_done: boolean(),
                make_dead_on_parent_buff_made_dead: boolean(),
                make_current_spawner_dead_on_buff_made_dead: boolean(),
                make_dead_when_no_child_buffs_exist: boolean(),
                make_dead_when_no_child_buffs_exist_delay_time: this.cache.action_values,
                provides_detection: boolean(),
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
                time_actions: super.getTimeActions({
                    weapon_tags: this.cache.weapon_tags,
                    buffs: this.cache.buffs,
                    mutations: this.cache.mutations,
                    npc_rewards: this.cache.npc_rewards,
                    exotics: this.cache.exotics,
                    action_values: this.cache.action_values,
                    target_filters: this.cache.target_filters,
                    particle_effects: this.cache.particle_effects,
                    effect_alias_bindings: this.cache.effect_alias_bindings,
                    units: this.cache.units,
                    unit_items: this.cache.unit_items,
                    abilities: this.cache.abilities,
                    float_variables: this.cache.float_variables,
                    unit_variables: this.cache.unit_variables,
                    buff_actions: this.cache.buff_actions,
                    special_operation_unit_kind: this.cache.special_operation_kinds,
                }),
                trigger_event_actions: this.getTriggerEventActions,
                unit_modifiers: super.create().modifiers.unit_modifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache.ship_tags,
                    this.cache.action_values,
                    this.cache.buff_unit_modifiers
                ),
                planet_modifiers: super.create().modifiers.planet_modifiers.create(this.cache.planet_modifier_ids),
                weapon_modifiers: super.create().modifiers.weapon_modifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    super.getResearchSubjects(this.cache.research_subjects),
                    this.cache.weapon_tags
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
                        tooltip_line_groups: super.tooltip_line_groups(this.cache.localisation, this.cache.unit_items, this.cache.units, this.cache.action_values, this.cache.buff_unit_modifiers, this.cache.weapon_modifier_ids, this.cache.planet_modifier_ids, this.cache.buff_unit_factory_modifiers),
                    },
                }),
            },
        })
    }
}
