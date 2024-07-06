const Definitions = require('./definitions')
const { enumerate, object, array, boolean, float } = require('./data_types')
const { planet_modifier_types, weapon_modifier_types, unit_modifier_types, unit_factory_modifier_types, empire_modifier_types } = require('./modifier_types')

class WeaponModifiers {
    static create({ hasArrayValues: hasArrayValues }, data) {
        let result

        if (hasArrayValues)
            result = {
                values: array({
                    items: float(false),
                }),
            }
        else
            result = {
                value: float(false),
            }

        return array({
            items: object({
                keys: {
                    weapon_type: Definitions.getWeaponType(),
                    modifier_type: enumerate({
                        items: weapon_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    buff_weapon_modifier_id: data['weapon_modifier_ids'],
                    value_id: data['action_values'],
                    ...result,
                    prerequisites: Definitions.prerequisites(data['research_subjects']),
                    tags: array({
                        items: data['weapon_tags'],
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class UnitModifiers {
    constructor() {}
    static createBuff(data) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: unit_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value_id: data['action_values'],
                    buff_unit_modifier_id: data['buff_unit_modifiers'],
                },
            }),
        })
    }
    static create({ hasArrayValues: hasArrayValues, prerequisites: prerequisites = {} }, data) {
        let result

        if (hasArrayValues)
            result = {
                values: array({
                    items: float(false),
                }),
            }
        else
            result = {
                value: float(false),
            }

        return array({
            items: object({
                keys: {
                    is_pseudo_positive_buff: boolean(),
                    modifier_type: enumerate({
                        items: unit_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    ...result,
                    tags: array({
                        items: data['ship_tags'],
                        isUnique: true,
                    }),
                    tag: data['ship_tags'],
                    prerequisites,
                },
            }),
        })
    }
}

class ExoticFactoryModifiers {
    constructor() {}

    static create(exotics) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: unit_factory_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value: float(false),
                    exotic_types: array({
                        items: exotics,
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class PlanetModifiers {
    constructor() {}

    static createResearchSubject(planets) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: planet_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value: float(false),
                    planet_types: array({
                        items: planets,
                        isUnique: true,
                    }),
                    dynamic_multiplier: enumerate({
                        items: ['inverse_used_supply_percentage'],
                    }),
                },
                required: ['modifier_type', 'value_behavior', 'value'],
            }),
        })
    }

    static create(planet_modifier_ids) {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: planet_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    buff_planet_modifier_id: planet_modifier_ids,
                    values: array({
                        items: float(false),
                    }),
                },
            }),
        })
    }
}

class PlanetTypeGroups {
    constructor() {}

    static create(planets, research_subjects) {
        return array({
            items: object({
                keys: {
                    planet_types: array({
                        items: planets,
                        isUnique: true,
                    }),
                    build_prerequisites: Definitions.prerequisites(research_subjects),
                },
            }),
        })
    }
}

class UnitFactoryModifiers {
    constructor() {}

    static create({ hasArrayValues: hasArrayValues }, build_kinds) {
        let arrayResults

        if (hasArrayValues)
            arrayResults = {
                values: array({
                    items: float(false),
                }),
            }
        else
            arrayResults = {
                value: float(false),
            }

        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: unit_factory_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    ...arrayResults,
                    build_kinds: array({
                        items: build_kinds,
                        isUnique: true,
                    }),
                },
            }),
        })
    }
}

class PlayerModifiers {
    constructor() {}

    static create(research_subjects) {
        return object({
            keys: {
                npc_modifiers: NpcModifiers.create(research_subjects),
                empire_modifiers: EmpireModifiers.create(),
                planet_modifiers: PlanetModifiers.create(),
            },
        })
    }
    static createResearchSubject(research_subjects, planets) {
        return object({
            keys: {
                npc_modifiers: NpcModifiers.create(research_subjects),
                empire_modifiers: EmpireModifiers.create(),
                planet_modifiers: PlanetModifiers.createResearchSubject(planets),
            },
        })
    }
}

class NpcModifiers {
    constructor() {}

    static modifier_type() {
        return enumerate({
            items: ['sell_exotic_credits_received', 'auction_lost_refund_percentage', 'buy_metal_credits_cost', 'buy_crystal_credits_cost', 'send_raid_supply', 'auction_bid_any', 'sell_crystal_credits_received', 'sell_metal_credits_received', 'reputation_ability_cooldown_duration'],
        })
    }

    static tags() {
        return array({
            items: enumerate({
                items: ['pirates'],
            }),
        })
    }

    static create(research_subjects) {
        return array({
            items: object({
                keys: {
                    modifier_type: NpcModifiers.modifier_type(),
                    value_behavior: Definitions.value_behavior(),
                    value: float(false),
                    prerequisites: Definitions.prerequisites(research_subjects),
                    tags: NpcModifiers.tags(),
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
                keys: {
                    modifier_type: enumerate({
                        items: empire_modifier_types(),
                    }),
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
    NpcModifiers,
    PlanetModifiers,
    PlanetTypeGroups,
    PlayerModifiers,
    UnitFactoryModifiers,
    UnitModifiers,
    WeaponModifiers,
}
