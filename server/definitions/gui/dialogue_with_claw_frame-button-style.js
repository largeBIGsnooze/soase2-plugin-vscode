const { schema, object, array, boolean } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DialogueWithClawFrameButtonStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                backgrounds: super.backgrounds(this.cache.textures),
                font: this.cache.fonts,
                icon_layout_with_text: super.layout(),
                text_layout_with_icon: super.layout(),
                text_layout_without_icon: super.layout(),
                text_colors: object({
                    keys: {
                        normal: this.cache.colors,
                        disabled: this.cache.colors,
                    },
                }),
                highlighted_text_colors: object({
                    keys: {
                        normal: this.cache.colors,
                        disabled: this.cache.colors,
                    },
                }),
                pressed_sound: this.cache.ogg,
            },
        })
    }
}
