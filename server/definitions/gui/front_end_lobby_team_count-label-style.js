const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEndLobbyTeamCountLabelStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                font: this.cache.fonts,
                font_alignment: super.alignment(),
                text_color: this.cache.colors,
                text_layout: super.layout(),
            },
        })
    }
}
