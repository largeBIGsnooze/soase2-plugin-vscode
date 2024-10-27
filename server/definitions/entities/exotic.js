const { schema, float, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Exotic {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                tooltip_icon: this.cache.textures(),
                small_icon: this.cache.textures(),
                large_icon: this.cache.textures(),
                picture: this.cache.textures(),
                name: this.cache.localisation,
                description: this.cache.localisation,
                ai_trade_value: float(),
                pip_color: color(),
                insufficient_exotics_player_sound_id: Definitions.sound_ids(),
            },
            required: ['ai_trade_value', 'description', 'large_icon', 'name', 'picture', 'small_icon', 'tooltip_icon'],
        })
    }
}
