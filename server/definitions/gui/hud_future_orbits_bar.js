const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudFutureOrbitsBar extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background: this.cache.textures,
                bar_layout: super.layout(),
                fill_brush: this.cache.textures,
                buffer_brush: this.cache.textures,
                cursor_brush: this.cache.textures,
            },
        })
    }
}
