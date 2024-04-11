const { schema, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Exotic extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                version: float(),
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
