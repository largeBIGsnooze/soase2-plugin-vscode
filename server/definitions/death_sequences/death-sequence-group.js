const { schema, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DeathSequenceGroup extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
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
