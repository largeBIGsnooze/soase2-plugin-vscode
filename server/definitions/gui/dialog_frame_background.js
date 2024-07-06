const { schema, color } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DialogFrameBackground extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                fill_color: color(),
                fill_layout: super.layout(),
                top_left: this.cache.textures,
                top_right: this.cache.textures,
                top_center: this.cache.textures,
                bottom_right: this.cache.textures,
                bottom_left: this.cache.textures,
                bottom_center: this.cache.textures,
                left_tile: this.cache.textures,
                right_tile: this.cache.textures,
                top_stretch: this.cache.textures,
                bottom_stretch: this.cache.textures,
            },
        })
    }
}
