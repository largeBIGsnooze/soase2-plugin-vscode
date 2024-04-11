const { schema } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FailedQueryTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                no_free_asteroid_header: super.label_form2(this.cache.localisation, this.cache.colors),
                structure_requires_phase_resonance_synchronizer_capacity_header: super.label_form2(this.cache.localisation, this.cache.colors),
                structure_requires_planet_trade_capacity_header: super.label_form2(this.cache.localisation, this.cache.colors),
                planet_track_level_is_already_max_header: super.label_form2(this.cache.localisation, this.cache.colors),
                planet_track_level_max_level_is_zero_header: super.label_form2(this.cache.localisation, this.cache.colors),
                research_subject_required_header: super.label_form2(this.cache.localisation, this.cache.colors),
                research_tier_required_header: super.label_form2(this.cache.localisation, this.cache.colors),
                exotics_required_header: super.label_form2(this.cache.localisation, this.cache.colors),
                planet_level_required_label: super.label_form2(this.cache.localisation, this.cache.colors),
                planet_level_required_value_color: this.cache.colors,
                missing_item_prerequisites_label: super.label_form2(this.cache.localisation, this.cache.colors),
                valid_planet_types_label: super.label_form2(this.cache.localisation, this.cache.colors),
                other_item_exists_label: super.label_form2(this.cache.localisation, this.cache.colors),
                no_planet_component_slot_available_label: super.label_form2(this.cache.localisation, this.cache.colors),
                no_planet_component_slot_description_at_max_level: super.label_form2(this.cache.localisation, this.cache.colors),
                no_planet_component_slot_description_below_max_level: super.label_form2(this.cache.localisation, this.cache.colors),
                no_ship_component_slot_available_label: super.label_form2(this.cache.localisation, this.cache.colors),
                increase_ability_level_insufficient_owner_level_label: super.label_form2(this.cache.localisation, this.cache.colors),
                missing_required_trade_port_structure_label: super.label_form2(this.cache.localisation, this.cache.colors),
                missing_weapon_constraint_label_prefix: super.label_form2(this.cache.localisation, this.cache.colors),
                missing_weapon_constraint_label_suffix: super.label_form2(this.cache.localisation, this.cache.colors),
                unmet_is_carrier_constraint_label: super.label_form2(this.cache.localisation, this.cache.colors),
                ability_cooldown_is_not_completed_label: super.label_form2(this.cache.localisation, this.cache.colors),
                ability_is_already_in_use_label: super.label_form2(this.cache.localisation, this.cache.colors),
            },
        })
    }
}
