const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class PlanetTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    structure_slot() {
        return object({
            keys: {
                civilian: this.cache.localisation,
                military: this.cache.localisation,
            },
        })
    }

    planet_label() {
        return object({
            keys: {
                icon: this.cache.textures,
                max_level_label: this.cache.localisation,
                current_level_label: this.cache.localisation,
            },
        })
    }

    create() {
        return schema({
            keys: {
                shield_points: super.label_form(this.cache),
                planet_level: super.label_form(this.cache),
                health_points: super.label_form(this.cache),
                structure_slot_label_texts: this.structure_slot(),
                future_max_structure_slots_value_color: this.cache.colors,
                max_potential_structure_slot_label_texts: this.structure_slot(),
                component_slots: super.label_form(this.cache),
                max_potential_component_slots: super.label_form(this.cache),
                upgrade_planet_track_level: object({
                    keys: {
                        future_level_line: super.label_form(this.cache),
                        upgrade_progress_line: super.label_form(this.cache),
                        status_color_when_already_max_level: this.cache.colors,
                        base_property_value_color: this.cache.colors,
                        negative_base_property_value_color: this.cache.colors,
                        upgraded_property_value_color: this.cache.colors,
                        max_civilian_slots_label: this.cache.localisation,
                        max_military_slots_label: this.cache.localisation,
                        max_planet_component_slots_label: this.cache.localisation,
                        credit_income_rate_label: this.cache.localisation,
                        metal_income_rate_label: this.cache.localisation,
                        crystal_income_rate_label: this.cache.localisation,
                        max_health_points_label: this.cache.localisation,
                        max_shield_points_label: this.cache.localisation,
                        structure_builder_count_label: this.cache.localisation,
                    },
                }),
                asset_income_rate_tooltips: object({
                    keys: {
                        credits: object({
                            keys: {
                                title_label: this.cache.localisation,
                                total_rate_label: this.cache.localisation,
                                max_potential_rate_label: this.cache.localisation,
                                from_track_label: this.cache.localisation,
                                from_structures_label: this.cache.localisation,
                                from_home_planet_label: this.cache.localisation,
                            },
                        }),
                        metal: object({
                            keys: {
                                title_label: this.cache.localisation,
                                total_rate_label: this.cache.localisation,
                                max_potential_rate_label: this.cache.localisation,
                                from_track_label: this.cache.localisation,
                                from_structures_label: this.cache.localisation,
                                from_asteroids_label: this.cache.localisation,
                                from_home_planet_label: this.cache.localisation,
                            },
                        }),
                        crystal: object({
                            keys: {
                                title_label: this.cache.localisation,
                                total_rate_label: this.cache.localisation,
                                max_potential_rate_label: this.cache.localisation,
                                from_track_label: this.cache.localisation,
                                from_structures_label: this.cache.localisation,
                                from_asteroids_label: this.cache.localisation,
                                from_home_planet_label: this.cache.localisation,
                            },
                        }),
                    },
                }),
                planet_modifier_labels: object({
                    keys: {
                        buffs: this.cache.localisation,
                        structures: this.cache.localisation,
                        items: this.cache.localisation,
                        player: this.cache.localisation,
                        home_planet: this.cache.localisation,
                        culture: this.cache.localisation,
                    },
                }),
                asteroid: object({
                    keys: {
                        extraction_rate_color_with_extractor: this.cache.colors,
                        extraction_rate_color_without_extractor: this.cache.colors,
                    },
                }),
                planet_tracks: object({
                    keys: {
                        defense: this.planet_label(),
                        logistics: this.planet_label(),
                        commerce: this.planet_label(),
                        mining: this.planet_label(),
                        excavation: this.planet_label(),
                    },
                }),
                planet_track_current_level_value_when_max_color: this.cache.colors,
                planet_track_current_level_value_when_not_max_color: this.cache.colors,
                maintenance_costs_label: this.cache.localisation,
                maintenance_costs_planet_level_column_header: this.cache.localisation,
                maintenance_costs_rate_column_header: this.cache.localisation,
                maintenance_costs_rate_column_offset: integer(),
                maintenance_costs_current_level_icon: string(),
                maintenance_costs_planet_level_color: this.cache.colors,
                maintenance_costs_planet_level_color_when_inactive: this.cache.colors,
                maintenance_costs_rate_color: this.cache.colors,
                maintenance_costs_rate_color_when_inactive: this.cache.colors,
                maintenance_costs_rate_postfix_color: this.cache.colors,
                maintenance_costs_rate_postfix_color_when_inactive: this.cache.colors,
                asteroid_count_when_not_max_color: this.cache.colors,
                asteroid_count_when_max_color: this.cache.colors,
                item_count_value_color: this.cache.colors,
                max_potential_sub_header_text: this.cache.localisation,
                metal_asteroid_counts_label_text: this.cache.localisation,
                crystal_asteroid_counts_label_text: this.cache.localisation,
                upgrade_duration_line: super.label_form(this.cache),
                upgrade_excavation_track_reward_chances_header_label: this.cache.localisation,
                upgrade_excavation_track_reward_chance_color: this.cache.colors,
                upgrade_excavation_track_reward_assets_label: this.cache.localisation,
                upgrade_excavation_track_reward_unit_items_label: this.cache.localisation,
                planet_track_mutation_current_level_color: this.cache.colors,
                planet_track_mutation_future_level_color: this.cache.colors,
                destroyed_planet_description: super.label_form2(this.cache),
                home_planet_income_rate_labels: object({
                    keys: {
                        credits: this.cache.localisation,
                        metal: this.cache.localisation,
                        crystal: this.cache.localisation,
                    },
                }),
                last_detected_description: super.label_form2(this.cache),
                garrison_behavior_label_text: this.cache.localisation,
                garrison_behavior_names: object({
                    keys: {
                        hold: this.cache.localisation,
                        roam_defensive: this.cache.localisation,
                        roam_offensive: this.cache.localisation,
                    },
                }),
                garrison_behavior_descriptions: object({
                    keys: {
                        hold: super.label_form2(this.cache),
                        roam_defensive: super.label_form2(this.cache),
                        roam_offensive: super.label_form2(this.cache),
                    },
                }),
                buildable_planet_components_header_line: super.label_form(this.cache),
                buildable_item_color: this.cache.colors,
                buildable_item_when_need_research_color: this.cache.colors,
            },
        })
    }
}
