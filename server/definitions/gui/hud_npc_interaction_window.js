const { schema, string, object, array, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudNpcInteractionWindow extends Definitions {
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
                                ok_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                break_alliance_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                portrait_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: super.background(this.cache.textures),
                                        overlay: this.cache.textures,
                                    },
                                }),
                                reputation_bar: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: this.cache.textures,
                                        bar_layout: super.layout(),
                                        fill_brush: this.cache.textures,
                                        max_level_fill_brush: this.cache.textures,
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
