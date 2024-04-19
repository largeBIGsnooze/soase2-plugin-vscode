const { schema, boolean, float, enumerate } = require('../data_types')

module.exports = class Sound {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                is_positionable: boolean(),
                is_looping: boolean(),
                is_streaming: boolean(),
                min_attenuation_distance: float(),
                data: this.cache.ogg,
                sound_group: enumerate({ items: ['exhaust', 'ability', 'hit_hull', 'weapon_muzzle_light', 'weapon_muzzle_medium', 'weapon_muzzle_heavy', 'hyperspace_exit', 'hyperspace_enter', 'hyperspace_charge'] }),
            },
        })
    }
}
