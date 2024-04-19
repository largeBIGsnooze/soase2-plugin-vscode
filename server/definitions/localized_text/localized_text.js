const { object, string } = require('../data_types')

module.exports = class LocalizedText {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder) {}

    create() {
        return object({
            pkeys: {
                '.*': string(),
            },
            additionalProperties: false,
        })
    }
}
