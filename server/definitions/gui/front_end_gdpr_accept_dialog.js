const { schema, object, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndGdprAcceptDialog extends Definitions {
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
                                gdpr_accept_dialog_list_box: super.button(this.cache),
                                accept_button: super.button(this.cache),
                                decline_button: super.button(this.cache),
                                show_privacy_policy_button: super.button(this.cache),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
