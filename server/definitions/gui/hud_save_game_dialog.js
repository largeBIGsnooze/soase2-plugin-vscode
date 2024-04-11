const { schema, object, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudSaveGameDialog extends Definitions {
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
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        background: super.background(this.cache.textures),
                        name_text_entry_box: super.entry_box(this.cache.textures),
                        cancel_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        save_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        overwrite_warning_label: super.label(this.cache.localisation),
                    },
                }),
            },
        })
    }
}
