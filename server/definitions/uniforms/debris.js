const { schema, array, object, string } = require('../data_types')

module.exports = class DebrisUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                groups: array({
                    items: array({
                        items: [
                            string(),
                            object({
                                keys: {
                                    sizes: object({
                                        keys: {
                                            small_debris: array({
                                                items: this.cache.units,
                                            }),
                                            large_debris: array({
                                                items: this.cache.units,
                                            }),
                                        },
                                        required: ['small_debris', 'large_debris'],
                                    }),
                                },
                                required: ['sizes'],
                            }),
                        ],
                    }),
                }),
            },
            required: ['groups'],
        })
    }
}
