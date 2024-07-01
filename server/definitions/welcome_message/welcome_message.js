const { schema, integer, string } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class WelcomeMessage extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                version: integer(),
                sins2_link: string(),
                discord_link: string(),
                message: this.cache.localisation,
            },
        })
    }
}
