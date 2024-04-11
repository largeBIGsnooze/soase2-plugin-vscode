const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class ModifierTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    unit_modifier_definition() {
        return object({
            keys: {
                additive: object({
                    keys: {
                        value_format: super.value_float_format,
                        ratio_format: super.value_float_format,
                        suffix: this.cache.localisation,
                    },
                }),
                scalar: object({
                    keys: {
                        value_format: super.value_float_format,
                        ratio_format: super.value_float_format,
                        suffix: this.cache.localisation,
                    },
                }),
            },
        })
    }

    create() {
        return schema({
            keys: {
                positive_modifier_value_color: this.cache.colors,
                negative_modifier_value_color: this.cache.colors,
                unit_modifier_definitions: object({
                    keys: {
                        ability_cooldown_duration: this.unit_modifier_definition(),
                        ability_antimatter_cost: this.unit_modifier_definition(),
                        ability_hull_cost: this.unit_modifier_definition(),
                        ability_armor_cost: this.unit_modifier_definition(),
                        ability_shields_cost: this.unit_modifier_definition(),
                        ability_range: this.unit_modifier_definition(),
                        max_antimatter: this.unit_modifier_definition(),
                        antimatter_restore_rate: this.unit_modifier_definition(),
                        max_linear_speed: this.unit_modifier_definition(),
                        max_linear_acceleration: this.unit_modifier_definition(),
                        max_angular_speed: this.unit_modifier_definition(),
                        hyperspace_charge_time: this.unit_modifier_definition(),
                        hyperspace_speed: this.unit_modifier_definition(),
                        max_hull_points: this.unit_modifier_definition(),
                        hull_crippled_percentage: this.unit_modifier_definition(),
                        hull_point_restore_rate: this.unit_modifier_definition(),
                        hull_point_restore_cooldown_duration_after_damage_taken: this.unit_modifier_definition(),
                        max_armor_points: this.unit_modifier_definition(),
                        armor_point_restore_rate: this.unit_modifier_definition(),
                        armor_point_restore_cooldown_duration_after_damage_taken: this.unit_modifier_definition(),
                        armor_strength: this.unit_modifier_definition(),
                        max_shield_points: this.unit_modifier_definition(),
                        shield_point_restore_rate: this.unit_modifier_definition(),
                        shield_point_restore_cooldown_duration_after_damage_taken: this.unit_modifier_definition(),
                        shield_burst_restore_points: this.unit_modifier_definition(),
                        shield_burst_restore_cooldown_duration: this.unit_modifier_definition(),
                        damage_taken: this.unit_modifier_definition(),
                        experience_gained_from_unit_death: this.unit_modifier_definition(),
                        experience_gained_from_planet_bombing: this.unit_modifier_definition(),
                        experience_gained_from_loot_collection: this.unit_modifier_definition(),
                        experience_given_on_death: this.unit_modifier_definition(),
                        max_squadron_capacity: this.unit_modifier_definition(),
                        strikecraft_build_time: this.unit_modifier_definition(),
                        credit_income_rate: this.unit_modifier_definition(),
                        metal_income_rate: this.unit_modifier_definition(),
                        crystal_income_rate: this.unit_modifier_definition(),
                        military_research_points: this.unit_modifier_definition(),
                        civilian_research_points: this.unit_modifier_definition(),
                        culture_rate: this.unit_modifier_definition(),
                        culture_resistance_rate: this.unit_modifier_definition(),
                        ship_component_price: this.unit_modifier_definition(),
                        self_build_time: this.unit_modifier_definition(),
                        unity: this.unit_modifier_definition(),
                        trade_import_points: this.unit_modifier_definition(),
                        trade_export_credits_points: this.unit_modifier_definition(),
                        trade_export_metal_points: this.unit_modifier_definition(),
                        trade_export_crystal_points: this.unit_modifier_definition(),
                        loot_collection_duration: this.unit_modifier_definition(),
                        phase_resonance_bonus_duration: this.unit_modifier_definition(),
                    },
                }),
                unit_factory_modifier_definitions: object({
                    keys: {
                        build_time: this.unit_modifier_definition(),
                    },
                }),
                exotic_factory_modifier_definitions: object({
                    keys: {
                        build_time: this.unit_modifier_definition(),
                    },
                }),
                weapon_modifier_definitions: object({
                    keys: {
                        damage: this.unit_modifier_definition(),
                        cooldown_duration: this.unit_modifier_definition(),
                        range: this.unit_modifier_definition(),
                        tracking_speed: this.unit_modifier_definition(),
                        bypass_shields_chance: this.unit_modifier_definition(),
                    },
                }),
                planet_modifier_definitions: object({
                    keys: {
                        max_civilian_structure_slots: this.unit_modifier_definition(),
                        max_military_structure_slots: this.unit_modifier_definition(),
                        commerce_track_credit_income_rate: this.unit_modifier_definition(),
                        mining_track_metal_income_rate: this.unit_modifier_definition(),
                        mining_track_crystal_income_rate: this.unit_modifier_definition(),
                        orbital_extraction_metal_income_rate: this.unit_modifier_definition(),
                        orbital_extraction_crystal_income_rate: this.unit_modifier_definition(),
                        military_research_points: this.unit_modifier_definition(),
                        civilian_research_points: this.unit_modifier_definition(),
                        culture_rate: this.unit_modifier_definition(),
                        culture_resistance_rate: this.unit_modifier_definition(),
                        max_health_points: this.unit_modifier_definition(),
                        health_points_restore_rate: this.unit_modifier_definition(),
                        max_shield_points: this.unit_modifier_definition(),
                        shield_points_restore_rate: this.unit_modifier_definition(),
                        factory_unit_build_price: this.unit_modifier_definition(),
                        factory_unit_build_time: this.unit_modifier_definition(),
                        factory_exotic_build_time: this.unit_modifier_definition(),
                        any_development_track_build_price: this.unit_modifier_definition(),
                        any_development_track_build_time: this.unit_modifier_definition(),
                        defense_track_build_price: this.unit_modifier_definition(),
                        defense_track_build_time: this.unit_modifier_definition(),
                        logistics_track_build_price: this.unit_modifier_definition(),
                        logistics_track_build_time: this.unit_modifier_definition(),
                        commerce_track_build_price: this.unit_modifier_definition(),
                        commerce_track_build_time: this.unit_modifier_definition(),
                        mining_track_build_price: this.unit_modifier_definition(),
                        mining_track_build_time: this.unit_modifier_definition(),
                        excavation_track_build_price: this.unit_modifier_definition(),
                        excavation_track_build_time: this.unit_modifier_definition(),
                        structure_build_price: this.unit_modifier_definition(),
                        structure_build_time: this.unit_modifier_definition(),
                        gravity_well_radius: this.unit_modifier_definition(),
                        structure_builder_count: this.unit_modifier_definition(),
                        max_garrison_supply: this.unit_modifier_definition(),
                        bombing_damage_taken: this.unit_modifier_definition(),
                        planet_component_price: this.unit_modifier_definition(),
                        max_planet_component_slots: this.unit_modifier_definition(),
                    },
                }),
                strikecraft_modifier_definitions: object({
                    keys: {
                        squadron_size: this.unit_modifier_definition(),
                    },
                }),
                npc_modifier_definitions: object({
                    keys: {
                        buy_metal_credits_cost: this.unit_modifier_definition(),
                        sell_metal_credits_received: this.unit_modifier_definition(),
                        buy_crystal_credits_cost: this.unit_modifier_definition(),
                        sell_crystal_credits_received: this.unit_modifier_definition(),
                        sell_exotic_credits_received: this.unit_modifier_definition(),
                        send_raid_supply: this.unit_modifier_definition(),
                        auction_bid_any: this.unit_modifier_definition(),
                        auction_bid_credits: this.unit_modifier_definition(),
                        auction_bid_metal: this.unit_modifier_definition(),
                        auction_bid_crystal: this.unit_modifier_definition(),
                        auction_lost_refund_percentage: this.unit_modifier_definition(),
                        reputation_ability_cooldown_duration: this.unit_modifier_definition(),
                    },
                }),
                empire_modifier_definitions: object({
                    keys: {
                        credit_income_rate: this.unit_modifier_definition(),
                        metal_income_rate: this.unit_modifier_definition(),
                        crystal_income_rate: this.unit_modifier_definition(),
                        percentage_of_other_players_total_credit_income: this.unit_modifier_definition(),
                        build_exotic_price: this.unit_modifier_definition(),
                        bounty_increase: this.unit_modifier_definition(),
                        bounty_decrease_markup: this.unit_modifier_definition(),
                        research_time: this.unit_modifier_definition(),
                        trade_credits_income_rate: this.unit_modifier_definition(),
                        trade_metal_income_rate: this.unit_modifier_definition(),
                        trade_crystal_income_rate: this.unit_modifier_definition(),
                        npc_reputation_rate_from_dominant_culture: this.unit_modifier_definition(),
                    },
                }),
            },
        })
    }
}
