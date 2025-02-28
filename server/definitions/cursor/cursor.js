const { vector2f, schema } = require('../data_types')

module.exports = class Cursor {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                texture_name: this.cache.textures(),
                hot_spot: vector2f(),
            },
            required: ['texture_name', 'hot_spot'],
        })
    }
}
