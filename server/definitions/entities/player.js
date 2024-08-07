const { DiagnosticReporter } = require('../../data/diagnostic-reporter')
const { prerequisites } = require('../definitions')
const { has } = require('../../utils/utils')
const { schema, float, string, object, array, integer, enumerate, vector2f, boolean, percentage, vector2i, version } = require('../data_types')
const { planet_modifier_types, unit_modifier_types } = require('../modifier_types')
const Definitions = require('../definitions')
const { UnitModifiers, WeaponModifiers, EmpireModifiers, NpcModifiers } = require('../modifier_definitions')

module.exports = class Player {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)

        this.fileName = fileName

        this.cache = cache
    }

    research_domain() {
        return object({
            keys: {
                research_tiers: array({
                    items: object({
                        keys: {
                            acquire_time: float(),
                            required_research_points: integer(),
                            price: Definitions.price(),
                            exotic_price: Definitions.exotic_price(this.cache.exotics),
                            player_modifiers: object({
                                keys: {
                                    unit_modifiers: UnitModifiers.create(
                                        {
                                            hasArrayValues: false,
                                        },
                                        this.cache
                                    ),
                                    weapon_modifiers: WeaponModifiers.create(
                                        {
                                            hasArrayValues: false,
                                        },
                                        this.cache
                                    ),
                                    empire_modifiers: EmpireModifiers.create(),
                                },
                            }),
                            button_background: this.cache.textures,
                        },
                    }),
                }),
                research_fields: array({
                    items: object({
                        keys: {
                            id: string(),
                            name: this.cache.localisation,
                            picture: this.cache.textures,
                        },
                    }),
                }),
                name: this.cache.localisation,
                full_name: this.cache.localisation,
                partial_name: this.cache.localisation,
                research_points_name: this.cache.localisation,
                planet_track_name: this.cache.localisation,
                planet_track_description: this.cache.localisation,
                planet_track_max_level_label: this.cache.localisation,
                planet_track_current_level_label: this.cache.localisation,
                button_background: this.cache.textures,
                compressed_research_field_picture: this.cache.textures,
                hud_icon: this.cache.textures,
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
                                prerequisites: prerequisites(this.cache.research_subjects),
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
                    values: array({
                        items: object({
                            keys: {
                                value: float(false),
                                prerequisites: prerequisites(this.cache.research_subjects),
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
                max_civilian_structure_slots: float(),
                structure_builder_count: integer(),
                max_military_structure_slots: float(),
                max_health_points: float(),
                health_points_restore_rate: float(),
                credits_income_rate: float(),
                metal_income_rate: float(),
                crystal_income_rate: float(),
            },
        })
    }

    tracks() {
        return object({
            keys: {
                defense: array({
                    items: object({
                        keys: {
                            max_military_structure_slots: integer(),
                            max_health_points: float(),
                            health_points_restore_rate: float(),
                            prerequisites: prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                logistics: array({
                    items: object({
                        keys: {
                            max_health_points: float(),
                            max_planet_component_slots: integer(),
                            max_civilian_structure_slots: integer(),
                            structure_builder_count: integer(),
                            prerequisites: prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                commerce: array({
                    items: object({
                        keys: {
                            credits_income_rate: float(),
                            max_health_points: float(),
                            prerequisites: prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                mining: array({
                    items: object({
                        keys: {
                            metal_income_rate: float(),
                            crystal_income_rate: float(),
                            max_health_points: float(),
                            prerequisites: prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                excavation: array({
                    items: object({
                        keys: {},
                    }),
                }),
                civilian_research: array({
                    items: object({
                        keys: {
                            civilian_research_points: float(),
                            max_health_points: float(),
                            prerequisites: prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
                military_research: array({
                    items: object({
                        keys: {
                            military_research_points: float(),
                            max_health_points: float(),
                            prerequisites: prerequisites(this.cache.research_subjects),
                        },
                    }),
                }),
            },
        })
    }

    victory_gui() {
        return object({
            keys: {
                won_pictures: array({
                    items: this.cache.textures,
                    isUnique: true,
                }),
                lost_pictures: array({
                    items: this.cache.textures,
                    isUnique: true,
                }),
                won_texts: array({
                    items: object({
                        keys: {
                            status: this.cache.localisation,
                            phrase: this.cache.localisation,
                        },
                    }),
                }),
                lost_texts: array({
                    items: object({
                        keys: {
                            status: this.cache.localisation,
                            phrase: this.cache.localisation,
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
                    modifier_type: NpcModifiers.modifier_type(),
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

    create() {
        try {
            if (has(this.json.data, 'starting_units_in_hyperspace') && !has(this.json.data, 'starting_units_in_hyperspace_duration')) {
                this.json.key_requires('', 'starting_units_in_hyperspace_duration')
            }
            this.json.greater_than_zero(this.json.data.starting_units_in_hyperspace_duration, '/starting_units_in_hyperspace_duration')
        } catch {}

        return schema({
            keys: {
                version: version(),
                race: this.cache.race_names,
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
                home_planet: object({
                    keys: {
                        emergent_starting_planet_components: array({
                            items: this.cache.planet_components,
                            isUnique: true,
                        }),
                        starting_is_colonized: boolean(),
                        starting_militia_supply: float(),
                        random_fixture_filling: this.cache.fillings('random_fixtures'),
                        levels: array({
                            items: object({
                                keys: {
                                    income_rates: Definitions.price(),
                                    modifier_values: object({
                                        keys: {
                                            max_civilian_structure_slots: object({
                                                keys: {
                                                    additive: float(),
                                                },
                                            }),
                                            max_military_structure_slots: object({
                                                keys: {
                                                    additive: float(),
                                                },
                                            }),
                                            max_health_points: object({
                                                keys: {
                                                    additive: float(),
                                                },
                                            }),
                                            max_influence_points: object({
                                                keys: {
                                                    additive: float(),
                                                },
                                            }),
                                        },
                                    }),
                                },
                            }),
                        }),
                        starting_track_levels: object({
                            keys: {
                                logistics: integer(),
                                commerce: integer(),
                                mining: integer(),
                            },
                        }),
                        starting_planet_components: array({
                            items: this.cache.planet_components,
                            isUnique: true,
                        }),
                        establish_price: Definitions.price(),
                    },
                }),
                starting_units_in_gravity_well: object({
                    keys: {
                        required_units: Definitions.getRequiredUnits(this.cache),
                        random_units: Definitions.units(this.cache.units),
                    },
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
                planet_levels: array({
                    items: object({
                        keys: {
                            upgrade_price: Definitions.price(),
                            upgrade_duration: float(),
                            experience_given_on_bombed_to_neutral: float(),
                        },
                    }),
                }),
                starting_units_in_hyperspace: object({
                    keys: {
                        required_units: Definitions.getRequiredUnits(this.cache),
                        random_units: Definitions.units(this.cache.units),
                    },
                }),
                planet_excavation_levels: array({
                    items: object({
                        keys: {
                            upgrade_price: Definitions.price(),
                            upgrade_duration: float(),
                        },
                    }),
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
                starting_are_all_npcs_detected: boolean(),
                starting_units_in_hyperspace_duration: float(),
                fleet: this.cache.fleet_units,
                unit_build_groups: array({
                    items: object({
                        keys: {
                            id: string(),
                            name: this.cache.localisation,
                            column_count: integer(),
                        },
                    }),
                }),
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
                    items: object({
                        keys: {
                            id: string(),
                            name: this.cache.localisation,
                            column_count: integer(),
                            structure_slot_type: Definitions.getDomain(),
                        },
                    }),
                }),
                structure_builder: object({
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
                                keys: {
                                    tag: this.cache.ship_tags,
                                    unit_limit: integer(),
                                },
                            }),
                        }),
                        star: array({
                            items: object({
                                keys: {
                                    tag: this.cache.ship_tags,
                                    unit_limit: integer(),
                                },
                            }),
                        }),
                        planet: array({
                            items: object({
                                keys: {
                                    tag: this.cache.ship_tags,
                                    unit_limit: integer(),
                                },
                            }),
                        }),
                    },
                }),
                npc: object({
                    keys: {
                        visuals: array({
                            items: object({
                                keys: {
                                    name: this.cache.localisation,
                                    description: this.cache.localisation,
                                    portrait: this.cache.player_portraits,
                                    icon: this.cache.player_icons,
                                    color_group: this.cache.color_groups,
                                    reputation_panel: enumerate({
                                        items: ['viturak_cabal_panel', 'pranast_united_panel', 'jiskun_force_panel', 'aluxian_resurgence_panel', 'pirate_panel'],
                                    }),
                                },
                            }),
                        }),
                        ai_params: object({
                            keys: {
                                will_fleet_colonize: boolean(),
                                max_jumps_from_home_planet_for_fleets: integer(),
                                max_fleet_supply: float(),
                                pick_another_buildable_attack_ship_type_interval_in_minutes: vector2i(),
                                desired_explore_ship_count: object({
                                    keys: {
                                        type: enumerate({
                                            items: ['constant'],
                                        }),
                                        value: integer(),
                                    },
                                    required: ['type', 'value'],
                                }),
                            },
                            required: ['desired_explore_ship_count', 'max_jumps_from_home_planet_for_fleets', 'max_fleet_supply', 'pick_another_buildable_attack_ship_type_interval_in_minutes'],
                        }),
                        metal_market: object({
                            keys: {
                                sell_price: float(),
                                buy_price: float(),
                            },
                        }),
                        npc_tags: array({
                            items: this.cache.npc_tags,
                            isUnique: true,
                        }),
                        events: array({
                            items: object({
                                keys: {
                                    weight: float(),
                                    initial_cooldown: vector2f(),
                                    cooldown_duration: vector2f(),
                                    event_type: enumerate({
                                        items: ['raid'],
                                    }),
                                    running_duration: float(),
                                    raid_levels: array({
                                        items: object({
                                            keys: {
                                                raid: object({
                                                    keys: {
                                                        units: object({
                                                            keys: {
                                                                required_units: Definitions.getRequiredUnits(this.cache),
                                                                random_units: Definitions.units(this.cache.units),
                                                            },
                                                        }),
                                                        supply: float(),
                                                    },
                                                }),
                                            },
                                        }),
                                    }),
                                },
                            }),
                        }),
                        culture_reward: object({
                            keys: {
                                has_player_restrictions: boolean(),
                                reward: this.cache.npc_rewards,
                            },
                        }),
                        start_allied_to_playable_players: boolean(),
                        start_allied_to_other_npc_players: boolean(),
                        start_allied_to_militia_npc_players: boolean(),
                        militia: object({
                            keys: {
                                militia_spawn_units: array({
                                    items: object({
                                        keys: {
                                            spawned_units: object({
                                                keys: {
                                                    required_units: Definitions.getRequiredUnits(this.cache),
                                                    random_units: Definitions.units(this.cache.units),
                                                },
                                            }),
                                            supply_threshold: float(),
                                        },
                                    }),
                                }),
                            },
                        }),
                        auctions: array({
                            items: object({
                                keys: {
                                    weight: float(),
                                    bid_asset_type: Definitions.getResources(),
                                    bid_exotic_type: this.cache.exotics,
                                    bid_duration: float(),
                                    winner_reputation_points: float(),
                                    reward: this.cache.npc_rewards,
                                    rewards: array({
                                        items: this.cache.npc_rewards,
                                    }),
                                    constraint: Definitions.getConstraintType(),
                                },
                            }),
                        }),
                        simple_can_ever_be_colonized_planet_types: array({
                            items: this.cache.planets,
                            isUnique: true,
                        }),
                        crystal_market: object({
                            keys: {
                                sell_price: float(),
                                buy_price: float(),
                            },
                        }),
                        exotic_market: object({
                            keys: {
                                exotic_types: array({
                                    items: array({
                                        items: [
                                            this.cache.exotics,
                                            object({
                                                keys: {
                                                    sell_credits_amount: float(),
                                                },
                                            }),
                                        ],
                                    }),
                                }),
                            },
                        }),
                        simple_planet_tracks: object({
                            keys: {
                                defense: this.npc_track(),
                                logistics: this.npc_track(),
                                mining: this.npc_track(),
                                commerce: this.npc_track(),
                                excavation: object({
                                    keys: {},
                                }),
                                civilian_research: object({
                                    keys: {},
                                }),
                                military_research: object({
                                    keys: {},
                                }),
                            },
                        }),
                        simple_trade_capacity: object({
                            keys: {
                                export_points: object({
                                    keys: {
                                        credits: integer(),
                                        metal: integer(),
                                        crystal: integer(),
                                    },
                                }),
                            },
                        }),
                        reputation: object({
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
                                    items: object({
                                        keys: {
                                            influence_point_cost: integer(),
                                            points_needed: float(),
                                            reward: this.cache.npc_rewards,
                                            reward_level: integer(),
                                            npc_modifiers: object({
                                                keys: {
                                                    sell_crystal_credits_received: object({
                                                        keys: {
                                                            value_behavior: Definitions.value_behavior(),
                                                            value: float(),
                                                        },
                                                    }),
                                                    sell_metal_credits_received: object({
                                                        keys: {
                                                            value_behavior: Definitions.value_behavior(),
                                                            value: float(),
                                                        },
                                                    }),
                                                    sell_exotic_credits_received: object({
                                                        keys: {
                                                            value_behavior: Definitions.value_behavior(),
                                                            value: float(),
                                                        },
                                                    }),
                                                },
                                            }),
                                        },
                                    }),
                                }),
                                abilities: array({
                                    items: this.cache.abilities,
                                    isUnique: true,
                                }),
                            },
                        }),
                    },
                }),
                research: object({
                    keys: {
                        research_domains: object({
                            keys: {
                                civilian: this.research_domain(),
                                military: this.research_domain(),
                            },
                        }),
                        research_subjects: array({
                            items: this.cache.research_subjects,
                            isUnique: true,
                        }),
                        faction_research_subjects: array({
                            items: this.cache.research_subjects,
                            isUnique: true,
                        }),
                        starting_research_subjects: array({
                            items: this.cache.research_subjects,
                            isUnique: true,
                        }),
                    },
                }),
                missing_ship_component_shop_build_time_scalar: float(),
                ship_components: array({
                    items: this.cache.ship_components,
                    isUnique: true,
                }),
                ship_component_build_groups: array({
                    items: object({
                        keys: {
                            id: string(),
                            name: this.cache.localisation,
                            column_count: integer(),
                        },
                    }),
                }),
                planet_components: array({
                    items: this.cache.planet_components,
                    isUnique: true,
                }),
                faction_planet_components: array({
                    items: this.cache.planet_components,
                    isUnique: true,
                }),
                planet_component_build_groups: array({
                    items: object({
                        keys: {
                            id: string(),
                            name: this.cache.localisation,
                            column_count: integer(),
                        },
                    }),
                }),
                first_capital_ship_item: this.cache.unit_items,
                planet_types: array({
                    items: object({
                        keys: {
                            planet_type: this.cache.planets,
                            can_ever_be_colonized: boolean(),
                            colonization_research_prerequisites: prerequisites(this.cache.research_subjects),
                            tracks: this.tracks(),
                            maintenance_cost_rates: array({}),
                            trade_capacity_levels: array({
                                items: object({
                                    keys: {
                                        import_points: integer(),
                                        export_points: object({
                                            keys: {
                                                credits: integer(),
                                                metal: integer(),
                                                crystal: integer(),
                                            },
                                        }),
                                    },
                                }),
                            }),
                        },
                    }),
                }),
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
                culture: object({
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
                                    prerequisites: prerequisites(this.cache.research_subjects),
                                },
                            }),
                        }),
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
                        planet_track_level_culture_providers: array({
                            items: object({
                                keys: {
                                    track_type: enumerate({
                                        items: ['commerce'],
                                    }),
                                    minimum_level: integer(),
                                    prerequisites: prerequisites(this.cache.research_subjects),
                                    rate: percentage(),
                                },
                            }),
                        }),
                        insurgency: object({
                            keys: {
                                special_operation_unit_kind: this.cache.special_operation_kinds,
                                prerequisites: prerequisites(this.cache.research_subjects),
                                spawn_units: object({
                                    keys: {
                                        random_units: Definitions.units(this.cache.units),
                                    },
                                }),
                                supply: float(),
                                cooldown: float(),
                                spawn_at_gravity_well_count_percentage: percentage(),
                            },
                        }),
                    },
                }),
                find_npc_explore_prerequisites: prerequisites(this.cache.research_subjects),
                buildable_exotics: array({
                    items: array({
                        items: [
                            this.cache.exotics,
                            object({
                                keys: {
                                    build_time: float(),
                                    price: Definitions.price(),
                                    prerequisites: prerequisites(this.cache.research_subjects),
                                },
                            }),
                        ],
                    }),
                }),
                phase_resonance: object({
                    keys: {
                        levels: array({
                            items: object({
                                keys: {
                                    point_cost: integer(),
                                    tracks: object({
                                        keys: {
                                            movement: object({
                                                keys: {
                                                    unit_modifiers: UnitModifiers.create(
                                                        {
                                                            hasArrayValues: false,
                                                        },
                                                        this.cache
                                                    ),
                                                },
                                            }),
                                            combat: object({
                                                keys: {
                                                    weapon_modifiers: WeaponModifiers.create(
                                                        {
                                                            hasArrayValues: false,
                                                        },
                                                        this.cache
                                                    ),
                                                },
                                            }),
                                            utility: object({
                                                keys: {
                                                    unit_modifiers: UnitModifiers.create(
                                                        {
                                                            hasArrayValues: false,
                                                        },
                                                        this.cache
                                                    ),
                                                },
                                            }),
                                        },
                                    }),
                                },
                            }),
                        }),
                        base_phase_resonance_bonus_duration: float(),
                    },
                }),
                garrison: object({
                    keys: {
                        spawn_type: Definitions.getSpawnType(),
                        hyperspace_interval_time: float(),
                        special_operation_unit_kind: this.cache.special_operation_kinds,
                        garrison_type: enumerate({
                            items: ['local_garrison'],
                        }),
                        build_kinds: array({
                            items: object({
                                keys: {
                                    build_kind: this.cache.build_kinds,
                                    prerequisites: prerequisites(this.cache.research_subjects),
                                },
                            }),
                            isUnique: true,
                        }),
                        factory_build_time_scalar: float(),
                        units: object({
                            keys: {
                                random_units: Definitions.units(this.cache.units),
                            },
                        }),
                        base_max_supply: float(),
                        prerequisites: prerequisites(this.cache.research_subjects),
                    },
                }),
                trade: object({
                    keys: {
                        trade_income_rates: Definitions.price(),
                        trade_ship_death_assets: Definitions.price(),
                        trade_ship_escorts: array({
                            items: object({
                                keys: {
                                    unit: this.cache.units,
                                    count_per_trade_ship: integer(),
                                    special_operation_unit_kind: this.cache.special_operation_kinds,
                                    research_prerequisites: prerequisites(this.cache.research_subjects),
                                    construction_time: float(),
                                },
                            }),
                        }),
                    },
                }),
                max_supply: object({
                    keys: {
                        levels: array({
                            items: object({
                                keys: {
                                    max_supply: float(),
                                    prerequisites: prerequisites(this.cache.research_subjects),
                                },
                            }),
                        }),
                    },
                }),
                unit_starting_experience: object({
                    keys: {
                        levels: array({
                            items: object({
                                keys: {
                                    starting_experience: float(),
                                    max_supply: float(),
                                    prerequisites: prerequisites(this.cache.research_subjects),
                                },
                            }),
                        }),
                    },
                }),
                auto_add_initial_home_planet_bookmark: boolean(),
                gui: object({
                    keys: {
                        // HACK: ????
                        hud_skin_name: string(),
                        race_name: this.cache.localisation,
                        race_description: this.cache.localisation,
                        faction_name: this.cache.localisation,
                        faction_description: this.cache.localisation,
                        faction_icon: this.cache.textures,
                        load_screen_character_brush: this.cache.textures,
                        no_credit_income_description: this.cache.localisation,
                    },
                }),
                unit_names: array({
                    items: object({
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
                victory_gui: object({
                    keys: {
                        types: object({
                            keys: {
                                military: this.victory_gui(),
                                home_planet: this.victory_gui(),
                                diplomatic: this.victory_gui(),
                                colonization: this.victory_gui(),
                            },
                        }),
                    },
                }),
                sounds: object({
                    keys: {
                        user_interface_sounds: object({
                            keys: {
                                set_rally_point: Definitions.sound(this.cache),
                                set_unit_factory_deliverable_destination: Definitions.sound(this.cache),
                                build_structure: Definitions.sound(this.cache),
                                set_planet_structure_plate_spin: Definitions.sound(this.cache),
                                ping_attention: Definitions.sound(this.cache),
                                ping_attack: Definitions.sound(this.cache),
                                ping_defend: Definitions.sound(this.cache),
                                join_fleet: Definitions.sound(this.cache),
                                research_completed: Definitions.sound(this.cache),
                                planet_being_bombed: Definitions.sound(this.cache),
                                planet_colonized: Definitions.sound(this.cache),
                                planet_lost: Definitions.sound(this.cache),
                                ally_planet_lost: Definitions.sound(this.cache),
                                planet_artifact_excavated: Definitions.sound(this.cache),
                                planet_bonus_excavated: Definitions.sound(this.cache),
                                planet_track_upgrade_completed: Definitions.sound(this.cache),
                                enemy_units_incoming: Definitions.sound(this.cache),
                                enemy_units_arrived: Definitions.sound(this.cache),
                                enemy_planet_made_dead_from_bombing: Definitions.sound(this.cache),
                                pirate_units_arrived: Definitions.sound(this.cache),
                                insufficient_credits: Definitions.sound(this.cache),
                                insufficient_metal: Definitions.sound(this.cache),
                                insufficient_crystal: Definitions.sound(this.cache),
                                insufficient_civilian_structure_slots: Definitions.sound(this.cache),
                                insufficient_military_structure_slots: Definitions.sound(this.cache),
                                insufficient_antimatter: Definitions.sound(this.cache),
                                research_prerequisites_not_met: Definitions.sound(this.cache),
                                insufficient_civilian_research_points: Definitions.sound(this.cache),
                                insufficient_military_research_points: Definitions.sound(this.cache),
                                position_has_overlapped_unit: Definitions.sound(this.cache),
                                click_failed: Definitions.sound(this.cache),
                                generic_order_issued: Definitions.sound(this.cache),
                                generic_attack_order_issued: Definitions.sound(this.cache),
                                generic_joined_fleet: Definitions.sound(this.cache),
                                sell_npc_market_asset: Definitions.sound(this.cache),
                                buy_npc_market_asset: Definitions.sound(this.cache),
                                capital_ship_shields_down: Definitions.sound(this.cache),
                                capital_ship_hull_severely_damaged: Definitions.sound(this.cache),
                                capital_ship_lost: Definitions.sound(this.cache),
                                ally_capital_ship_lost: Definitions.sound(this.cache),
                                titan_shields_down: Definitions.sound(this.cache),
                                titan_hull_severely_damaged: Definitions.sound(this.cache),
                                titan_lost: Definitions.sound(this.cache),
                                ally_titan_lost: Definitions.sound(this.cache),
                                ally_titan_built: Definitions.sound(this.cache),
                                enemy_titan_built: Definitions.sound(this.cache),
                                fleet_under_attack: Definitions.sound(this.cache),
                                destroy_planet_rewards_given: Definitions.sound(this.cache),
                            },
                        }),
                    },
                }),
                ai: object({
                    keys: {
                        names: object({
                            keys: {
                                id_prefix: string(),
                            },
                        }),
                        alliance_offer_decline_reasons: object({
                            keys: {
                                give_away_home_or_last_planet: this.cache.localisation,
                                insufficient_assets: this.cache.localisation,
                                insufficient_exotics: this.cache.localisation,
                                not_allied: this.cache.localisation,
                            },
                        }),
                    },
                }),
                portraits: array({
                    items: this.cache.player_portraits,
                    isUnique: true,
                }),
                icons: array({
                    items: this.cache.player_icons,
                    isUnique: true,
                }),
                planet_elevators: object({
                    keys: {
                        elevator_meshes: array({
                            items: this.cache.meshes,
                            isUnique: true,
                        }),
                        starting_elevator_count: integer(),
                        per_level_elevator_count: float(),
                        explosion_effect: this.cache.particle_effects,
                        explosion_sound: this.cache.ogg,
                        car_count_per_elevator_connection: float(),
                        car_max_travel_time: float(),
                        car_max_travel_time_offset: float(),
                        car_tangent_offset_distance: float(),
                        car_path_count: float(),
                        car_path_min_t_delta: float(),
                        cars_texture_animation: this.cache.texture_animations,
                        car_width: float(),
                        car_height: float(),
                        car_basic_constants: object({
                            required: ['emissive_factor'],
                            keys: {
                                emissive_factor: percentage(),
                            },
                        }),
                    },
                }),
                theme_picker_mesh_preview_units: array({
                    items: this.cache.units,
                    isUnique: true,
                }),
                theme_picker_skybox: this.cache.skyboxes,
            },
        })
    }
}
