const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { schema, array, object, float, boolean, percentage, integer, vector2f } = require('../data_types')
const Definitions = require('../definitions')
const {
    EmpireModifiers,
    PlanetModifiers,
    WeaponModifiers,
    UnitModifiers,
    UnitFactoryModifiers,
    StrikecraftModifiers,
    NpcModifiers,
    ExoticFactoryModifiers,
} = require('../modifier_definitions')

module.exports = class PlayerAiUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    behaviors_definition(ctx, ptr) {
        return object({
            required: [
                'chance_to_ally_with_other_players',
                'defense_to_offsense_spend_ratio',
                'desired_explore_ship_count',
                'steal_ships_from_roam_fleets_to_defend_supply_percentage',
            ],
            keys: {
                desired_explore_ship_count: Definitions.desired_explore_ship_count(
                    ctx?.desired_explore_ship_count,
                    ptr + '/desired_explore_ship_count',
                    this.json
                ),
                steal_ships_from_roam_fleets_to_defend_supply_percentage: float(),
                chance_to_ally_with_other_players: vector2f(),
                defense_to_offsense_spend_ratio: float(),
            },
        })
    }

    modifiers_definition() {
        return object({
            keys: {
                empire_modifiers: EmpireModifiers.create(),
                planet_modifiers: PlanetModifiers.create(this.cache),
                weapon_modifiers: WeaponModifiers.create(this.cache),
                unit_modifiers: UnitModifiers.create(this.cache),
                unit_factory_modifiers: UnitFactoryModifiers.create(this.cache),
                strikecraft_modifiers: StrikecraftModifiers.create(this.cache),
                npc_modifiers: NpcModifiers.create(this.cache),
                exotic_factory_modifiers: ExoticFactoryModifiers.create(this.cache),
            },
        })
    }

    difficulty_definition() {
        return object({
            required: ['description', 'icon', 'name', 'update_interval'],
            keys: {
                icon: this.cache.textures(),
                name: this.cache.localisation,
                description: this.cache.localisation,
                update_interval: float(),
                can_buy_or_sell_npc_market_assets: boolean(),
                will_make_npc_auction_bid_chance: percentage(),
                will_ally_with_other_ai_players_chance: percentage(),
                fleet_attack_timeout_duration_in_minutes: integer(),
                fleet_colonize_timeout_duration_in_minutes: integer(),
                will_fleet_retreat: boolean(),
                will_attack_other_ai_before_human_players: boolean(),
                will_build_super_weapons: boolean(),
                fleet_will_probably_defeat_ratio_range: array({ items: float() }),
                max_supply_percentage_relative_to_human_players: float(),
                max_fleet_capital_ship_count: integer(),
                when_build_titan_in_minutes: vector2f(),
                chance_for_full_bid_on_auctions: float(),
                bonus_modifiers: this.modifiers_definition(),
            },
        })
    }

    create() {
        return schema({
            required: [
                'asset_ai_trade_values',
                'behaviors',
                'capital_ship_build_kind',
                'difficulties',
                'random_exotics',
                'ship_factory_build_kinds',
                'titan_build_kind',
            ],
            keys: {
                difficulties: object({
                    keys: {
                        easy: this.difficulty_definition(),
                        medium: this.difficulty_definition(),
                        hard: this.difficulty_definition(),
                        unfair: this.difficulty_definition(),
                        nightmare: this.difficulty_definition(),
                        impossible: this.difficulty_definition(),
                    },
                    required: ['easy', 'medium', 'hard', 'unfair', 'nightmare', 'impossible'],
                }),
                behaviors: object({
                    keys: {
                        aggressive: this.behaviors_definition(this.json?.data?.behaviors?.aggressive, '/behaviors/aggressive'),
                        defensive: this.behaviors_definition(this.json?.data?.behaviors?.defensive, '/behaviors/defensive'),
                        // research: this.behaviors_definition(this.json?.data?.behaviors?.research, '/behaviors/research'),
                        // economic: this.behaviors_definition(this.json?.data?.behaviors?.economic, '/behaviors/economic'),
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
                asset_ai_trade_values: Definitions.assets(),
            },
        })
    }
}
