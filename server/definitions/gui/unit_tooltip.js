const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class UnitTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    never_detected_gravity_well() {
        return object({
            keys: {
                title_icon: this.cache.textures,
                small_icon: this.cache.textures,
                title_text: this.cache.localisation,
                title_color: this.cache.colors,
                description_text: this.cache.localisation,
                description_color: this.cache.colors,
            },
        })
    }

    create() {
        return schema({
            keys: {
                unit_name_color: this.cache.colors,
                unit_type_name_color: this.cache.colors,
                unit_level_color: this.cache.colors,
                never_detected_gravity_well: this.never_detected_gravity_well(),
                supply_cost_when_has_available_supply: super.label_form(this.cache),
                supply_cost_when_not_has_available_supply: super.label_form(this.cache),
                build_time: super.label_form(this.cache),
                simulation_unit_build_rate_scalar_line: super.label_form(this.cache),
                durability: super.label_form(this.cache),
                durability_description: super.label_form2(this.cache),
                hull_points: super.label_form(this.cache),
                crippled_hull_points: super.label_form(this.cache),
                hull_passive_regeneration: super.label_form(this.cache),
                armor_points: super.label_form(this.cache),
                armor_passive_regeneration: super.label_form(this.cache),
                armor_strength: super.label_form(this.cache),
                shield_points: super.label_form(this.cache),
                shield_passive_regeneration: super.label_form(this.cache),
                antimatter: super.label_form(this.cache),
                antimatter_passive_regeneration: super.label_form(this.cache),
                unity: super.label_form(this.cache),
                experience: super.label_form(this.cache),
                build_progress: super.label_form(this.cache),
                carrier_slot: super.label_form(this.cache),
                unit_kills: super.label_form(this.cache),
                factory_deliverable_line: super.label_form(this.cache),
                provide_research_line: super.label_form(this.cache),
                loot_assets_label: this.cache.localisation,
                loot_exotics_label: this.cache.localisation,
                loot_description: this.cache.localisation,
                loot_experience_given_line: super.label_form(this.cache),
                potential_loot_collectors_header_line: super.label_form(this.cache),
                potential_loot_collector_line: super.label_form(this.cache),
                loot_collection_time_remaining_line: super.label_form(this.cache),
                loot_collection_total_duration_line: super.label_form(this.cache),
                factory_deliverable_count_line: super.label_form(this.cache),
                auto_cast_instead_of_rally_when_built_description: this.cache.localisation,
                waiting_for_factory_to_be_built_line: super.label_form(this.cache),
                waiting_for_planet_structure_plate_spin_change_to_finish_line: super.label_form(this.cache),
                waiting_for_supply_line: super.label_form(this.cache),
                max_buffs: integer(),
                garrison_unit_line: super.label_form(this.cache),
                garrison_unit_description: super.label_form2(this.cache),
                local_garrison_unit_line: super.label_form(this.cache),
                local_garrison_unit_description: super.label_form2(this.cache),
                insurgent_unit_line: super.label_form(this.cache),
                insurgent_unit_description: super.label_form2(this.cache),
                dark_fleet_unit_line: super.label_form(this.cache),
                dark_fleet_unit_description: super.label_form2(this.cache),
                trade_escort_unit_description: super.label_form2(this.cache),
                asteroid_extraction_rate_line: super.label_form(this.cache),
                unit_limits_scope_labels: object({
                    keys: {
                        global: this.cache.localisation,
                        star: this.cache.localisation,
                        planet: this.cache.localisation,
                    },
                }),
                unit_limits_tag_color: this.cache.colors,
                unit_limits_value_color: this.cache.colors,
                unit_limits_value_color_when_will_exceed: this.cache.colors,
                bounty_available_icon: this.cache.textures,
                bounty_available_label: this.cache.localisation,
                bounty_description: super.label_form2(this.cache),
                unit_factory_build_rate_scalar: super.label_form(this.cache),
                is_ship_component_shop_line: super.label_form(this.cache),
                is_ship_component_shop_line_with_research: super.label_form(this.cache),
                gravity_well_self_build_time_label: this.cache.localisation,
                unit_factory_preview_header_line: super.label_form(this.cache),
                exotic_factory_preview_header_line: super.label_form(this.cache),
                buildable_unit_color: this.cache.colors,
                buildable_unit_when_need_research_color: this.cache.colors,
                planet_scuttle_time_remaining_line: super.label_form(this.cache),
                max_squadron_capacity_label: super.label_form(this.cache),
                trade_ship_death_assets_line: super.label_form(this.cache),
                unit_analysis_scope_icons: object({
                    keys: {
                        weapons: this.cache.textures,
                        defense: this.cache.textures,
                        abilities: this.cache.textures,
                    },
                }),
                unit_analysis_scope_names: object({
                    keys: {
                        weapons: this.cache.textures,
                        defense: this.cache.textures,
                        abilities: this.cache.textures,
                    },
                }),
                owner_fleet_line: super.label_form(this.cache),
                rally_point_line: super.label_form(this.cache),
                order_text_color: this.cache.colors,
                order_move_to_gravity_well_text: this.cache.localisation,
                order_move_to_position_in_gravity_well_text: this.cache.localisation,
                order_follow_unit_text: this.cache.localisation,
                order_move_to_unit_text: this.cache.localisation,
                order_rotate_text: this.cache.localisation,
                order_explore_text: this.cache.localisation,
                order_attack_unit_text: this.cache.localisation,
                order_use_ability_text: this.cache.localisation,
                order_use_ability_on_target_seperator: this.cache.localisation,
                order_retreat_text: this.cache.localisation,
                restore_rate_enabled_color: this.cache.colors,
                restore_rate_disabled_color: this.cache.colors,
                unmodified_value_color: this.cache.colors,
                improved_value_color: this.cache.colors,
                degraded_value_color: this.cache.colors,
                fleet_factory_to_build_unit_line: super.label_form(this.cache),
                show_advanced_tooltips_line: super.label_form(this.cache),
                max_speed: super.label_form(this.cache),
                is_ruler_ship_label: super.label_form2(this.cache),
                is_ruler_ship_description: super.label_form2(this.cache),
                shield_burst_restore_cooldown_time_remaining_line: super.label_form(this.cache),
                shield_burst_restore_points_line: super.label_form(this.cache),
            },
        })
    }
}
