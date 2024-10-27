const { schema, array, version } = require('../data_types')

module.exports = class TutorialUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                tutorials: array({
                    items: this.cache.scenarios,
                    isUnique: true,
                }),
            },
            required: ['tutorials'],
        })
    }
}
