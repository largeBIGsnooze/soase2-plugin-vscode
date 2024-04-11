const { schema, string, object, float, array, vecInt2, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudPlayerWindow extends Definitions {
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
                                victory_conditions_label: super.label(this.cache.localisation),
                                player_panels_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures, {
                                    extra_properties: {
                                        player_panel_definition: object({
                                            keys: {
                                                size: vecInt2(),
                                                name_label: super.label(this.cache.localisation),
                                                theme_icon_window: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                                                portraint_window: super.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors, {
                                                    properties: {
                                                        allied_frame: this.cache.textures,
                                                        not_allied_frame: this.cache.textures,
                                                        offer_received_frame: this.cache.textures,
                                                        offer_sent_frame: this.cache.textures,
                                                        offer_received_blink: object({
                                                            keys: {
                                                                duration: float(),
                                                                up_function: string(),
                                                                down_function: string(),
                                                            },
                                                        }),
                                                        offer_sent_blink: object({
                                                            keys: {
                                                                duration: float(),
                                                                up_function: string(),
                                                                down_function: string(),
                                                            },
                                                        }),
                                                        active_player_overlay_components: array({
                                                            items: super.component(this.cache.textures),
                                                            isUnique: true,
                                                        }),
                                                        has_lost_overlay: super.overlays(this.cache.textures),
                                                        has_lost_alpha_multiply: float(),
                                                        not_connected_overlay: super.overlays(this.cache.textures),
                                                        not_connected_alpha_multiply: float(),
                                                        team_icon_layout: super.layout(),
                                                        team_icons: array({
                                                            items: this.cache.textures,
                                                            isUnique: true,
                                                        }),
                                                        alliance_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures, {
                                                            extra_properties: {
                                                                cease_fire_icon: super.icon(this.cache.textures),
                                                                share_vision_icon: super.icon(this.cache.textures),
                                                                synergy_icon: super.icon(this.cache.textures),
                                                                lock_bar: object({
                                                                    keys: {
                                                                        layout: super.layout(),
                                                                        bar: object({
                                                                            keys: {
                                                                                layout: super.layout(),
                                                                                outline_size: float(),
                                                                                outline_color: color(),
                                                                                backdrop_color: color(),
                                                                                bar_color: color(),
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
                                home_planet_victory_icon: super.icon(this.cache.textures, {
                                    extra_properties: {
                                        background: super.background(this.cache.textures),
                                        tooltip_title_text: this.cache.localisation,
                                        tooltip_description_text: this.cache.localisation,
                                    },
                                }),
                                colonization_victory_icon: super.icon(this.cache.textures, {
                                    extra_properties: {
                                        background: super.background(this.cache.textures),
                                        tooltip_title_text: this.cache.localisation,
                                        tooltip_description_text: this.cache.localisation,
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
