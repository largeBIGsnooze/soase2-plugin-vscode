const { schema, integer, array } = require('../data_types')

module.exports = class ResearchUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                max_tier_count: integer(),
                per_tier_column_count: integer(),
                tier_names: array({
                    items: this.cache.localisation,
                    isUnique: true,
                }),
            },
            required: ['max_tier_count', 'per_tier_column_count', 'tier_names'],
        })
    }
}
