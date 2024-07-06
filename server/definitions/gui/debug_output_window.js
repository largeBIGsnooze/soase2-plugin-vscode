const { schema, float, color } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DebugOutputWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                item_display_duration: float(),
                item_layout: super.layout(),
                item_font: this.cache.fonts,
                notification_text_color: color(),
                error_text_color: color(),
                item_background_color: color(),
            },
        })
    }
}
