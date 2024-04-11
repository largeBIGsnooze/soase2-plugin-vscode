const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class ItemTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                stack_count_text: this.cache.localisation,
                remaining_stack_count_text: this.cache.localisation,
                stack_count_value_color: this.cache.colors,
                build_time: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                build_progress: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                waiting_for_item_owner_unit_to_be_built_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                waiting_for_available_item_slot_to_build_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                waiting_for_out_of_combat_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                missing_ship_component_shop_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                missing_ship_component_shop_scalar_value_label: this.cache.localisation,
                waiting_for_planet_level_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                finite_item_quantity_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                active_ability_sub_header_label: this.cache.localisation,
                locked_planet_component_item_index_title: this.cache.localisation,
                locked_planet_component_item_index_description: this.cache.localisation,
                unlocked_planet_component_item_index_title: this.cache.localisation,
                unlocked_planet_component_item_index_description: this.cache.localisation,
                required_track_level_prefix: this.cache.localisation,
                required_track_level_value_color: this.cache.colors,
                locked_ship_component_item_index_title: this.cache.localisation,
                locked_ship_component_item_index_description: this.cache.localisation,
                unlocked_ship_component_item_index_title: this.cache.localisation,
                unlocked_ship_component_item_index_description: this.cache.localisation,
                required_unit_level_label: this.cache.localisation,
                required_unit_level_value_color: this.cache.colors,
                max_count_on_unit_label: this.cache.localisation,
                destroyed_planet_stripped_assets_label: this.cache.localisation,
                destroyed_planet_stripped_exotics_label: this.cache.localisation,
                additive_planet_scuttle_time_label: this.cache.localisation,
                item_prerequisites_mutually_exclusive_items_line_begin_text: this.cache.localisation,
                item_prerequisites_completed_color: this.cache.colors,
                item_prerequisites_uncompleted_color: this.cache.colors,
                are_item_prerequisites_met_in_future_icon: string(),
                passive_modifiers_sub_header_label: this.cache.localisation,
                active_actions_sub_header_label: this.cache.localisation,
                change_garrison_orders_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                drag_and_drop_to_remove_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                is_ruler_ship_label: super.label_form2(this.cache.localisation, this.cache.colors),
                is_ruler_ship_description: super.label_form2(this.cache.localisation, this.cache.colors),
                is_phase_resonance_capacitor_label: super.label_form2(this.cache.localisation, this.cache.colors),
                is_phase_resonance_capacitor_description: super.label_form2(this.cache.localisation, this.cache.colors),
                phase_resonance_capacitor_progress_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
            },
        })
    }
}
