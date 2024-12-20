const { array, object, string, schema, float } = require('../data_types')

module.exports = class RandomSkyboxFillingUniforms {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    random_skybox_fillings() {
        return array({
            items: object({
                required: ['filling', 'name'],
                keys: {
                    name: string(),
                    filling: object({
                        keys: {
                            items: array({
                                items: object({
                                    keys: {
                                        skybox: this.cache.skyboxes,
                                        probability: float(),
                                    },
                                }),
                            }),
                        },
                    }),
                },
            }),
        })
    }

    create() {
        return schema({
            required: ['random_skybox_fillings', 'dark_skybox'],
            keys: {
                dark_skybox: this.cache.skyboxes,
                random_skybox_fillings: this.random_skybox_fillings(),
            },
        })
    }
}
