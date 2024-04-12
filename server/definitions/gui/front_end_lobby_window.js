const { schema, object, string, array, color, vector2, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndLobbyWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background: object({
                    keys: {
                        layout: super.layout(),
                        brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                        components: array({
                            items: object({
                                keys: {
                                    layout: super.layout(),
                                    brush: this.cache.textures,
                                    brush_render_style: super.brush_render_style(),
                                },
                            }),
                        }),
                    },
                }),
                view_buttons_panel: object({
                    keys: {
                        layout: super.layout(),
                        orientation: super.orientation(),
                        players_view_button: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                                text: this.cache.localisation,
                            },
                        }),
                        options_view_button: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                                text: this.cache.localisation,
                            },
                        }),
                        scenario_details_view_button: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                                text: this.cache.localisation,
                            },
                        }),
                    },
                }),
                players_view_window: object({
                    keys: {
                        layout: super.layout(),
                        team_panels_list_box: super.list_box(this.cache.localisation),
                        team_count_label: super.list_box(this.cache.localisation),
                        team_count_drop_box: super.drop_box(this.cache),
                        team_panel_definition: object({
                            keys: {
                                background: object({
                                    keys: {},
                                }),
                                header_height: float(),
                                header_label_style: super.header_label_style(),
                                header_label_text_prefix: this.cache.localisation,
                                player_slots_border_margins: super.margins(),
                                player_slots_content_margins: super.margins(),
                                player_slots_gap: float(),
                                team_icons: array({
                                    items: string(),
                                    isUnique: true,
                                }),
                            },
                        }),
                        player_slot_window_definition: object({
                            keys: {
                                height: float(),
                                background_when_unoccupied: object({
                                    keys: {
                                        fill_color: color(),
                                    },
                                }),
                                background_when_occupied_by_human: object({
                                    keys: {
                                        fill_color: color(),
                                    },
                                }),
                                background_when_occupied_by_ai: object({
                                    keys: {
                                        fill_color: color(),
                                    },
                                }),
                                drag_and_drop_hint_description: super.label_form2(this.cache),
                                is_ready_button: object({
                                    keys: {
                                        layout: super.layout(),
                                        style: super.style(),
                                        ready_icon: this.cache.textures,
                                        not_ready_icon: this.cache.textures,
                                        ready_text: this.cache.localisation,
                                        not_ready_text: this.cache.localisation,
                                        ready_description: this.cache.localisation,
                                        not_ready_description: this.cache.localisation,
                                    },
                                }),
                                remove_player_button: object({
                                    keys: {
                                        layout: super.layout(),
                                        style: super.style(),
                                        icon: this.cache.textures,
                                        text: this.cache.localisation,
                                        description: this.cache.localisation,
                                        ban_line: super.label_form(this.cache),
                                    },
                                }),
                                slot_status_button: object({
                                    keys: {
                                        layout: super.layout(),
                                        style: super.style(),
                                        status_definitions: object({
                                            keys: {
                                                open: super.status_definition(this.cache),
                                                closed: super.status_definition(this.cache),
                                                human: super.status_definition(this.cache),
                                                ai: super.status_definition(this.cache),
                                            },
                                        }),
                                    },
                                }),
                                theme_button: object({
                                    keys: {
                                        layout: super.layout(),
                                        style: super.style(),
                                        random_icon: this.cache.textures,
                                    },
                                }),
                                name_label: object({
                                    keys: {
                                        layout: super.layout(),
                                        style: super.style(),
                                        text_color_when_my_player: this.cache.colors,
                                        text_color_when_other_player: this.cache.colors,
                                        text_color_when_lost: this.cache.colors,
                                    },
                                }),
                                race_button: super.button(this.cache, {
                                    extra_properties: {
                                        random_player_race_name: this.cache.localisation,
                                    },
                                }),
                                faction_button: super.button(this.cache),
                                ai_difficulty_button: super.button(this.cache),
                                ai_behavior_button: super.button(this.cache),
                            },
                        }),
                    },
                }),
                game_code_box: super.button(this.cache),
                game_code_label: object({
                    keys: {
                        layout: super.layout(),
                        text: this.cache.localisation,
                    },
                }),
                start_game_button: super.button(this.cache),
                exit_lobby_button: super.button(this.cache),
                options_view_window: object({
                    keys: {
                        layout: super.layout(),
                        options_panel: object({
                            keys: {
                                layout: super.layout(),
                                buttons_layout_grid: this.layout_grid(),
                                toggle_option_button_shared_definition: object({
                                    keys: {
                                        value_text_when_true: this.cache.localisation,
                                        value_text_when_false: this.cache.localisation,
                                        value_color_when_true: this.cache.colors,
                                        value_color_when_false: this.cache.colors,
                                        is_loading_saved_game_description: super.label_form2(this.cache),
                                    },
                                }),
                                float_option_button_shared_definition: object({
                                    keys: {
                                        status_names: super.status(this.cache.localisation),
                                        status_colors: super.status(this.cache.colors),
                                        disabled_color: this.cache.colors,
                                        restricted_description: super.label_form2(this.cache),
                                    },
                                }),
                                can_gravity_wells_move_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        can_gravity_wells_move_not_allowed_by_scenario_description: super.label_form2(this.cache),
                                        tooltip: super.tooltip(this.cache),
                                    },
                                }),
                                player_lost_unlimited_detection_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                    },
                                }),
                                home_planet_victory_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                    },
                                }),
                                colonization_victory_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                    },
                                }),
                                asset_income_rate_scalar_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                        status_values: super.status_values(),
                                    },
                                }),
                                research_rate_scalar_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                        status_values: super.status_values(),
                                    },
                                }),
                                unit_build_rate_scalar_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                        status_values: super.status_values(),
                                    },
                                }),
                                gravity_well_orbit_speed_scalar_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                        status_values: super.status_values(),
                                    },
                                }),
                                base_simulation_time_scale_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                        status_values: super.status_values(),
                                    },
                                }),
                                max_health_points_scalar_button: object({
                                    keys: {
                                        style: super.style(),
                                        grid_layout_coord: vector2(),
                                        icon: this.cache.textures,
                                        name: this.cache.localisation,
                                        description: this.cache.localisation,
                                        tooltip: super.tooltip(this.cache),
                                        status_values: super.status_values(),
                                    },
                                }),
                            },
                        }),
                    },
                }),
                scenario_details_view_window: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                model: object({
                    keys: {
                        ai_difficulty_definitions: object({
                            keys: {
                                easy: super.ai_dificulty_definition(this.cache),
                                medium: super.ai_dificulty_definition(this.cache),
                                hard: super.ai_dificulty_definition(this.cache),
                                unfair: super.ai_dificulty_definition(this.cache),
                                nightmare: super.ai_dificulty_definition(this.cache),
                                impossible: super.ai_dificulty_definition(this.cache),
                            },
                        }),
                        ai_behavior_definitions: object({
                            keys: {
                                aggressive: super.ai_dificulty_definition(this.cache),
                                defensive: super.ai_dificulty_definition(this.cache),
                                research: super.ai_dificulty_definition(this.cache),
                                economic: super.ai_dificulty_definition(this.cache),
                            },
                        }),
                        random_ai_behavior_definition: super.ai_dificulty_definition(this.cache),
                    },
                }),
            },
        })
    }
}
