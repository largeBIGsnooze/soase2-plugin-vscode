const { schema, string, object, float, array } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudPhaseResonanceWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                opening_duration: float(),
                closing_duration: float(),
                fade_function: string(),
                move_function: string(),
                container_window: object({
                    keys: {
                        layout: super.layout(),
                        background: object({
                            keys: {
                                components: array({
                                    items: super.component(this.cache.textures),
                                    isUnique: true,
                                }),
                            },
                        }),
                        content_window: object({
                            keys: {
                                title_label: super.label(this.cache),
                                available_points_label: super.label(this.cache),
                                available_points_value_window: super.window_frame(this.cache),
                                level_labels_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        label_style: super.style(),
                                        labels_layout_grid: super.layout_grid(),
                                        label_texts: array({
                                            items: this.cache.localisation,
                                            isUnique: true,
                                        }),
                                    },
                                }),
                                track_windows_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        track_window_shared_definition: object({
                                            keys: {
                                                width: float(),
                                                title_label_style: super.style(),
                                                title_icon_style: super.icon_style(),
                                                title_label_layout: super.layout(),
                                                title_icon_layout: super.layout(),
                                                title_icons: object({
                                                    keys: {
                                                        combat: this.cache.textures,
                                                        movement: this.cache.textures,
                                                        utility: this.cache.textures,
                                                    },
                                                }),
                                                title_texts: object({
                                                    keys: {
                                                        combat: this.cache.localisation,
                                                        movement: this.cache.localisation,
                                                        utility: this.cache.localisation,
                                                    },
                                                }),
                                                track_levels_panel: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        background: this.cache.textures,
                                                        background_light_layout: super.layout(),
                                                        background_lights: object({
                                                            keys: {
                                                                combat: this.cache.textures,
                                                                movement: this.cache.textures,
                                                                utility: this.cache.textures,
                                                            },
                                                        }),
                                                        track_level_button: super.button(this.cache, {
                                                            extra_properties: {
                                                                increase_level_icon: this.cache.textures,
                                                                background: this.cache.textures,
                                                                activated_icons: object({
                                                                    keys: {
                                                                        combat: object({
                                                                            keys: {
                                                                                icons: array({
                                                                                    items: this.cache.textures,
                                                                                    isUnique: true,
                                                                                }),
                                                                            },
                                                                        }),
                                                                        movement: object({
                                                                            keys: {
                                                                                icons: array({
                                                                                    items: this.cache.textures,
                                                                                    isUnique: true,
                                                                                }),
                                                                            },
                                                                        }),
                                                                        utility: object({
                                                                            keys: {
                                                                                icons: array({
                                                                                    items: this.cache.textures,
                                                                                    isUnique: true,
                                                                                }),
                                                                            },
                                                                        }),
                                                                    },
                                                                }),
                                                                drop_shadow: this.cache.textures,
                                                            },
                                                        }),
                                                        track_level_layout_grid: super.layout_grid(),
                                                    },
                                                }),
                                            },
                                        }),
                                    },
                                }),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
