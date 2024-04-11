const { schema, integer, vecInt2 } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class TextureAnimation extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                texture: this.cache.textures,
                total_frame_count: integer(),
                column_frame_count: integer(),
                start_top_left: vecInt2(),
                frame_size: vecInt2(),
                frame_stride: vecInt2(),
            },
        })
    }
}
