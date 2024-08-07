const { schema, object } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEndWatchingViewWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background_window: super.background_window(this.cache),
                overlay_window: object({
                    keys: {},
                }),
                layout: super.layout(),
                recorded_game_picker_window_frame: super.window_frame(this.cache),
                watch_replay_button: super.button(this.cache),
            },
        })
    }
}
