const loc_keys = require('../../loc_keys')
const { schema, array, boolean } = require('../data_types')

module.exports = class TutorialUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                /* game_version v1.30.3 */
                overwrite_tutorials: boolean(loc_keys.OVERWRITE_IDS),
                /* */
                tutorials: array({
                    items: this.cache.scenarios,
                    isUnique: true,
                }),
            },
            required: ['tutorials'],
        })
    }
}
