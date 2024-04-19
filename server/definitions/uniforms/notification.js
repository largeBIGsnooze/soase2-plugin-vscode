const { schema, float, string, object, enumerate, array, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class NotificationUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    icon_type() {
        return enumerate({
            items: ['npc_auction_bid_amount', 'brush', 'planet', 'derelict_loot_collected_level', 'player', 'research_subject', 'planet_track', 'unit_item', 'planet_item', 'npc_auction_reward', 'asset_market', 'unit', 'exotic', 'npc_player', 'ping', 'asset_values', 'npc_culture_reward'],
        })
    }

    icon() {
        return object({
            keys: {
                icon_type: this.icon_type(),
                picture_type: this.icon_type(),
                picture: this.cache.textures,
                brush: this.cache.textures,
                has_backdrop: boolean(),
                click_action: enumerate({
                    items: [
                        'open_military_research_window',
                        'open_npc_markets_window',
                        'open_npcs_window',
                        'open_exotic_factory_window',
                        'change_npc_auction_bid_amount',
                        'select_unit',
                        'open_civilian_research_window',
                        'open_player_alliance_offer_window',
                        'select_planet',
                        'select_unit_current_gravity_well_fixture',
                        'open_players_window',
                    ],
                }),
            },
        })
    }

    type() {
        return object({
            keys: {
                tooltip_picture: this.icon(),
                primary_icon: this.icon(),
                secondary_icon: this.icon(),
                should_flash: boolean(),
                name: this.cache.localisation,
                name_postfix: this.cache.localisation,
                description: this.cache.localisation,
                sound: this.cache.ogg,
                suppress_duplicates_duration: float(),
                duration: enumerate({
                    items: ['brief'],
                }),
                player_sound_id: string(),
            },
        })
    }

    create() {
        return schema({
            keys: {
                default_sound: this.cache.ogg,
                npc_pirates_tag: this.cache.npc_tags,
                types: object({
                    keys: {
                        enemy_planet_made_dead_from_bombing: this.type(),
                        enemy_units_arrived: this.type(),
                        pirate_units_arrived: this.type(),
                        insurgent_units_arrived: this.type(),
                        derelict_loot_discovered: this.type(),
                        derelict_loot_collected: this.type(),
                        wreckage_loot_collected: this.type(),
                        player_lost: this.type(),
                        player_discovered: this.type(),
                        alliance_offer_received: this.type(),
                        alliance_offer_revised: this.type(),
                        alliance_offer_accepted: this.type(),
                        alliance_offer_declined: this.type(),
                        alliance_offer_expired: this.type(),
                        alliance_broken: this.type(),
                        npc_alliance_broken: this.type(),
                        civilian_research_completed: this.type(),
                        planet_being_bombed: this.type(),
                        planet_colonized: this.type(),
                        destroy_planet_rewards_given: this.type(),
                        planet_lost: this.type(),
                        ally_planet_lost: this.type(),
                        npc_discovered: this.type(),
                        military_research_completed: this.type(),
                        planet_track_upgrade_completed: this.type(),
                        planet_component_finished_building: this.type(),
                        ship_component_finished_building: this.type(),
                        starbase_component_finished_building: this.type(),
                        titan_component_finished_building: this.type(),
                        assets_excavated: this.type(),
                        unit_item_excavated: this.type(),
                        planet_artifact_excavated: this.type(),
                        planet_bonus_excavated: this.type(),
                        exotics_excavated: this.type(),
                        exotics_received_from_npc_reward: this.type(),
                        exotics_received_from_action: this.type(),
                        unit_leveled_up: this.type(),
                        npc_auction_running: this.type(),
                        npc_auction_expired: this.type(),
                        npc_auction_won_by_me: this.type(),
                        npc_auction_won_by_other: this.type(),
                        npc_market_demand_level_increased: this.type(),
                        npc_market_demand_level_decreased: this.type(),
                        npc_asset_market_exclusive_player_started: this.type(),
                        npc_asset_market_exclusive_player_stopped: this.type(),
                        unit_built: this.type(),
                        exotic_built: this.type(),
                        dominant_culture_established: this.type(),
                        dominant_culture_lost: this.type(),
                        enemy_dominant_culture_established_with_owned_planet: this.type(),
                        npc_culture_reward_given: this.type(),
                        npc_reputation_level_increased: this.type(),
                        npc_player_made_dead: this.type(),
                        unit_bounty_increased: this.type(),
                        unit_bounty_received: this.type(),
                        orbital_cannon_shell_detected: this.type(),
                        ping_received: this.type(),
                        npc_raid_sent: this.type(),
                        npc_raid_event_running: this.type(),
                        capital_ship_shields_down: this.type(),
                        capital_ship_hull_severely_damaged: this.type(),
                        capital_ship_lost: this.type(),
                        ally_capital_ship_lost: this.type(),
                        titan_shields_down: this.type(),
                        titan_hull_severely_damaged: this.type(),
                        titan_lost: this.type(),
                        ally_titan_lost: this.type(),
                        ally_titan_built: this.type(),
                        enemy_titan_built: this.type(),
                        fleet_under_attack: this.type(),
                        planet_conversion_started: this.type(),
                    },
                }),
                fleet_under_attack_notification_suppress_duplicates_duration: float(),
                ship_notification_suppress_duplicates_durations: object({
                    keys: {
                        shields_down: float(),
                        hull_severely_damaged: float(),
                    },
                }),
                unit_built_notification_build_kinds: array({
                    items: this.cache.build_kinds,
                    isUnique: true,
                }),
                metal_market_context_icon: this.cache.textures,
                crystal_market_context_icon: this.cache.textures,
                ping_received_names: object({
                    keys: {
                        attention: this.cache.localisation,
                        attack: this.cache.localisation,
                        defend: this.cache.localisation,
                    },
                }),
                derelict_loot_collected_levels: array({
                    items: object({
                        keys: {
                            icon: this.cache.textures,
                            tooltip_picture: this.cache.textures,
                        },
                    }),
                }),
            },
        })
    }
}
