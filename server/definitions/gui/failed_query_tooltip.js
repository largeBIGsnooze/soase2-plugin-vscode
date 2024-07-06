const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FailedQueryTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                no_free_asteroid_header: super.label_form2(this.cache),
                structure_requires_phase_resonance_synchronizer_capacity_header: super.label_form2(this.cache),
                structure_requires_planet_trade_capacity_header: super.label_form2(this.cache),
                planet_track_level_is_already_max_header: super.label_form2(this.cache),
                planet_track_level_max_level_is_zero_header: super.label_form2(this.cache),
                research_subject_required_header: super.label_form2(this.cache),
                research_tier_required_header: super.label_form2(this.cache),
                exotics_required_header: super.label_form2(this.cache),
                planet_level_required_label: super.label_form2(this.cache),
                planet_level_required_value_color: this.cache.colors,
                missing_item_prerequisites_label: super.label_form2(this.cache),
                valid_planet_types_label: super.label_form2(this.cache),
                other_item_exists_label: super.label_form2(this.cache),
                no_planet_component_slot_available_label: super.label_form2(this.cache),
                no_planet_component_slot_description_at_max_level: super.label_form2(this.cache),
                no_planet_component_slot_description_below_max_level: super.label_form2(this.cache),
                no_ship_component_slot_available_label: super.label_form2(this.cache),
                increase_ability_level_insufficient_owner_level_label: super.label_form2(this.cache),
                missing_required_trade_port_structure_label: super.label_form2(this.cache),
                missing_weapon_constraint_label_prefix: super.label_form2(this.cache),
                missing_weapon_constraint_label_suffix: super.label_form2(this.cache),
                unmet_is_carrier_constraint_label: super.label_form2(this.cache),
                ability_cooldown_is_not_completed_label: super.label_form2(this.cache),
                ability_is_already_in_use_label: super.label_form2(this.cache),
                npc_reputation_reward_cooldown_is_not_completed_label: super.label_form2(this.cache),
                npc_reputation_level_required_label: super.label_form2(this.cache),
                npc_reputation_level_required_value_color: this.cache.colors,
            },
        })
    }
}
