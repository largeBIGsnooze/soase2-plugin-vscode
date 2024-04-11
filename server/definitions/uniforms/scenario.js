const { schema, array } = require('../data_types')

module.exports = class ScenarioUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                scenarios: array({
                    items: this.cache.scenarios,
                    isUnique: true,
                }),
            },
            required: ['scenarios'],
        })
    }
}
