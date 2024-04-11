const { schema } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class ExoticFactoryDeliverableButtonStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                backgrounds: super.backgrounds(this.cache.textures),
                overlays: super.backgrounds(this.cache.textures),
                pressed_sound: this.cache.ogg,
            },
        })
    }
}
