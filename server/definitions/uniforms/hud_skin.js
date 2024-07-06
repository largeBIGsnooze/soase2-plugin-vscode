const { string, array, schema } = require('../data_types')

module.exports = class HudSkinUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                default_hud_skin_name: string(),
                // Hardcoded?
                hud_skin_names: array({
                    items: string(),
                }),
            },
            required: ['default_hud_skin_name', 'hud_skin_names'],
        })
    }
}
