const { schema, object, array, string, float, integer, percentage, color, boolean, vector2, enumerate } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class MainViewUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    pip_group() {
        return object({
            keys: {
                cursor_over_icon: this.cache.textures,
                cursor_over_icon_offset: vector2(),
                considered_full_supply_cost: float(),
                arc_begin_angle: float(false),
                arc_end_angle: float(),
                arc_segment_gap: float(),
                arc_player_minimum_range: float(),
                arc_brush: this.cache.textures,
                arc_selected_color: color(),
                arc_is_clock_wise: boolean(),
            },
        })
    }

    status_indicators() {
        return object({
            keys: {
                user_interface: object({
                    keys: {
                        selected: this.cache.textures,
                        sub_selected: this.cache.textures,
                    },
                }),
                unit_alerts: object({
                    keys: {
                        ping_attention: this.cache.textures,
                        ping_attack: this.cache.textures,
                        ping_defend: this.cache.textures,
                        rallied_to: this.cache.textures,
                        targeted_by_ability: this.cache.textures,
                    },
                }),
                gravity_well: object({
                    keys: {
                        enemy_units_detected_at_owned_planet: this.cache.textures,
                        enemy_units_detected_at_unowned_planet: this.cache.textures,
                        planet_bombed: this.cache.textures,
                        upkeep: this.cache.textures,
                    },
                }),
            },
        })
    }

    icon() {
        return object({
            keys: {
                icon: this.cache.textures,
                mesh_center_offset: float(),
                icon_alert_fill_color: color(),
            },
        })
    }

    detection_fade() {
        return object({
            keys: {
                quick_duration: float(),
                quick_alpha: percentage(),
                long_duration: float(),
                long_alpha: percentage(),
            },
        })
    }

    interface_style() {
        return object({
            keys: {
                line_color: color(),
                line_color_when_highlighted: color(),
                line_color_when_not_highlighted: color(),
                line_to_plane_thickness: float(),
                line_circle_thickness: float(),
                line_circle_segment_count: float(),
            },
        })
    }

    line_type() {
        return object({
            keys: {
                primary_color: color(),
                pulse_color: color(),
                pulse_begin_length_perc: percentage(),
                pulse_end_length_perc: percentage(),
                pulse_interval: float(),
                pulse_easing_function: super.getEasingFunctons,
            },
        })
    }

    pip_groups() {
        return object({
            keys: {
                backgrounds: object({
                    keys: {
                        left: this.cache.textures,
                        left_right: this.cache.textures,
                        left_bottom: this.cache.textures,
                        right: this.cache.textures,
                        right_bottom: this.cache.textures,
                        bottom: this.cache.textures,
                        all: this.cache.textures,
                    },
                }),
                pip_groups_pick_radius: float(),
                pip_groups: object({
                    keys: {
                        friendly_ships: this.pip_group(),
                        enemy_ships: this.pip_group(),
                        planet_orbit: this.pip_group(),
                    },
                }),
            },
        })
    }

    create() {
        return schema({
            keys: {
                gravity_well_props: object({
                    keys: {
                        begin_cloud_fade_distance: float(),
                        end_cloud_fade_distance: float(),
                    },
                }),
                mesh_outline: object({
                    keys: {
                        planet_thickness: float(),
                        non_planet_thickness: float(),
                        planet_distance_scalar: float(),
                        non_planet_distance_scalar: float(),
                        edge_threshold: float(),
                        ui_status_alphas: object({
                            keys: {
                                none: percentage(),
                                under_cursor: percentage(),
                                bandboxed: percentage(),
                                selected: percentage(),
                                sub_selected: percentage(),
                                owner_fleet_under_cursor: percentage(),
                                owner_fleet_bandboxed: percentage(),
                                owner_fleet_sub_selected: percentage(),
                            },
                        }),
                    },
                }),
                build_structure_cursor: object({
                    keys: {
                        circle_color_if_can_build: color(),
                        circle_color_if_can_not_build: color(),
                        circle_line_thickness: integer(),
                        circle_segment_count: integer(),
                    },
                }),
                build_structure_range: object({
                    keys: {
                        circle_color_if_can_build: color(),
                        circle_color_if_can_not_build: color(),
                        circle_line_thickness: integer(),
                        circle_segment_count: integer(),
                    },
                }),
                move_area_polygon_segment_count: integer(),
                gravity_well_border_line_culture_color_transition_distance: float(),
                gravity_well_inner_border_line: object({
                    keys: {
                        thickness: integer(),
                        alpha: percentage(),
                    },
                }),
                gravity_well_inner_border_line_when_outer_visible: object({
                    keys: {
                        thickness: integer(),
                        alpha: percentage(),
                    },
                }),
                gravity_well_outer_border_line: object({
                    keys: {
                        thickness: integer(),
                        alpha: percentage(),
                    },
                }),
                structure_plate_arc: object({
                    keys: {
                        begin_color: color(),
                        end_color: color(),
                        line_thickness: float(),
                        segment_count: float(),
                        end_fade_in_arc_percentage: percentage(),
                    },
                }),
                orbital_path_arc: object({
                    keys: {
                        clockwise_begin_color: color(),
                        clockwise_end_color: color(),
                        counter_clockwise_begin_color: color(),
                        counter_clockwise_end_color: color(),
                        line_thickness: integer(),
                        segment_count: float(),
                        arc_projection_in_seconds: float(),
                        max_arc_length: float(),
                        end_fade_in_arc_percentage: percentage(),
                        end_point_circle: object({
                            keys: {
                                radius: float(),
                                color: color(),
                                line_thickness: float(),
                                segment_count: integer(),
                            },
                        }),
                    },
                }),
                tactical_grid: object({
                    keys: {
                        line_segment_length: float(),
                        line_color: color(),
                        line_thickness: integer(),
                        planet_cutout_border_line: object({
                            keys: {
                                thickness: integer(),
                                alpha: percentage(),
                            },
                        }),
                    },
                }),
                phase_lane: object({
                    keys: {
                        line_thickness: integer(),
                        alpha: percentage(),
                        removed_blink_duration: integer(),
                    },
                }),
                planet_player_color_transition_duration: float(),
                selected_pip_color: color(),
                debug_text_block_font: this.cache.fonts,
                unit_icons: object({
                    keys: {
                        icon_fade_rate: integer(),
                        gravity_well_player_status_cross_fade_duration: integer(),
                        gravity_well_player_status_blinks: object({
                            keys: {
                                enemy_units_detected_at_owned_planet: super.getBlink,
                                enemy_units_detected_at_unowned_planet: super.getBlink,
                                planet_bombed: super.getBlink,
                                friendly_culture_being_established: super.getBlink,
                                friendly_culture_being_lost: super.getBlink,
                                enemy_culture_being_established: super.getBlink,
                                enemy_culture_being_lost: super.getBlink,
                                upkeep: super.getBlink,
                            },
                        }),
                        unit_alert_blinks: object({
                            keys: {
                                ping_attention: super.getBlink,
                                ping_attack: super.getBlink,
                                ping_defend: super.getBlink,
                                rallied_to: super.getBlink,
                                positive_buff: super.getBlink,
                                negative_buff: super.getBlink,
                                targeted_by_ability: super.getBlink,
                            },
                        }),
                        user_interface_status_colors: object({
                            keys: {
                                selected: color(),
                                sub_selected: color(),
                            },
                        }),
                        fleet_icon_gravity_well_icon_y_offset: float(false),
                        fleet_icon_viewport_position_y_offset: float(false),
                        fleet_icon: object({
                            keys: {
                                group: string(),
                                has_rotation: boolean(),
                                use_owner_player_color: boolean(),
                            },
                        }),
                        phase_lane_unit_group_overlap_size: vector2(),
                        groups: array({
                            items: object({
                                keys: {
                                    group: string(),
                                    size: vector2(),
                                    pick_radius: float(),
                                    normal_alert_fill: this.cache.textures,
                                    special_unit_alert_fill: this.cache.textures,
                                    selected_status_border: this.cache.textures,
                                    sub_selected_status_border: this.cache.textures,
                                    is_depth_test_enabled: boolean(),
                                    planet: object({
                                        keys: {
                                            detection_fade: this.detection_fade(),
                                            never_detected_icon: this.cache.textures,
                                            planet_level_text_font: this.cache.fonts,
                                            planet_level_text_offset: vector2(),
                                            planet_level_text_has_drop_shadow: boolean(),
                                            name_font: this.cache.fonts,
                                            name_has_drop_shadow: boolean(),
                                            name_offset: float(false),
                                            name_and_bounty_gap: float(),
                                            bounty_icon_and_text_gap: float(),
                                            bounty_icon: this.cache.textures,
                                            bounty_font: this.cache.textures,
                                            bounty_has_drop_shadow: boolean(),
                                            bounty_colors: object({
                                                keys: {
                                                    self: this.cache.colors,
                                                    ally: this.cache.colors,
                                                    enemy: this.cache.colors,
                                                    none: this.cache.colors,
                                                },
                                            }),
                                            owner_icon_offset: float(false),
                                            owner_icon_size: enumerate({
                                                items: ['small', 'medium', 'large'],
                                            }),
                                            beacon_icons: object({
                                                keys: {
                                                    factory: this.cache.textures,
                                                    phase_lane_stabilizer: this.cache.textures,
                                                    artifact: this.cache.textures,
                                                    loot: this.cache.textures,
                                                    bounty: this.cache.textures,
                                                },
                                            }),
                                            left_beacon_icon_offset: vector2(),
                                            right_beacon_icon_offset: vector2(),
                                            shapes: object({
                                                keys: {
                                                    not_owned: object({
                                                        keys: {
                                                            background: this.cache.textures,
                                                            status_indicators: this.status_indicators(),
                                                        },
                                                    }),
                                                    not_owned_with_left_beacon: object({
                                                        keys: {
                                                            background: this.cache.textures,
                                                            status_indicators: this.status_indicators(),
                                                        },
                                                    }),
                                                    owned: object({
                                                        keys: {
                                                            background: this.cache.textures,
                                                            home_planet_frame: this.cache.textures,
                                                            status_indicators: this.status_indicators(),
                                                        },
                                                    }),
                                                    owned_with_left_beacon: object({
                                                        keys: {
                                                            background: this.cache.textures,
                                                            home_planet_frame: this.cache.textures,
                                                            status_indicators: this.status_indicators(),
                                                        },
                                                    }),
                                                    owned_with_right_beacon: object({
                                                        keys: {
                                                            background: this.cache.textures,
                                                            home_planet_frame: this.cache.textures,
                                                            status_indicators: this.status_indicators(),
                                                        },
                                                    }),
                                                    owned_with_left_and_right_beacons: object({
                                                        keys: {
                                                            background: this.cache.textures,
                                                            home_planet_frame: this.cache.textures,
                                                            status_indicators: this.status_indicators(),
                                                        },
                                                    }),
                                                },
                                            }),
                                            pip_groups: this.pip_groups(),
                                        },
                                    }),
                                    star: object({
                                        keys: {
                                            background: this.cache.textures,
                                            detection_fade: this.detection_fade(),
                                            name_font: this.cache.fonts,
                                            name_has_drop_shadow: boolean(),
                                            name_color: color(),
                                            name_offset: float(false),
                                            status_indicators: this.status_indicators(),
                                            pip_groups: this.pip_groups(),
                                        },
                                    }),
                                },
                            }),
                        }),
                    },
                }),
                selected_unit_mesh_user_interface: this.interface_style(),
                weapon_range: this.interface_style(),
                ability_range: this.interface_style(),
                ability_between_gravity_well_range: this.interface_style(),
                auto_order_range: this.interface_style(),
                order_line: object({
                    keys: {
                        line_types: object({
                            keys: {
                                move: this.line_type(),
                                attack: this.line_type(),
                                use_ability: this.line_type(),
                                hyperspace: this.line_type(),
                                rally: this.line_type(),
                                dock: this.line_type(),
                                launch: this.line_type(),
                            },
                        }),
                        line_thickness: float(),
                        line_alpha_when_not_highlighted: percentage(),
                        fade_delay_duration: float(),
                        fade_duration: float(),
                    },
                }),
                targeting_line: object({
                    keys: {
                        line_colors: object({
                            keys: {
                                move: color(),
                                move_in_formation: color(),
                                move_not_in_formation: color(),
                                attack: color(),
                                use_ability: color(),
                                use_item: color(),
                                set_rally_point: color(),
                                rotate_structure_plate: color(),
                                set_unit_factory_deliverable_destination: color(),
                                use_npc_reward_positive: color(),
                                use_npc_reward_negative: color(),
                                use_npc_reward_send_pirate_raid: color(),
                            },
                        }),
                        bad_path_color: color(),
                        line_thickness: float(),
                        line_circle_segment_count: float(),
                        rally_point_destination_circle_radius: float(),
                        rally_point_destination_circle_thickness: float(),
                        rally_point_destination_circle_segment_count: float(),
                    },
                }),
                effects: object({
                    keys: {
                        hyperspace_travel_effect_early_start_time: float(),
                    },
                }),
                pip_group: object({
                    keys: {
                        phase_lane_unit_group: object({
                            keys: {
                                icon_top_left_offset_from_center: vector2(),
                                icon_size: vector2(),
                                considered_full_supply_cost: float(),
                                underlay_brush: this.cache.textures,
                                pips_brush: this.cache.textures,
                                pip_offsets: array({
                                    items: vector2(),
                                }),
                            },
                        }),
                    },
                }),
                unowned_planet_player_icon: this.cache.textures,
                planet_mesh_player_icon_center_offset_scalar: float(),
                planet_mesh_view_name_spacing: float(),
                planet_mesh_view_name_font: this.cache.fonts,
                non_planet_mesh_player_icon_center_offset_scalar: float(),
                special_operation_unit: object({
                    keys: {
                        garrison: this.icon(),
                        local_garrison: this.icon(),
                        insurgent: this.icon(),
                        dark_fleet: this.icon(),
                        trade_escort: this.icon(),
                    },
                }),
                fow_overlay: this.cache.textures,
                default_bandbox: this.cache.textures,
                attack_bandbox: this.cache.textures,
                loot: object({
                    keys: {
                        default_range_color: color(),
                        range_line_thickness: float(),
                        range_segment_count: float(),
                        collection_active_blink_duration: float(),
                    },
                }),
                primary_light_angle: float(),
                invalid_ability_target_planet_alpha: percentage(),
                invalid_pick_alliance_offer_planet_alpha: percentage(),
                extra_alert_fill_alpha_for_hud: percentage(),
                planet_elevator_car_visible_threshold: float(),
            },
        })
    }
}
