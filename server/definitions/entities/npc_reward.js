const { DiagnosticReporter } = require('../../data/diagnostic-reporter')
const { prerequisites } = require('../definitions')
const { schema, float, array, object, enumerate, integer, vector2i, boolean, version, string } = require('../data_types')
const Buff = require('./buff')
const { NpcModifiers } = require('../modifier_definitions')
const Definitions = require('../definitions')

class Type {
    constructor(json) {
        this.json = json
    }

    definition() {
        const types = {
            ship_component: 'item',
            planet_component: 'item',
            random_exotics: 'random_exotics',
            send_raid_action: 'raid',
            spawn_units: 'spawn_units',
            assets: 'assets',
            exotics: 'exotics',
            player_modifiers: 'player_modifiers',
            starbase_component: 'item',
            random_assets_and_exotics: 'random_assets_and_exotics',
            asset_market_exclusive_use: 'exclusive_market',
            ability: 'ability',
            alliance: 'alliance',
        }

        try {
            const type = types[this.json.data.type]
            if (type) {
                if (!has(this.json.data, type)) this.createPointerDiagnostic('', `key not found: '${type}'`, ERROR)
                this.json.map_unused_keys(
                    '/type',
                    this.json.data,
                    ['item', 'exotics', 'random_exotics', 'assets', 'exclusive_market', 'random_assets_and_exotics', 'raid', 'spawn_units', 'ability', 'alliance', 'player_modifiers'].filter((e) => e !== type)
                )
            }
        } catch {}
        return enumerate({
            items: ['alliance', 'ability', 'random_assets_and_exotics', 'starbase_component', 'planet_component', 'player_modifiers', 'ship_component', 'assets', 'asset_market_exclusive_use', 'exotics', 'random_exotics', 'send_raid_action', 'spawn_units'],
        })
    }
}

module.exports = class NpcReward extends Buff {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache)
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.type = new Type(this.json)
        this.cache = cache
    }

    items() {
        try {
            switch (this.json.data.type) {
                case 'ship_component':
                case 'starbase_component':
                    return this.cache.ship_components
                case 'planet_component':
                    return this.cache.planet_components
                default:
                    return string()
            }
        } catch {}
    }

    create() {
        return schema({
            required: ['type'],
            keys: {
                version: version(),
                targeting_ui: Definitions.getTargetingUi(),
                gui: object({
                    keys: {
                        hud_icon: this.cache.textures,
                        tooltip_icon: this.cache.textures,
                        name: this.cache.localisation,
                        description: this.cache.localisation,
                    },
                    required: ['hud_icon', 'name', 'description'],
                }),
                type: this.type.definition(),
                item: this.items(),
                ability: this.cache.abilities,
                exclusive_market: object({
                    keys: {
                        asset_type: Definitions.getResources(),
                        duration: float(),
                        modifiers: object({
                            keys: {
                                npc_modifiers: NpcModifiers.create(this.cache.research_subjects),
                            },
                        }),
                    },
                    required: ['asset_type', 'duration', 'modifiers'],
                }),
                alliance: object({
                    keys: {
                        alliance_type: enumerate({
                            items: ['cease_fire'],
                        }),
                        duration_in_minutes: float(),
                    },
                }),
                player_modifiers: object({
                    keys: {
                        duration_in_minutes: float(),
                        player_modifiers: object({
                            keys: {
                                npc_modifiers: NpcModifiers.create(this.cache.research_subjects),
                            },
                        }),
                    },
                }),
                assets: object({
                    keys: {
                        credits: float(),
                        metal: float(),
                        crystal: float(),
                    },
                }),
                exotics: Definitions.exotic_price(this.cache.exotics),
                spawn_units: object({
                    keys: {
                        spawn_units: object({
                            keys: {
                                random_units: Definitions.units(this.cache.units),
                                required_units: Definitions.getRequiredUnits(this.cache),
                            },
                        }),
                        is_usable_by_player_ai: boolean(),
                        special_operation_unit_kind: this.cache.special_operation_kinds,
                        arrival_delay_duration: integer(),
                        gravity_well_fixture_target_filter: object({
                            keys: {
                                unit_types: array({
                                    items: this.cache.ship_tags,
                                    isUnique: true,
                                }),
                                ownerships: Definitions.getOwnerships(),
                                constraints: this.constraints(),
                            },
                        }),
                        target_alert: enumerate({
                            items: ['targeted_by_ability'],
                        }),
                        supply: float(),
                    },
                }),
                raid: object({
                    keys: {
                        units: object({
                            keys: {
                                required_units: Definitions.getRequiredUnits(this.cache),
                                random_units: Definitions.units(this.cache.units),
                                supply: integer(),
                                bounty_credits: float(),
                            },
                        }),
                        supply: float(),
                        buff: this.cache.buffs,
                        action_data_source: this.cache.action_data_sources,
                    },
                    required: ['units'],
                }),
                random_exotics: object({
                    keys: {
                        count: vector2i(),
                        exotics: array({
                            items: this.cache.exotics,
                            isUnique: true,
                        }),
                    },
                    required: ['count', 'exotics'],
                }),
                random_assets_and_exotics: array({
                    items: object({
                        keys: {
                            weight: float(),
                            credits: vector2i(),
                            metal: vector2i(),
                            crystal: vector2i(),
                            exotics: object({
                                keys: {
                                    count: vector2i(),
                                    exotics: array({
                                        items: this.cache.exotics,
                                        isUnique: true,
                                    }),
                                },
                                required: ['count', 'exotics'],
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
