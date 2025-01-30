const loc_keys = require('../../loc_keys')
const { array, object, string, schema, float, boolean } = require('../data_types')

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
                /* game_version v1.30.3 */
                overwrite_random_skybox_fillings: boolean(loc_keys.OVERWRITE_IDS),
                /* */
                dark_skybox: this.cache.skyboxes,
                random_skybox_fillings: this.random_skybox_fillings(),
            },
        })
    }
}
