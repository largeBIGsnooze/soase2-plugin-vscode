const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class AbilityTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                ability_name_color: this.cache.colors,
                ability_level_color: this.cache.colors,
                required_level_tooltip_line: super.label_form(this.cache),
                antimatter_cost_tooltip_line: super.label_form(this.cache),
                hull_cost_tooltip_line: super.label_form(this.cache),
                shields_cost_tooltip_line: super.label_form(this.cache),
                planet_health_cost_tooltip_line: super.label_form(this.cache),
                cooldown_tooltip_line: super.label_form(this.cache),
                unit_to_build_max_count_in_empire_line: super.label_form(this.cache),
                range_line: super.label_form(this.cache),
                between_gravity_well_range_line: super.label_form(this.cache),
                spawned_unit_build_time_tooltip_line: super.label_form(this.cache),
                level_not_valid_tooltip_line: super.label_form(this.cache),
                min_required_npc_reputation_level_required_line: super.label_form(this.cache),
                brief_ability_description_color: this.cache.colors,
                required_structure_in_gravity_well_label: this.cache.localisation,
                required_structure_in_gravity_well_name_color_when_missing: this.cache.colors,
                required_structure_in_gravity_well_name_color_when_not_missing: this.cache.colors,
                unit_to_build_line_prefix: this.cache.localisation,
                enable_auto_cast_line: super.label_form(this.cache),
                disable_auto_cast_line: super.label_form(this.cache),
                disable_auto_cast_if_any_enemy_bomb_planet_ships_in_gravity_well_description: super.label_form2(this.cache),
                unit_to_build_max_count_in_gravity_well_line: super.label_form(this.cache),
                spawned_unit_current_count_in_empire_label: this.cache.localisation,
                spawned_unit_current_count_in_empire_color_when_zero: this.cache.colors,
                spawned_unit_current_count_in_empire_color_when_max_count_exceeded: this.cache.colors,
                spawned_unit_current_count_in_empire_color_when_max_count_not_exceeded: this.cache.colors,
            },
        })
    }
}
