const { schema, float, object, enumerate, array, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class NotificationUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    icon_type_definition() {
        return enumerate({
            items: [
                'brush',
                'gravity_well_primary_fixture',
                'planet',
                'planet_track',
                'planet_item',
                'player',
                'npc_player',
                'research_subject',
                'research_domain_tier',
                'unit',
                'unit_item',
                'npc_auction_reward',
                'npc_auction_bid_amount',
                'npc_culture_reward',
                'asset_market',
                'exotic',
                'ping',
                'derelict_loot_collected_level',
                'asset_values',
            ],
        })
    }

    icon_definition() {
        return object({
            keys: {
                icon_type: this.icon_type_definition(),
                picture_type: this.icon_type_definition(),
                picture: this.cache.textures(),
                brush: this.cache.textures(),
                has_backdrop: boolean(),
                click_action: enumerate({
                    items: [
                        'select_unit',
                        'select_unit_current_gravity_well_fixture',
                        'select_planet',
                        'focus_on_gravity_well',
                        'open_civilian_research_window',
                        'open_military_research_window',
                        'open_npcs_window',
                        'open_npc_markets_window',
                        'open_player_alliance_offer_window',
                        'open_players_window',
                        'open_exotics_window',
                        'change_npc_auction_bid_amount',
                    ],
                }),
            },
        })
    }

    type_definition() {
        return object({
            required: ['primary_icon'],
            keys: {
                tooltip_picture: this.icon_definition(),
                primary_icon: this.icon_definition(),
                secondary_icon: this.icon_definition(),
                should_flash: boolean(),
                name: this.cache.localisation,
                name_postfix: this.cache.localisation,
                description: this.cache.localisation,
                unit_dialogue_sound_type: enumerate({
                    items: [
                        'spawned',
                        'selected',
                        'order_issued',
                        'attack_order_issued',
                        'retreat',
                        'hyperspace_charge_started',
                        'cannot_hyperspace',
                        'joined_fleet',
                        'shields_down',
                        'armor_down',
                        'became_crippled',
                        'destroyed',
                        'ship_component_finished_building',
                        'ability_cooldown_is_not_completed',
                        'insufficient_antimatter',
                    ],
                }),
                sound: this.cache.ogg,
                suppress_duplicates_duration: float(),
                duration: enumerate({
                    items: ['brief'],
                }),
                player_sound_id: Definitions.sound_ids(),
                npc_sound_id: Definitions.npc_sound_ids(),
                player_alliance_player_sound_ids: object({
                    keys: {
                        cease_fire: this.cache.user_interface_sounds,
                        share_vision: this.cache.user_interface_sounds,
                        synergy: this.cache.user_interface_sounds,
                    },
                }),
                planet_track_type_player_sound_ids: object({
                    keys: {
                        defense: this.cache.user_interface_sounds,
                        logistics: this.cache.user_interface_sounds,
                        commerce: this.cache.user_interface_sounds,
                        mining: this.cache.user_interface_sounds,
                        research: this.cache.user_interface_sounds,
                        surveying: this.cache.user_interface_sounds,
                        /* game_version v1.42.5 */
                        focus: this.cache.user_interface_sounds,
                        /* */
                    },
                }),
                ping_type_player_sound_ids: object({
                    keys: {
                        attention: this.cache.user_interface_sounds,
                        attack: this.cache.user_interface_sounds,
                        defend: this.cache.user_interface_sounds,
                    },
                }),
            },
        })
    }

    create() {
        return schema({
            required: [
                'crystal_market_context_icon',
                'default_sound',
                'derelict_loot_collected_levels',
                'fleet_under_attack_notification_suppress_duplicates_duration',
                'metal_market_context_icon',
                'ping_received_names',
                'ship_notification_suppress_duplicates_durations',
                'types',
                'unit_built_notification_build_kinds',
            ],
            keys: {
                default_sound: this.cache.ogg,
                npc_pirates_tag: this.cache.npc_tags,
                types: object({
                    keys: {
                        enemy_planet_made_dead_from_bombing: this.type_definition(),
                        enemy_units_arrived: this.type_definition(),
                        pirate_units_arrived: this.type_definition(),
                        enemy_special_operations_units_arrived: this.type_definition(),
                        ally_player_lost: this.type_definition(),
                        enemy_player_lost: this.type_definition(),
                        insurgent_units_arrived: this.type_definition(),
                        derelict_loot_discovered: this.type_definition(),
                        /* game_version v1.40.14 */
                        objective_structure_captured: this.type_definition(),
                        objective_structure_destroyed: this.type_definition(),
                        enemy_captured_objective_structure: this.type_definition(),
                        enemy_destroyed_objective_structure: this.type_definition(),
                        /* */
                        derelict_loot_collected: this.type_definition(),
                        wreckage_loot_collected: this.type_definition(),
                        player_lost: this.type_definition(),
                        player_discovered: this.type_definition(),
                        alliance_offer_received: this.type_definition(),
                        alliance_offer_revised: this.type_definition(),
                        alliance_offer_accepted: this.type_definition(),
                        alliance_offer_declined: this.type_definition(),
                        civilian_research_subject_completed: this.type_definition(),
                        military_research_subject_completed: this.type_definition(),
                        victory_condition_alliance_guard_research_subject_completed: this.type_definition(),
                        ally_victory_condition_alliance_guard_research_subject_completed: this.type_definition(),
                        civilian_research_domain_tier_acquired: this.type_definition(),
                        military_research_domain_tier_acquired: this.type_definition(),
                        planet_discovered: this.type_definition(),
                        alliance_offer_expired: this.type_definition(),
                        alliance_broken: this.type_definition(),
                        npc_alliance_broken: this.type_definition(),
                        civilian_research_completed: this.type_definition(),
                        planet_being_bombed: this.type_definition(),
                        planet_colonized: this.type_definition(),
                        destroy_planet_rewards_given: this.type_definition(),
                        planet_lost: this.type_definition(),
                        ally_planet_lost: this.type_definition(),
                        npc_discovered: this.type_definition(),
                        military_research_completed: this.type_definition(),
                        planet_track_upgrade_completed: this.type_definition(),
                        planet_component_finished_building: this.type_definition(),
                        ship_component_finished_building: this.type_definition(),
                        starbase_component_finished_building: this.type_definition(),
                        titan_component_finished_building: this.type_definition(),
                        assets_excavated: this.type_definition(),
                        unit_item_excavated: this.type_definition(),
                        planet_artifact_excavated: this.type_definition(),
                        planet_bonus_excavated: this.type_definition(),
                        exotics_excavated: this.type_definition(),
                        exotics_received_from_npc_reward: this.type_definition(),
                        exotics_received_from_action: this.type_definition(),
                        unit_leveled_up: this.type_definition(),
                        npc_auction_running: this.type_definition(),
                        npc_auction_expired: this.type_definition(),
                        npc_auction_won_by_me: this.type_definition(),
                        npc_auction_won_by_other: this.type_definition(),
                        npc_market_demand_level_increased: this.type_definition(),
                        npc_market_demand_level_decreased: this.type_definition(),
                        capital_ship_armor_down: this.type_definition(),
                        capital_ship_became_crippled: this.type_definition(),
                        npc_metal_market_exclusive_player_started_positive: this.type_definition(),
                        npc_metal_market_exclusive_player_started_negative: this.type_definition(),
                        npc_crystal_market_exclusive_player_started_positive: this.type_definition(),
                        npc_crystal_market_exclusive_player_started_negative: this.type_definition(),
                        npc_asset_market_exclusive_player_started: this.type_definition(),
                        npc_asset_market_exclusive_player_stopped: this.type_definition(),
                        unit_built: this.type_definition(),
                        planet_conversion_colonized: this.type_definition(),
                        player_added_first_ruler_ship: this.type_definition(),
                        /* game_version v1.41 */
                        mad_titan_built_by_player: this.type_definition(),
                        mad_titan_built_by_enemy: this.type_definition(),
                        /* */
                        ally_titan_destroyed: this.type_definition(),
                        titan_destroyed: this.type_definition(),
                        titan_armor_down: this.type_definition(),
                        titan_became_crippled: this.type_definition(),
                        ally_starbase_destroyed: this.type_definition(),
                        starbase_destroyed: this.type_definition(),
                        starbase_became_crippled: this.type_definition(),
                        starbase_armor_down: this.type_definition(),
                        military_structure_built: this.type_definition(),
                        civilian_structure_built: this.type_definition(),
                        starbase_shields_down: this.type_definition(),
                        ally_capital_ship_destroyed: this.type_definition(),
                        capital_ship_destroyed: this.type_definition(),
                        capital_ship_became_crippled: this.type_definition(),
                        enemy_phase_jump_inhibitor_built: this.type_definition(),
                        player_units_arrived_at_enemy_phase_jump_inhibitor: this.type_definition(),
                        exotic_built: this.type_definition(),
                        dominant_culture_established: this.type_definition(),
                        dominant_culture_lost: this.type_definition(),
                        enemy_dominant_culture_established_with_owned_planet: this.type_definition(),
                        assets_surveyed: this.type_definition(),
                        unit_item_surveyed: this.type_definition(),
                        exotics_surveyed: this.type_definition(),
                        planet_artifact_surveyed: this.type_definition(),
                        planet_bonus_surveyed: this.type_definition(),
                        npc_culture_reward_given: this.type_definition(),
                        npc_reputation_level_increased: this.type_definition(),
                        npc_player_made_dead: this.type_definition(),
                        unit_bounty_increased: this.type_definition(),
                        unit_bounty_received: this.type_definition(),
                        orbital_cannon_shell_detected: this.type_definition(),
                        ping_received: this.type_definition(),
                        npc_raid_sent: this.type_definition(),
                        npc_raid_event_running: this.type_definition(),
                        capital_ship_shields_down: this.type_definition(),
                        capital_ship_hull_severely_damaged: this.type_definition(),
                        capital_ship_lost: this.type_definition(),
                        ally_capital_ship_lost: this.type_definition(),
                        titan_shields_down: this.type_definition(),
                        titan_hull_severely_damaged: this.type_definition(),
                        titan_lost: this.type_definition(),
                        ally_titan_lost: this.type_definition(),
                        ally_titan_built: this.type_definition(),
                        enemy_titan_built: this.type_definition(),
                        fleet_under_attack: this.type_definition(),
                        planet_conversion_started: this.type_definition(),
                    },
                }),
                fleet_under_attack_notification_suppress_duplicates_duration: float(),
                ship_notification_suppress_duplicates_durations: object({
                    keys: {
                        shields_down: float(),
                        armor_down: float(),
                        became_crippled: float(),
                        destroyed: float(),
                    },
                }),
                unit_built_notification_build_kinds: array({
                    items: this.cache.build_kinds,
                    isUnique: true,
                }),
                metal_market_context_icon: this.cache.textures(),
                crystal_market_context_icon: this.cache.textures(),
                ping_received_names: object({
                    keys: {
                        attention: this.cache.localisation,
                        attack: this.cache.localisation,
                        defend: this.cache.localisation,
                    },
                }),
                derelict_loot_collected_levels: array({
                    items: object({
                        required: ['tooltip_picture'],
                        keys: {
                            icon: this.cache.textures(),
                            tooltip_picture: this.cache.textures(),
                        },
                    }),
                }),
            },
        })
    }
}
