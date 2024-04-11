const { schema, string, object, integer, array, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudExoticFactoryWindow extends Definitions {
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
                                title_label: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                build_exotic_windows_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        build_exotic_window_shared_definition: object({
                                            keys: {
                                                label: object({
                                                    keys: {
                                                        style: super.style(),
                                                    },
                                                }),
                                                picture_button: object({
                                                    keys: {
                                                        style: super.style(),
                                                        status_panel: object({
                                                            keys: {
                                                                layout: super.layout(),
                                                                background: super.background(this.cache.textures),
                                                                available_count_label_style: super.style(),
                                                                available_count_label_layout: super.layout(),
                                                                deliverable_count_label_style: super.style(),
                                                                deliverable_count_label_layout: super.layout(),
                                                                deliverable_count_blink_duration: integer(),
                                                                status_icon_label_style: super.style(),
                                                                status_icon_label_layout: super.layout(),
                                                            },
                                                        }),
                                                    },
                                                }),
                                            },
                                        }),
                                        build_exotic_window_top_row_internal_layout: object({
                                            keys: {
                                                label: super.layout(),
                                                picture_button: super.layout(),
                                            },
                                        }),
                                        build_exotic_window_bottom_row_internal_layout: object({
                                            keys: {
                                                label: super.layout(),
                                                picture_button: super.layout(),
                                            },
                                        }),
                                        build_exotic_window_0: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                                        build_exotic_window_1: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                                        build_exotic_window_2: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                                        build_exotic_window_3: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                                        build_exotic_window_4: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                                    },
                                }),
                                factory_count_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: super.background(this.cache.textures),
                                        text_layout: super.layout(),
                                        font: this.cache.fonts,
                                        text_color_when_zero: this.cache.colors,
                                        text_color_when_non_zero: this.cache.colors,
                                        tooltip_title_text: this.cache.localisation,
                                    },
                                }),
                                deliverable_buttons_panel: super.button_panel(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
