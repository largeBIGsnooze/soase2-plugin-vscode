const { schema } = require('../data_types')
const ActionDataSource = require('../entities/action_data_source')

module.exports = class ActionUniform extends ActionDataSource {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                common_action_values: super.action_values_definition(this.json?.data?.common_action_values, '/common_action_values'),
            },
        })
    }
}
