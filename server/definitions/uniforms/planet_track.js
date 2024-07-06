const { schema, object } = require('../data_types')

module.exports = class PlanetTrackUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    track() {
        return object({
            keys: {
                tooltip_icon: this.cache.textures,
                hud_icon: this.cache.textures,
                name: this.cache.localisation,
                desc: this.cache.localisation,
                max_level_label: this.cache.localisation,
                current_level_label: this.cache.localisation,
            },
            required: ['tooltip_icon', 'hud_icon', 'name', 'desc', 'max_level_label', 'current_level_label'],
        })
    }

    create() {
        return schema({
            keys: {
                planet_tracks: object({
                    keys: {
                        defense: this.track(),
                        logistics: this.track(),
                        commerce: this.track(),
                        mining: this.track(),
                        excavation: this.track(),
                    },
                }),
            },
            required: ['planet_tracks'],
        })
    }
}
