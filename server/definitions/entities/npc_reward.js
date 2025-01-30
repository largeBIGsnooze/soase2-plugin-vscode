const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { schema, float, array, object, enumerate, integer, vector2i, boolean, string } = require('../data_types')
const { PlayerModifiers } = require('../modifier_definitions')
const Definitions = require('../definitions')

module.exports = class NpcReward {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    type_definition(ctx, ptr) {
        const _ = [
            'random_exotics',
            'raid',
            'spawn_units',
            'assets',
            'exotics',
            'player_modifiers',
            'item',
            'random_assets_and_exotics',
            'exclusive_market',
            'ability',
            'alliance',
        ]

        try {
            switch (ctx.type) {
                case 'planet_component':
                case 'starbase_component':
                case 'ship_component':
                    this.json.validate_keys(ptr, ctx, ['item'], _)
                    break
                case 'random_exotics':
                    this.json.validate_keys(ptr, ctx, ['random_exotics'], _)
                    break
                case 'send_raid_action':
                    this.json.validate_keys(ptr, ctx, ['raid'], _)
                    break
                case 'random_ship_component':
                    this.json.validate_keys(ptr, ctx, ['random_items'], _)
                    break
                case 'spawn_units':
                    this.json.validate_keys(ptr, ctx, ['spawn_units'], _)
                    break
                case 'assets':
                    this.json.validate_keys(ptr, ctx, ['assets'], _)
                    break
                case 'exotics':
                    this.json.validate_keys(ptr, ctx, ['exotics'], _)
                    break
                case 'player_modifiers':
                    this.json.validate_keys(ptr, ctx, ['player_modifiers'], _)
                    break
                case 'random_assets_and_exotics':
                    this.json.validate_keys(ptr, ctx, ['random_assets_and_exotics'], _)
                    break
                case 'asset_market_exclusive_use':
                    this.json.validate_keys(ptr, ctx, ['exclusive_market'], _)
                    break
                case 'ability':
                    this.json.validate_keys(ptr, ctx, ['ability'], _)
                    break
                case 'alliance':
                    this.json.validate_keys(ptr, ctx, ['alliance'], _)
                    break
            }
        } catch {}

        return enumerate({
            items: [
                'alliance',
                'ability',
                'random_assets_and_exotics',
                'starbase_component',
                'planet_component',
                'player_modifiers',
                'ship_component',
                'random_ship_component',
                'assets',
                'asset_market_exclusive_use',
                'exotics',
                'random_exotics',
                'send_raid_action',
                'spawn_units',
            ],
        })
    }

    spawn_units_definition() {
        return object({
            keys: {
                formation_type: Definitions.formation_type(),
                buff: this.cache.buffs,
                arrival_delay_duration: float(),
                required_units: Definitions.required_units(this.cache),
                random_units: Definitions.random_units(this.cache),
                supply: integer(),
                bounty_credits: float(),
            },
        })
    }

    item_definition(ctx) {
        try {
            switch (ctx.type) {
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
                between_gravity_well_range: float(),
                gravity_well_fixture_target_filter_id: this.cache.target_filters,
                /* game_version v1.30.0 */
                uses_range: boolean(),
                /* */
                targeting_ui: Definitions.targeting_ui(),
                gui: object({
                    keys: {
                        gravity_well_fixture_target_filter_description: this.cache.localisation,
                        hud_icon: this.cache.textures(),
                        tooltip_icon: this.cache.textures(),
                        name: this.cache.localisation,
                        description: this.cache.localisation,
                    },
                    required: ['hud_icon', 'name', 'description'],
                }),
                type: this.type_definition(this.json?.data, ''),
                item: this.item_definition(this.json?.data),
                ability: this.cache.abilities,
                random_items: array({
                    items: this.cache.npc_rewards,
                    isUnique: true,
                }),
                exclusive_market: object({
                    keys: {
                        asset_type: Definitions.resources(),
                        duration: float(),
                        modifiers: PlayerModifiers.create(this.cache),
                    },
                    required: ['asset_type', 'duration', 'modifiers'],
                }),
                alliance: object({
                    keys: {
                        alliance_type: enumerate({
                            items: ['cease_fire', 'share_vision', 'synergy'],
                        }),
                        duration_in_minutes: float(true, 'todo_json_object'),
                    },
                }),
                player_modifiers: object({
                    required: ['player_modifiers'],
                    keys: {
                        duration_in_minutes: float(true, 'todo_json_object'),
                        player_modifiers: PlayerModifiers.create(this.cache),
                    },
                }),
                assets: object({
                    keys: {
                        credits: float(),
                        metal: float(),
                        crystal: float(),
                    },
                }),
                exotics: Definitions.exotic_price(this.cache),
                spawn_units: object({
                    required: ['spawn_units'],
                    keys: {
                        player_ai_usage: enumerate({ items: ['defend_planet', 'missing_ship_component_shop', 'raid_enemy_planet'] }),
                        spawn_units: object({
                            keys: {
                                random_units: Definitions.random_units(this.cache),
                                required_units: Definitions.required_units(this.cache),
                            },
                        }),
                        action_data_source: this.cache.action_data_sources,
                        buff_on_units: this.cache.buffs,
                        is_usable_by_player_ai: boolean(),
                        spawn_units_ownership_type: enumerate({ desc: 'default=targeting_player', items: ['targeting_player', 'npc_player'] }),
                        special_operation_unit_kind: this.cache.special_operation_kinds,
                        arrival_delay_duration: integer(),
                        target_alert: Definitions.target_alert(),
                        supply: integer(),
                    },
                }),
                raid: object({
                    keys: {
                        units: Definitions.spawn_units_definition(this.cache),
                        highest_used_supply_scalar: float(),
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
                        required: ['weight'],
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
