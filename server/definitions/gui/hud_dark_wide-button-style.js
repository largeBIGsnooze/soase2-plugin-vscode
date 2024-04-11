const { schema, array, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudDarkWideButtonStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                backgrounds: super.backgrounds(this.cache.textures),
                overlays: array({
                    items: this.background(this.cache.textures),
                    isUnique: true,
                }),
                pressed_sound: this.cache.ogg,
                font: this.cache.fonts,
                icon_layout_with_text: super.layout(),
                text_layout_with_icon: super.layout(),
                text_layout_without_icon: super.layout(),
                text_colors: super.text_colors(this.cache.colors),
                text_has_drop_shadow: boolean(),
            },
        })
    }
}
