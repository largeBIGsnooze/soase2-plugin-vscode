const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEndLobbyChatWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background: super.background(this.cache.textures),
                title_label: super.label(this.cache),
                minimize_button: super.button(this.cache),
                chat_entry_box: super.entry_box(this.cache.textures),
                chat_messages_box: super.messages_box(this.cache.localisation, this.cache.colors),
            },
        })
    }
}
