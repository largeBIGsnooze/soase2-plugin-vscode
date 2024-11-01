const { string, object, schema, enumerate } = require('../data_types')
module.exports = class ModMetaData {
    static boilerPlate = (display_name) => ({
        compatibility_version: 2,
        display_name: display_name,
        display_version: '0.0.0',
        short_description: '',
        long_description: '',
        logos: {
            small_logo: `${display_name}_small.png`,
            large_logo: `${display_name}_large.png`,
        },
    })
    constructor({}, diagnostics, gameInstallationFolder, cache) {}

    create() {
        return schema({
            keys: {
                compatibility_version: enumerate({ items: [2, 3], isIntType: true }),
                display_name: string(),
                display_version: string(),
                short_description: string(),
                long_description: string(),
                logos: object({
                    required: ['small_logo', 'large_logo'],
                    keys: {
                        small_logo: string(),
                        large_logo: string(),
                    },
                }),
            },
        })
    }
}
