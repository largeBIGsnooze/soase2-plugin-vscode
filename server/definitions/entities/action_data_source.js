const { string, schema, float, integer, array, object, enumerate } = require('../data_types')
const Definitions = require('../definitions')
const { planet_modifier_types, unit_modifier_types, weapon_modifier_types, unit_factory_modifier_types } = require('../modifier_types')

module.exports = class ActionDataSource extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.json = JSON.parse(fileText)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                version: float(),
                level_count: integer(),
                per_buff_memory_declaration: object({
                    keys: {
                        unit_variable_ids: array({
                            items: string(),
                        }),
                        float_variable_ids: array({
                            items: string(),
                        }),
                    },
                }),
                action_values: array({
                    items: super.getActionValue(this.cache.float_variables),
                }),
                target_filters: array({
                    items: object({
                        keys: {
                            target_filter_id: string(),
                            target_filter: object({
                                keys: {
                                    unit_types: array({
                                        items: this.cache.ship_tags,
                                        isUnique: true,
                                    }),
                                    ownerships: super.getOwnerships,
                                    constraints: super.getConstraints(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.units),
                                    exemptions: array({
                                        items: super.getExemptions,
                                        isUnique: true,
                                    }),
                                },
                            }),
                        },
                    }),
                }),
                buff_unit_modifiers: array({
                    items: object({
                        keys: {
                            buff_unit_modifier_id: string(),
                            buff_unit_modifier: object({
                                keys: {
                                    modifier_type: enumerate({
                                        items: unit_modifier_types(),
                                    }),
                                    value_behavior: super.getValueBehavior,
                                    value_id: this.cache.action_values,
                                },
                            }),
                        },
                    }),
                }),
                buff_unit_factory_modifiers: array({
                    items: object({
                        keys: {
                            buff_unit_factory_modifier_id: string(),
                            buff_unit_factory_modifier: object({
                                keys: {
                                    modifier_type: enumerate({
                                        items: unit_factory_modifier_types(),
                                    }),
                                    value_behavior: super.getValueBehavior,
                                    value_id: this.cache.action_values,
                                },
                            }),
                        },
                    }),
                }),
                buff_planet_modifiers: array({
                    items: object({
                        keys: {
                            buff_planet_modifier_id: string(),
                            buff_planet_modifier: object({
                                keys: {
                                    modifier_type: enumerate({
                                        items: planet_modifier_types(),
                                    }),
                                    value_behavior: super.getValueBehavior,
                                    value_id: this.cache.action_values,
                                },
                            }),
                        },
                    }),
                }),
                buff_actions: array({
                    items: object({
                        keys: {
                            action_id: string(),
                            action: object({
                                keys: {
                                    action_type: super.getActionType,
                                    max_jump_distance_value: string(),
                                    gravity_well_origin_unit: super.getGravityWellOriginUnit,
                                    constraint: super.getConstraint(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.target_filters, this.cache.float_variables, this.cache.unit_variables, this.cache.units),
                                    action_type: super.getActionType,
                                    destination_unit: super.getUnit,
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
                                    float_variable: this.cache.float_variables,
                                    math_operators: super.getMathOperators(this.cache.action_values),
                                },
                            }),
                        },
                    }),
                }),
                buff_weapon_modifiers: array({
                    items: object({
                        keys: {
                            buff_weapon_modifier_id: string(),
                            buff_weapon_modifier: object({
                                keys: {
                                    //transform_type: super.getTransformType,
                                    //memory_float_variable_id: string(),
                                    weapon_type: super.getWeaponType,
                                    modifier_type: enumerate({
                                        items: weapon_modifier_types(),
                                    }),
                                    value_behavior: super.getValueBehavior,
                                    tags: array({
                                        items: this.cache.weapon_tags,
                                        isUnique: true,
                                    }),
                                    value_id: string(),
                                },
                            }),
                        },
                    }),
                }),
                effect_alias_bindings: array({
                    items: array({
                        items: [
                            string(),
                            object({
                                keys: {
                                    particle_effect: this.cache.particle_effects,
                                    sounds: array({
                                        items: this.cache.sounds,
                                        isUnique: true,
                                    }),
                                },
                            }),
                        ],
                    }),
                }),
            },
        })
    }
}
