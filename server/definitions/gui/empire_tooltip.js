const { schema, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class EmpireTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                colonized_planets_icon: this.cache.textures,
                colonized_planets_text: this.cache.localisation,
                supply_title_text: this.cache.localisation,
                used_supply_summary_text: this.cache.localisation,
                total_supply_summary_text: this.cache.localisation,
                built_unit_count_text: this.cache.localisation,
                queued_unit_count_text: this.cache.localisation,
                unit_count_value_color: this.cache.colors,
                used_supply_value_color: this.cache.colors,
                total_supply_value_color: this.cache.colors,
                total_supply_in_future_value_color: this.cache.colors,
                supply_value_offset: float(),
                planet_maintenance_costs_header: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                empire_modifiers_income_label: this.cache.localisation,
                detached_from_planet_passive_income_label: this.cache.localisation,
                trade_port_income_label: this.cache.localisation,
                simulation_asset_income_rate_scalar_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                asset_tax_rate_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                exotic_factory_count_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                asset_total_rate_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                researching_subjects_header: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                researching_progress_percentage_color_when_started: this.cache.colors,
                researching_progress_percentage_color_when_not_started: this.cache.colors,
                researching_progress_percentage_gap: float(),
                exotic_count_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                credit_income_rate_from_percentage_of_other_players_value_color: this.cache.colors,
                no_credit_income_description_color: this.cache.colors,
                credit_income_rate_from_percentage_of_other_players_label: this.cache.localisation,
                no_research_points_description: super.label_form2(this.cache.localisation, this.cache.colors),
                total_research_points_label_format: super.label_form2(this.cache.localisation, this.cache.colors),
                asset_delta_event_header_text: 'tooltip.asset_delta_event_header_text',
                asset_delta_event_alliance_offer_text: super.label_form2(this.cache.localisation, this.cache.colors),
                asset_delta_event_bounty_text: super.label_form2(this.cache.localisation, this.cache.colors),
                asset_delta_event_trade_ship_killed_text: super.label_form2(this.cache.localisation, this.cache.colors),
                asset_delta_event_synergy_ally_dead_text: super.label_form2(this.cache.localisation, this.cache.colors),
                asset_delta_event_losing_auction_refund_text: super.label_form2(this.cache.localisation, this.cache.colors),
                asset_delta_event_excavation_reward_text: super.label_form2(this.cache.localisation, this.cache.colors),
                asset_delta_event_value_color_when_positive: this.cache.colors,
                asset_delta_event_value_color_when_negative: this.cache.colors,
                asset_delta_time_ago_cut_off: float(),
            },
        })
    }
}
