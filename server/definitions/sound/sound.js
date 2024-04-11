const { schema, boolean, float } = require('../data_types')

module.exports = class Sound {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                is_positionable: boolean(),
                is_looping: boolean(),
                is_streaming: boolean(),
                min_attenuation_distance: float(),
                data: this.cache.ogg,
            },
        })
    }
}
