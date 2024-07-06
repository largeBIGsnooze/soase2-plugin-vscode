const { schema, array } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudIconLargeExoticsButtonStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                backgrounds: array({
                    items: super.background(this.cache.textures),
                    isUnique: true,
                }),
                overlays: array({
                    items: super.background(this.cache.textures),
                    isUnique: true,
                }),
                pressed_sound: this.cache.ogg,
            },
        })
    }
}
