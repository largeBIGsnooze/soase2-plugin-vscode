const { schema, object, color, array } = require('../data_types')

module.exports = class PlayerColorUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                null_player_colors: this.cache.color_groups,
                minimal_team_color_primary_color: color(),
                player_alliance_relationship_colors: object({
                    required: ['ally', 'enemy', 'none', 'self'],
                    keys: {
                        self: this.cache.color_groups,
                        ally: this.cache.color_groups,
                        enemy: this.cache.color_groups,
                        none: this.cache.color_groups,
                    },
                }),
                playable_player_color_groups: array({
                    items: this.cache.color_groups,
                    isUnique: true,
                }),
            },
            required: [
                'null_player_colors',
                'minimal_team_color_primary_color',
                'player_alliance_relationship_colors',
                'playable_player_color_groups',
            ],
        })
    }
}
