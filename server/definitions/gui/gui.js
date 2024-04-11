const { object, string, color, integer, schema, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Gui extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    dialog_frame() {
        return object({
            keys: {
                layout: super.layout(),
                background: object({
                    keys: {
                        brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                    },
                }),
                game_code_label: object({
                    keys: {
                        layout: super.layout(),
                        text: this.cache.localisation,
                    },
                }),
                game_code_text_entry: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                buttons_panel: object({
                    keys: {
                        layout: super.layout(),
                        save_game_button: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                                text: this.cache.localisation,
                            },
                        }),
                        children_gap: integer(),
                        quit_game_button: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                                text: this.cache.localisation,
                            },
                        }),
                        exit_app_button: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                                text: this.cache.localisation,
                            },
                        }),
                        open_settings_button: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                                text: this.cache.localisation,
                            },
                        }),
                        close_button: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                                text: this.cache.localisation,
                            },
                        }),
                    },
                }),
            },
        })
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                dim_color: color(),
                dialog_frame: this.dialog_frame(),
                colonized_planets_icon: string(),
                colonized_planets_text: this.cache.localisation,
                supply_title_text: this.cache.localisation,
                used_supply_summary_text: this.cache.localisation,
                total_supply_summary_text: this.cache.localisation,
                built_unit_count_text: this.cache.localisation,
                queued_unit_count_text: this.cache.localisation,
                unit_count_value_color: this.cache.colors,
                used_supply_value_color: this.cache.colors,
                asset_delta_event_value_color_when_positive: this.cache.colors,
                asset_delta_event_value_color_when_negative: this.cache.colors,
                asset_delta_time_ago_cut_off: float(),
                total_supply_value_color: this.cache.colors,
                researching_progress_percentage_color_when_started: this.cache.colors,
                researching_progress_percentage_color_when_not_started: this.cache.colors,
                researching_progress_percentage_gap: integer(),
                planet_maintenance_costs_header: object({
                    keys: {
                        label_text: this.cache.localisation,
                        label_color: this.cache.colors,
                    },
                }),
                exotic_count_line: object({
                    keys: {
                        value_color: this.cache.colors,
                    },
                }),
                simulation_asset_income_rate_scalar_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                    },
                }),
                asset_tax_rate_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                    },
                }),
                exotic_factory_count_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                asset_total_rate_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        label_color: this.cache.colors,
                    },
                }),
                researching_subjects_header: object({
                    keys: {
                        label_text: this.cache.localisation,
                    },
                }),
                total_research_points_label_format: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                no_research_points_description: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                asset_delta_event_bounty_text: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                asset_delta_event_trade_ship_killed_text: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                asset_delta_event_synergy_ally_dead_text: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                asset_delta_event_alliance_offer_text: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                asset_delta_event_losing_auction_refund_text: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                asset_delta_event_excavation_reward_text: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                credit_income_rate_from_percentage_of_other_players_value_color: this.cache.colors,
                no_credit_income_description_color: this.cache.colors,
                credit_income_rate_from_percentage_of_other_players_label: this.cache.localisation,
                empire_modifiers_income_label: this.cache.localisation,
                detached_from_planet_passive_income_label: this.cache.localisation,
                trade_port_income_label: this.cache.localisation,
                total_supply_in_future_value_color: this.cache.colors,
                supply_value_offset: integer(),
                ability_name_color: string(),
                ability_level_color: string(),
                required_level_tooltip_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                antimatter_cost_tooltip_line: object({
                    keys: {
                        icon: string(),
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                hull_cost_tooltip_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                shields_cost_tooltip_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                planet_health_cost_tooltip_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                cooldown_tooltip_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                range_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                between_gravity_well_range_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                spawned_unit_build_time_tooltip_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                level_not_valid_tooltip_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        label_color: this.cache.colors,
                    },
                }),
                min_required_npc_reputation_level_required_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        label_color: this.cache.colors,
                    },
                }),
                brief_ability_description_color: this.cache.colors,
                required_structure_in_gravity_well_label: this.cache.localisation,
                required_structure_in_gravity_well_name_color_when_missing: this.cache.colors,
                required_structure_in_gravity_well_name_color_when_not_missing: this.cache.colors,
                unit_to_build_line_prefix: this.cache.localisation,
                enable_auto_cast_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        label_color: this.cache.colors,
                    },
                }),
                disable_auto_cast_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        label_color: this.cache.colors,
                    },
                }),
                disable_auto_cast_if_any_enemy_bomb_planet_ships_in_gravity_well_description: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                background: object({
                    keys: {
                        brush: this.cache.textures,
                    },
                }),
                not_selected_item_background: object({
                    keys: {
                        brush: this.cache.textures,
                    },
                }),
                selected_item_background: object({
                    keys: {
                        brush: this.cache.textures,
                    },
                }),
                font: this.cache.fonts,
                text_color: color(),
                text_layout: object({
                    keys: {
                        margins: super.margins(),
                    },
                }),
                item_height: integer(),
                item_margins: super.margins(),
                scroll_bar_layout: super.scroll_bar_layout(),
            },
        })
    }
}
