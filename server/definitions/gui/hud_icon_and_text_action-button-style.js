const { schema, array } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudIconAndTextActionButtonStyle extends Definitions {
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
                font: this.cache.fonts,
                icon_layout_with_text: super.layout(),
                text_layout_with_icon: super.layout(),
                text_layout_without_icon: super.layout(),
                text_colors: super.text_colors(this.cache.colors),
                pressed_sound: this.cache.ogg,
            },
        })
    }
}
