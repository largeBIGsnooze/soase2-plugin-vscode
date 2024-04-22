const { array, object, string, schema, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class RandomSkyboxFillingUniforms extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    random_skybox_fillings() {
        return array({
            items: object({
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
            keys: {
                random_skybox_fillings: this.random_skybox_fillings(),
            },
            required: ['random_skybox_fillings'],
        })
    }
}
