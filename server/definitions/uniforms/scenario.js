const { schema, array, string } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class ScenarioUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
    }

    create() {
        return schema({
            keys: {
                scenarios: array({
                    items: string(),
                }),
            },
            required: ['scenarios'],
        })
    }
}
