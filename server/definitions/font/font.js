const { schema, integer } = require('../data_types')

module.exports = class Font {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                face: this.cache.ttf,
                height: integer(),
            },
            required: ['face', 'height'],
        })
    }
}
