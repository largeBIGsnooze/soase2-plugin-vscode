const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudDarkTextDisplayButtonStyle extends Definitions {
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
                text_colors: super.text_colors(this.cache.colors),
            },
        })
    }
}
