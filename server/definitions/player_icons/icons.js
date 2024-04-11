const { schema, object } = require('../data_types')

module.exports = class Icons {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                sizes: object({
                    keys: {
                        tiny: this.cache.textures,
                        medium: this.cache.textures,
                        large: this.cache.textures,
                    },
                    required: ['tiny', 'medium', 'large'],
                }),
            },
            required: ['sizes'],
        })
    }
}
