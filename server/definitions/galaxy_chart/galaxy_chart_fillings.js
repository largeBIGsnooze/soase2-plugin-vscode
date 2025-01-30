const { schema } = require('../data_types')
const GalaxyGeneratorUniform = require('../uniforms/galaxy_generator')

module.exports = class GalaxyChartFillings extends GalaxyGeneratorUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super({}, diagnostics, gameInstallationFolder, cache)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                moon_fillings: super.moon_fillings_definition(),
            },
        })
    }
}
