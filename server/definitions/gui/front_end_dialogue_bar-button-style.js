const { schema } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndDialogueBarButtonStyle extends Definitions {
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
                text_layout_without_icon: super.layout(),
                text_colors: super.text_colors(this.cache.colors),
                highlighted_text_colors: super.text_colors(this.cache.colors),
                pressed_sound: this.cache.ogg,
            },
        })
    }
}
