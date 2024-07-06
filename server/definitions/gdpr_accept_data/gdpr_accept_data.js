const { schema, integer, string } = require('../data_types')

module.exports = class GdprAcceptData {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                version: integer(),
                policy_link: string(),
                message: this.cache.localisation,
            },
        })
    }
}
