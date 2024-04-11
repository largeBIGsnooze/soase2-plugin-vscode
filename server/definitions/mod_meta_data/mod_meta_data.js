const { integer, string, object, schema } = require('../data_types')
const { LoremIpsum } = require('lorem-ipsum')
module.exports = class ModMetaData {
    static boilerPlate = (display_name) => ({
        compatibility_version: 1,
        display_name: display_name,
        display_version: '0.0.0',
        short_description: new LoremIpsum().generateWords(5),
        long_description: new LoremIpsum().generateWords(30),
        logos: {
            small_logo: `${display_name}_small.png`,
            large_logo: `${display_name}_large.png`,
        },
    })
    constructor({}, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                compatibility_version: integer(),
                display_name: string(),
                display_version: string(),
                short_description: string(),
                long_description: string(),
                logos: object({
                    keys: {
                        small_logo: this.cache.modLogos,
                        large_logo: this.cache.modLogos,
                    },
                }),
            },
        })
    }
}
