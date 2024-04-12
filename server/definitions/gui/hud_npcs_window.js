const { schema, string, object, float, array, vecInt2 } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudNpcsWindow extends Definitions {
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
                                influence_points_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: super.background(this.cache.textures),
                                        header_label: super.label(this.cache),
                                        points_label: super.label(this.cache),
                                        point_progress_bar: super.progress_bar(),
                                    },
                                }),
                                npc_player_windows_panel: {
                                    layout: super.layout(),
                                    player_windows_gap: float(),
                                    player_window_shared_definition: object({
                                        keys: {
                                            size: vecInt2(),
                                            name_label: super.label(this.cache),
                                            theme_icon_window: super.window_frame(this.cache),
                                            portrait_window: object({
                                                keys: {
                                                    layout: super.layout(),
                                                    allied_frame: this.cache.textures,
                                                    not_allied_frame: this.cache.textures,
                                                    has_lost_overlay: super.overlays(this.cache.textures),
                                                    has_lost_alpha_multiply: float(),
                                                    unknown_npc_portrait: this.cache.textures,
                                                    unknown_npc_frame: this.cache.textures,
                                                    status_panel: object({
                                                        keys: {
                                                            layout: super.layout(),
                                                            background: super.background(this.cache.textures),
                                                            market_status_window: object({
                                                                keys: {
                                                                    layout: super.layout(),
                                                                    metal_market_icon: this.cache.textures,
                                                                    crystal_market_icon: this.cache.textures,
                                                                    exotic_market_icon: this.cache.textures,
                                                                },
                                                            }),
                                                            alliance_status_window: object({
                                                                keys: {
                                                                    layout: super.layout(),
                                                                    alliance_icon: this.cache.textures,
                                                                },
                                                            }),
                                                        },
                                                    }),
                                                },
                                            }),
                                            auction_panel: object({
                                                keys: {
                                                    layout: super.layout(),
                                                    background_components: array({
                                                        items: super.component(this.cache.textures),
                                                        isUnique: true,
                                                    }),
                                                    reward_picture_window: object({
                                                        keys: {
                                                            layout: super.layout(),
                                                            background: super.background(this.cache.textures),
                                                        },
                                                    }),
                                                    asset_bid_button: super.button(this.cache),
                                                    exotic_bid_button: super.button(this.cache, {
                                                        extra_properties: {
                                                            will_not_accept_exotics_description: super.label_form2(this.cache),
                                                        },
                                                    }),
                                                    progress_bar: super.progress_bar(),
                                                },
                                            }),
                                        },
                                    }),
                                },
                                use_reward_buttons_panel: object({
                                    keys: {
                                        layout: super.layout(),
                                        column_count: float(),
                                        row_count: float(),
                                        button_layout_grid: super.layout_grid(),
                                        button_shared_definition: super.button_shared_definition(this.cache.textures, {
                                            extra_properties: {
                                                is_new_reward_icon: this.cache.textures,
                                                is_new_reward_layout: super.layout(),
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
