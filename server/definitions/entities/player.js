const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { prerequisites } = require('../definitions')
const { schema, float, string, object, array, integer, enumerate, vector2f, boolean, percentage, vector4i } = require('../data_types')
const { planet_modifier_types, unit_modifier_types, empire_modifier_types, weapon_modifier_types } = require('../modifier_types')
const Definitions = require('../definitions')
const { PlayerModifiers } = require('../modifier_definitions')

module.exports = class Player {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)

        this.cache = cache
    }

    player_research_domain_definition() {
        return object({
            required: [
                'button_background',
                'compressed_research_field_picture',
                'full_name',
                'hud_icon',
                'partial_name',
                'research_fields',
                'research_points_name',
                'research_rate_name',
                'research_tiers',
            ],
            keys: {
                tooltip_icon: this.cache.textures(),
                research_tiers: array({
                    items: object({
                        required: ['acquire_time', 'button_background', 'price', 'required_research_points'],
                        keys: {
                            acquire_time: float(),
                            required_research_points: integer(),
                            button_background: this.cache.textures(),
                            price: Definitions.price(),
                            exotic_price: Definitions.exotic_price(this.cache),
                            player_modifiers: PlayerModifiers.create(this.cache, { UnitModifierFloatValue: true }),
                        },
                    }),
                }),
                research_fields: array({
                    items: object({
                        required: ['id', 'name', 'picture'],
                        keys: {
                            id: string(),
                            name: this.cache.localisation,
                            picture: this.cache.textures(),
                        },
                    }),
                }),
                research_rate_name: this.cache.localisation,
                name: this.cache.localisation,
                full_name: this.cache.localisation,
                partial_name: this.cache.localisation,
                partial_name_uppercase: this.cache.localisation,
                research_points_name: this.cache.localisation,
                planet_track_name: this.cache.localisation,
                planet_track_description: this.cache.localisation,
                planet_track_max_level_label: this.cache.localisation,
                planet_track_current_level_label: this.cache.localisation,
                button_background: this.cache.textures(),
                compressed_research_field_picture: this.cache.textures(),
                hud_icon: this.cache.textures(),
            },
        })
    }

    planet_modifiers() {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: planet_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    values: array({
                        items: object({
                            keys: {
                                value: float(false),
                                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                            },
                        }),
                    }),
                },
            }),
        })
    }
    unit_modifiers() {
        return array({
            items: object({
                keys: {
                    tag: this.cache.ship_tags,
                    modifier_type: enumerate({
                        items: unit_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value: float(false),
                    values: array({
                        items: object({
                            keys: {
                                value: float(false),
                                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                            },
                        }),
                    }),
                },
            }),
        })
    }

    npc_track() {
        return object({
            keys: {
                civilian_research_points: float(),
                civilian_research_rate_scalar: float(),
                credits_income_rate: float(),
                crystal_income_rate: float(),
                health_points_restore_rate: float(),
                max_civilian_structure_slots: float(),
                max_health_points: float(),
                max_military_structure_slots: float(),
                max_planet_component_slots: float(),
                max_shield_points: float(),
                metal_income_rate: float(),
                military_research_points: float(),
                military_research_rate_scalar: float(),
                shield_points_restore_rate: float(),
                structure_builder_count: float(),
                mutation: this.cache.mutations,
                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
            },
        })
    }
    tracks() {
        return object({
            keys: {
                commerce: array({ items: this.npc_track() }),
                defense: array({ items: this.npc_track() }),
                logistics: array({ items: this.npc_track() }),
                mining: array({ items: this.npc_track() }),
                research: array({ items: this.npc_track() }),
                surveying: array({ items: this.npc_track() }),
            },
        })
    }

    weapon_modifiers() {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: weapon_modifier_types(),
                    }),
                    tags: array({ items: this.cache.weapon_tags, isUnique: true }),
                    value_behavior: Definitions.value_behavior(),
                    weapon_type: Definitions.weapon_type(),
                    value: float(false),
                    values: array({
                        items: object({
                            keys: {
                                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                                value: float(),
                            },
                        }),
                    }),
                },
            }),
        })
    }
    empire_modifiers() {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({
                        items: empire_modifier_types(),
                    }),
                    value_behavior: Definitions.value_behavior(),
                    value: float(false),
                    values: array({
                        items: object({
                            keys: {
                                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                                value: float(),
                            },
                        }),
                    }),
                },
            }),
        })
    }

    npc_raid_definition() {
        return object({
            required: ['units'],
            keys: {
                action_data_source: this.cache.action_data_sources,
                arrival_delay_duration: float(),
                buff: this.cache.buffs,
                highest_used_supply_scalar: float(),
                supply: integer(),
                units: object({
                    keys: {
                        random_units: Definitions.random_units(this.cache),
                        required_units: Definitions.random_units(this.cache),
                    },
                }),
            },
        })
    }

    npc_event_definition() {
        try {
            this.json?.data.npc.events.forEach((event, i) => {
                if (event.event_type === 'raid') {
                    this.json.validate_keys(`/npc/npc_events/${i}`, event, ['raid_levels'], [])
                }
            })
        } catch {}
        return array({
            items: object({
                required: ['cooldown_duration', 'initial_cooldown', 'weight'],
                keys: {
                    weight: float(),
                    initial_cooldown: vector2f(),
                    cooldown_duration: vector2f(),
                    event_type: enumerate({
                        items: ['raid'],
                    }),
                    running_duration: float(),
                    raid_levels: array({
                        isUnique: true,
                        items: object({
                            required: ['raid'],
                            keys: {
                                raid: this.npc_raid_definition(),
                            },
                        }),
                    }),
                },
            }),
        })
    }
    player_culture_definition() {
        return object({
            required: ['propagation_rates'],
            keys: {
                decay_rates: array({
                    items: object({
                        keys: {
                            decay_rate: percentage(),
                        },
                    }),
                }),
                propagation_rates: array({
                    items: object({
                        keys: {
                            propagation_rate_scalar: float(false),
                            prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                enemy_weapon_modifiers: this.weapon_modifiers(),
                friendly_weapon_modifiers: this.weapon_modifiers(),
                enemy_unit_modifiers: this.empire_modifiers(),
                empire_modifiers: this.empire_modifiers(),
                friendly_unit_modifiers: this.unit_modifiers(),
                friendly_planet_modifiers: this.planet_modifiers(),
                enemy_planet_modifiers: this.planet_modifiers(),
                npc_modifiers: this.npc_modifiers(),
                npc_rewards: array({
                    items: object({
                        keys: {
                            npc: string(),
                            prerequisites: prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                planet_track_level_culture_providers: this.player_planet_track_level_culture_provider(),
                insurgency: this.player_culture_insurgency_definition(),
            },
        })
    }
    npc_exotic_market_definition() {
        return object({
            required: ['market_weight'],
            keys: {
                market_weight: float(true, 'higher values will cause galaxy generator use this npc over other npcs for this market'),
                exotic_types: array({
                    items: object({
                        keys: {
                            exotic_name: this.cache.exotics,
                            exotic_definition: object({
                                required: ['sell_credits_amount'],
                                keys: {
                                    sell_credits_amount: float(),
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }
    player_planet_track_level_culture_provider() {
        return array({
            items: object({
                keys: {
                    track_type: enumerate({
                        items: ['defense', 'logistics', 'commerce', 'mining', 'research', 'surveying'],
                    }),
                    resistance_rate: float(),
                    minimum_level: integer(),
                    prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                    rate: percentage(),
                },
            }),
        })
    }
    player_culture_insurgency_definition() {
        return object({
            required: ['cooldown', 'spawn_at_gravity_well_count_percentage', 'spawn_units', 'special_operation_unit_kind', 'supply'],
            keys: {
                special_operation_unit_kind: this.cache.special_operation_kinds,
                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                spawn_units: object({
                    keys: {
                        random_units: Definitions.random_units(this.cache),
                        required_units: Definitions.required_units(this.cache),
                    },
                }),
                supply: float(),
                cooldown: float(),
                spawn_at_gravity_well_count_percentage: percentage(),
            },
        })
    }

    npc_asset_market_definition() {
        return object({
            required: ['buy_price', 'market_weight', 'sell_price'],
            keys: {
                sell_price: float(),
                market_weight: float(true, 'higher values will cause galaxy generator use this npc over other npcs for this market'),
                buy_price: float(),
            },
        })
    }

    npc_auction_penalty() {
        return object({
            keys: {
                description: this.cache.localisation,
                levels: array({
                    items: object({
                        required: ['raid'],
                        keys: {
                            raid: this.npc_raid_definition(),
                        },
                    }),
                }),
            },
        })
    }

    npc_modifiers() {
        return array({
            items: object({
                keys: {
                    modifier_type: enumerate({ items: unit_modifier_types() }),
                    value_behavior: Definitions.value_behavior(),
                    values: array({
                        items: object({
                            keys: {
                                value: float(),
                                prerequisites: prerequisites(this.cache.research_subjects),
                            },
                        }),
                    }),
                },
            }),
        })
    }

    npc_visual_definition() {
        return array({
            items: object({
                required: ['color_group', 'icon', 'name'],
                keys: {
                    name: this.cache.localisation,
                    description: this.cache.localisation,
                    portrait: this.cache.player_portraits,
                    icon: this.cache.player_icons,
                    color_group: this.cache.color_groups,
                    secondary_color_index: integer(),
                    use_minimal_team_color: boolean(),
                    reputation_panel: string(), // TODO: Find out what these panels are
                },
            }),
        })
    }

    npc_militia_definition() {
        return object({
            keys: {
                militia_spawn_units: array({
                    items: object({
                        keys: {
                            spawned_units: Definitions.spawn_units_definition(this.cache),
                            supply_threshold: integer(),
                        },
                    }),
                }),
            },
        })
    }

    player_npc_definition() {
        return object({
            required: [
                'simple_planet_tracks',
                'start_allied_to_militia_npc_players',
                'start_allied_to_other_npc_players',
                'start_allied_to_playable_players',
                'visuals',
            ],
            keys: {
                ai_difficulty: enumerate({ items: ['easy', 'medium', 'hard', 'unfair', 'nightmare', 'impossible'] }),
                start_allied_to_playable_players: boolean(),
                ignore_build_prerequisites: boolean(),
                ignore_enemy_explore_ships: boolean('default=true'),
                visuals: this.npc_visual_definition(),
                max_fleet_supply: object({
                    keys: {
                        defend: vector4i(),
                        retreat: vector4i(),
                        roam: vector4i(),
                    },
                }),
                sounds: object({
                    required: ['sounds'],
                    keys: {
                        sounds: object({
                            keys: {
                                attacking: this.cache.ogg,
                                auction_ignored: this.cache.ogg,
                                auction_lost: this.cache.ogg,
                                auction_started: this.cache.ogg,
                                auction_won: this.cache.ogg,
                                insufficient_influence_points: this.cache.ogg,
                                reputation_level_increased: this.cache.ogg,
                                use_ability_generic: this.cache.ogg,
                                use_ability_purchase_item: this.cache.ogg,
                                use_ability_raid_0: this.cache.ogg,
                                use_ability_raid_1: this.cache.ogg,
                            },
                        }),
                    },
                }),
                ai_params: object({
                    keys: {
                        chance_to_ally_with_other_players: vector2f(),
                        defense_to_offsense_spend_ratio: float(true, 'default=1'),
                        desired_explore_ship_count: Definitions.desired_explore_ship_count(
                            this.json?.data?.npc?.ai_params?.desired_explore_ship_count,
                            '/npc/ai_params/desired_explore_ship_count',
                            this.json
                        ),
                        enable_build_starbase_delay_in_minutes: vector2f(),
                        fleet_attack_timeout_duration_in_minutes: float(true, 'throttle fleets from attacking too aggresively'),
                        fleet_colonize_timeout_duration_in_minutes: float(true, 'throttle fleets from colonizing too aggresively'),
                        fleet_will_probably_defeat_ratio_range: vector2f(),
                        max_fleet_capital_ship_count: integer(),
                        max_jumps_from_home_planet_for_fleets: integer(true, 'restrict how far from home planet fleets will move'),
                        max_supply_percentage_relative_to_human_players: float(true, 'prevent ai from getting more supply than human players [0-1]'),
                        pick_another_buildable_attack_ship_type_interval_in_minutes: vector2f(),
                        steal_ships_from_roam_fleets_to_defend_supply_percentage: percentage(),
                        will_attack_other_ai_before_human_players: boolean(),
                        will_fleet_colonize: boolean(),
                        will_use_npcs: boolean(),
                        will_fleet_retreat: boolean('if false fleets will never retreat from battle even if losing.\ndefault=true'),
                    },
                }),
                metal_market: this.npc_asset_market_definition(),
                npc_tags: array({
                    items: this.cache.npc_tags,
                    isUnique: true,
                }),
                events: this.npc_event_definition(),
                culture_reward: object({
                    keys: {
                        has_player_restrictions: boolean(),
                        reward: this.cache.npc_rewards,
                    },
                }),
                start_allied_to_playable_players: boolean(),
                start_allied_to_other_npc_players: boolean(),
                start_allied_to_militia_npc_players: boolean(),
                militia: this.npc_militia_definition(),
                auctions: array({
                    items: object({
                        required: ['bid_duration', 'rewards', 'weight'],
                        keys: {
                            weight: float(),
                            bid_asset_type: Definitions.resources(),
                            bid_exotic_type: this.cache.exotics,
                            bid_duration: float(),
                            winner_reputation_points: float(),
                            reward: this.cache.npc_rewards,
                            rewards: array({
                                items: this.cache.npc_rewards,
                            }),
                            penalty: this.npc_auction_penalty(),
                            constraint: array({ items: enumerate({ items: ['is_metal_market', 'is_crystal_market'] }), isUnique: true }),
                        },
                    }),
                }),
                simple_can_ever_be_colonized_planet_types: array({
                    items: this.cache.planets,
                    isUnique: true,
                }),
                simple_planet_level: integer(true, 'planet level of npc'),
                crystal_market: this.npc_asset_market_definition(),
                exotic_market: this.npc_exotic_market_definition(),

                simple_planet_tracks: object({
                    keys: {
                        defense: this.npc_track(),
                        logistics: this.npc_track(),
                        mining: this.npc_track(),
                        commerce: this.npc_track(),
                        research: this.npc_track(),
                        surveying: this.npc_track(),
                    },
                }),
                simple_trade_capacity: this.trade_capacity_definition(),
                reputation: this.npc_reputation_definition(),
            },
        })
    }

    player_research_definition() {
        return object({
            required: ['faction_research_subjects', 'research_domains', 'research_subjects'],
            keys: {
                research_domains: object({
                    desc: 'todo_schema_def',
                    keys: {
                        civilian: this.player_research_domain_definition(),
                        military: this.player_research_domain_definition(),
                    },
                }),
                research_subjects: array({
                    desc: 'todo_schema_def',
                    items: this.cache.research_subjects,
                    isUnique: true,
                }),
                faction_research_subjects: array({
                    desc: 'todo_schema_def',
                    items: this.cache.research_subjects,
                    isUnique: true,
                }),
                starting_research_subjects: array({
                    desc: 'todo_schema_def',
                    items: this.cache.research_subjects,
                    isUnique: true,
                }),
            },
        })
    }

    trade_capacity_definition() {
        return object({
            keys: {
                import_points: integer(),
                export_points: object({
                    keys: {
                        credits: integer(true, 'default=0'),
                        metal: integer(true, 'default=0'),
                        crystal: integer(true, 'default=0'),
                    },
                }),
            },
        })
    }

    npc_reputation_modifier() {
        return object({
            required: ['value', 'value_behavior'],
            keys: {
                value: float(),
                value_behavior: Definitions.value_behavior(),
            },
        })
    }
    npc_reputation_level_definition() {
        return object({
            required: ['influence_point_cost'],
            keys: {
                influence_point_cost: integer(),
                npc_modifiers: object({
                    keys: {
                        auction_bid_bonus_influence_points: this.npc_reputation_modifier(),
                        buy_crystal_credits_cost: this.npc_reputation_modifier(),
                        buy_metal_credits_cost: this.npc_reputation_modifier(),
                        reputation_ability_cooldown_duration: this.npc_reputation_modifier(),
                        sell_crystal_credits_received: this.npc_reputation_modifier(),
                        sell_exotic_credits_received: this.npc_reputation_modifier(),
                        sell_metal_credits_received: this.npc_reputation_modifier(),
                        send_raid_supply: this.npc_reputation_modifier(),
                    },
                }),
            },
        })
    }

    phase_resonance_definition() {
        return object({
            required: ['levels'],
            keys: {
                base_phase_resonance_bonus_duration: float(),
                levels: array({
                    items: object({
                        required: ['point_cost', 'tracks'],
                        keys: {
                            point_cost: integer(),
                            tracks: object({
                                keys: {
                                    movement: object({
                                        keys: {
                                            unit_modifiers: this.unit_modifiers(),
                                            weapon_modifiers: this.weapon_modifiers(),
                                        },
                                    }),
                                    combat: object({
                                        keys: {
                                            unit_modifiers: this.unit_modifiers(),
                                            weapon_modifiers: this.weapon_modifiers(),
                                        },
                                    }),
                                    utility: object({
                                        keys: {
                                            unit_modifiers: this.unit_modifiers(),
                                            weapon_modifiers: this.weapon_modifiers(),
                                        },
                                    }),
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }
    npc_reputation_definition() {
        return object({
            keys: {
                rewards: array({
                    items: {
                        reward: this.cache.npc_rewards,
                        required_reputation_level: integer(),
                        influence_point_cost: integer(),
                        cooldown_duration: float(),
                    },
                }),
                levels: array({
                    items: this.npc_reputation_level_definition(),
                }),
                abilities: array({
                    items: this.cache.abilities,
                    isUnique: true,
                }),
            },
        })
    }
    player_exotic_build_definition() {
        return array({
            isUnique: true,
            items: object({
                keys: {
                    exotic_name: this.cache.exotics,
                    exotic_definition: object({
                        keys: {
                            factory_build_price: Definitions.assets(),
                            excavate_price: Definitions.assets(),
                            excavate_time: float(),
                            factory_build_time: float(),
                            factory_build_prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                        },
                    }),
                },
            }),
        })
    }

    player_ai_definition() {
        return object({
            required: ['alliance_offer_decline_reasons', 'names'],
            keys: {
                names: object({
                    keys: {
                        id_prefix: string(),
                    },
                }),
                alliance_offer_decline_reasons: object({
                    keys: {
                        alliance_must_not_have_other_demands: this.cache.localisation,
                        alliance_refused: this.cache.localisation,
                        already_given_planet_recently: this.cache.localisation,
                        cannot_give_away_home_or_last_planet: this.cache.localisation,
                        cease_fire_minimum_duration_required_before_other_alliances: this.cache.localisation,
                        cease_fire_required_before_other_alliances: this.cache.localisation,
                        could_not_accept_due_to_insufficient_assets: this.cache.localisation,
                        could_not_accept_due_to_insufficient_exotics: this.cache.localisation,
                        could_not_accept_due_to_other_reasons: this.cache.localisation,
                        give_planets_requires_synergy_alliance: this.cache.localisation,
                        trade_is_not_reasonable: this.cache.localisation,
                    },
                }),
            },
        })
    }

    planet_elevators_definition() {
        return object({
            required: [
                'car_basic_constants',
                'car_count_per_elevator_connection',
                'car_height',
                'car_max_travel_time',
                'car_max_travel_time_offset',
                'car_path_count',
                'car_path_min_t_delta',
                'car_tangent_offset_distance',
                'car_width',
                'cars_texture_animation',
                'elevator_meshes',
                'explosion_effect',
                'explosion_sound',
                'per_level_elevator_count',
                'starting_elevator_count',
            ],
            keys: {
                elevator_meshes: array({
                    items: this.cache.meshes,
                    isUnique: true,
                }),
                starting_elevator_count: integer(),
                per_level_elevator_count: float(),
                explosion_effect: this.cache.particle_effects,
                explosion_sound: this.cache.ogg,
                car_count_per_elevator_connection: integer(),
                car_max_travel_time: float(),
                car_max_travel_time_offset: float(),
                car_tangent_offset_distance: float(),
                car_path_count: float(),
                car_path_min_t_delta: float(),
                cars_texture_animation: this.cache.texture_animations,
                car_width: float(),
                car_height: float(),
                car_basic_constants: Definitions.prim3d_basic_cb_data(),
            },
        })
    }

    player_garrison_definition() {
        try {
            const garrison = this.json?.data.garrison
            switch (garrison.type) {
                case 'build_from_factory':
                    this.json.validate_keys('/garrison', garrison, ['build_kinds', 'factory_build_time_scalar'], ['hyperspace_interval_time'])
                    break
                case 'hyperspace_in':
                    this.json.validate_keys('/garrison', garrison, ['hyperspace_interval_time'], ['build_kinds', 'factory_build_time_scalar'])
                    break
            }
        } catch {}
        return object({
            required: ['spawn_type'],
            keys: {
                spawn_type: Definitions.spawn_type(),
                hyperspace_interval_time: float(),
                special_operation_unit_kind: this.cache.special_operation_kinds,
                garrison_type: enumerate({
                    items: ['local_garrison'],
                }),
                build_kinds: array({
                    items: object({
                        keys: {
                            build_kind: this.cache.build_kinds,
                            prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                        },
                    }),
                    isUnique: true,
                }),
                factory_build_time_scalar: float(),
                units: Definitions.spawn_units_definition(this.cache),
                base_max_supply: float(),
                prerequisites: prerequisites(this.cache.research_subjects),
            },
        })
    }

    player_home_planet_levels_modifier() {
        return object({
            keys: {
                additive: float(),
                scalar: float(),
            },
        })
    }

    player_home_planet_definition() {
        return object({
            keys: {
                emergent_starting_planet_components: array({
                    items: this.cache.planet_components,
                    isUnique: true,
                }),
                starting_is_colonized: boolean(),
                starting_militia_supply: integer(),
                random_fixture_filling: this.cache.random_fixture_fillings,
                levels: array({
                    items: object({
                        keys: {
                            income_rates: Definitions.price('default=0'),
                            modifier_values: object({
                                keys: {
                                    any_development_track_build_price: this.player_home_planet_levels_modifier(),
                                    any_development_track_build_time: this.player_home_planet_levels_modifier(),
                                    bombing_damage_taken: this.player_home_planet_levels_modifier(),
                                    civilian_research_points: this.player_home_planet_levels_modifier(),
                                    civilian_research_rate: this.player_home_planet_levels_modifier(),
                                    max_civilian_structure_slots: this.player_home_planet_levels_modifier(),
                                    commerce_track_build_price: this.player_home_planet_levels_modifier(),
                                    commerce_track_build_time: this.player_home_planet_levels_modifier(),
                                    commerce_track_credit_income_rate: this.player_home_planet_levels_modifier(),
                                    culture_rate: this.player_home_planet_levels_modifier(),
                                    culture_resistance_rate: this.player_home_planet_levels_modifier(),
                                    defense_track_build_price: this.player_home_planet_levels_modifier(),
                                    defense_track_build_time: this.player_home_planet_levels_modifier(),
                                    factory_exotic_build_time: this.player_home_planet_levels_modifier(),
                                    factory_unit_build_price: this.player_home_planet_levels_modifier(),
                                    factory_unit_build_time: this.player_home_planet_levels_modifier(),
                                    gravity_well_radius: this.player_home_planet_levels_modifier(),
                                    health_points_restore_rate: this.player_home_planet_levels_modifier(),
                                    logistics_track_build_price: this.player_home_planet_levels_modifier(),
                                    logistics_track_build_time: this.player_home_planet_levels_modifier(),
                                    max_civilian_structure_slots: this.player_home_planet_levels_modifier(),
                                    max_garrison_supply: this.player_home_planet_levels_modifier(),
                                    max_health_points: this.player_home_planet_levels_modifier(),
                                    max_influence_points: this.player_home_planet_levels_modifier(),
                                    max_military_structure_slots: this.player_home_planet_levels_modifier(),
                                    max_planet_component_slots: this.player_home_planet_levels_modifier(),
                                    max_shield_points: this.player_home_planet_levels_modifier(),
                                    military_research_points: this.player_home_planet_levels_modifier(),
                                    military_research_rate: this.player_home_planet_levels_modifier(),
                                    mining_track_build_price: this.player_home_planet_levels_modifier(),
                                    mining_track_build_time: this.player_home_planet_levels_modifier(),
                                    mining_track_crystal_income_rate: this.player_home_planet_levels_modifier(),
                                    mining_track_metal_income_rate: this.player_home_planet_levels_modifier(),
                                    orbital_extraction_crystal_income_rate: this.player_home_planet_levels_modifier(),
                                    orbital_extraction_metal_income_rate: this.player_home_planet_levels_modifier(),
                                    planet_component_price: this.player_home_planet_levels_modifier(),
                                    research_track_build_price: this.player_home_planet_levels_modifier(),
                                    research_track_build_time: this.player_home_planet_levels_modifier(),
                                    shield_points_restore_rate: this.player_home_planet_levels_modifier(),
                                    structure_build_price: this.player_home_planet_levels_modifier(),
                                    structure_build_time: this.player_home_planet_levels_modifier(),
                                    structure_builder_count: this.player_home_planet_levels_modifier(),
                                    surveying_track_build_price: this.player_home_planet_levels_modifier(),
                                    surveying_track_build_time: this.player_home_planet_levels_modifier(),
                                    unity_points: this.player_home_planet_levels_modifier(),
                                },
                            }),
                            prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                starting_track_levels: object({
                    keys: {
                        logistics: integer(),
                        commerce: integer(),
                        mining: integer(),
                        research: integer(),
                        surveying: integer(),
                    },
                }),
                starting_planet_components: array({
                    items: this.cache.planet_components,
                    isUnique: true,
                }),
                establish_price: Definitions.price(),
                establish_duration: integer(),
            },
        })
    }

    player_unit_build_group_definition() {
        return array({
            items: object({
                required: ['column_count', 'id', 'name'],
                keys: {
                    id: string(),
                    name: this.cache.localisation,
                    column_count: integer(),
                },
            }),
        })
    }

    player_unit_starting_experience_level_definition() {
        return object({
            required: ['prerequisites', 'starting_experience'],
            keys: {
                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                starting_experience: float(),
            },
        })
    }

    player_unit_starting_experience_definition() {
        return object({
            required: ['levels'],
            keys: {
                levels: array({
                    items: this.player_unit_starting_experience_level_definition(),
                    isUnique: true,
                }),
            },
        })
    }

    player_planet_type_definition_array() {
        try {
            this.json?.data.planet_types.forEach((planet, i) => {
                if (!planet.can_ever_be_colonized) {
                    this.json.validate_keys(
                        `/planet_types/${i}`,
                        planet,
                        [],
                        [
                            'max_unity_provider_count',
                            'trade_capacity_levels',
                            'maintenance_cost_rates',
                            'colonization_research_prerequisites',
                            'unlock_asteroid_extractors_mining_track_level',
                            'tracks',
                        ]
                    )
                }
            })
        } catch {}
        return array({
            items: object({
                required: ['can_ever_be_colonized', 'planet_type'],
                keys: {
                    unlock_asteroid_extractors_mining_track_level: integer(),
                    max_unity_provider_count: integer(),
                    planet_type: this.cache.planets,
                    can_ever_be_colonized: boolean(),
                    colonization_research_prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                    tracks: this.tracks(),
                    maintenance_cost_rates: array({ items: float() }),
                    trade_capacity_levels: array({ items: this.trade_capacity_definition(), isUnique: true }),
                },
            }),
        })
    }

    player_sounds_definition() {
        return object({
            required: ['user_interface_sounds'],
            keys: {
                unit_build_kind_sounds: array({
                    items: object({
                        required: ['build_kind'],
                        keys: {
                            build_kind: this.cache.build_kinds,
                            sound_id: Definitions.sound_ids(),
                        },
                    }),
                }),
                user_interface_sounds: object({
                    keys: {
                        alliance_accepted_cease_fire: Definitions.sound(this.cache),
                        alliance_accepted_share_vision: Definitions.sound(this.cache),
                        alliance_accepted_share_vision_aggressive: Definitions.sound(this.cache),
                        alliance_accepted_synergy: Definitions.sound(this.cache),
                        alliance_accepted_synergy_aggressive: Definitions.sound(this.cache),
                        alliance_broken_cease_fire: Definitions.sound(this.cache),
                        alliance_broken_cease_fire_aggressive: Definitions.sound(this.cache),
                        alliance_offered_cease_fire: Definitions.sound(this.cache),
                        alliance_offered_share_vision: Definitions.sound(this.cache),
                        alliance_offered_share_vision_aggressive: Definitions.sound(this.cache),
                        alliance_offered_synergy: Definitions.sound(this.cache),
                        alliance_offered_synergy_aggressive: Definitions.sound(this.cache),
                        ally_capital_planet_being_bombed: Definitions.sound(this.cache),
                        ally_capital_planet_lost: Definitions.sound(this.cache),
                        ally_capital_ship_destroyed: Definitions.sound(this.cache),
                        ally_fleet_arrived: Definitions.sound(this.cache),
                        ally_fleet_under_attack: Definitions.sound(this.cache),
                        ally_planet_being_bombed: Definitions.sound(this.cache),
                        ally_planet_lost: Definitions.sound(this.cache),
                        ally_player_lost: Definitions.sound(this.cache),
                        ally_reinforcing_fleet_arrived: Definitions.sound(this.cache),
                        ally_reinforcing_fleet_incoming: Definitions.sound(this.cache),
                        ally_special_operations_units_arrived: Definitions.sound(this.cache),
                        ally_starbase_destroyed: Definitions.sound(this.cache),
                        ally_titan_built: Definitions.sound(this.cache),
                        ally_titan_destroyed: Definitions.sound(this.cache),
                        ally_victory_condition_alliance_guard_research_subject_completed: Definitions.sound(this.cache),
                        artifact_captured: Definitions.sound(this.cache),
                        build_structure: Definitions.sound(this.cache),
                        buy_npc_market_asset: Definitions.sound(this.cache),
                        capital_planet_being_bombed: Definitions.sound(this.cache),
                        capital_planet_changed: Definitions.sound(this.cache),
                        capital_planet_lost: Definitions.sound(this.cache),
                        capital_planet_nearly_lost: Definitions.sound(this.cache),
                        civilian_research_domain_tier_acquired: Definitions.sound(this.cache),
                        civilian_research_subject_completed: Definitions.sound(this.cache),
                        civilian_structure_built: Definitions.sound(this.cache),
                        click_failed: Definitions.sound(this.cache),
                        control_group_created: Definitions.sound(this.cache),
                        destroy_planet_rewards_given: Definitions.sound(this.cache),
                        destroy_planet_started: Definitions.sound(this.cache),
                        enemy_capital_planet_lost: Definitions.sound(this.cache),
                        enemy_phase_jump_inhibitor_built: Definitions.sound(this.cache),
                        enemy_planet_made_dead_from_bombing: Definitions.sound(this.cache),
                        enemy_player_lost: Definitions.sound(this.cache),
                        enemy_player_lost_by_player: Definitions.sound(this.cache),
                        enemy_special_operations_units_arrived: Definitions.sound(this.cache),
                        enemy_titan_built: Definitions.sound(this.cache),
                        enemy_units_arrived: Definitions.sound(this.cache),
                        enemy_units_incoming: Definitions.sound(this.cache),
                        exotics_surveyed: Definitions.sound(this.cache),
                        fleet_arrived: Definitions.sound(this.cache),
                        fleet_created: Definitions.sound(this.cache),
                        fleet_under_attack: Definitions.sound(this.cache),
                        game_paused: Definitions.sound(this.cache),
                        game_unpaused: Definitions.sound(this.cache),
                        generic_attack_order_issued: Definitions.sound(this.cache),
                        generic_cannot_hyperspace: Definitions.sound(this.cache),
                        generic_joined_fleet: Definitions.sound(this.cache),
                        generic_order_issued: Definitions.sound(this.cache),
                        insufficient_antimatter: Definitions.sound(this.cache),
                        insufficient_civilian_research_points: Definitions.sound(this.cache),
                        insufficient_civilian_structure_slots: Definitions.sound(this.cache),
                        insufficient_civilian_structure_slots_at_max: Definitions.sound(this.cache),
                        insufficient_credits: Definitions.sound(this.cache),
                        insufficient_crystal: Definitions.sound(this.cache),
                        insufficient_defense_exotics: Definitions.sound(this.cache),
                        insufficient_economic_exotics: Definitions.sound(this.cache),
                        insufficient_generic_exotics: Definitions.sound(this.cache),
                        insufficient_metal: Definitions.sound(this.cache),
                        insufficient_military_research_points: Definitions.sound(this.cache),
                        insufficient_military_structure_slots: Definitions.sound(this.cache),
                        insufficient_military_structure_slots_at_max: Definitions.sound(this.cache),
                        insufficient_offense_exotics: Definitions.sound(this.cache),
                        insufficient_ultimate_exotics: Definitions.sound(this.cache),
                        insufficient_unit_supply: Definitions.sound(this.cache),
                        insufficient_unit_supply_at_max_supply: Definitions.sound(this.cache),
                        insufficient_unity_mana: Definitions.sound(this.cache),
                        insufficient_unity_points: Definitions.sound(this.cache),
                        insufficient_utility_exotics: Definitions.sound(this.cache),
                        large_unit_factory_needed: Definitions.sound(this.cache),
                        medium_unit_factory_needed: Definitions.sound(this.cache),
                        military_research_domain_tier_acquired: Definitions.sound(this.cache),
                        military_research_subject_completed: Definitions.sound(this.cache),
                        military_structure_built: Definitions.sound(this.cache),
                        nothing_surveyed: Definitions.sound(this.cache),
                        npc_crystal_market_exclusive_player_started_negative: Definitions.sound(this.cache),
                        npc_crystal_market_exclusive_player_started_positive: Definitions.sound(this.cache),
                        npc_metal_market_exclusive_player_started_negative: Definitions.sound(this.cache),
                        npc_metal_market_exclusive_player_started_positive: Definitions.sound(this.cache),
                        orbital_cannon_shell_detected: Definitions.sound(this.cache),
                        ping_attack: Definitions.sound(this.cache),
                        ping_attention: Definitions.sound(this.cache),
                        ping_defend: Definitions.sound(this.cache),
                        ping_received_attack: Definitions.sound(this.cache),
                        ping_received_attention: Definitions.sound(this.cache),
                        ping_received_defend: Definitions.sound(this.cache),
                        pirate_units_arrived: Definitions.sound(this.cache),
                        planet_artifact_surveyed: Definitions.sound(this.cache),
                        planet_being_bombed: Definitions.sound(this.cache),
                        planet_bonus_surveyed: Definitions.sound(this.cache),
                        planet_colonized: Definitions.sound(this.cache),
                        planet_component_finished_building: Definitions.sound(this.cache),
                        planet_conversion_colonized: Definitions.sound(this.cache),
                        planet_conversion_started: Definitions.sound(this.cache),
                        planet_discovered: Definitions.sound(this.cache),
                        planet_lost: Definitions.sound(this.cache),
                        planet_track_upgrade_commerce_completed: Definitions.sound(this.cache),
                        planet_track_upgrade_defense_completed: Definitions.sound(this.cache),
                        planet_track_upgrade_logistics_completed: Definitions.sound(this.cache),
                        planet_track_upgrade_mining_completed: Definitions.sound(this.cache),
                        planet_track_upgrade_research_completed: Definitions.sound(this.cache),
                        player_added_first_ruler_ship: Definitions.sound(this.cache),
                        player_lost: Definitions.sound(this.cache),
                        player_units_arrived_at_enemy_phase_jump_inhibitor: Definitions.sound(this.cache),
                        player_won: Definitions.sound(this.cache),
                        player_won_diplomatic: Definitions.sound(this.cache),
                        position_has_overlapped_unit: Definitions.sound(this.cache),
                        reinforcing_fleet_arrived: Definitions.sound(this.cache),
                        research_prerequisites_not_met: Definitions.sound(this.cache),
                        scuttle_planet_started: Definitions.sound(this.cache),
                        scuttle_unit_started: Definitions.sound(this.cache),
                        sell_npc_market_asset: Definitions.sound(this.cache),
                        set_planet_structure_plate_spin: Definitions.sound(this.cache),
                        set_rally_point: Definitions.sound(this.cache),
                        set_unit_factory_deliverable_destination: Definitions.sound(this.cache),
                        small_unit_factory_needed: Definitions.sound(this.cache),
                        unity_ability_cooldown_is_not_completed: Definitions.sound(this.cache),
                        victory_condition_alliance_guard_research_subject_completed: Definitions.sound(this.cache),
                        wormhole_travel_research_prerequisites_not_met: Definitions.sound(this.cache),
                    },
                }),
            },
        })
    }

    player_gui_types_texts_definition() {
        return object({
            keys: {
                lost_pictures: array({ items: this.cache.textures(), isUnique: true }),
                won_pictures: array({ items: this.cache.textures(), isUnique: true }),
                won_texts: array({
                    isUnique: true,
                    items: object({
                        required: ['phrase', 'status'],
                        keys: {
                            phrase: this.cache.localisation,
                            status: this.cache.localisation,
                        },
                    }),
                }),
                lost_texts: array({
                    isUnique: true,
                    items: object({
                        required: ['phrase', 'status'],
                        keys: {
                            phrase: this.cache.localisation,
                            status: this.cache.localisation,
                        },
                    }),
                }),
            },
        })
    }

    player_victory_gui_definition() {
        return object({
            required: ['types'],
            keys: {
                types: object({
                    keys: {
                        diplomatic: this.player_gui_types_texts_definition(),
                        colonization: this.player_gui_types_texts_definition(),
                        home_planet: this.player_gui_types_texts_definition(),
                        military: this.player_gui_types_texts_definition(),
                    },
                }),
            },
        })
    }

    player_structure_build_group_definition() {
        return object({
            required: ['column_count', 'id', 'name'],
            keys: {
                column_count: integer(),
                id: string(),
                name: this.cache.localisation,
                structure_slot_type: Definitions.domain(),
            },
        })
    }

    player_trade_definition() {
        return object({
            keys: {
                trade_income_rates: Definitions.price(),
                trade_ship_death_assets: Definitions.price(),
                trade_ship_escorts: array({
                    items: object({
                        keys: {
                            unit: this.cache.units,
                            count_per_trade_ship: integer(),
                            special_operation_unit_kind: this.cache.special_operation_kinds,
                            research_prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                            construction_time: float(),
                        },
                    }),
                }),
            },
        })
    }

    player_unity_definition() {
        return object({
            required: ['base_mana_restore_rate', 'base_max_mana', 'unity_agent'],
            keys: {
                abilities: array({ items: this.cache.abilities, isUnique: true }),
                base_mana_restore_rate: float(),
                base_max_mana: float(),
                unity_agent: this.cache.units,
            },
        })
    }

    create() {
        return schema({
            required: ['home_planet', 'race', 'unit_limits'],
            keys: {
                race: this.cache.race_names,
                ability_created_structures: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                ability_created_units: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                unity: this.player_unity_definition(),
                influence: object({
                    keys: {
                        reveal_npc_point_costs: array({
                            items: integer(),
                        }),
                        increase_npc_reputation_level_point_costs: array({
                            items: integer(),
                        }),
                    },
                    required: ['reveal_npc_point_costs', 'increase_npc_reputation_level_point_costs'],
                }),
                home_planet: this.player_home_planet_definition(),
                starting_units_in_gravity_well: Definitions.spawn_units_definition(this.cache),
                hyperspace_between_stars_research: array({
                    desc: 'research required to travel between stars',
                    items: Definitions.prerequisites(this.cache.research_subjects),
                    isUnique: true,
                }),
                influence: object({
                    keys: {
                        reveal_npc_point_costs: array({
                            items: integer(),
                            isUnique: true,
                        }),
                    },
                    required: ['reveal_npc_point_costs'],
                }),
                planet_surveying_levels: array({
                    items: object({
                        required: ['upgrade_duration', 'upgrade_price'],
                        keys: {
                            upgrade_duration: float(),
                            upgrade_price: Definitions.price(),
                        },
                    }),
                }),
                planet_levels: array({
                    items: object({
                        required: ['upgrade_duration', 'upgrade_price'],
                        keys: {
                            upgrade_price: Definitions.price(),
                            upgrade_duration: float(),
                            experience_given_on_bombed_to_neutral: float(),
                        },
                    }),
                }),
                starting_units_in_hyperspace: Definitions.spawn_units_definition(this.cache),
                planet_excavation_levels: array({
                    items: object({
                        keys: {
                            upgrade_price: Definitions.price(),
                            upgrade_duration: float(),
                        },
                    }),
                }),
                starting_npc_detection: object({
                    keys: {
                        all_friendly: boolean(),
                        all_hostile: boolean(),
                        specific_npcs: array({ items: this.cache.players, isUnique: true }),
                    },
                }),
                starting_free_unit_build_kinds: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                starting_units_in_formations: array({
                    items: object({
                        keys: {
                            required_units: array({
                                items: object({
                                    keys: {
                                        unit: this.cache.units,
                                        count: vector2f(),
                                    },
                                }),
                            }),
                        },
                    }),
                }),
                fleet_name_group: enumerate({ items: ['fleet'] }), // TODO: ?
                starting_are_all_npcs_detected: boolean(),
                starting_units_in_hyperspace_duration: float(true),
                fleet: this.cache.fleet_units,
                unit_build_groups: this.player_unit_build_group_definition(),
                buildable_units: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                faction_buildable_units: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                buildable_strikecraft: array({
                    items: this.cache.strikecraft_units,
                    isUnique: true,
                }),
                structure_build_groups: array({
                    items: this.player_structure_build_group_definition(),
                    isUnique: true,
                }),
                structure_builder: object({
                    required: ['ship'],
                    keys: {
                        ship: this.cache.units,
                        special_operation_unit_kind: this.cache.special_operation_kinds,
                    },
                }),
                structures: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                faction_structures: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                ability_created_units: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                unit_limits: object({
                    keys: {
                        global: array({
                            items: object({
                                required: ['unit_limit'],
                                keys: {
                                    tag: this.cache.ship_tags,
                                    unit_limit: integer(),
                                },
                            }),
                        }),
                        star: array({
                            items: object({
                                required: ['unit_limit'],
                                keys: {
                                    tag: this.cache.ship_tags,
                                    unit_limit: integer(),
                                },
                            }),
                        }),
                        planet: array({
                            items: object({
                                required: ['unit_limit'],
                                keys: {
                                    tag: this.cache.ship_tags,
                                    unit_limit: integer(),
                                },
                            }),
                        }),
                    },
                }),
                npc: this.player_npc_definition(),
                research: this.player_research_definition(),
                missing_ship_component_shop_build_time_scalar: float(),
                ship_components: array({
                    items: this.cache.ship_components,
                    isUnique: true,
                }),
                planet_components: array({
                    items: this.cache.planet_components,
                    isUnique: true,
                }),
                faction_planet_components: array({
                    items: this.cache.planet_components,
                    isUnique: true,
                }),
                ship_component_build_groups: this.player_unit_build_group_definition(),
                planet_component_build_groups: this.player_unit_build_group_definition(),
                first_capital_ship_item: this.cache.unit_items,
                planet_types: this.player_planet_type_definition_array(),
                default_starting_assets: Definitions.price(),
                default_starting_exotics: array({
                    items: object({
                        keys: {
                            exotic_type: this.cache.exotics,
                            count: integer(),
                        },
                    }),
                }),
                asteroid_extraction_rates: object({
                    keys: {
                        credits: percentage(),
                        metal: percentage(),
                        crystal: percentage(),
                    },
                }),
                planet_bombing_recovery_cooldown: float(),
                colonize_starting_health_percent: percentage(),
                colonize_starting_shield_percent: percentage(),
                culture: this.player_culture_definition(),
                find_npc_explore_prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                buildable_exotics: this.player_exotic_build_definition(),
                phase_resonance: this.phase_resonance_definition(),
                garrison: this.player_garrison_definition(),
                trade: this.player_trade_definition(),
                max_supply: object({
                    required: ['levels'],
                    keys: {
                        levels: array({
                            items: object({
                                keys: {
                                    max_supply: integer(),
                                    prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                                },
                            }),
                        }),
                    },
                }),
                unit_starting_experience: this.player_unit_starting_experience_definition(),
                auto_add_initial_home_planet_bookmark: boolean(),
                gui: object({
                    required: ['faction_description', 'faction_icon', 'faction_name', 'race_description', 'race_name'],
                    keys: {
                        hud_skin_name: this.cache.hud_skins,
                        race_name: this.cache.localisation,
                        race_description: this.cache.localisation,
                        faction_name: this.cache.localisation,
                        faction_description: this.cache.localisation,
                        player_slot_plate: this.cache.textures(),
                        faction_icon: this.cache.textures(),
                        load_screen_character_brush: this.cache.textures(),
                        no_credit_income_description: this.cache.localisation,
                    },
                }),
                unit_names: array({
                    items: object({
                        required: ['localized_text'],
                        keys: {
                            group_name: string(),
                            localized_text: object({
                                keys: {
                                    id_prefix: string(),
                                },
                            }),
                        },
                    }),
                }),
                wormhole_research: array({
                    desc: 'research required to travel through wormholes',
                    items: Definitions.prerequisites(this.cache.research_subjects),
                }),
                victory_gui: this.player_victory_gui_definition(),
                sounds: this.player_sounds_definition(),
                ai: this.player_ai_definition(),
                portraits: array({
                    items: this.cache.player_portraits,
                    isUnique: true,
                }),
                icons: array({
                    items: this.cache.player_icons,
                    isUnique: true,
                }),
                planet_elevators: this.planet_elevators_definition(),
                theme_picker_mesh_preview_units: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                theme_picker_skybox: this.cache.skyboxes,
            },
        })
    }
}
