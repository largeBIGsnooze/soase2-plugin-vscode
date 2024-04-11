const { schema, object, array, enumerate, boolean, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DeathSequence extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                mesh_not_visible_time: float(),
                events: array({
                    items: object({
                        keys: {
                            attached_to_unit: boolean(),
                            location: enumerate({
                                items: ['center', 'surface'],
                            }),
                            time: float(),
                            particle_effects: array({
                                items: this.cache.particle_effects,
                                isUnique: true,
                            }),
                            sounds: array({
                                items: this.cache.sounds,
                                isUnique: true,
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
