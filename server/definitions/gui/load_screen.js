const { schema, string, object, color, array } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class LoadScreen extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_color: color(),
                layout_parent_window: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                picture_window: object({
                    keys: {
                        layout: super.layout(),
                        background_brush: this.cache.textures,
                        overlay_brush: this.cache.textures,
                        picture_brushes: array({
                            items: this.cache.textures,
                            isUnique: true,
                        }),
                    },
                }),
                character_window: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                tip_window: object({
                    keys: {
                        layout: super.layout(),
                        text_layout: super.layout(),
                        text_color: color(),
                        text_font: this.cache.fonts,
                        background_brush: this.cache.textures,
                        overlay_brush: this.cache.textures,
                        tip_id_prefix: string(),
                    },
                }),
                progress_bar_window: object({
                    keys: {
                        layout: super.layout(),
                        bar_layout: super.layout(),
                        background_brush: this.cache.textures,
                        overlay_brush: this.cache.textures,
                        progress_brush: this.cache.textures,
                        progress_colors: array({
                            items: color(),
                        }),
                    },
                }),
                key_art: object({
                    keys: {
                        brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                        components: array({
                            items: object({
                                keys: {
                                    layout: super.layout(),
                                    brush: this.cache.textures,
                                    brush_render_style: super.brush_render_style(),
                                },
                            }),
                            isUnique: true,
                        }),
                    },
                }),
            },
        })
    }
}
