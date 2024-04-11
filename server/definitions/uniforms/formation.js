const { schema } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FormationUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                ships_and_structures_formation: this.cache.formations,
                strikecraft_only_formation: this.cache.formations,
            },
        })
    }
}
