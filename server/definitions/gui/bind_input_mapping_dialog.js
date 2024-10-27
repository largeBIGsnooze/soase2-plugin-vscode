const { schema, object } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class BindInputMappingDialog extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_window: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                content_panel: super.content_panel(this.cache),
            },
        })
    }
}
