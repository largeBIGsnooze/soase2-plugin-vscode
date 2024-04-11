const { schema, string, object } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugSpawnUnitWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                title_text: string(),
                initial_state: super.initial_state(),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        filter_box: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        filter_box: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        unit_list_box: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        player_index_drop_box: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
