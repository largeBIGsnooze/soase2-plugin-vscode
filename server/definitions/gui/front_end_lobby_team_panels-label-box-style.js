const { schema, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndLobbyTeamPanelsListBoxStyle extends Definitions {
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
            },
        })
    }
}
