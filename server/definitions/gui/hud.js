const { schema, object, float, vector2 } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class Hud extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                window_models: object({
                    keys: {
                        assets: object({
                            keys: {
                                delta_asset_value_visible_duration: float(),
                                delta_asset_value_fade_duration: float(),
                            },
                        }),
                        bookmarks: object({
                            keys: {
                                dragging_activation_hold_distance_tolerance: float(),
                                dragging_activation_hold_time: float(),
                            },
                        }),
                        trade: object({
                            keys: {
                                increase_export_points_sound: this.cache.ogg,
                                decrease_export_points_sound: this.cache.ogg,
                            },
                        }),
                        carrier: object({
                            keys: {
                                no_carrier_selected_tooltip_line: super.label_form(this.cache),
                            },
                        }),
                        unit_factory: object({
                            keys: {
                                no_factory_selected_tooltip_line: super.label_form2(this.cache),
                            },
                        }),
                        research_window_text_filter: object({
                            keys: {
                                unlocked_text_filter: this.cache.localisation,
                                improved_text_filter: this.cache.localisation,
                                max_supply_text_filter: this.cache.localisation,
                                colonize_text_filter: this.cache.localisation,
                                ability_text_filter: this.cache.localisation,
                                trade_capacity_text_filter: this.cache.localisation,
                            },
                        }),
                    },
                }),
                unit_icon_definition: object({
                    keys: {
                        never_detected_gravity_well_fixture_icon: this.cache.textures,
                        ui_status_borders: object({
                            keys: {
                                under_cursor: this.cache.textures,
                                bandboxed: this.cache.textures,
                                sub_selected: this.cache.textures,
                                selected: this.cache.textures,
                            },
                        }),
                        alert_fill: this.cache.textures,
                    },
                }),
                tooltip_bottom_right_offset: vector2(),
            },
        })
    }
}
