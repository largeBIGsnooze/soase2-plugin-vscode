const { schema, object, integer, float, vecInt2 } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudNotificationsWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                sub_type_icon_layout: super.layout(),
                max_card_count: integer(),
                card_icon_size: vecInt2(),
                card_icons_gap: float(),
                card_stride: float(),
                card_durations: object({
                    keys: {
                        brief: float(),
                        normal: float(),
                        extended: float(),
                    },
                }),
                card_drop_shadow: super.drop_shadow(this.cache.textures),
                card_backdrop: object({
                    keys: {
                        brush: this.cache.textures,
                        highlighted_brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                    },
                }),
                card_overlay: this.cache.textures,
                fade_in_duration: float(),
                fade_out_duration: float(),
                max_velocity: float(),
                acceleration: float(),
                drop_secondary_icon_easing_function: Definitions.getEasingFunctons(),
                drop_secondary_icon_duration: float(),
                npc_auction_bid_amount_icon: this.cache.textures,
                npc_auction_bid_amount_icon_layout: super.layout(),
                npc_auction_bid_amount_text_layout: super.layout(),
                npc_auction_bid_amount_text_font: this.cache.fonts,
                npc_auction_bid_amount_text_color: this.cache.colors,
                pressed_sound: this.cache.ogg,
                progress_bar: object({
                    keys: {
                        layout: super.layout(),
                        frame_brush: this.cache.textures,
                        bar_margins: super.margins(),
                        bar_color: this.cache.colors,
                    },
                }),
            },
        })
    }
}
