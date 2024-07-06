const { schema, integer, array, float, object, string, percentage, boolean, vector2f } = require('../data_types')

module.exports = class PlayerUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    taxes() {
        return array({
            items: object({
                keys: {
                    rate_taxable: float(),
                    tax_rate: percentage(),
                },
            }),
        })
    }

    alliance_type() {
        return object({
            keys: {
                hud_icon: this.cache.textures,
                tooltip_icon: this.cache.textures,
                name: this.cache.localisation,
                description: this.cache.localisation,
            },
        })
    }

    create() {
        return schema({
            keys: {
                max_fleet_count: float(),
                fleet_factory_rally_subspace_speed: float(),
                fleet_factory_rally_hyperspace_speed: float(),
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
                        credits: this.taxes(),
                        metal: this.taxes(),
                        crystal: this.taxes(),
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
                alliance: object({
                    keys: {
                        max_alliance_lock_duration: float(),
                        alliance_offer_duration: float(),
                        alliance_types: object({
                            keys: {
                                cease_fire: this.alliance_type(),
                                share_vision: this.alliance_type(),
                                synergy: this.alliance_type(),
                            },
                        }),
                    },
                }),
                npc: object({
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
                        asset_market: object({
                            keys: {
                                demand_level_change_thresholds: array({
                                    items: float(),
                                }),
                                demand_level_change_cooldown_duration: float(),
                                demand_levels: array({
                                    items: object({
                                        keys: {
                                            buy_credits_cost_scalar: float(false),
                                            sell_credits_received_scalar: float(false),
                                            name: this.cache.localisation,
                                            color: this.cache.colors,
                                            hud_icon: this.cache.textures,
                                            is_visible_in_npc_markets_window: boolean(),
                                        },
                                    }),
                                }),
                                initial_demand_level: integer(),
                            },
                        }),
                        npc_tags: array({
                            items: object({
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
                }),
            },
        })
    }
}
