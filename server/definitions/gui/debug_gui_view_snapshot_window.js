const { schema, string, object, percentage } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugGuiViewSnapshotWindow extends Definitions {
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
                        split_panel: object({
                            keys: {
                                layout: super.layout(),
                                orientation: super.orientation(),
                                split_percentage: percentage(),
                                item_list_box: object({
                                    keys: {
                                        style: super.style(),
                                    },
                                }),
                                reflect_box: object({
                                    keys: {},
                                }),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
