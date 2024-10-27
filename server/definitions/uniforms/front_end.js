const { schema, object, version } = require('../data_types')

module.exports = class FrontEndUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {}

    create() {
        return schema({
            keys: object({
                keys: {},
            }),
        })
    }
}
