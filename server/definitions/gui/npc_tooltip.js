const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class NpcTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    reward_type_names() {
        return object({
            keys: {
                unit_item: this.cache.localisation,
                random_unit_item: this.cache.localisation,
                assets: this.cache.localisation,
                exotics: this.cache.localisation,
                random_exotics: this.cache.localisation,
                send_raid_action: this.cache.localisation,
                ability: this.cache.localisation,
                asset_market_exclusive_use: this.cache.localisation,
                spawn_units: this.cache.localisation,
            },
        })
    }

    reward_type_colors() {
        return object({
            keys: {
                unit_item: this.cache.colors,
                random_unit_item: this.cache.colors,
                assets: this.cache.colors,
                exotics: this.cache.colors,
                random_exotics: this.cache.colors,
                send_raid_action: this.cache.colors,
                ability: this.cache.colors,
                asset_market_exclusive_use: this.cache.colors,
                spawn_units: this.cache.colors,
            },
        })
    }

    create() {
        return schema({
            keys: {
                unknown_npc_title: this.cache.localisation,
                unknown_npc_description: this.cache.localisation,
                unknown_npc_icon: string(),
                reward_type_names: this.reward_type_names(),
                reward_type_colors: this.reward_type_colors(),
                reward_name_color: this.cache.colors,
                reward_level_color: this.cache.colors,
                auction_rewards_header_line: super.label_form(this.cache),
                active_auction_bid_amount_label: this.cache.localisation,
                active_auction_last_result_header: this.cache.localisation,
                active_auction_bidder_count_line: super.label_form(this.cache),
                auction_lost_refund_percentage_line: super.label_form(this.cache),
                reward_assets_label: this.cache.localisation,
                asset_bid_description: this.cache.localisation,
                exotic_bid_description: this.cache.localisation,
                is_dead_line: this.label_form2(this.cache),
                reward_exotics_label: this.cache.localisation,
                reward_exotic_name_color: this.cache.colors,
                asset_market_header_labels: object({
                    keys: {
                        metal: this.cache.localisation,
                        crystal: this.cache.localisation,
                    },
                }),
                exotic_market_header_label: this.cache.localisation,
                exotic_market_header_icon: string(),
                market_demand_level_label_prefix: this.cache.localisation,
                market_demand_level_buy_credits_cost_modifiers_label: this.cache.localisation,
                market_demand_level_sell_credits_received_modifiers_label: this.cache.localisation,
                exotic_sell_price_label: this.cache.localisation,
                asset_sell_asset_amount_label: this.cache.localisation,
                asset_sell_credits_received_label: this.cache.localisation,
                asset_buy_price_label: this.cache.localisation,
                asset_buy_amount_received_label: this.cache.localisation,
                winning_auction_bid_amount_label: this.cache.localisation,
                your_winning_auction_bid_amount_label: this.cache.localisation,
                your_losing_auction_bid_amount_label: this.cache.localisation,
                other_losing_auction_bid_amount_label: this.cache.localisation,
                player_bid_asset_offset: integer(),
                active_auction_penalty_title: this.cache.localisation,
                auction_penalty_active_player_only_text: this.cache.localisation,
                auction_penalty_active_and_other_player_text: this.cache.localisation,
                auction_penalty_active_and_many_players_text: this.cache.localisation,
                auction_penalty_one_other_player_text: this.cache.localisation,
                auction_penalty_many_other_players_text: this.cache.localisation,
                penalized_auction_bid_amount_label: this.cache.localisation,
                culture_reward_header_label: this.cache.localisation,
                culture_reward_never_available_line: super.label_form2(this.cache),
                time_until_next_culture_reward_line: super.label_form(this.cache),
                raid_reward_supply_line: super.label_form(this.cache),
                raid_reward_bounty_credits_label: this.cache.localisation,
                market_exclusive_use_duration_line: super.label_form(this.cache),
                market_exclusive_player_remaining_duration_line: super.label_form(this.cache),
                npc_trade_exports_header_label: this.cache.localisation,
                reputation_points_label: this.cache.localisation,
                reputation_level_label: this.cache.localisation,
                reputation_level_value_color_at_max_level: this.cache.colors,
                reputation_details_header: this.cache.localisation,
                reputation_level_reward_sub_header: this.cache.localisation,
                auction_winner_reputation_points_label: this.cache.localisation,
                next_reputation_level_details_header: this.cache.localisation,
            },
        })
    }
}
