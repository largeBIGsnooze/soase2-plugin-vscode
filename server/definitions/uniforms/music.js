const { schema, float } = require('../data_types')

module.exports = class MusicUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                default_player_definition: this.cache.players,
                music_transition_duration: float(),
            },
        })
    }
}
