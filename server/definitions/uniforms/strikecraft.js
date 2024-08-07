const { schema, float, array, object, string } = require('../data_types')

module.exports = class StrikecraftUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                no_owner_carrier_self_destruct_duration: float(),
                strikecraft_kinds: array({
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
