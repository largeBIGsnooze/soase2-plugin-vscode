const { schema, string, object, integer, vector2 } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class ResearchTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    research_prerequisites() {
        return object({
            keys: {
                line_begin_text: this.cache.localisation,
                set_separator_text: this.cache.localisation,
                completed_prerequisite_color: this.cache.colors,
                uncompleted_prerequisite_color: this.cache.colors,
                other_sets_completed_prerequisite_color: this.cache.colors,
                are_research_prerequisites_met_in_future_icon: string(),
            },
        })
    }

    create() {
        return schema({
            keys: {
                title_picture_size: vector2(),
                title_picture_margins: super.margins(),
                acquire_tier_research_points_color_when_sufficient: this.cache.colors,
                acquire_tier_research_points_color_when_insufficient: this.cache.colors,
                acquire_tier_current_points_column_header: this.cache.localisation,
                acquire_tier_required_points_colum_header: this.cache.localisation,
                acquire_tier_required_points_colum_offset: integer(),
                acquire_tier_time: super.label_form(this.cache),
                acquired_tier_label: super.label_form2(this.cache),
                acquiring_tier_percentage: super.label_form(this.cache),
                research_time: super.label_form(this.cache),
                researching_percentage: super.label_form(this.cache),
                research_completed: super.label_form(this.cache),
                colonize_planet_type_postfix: this.cache.localisation,
                colonize_planet_type_color: this.cache.colors,
                unlocked_structures_header_label: this.cache.localisation,
                unlocked_ships_header_label: this.cache.localisation,
                unlocked_unit_name_color: this.cache.colors,
                unlocked_unit_item_prefix: this.cache.localisation,
                improved_unit_item_prefix: this.cache.localisation,
                unlocked_unit_item_name_color: this.cache.colors,
                unlocked_unit_item_type_color: this.cache.colors,
                modified_units_header: super.label_form(this.cache),
                required_research_tier_label_prefix: this.cache.localisation,
                required_research_tier_value_color_when_satisified: this.cache.colors,
                required_research_tier_value_color_when_not_satisified: this.cache.colors,
                required_allied_player_race_label_text: this.cache.localisation,
                required_allied_player_race_value_color_when_missing: this.cache.colors,
                required_allied_player_race_value_color_when_not_missing: this.cache.colors,
                research_time_modifier_from_research_points_overflow_label: this.cache.localisation,
                research_time_modifier_from_player_empire_label: this.cache.localisation,
                simulation_research_rate_scalar_line: super.label_form(this.cache),
                waiting_for_future_research_prerequisites_met_line: super.label_form(this.cache),
                waiting_for_future_required_research_tier_met_line: super.label_form(this.cache),
                waiting_for_future_research_name_color_when_researching: this.cache.colors,
                waiting_for_future_research_name_color_when_not_researching: this.cache.colors,
                waiting_for_future_research_name_color_when_not_researching_but_has_other_researching: this.cache.colors,
                waiting_for_future_research_researching_percentage_value_color: this.cache.colors,
                research_prerequisites: this.research_prerequisites(),
                planet_track_level_culture_provider_track_type_line: super.label_form(this.cache),
                planet_track_level_culture_provider_minimum_level_line: super.label_form(this.cache),
                planet_track_level_culture_provider_culture_rate_line: super.label_form(this.cache),
                max_supply_line: super.label_form(this.cache),
                unit_starting_experience_line: super.label_form(this.cache),
                culture_propagation_rate_scalar_line: super.label_form(this.cache),
                culture_propagation_rate_scalar_description: super.label_form2(this.cache),
                structure_slots_required_line: super.label_form(this.cache),
                npc_reward_player_label: this.cache.localisation,
                planet_component_name: this.cache.localisation,
                ship_component_postfix: this.cache.localisation,
                gravity_well_self_build_time_label: this.cache.localisation,
                home_planet_income_rate_labels: object({
                    keys: {
                        credits: this.cache.localisation,
                        metal: this.cache.localisation,
                        crystal: this.cache.localisation,
                    },
                }),
                windfall_header_label: super.label_form(this.cache),
                unlocked_unit_ability_header_before_unit_text: this.cache.localisation,
                unlocked_unit_ability_header_after_unit_text: this.cache.localisation,
                improved_unit_ability_header_before_unit_text: this.cache.localisation,
                improved_unit_ability_header_after_unit_text: this.cache.localisation,
                unlocked_planet_tracks_header_label: this.cache.localisation,
                friendly_planet_modifiers_header_label: this.cache.localisation,
                enemy_planet_modifiers_header_label: this.cache.localisation,
                friendly_unit_modifiers_header_label: this.cache.localisation,
                enemy_unit_modifiers_header_label: this.cache.localisation,
            },
        })
    }
}
