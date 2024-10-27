const _ = require('./data_types')

module.exports = class UI {
    constructor() {}
    static margins(desc = '') {
        return _.object({
            desc: desc,
            keys: {
                top: _.integer(true),
                bottom: _.integer(true),
                left: _.integer(true),
                right: _.integer(true),
            },
        })
    }
    static brush_render_style() {
        return _.enumerate({
            items: ['stretched', 'centered'],
        })
    }
    static label_form2(data) {
        return _.object({
            keys: {
                text: data['localisation'],
                color: data['colors'],
            },
        })
    }
    static button2() {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                text: _.string(),
            },
        })
    }

    static tweaks_window() {
        return _.object({
            keys: {
                layout: this.layout(),
                reflect_box: _.object({
                    keys: {
                        layout: this.layout(),
                    },
                }),
                controls_panel: _.object({
                    keys: {
                        layout: this.layout(),
                    },
                }),
                local_space_button: this.button2(),
                local_space_button: this.button2(),
                global_space_button: this.button2(),
                pan_x_negative_button: this.button2(),
                pan_x_positive_button: this.button2(),
                pan_y_negative_button: this.button2(),
                pan_y_positive_button: this.button2(),
                pan_z_negative_button: this.button2(),
                pan_z_positive_button: this.button2(),
                yaw_negative_button: this.button2(),
                yaw_positive_button: this.button2(),
                pitch_negative_button: this.button2(),
                pitch_positive_button: this.button2(),
                roll_negative_button: this.button2(),
                roll_positive_button: this.button2(),
            },
        })
    }

    static icon_size() {
        return _.enumerate({
            items: ['large'],
        })
    }

    static icon_style() {
        return _.enumerate({
            items: ['hud_icon_only'],
        })
    }
    static pan() {
        return _.object({
            keys: {
                layout: this.layout(),
                text: _.string(),
            },
        })
    }

    static portrait_window() {
        return _.object({
            keys: {
                layout: this.layout(),
                background: _.object({
                    keys: {
                        layout: this.layout(),
                    },
                }),
                overlay: _.enumerate({
                    items: ['entry_simple_frame'],
                }),
            },
        })
    }
    static anchor() {
        return _.enumerate({
            items: ['top_center', 'top_left', 'bottom_center', 'top_right', 'bottom_left', 'center_right', 'center_left', 'bottom_right'],
        })
    }
    static line_definition(fonts, colors) {
        return _.object({
            keys: {
                icon_size: _.vector2i(),
                icon_and_text_gap: _.float(),
                label_font: fonts,
                value_font: fonts,
                label_color: colors,
                value_offset: _.float(),
                post_value_color: colors,
                bottom_gap: _.float(),
            },
        })
    }

    static button_panel({ extra_properties: extra_properties } = {}) {
        return _.object({
            keys: {
                layout: this.layout(),
                button_layout_grid: this.layout_grid(),
                column_count: _.integer(),
                row_count: _.integer(),
                ...extra_properties,
            },
        })
    }

    static stacks_panel() {
        return _.object({
            keys: {
                layout: this.layout(),
                stack_button_count: _.float(),
                stack_button_grid: this.layout_grid(),
            },
        })
    }

    static grid_button(localisation) {
        return _.object({
            keys: {
                layout_grid_coord: _.vector2i(),
                name: localisation,
                description: localisation,
            },
        })
    }

    static initial_state() {
        return _.object({
            keys: {
                // TODO: Find out status stuff in .gui ....
                status: _.enumerate({
                    items: ['docked'],
                }),
                floating_area: _.object({
                    keys: {
                        top_left: _.vector2i(),
                        size: _.vector2i(),
                    },
                }),
                dock_direction: this.alignment(),
                dock_size: _.vector2i(),
            },
        })
    }

    static orientation() {
        return _.enumerate({
            items: ['horizontal', 'vertical'],
        })
    }

    static overlays(textures) {
        return _.array({
            items: _.object({
                keys: {
                    layout: this.layout(),
                    brush: textures,
                    brush_render_style: this.brush_render_style(),
                },
            }),
        })
    }

    static background_window(data) {
        return _.object({
            keys: {
                layout: this.layout(),
                content_panel: this.content_panel(data),
                brush: data['textures'],
                brush_render_style: this.brush_render_style(),
                components: _.array({
                    items: this.component(data['textures']),
                    isUnique: true,
                }),
            },
        })
    }

    static sound_settings_element(localisation) {
        return _.object({
            keys: {
                layout: this.layout(),
                label: _.object({
                    keys: {
                        style: this.style(),
                        text: localisation,
                    },
                }),
                scroll_bar: _.object({
                    keys: {
                        layout: this.layout(),
                        style: this.style(),
                    },
                }),
            },
        })
    }

    static panel(localisation, colors, textures, { extra_properties: extra_properties } = {}) {
        return _.object({
            keys: {
                layout: this.layout(),
                orientation: this.orientation(),
                sub_collection_size: _.integer(),
                sub_collection_gap: _.integer(),
                children_gap: _.integer(),
                row_count: _.integer(),
                background: this.background(textures),
                child_layout_grid: this.layout_grid(),
                button_layout_grid: this.layout_grid(),
                ...extra_properties,
                button_shared_definition: _.object({
                    keys: {
                        not_included_in_offer_alpha: _.float(),
                        style: this.style(),
                        layout: this.layout(),
                        tooltip: this.tooltip(localisation, textures),
                        tooltip_title_prefix_text: localisation,
                        tooltip_available_exotic_count_label: localisation,
                        tooltip_available_exotic_count_color: colors,
                        count_layout: this.layout(),
                        count_font: _.string(),
                        count_color: colors,
                    },
                }),
            },
        })
    }

    static animation(textures) {
        return _.object({
            keys: {
                left_to_right_blip: textures,
                top_to_bottom_blip: textures,
                right_to_left_blip: textures,
                bottom_to_top_blip: textures,
                glow: textures,
                travel_speed: _.integer(),
            },
        })
    }
    static scroll_bar_layout() {
        return _.object({
            keys: {
                margins: this.margins(),
                horizontal_alignment: this.alignment(),
                width: _.integer(),
            },
        })
    }

    static drop_box(data) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                ffa_name: data['localisation'],
                teams_postfix: data['localisation'],
                drag_and_drop_hint_description: this.label_form2(data),
            },
        })
    }

    static list_box_styles() {
        return _.enumerate({
            items: ['debug', 'drop_box_list', 'mods'],
        })
    }
    static drop_box_styles() {
        return _.enumerate({
            items: ['debug', 'drop_box_list'],
        })
    }

    static backgrounds(textures) {
        return _.array({
            items: this.background(textures),
            isUnique: true,
        })
    }

    static list_box(localisation) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                text: localisation,
            },
        })
    }

    static content_panel(data) {
        return _.object({
            keys: {
                layout: this.layout(),
                title_label: this.label(data),
                message_label: this.label(data),
                close_button: this.label(data),
                action_name_label: this.label(data),
                input_mapping_label: this.label(data),
                bind_button: this.label(data),
                cancel_button: this.label(data),
                welcome_dialog_list_box: this.list_box(data['localisation']),
                sins2_link_icon: this.icon(data['textures']),
                sins2_link_label: this.label(data),
                sins2_link_text_entry: this.text_entry(),
                sins2_link_open_button: this.button(data),
                discord_link_icon: this.icon(data['textures']),
                discord_link_label: this.label(data),
                discord_link_text_entry: this.text_entry(),
                discord_link_open_button: this.button(data),
            },
        })
    }

    static drop_shadow(textures) {
        return _.object({
            keys: {
                brush: textures,
                brush_render_style: this.brush_render_style(),
                outer_margins: this.margins(),
            },
        })
    }

    static label(data) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                text: data['localisation'],
                icon: data['textures'],
                icon_size: this.icon_size(),
            },
        })
    }

    static button_shared_definition(textures, { extra_properties: extra_properties } = {}) {
        return _.object({
            keys: {
                style: this.style(),
                drop_shadow: this.drop_shadow(textures),
                frame: _.object({
                    keys: {
                        brush: textures,
                        brush_render_style: this.brush_render_style(),
                    },
                }),
                glass: textures,
                disabled: textures,
                ...extra_properties,
            },
        })
    }
    static buttons_panel(textures) {
        return _.object({
            keys: {
                layout: this.layout(),
                button_shared_definition: this.button_shared_definition(textures),
                background_outer_margins: this.margins(),
                background_components: _.object({
                    keys: {
                        left: textures,
                        right: textures,
                        center: textures,
                    },
                }),
                buttons_layout_grid: this.layout_grid(),
                max_button_count: _.float(),
            },
        })
    }

    static grid_link_state_brush(textures) {
        return _.object({
            keys: {
                horizontal_connector_brush: textures,
                vertical_connector_brush: textures,
                junction_brushes: _.object({
                    keys: {
                        left_right: textures,
                        left_top: textures,
                        left_bottom: textures,
                        left_top_bottom: textures,
                        left_right_top: textures,
                        left_right_bottom: textures,
                        left_right_top_bottom: textures,
                        top_bottom: textures,
                        top_right: textures,
                        top_bottom_right: textures,
                        bottom_right: textures,
                    },
                }),
                arrow_brushes: _.object({
                    keys: {
                        to_right: textures,
                        to_top: textures,
                        to_bottom: textures,
                    },
                }),
            },
        })
    }
    static layout_grid() {
        return _.object({
            keys: {
                outer_margin: _.vector2f(),
                element_spacing: _.vector2f(),
                element_size: _.vector2f(),
            },
        })
    }

    static content_window() {
        return _.object({
            keys: {
                layout: this.layout(),
                build_groups_horizontal_gap: _.float(),
                build_group_window_shared_definition: _.object({
                    keys: {
                        header_label_style: this.header_label_style(),
                        header_label_layout: this.layout(),
                        buttons_panel_layout: this.layout(),
                        buttons_panel_shared_definition: _.object({
                            keys: {
                                button_layout_grid: this.layout_grid(),
                                min_row_count: _.integer(),
                                max_row_count: _.integer(),
                            },
                        }),
                    },
                }),
            },
        })
    }

    static header_label_style() {
        return _.enumerate({
            items: [
                'modding_filter_type_header',
                'game_input_group_header',
                'front_end_lobby_dialog_team_panel_header',
                'unit_factory_build_group_header',
            ],
        })
    }

    static icon(textures, { extra_properties: extra_properties } = {}) {
        return _.object({
            keys: {
                layout: this.layout(),
                brush: textures,
                style: this.style(),
                brush_render_style: this.brush_render_style(),
                ...extra_properties,
            },
        })
    }

    static button(data, { isPrefixText: isPrefixText = false, extra_properties: extra_properties } = {}) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                icon: data['textures'],
                text: isPrefixText ? _.string() : data['localisation'],
                name: data['localisation'],
                tooltip_title_text: data['localisation'],
                tooltip: this.tooltip(data),
                layout_grid_coord: _.vector2i(),
                compressed_icon: data['textures'],
                uncompressed_icon: data['textures'],
                tooltip_title_prefix_format: data['localisation'],
                tooltip_title_prefix_horizontal_gap: _.float(),
                ...extra_properties,
            },
        })
    }

    static text_entry() {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
            },
        })
    }
    static window(textures, { properties: properties } = {}) {
        return {
            bar_size: _.vector2i(),
            background: this.background(textures),
            content_window: _.object({
                keys: {
                    layout: this.layout(),
                    ...properties,
                },
            }),
        }
    }
    static window_frame(data, { properties: properties } = {}) {
        return _.object({
            keys: {
                layout: this.layout(),
                overlay: this.background(data['textures']),
                frame_overlay: _.enumerate({
                    items: ['entry_simple_frame'],
                }),
                font: data['fonts'],
                color: data['colors'],
                icon_size: this.icon_size(),
                ...properties,
            },
        })
    }
    static text_colors(colors) {
        return _.object({
            keys: {
                normal: colors,
                disabled: colors,
                hovered: colors,
            },
        })
    }

    static messages_box(localisation, colors) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                system_message_color: colors,
                my_message_color: colors,
                other_player_message_color: colors,
                received_message_format: localisation,
                player_joined_message_format: localisation,
            },
        })
    }
    static entry_box(textures) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                brush: textures,
                brush_render_style: this.brush_render_style(),
                prefix_text: _.string(),
                prefix_spacing: _.float(),
            },
        })
    }
    static progress_bar() {
        return _.object({
            keys: {
                layout: this.layout(),
                bar: _.object({
                    keys: {
                        outline_size: _.float(),
                        outline_color: _.color(),
                        backdrop_color: _.color(),
                        bar_color: _.color(),
                    },
                }),
                outline_size: _.float(),
                outline_color: _.color(),
                backdrop_color: _.color(),
                bar_color: _.color(),
            },
        })
    }
    static box() {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
            },
        })
    }
    static alliance_lock_duration_button(localisation, textures) {
        return _.object({
            keys: {
                text_prefix_if_has_alliance_lock: _.string(),
                not_included_in_offer_alpha: _.float(),
                alliance_lock_duration_label: localisation,
                alliance_lock_duration_seperator: _.string(),
                layout: this.layout(),
                style: this.style(),
                tooltip: this.tooltip(localisation, textures),
                without_alliance_lock_tooltip: this.without_alliance_lock_tooltip(localisation, textures),
                with_alliance_lock_tooltip: this.with_alliance_lock_tooltip(localisation, textures),
            },
        })
    }
    static ok_button(data) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                icon: data['textures'],
                tooltip: this.tooltip(data),
                text: data['localisation'],
                alliance_offer_duration_label: data['localisation'],
                behavior_definitions: _.object({
                    keys: {
                        create_offer: _.object({
                            keys: {
                                text: data['localisation'],
                                description: data['localisation'],
                            },
                        }),
                        update_offer: _.object({
                            keys: {
                                text: data['localisation'],
                                description: data['localisation'],
                            },
                        }),
                        accept_offer: _.object({
                            keys: {
                                text: data['localisation'],
                                description: data['localisation'],
                            },
                        }),
                    },
                }),
            },
        })
    }

    static break_alliance_button(data) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                icon: data['textures'],
                tooltip: this.tooltip(data),
                text: data['localisation'],
                not_allied_on_team_description: data['localisation'],
                not_allied_description: data['localisation'],
                not_allied_color: data['colors'],
                permanently_allied_color: data['colors'],
                lock_time_remaining_line: this.label_form(data),
            },
        })
    }

    static with_alliance_lock_tooltip(localisation, textures) {
        return _.object({
            keys: {
                title_icon: textures,
                title_text: localisation,
                description: localisation,
            },
        })
    }

    static without_alliance_lock_tooltip(localisation, textures) {
        return _.object({
            keys: {
                title_icon: textures,
                title_text: localisation,
                description: localisation,
            },
        })
    }

    static tooltip(data) {
        return _.object({
            keys: {
                anchor_location_on_button: this.anchor(),
                anchor_location_on_tooltip: this.anchor(),
                title_icon: data['textures'],
                title_text: data['localisation'],
                description: data['localisation'],
                description_blocks: _.array({
                    items: this.label_form2(data),
                    isUnique: true,
                }),
            },
        })
    }
    static cancel_button(localisation, textures) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                icon: textures,
                tooltip: this.tooltip(localisation, textures),
                behavior_definitions: _.object({
                    keys: {
                        cancel_create_offer: _.object({
                            keys: {
                                text: localisation,
                                description: localisation,
                            },
                        }),
                        decline_offer: _.object({
                            keys: {
                                text: localisation,
                                description: localisation,
                            },
                        }),
                    },
                }),
                refund_text: localisation,
            },
        })
    }

    static settings_list_box(localisation, textures) {
        return _.object({
            keys: {
                layout: this.layout(),
                style: this.style(),
                group_header_window_shared_definition: _.object({
                    keys: {
                        height: _.float(),
                        label_style: this.header_label_style(),
                        label_layout: this.layout(),
                        background: _.object({
                            keys: {
                                fill_color: _.color(),
                            },
                        }),
                        icon_layout: this.layout(),
                        minimized_icon: textures,
                        expanded_icon: textures,
                    },
                }),
                action_window_shared_definition: _.object({
                    keys: {
                        height: _.float(),
                        name_label_style: this.label_style(),
                        mapping_button_style: this.style(),
                        name_label_layout: this.layout(),
                        mapping_button_0_layout: this.layout(),
                        mapping_button_1_layout: this.layout(),
                        even_background_color: _.color(),
                        odd_background_color: _.color(),
                    },
                }),
                group_header_windows: _.object({
                    keys: {
                        core: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        ships: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        ship_abilities: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        ship_items: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        planet_items: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        planets: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        hud: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        control_groups: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        selection: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        future_orbits: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        chat: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        camera: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                        debug: _.object({
                            keys: {
                                group_name: localisation,
                            },
                        }),
                    },
                }),
            },
        })
    }

    static label_style() {
        return _.enumerate({
            items: ['hud_phase_resonance_level', 'game_input_action_name', 'default'],
        })
    }

    static box_style() {
        return _.enumerate({
            items: ['mod_description'],
        })
    }
    static area() {
        return _.object({
            keys: {
                top_left: _.vector2i(),
                size: _.vector2i(),
            },
        })
    }

    static status_definition(data) {
        return _.object({
            keys: {
                icon: data['textures'],
                name: data['localisation'],
                description: data['localisation'],
            },
        })
    }

    static layout() {
        return _.object({
            keys: {
                vertical_alignment: this.alignment(),
                horizontal_alignment: this.alignment(),
                width: _.float(),
                height: _.float(),
                margins: this.margins(),
                area: this.area(),
            },
        })
    }
    static alignment() {
        return _.enumerate({
            items: ['top', 'bottom', 'stretch', 'center', 'left', 'right', 'top_left', 'top_right'],
        })
    }
    static style() {
        return _.enumerate({
            items: [
                'npcs_window_influence_points',
                'fleet_list',
                'hud_unit_name_large',
                'hud_title',
                'hud_icon_large_exotics',
                'build_exotic_header',
                'trade_window_points',
                'trade_window_change_points',
                'player_victory_dialog_phrase',
                'player_victory_dialog_status',
                'npc_market_demand',
                'diplomacy_player',
                'hud_chat_window',
                'hud_icon',
                'build_exotic_status',
                'hud_unit_name_with_dark_background',
                'title_screen',
                'basic_text_list',
                'overlay_frame_only',
                'player_theme_picker_action',
                'player_theme_picker_header_name',
                'checkbox',
                'modding_terms_of_use',
                'modding_not_authenticated',
                'dialog_title',
                'hud_increase_ability_level',
                'research_text_filter_count',
                'hud_dark_wide',
                'front_end_message',
                'hud_dark_text_display',
                'reflect_box_toggle_button',
                'social_link',
                'front_end_version',
                'settings',
                'front_end_top_bar',
                'front_end',
                'setting_window_item',
                'debug_tool_close_button',
                'debug_tool_title_label',
                'debug',
                'research_field_header',
                'icon_no_background',
                'hud_research_text_filter',
                'hud_dark_square',
                'hud_research_window_tier_button',
                'hud_icon_and_text_action',
                'colony_list',
                'unit_factory_build_group_header',
                'hud_unit_name',
                'lobby_icon_and_text_action',
                'default',
                'lobby_option',
                'front_end_lobby_dialog_player_name',
                'icon_only',
                'front_end_lobby_team_count',
                'front_end_lobby_team_panels',
                'front_end_dialogue_bar',
                'chat',
                'dialogue_with_claw_frame',
                'diplomacy_demand_title',
                'diplomacy_offer_title',
                'hud_icon_only_action',
                'hud_title_with_text_glow',
                'dialogue',
                'bind_input_mapping_dialog_input_mapping',
                'bind_input_mapping_dialog_action_name',
                'front_end_dialog_title',
                'front_end_message_dialog_message',
                'alliance_lock_duration',
            ],
        })
    }

    static label_form(data) {
        return _.object({
            keys: {
                label_text: data['localisation'],
                label_color: data['colors'],
                value_color: data['colors'],
                icon: data['textures'],
            },
        })
    }
    static component(textures) {
        return _.object({
            keys: {
                layout: this.layout(),
                brush: textures,
                brush_render_style: this.brush_render_style(),
            },
        })
    }
    static background(textures) {
        return _.object({
            keys: {
                layout: this.layout(),
                brush: textures,
                highlighted_brush: textures,
                outer_margins: this.margins(),
                use_control_brush_state: _.boolean(),
                brush_render_style: this.brush_render_style(),
                components: _.array({
                    items: this.component(textures),
                }),
            },
        })
    }
    static status_values() {
        return _.object({
            keys: {
                very_low: _.float(),
                low: _.float(),
                normal: _.float(),
                high: _.float(),
                very_high: _.float(),
            },
        })
    }
    static status(param) {
        return _.object({
            keys: {
                very_low: param,
                low: param,
                normal: param,
                high: param,
                very_high: param,
            },
        })
    }
}
