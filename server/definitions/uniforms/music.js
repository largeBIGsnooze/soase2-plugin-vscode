const { schema, object, array, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class MusicUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            required: ['music_transition_duration', 'in_game_musics', 'in_game_music_duration', 'loading_music', 'front_end_views_music'],
            keys: {
                music_transition_duration: float(),
                in_game_musics: array({
                    items: this.cache.ogg,
                    isUnique: true,
                }),
                in_game_music_duration: float(),
                loading_music: this.cache.ogg,
                front_end_views_music: object({
                    required: ['single_player', 'multi_player', 'lan', 'watching', 'modding'],
                    keys: {
                        single_player: this.cache.ogg,
                        multi_player: this.cache.ogg,
                        lan: this.cache.ogg,
                        watching: this.cache.ogg,
                        modding: this.cache.ogg,
                    },
                }),
            },
        })
    }
}
