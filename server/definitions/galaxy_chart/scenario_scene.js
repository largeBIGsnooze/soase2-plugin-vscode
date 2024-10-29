const { schema, object, vector2f } = require('../data_types')

module.exports = class ScenarioScene {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                random_skybox_filling: this.cache.random_skybox_fillings,
                random_fixture_filling: this.cache.random_fixture_fillings,
                camera: object({
                    keys: {
                        focal_x: vector2f(),
                        focal_y: vector2f(),
                        focal_z: vector2f(),
                        distance: vector2f(),
                        pitch: vector2f(),
                    },
                }),
            },
        })
    }
}
