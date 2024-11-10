const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const loc_keys = require('../../loc_keys')
const { float, string, schema, integer, array, object, enumerate } = require('../data_types')
const Definitions = require('../definitions')
const {
    planet_modifier_types,
    unit_modifier_types,
    weapon_modifier_types,
    unit_factory_modifier_types,
    empire_modifier_types,
} = require('../modifier_types')
const Ability = require('./ability')

module.exports = class ActionDataSource extends Ability {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache)
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    action_value() {
        return object({
            keys: {
                ratio: Definitions.action_value_ratio(),
                transform_type: Definitions.transform_type(),
                values: array({ items: float(false) }),
                transform_unit: Definitions.action_unit({ cache: this.cache }),
                memory_float_variable_id: this.cache.float_variables,
            },
        })
    }

    validateActionValue(ctx, ptr, json) {
        try {
            const _ = ['transform_unit', 'memory_float_variable_id']
            switch (ctx.transform_type) {
                case 'transform_unit':
                case 'per_max_antimatter':
                case 'per_current_antimatter':
                case 'per_planet_future_level':
                case 'per_planet_current_health_points':
                case 'per_planet_max_health_points':
                case 'per_planet_current_shield_points':
                case 'per_planet_max_shield_points':
                case 'per_planet_max_civilian_slots':
                case 'per_planet_max_military_slots':
                case 'per_planet_commerce_track_credit_income':
                case 'per_planet_mining_track_metal_income':
                case 'per_planet_mining_track_crystal_income':
                case 'per_current_hull_points':
                case 'per_missing_hull_points':
                case 'per_max_hull_points':
                case 'per_percent_missing_hull_points':
                case 'per_current_crippled_hull_points':
                case 'per_missing_crippled_hull_points':
                case 'per_max_crippled_hull_points':
                case 'per_percent_missing_crippled_hull_points':
                case 'per_current_armor_points':
                case 'per_missing_armor_points':
                case 'per_max_armor_points':
                case 'per_percent_missing_armor_points':
                case 'per_current_shield_points':
                case 'per_missing_shield_points':
                case 'per_max_shield_points':
                case 'surface_radius':
                case 'per_credit_price':
                case 'per_metal_price':
                case 'per_crystal_price':
                case 'per_allied_player_in_gravity_well':
                case 'per_enemy_unit_in_gravity_well':
                case 'per_unit_level':
                case 'per_build_or_virtual_supply':
                case 'per_unit_id':
                    json.validate_keys(ptr, ctx, [], _, ['transform_unit'])
                    break
                case 'operand_buff_memory_value':
                case 'current_buff_memory_value':
                    json.validate_keys(ptr, ctx, [], _, ['memory_float_variable_id'])
                    break
            }
        } catch {}
    }

    action_values_definition(ctx, ptr) {
        try {
            if (Array.isArray(ctx)) {
                ctx.forEach((action, idx) => this.validateActionValue(action?.action_value, ptr + `/${idx}/action_value`, this.json))
            }
        } catch {}
        return array({
            items: object({
                required: ['action_value', 'action_value_id'],
                keys: {
                    action_value_id: string(),
                    action_value: this.action_value(),
                },
            }),
        })
    }

    buff_actions_definition(ctx, ptr) {
        const json_builder = {}
        try {
            if (Array.isArray(ctx)) {
                ctx.forEach((acc, idx) => {
                    const action_ptr = ptr + `/${idx}/action`
                    const action = acc.action
                    super.validateAction(ctx, ptr, action, action_ptr, json_builder, false)
                })
            }
        } catch {}

        return array({
            items: object({
                required: ['action', 'action_id'],
                keys: {
                    action_id: string(),
                    action: Definitions.action(ctx, ptr, this.cache, this.json, json_builder),
                },
            }),
        })
    }

    buff_empire_modifiers_definition() {
        return array({
            items: object({
                required: ['buff_empire_modifier', 'buff_empire_modifier_id'],
                keys: {
                    buff_empire_modifier_id: string(),
                    buff_empire_modifier: object({
                        required: ['modifier_type', 'value_behavior', 'value_id'],
                        keys: {
                            modifier_type: enumerate({
                                items: empire_modifier_types(),
                            }),
                            value_behavior: Definitions.value_behavior(),
                            value_id: this.cache.action_values(),
                        },
                    }),
                },
            }),
        })
    }

    buff_planet_modifiers_definition() {
        return array({
            items: object({
                required: ['buff_planet_modifier', 'buff_planet_modifier_id'],
                keys: {
                    buff_planet_modifier_id: string(),
                    buff_planet_modifier: object({
                        required: ['modifier_type', 'value_behavior', 'value_id'],
                        keys: {
                            modifier_type: enumerate({
                                items: planet_modifier_types(),
                            }),
                            value_behavior: Definitions.value_behavior(),
                            value_id: this.cache.action_values(),
                        },
                    }),
                },
            }),
        })
    }
    buff_unit_factory_modifiers_definition() {
        return array({
            items: object({
                required: ['buff_unit_factory_modifier', 'buff_unit_factory_modifier_id'],
                keys: {
                    buff_unit_factory_modifier_id: string(),
                    buff_unit_factory_modifier: object({
                        required: ['modifier_type', 'value_behavior', 'value_id'],
                        keys: {
                            modifier_type: enumerate({
                                items: unit_factory_modifier_types(),
                            }),
                            value_behavior: Definitions.value_behavior(),
                            value_id: this.cache.action_values(),
                        },
                    }),
                },
            }),
        })
    }
    buff_unit_modifiers_definition(ctx, ptr) {
        return array({
            items: object({
                required: ['buff_unit_modifier', 'buff_unit_modifier_id'],
                keys: {
                    buff_unit_modifier_id: string(),
                    buff_unit_modifier: object({
                        required: ['modifier_type', 'value_behavior', 'value_id'],
                        keys: {
                            modifier_type: enumerate({
                                items: unit_modifier_types(),
                            }),
                            value_behavior: Definitions.value_behavior(),
                            value_id: this.cache.action_values(),
                        },
                    }),
                },
            }),
        })
    }

    buff_weapon_modifiers_definition(cache) {
        return array({
            items: object({
                required: ['buff_weapon_modifier', 'buff_weapon_modifier_id'],
                keys: {
                    buff_weapon_modifier_id: string(),
                    buff_weapon_modifier: object({
                        required: ['modifier_type', 'value_behavior', 'value_id'],
                        keys: {
                            modifier_type: enumerate({
                                items: weapon_modifier_types(),
                            }),
                            tags: array({
                                desc: loc_keys.BUFF_WEAPON_MODIFIER_TAGS,
                                items: this.cache.weapon_tags,
                                isUnique: true,
                            }),
                            weapon_type: Definitions.weapon_type(),
                            value_behavior: Definitions.value_behavior(),
                            value_id: this.cache.action_values(),
                        },
                    }),
                },
            }),
        })
    }

    target_filters_definition(ctx, ptr) {
        return array({
            items: object({
                required: ['target_filter', 'target_filter_id'],
                keys: {
                    target_filter_id: string(),
                    target_filter: Definitions.target_filter_definition(ctx, ptr, this.cache, this.json),
                },
            }),
        })
    }

    create() {
        return schema({
            keys: {
                level_count: integer(true),
                action_values: this.action_values_definition(this.json?.data?.action_values, '/action_values'),
                buff_actions: this.buff_actions_definition(this.json?.data?.buff_actions, '/buff_actions'),
                buff_empire_modifiers: this.buff_empire_modifiers_definition(),
                buff_planet_modifiers: this.buff_planet_modifiers_definition(),
                buff_unit_factory_modifiers: this.buff_unit_factory_modifiers_definition(),
                buff_unit_modifiers: this.buff_unit_modifiers_definition(this.json?.data?.buff_unit_modifiers, '/buff_unit_modifiers'),
                buff_weapon_modifiers: this.buff_weapon_modifiers_definition(),
                effect_alias_bindings: Definitions.effect_alias_bindings_definition(this.cache),
                target_filters: this.target_filters_definition(this.json?.data?.target_filters, '/target_filters'),
                per_buff_memory_declaration: object({
                    keys: {
                        float_variable_ids: array({ items: string(), isUnique: true }),
                        unit_variable_ids: array({ items: string(), isUnique: true }),
                    },
                }),
            },
        })
    }
}
