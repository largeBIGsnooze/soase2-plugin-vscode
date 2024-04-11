const { schema, float } = require('../data_types')

module.exports = class FutureOrbitUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {}

    create() {
        return schema({
            keys: {
                total_frame_range_in_seconds: float(),
                frame_interval_in_seconds: float(),
            },
        })
    }
}
