const { schema, object, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugToolCloseButtonButtonStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                backgrounds: super.backgrounds(this.cache.textures),
                pressed_sound: this.cache.ogg,
            },
        })
    }
}
