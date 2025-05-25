const { schema, object } = require('../data_types')

module.exports = class PlanetTrackUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    track_definition() {
        return object({
            keys: {
                tooltip_icon: this.cache.textures(),
                hud_icon: this.cache.textures(),
                name: this.cache.localisation,
                desc: this.cache.localisation,
                max_level_label: this.cache.localisation,
                current_level_label: this.cache.localisation,
            },
            required: ['hud_icon', 'tooltip_icon'],
        })
    }

    create() {
        return schema({
            keys: {
                planet_tracks: object({
                    keys: {
                        defense: this.track_definition(),
                        logistics: this.track_definition(),
                        commerce: this.track_definition(),
                        mining: this.track_definition(),
                        research: this.track_definition(),
                        surveying: this.track_definition(),
                        /* game_version v1.42.5 */
                        focus: this.track_definition(),
                        /* */
                        excavation: this.track_definition(),
                    },
                }),
            },
            required: ['planet_tracks'],
        })
    }
}
