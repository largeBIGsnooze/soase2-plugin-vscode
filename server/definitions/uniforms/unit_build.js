const { schema, array, object, string } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class UnitBuildUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                build_kinds: array({
                    items: object({
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                        },
                        required: ['name', 'localized_name'],
                    }),
                }),
            },
            required: ['build_kinds'],
        })
    }
}
