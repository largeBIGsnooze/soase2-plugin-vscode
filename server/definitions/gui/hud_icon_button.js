const { schema, string, object, integer, vector2, float, array } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudIconButton extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    overlays() {
        return object({
            keys: {
                normal: object({
                    keys: {
                        brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                    },
                }),
                research_completed: object({
                    keys: {
                        brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                    },
                }),
                research_unavailable: object({
                    keys: {
                        brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                    },
                }),
                ability_channelling: object({
                    keys: {
                        brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                    },
                }),
            },
        })
    }
    flashes() {
        return object({
            keys: {
                research_completed: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                research_tier_unlocked: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                unit_item_slot_unlocked: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                unit_item_slot_busy: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                ability_cooldown_completed: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                auction_started: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                alliance_offer_received: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                npc_reputation_level_acquired: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                finite_item_added: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
                influence_point_gained: object({
                    keys: {
                        brush: this.cache.textures,
                        duration: float(),
                    },
                }),
            },
        })
    }

    create() {
        return schema({
            keys: {
                drop_shadow: super.drop_shadow(this.cache.textures),
                overlays: this.overlays(),
                flashes: this.flashes(),
                build_progress_bar: object({
                    keys: {
                        layout: super.layout(),
                        frame_brush: this.cache.textures,
                        bar_margins: super.margins(),
                        bar_color: this.cache.colors,
                    },
                }),
                status_icon_backdrop: string(),
                status_icon_margins: super.margins(),
                status_icon_backdrop_layout_without_build_progress_bar: super.layout(),
                status_icon_backdrop_layout_with_build_progress_bar: super.layout(),
                has_external_research_links_icon_layout: super.layout(),
                has_external_research_links_icons: object({
                    keys: {
                        not_completed: this.cache.textures,
                        completed: this.cache.textures,
                        unavailable: this.cache.textures,
                    },
                }),
                top_count_font: this.cache.fonts,
                top_count_layout: super.layout(),
                top_count_in_status_layout: super.layout(),
                top_count_color: this.cache.colors,
                top_count_blink_duration: integer(),
                bottom_count_font: this.cache.fonts,
                bottom_count_layout: super.layout(),
                bottom_count_in_status_layout: super.layout(),
                bottom_count_color: this.cache.colors,
                bottom_count_blink_duration: integer(),
                is_exotic_reserved_icon_layout: super.layout(),
                is_exotic_reserved_icon: this.cache.textures,
                auto_cast_animation: super.animation(this.cache.textures),
                ability_cooldown_overlay: object({
                    keys: {
                        fill: this.cache.textures,
                        glow: this.cache.textures,
                    },
                }),
                cooldown_overlay: object({
                    keys: {
                        fill: this.cache.textures,
                        glow: this.cache.textures,
                    },
                }),
                unit_item_backdrops: object({
                    keys: {
                        locked: array({
                            items: object({
                                keys: {
                                    brush: this.cache.textures,
                                    brush_render_style: super.brush_render_style(),
                                },
                            }),
                        }),
                        unlocked_in_future: array({
                            items: object({
                                keys: {
                                    brush: this.cache.textures,
                                    brush_render_style: super.brush_render_style(),
                                },
                            }),
                        }),
                        unlocked_now: array({
                            items: object({
                                keys: {
                                    brush: this.cache.textures,
                                    brush_render_style: super.brush_render_style(),
                                },
                            }),
                        }),
                    },
                }),
                increase_ability_level_icon: this.cache.textures,
                increase_ability_level_icon_layout: super.layout(),
                pips: {
                    max_count: integer(),
                    layout: super.layout(),
                    icon_size: vector2(),
                    spacing: integer(),
                    icons: object({
                        keys: {
                            empty: this.cache.textures,
                            building: this.cache.textures,
                            built: this.cache.textures,
                            fully_built: this.cache.textures,
                            blocked: this.cache.textures,
                        },
                    }),
                    building_blink_duration: integer(),
                },
                pressed_sound: this.cache.ogg,
                left_text_font: this.cache.fonts,
                left_text_width: float(),
                left_text_backgrounds: array({
                    items: {
                        brush: this.cache.textures,
                        outer_margins: super.margins(),
                    },
                }),
            },
        })
    }
}
