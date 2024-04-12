const { schema, object, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndAddModDialog extends Definitions {
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
                                title_label: super.label(this.cache),
                                mods_list_box: object({
                                    keys: {
                                        layout: super.layout(),
                                    },
                                }),
                                add_mod_button: super.button(this.cache),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
