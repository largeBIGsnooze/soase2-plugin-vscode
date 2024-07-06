const { schema, integer, string } = require('../data_types')

module.exports = class WelcomeMessage {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
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
