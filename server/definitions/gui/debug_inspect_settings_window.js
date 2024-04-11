const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugInspectSettingsWindow extends Definitions {
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
                        reset_settings_button: super.button2(),
                        filter_box: super.button2(),
                        reflect_box: super.button2(),
                    },
                }),
            },
        })
    }
}
