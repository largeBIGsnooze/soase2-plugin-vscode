const { schema, string, object, color, boolean, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEndGameSummaryDialog extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                dim_color: color(),
                statistic_names: object({
                    keys: {
                        name_seperator: string(),
                        category_names: object({
                            keys: {
                                planets: this.cache.localisation,
                                combat: this.cache.localisation,
                                credits: this.cache.localisation,
                                metal: this.cache.localisation,
                                crystal: this.cache.localisation,
                                research: this.cache.localisation,
                                building: this.cache.localisation,
                                npc_market: this.cache.localisation,
                                other: this.cache.localisation,
                            },
                        }),
                        statistic_names: object({
                            keys: {
                                planets: this.cache.localisation,
                                civilian_structure_slots: this.cache.localisation,
                                military_structure_slots: this.cache.localisation,
                                planet_components: this.cache.localisation,
                                planet_track_levels_defense: this.cache.localisation,
                                planet_track_levels_logistics: this.cache.localisation,
                                planet_track_levels_commerce: this.cache.localisation,
                                planet_track_levels_mining: this.cache.localisation,
                                planet_track_levels_excavation: this.cache.localisation,
                                derelict_loot_captured: this.cache.localisation,
                                wreckage_loot_captured: this.cache.localisation,
                                damage_dealt: this.cache.localisation,
                                ship_kills: this.cache.localisation,
                                structure_kills: this.cache.localisation,
                                planet_bombing_damage_dealt: this.cache.localisation,
                                planet_kills: this.cache.localisation,
                                supply_used: this.cache.localisation,
                                supply_killed: this.cache.localisation,
                                completed_research_subjects: this.cache.localisation,
                                credit_balance: this.cache.localisation,
                                credits_given: this.cache.localisation,
                                credits_spent_on_npc_market: this.cache.localisation,
                                credits_received_from_npc_market: this.cache.localisation,
                                credit_total_income_rate: this.cache.localisation,
                                credit_income_rate_from_planet_tracks: this.cache.localisation,
                                credit_income_rate_from_trade_ports: this.cache.localisation,
                                credit_income_rate_from_other: this.cache.localisation,
                                credit_planet_maintenance_cost_rate: this.cache.localisation,
                                credit_tax_rate: this.cache.localisation,
                                metal_balance: this.cache.localisation,
                                metal_given: this.cache.localisation,
                                metal_bought_from_npc_market: this.cache.localisation,
                                metal_sold_on_npc_market: this.cache.localisation,
                                metal_total_income_rate: this.cache.localisation,
                                metal_income_rate_from_planet_tracks: this.cache.localisation,
                                metal_income_rate_from_asteroids: this.cache.localisation,
                                metal_income_rate_from_trade_ports: this.cache.localisation,
                                metal_income_rate_from_other: this.cache.localisation,
                                metal_tax_rate: this.cache.localisation,
                                crystal_balance: this.cache.localisation,
                                crystal_given: this.cache.localisation,
                                crystal_bought_from_npc_market: this.cache.localisation,
                                crystal_sold_on_npc_market: this.cache.localisation,
                                crystal_total_income_rate: this.cache.localisation,
                                crystal_income_rate_from_planet_tracks: this.cache.localisation,
                                crystal_income_rate_from_asteroids: this.cache.localisation,
                                crystal_income_rate_from_trade_ports: this.cache.localisation,
                                crystal_income_rate_from_other: this.cache.localisation,
                                crystal_tax_rate: this.cache.localisation,
                                civilian_research_points: this.cache.localisation,
                                military_research_points: this.cache.localisation,
                                npc_market_exotic_sold: this.cache.localisation,
                                dominant_culture_gravity_wells: this.cache.localisation,
                                auctions_won: this.cache.localisation,
                                exotics_given: this.cache.localisation,
                                strikecraft_built: this.cache.localisation,
                                corvettes_built: this.cache.localisation,
                                frigates_built: this.cache.localisation,
                                cruisers_built: this.cache.localisation,
                                capital_ships_built: this.cache.localisation,
                                titans_built: this.cache.localisation,
                                starbases_built: this.cache.localisation,
                                factory_structures_built: this.cache.localisation,
                                max_influence_points: this.cache.localisation,
                            },
                        }),
                    },
                }),
                background_window: object({
                    keys: {
                        layout: super.layout(),
                        content_panel: object({
                            keys: {
                                layout: super.layout(),
                                close_button: super.button(this.cache),
                                watch_recorded_game_button: super.button(this.cache),
                                statistic_item_list_box: object({
                                    keys: {
                                        style: super.style(),
                                        layout: super.layout(),
                                        category_expanded_icon: this.cache.textures,
                                        category_not_expanded_icon: this.cache.textures,
                                        category_expanded_icon_layout: super.layout(),
                                        name_text_layout: super.layout(),
                                        child_name_text_layout: super.layout(),
                                        name_color: this.cache.colors,
                                    },
                                }),
                                player_buttons_panel: object({
                                    keys: {
                                        orientation: super.orientation(),
                                        is_centered: boolean(),
                                        children_gap: float(),
                                        layout: super.layout(),
                                        button_shared_definition: super.button(this.cache),
                                    },
                                }),
                                statistic_chart: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: super.background(this.cache.textures),
                                        line_content_layout: super.layout(),
                                        title_font: this.cache.fonts,
                                        title_color: this.cache.colors,
                                        title_layout: super.layout(),
                                        max_value_font: this.cache.fonts,
                                        max_value_color: this.cache.colors,
                                        max_value_layout: super.layout(),
                                        max_time_font: this.cache.fonts,
                                        max_time_color: this.cache.colors,
                                        max_time_layout: super.layout(),
                                        anchor_line_color: color(),
                                        statistic_value_tooltip_color: this.cache.colors,
                                        highest_statistic_value_tooltip_color: this.cache.colors,
                                    },
                                }),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
