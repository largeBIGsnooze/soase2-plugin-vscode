const Definitions = require('./definitions')
const { enumerate, object, array, boolean, float, string } = require('./data_types')
const {
    planet_modifier_types,
    weapon_modifier_types,
    unit_modifier_types,
    unit_factory_modifier_types,
    empire_modifier_types,
    exotic_factory_modifier_types,
} = require('./modifier_types')

class CultureModifiers {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({ items: empire_modifier_types() }),
                    value_behavior: Definitions.value_behavior(),
                    values: array({
                        items: object({
                            keys: {
                                prerequisites: Definitions.prerequisites(data.research_subjects),
                                value: float(),
                            },
                        }),
                    }),
                },
            }),
        })
    }
}

class UnitItemWeaponModifiers {
    static create(data) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({ items: weapon_modifier_types() }),
                    tags: array({ items: data.weapon_tags, isUnique: true }),
                    value_behavior: Definitions.value_behavior(),
                    values: array({ items: float(false) }),
                    weapon_type: Definitions.weapon_type(),
                },
            }),
        })
    }
}
class WeaponModifiers {
    static buff_weapon_modifiers_definition(cache) {
        return array({
            items: object({
                required: ['buff_weapon_modifier', 'buff_weapon_modifier_id'],
                keys: {
                    buff_weapon_modifier_id: string(),
                    buff_weapon_modifier: object({
                        required: ['modifier_type', 'value_behavior', 'value_id'],
                        keys: {
                            modifier_type: enumerate({ items: weapon_modifier_types() }),
                            tags: array({
                                desc: 'If not empty, this modifier will only be applied to weapons that contain one of these tags.',
                                items: cache.weapon_tags,
                                isUnique: true,
                            }),
                            weapon_type: Definitions.weapon_type(),
                            value_behavior: Definitions.value_behavior(),
                            value_id: cache.action_values(),
                        },
                    }),
                },
            }),
        })
    }

    static create(data) {
        return array({
            items: object({
                required: ['value', 'value_behavior'],
                keys: {
                    weapon_type: Definitions.weapon_type(),
                    modifier_type: enumerate({
                        items: weapon_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    buff_weapon_modifier_id: data.weapon_modifier_ids,
                    value: float(false),
                    prerequisites: Definitions.research_prerequisites(data.research_subjects),
                    tags: array({
                        items: data['weapon_tags'],
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class UnitItemUnitModifiers {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: unit_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    values: array({ items: float(false) }),
                    tags: array({
                        items: data.ship_tags,
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class UnitModifiers {
    constructor() {}

    static create(data, { isFloatValueProperty: isFloatValueProperty } = {}) {
        return array({
            items: object({
                required: ['modifier_type', 'value', 'value_behavior'],
                keys: {
                    value_id: data['action_values'],
                    buff_unit_modifier_id: data['buff_unit_modifiers'],
                    is_pseudo_positive_buff: boolean(),
                    modifier_type: enumerate({
                        items: unit_modifier_types(),
                    }),
                    prerequisites: Definitions.research_prerequisites(data['research_subjects']),
                    value_behavior: Definitions.value_behavior(),
                    value: isFloatValueProperty ? float(false) : data['action_values'],
                    tags: array({
                        items: data['ship_tags'],
                        isUnique: true,
                    }),
                    tag: data['ship_tags'],
                },
            }),
        })
    }
}

class UnitItemExoticFactoryModifiers {
    constructor() {}
    static create() {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: exotic_factory_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    values: array({ items: float(false) }),
                },
            }),
        })
    }
}

class ExoticFactoryModifiers {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                required: ['modifier_type', 'value', 'value_behavior'],
                keys: {
                    modifier_type: enumerate({
                        items: unit_factory_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value: float(false),
                    exotic_types: array({
                        items: data['exotics'],
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class UnitItemPlanetModifiers {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: planet_modifier_types(),
                    }),
                    required_planet_type: data['planets'],
                    value_behavior: Definitions.value_behavior(),
                    values: array({
                        items: float(false),
                    }),
                },
            }),
        })
    }
}
class PlanetModifiers {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                required: ['modifier_type', 'value_behavior', 'value'],
                keys: {
                    prerequisites: Definitions.research_prerequisites(data.research_subjects),
                    planet_types: array({ items: data.planets, isUnique: true }),
                    value: float(false),
                    modifier_type: enumerate({ items: planet_modifier_types() }),
                    dynamic_multiplier: enumerate({
                        items: ['used_supply_percentage', 'inverse_used_supply_percentage'],
                    }),
                    value_behavior: Definitions.value_behavior(),
                    buff_planet_modifier_id: data.planet_modifier_ids,
                    values: array({ items: float(false) }),
                },
            }),
        })
    }
}

class PlanetTypeGroups {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                keys: {
                    planet_types: array({
                        items: data['planets'],
                        isUnique: true,
                    }),
                    build_prerequisites: Definitions.prerequisites(data['research_subjects']),
                },
            }),
        })
    }
}

class UnitItemUnitFactoryModifiers {
    constructor() {}

    static create() {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({ items: unit_factory_modifier_types() }),
                    value_behavior: Definitions.value_behavior(),
                    values: array({ items: float(false) }),
                },
            }),
        })
    }
}
class UnitFactoryModifiers {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({ items: unit_factory_modifier_types() }),
                    value: float(false),
                    value_behavior: Definitions.value_behavior(),
                    build_kinds: array({ items: data['build_kinds'], isUnique: true }),
                },
            }),
        })
    }
}

class StrikecraftModifiers {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                required: ['modifier_type', 'value', 'value_behavior'],
                keys: {
                    modifier_type: enumerate({ items: ['squadron_size'] }),
                    strikecraft_kinds: array({ items: data.strikecraft_kinds, isUnique: true }),
                    value: float(),
                    value_behavior: Definitions.value_behavior(),
                },
            }),
        })
    }
}

class PlayerModifiers {
    constructor() {}

    static create(data, { UnitModifierFloatValue: UnitModifierFloatValue } = {}) {
        return object({
            keys: {
                npc_modifiers: NpcModifiers.create(data),
                weapon_modifiers: WeaponModifiers.create(data),
                empire_modifiers: EmpireModifiers.create(),
                unit_modifiers: UnitModifiers.create(data, { isFloatValueProperty: UnitModifierFloatValue }),
                planet_modifiers: PlanetModifiers.create(data),
                strikecraft_modifiers: StrikecraftModifiers.create(data),
                unit_factory_modifiers: UnitFactoryModifiers.create(data),
                exotic_factory_modifiers: ExoticFactoryModifiers.create(data),
            },
        })
    }
}

class NpcModifiers {
    constructor() {}

    static create(data) {
        return array({
            items: object({
                required: ['modifier_type', 'value', 'value_behavior'],
                keys: {
                    modifier_type: enumerate({ items: empire_modifier_types() }),
                    value_behavior: Definitions.value_behavior(),
                    value: float(false),
                    prerequisites: Definitions.prerequisites(data['research_subjects']),
                    tags: array({ items: enumerate({ items: ['pirates'] }), isUnique: true }),
                },
            }),
        })
    }
}

class EmpireModifiers {
    constructor() {}

    static create() {
        return array({
            items: object({
                required: ['modifier_type', 'value', 'value_behavior'],
                keys: {
                    modifier_type: enumerate({ items: empire_modifier_types() }),
                    value_behavior: Definitions.value_behavior(),
                    value: float(false),
                },
            }),
        })
    }
}

module.exports = {
    EmpireModifiers,
    ExoticFactoryModifiers,
    UnitItemUnitModifiers,
    NpcModifiers,
    PlanetModifiers,
    PlanetTypeGroups,
    UnitItemUnitFactoryModifiers,
    UnitItemWeaponModifiers,
    PlayerModifiers,
    UnitItemPlanetModifiers,
    UnitFactoryModifiers,
    UnitModifiers,
    CultureModifiers,
    StrikecraftModifiers,
    WeaponModifiers,
    UnitItemExoticFactoryModifiers,
}
