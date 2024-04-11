const { schema, object, color, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndJoinServerWithGameCodeDialog extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                dim_color: color(),
                background_window: object({
                    keys: {
                        layout: super.layout(),
                        content_panel: object({
                            keys: {
                                layout: super.layout(),
                                components: array({
                                    items: super.component(this.cache.textures),
                                }),
                                title_label: super.label(this.cache.localisation),
                                game_code_label: super.label(this.cache.localisation),
                                game_code_box: super.box(),
                                join_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                cancel_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
