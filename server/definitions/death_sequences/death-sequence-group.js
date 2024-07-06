const { schema, array } = require('../data_types')

module.exports = class DeathSequenceGroup {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                death_sequences: array({
                    items: this.cache.death_sequences,
                    isUnique: true,
                }),
            },
            required: ['death_sequences'],
        })
    }
}
