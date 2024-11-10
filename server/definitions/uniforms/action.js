const loc_keys = require('../../loc_keys')
const { schema, boolean } = require('../data_types')
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
                overwrite_common_action_values: boolean(loc_keys.OVERWRITE_IDS),
                common_action_values: super.action_values_definition(this.json?.data?.common_action_values, '/common_action_values'),
            },
        })
    }
}
