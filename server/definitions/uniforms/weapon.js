const { schema, array, object, string, float } = require('../data_types')

module.exports = class WeaponUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            required: ['weapon_tags', 'recently_fired_time_threshold'],
            keys: {
                weapon_tags: array({
                    items: object({
                        required: ['name', 'localized_name'],
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                        },
                    }),
                }),
                recently_fired_time_threshold: float(),
            },
        })
    }
}
