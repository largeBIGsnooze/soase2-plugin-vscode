const loc_keys = require('../../loc_keys')
const { schema, array, object, string, boolean } = require('../data_types')

module.exports = class UnitTagUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            required: ['unit_tags'],
            keys: {
                /* game_version v1.30.3 */
                overwrite_unit_tags: boolean(loc_keys.OVERWRITE_IDS),
                /* */
                unit_tags: array({
                    items: object({
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                        },
                    }),
                }),
            },
        })
    }
}
