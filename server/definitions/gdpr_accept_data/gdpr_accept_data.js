const { schema, integer, string } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class GdprAcceptData extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
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
