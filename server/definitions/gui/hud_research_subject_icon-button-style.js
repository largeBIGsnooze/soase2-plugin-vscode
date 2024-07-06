const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudResearchSubjectIconButtonStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                pressed_sound: this.cache.ogg,
            },
        })
    }
}
