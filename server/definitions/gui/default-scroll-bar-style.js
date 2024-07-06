const { schema, object, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DefaultScrollBarStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background: object({
                    keys: {
                        brush: this.cache.textures,
                    },
                }),
                thumb: object({
                    keys: {
                        brush: this.cache.textures,
                    },
                }),
                thumb_overlay: object({
                    keys: {
                        brush: this.cache.textures,
                        brush_render_style: super.brush_render_style(),
                    },
                }),
                min_thumb_size: float(),
            },
        })
    }
}
