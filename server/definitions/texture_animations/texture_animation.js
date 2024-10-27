const { schema, integer, vector2i } = require('../data_types')

module.exports = class TextureAnimation {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                texture: this.cache.textures(),
                total_frame_count: integer(),
                column_frame_count: integer(),
                start_top_left: vector2i(),
                frame_size: vector2i(),
                frame_stride: vector2i(),
            },
        })
    }
}
