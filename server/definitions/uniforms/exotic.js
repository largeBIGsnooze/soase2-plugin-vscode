const { Log } = require('../../utils/logger')
const { schema, array, object, string } = require('../data_types')

module.exports = class ExoticUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
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
