const { schema, object, color } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudPlayerVictoryDialog extends Definitions {
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
                background: super.window_frame(this.cache),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        status_label: super.label(this.cache),
                        phrase_label: super.label(this.cache),
                        quit_button: super.button(this.cache),
                        continue_button: super.button(this.cache),
                    },
                }),
            },
        })
    }
}
