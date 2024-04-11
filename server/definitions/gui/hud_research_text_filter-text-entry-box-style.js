const { schema, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudResearchTextFilterTextEntryBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                font: this.cache.fonts,
                selected_text_color: color(),
                selected_rect_fill_color: color(),
            },
        })
    }
}
