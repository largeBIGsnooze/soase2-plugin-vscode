const loc_keys = require('../../loc_keys')
const { schema, array, object, string, boolean } = require('../data_types')

module.exports = class ExoticUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                overwrite_type_datas: boolean(loc_keys.OVERWRITE_IDS),
                type_datas: array({
                    items: object({
                        keys: {
                            name: string(),
                            entity: this.cache.exotic_entities,
                        },
                    }),
                }),
            },
        })
    }
}
