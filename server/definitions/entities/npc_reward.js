const DiagnosticStorage = require('../../data/diagnostic-storage')
const { schema, float, array, object, enumerate, If, integer, vecInt2, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class NpcReward extends Definitions {
    /* eslint-disable no-unused-vars */

    types = ['alliance', 'ability', 'random_assets_and_exotics', 'starbase_component', 'planet_component', 'player_modifiers', 'ship_component', 'assets', 'asset_market_exclusive_use', 'exotics', 'random_exotics', 'send_raid_action', 'spawn_units']

    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.diagStorage = new DiagnosticStorage(fileText, diagnostics)
        this.json = JSON.parse(fileText)

        this.cache = cache
    }

    type(type) {
        switch (type) {
            case 'random_exotics': {
                return {
                    random_exotics: object({
                        keys: {
                            count: vecInt2(),
                            exotics: array({
                                items: this.cache.exotics,
                                isUnique: true,
                            }),
                        },
                        required: ['count', 'exotics'],
                    }),
                }
            }
            case 'random_assets_and_exotics': {
                return {
                    random_assets_and_exotics: array({
                        items: object({
                            keys: {
                                weight: float(),
                                credits: vecInt2(),
                                metal: vecInt2(),
                                crystal: vecInt2(),
                                exotics: object({
                                    keys: {
                                        count: vecInt2(),
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
                }
            }
            case 'send_raid_action': {
                return {
                    raid: object({
                        keys: {
                            units: object({
                                keys: {
                                    required_units: super.getRequiredUnits(this.cache.units, this.cache.ship_components, this.cache.abilities),
                                    random_units: super.units(this.cache.units),
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
                }
            }
            case 'exotics': {
                return {
                    exotics: super.exotic_price(this.cache.exotics),
                }
            }
            case 'assets': {
                return {
                    assets: object({
                        keys: {
                            credits: float(),
                            metal: float(),
                            crystal: float(),
                        },
                    }),
                }
            }
            case 'spawn_units': {
                return {
                    spawn_units: object({
                        keys: {
                            spawn_units: object({
                                keys: {
                                    random_units: super.units(this.cache.units),
                                    required_units: super.getRequiredUnits(this.cache.units, this.cache.ship_components, this.cache.abilities),
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
                                    ownerships: super.getOwnerships,
                                    constraints: super.getConstraints(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.units),
                                },
                            }),
                            target_alert: enumerate({ items: ['targeted_by_ability'] }),
                            supply: float(),
                        },
                    }),
                }
            }
            case 'player_modifiers': {
                return {
                    player_modifiers: object({
                        keys: {
                            duration_in_minutes: float(),
                            player_modifiers: object({
                                keys: {
                                    npc_modifiers: super.create().modifiers.npc_modifiers.create(super.getResearchSubjects(this.cache.research_subjects)),
                                },
                            }),
                        },
                    }),
                }
            }
            case 'alliance': {
                return {
                    alliance: object({
                        keys: {
                            alliance_type: enumerate({ items: ['cease_fire'] }),
                            duration_in_minutes: float(),
                        },
                    }),
                }
            }
            case 'asset_market_exclusive_use': {
                return {
                    exclusive_market: object({
                        keys: {
                            asset_type: super.getResources,
                            duration: float(),
                            modifiers: object({
                                keys: {
                                    npc_modifiers: super.create().modifiers.npc_modifiers.create(super.getResearchSubjects(this.cache.research_subjects)),
                                },
                            }),
                        },
                        required: ['asset_type', 'duration', 'modifiers'],
                    }),
                }
            }
            default: {
            }
        }
    }

    create() {
        // for (let i = 0; i < this.types.length; i++) {
        //     const type = this.types[i]
        //     if (this.json?.type === type) {
        //         for (const property of [...this.types])  {
        //             if (property == type) continue
        //             if (this.json.hasOwnProperty(property)) {
        //                 this.diagStorage.messages.unusedKey(property, property)
        //             }
        //         }
        //     }
        // }

        return schema({
            additional: If({
                key: 'type',
                value: 'ship_component',
                requires: ['item'],
                properties: {
                    item: this.cache.ship_components,
                },
                additional: If({
                    key: 'type',
                    value: 'planet_component',
                    requires: ['item'],
                    properties: {
                        item: this.cache.planet_components,
                    },
                    additional: If({
                        key: 'type',
                        value: 'asset_market_exclusive_use',
                        requires: ['exclusive_market'],
                        properties: {
                            ...this.type('asset_market_exclusive_use'),
                        },
                        additional: If({
                            key: 'type',
                            value: 'spawn_units',
                            requires: ['spawn_units'],
                            properties: {
                                ...this.type('spawn_units'),
                            },
                            additional: If({
                                key: 'type',
                                value: 'assets',
                                requires: ['assets'],
                                properties: {
                                    ...this.type('assets'),
                                },
                                additional: If({
                                    key: 'type',
                                    value: 'exotics',
                                    requires: ['exotics'],
                                    properties: {
                                        ...this.type('exotics'),
                                    },
                                    additional: If({
                                        key: 'type',
                                        value: 'send_raid_action',
                                        requires: ['raid'],
                                        properties: {
                                            ...this.type('send_raid_action'),
                                        },
                                        additional: If({
                                            key: 'type',
                                            value: 'random_exotics',
                                            requires: ['random_exotics'],
                                            properties: {
                                                ...this.type('random_exotics'),
                                            },
                                            additional: If({
                                                key: 'type',
                                                value: 'player_modifiers',
                                                requires: ['player_modifiers'],
                                                properties: {
                                                    ...this.type('player_modifiers'),
                                                },
                                                additional: If({
                                                    key: 'type',
                                                    value: 'starbase_component',
                                                    requires: ['item'],
                                                    properties: {
                                                        item: this.cache.ship_components,
                                                    },
                                                    additional: If({
                                                        key: 'type',
                                                        value: 'random_assets_and_exotics',
                                                        requires: ['random_assets_and_exotics'],
                                                        properties: {
                                                            ...this.type('random_assets_and_exotics'),
                                                        },
                                                        additional: If({
                                                            key: 'type',
                                                            value: 'ability',
                                                            requires: ['ability'],
                                                            properties: {
                                                                ability: this.cache.abilities,
                                                            },
                                                            additional: If({
                                                                key: 'type',
                                                                value: 'alliance',
                                                                requires: ['alliance'],
                                                                properties: {
                                                                    ...this.type('alliance'),
                                                                },
                                                            }),
                                                        }),
                                                    }),
                                                }),
                                            }),
                                        }),
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            }),
            keys: {
                version: float(),
                targeting_ui: super.getTargetingUi,
                gui: object({
                    keys: {
                        hud_icon: this.cache.textures,
                        tooltip_icon: this.cache.textures,
                        name: this.cache.localisation,
                        description: this.cache.localisation,
                    },
                }),
                type: enumerate({
                    items: this.types,
                }),
                raid: '',
                assets: '',
                item: '',
                exotics: '',
                random_exotics: '',
                exclusive_market: '',
                random_assets_and_exotics: '',
                spawn_units: '',
                ability: '',
                alliance: '',
                player_modifiers: '',
            },
        })
    }
}
