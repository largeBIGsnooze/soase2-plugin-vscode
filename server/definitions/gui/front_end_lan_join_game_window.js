const { schema, object, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndLanJoinGameWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_window: object({
                    keys: {
                        components: array({
                            items: super.component(this.cache.textures),
                        }),
                    },
                }),
                ip_address_label: super.label(this.cache.localisation),
                ip_address_entry_box: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                join_game_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                cancel_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
            },
        })
    }
}
