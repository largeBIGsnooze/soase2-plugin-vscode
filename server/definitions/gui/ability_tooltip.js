const { schema } = require('../data_types')
const Definitions = require('../definitions')

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
                required_level_tooltip_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                antimatter_cost_tooltip_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                hull_cost_tooltip_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                shields_cost_tooltip_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                planet_health_cost_tooltip_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                cooldown_tooltip_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                range_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                between_gravity_well_range_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                spawned_unit_build_time_tooltip_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                level_not_valid_tooltip_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                min_required_npc_reputation_level_required_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                brief_ability_description_color: this.cache.colors,
                required_structure_in_gravity_well_label: this.cache.localisation,
                required_structure_in_gravity_well_name_color_when_missing: this.cache.colors,
                required_structure_in_gravity_well_name_color_when_not_missing: this.cache.colors,
                unit_to_build_line_prefix: this.cache.localisation,
                enable_auto_cast_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                disable_auto_cast_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                disable_auto_cast_if_any_enemy_bomb_planet_ships_in_gravity_well_description: super.label_form2(this.cache.localisation, this.cache.colors),
            },
        })
    }
}
