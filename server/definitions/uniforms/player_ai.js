const { schema, array, object, enumerate, float, boolean, percentage, integer, vector2f } = require('../data_types')
const { EmpireModifiers, PlanetModifiers } = require('../modifier_definitions')

module.exports = class PlayerAiUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    type() {
        return enumerate({
            items: ['constant', 'per_planet_count', 'per_built_supply', 'per_max_supply'],
        })
    }

    behaviors() {
        return object({
            keys: {
                desired_explore_ship_count: object({
                    keys: {
                        type: enumerate({
                            items: ['constant'],
                        }),
                        value: integer(),
                    },
                }),
            },
        })
    }

    properties() {
        const contents = () =>
            object({
                keys: {
                    type: this.type(),
                    per_count: integer(),
                    value: integer(),
                    max_value: integer(),
                },
            })

        return {
            desired_ship_factory_planet_counts: contents(),
            desired_ship_factory_planet_density_scalar: contents(),
            desired_explore_mission_count: contents(),
            desired_ship_factory_planet_counts: contents(),
            desired_colonize_mission_count: contents(),
            desired_exotic_factory_count: contents(),
            desired_attack_gravity_well_mission_count: contents(),
            desired_starbase_count: contents(),
            desired_capital_ship_count: contents(),
            desired_unlock_unit_count: contents(),
            bonus_modifiers: object({
                keys: {
                    empire_modifiers: EmpireModifiers.create(),
                    planet_modifiers: PlanetModifiers.createResearchSubject(this.cache.planets),
                },
            }),
        }
    }

    create() {
        return schema({
            keys: {
                difficulties: object({
                    keys: {
                        easy: object({
                            keys: {
                                update_interval: float(),
                                can_buy_or_sell_npc_market_assets: boolean(),
                                will_make_npc_auction_bid_chance: percentage(),
                                will_ally_with_other_ai_players_chance: percentage(),
                                ...this.properties(),
                            },
                        }),
                        medium: object({
                            keys: {
                                update_interval: float(),
                                can_buy_or_sell_npc_market_assets: boolean(),
                                will_make_npc_auction_bid_chance: percentage(),
                                will_ally_with_other_ai_players_chance: percentage(),
                                ...this.properties(),
                            },
                        }),
                        hard: object({
                            keys: {
                                update_interval: float(),
                                can_buy_or_sell_npc_market_assets: boolean(),
                                will_make_npc_auction_bid_chance: percentage(),
                                will_ally_with_other_ai_players_chance: percentage(),
                                ...this.properties(),
                            },
                        }),
                        unfair: object({
                            keys: {
                                update_interval: float(),
                                can_buy_or_sell_npc_market_assets: boolean(),
                                will_make_npc_auction_bid_chance: percentage(),
                                will_ally_with_other_ai_players_chance: percentage(),
                                ...this.properties(),
                            },
                        }),
                        nightmare: object({
                            keys: {
                                update_interval: float(),
                                can_buy_or_sell_npc_market_assets: boolean(),
                                will_make_npc_auction_bid_chance: percentage(),
                                will_ally_with_other_ai_players_chance: percentage(),
                                ...this.properties(),
                            },
                        }),
                        impossible: object({
                            keys: {
                                update_interval: float(),
                                can_buy_or_sell_npc_market_assets: boolean(),
                                will_make_npc_auction_bid_chance: percentage(),
                                will_ally_with_other_ai_players_chance: percentage(),
                                ...this.properties(),
                            },
                        }),
                    },
                    required: ['easy', 'medium', 'hard', 'unfair', 'nightmare', 'impossible'],
                }),
                behaviors: object({
                    keys: {
                        aggressive: this.behaviors(),
                        defensive: this.behaviors(),
                        research: this.behaviors(),
                        economic: this.behaviors(),
                    },
                }),
                random_research_subject_tier_tolerance: integer(),
                begin_research_time: float(),
                sell_metal_to_npc_market_amount: float(),
                sell_crystal_to_npc_market_amount: float(),
                buy_metal_from_npc_market_amount: float(),
                buy_crystal_from_npc_market_amount: float(),
                initial_base_npc_auction_asset_bid_amount: float(),
                initial_base_npc_auction_exotic_bid_amount: float(),
                npc_auction_bid_amount_scalar_range: vector2f(),
                start_unlock_colonization_research_planet_count_tolerance: integer(),
                start_random_excavation_colonized_planet_count_tolerance: integer(),
                ship_factory_build_kinds: array({
                    items: this.cache.build_kinds,
                    isUnique: true,
                }),
                attack_gravity_well_build_kinds: array({
                    items: this.cache.build_kinds,
                    isUnique: true,
                }),
                capital_ship_build_kind: this.cache.build_kinds,
                titan_build_kind: this.cache.build_kinds,
                random_exotics: array({
                    items: this.cache.exotics,
                    isUnique: true,
                }),
            },
        })
    }
}
