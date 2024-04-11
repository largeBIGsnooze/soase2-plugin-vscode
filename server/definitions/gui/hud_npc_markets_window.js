const { schema, string, object, float, array, vecInt2 } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudNpcMarketsWindow extends Definitions {
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
                                title_label: super.label(this.cache.localisation),
                                market_windows_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        market_windows_gap: float(),
                                        market_window_shared_definition: object({
                                            keys: {
                                                size: vecInt2(),
                                                name_label: super.label(this.cache.localisation),
                                                theme_icon_window: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                                                portrait_window: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        allied_frame: this.cache.textures,
                                                        not_allied_frame: this.cache.textures,
                                                        has_lost_overlay: super.background(this.cache.textures),
                                                        has_lost_alpha_multiply: float(),
                                                        unknown_npc_portrait: this.cache.textures,
                                                        unknown_npc_frame: this.cache.textures,
                                                        not_discovered_market_npc_player_description: super.label_form2(this.cache.localisation, this.cache.colors),
                                                        no_market_npc_player_description: super.label_form2(this.cache.localisation, this.cache.colors),
                                                    },
                                                }),
                                            },
                                        }),
                                        metal_market_window: object({
                                            keys: {
                                                portrait_window: object({
                                                    keys: {
                                                        market_portrait: this.cache.textures,
                                                        tooltip_title_icon: this.cache.textures,
                                                        tooltip_title_text: this.cache.localisation,
                                                    },
                                                }),
                                                metal_market_window: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        background: super.background(this.cache.textures),
                                                        buy_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                                        sell_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                                        demand_window: object({
                                                            keys: {
                                                                layout: super.layout(),
                                                                background: super.background(this.cache.textures),
                                                                name: super.label(this.cache.localisation),
                                                                icon: super.icon(this.cache.textures),
                                                            },
                                                        }),
                                                    },
                                                }),
                                            },
                                        }),
                                        crystal_market_window: object({
                                            keys: {
                                                portrait_window: object({
                                                    keys: {
                                                        market_portrait: this.cache.textures,
                                                        tooltip_title_icon: this.cache.textures,
                                                        tooltip_title_text: this.cache.localisation,
                                                    },
                                                }),
                                                crystal_market_window: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        background: super.background(this.cache.textures),
                                                        buy_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                                        sell_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                                        demand_window: object({
                                                            keys: {
                                                                layout: super.layout(),
                                                                background: super.background(this.cache.textures),
                                                                name: super.label(this.cache.localisation),
                                                                icon: super.icon(this.cache.textures),
                                                            },
                                                        }),
                                                    },
                                                }),
                                            },
                                        }),
                                        exotic_market_window: object({
                                            keys: {
                                                portrait_window: object({
                                                    keys: {
                                                        market_portrait: this.cache.textures,
                                                        tooltip_title_icon: this.cache.textures,
                                                        tooltip_title_text: this.cache.localisation,
                                                    },
                                                }),
                                                exotic_market_window: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        background: super.background(this.cache.textures),
                                                        label: super.label(this.cache.localisation),
                                                        sell_exotic_buttons_panel: object({
                                                            keys: {
                                                                layout: super.layout(),
                                                                sell_buttons_grid: super.layout_grid(),
                                                                sell_button_shared_definition: object({
                                                                    keys: {
                                                                        style: super.style(),
                                                                        count_layout: super.layout(),
                                                                        count_font: this.cache.fonts,
                                                                        count_color: this.cache.colors,
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
                        }),
                    },
                }),
            },
        })
    }
}
