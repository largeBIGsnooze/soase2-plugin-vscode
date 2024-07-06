const { DiagnosticReporter } = require('../../data/diagnostic-reporter')
const { float, string, schema, version, integer, array, object, enumerate } = require('../data_types')
const Definitions = require('../definitions')
const { planet_modifier_types, unit_modifier_types, weapon_modifier_types, unit_factory_modifier_types, empire_modifier_types } = require('../modifier_types')
const Buff = require('./buff')

module.exports = class ActionDataSource extends Buff {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache)
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    target_filter_id() {
        return object({
            keys: {
                target_filter_id: string(),
                target_filter: object({
                    keys: {
                        unit_types: array({
                            items: this.cache.ship_tags,
                            isUnique: true,
                        }),
                        ownerships: Definitions.getOwnerships(),
                        constraints: super.constraints(),
                        exemptions: array({
                            items: Definitions.getExemptions(),
                            isUnique: true,
                        }),
                    },
                }),
            },
        })
    }
    action_value_id() {
        return object({
            keys: {
                action_value_id: string(),
                action_value: object({
                    keys: {
                        transform_type: Definitions.getTransformType(),
                        memory_float_variable_id: this.cache.float_variables,
                        values: array({
                            items: float(false),
                        }),
                        transform_unit: object({
                            keys: {
                                unit_type: Definitions.getUnitType(),
                            },
                        }),
                    },
                }),
            },
        })
    }

    buff_empire_modifiers_id() {
        return object({
            keys: {
                buff_empire_modifier_id: string(),
                buff_empire_modifier: object({
                    keys: {
                        modifier_type: enumerate({
                            items: empire_modifier_types(),
                        }),
                        value_behavior: Definitions.value_behavior(),
                        value_id: this.cache.action_values,
                    },
                }),
            },
        })
    }

    buff_unit_modifiers_id() {
        return object({
            keys: {
                buff_unit_modifier_id: string(),
                buff_unit_modifier: object({
                    keys: {
                        modifier_type: enumerate({
                            items: unit_modifier_types(),
                        }),
                        value_behavior: Definitions.value_behavior(),
                        value_id: this.cache.action_values,
                    },
                }),
            },
        })
    }
    buff_unit_factory_modifiers_id() {
        return object({
            keys: {
                buff_unit_factory_modifier_id: string(),
                buff_unit_factory_modifier: object({
                    keys: {
                        modifier_type: enumerate({
                            items: unit_factory_modifier_types(),
                        }),
                        value_behavior: Definitions.value_behavior(),
                        value_id: this.cache.action_values,
                    },
                }),
            },
        })
    }
    buff_planet_modifiers_id() {
        return object({
            keys: {
                buff_planet_modifier_id: string(),
                buff_planet_modifier: object({
                    keys: {
                        modifier_type: enumerate({
                            items: planet_modifier_types(),
                        }),
                        value_behavior: Definitions.value_behavior(),
                        value_id: this.cache.action_values,
                    },
                }),
            },
        })
    }
    buff_weapon_modifiers_id() {
        return object({
            keys: {
                buff_weapon_modifier_id: string(),
                buff_weapon_modifier: object({
                    keys: {
                        //transform_type: super.getTransformType,
                        //memory_float_variable_id: string(),
                        weapon_type: Definitions.getWeaponType(),
                        modifier_type: enumerate({
                            items: weapon_modifier_types(),
                        }),
                        value_behavior: Definitions.value_behavior(),
                        tags: array({
                            items: this.cache.weapon_tags,
                            isUnique: true,
                        }),
                        value_id: string(),
                    },
                }),
            },
        })
    }
    create() {
        return schema({
            keys: {
                version: version(),
                level_count: integer(),
                per_buff_memory_declaration: object({
                    keys: {
                        unit_variable_ids: array({
                            items: string(),
                            isUnique: true,
                        }),
                        float_variable_ids: array({
                            items: string(),
                            isUnique: true,
                        }),
                    },
                }),
                action_values: array({
                    items: this.action_value_id(),
                    isUnique: true,
                }),
                target_filters: array({
                    items: this.target_filter_id(),
                    isUnique: true,
                }),
                buff_empire_modifiers: array({
                    items: this.buff_empire_modifiers_id(),
                    isUnique: true,
                }),
                buff_unit_modifiers: array({
                    items: this.buff_unit_modifiers_id(),
                    isUnique: true,
                }),
                buff_unit_factory_modifiers: array({
                    items: this.buff_unit_factory_modifiers_id(),
                    isUnique: true,
                }),
                buff_planet_modifiers: array({
                    items: this.buff_planet_modifiers_id(),
                    isUnique: true,
                }),
                buff_actions: array({
                    items: object({
                        keys: {
                            action_id: string(),
                            action: object({
                                keys: {
                                    action_type: Definitions.getActionType(),
                                    max_jump_distance_value: string(),
                                    gravity_well_origin_unit: Definitions.getGravityWellOriginUnit(),
                                    constraint: super.constraint(),
                                    action_type: Definitions.getActionType(),
                                    destination_unit: Definitions.getUnit(),
                                    operators: super.operators(),
                                    float_variable: this.cache.float_variables,
                                    math_operators: super.math_operators(),
                                },
                            }),
                        },
                    }),
                }),
                buff_weapon_modifiers: array({
                    items: this.buff_weapon_modifiers_id(),
                    isUnique: true,
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
