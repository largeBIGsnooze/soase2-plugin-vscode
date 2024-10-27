const { schema, integer, array, float, object, string, percentage, boolean, vector2f, version } = require('../data_types')

module.exports = class PlayerUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    taxes_definition() {
        return array({
            items: object({
                required: ['tax_rate'],
                keys: {
                    rate_taxable: float(),
                    tax_rate: percentage(),
                },
            }),
        })
    }

    alliance_type_definition() {
        return object({
            required: ['description', 'hud_icon', 'name', 'tooltip_icon'],
            keys: {
                hud_icon: this.cache.textures(),
                tooltip_icon: this.cache.textures(),
                name: this.cache.localisation,
                description: this.cache.localisation,
            },
        })
    }

    alliance_definition() {
        return object({
            required: ['alliance_offer_duration', 'alliance_types', 'max_alliance_lock_duration'],
            keys: {
                max_alliance_lock_duration: integer(),
                alliance_offer_duration: integer(),
                alliance_types: object({
                    keys: {
                        cease_fire: this.alliance_type_definition(),
                        share_vision: this.alliance_type_definition(),
                        synergy: this.alliance_type_definition(),
                    },
                }),
            },
        })
    }

    asset_market_definition() {
        return object({
            required: ['demand_level_change_cooldown_duration', 'demand_level_change_thresholds', 'initial_demand_level'],
            keys: {
                demand_level_change_thresholds: array({
                    items: float(),
                }),
                demand_level_change_cooldown_duration: float(),
                demand_levels: array({
                    items: object({
                        required: ['buy_credits_cost_scalar', 'color', 'hud_icon', 'name', 'sell_credits_received_scalar'],
                        keys: {
                            buy_credits_cost_scalar: float(false),
                            sell_credits_received_scalar: float(false),
                            name: this.cache.localisation,
                            color: this.cache.colors,
                            hud_icon: this.cache.textures(),
                            is_visible_in_npc_markets_window: boolean(),
                        },
                    }),
                }),
                initial_demand_level: integer(),
            },
        })
    }
    npc_definition() {
        return object({
            keys: {
                break_alliance_duration: float(),
                reputation_level_texts: array({
                    items: string(),
                    isUnique: true,
                }),
                auction_cooldown_durations: array({
                    items: vector2f(),
                }),
                will_accept_exotics_in_auction_level: integer(),
                culture_reward_cooldown_duration: float(),
                auction_cooldown_duration: array({
                    items: float(),
                }),
                npc_level_minimum_fleet_supply_thresholds: array({
                    items: float(),
                }),
                asset_market: this.asset_market_definition(),
                npc_tags: array({
                    items: object({
                        required: ['localized_name', 'name'],
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                        },
                    }),
                }),
                forced_alliances: array({
                    items: object({
                        keys: {
                            npcs: array({
                                items: this.cache.players,
                                isUnique: true,
                            }),
                        },
                    }),
                }),
            },
        })
    }

    create() {
        return schema({
            required: [
                'auto_upgrade_planet_track_price_threshold_multiplier',
                'colonization_victory_planet_count_percentage',
                'dominant_culture_influence_points_gained_duration',
                'fallback_theme_picker_skybox',
                'fleet_factory_rally_hyperspace_charge_time',
                'fleet_factory_rally_hyperspace_speed',
                'fleet_factory_rally_hyperspace_speed_between_stars',
                'fleet_factory_rally_subspace_speed',
                'marginal_tax_rate_levels',
                'max_fleet_count',
                'max_research_points_overflow',
                'max_research_rate_scalar',
                'pickable_players',
                'refund_percentage',
                'research_overflow_tier_nth_root_modifier',
            ],
            keys: {
                fallback_theme_picker_skybox: this.cache.skyboxes,
                max_fleet_count: float(),
                fleet_factory_rally_subspace_speed: float(),
                fleet_factory_rally_hyperspace_speed: float(),
                fleet_factory_rally_hyperspace_speed_between_stars: float(),
                fleet_factory_rally_hyperspace_charge_time: float(),
                estimated_fleet_factory_rally_time_per_jump: float(),
                races: array({
                    items: object({
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                        },
                    }),
                    isUnique: true,
                }),
                pickable_players: array({
                    items: this.cache.players,
                    isUnique: true,
                }),
                marginal_tax_rate_levels: object({
                    keys: {
                        credits: this.taxes_definition(),
                        metal: this.taxes_definition(),
                        crystal: this.taxes_definition(),
                    },
                }),
                dominant_culture_influence_points_gained_duration: array({
                    items: float(),
                }),
                refund_percentage: percentage(),
                auction_lost_refund_percentage: percentage(),
                colonization_victory_planet_count_percentage: percentage(),
                time_between_notify_enemy_player_when_entering_gravity_well: float(),
                auto_upgrade_planet_track_price_threshold_multiplier: float(),
                max_research_rate_scalar: float(false),
                max_research_points_overflow: float(),
                research_overflow_tier_nth_root_modifier: float(),
                alliance: this.alliance_definition(),
                npc: this.npc_definition(),
            },
        })
    }
}
