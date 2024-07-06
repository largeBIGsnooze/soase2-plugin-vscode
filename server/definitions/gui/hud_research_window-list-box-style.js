const { schema, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudResearchWindowListBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                item_vertical_gap: float(),
                item_margins: super.margins(),
                scroll_bar_layout: super.layout(),
                font: this.cache.fonts,
            },
        })
    }
}
