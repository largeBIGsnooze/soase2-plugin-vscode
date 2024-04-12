const { schema, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndWelcomeDialog extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                dim_color: color(),
                background_window: super.background_window(this.cache),
            },
        })
    }
}
