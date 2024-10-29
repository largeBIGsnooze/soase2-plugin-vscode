const { schema, float } = require('../data_types')

module.exports = class CultureUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {}

    create() {
        return schema({
            required: ['propagate_culture_cutoff_rate'],
            keys: {
                propagate_culture_cutoff_rate: float(),
            },
        })
    }
}
