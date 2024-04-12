const Definitions = require('../definitions')
const DiagnosticStorage = require('../../data/diagnostic-storage')
const { schema, float, object, array, vector3, boolean, enumerate, string, integer, vector2, percentage, angle, vecInt2 } = require('../data_types')
const FileHandler = require('../../data/file-handler')

module.exports = class Unit extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.fileText = fileText
        this.fileName = fileName
        this.diagStorage = new DiagnosticStorage(fileText, diagnostics)
        this.json = JSON.parse(fileText)

        this.reader = new FileHandler(gameInstallationFolder)

        this.cache = cache
    }

    physics() {
        return object({
            keys: {
                max_linear_speed: float(),
                linear_speed_floor_to_brake_for_turn: float(),
                time_to_max_linear_speed: float(),
                arrival_tolerance_spatial_radius_scalar: float(),
                death_linear_speed_range: array({
                    items: float(),
                }),
                max_angular_speed: float(),
                time_to_max_angular_speed: float(),
                max_bank_angle: float(),
                death_angular_speed_range: array({
                    items: float(),
                }),
                linear_acceleration_angle: float(),
                strafe_max_linear_speed: float(),
                time_to_strafe_max_linear_speed: float(),
                strafe_max_linear_distance_spatial_radius_scalar: float(),
                strafe_start_angle: float(),
                strafe_stop_angle: float(),
                strafe_speed_start_angle: float(),
                strafe_max_start_turning_angle: float(),
                can_move_angular: boolean(),
                can_strafe_linear: boolean(),
                can_move_linear: boolean(),
                disable_goal_tracking_on_death: boolean(),
            },
        })
    }
    create() {
        return schema({
            keys: {
                version: float(),
                spatial: object({
                    keys: {
                        surface_radius: float(),
                        line_of_sight_radius: float(),
                        radius: float(),
                        box: object({
                            keys: {
                                center: vector3(),
                                extents: vector3(),
                            },
                        }),
                        collision_rank: float(),
                        can_collide: boolean(),
                        can_be_displaced_on_collision: boolean(),
                        can_displace_target_on_collision: boolean(),
                    },
                }),
                gravity_well_fixture: object({
                    keys: {
                        inner_move_distance: float(),
                        axis_rotation_speed: vector2(),
                        axis_tilt_angle: vector2(),
                        chance_of_retrograde_axis_rotation_direction: float(),
                    },
                }),
                planet: object({
                    keys: {
                        planet_type: this.cache.planets,
                        build_distance_from_inner_move_radius: float(),
                        metal_asteroids: object({
                            keys: {
                                tiers: array({
                                    items: object({
                                        keys: {
                                            tier: integer(),
                                            count: array({
                                                items: float(),
                                            }),
                                        },
                                    }),
                                }),
                            },
                        }),
                        crystal_asteroids: object({
                            keys: {
                                tiers: array({
                                    items: object({
                                        keys: {
                                            tier: integer(),
                                            count: array({
                                                items: float(),
                                            }),
                                        },
                                    }),
                                }),
                            },
                        }),
                        destroyed_planet: object({
                            keys: {
                                skin: this.cache.unit_skins,
                                stripped_assets: super.price,
                                stripped_exotics: super.exotic_price(this.cache.exotics),
                            },
                        }),
                    },
                }),
                items: object({
                    keys: {
                        levels: array({
                            items: object({
                                keys: {
                                    max_ship_component_count: integer(),
                                },
                            }),
                        }),
                        requires_ship_component_shop_to_purchase_items: boolean(),
                    },
                }),
                trade_port: object({
                    keys: {
                        max_trade_ship_count: integer(),
                        trade_ship_construction_time: float(),
                        trade_ship: this.cache.meshes,
                        special_operation_unit_kind: this.cache.special_operation_kinds,
                        create_trade_ship_offset: vector3(),
                    },
                }),
                name: object({
                    keys: {
                        group: this.cache.unit_group_names,
                    },
                    required: ['group'],
                }),
                carrier: object({
                    keys: {
                        base_max_squadron_capacity: integer(),
                        strikecraft_kinds: array({
                            items: this.cache.strikecraft_kinds,
                            isUnique: true,
                        }),
                        launch_destination_formation: this.cache.formations,
                        launch_destination_formation_offset: object({
                            keys: {
                                rank: integer(),
                                group: integer(),
                            },
                        }),
                        hangar_points: array({
                            items: object({
                                keys: {
                                    position: vector3(),
                                    rotation: array({
                                        items: float(false),
                                    }),
                                },
                            }),
                        }),
                    },
                }),
                physics: this.physics(),
                asteroid: object({
                    keys: {
                        asset_type: this.getResources,
                        extraction_rate_scalar: float(),
                        placement_radius: float(),
                        attached_structure_offset: vector3(),
                    },
                }),
                gravity_well: object({
                    keys: {
                        gravity_well_jump_node_radius: float(),
                        gravity_well_outer_move_area_distance: float(),
                        gravity_well_vertical_plane_max_distance: float(),
                        gravity_well_vertical_plane_return_distance: float(),
                        min_gravity_well_inner_move_area_distance: float(),
                    },
                }),
                phase_lane: object({
                    keys: {
                        is_gravity_well_existance_known_when_other_explored: boolean(),
                        unit_group_distance_tolerance: float(),
                    },
                }),
                hyperspace: object({
                    keys: {
                        speed: float(),
                        charge_time: float(),
                        charge_time_variance: float(),
                        min_charge_angle: float(),
                        max_charge_angle: float(),
                        can_hyperspace_enabled_by_default: boolean(),
                    },
                }),
                move: object({
                    keys: {
                        follow_distance: float(),
                    },
                }),
                attack: object({
                    keys: {
                        planet_bombing_attack_pattern: object({
                            keys: {
                                type: enumerate({
                                    items: ['immobile'],
                                }),
                            },
                        }),
                        attack_pattern: object({
                            keys: {
                                rotate_only_on_plane: boolean(),
                                type: enumerate({
                                    items: ['stop_and_fire', 'immobile', 'strafe_and_pull_away', 'circle_strafe'],
                                }),
                                alignment: object({
                                    keys: {
                                        type: super.getAlignmentType,
                                        angle: angle(),
                                        post_alignment_roll_angle: angle(),
                                        allow_opposite_angle: boolean(),
                                    },
                                }),
                                use_weapon_cooldown: boolean(),
                                weapon_cooldown_percent_to_start_strafe: percentage(),
                                pull_away_angle_range: float(),
                                angle_range_off_gravity_well_plane: vector2(),
                            },
                        }),
                    },
                }),
                //TODO: Find out rally point stuff
                rally_point: {
                    type: 'object',
                    properties: {},
                },
                culture_provider: object({
                    keys: {
                        base_culture_rate: float(),
                        research_prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                    },
                }),
                //TODO: Find out passive income stuff
                passive_income: {
                    type: 'object',
                    properties: {},
                },
                is_envoy: boolean(),
                stages: object({
                    keys: {
                        stages: array({
                            items: object({
                                keys: {
                                    requirements: object({
                                        keys: {
                                            requirements_type: enumerate({
                                                items: ['research_prerequisites', 'none'],
                                            }),
                                            prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                                        },
                                    }),
                                },
                            }),
                        }),
                    },
                }),
                ai: object({
                    keys: {
                        behaviors: array({
                            items: enumerate({
                                items: ['auto_follow_unit_attacking_any', 'auto_bomb_planet', 'auto_follow_unit_attacking_any_or_is_damaged', 'auto_follow_unit_attacking_threat'],
                            }),
                            isUnique: true,
                        }),
                        auto_follow_target_priority: float(false),
                        attack_target_type_groups: array({
                            items: this.cache.attack_target_type_groups,
                            isUnique: true,
                        }),
                        attack_target_type_groups_matching_weapon: this.cache.weapons,
                        attack_target_type_groups_to_ignore: array({
                            items: this.cache.attack_target_type_groups,
                            isUnique: true,
                        }),
                    },
                }),
                player_ai: object({
                    keys: {
                        max_count_to_fleet_supply_ratio: float(),
                        max_empire_owned_count_percentage: percentage(),
                        max_count_at_planet: object({
                            keys: {
                                type: enumerate({
                                    items: ['constant', 'per_used_military_slots_at_planet'],
                                }),
                                value: integer(),
                                per_count: integer(),
                                max_value: float(false),
                            },
                        }),
                    },
                }),
                ai_attack_target: object({
                    keys: {
                        attack_priority: float(),
                        is_always_a_threat: boolean(),
                        attack_target_type: this.cache.attack_target_types,
                    },
                }),
                user_interface: object({
                    keys: {
                        pip_type: this.cache.pip_groups,
                        selection_priority: float(),
                        under_cursor_type: enumerate({
                            items: ['sphere', 'sphere_box'],
                        }),
                        can_be_controlled_by_selected_planet: boolean(),
                        selection_group_unit_type: enumerate({
                            items: ['combat_ship', 'military_structure', 'torpedo', 'loot', 'strikecraft', 'factory_structure', 'colony_ship', 'civilian_structure', 'scout_ship'],
                        }),
                        can_ever_be_selected: boolean(),
                        can_show_mesh_overlays: boolean(),
                        can_be_controlled: boolean(),
                        has_sub_selection_grouping: boolean(),
                        can_move: boolean(),
                        can_attack: boolean(),
                        can_show_distance_to_plane_line: boolean(),
                        skip_as_zoom_target_when_zooming_in_from_far: boolean(),
                        can_show_max_weapon_range_in_tactical_view: boolean(),
                        bar_size: enumerate({
                            items: ['large'],
                        }),
                    },
                }),
                virtual_supply_cost: float(),
                structure: object({
                    keys: {
                        slot_type: super.getDomain,
                        slots_required: float(),
                        roles: array({
                            items: enumerate({
                                items: ['defense', 'unit_factory', 'extractor', 'exotic_factory'],
                            }),
                            isUnique: true,
                        }),
                        planet_modifiers: super.create().modifiers.planet_modifiers.createResearchSubject(this.cache.planets),
                        asteroid_asset_type: super.getResources,
                        build_group_id: super.getDomain,
                        requires_any_research_points_to_build: boolean(),
                        abilities_for_range_in_build_rendering: array({
                            items: this.cache.abilities,
                            isUnique: true,
                        }),
                    },
                }),
                weapons: object({
                    keys: {
                        weapons: array({
                            items: object({
                                keys: {
                                    weapon: this.cache.weapons,
                                    required_unit_item: this.cache.unit_items,
                                    min_required_stage_index: integer(),
                                    required_research_prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                                    mesh_point: string(),
                                    weapon_position: vector3(),
                                    non_turret_muzzle_positions: array({
                                        items: vector3(),
                                    }),
                                    forward: vector3(),
                                    up: vector3(),
                                    yaw_arc: object({
                                        keys: {
                                            initial_angle: float(false),
                                            min_angle: float(false),
                                            max_angle: float(false),
                                        },
                                    }),
                                    pitch_arc: object({
                                        keys: {
                                            initial_angle: float(false),
                                            min_angle: float(false),
                                            max_angle: float(false),
                                        },
                                    }),
                                },
                            }),
                        }),
                        max_range_weapon_index: integer(),
                    },
                }),
                fleet: object({
                    keys: {
                        icons: array({
                            items: this.cache.textures,
                            isUnique: true,
                        }),
                    },
                }),
                formation: object({
                    keys: {
                        leader_priority: integer(),
                        offsets_per_formation_type: object({
                            keys: {
                                ships_and_structures: object({
                                    keys: {
                                        rank: integer(),
                                        group: integer(),
                                    },
                                }),
                                strikecraft_only: object({
                                    keys: {
                                        rank: integer(),
                                        group: integer(),
                                    },
                                }),
                            },
                        }),
                    },
                }),
                exotic_factory: object({
                    keys: {
                        required_mutation: this.cache.mutations,
                    },
                }),
                spawn_debris: object({
                    keys: {
                        spawn_debris_time: float(),
                        generic_group_name: this.cache.debris,
                        specific_debris: array({
                            items: this.cache.units,
                            isUnique: true,
                        }),
                        generic_counts: object({
                            keys: {
                                small_debris: vector2(),
                                large_debris: vector2(),
                            },
                        }),
                        spawn_loot: object({
                            keys: {
                                loot_level: integer(),
                                loot_unit: enumerate({
                                    items: ['ship_loot'],
                                }),
                                loot_name: this.cache.localisation,
                                experience_given: float(),
                                assets: super.getAssets,
                                exotics: array({
                                    items: object({
                                        keys: {
                                            weight: float(),
                                            bundles: array({
                                                items: object({
                                                    keys: {
                                                        types: array({
                                                            items: this.cache.exotics,
                                                            isUnique: true,
                                                        }),
                                                        counts: vecInt2(),
                                                    },
                                                }),
                                            }),
                                        },
                                    }),
                                }),
                            },
                        }),
                    },
                }),
                is_buff_agent: boolean(),
                unit_factory: object({
                    keys: {
                        required_ability: this.cache.abilities,
                        build_kinds: array({
                            items: this.cache.ship_tags,
                            isUnique: true,
                        }),
                        build_rate_scalar: float(),
                        default_rally_point_offset: vector3(),
                        required_mutation: this.cache.mutations,
                        will_spawn_units_in_hyperspace: boolean(),
                        base_build_point: object({
                            keys: {
                                position: vector3(),
                                rotation: array({
                                    items: float(false),
                                }),
                            },
                        }),
                        spawn_units_in_hyperspace_delay_duration: float(),
                    },
                }),
                health: object({
                    keys: {
                        round_max_points_up_to_5: boolean(),
                        release_time_after_death: float(),
                        can_collide_duration_after_death: float(),
                        durability: float(),
                        levels: array({
                            items: object({
                                keys: {
                                    max_shield_points: float(),
                                    shield_point_restore_rate: float(),
                                    shield_burst_restore: object({
                                        keys: {
                                            cooldown_duration: float(),
                                            restore_percentage: float(),
                                        },
                                    }),
                                    hull_crippled_percentage: percentage(),
                                    max_hull_points: float(),
                                    max_armor_points: float(),
                                    armor_point_restore_rate: float(),
                                    armor_strength: float(),
                                    hull_point_restore_rate: float(),
                                    experience_given_on_death: float(),
                                    armor_point_restore_cooldown_duration_after_damage_taken: float(),
                                    hull_point_restore_cooldown_duration_after_damage_taken: float(),
                                    shield_point_restore_cooldown_duration_after_damage_taken: float(),
                                },
                            }),
                        }),
                    },
                }),
                levels: object({
                    keys: {
                        type: enumerate({
                            items: ['experience'],
                        }),
                        levels: array({
                            items: object({
                                keys: {
                                    experience_to_next_level: float(),
                                    unit_modifiers: object({
                                        keys: {
                                            additive_values: object({
                                                keys: {
                                                    max_antimatter: float(),
                                                    antimatter_restore_rate: float(),
                                                    max_squadron_capacity: float(),
                                                },
                                            }),
                                            scalar_values: object({
                                                keys: {
                                                    damage: float(),
                                                    cooldown_duration: float(false),
                                                },
                                            }),
                                        },
                                    }),
                                    weapon_modifiers: object({
                                        keys: {
                                            additive_values: object({
                                                keys: {
                                                    max_antimatter: float(),
                                                    antimatter_restore_rate: float(),
                                                },
                                            }),
                                            scalar_values: object({
                                                keys: {
                                                    damage: float(),
                                                    cooldown_duration: float(false),
                                                },
                                            }),
                                        },
                                    }),
                                },
                            }),
                        }),
                    },
                }),
                strikecraft: object({
                    keys: {
                        kind: this.cache.strikecraft_kinds,
                        build_time: float(),
                        squadron_size: integer(),
                        launch_destination_formation_offset: object({
                            keys: {
                                rank: integer(),
                                group: integer(),
                            },
                        }),
                    },
                }),
                antimatter: object({
                    keys: {
                        max_antimatter: float(),
                        antimatter_restore_rate: float(),
                    },
                }),
                ship_component_shop: object({
                    keys: {
                        required_ability: this.cache.abilities,
                        required_prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                    },
                }),
                build: object({
                    keys: {
                        build_time: float(),
                        price: super.price,
                        build_kind: this.cache.build_kinds,
                        supply_cost: integer(),
                        build_group_id: this.cache.ship_tags,
                        prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                        build_radius: float(),
                        exotic_price: super.exotic_price(this.cache.exotics),
                        auto_cast_instead_of_rally_when_built: boolean(),
                        self_build_time_gravity_well_scalars: object({
                            keys: {
                                enemy: array({
                                    items: object({
                                        keys: {
                                            value: float(),
                                            prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                                        },
                                    }),
                                }),
                                neutral: array({
                                    items: object({
                                        keys: {
                                            value: float(),
                                            prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                                        },
                                    }),
                                }),
                            },
                        }),
                        can_update_build_progress_by_default: boolean(),
                    },
                }),
                research_provider: object({
                    keys: {
                        provided_research_points: object({
                            keys: {
                                civilian: float(false),
                                military: float(false),
                            },
                        }),
                    },
                }),
                unit_modifiers: super.create().modifiers.unit_modifiers.create(
                    {
                        hasArrayValues: false,
                        prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                    },
                    this.cache
                ),
                tags: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                is_phase_lane_stabilizer: boolean(),
                is_phase_resonance_synchronizer: boolean(),
                will_notify_enemy_player_when_entering_gravity_well_override: boolean(),
                is_loot_collector: boolean(),
                abilities: array({
                    items: object({
                        keys: {
                            abilities: array({
                                items: this.cache.abilities,
                                isUnique: true,
                            }),
                            required_special_operation_unit_kind: this.cache.special_operation_kinds,
                            required_player: this.cache.players,
                        },
                    }),
                }),
                player_specific_abilities: array({
                    items: object({
                        keys: {
                            ability: this.cache.abilities,
                            player: this.cache.players,
                        },
                    }),
                }),
                build_structure_ability: this.cache.abilities,
                colonize_ability: this.cache.abilities,
                ship_roles: super.getShipRoles,
                can_join_fleet: boolean(),
                child_meshes: array({
                    items: object({
                        keys: {
                            mesh_alias_name: this.cache.child_meshes,
                            mesh_point: string(),
                            is_weapon_effects_destination: boolean(),
                            required_unit_item: this.cache.unit_items,
                            hidden_by_unit_item: this.cache.unit_items,
                        },
                    }),
                }),
                debris: object({
                    keys: {
                        lifetime: array({
                            items: float(),
                        }),
                        linear_speed: array({
                            items: float(),
                        }),
                        angular_speed: array({
                            items: float(),
                        }),
                    },
                }),
                // TODO: Find out filter unit type, currently hardcoded
                target_filter_unit_type: this.cache.ship_tags,
                skins: array({
                    items: this.cache.unit_skins,
                    isUnique: true,
                }),
                action_effect_size: enumerate({
                    items: ['medium_unit', 'large_unit', 'small_unit'],
                }),
                is_orbital_cannon_shell: boolean(),
                is_always_detected: boolean(),
                can_add_to_kill_statistics: boolean(),
            },
        })
    }
}
