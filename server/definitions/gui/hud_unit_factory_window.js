const { schema, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudUnitFactoryWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                bar_width: float(),
                background_top_brush: this.cache.textures,
                background_middle_brush: this.cache.textures,
                background_bottom_brush: this.cache.textures,
                background_top_extra_height: float(),
                content_window: super.content_window(),
            },
        })
    }
}
