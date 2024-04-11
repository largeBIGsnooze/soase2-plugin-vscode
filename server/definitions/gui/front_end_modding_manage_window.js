const { schema, object } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndModdingManageWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                mods_list_box: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                mod_panel: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                move_mod_up_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                move_mod_down_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                apply_changes_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                no_changes_to_apply_description: super.label_form2(this.cache.localisation, this.cache.colors),
                installing_mods_description: super.label_form2(this.cache.localisation, this.cache.colors),
            },
        })
    }
}
