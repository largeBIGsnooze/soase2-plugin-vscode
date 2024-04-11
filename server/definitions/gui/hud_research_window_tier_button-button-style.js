const { schema, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudResearchWindowTierButtonButtonStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                backgrounds: array({
                    items: super.background(this.cache.textures),
                    isUnique: true,
                }),
                text_backgrounds: array({
                    items: super.background(this.cache.textures),
                    isUnique: true,
                }),
                pressed_sound: this.cache.ogg,
                font: this.cache.fonts,
                font_alignment: super.alignment(),
                text_layout_with_icon: super.layout(),
                text_layout_without_icon: super.layout(),
                text_colors: super.text_colors(this.cache.colors),
            },
        })
    }
}
