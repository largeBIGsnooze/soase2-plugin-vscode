const { schema, version } = require('../data_types')

module.exports = class Exotic {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                version: version(),
                tooltip_icon: this.cache.textures,
                small_icon: this.cache.textures,
                large_icon: this.cache.textures,
                picture: this.cache.textures,
                name: this.cache.localisation,
                description: this.cache.localisation,
            },
            required: ['tooltip_icon', 'small_icon', 'large_icon', 'picture', 'name', 'description'],
        })
    }
}
