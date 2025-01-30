const loc_keys = require('../../loc_keys')
const { schema, array, object, string, boolean } = require('../data_types')

module.exports = class UnitBuildUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                /* game_version v1.30.3 */
                overwrite_build_kinds: boolean(loc_keys.OVERWRITE_IDS),
                /* */
                build_kinds: array({
                    items: object({
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                        },
                        required: ['name', 'localized_name'],
                    }),
                }),
            },
            required: ['build_kinds'],
        })
    }
}
