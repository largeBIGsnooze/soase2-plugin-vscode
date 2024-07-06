const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DebugStartNpcAuctionWindow extends Definitions {
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
                        list_box: this.button2(),
                        start_button: this.button2(),
                    },
                }),
            },
        })
    }
}
