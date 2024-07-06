const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DropBoxListListBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background: {},
                not_selected_item_background: {
                    brush: 'basic_list_box_item_not_selected',
                },
                selected_item_background: {
                    brush: 'basic_list_box_item_selected',
                },
                font: 'ttsupermolotneue_condmed_14',
                text_color: 'EFEFEF',
                text_layout: {
                    margins: {
                        top: 2,
                        bottom: 5,
                        left: 12,
                        right: 16,
                    },
                },
                item_height: 38,
                item_margins: {
                    top: 0,
                    bottom: 0,
                    left: 1,
                    right: 0,
                },
                scroll_bar_layout: {
                    margins: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    },
                    horizontal_alignment: 'right',
                    width: 8,
                },
            },
        })
    }
}
