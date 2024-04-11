const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

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
                supply_cost_when_has_available_supply: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                supply_cost_when_not_has_available_supply: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                build_time: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                simulation_unit_build_rate_scalar_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                durability: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                durability_description: super.label_form2(this.cache.localisation, this.cache.colors),
                hull_points: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                crippled_hull_points: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                hull_passive_regeneration: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                armor_points: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                armor_passive_regeneration: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                armor_strength: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                shield_points: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                shield_passive_regeneration: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                antimatter: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                antimatter_passive_regeneration: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                unity: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                experience: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                build_progress: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                carrier_slot: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                unit_kills: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                factory_deliverable_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                provide_research_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                loot_assets_label: this.cache.localisation,
                loot_exotics_label: this.cache.localisation,
                loot_description: this.cache.localisation,
                loot_experience_given_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                potential_loot_collectors_header_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                potential_loot_collector_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                loot_collection_time_remaining_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                loot_collection_total_duration_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                factory_deliverable_count_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                auto_cast_instead_of_rally_when_built_description: this.cache.localisation,
                waiting_for_factory_to_be_built_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                waiting_for_planet_structure_plate_spin_change_to_finish_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                waiting_for_supply_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                max_buffs: integer(),
                garrison_unit_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                garrison_unit_description: super.label_form2(this.cache.localisation, this.cache.colors),
                local_garrison_unit_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                local_garrison_unit_description: super.label_form2(this.cache.localisation, this.cache.colors),
                insurgent_unit_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                insurgent_unit_description: super.label_form2(this.cache.localisation, this.cache.colors),
                dark_fleet_unit_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                dark_fleet_unit_description: super.label_form2(this.cache.localisation, this.cache.colors),
                trade_escort_unit_description: super.label_form2(this.cache.localisation, this.cache.colors),
                asteroid_extraction_rate_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
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
                bounty_description: super.label_form2(this.cache.localisation, this.cache.colors),
                unit_factory_build_rate_scalar: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                is_ship_component_shop_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                is_ship_component_shop_line_with_research: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                gravity_well_self_build_time_label: this.cache.localisation,
                unit_factory_preview_header_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                exotic_factory_preview_header_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                buildable_unit_color: this.cache.colors,
                buildable_unit_when_need_research_color: this.cache.colors,
                planet_scuttle_time_remaining_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                max_squadron_capacity_label: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                trade_ship_death_assets_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
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
                owner_fleet_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                rally_point_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
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
                fleet_factory_to_build_unit_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                show_advanced_tooltips_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                max_speed: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                is_ruler_ship_label: super.label_form2(this.cache.localisation, this.cache.colors),
                is_ruler_ship_description: super.label_form2(this.cache.localisation, this.cache.colors),
                shield_burst_restore_cooldown_time_remaining_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                shield_burst_restore_points_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
            },
        })
    }
}
