const { schema, float, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudFeedbackWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                display_duration_ms: float(),
                fade_duration_ms: float(),
                font: this.cache.fonts,
                text_color: color(),
                background_color: color(),
                background_margins: super.margins(),
            },
        })
    }
}
