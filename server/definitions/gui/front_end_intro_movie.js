const { schema, string } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndIntroMovie extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                video: string(),
                audio: this.cache.ogg,
            },
        })
    }
}
