const { schema, object } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndModdingBrowseLocalFilesystemWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                mods_list_box: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                mod_panel: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
            },
        })
    }
}
