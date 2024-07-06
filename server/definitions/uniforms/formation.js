const { schema } = require('../data_types')

module.exports = class FormationUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
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
