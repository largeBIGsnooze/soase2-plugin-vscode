const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class GravityWellTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                font: this.cache.fonts,
                text_color: this.cache.colors,
                font_alignment: super.alignment(),
                last_detected_time: super.label_form(this.cache),
            },
        })
    }
}
