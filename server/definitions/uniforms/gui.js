const { schema, object, string, float, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class GuiUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    unitAttributeColors() {
        return object({
            keys: {
                low: this.cache.colors,
                medium: this.cache.colors,
                high: this.cache.colors,
            },
        })
    }

    asset_types() {
        return object({
            keys: {
                name: this.cache.localisation,
                hud_icon: this.cache.textures,
                tooltip_icon: this.cache.textures,
                main_view_overlay_icon: this.cache.textures,
                value_colors: object({
                    keys: {
                        none: this.cache.colors,
                        insufficient: this.cache.colors,
                        refund: this.cache.colors,
                        gift: this.cache.colors,
                        offer: this.cache.colors,
                    },
                }),
                positive_rate_min_color: this.cache.colors,
                positive_rate_max_color: this.cache.colors,
                positive_rate_max_value: float(),
                negative_rate_min_color: this.cache.colors,
                negative_rate_max_color: this.cache.colors,
                negative_rate_max_value: float(),
            },
        })
    }

    create() {
        return schema({
            keys: {
                modifier: object({
                    keys: {
                        unit_modifier_names: object({
                            keys: {
                                ability_cooldown_duration: this.cache.localisation,
                                ability_antimatter_cost: this.cache.localisation,
                                ability_hull_cost: this.cache.localisation,
                                ability_armor_cost: this.cache.localisation,
                                ability_shields_cost: this.cache.localisation,
                                ability_range: this.cache.localisation,
                                max_antimatter: this.cache.localisation,
                                antimatter_restore_rate: this.cache.localisation,
                                max_linear_speed: this.cache.localisation,
                                max_linear_acceleration: this.cache.localisation,
                                max_angular_speed: this.cache.localisation,
                                hyperspace_charge_time: this.cache.localisation,
                                hyperspace_speed: this.cache.localisation,
                                max_hull_points: this.cache.localisation,
                                hull_crippled_percentage: this.cache.localisation,
                                hull_point_restore_rate: this.cache.localisation,
                                hull_point_restore_cooldown_duration_after_damage_taken: this.cache.localisation,
                                max_armor_points: this.cache.localisation,
                                armor_point_restore_rate: this.cache.localisation,
                                armor_point_restore_cooldown_duration_after_damage_taken: this.cache.localisation,
                                armor_strength: this.cache.localisation,
                                max_shield_points: this.cache.localisation,
                                shield_point_restore_rate: this.cache.localisation,
                                shield_point_restore_cooldown_duration_after_damage_taken: this.cache.localisation,
                                shield_burst_restore_points: this.cache.localisation,
                                shield_burst_restore_cooldown_duration: this.cache.localisation,
                                damage_taken: this.cache.localisation,
                                experience_gained_from_unit_death: this.cache.localisation,
                                experience_gained_from_planet_bombing: this.cache.localisation,
                                experience_gained_from_loot_collection: this.cache.localisation,
                                experience_given_on_death: this.cache.localisation,
                                max_squadron_capacity: this.cache.localisation,
                                strikecraft_build_time: this.cache.localisation,
                                credit_income_rate: this.cache.localisation,
                                metal_income_rate: this.cache.localisation,
                                crystal_income_rate: this.cache.localisation,
                                civilian_research_points: this.cache.localisation,
                                military_research_points: this.cache.localisation,
                                culture_rate: this.cache.localisation,
                                culture_resistance_rate: this.cache.localisation,
                                ship_component_price: this.cache.localisation,
                                self_build_time: this.cache.localisation,
                                spell_power: this.cache.localisation,
                                unity: this.cache.localisation,
                                trade_import_points: this.cache.localisation,
                                trade_export_credits_points: this.cache.localisation,
                                trade_export_metal_points: this.cache.localisation,
                                trade_export_crystal_points: this.cache.localisation,
                                loot_collection_duration: this.cache.localisation,
                                phase_resonance_bonus_duration: this.cache.localisation,
                            },
                        }),
                        planet_modifier_names: object({
                            keys: {
                                max_civilian_structure_slots: this.cache.localisation,
                                max_military_structure_slots: this.cache.localisation,
                                commerce_track_credit_income_rate: this.cache.localisation,
                                mining_track_metal_income_rate: this.cache.localisation,
                                mining_track_crystal_income_rate: this.cache.localisation,
                                orbital_extraction_metal_income_rate: this.cache.localisation,
                                orbital_extraction_crystal_income_rate: this.cache.localisation,
                                civilian_research_points: this.cache.localisation,
                                military_research_points: this.cache.localisation,
                                research_rate: this.cache.localisation,
                                culture_rate: this.cache.localisation,
                                culture_resistance_rate: this.cache.localisation,
                                max_health_points: this.cache.localisation,
                                health_points_restore_rate: this.cache.localisation,
                                research_time: this.cache.localisation,
                                max_shield_points: this.cache.localisation,
                                shield_points_restore_rate: this.cache.localisation,
                                factory_unit_build_price: this.cache.localisation,
                                factory_unit_build_time: this.cache.localisation,
                                factory_exotic_build_time: this.cache.localisation,
                                any_development_track_build_price: this.cache.localisation,
                                any_development_track_build_time: this.cache.localisation,
                                defense_track_build_price: this.cache.localisation,
                                defense_track_build_time: this.cache.localisation,
                                logistics_track_build_price: this.cache.localisation,
                                logistics_track_build_time: this.cache.localisation,
                                commerce_track_build_price: this.cache.localisation,
                                commerce_track_build_time: this.cache.localisation,
                                mining_track_build_price: this.cache.localisation,
                                mining_track_build_time: this.cache.localisation,
                                civilian_research_track_build_price: this.cache.localisation,
                                civilian_research_track_build_time: this.cache.localisation,
                                military_research_track_build_price: this.cache.localisation,
                                military_research_track_build_time: this.cache.localisation,
                                excavation_track_build_price: this.cache.localisation,
                                excavation_track_build_time: this.cache.localisation,
                                structure_build_price: this.cache.localisation,
                                structure_build_time: this.cache.localisation,
                                gravity_well_radius: this.cache.localisation,
                                structure_builder_count: this.cache.localisation,
                                max_garrison_supply: this.cache.localisation,
                                bombing_damage_taken: this.cache.localisation,
                                planet_component_price: this.cache.localisation,
                                max_planet_component_slots: this.cache.localisation,
                                max_influence_points: this.cache.localisation,
                            },
                        }),
                        weapon_modifier_names: object({
                            keys: {
                                normal: object({
                                    keys: {
                                        damage: this.cache.localisation,
                                        cooldown_duration: this.cache.localisation,
                                        range: this.cache.localisation,
                                        tracking_speed: this.cache.localisation,
                                        bypass_shields_chance: this.cache.localisation,
                                    },
                                }),
                                planet_bombing: object({
                                    keys: {
                                        damage: this.cache.localisation,
                                        cooldown_duration: this.cache.localisation,
                                        range: this.cache.localisation,
                                        tracking_speed: this.cache.localisation,
                                        bypass_shields_chance: this.cache.localisation,
                                    },
                                }),
                            },
                        }),
                        unit_factory_modifier_names: object({
                            keys: {
                                build_time: this.cache.localisation,
                            },
                        }),
                        exotic_factory_modifier_names: object({
                            keys: {
                                build_time: this.cache.localisation,
                            },
                        }),
                        strikecraft_modifier_names: object({
                            keys: {
                                squadron_size: this.cache.localisation,
                            },
                        }),
                        npc_modifier_names: object({
                            keys: {
                                buy_metal_credits_cost: this.cache.localisation,
                                sell_metal_credits_received: this.cache.localisation,
                                buy_crystal_credits_cost: this.cache.localisation,
                                sell_crystal_credits_received: this.cache.localisation,
                                sell_exotic_credits_received: this.cache.localisation,
                                send_raid_supply: this.cache.localisation,
                                auction_bid_any: this.cache.localisation,
                                auction_bid_credits: this.cache.localisation,
                                auction_bid_metal: this.cache.localisation,
                                auction_bid_crystal: this.cache.localisation,
                                auction_lost_refund_percentage: this.cache.localisation,
                                reputation_ability_cooldown_duration: this.cache.localisation,
                                auction_bid_bonus_influence_points: this.cache.localisation,
                            },
                        }),
                        empire_modifier_names: object({
                            keys: {
                                credit_income_rate: this.cache.localisation,
                                metal_income_rate: this.cache.localisation,
                                crystal_income_rate: this.cache.localisation,
                                percentage_of_other_players_total_credit_income: this.cache.localisation,
                                build_exotic_price: this.cache.localisation,
                                research_rate: this.cache.localisation,
                                bounty_increase: this.cache.localisation,
                                bounty_decrease_markup: this.cache.localisation,
                                research_time: this.cache.localisation,
                                trade_credits_income_rate: this.cache.localisation,
                                trade_metal_income_rate: this.cache.localisation,
                                trade_crystal_income_rate: this.cache.localisation,
                                npc_reputation_rate_from_dominant_culture: this.cache.localisation,
                                max_influence_points: this.cache.localisation,
                                influence_points_recharge_rate: this.cache.localisation,
                            },
                        }),
                    },
                }),
                hud_unit_icon: object({
                    keys: {
                        home_planet_overlay: this.cache.textures,
                        has_artifact_overlay: this.cache.textures,
                        unit_level_font: this.cache.fonts,
                        unit_level_layout: super.layout(),
                        unit_level_color: this.cache.colors,
                        planet_level_font: this.cache.fonts,
                        planet_level_layout: super.layout(),
                        planet_level_color: this.cache.colors,
                        has_unspent_ability_points_icon: this.cache.textures,
                        has_unspent_ability_points_layout: super.layout(),
                        has_planet_maintenance_costs_icon: this.cache.textures,
                        has_planet_maintenance_costs_layout: super.layout(),
                        special_operation_unit_icons: object({
                            keys: {
                                garrison: this.cache.textures,
                                insurgent: this.cache.textures,
                                dark_fleet: this.cache.textures,
                            },
                        }),
                        special_operation_unit_icon_layout: super.layout(),
                        metal_asteroid_hud_icon: this.cache.textures,
                        crystal_asteroid_hud_icon: this.cache.textures,
                    },
                }),
                asset: object({
                    keys: {
                        asset_types: object({
                            keys: {
                                credits: this.asset_types(),
                                metal: this.asset_types(),
                                crystal: this.asset_types(),
                            },
                        }),
                    },
                }),
                unit_attribute: object({
                    keys: {
                        colors: object({
                            keys: {
                                hull_points: this.unitAttributeColors(),
                                crippled_hull_points: this.unitAttributeColors(),
                                armor_points: this.unitAttributeColors(),
                                shield_points: this.unitAttributeColors(),
                                antimatter: this.unitAttributeColors(),
                                planet_health_points: this.unitAttributeColors(),
                                planet_shield_points: this.unitAttributeColors(),
                                build_progress: this.unitAttributeColors(),
                                scuttle_progress: this.unitAttributeColors(),
                            },
                        }),
                    },
                }),
                query_status: object({
                    keys: {
                        insufficient_research_points_message_format: this.cache.localisation,
                        insufficient_research_tier_message_format: this.cache.localisation,
                        insufficient_exotics_message_format: this.cache.localisation,
                        missing_weapon_constraint_message_prefix: this.cache.localisation,
                        missing_weapon_constraint_message_suffix: this.cache.localisation,
                        unmet_is_carrier_constraint_message: this.cache.localisation,
                        unmet_is_in_own_dominant_culture_constraint_message: this.cache.localisation,
                        unmet_is_in_ally_dominant_culture_constraint_message: this.cache.localisation,
                        unmet_is_in_enemy_dominant_culture_constraint_message: this.cache.localisation,
                        unmet_is_in_any_dominant_culture_constraint_message: this.cache.localisation,
                        messages: object({
                            keys: {
                                insufficient_credits: this.cache.localisation,
                                insufficient_metal: this.cache.localisation,
                                insufficient_crystal: this.cache.localisation,
                                insufficient_exotics: this.cache.localisation,
                                insufficient_civilian_structure_slots: this.cache.localisation,
                                insufficient_military_structure_slots: this.cache.localisation,
                                insufficient_unit_supply: this.cache.localisation,
                                insufficient_antimatter: this.cache.localisation,
                                insufficient_hull: this.cache.localisation,
                                insufficient_shields: this.cache.localisation,
                                insufficient_planet_health: this.cache.localisation,
                                insufficient_squadron_capacity: this.cache.localisation,
                                insufficient_used_trade_export_points: this.cache.localisation,
                                insufficient_unused_trade_import_points: this.cache.localisation,
                                insufficient_unused_trade_export_points: this.cache.localisation,
                                global_unit_limit_exceeded: this.cache.localisation,
                                star_unit_limit_exceeded: this.cache.localisation,
                                planet_unit_limit_exceeded: this.cache.localisation,
                                gravity_well_unit_limit_exceeded: this.cache.localisation,
                                research_prerequisites_not_met: this.cache.localisation,
                                planet_is_already_a_home_planet: this.cache.localisation,
                                planet_track_level_is_already_max: this.cache.localisation,
                                planet_track_is_not_upgrading: this.cache.localisation,
                                planet_was_recently_bombed: this.cache.localisation,
                                planet_is_not_building_structure: this.cache.localisation,
                                home_planet_cannot_be_changed_due_to_victory_condition: this.cache.localisation,
                                position_is_not_within_gravity_well: this.cache.localisation,
                                position_is_not_within_structure_build_distance: this.cache.localisation,
                                position_has_overlapped_unit: this.cache.localisation,
                                no_free_asteroid: this.cache.localisation,
                                structure_requires_phase_resonance_synchronizer_capacity: this.cache.localisation,
                                structure_requires_planet_trade_capacity: this.cache.localisation,
                                structure_requires_research_points: this.cache.localisation,
                                structure_requires_higher_planet_track_level: this.cache.localisation,
                                structure_will_never_fit_in_build_radius: this.cache.localisation,
                                unit_is_not_owned_by_player: this.cache.localisation,
                                unit_is_not_operational: this.cache.localisation,
                                unit_is_crippled: this.cache.localisation,
                                special_operation_unit_cannot_move_too_far: this.cache.localisation,
                                special_operation_unit_cannot_move_out_of_gravity_well: this.cache.localisation,
                                unit_has_no_weapons: this.cache.localisation,
                                unit_cannot_move: this.cache.localisation,
                                unit_cannot_hyperspace: this.cache.localisation,
                                garrison_unit_cannot_move_too_far: this.cache.localisation,
                                insurgent_unit_cannot_move_too_far: this.cache.localisation,
                                dark_fleet_unit_cannot_move_too_far: this.cache.localisation,
                                structure_builder_unit_cannot_move_too_far: this.cache.localisation,
                                unit_has_no_path_to_destination: this.cache.localisation,
                                unit_has_no_path_to_destination_due_to_gravity_well_unit_limit: this.cache.localisation,
                                target_is_not_detected: this.cache.localisation,
                                target_is_out_of_range_and_targetter_cannot_move: this.cache.localisation,
                                target_is_out_of_range_and_targetter_has_no_path: this.cache.localisation,
                                target_is_out_of_jump_count_range: this.cache.localisation,
                                target_is_out_of_gravity_well_range: this.cache.localisation,
                                target_cannot_be_damaged: this.cache.localisation,
                                target_alliance_relationship_is_not_enemy: this.cache.localisation,
                                target_has_no_matching_unit_type: this.cache.localisation,
                                target_has_no_matching_unit_definition: this.cache.localisation,
                                target_has_no_matching_ownerships: this.cache.localisation,
                                target_has_failed_stateless_constraint: this.cache.localisation,
                                target_has_failed_stateful_constraint: this.cache.localisation,
                                target_cannot_be_targeted_by_enemies: this.cache.localisation,
                                target_cannot_be_targeted_by_allies: this.cache.localisation,
                                target_is_dead: this.cache.localisation,
                                target_is_unbuilt: this.cache.localisation,
                                target_is_fully_unbuilt: this.cache.localisation,
                                target_is_not_explored: this.cache.localisation,
                                target_is_in_phase_space: this.cache.localisation,
                                target_destination_is_not_within_gravity_well: this.cache.localisation,
                                target_is_not_a_planet: this.cache.localisation,
                                target_is_required: this.cache.localisation,
                                target_already_colonized: this.cache.localisation,
                                target_can_never_be_colonized: this.cache.localisation,
                                target_direction_not_valid: this.cache.localisation,
                                target_can_never_have_bounty: this.cache.localisation,
                                target_has_no_bounty_credits: this.cache.localisation,
                                unit_factory_does_not_exist: this.cache.localisation,
                                unit_factory_does_not_support_build_kind: this.cache.localisation,
                                unit_factory_is_not_functional: this.cache.localisation,
                                unit_factory_is_not_building_unit: this.cache.localisation,
                                exotic_factory_does_not_exist: this.cache.localisation,
                                exotic_factory_does_not_support_exotic_type: this.cache.localisation,
                                exotic_factory_is_not_functional: this.cache.localisation,
                                exotic_factory_is_not_building_exotic: this.cache.localisation,
                                ability_level_is_not_valid: this.cache.localisation,
                                ability_source_item_unknown: this.cache.localisation,
                                ability_source_item_unbuilt: this.cache.localisation,
                                ability_source_item_slot_unbuilt: this.cache.localisation,
                                ability_construction_not_finished: this.cache.localisation,
                                ability_action_constraint_is_not_satisfied: this.cache.localisation,
                                ability_is_already_in_use: this.cache.localisation,
                                ability_cooldown_is_not_completed: this.cache.localisation,
                                ability_does_not_have_required_charge: this.cache.localisation,
                                ability_is_disabled: this.cache.localisation,
                                ability_is_missing_required_structure: this.cache.localisation,
                                ability_is_missing_required_available_supply: this.cache.localisation,
                                ability_is_missing_envoy: this.cache.localisation,
                                ability_is_npc_player_dead: this.cache.localisation,
                                ability_auto_cast_target_action_constraint_satisfied: this.cache.localisation,
                                increase_ability_level_ability_not_owned_by_player: this.cache.localisation,
                                increase_ability_level_does_not_have_internal_level_source: this.cache.localisation,
                                increase_ability_level_already_max_level: this.cache.localisation,
                                increase_ability_level_owner_has_no_levels: this.cache.localisation,
                                increase_ability_level_owner_not_high_enough_level: this.cache.localisation,
                                increase_ability_level_owner_has_no_available_ability_points: this.cache.localisation,
                                npc_reward_is_required_target_missing: this.cache.localisation,
                                npc_reward_ability_is_not_valid: this.cache.localisation,
                                npc_reward_market_is_already_exclusive: this.cache.localisation,
                                research_subject_not_owned: this.cache.localisation,
                                player_lost: this.cache.localisation,
                                npc_is_dead: this.cache.localisation,
                                research_subject_already_researching: this.cache.localisation,
                                research_subject_already_completed: this.cache.localisation,
                                research_subject_not_researching: this.cache.localisation,
                                research_subject_required_allied_player_race_missing: this.cache.localisation,
                                carrier_slot_index_is_invalid: this.cache.localisation,
                                carrier_slot_is_already_empty: this.cache.localisation,
                                colonization_is_disabled: this.cache.localisation,
                                other_item_requirements_needed_item_missing: this.cache.localisation,
                                other_item_requirements_mutually_exclusive_item_already_exists: this.cache.localisation,
                                purchase_item_buying_player_is_not_planet_owner: this.cache.localisation,
                                purchase_item_buying_player_is_not_ship_owner: this.cache.localisation,
                                purchase_item_not_in_player_inventory: this.cache.localisation,
                                purchase_item_no_ship_component_slot_available: this.cache.localisation,
                                purchase_item_no_planet_component_slot_available: this.cache.localisation,
                                purchase_item_finite_item_and_none_in_inventory: this.cache.localisation,
                                purchase_item_planet_type_is_never_valid: this.cache.localisation,
                                purchase_item_planet_not_at_required_level: this.cache.localisation,
                                purchase_item_owner_constraint_not_satisfied: this.cache.localisation,
                                purchase_item_unit_missing_required_tag: this.cache.localisation,
                                purchase_item_unit_is_not_fully_built: this.cache.localisation,
                                purchase_item_missing_required_trade_port_structure: this.cache.localisation,
                                purchase_item_unit_has_max_count_on_unit_already: this.cache.localisation,
                                remove_item_not_owned_by_unit: this.cache.localisation,
                                remove_item_ability_being_used: this.cache.localisation,
                                remove_item_civilian_structure_slots_being_used: this.cache.localisation,
                                remove_item_military_structure_slots_being_used: this.cache.localisation,
                                remove_item_is_other_item_requirement: this.cache.localisation,
                                alliance_cannot_be_broken_when_not_allied: this.cache.localisation,
                                alliance_cannot_be_broken_when_permanently_allied: this.cache.localisation,
                                alliance_cannot_be_broken_when_locked: this.cache.localisation,
                                alliance_offer_player_lost: this.cache.localisation,
                                alliance_offer_has_unowned_planet: this.cache.localisation,
                                alliance_offer_has_unconfirmed_planet: this.cache.localisation,
                                alliance_offer_version_mismatch: this.cache.localisation,
                                alliance_offer_expired: this.cache.localisation,
                                alliance_offer_planet_not_a_planet: this.cache.localisation,
                                alliance_offer_planet_never_detected: this.cache.localisation,
                                alliance_offer_planet_not_owned_by_player: this.cache.localisation,
                                npc_market_is_dead: this.cache.localisation,
                                npc_market_requires_alliance: this.cache.localisation,
                                npc_market_does_not_match_exclusive_player: this.cache.localisation,
                                npc_market_is_not_discovered: this.cache.localisation,
                                npc_market_does_not_want_exotic: this.cache.localisation,
                                insufficient_player_phase_resonance_points: this.cache.localisation,
                                no_unit_can_join_fleet: this.cache.localisation,
                                npc_is_already_revealed: this.cache.localisation,
                                npc_alliance_broken: this.cache.localisation,
                                npc_reputatation_level_is_not_valid: this.cache.localisation,
                                npc_reputatation_level_is_at_max_level: this.cache.localisation,
                                npc_reputation_reward_cooldown_is_not_completed: this.cache.localisation,
                                insufficient_influence_points: this.cache.localisation,
                            },
                        }),
                        icons: object({
                            keys: {
                                research_prerequisites_not_met: this.cache.textures,
                                insufficient_civilian_structure_slots: this.cache.textures,
                                insufficient_military_structure_slots: this.cache.textures,
                                insufficient_credits: this.cache.textures,
                                insufficient_metal: this.cache.textures,
                                insufficient_crystal: this.cache.textures,
                                insufficient_antimatter: this.cache.textures,
                                insufficient_military_research_tier: this.cache.textures,
                                insufficient_civilian_research_tier: this.cache.textures,
                                research_rate: this.cache.textures,
                                insufficient_military_research_points: this.cache.textures,
                                insufficient_civilian_research_points: this.cache.textures,
                                insufficient_unit_supply: this.cache.textures,
                                exotic_factory_does_not_exist: this.cache.textures,
                                unit_factory_is_not_functional: this.cache.textures,
                                purchase_item_no_ship_component_slot_available: this.cache.textures,
                                purchase_item_no_planet_component_slot_available: this.cache.textures,
                            },
                        }),
                        default_not_ok_icon: this.cache.textures,
                    },
                }),
                structure_slot_tooltip_icons: object({
                    keys: {
                        civilian: this.cache.textures,
                        military: this.cache.textures,
                    },
                }),
                structure_builder_tooltip_icon: this.cache.textures,
                home_planet_tooltip_icon: this.cache.textures,
                planet_component_items_tooltip_icon: this.cache.textures,
                target_filter_unit_type_names: object({
                    keys: {
                        strikecraft: this.cache.localisation,
                        corvette: this.cache.localisation,
                        frigate: this.cache.localisation,
                        capital_ship: this.cache.localisation,
                        titan: this.cache.localisation,
                        structure: this.cache.localisation,
                        starbase: this.cache.localisation,
                    },
                }),
                hud_empire_units_window: object({
                    keys: {
                        capital_ship_view_tags: array({
                            items: this.cache.ship_tags,
                            isUnique: true,
                        }),
                        starbase_view_tags: array({
                            items: this.cache.ship_tags,
                            isUnique: true,
                        }),
                    },
                }),
                ping_icons: object({
                    keys: {
                        attention: this.cache.textures,
                        attack: this.cache.textures,
                        defend: this.cache.textures,
                    },
                }),
                ping_tooltip_icons: object({
                    keys: {
                        attention: this.cache.textures,
                        attack: this.cache.textures,
                        defend: this.cache.textures,
                    },
                }),
                special_operation_unit_names: object({
                    keys: {
                        garrison: this.cache.localisation,
                        insurgent: this.cache.localisation,
                        dark_fleet: this.cache.localisation,
                    },
                }),
                simulation_float_option_scalar_value_color: this.cache.colors,
            },
        })
    }
}
