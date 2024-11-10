const loc_keys = require('../../loc_keys')
const { schema, array, object, string, integer, boolean } = require('../data_types')

module.exports = class StrikecraftUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            required: ['no_owner_carrier_self_destruct_duration', 'strikecraft_kinds'],
            keys: {
                overwrite_strikecraft_kinds: boolean(loc_keys.OVERWRITE_IDS),
                no_owner_carrier_self_destruct_duration: integer(),
                strikecraft_kinds: array({
                    items: object({
                        required: ['localized_name', 'name'],
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
