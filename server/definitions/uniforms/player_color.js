const { schema, object, color, array } = require('../data_types')

module.exports = class PlayerColorUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    colors() {
        return object({
            keys: {
                primary: color(),
                main_view_planet_background: color(),
                secondary: color(),
            },
        })
    }

    create() {
        return schema({
            keys: {
                null_player_colors: this.colors(),
                minimal_team_color_primary_color: color(),
                player_alliance_relationship_colors: object({
                    keys: {
                        self: this.colors(),
                        ally: this.colors(),
                        enemy: this.colors(),
                        none: this.colors(),
                    },
                }),
                playable_player_color_groups: array({
                    items: this.cache.color_groups,
                    isUnique: true,
                }),
            },
            required: ['null_player_colors', 'minimal_team_color_primary_color', 'player_alliance_relationship_colors', 'playable_player_color_groups'],
        })
    }
}
