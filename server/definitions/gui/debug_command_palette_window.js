const { schema, string, object, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugCommandPaletteWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                text_entry_box: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                autocomplete_list_box_container: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                autocomplete_list_box: object({
                    keys: {
                        layout: super.layout(),
                        no_actions_text: string(),
                        no_actions_text_color: color(),
                        multi_scope_action_text_color: color(),
                        normal_scope_action_text_color: color(),
                        debug_scope_action_text_color: color(),
                        item_name_layout: super.layout(),
                        item_mapping_layout: super.layout(),
                        item_mapping_background_fill_color: color(),
                        item_mapping_background_margins: super.margins(),
                    },
                }),
            },
        })
    }
}
