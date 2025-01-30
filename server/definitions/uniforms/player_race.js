const loc_keys = require('../../loc_keys')
const { schema, string, array, object, integer, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class PlayerRaceUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    music_tracks_definition() {
        return object({
            required: ['music_tracks'],
            keys: {
                exhaustive_shuffle: boolean(),
                first_music_track_index: integer(),
                extra_music_tracks_pool_type: Definitions.music_pool_type(),
                music_tracks: array({
                    items: object({
                        keys: {
                            sound: this.cache.ogg,
                            weight: integer(),
                        },
                    }),
                }),
            },
        })
    }

    create() {
        return schema({
            required: ['races'],
            keys: {
                /* game_version v1.30.3 */
                overwrite_races: boolean(loc_keys.OVERWRITE_IDS),
                /* */
                races: array({
                    items: object({
                        required: ['localized_name', 'music', 'name'],
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                            portraits: array({
                                items: this.cache.player_portraits,
                                isUnique: true,
                            }),
                            icons: array({
                                items: this.cache.player_icons,
                                isUnique: true,
                            }),
                            music: object({
                                required: ['in_game_music_pools'],
                                keys: {
                                    in_game_music_pools: object({
                                        required: [
                                            'ambient',
                                            'battle_losing',
                                            'battle_neutral',
                                            'battle_winning',
                                            'early_game_losing',
                                            'early_game_neutral',
                                            'early_game_winning',
                                            'front_end',
                                            'game_lost',
                                            'game_won',
                                            'late_game_losing',
                                            'late_game_neutral',
                                            'late_game_winning',
                                            'loading',
                                            'mid_game_losing',
                                            'mid_game_neutral',
                                            'mid_game_winning',
                                        ],
                                        keys: {
                                            loading: this.music_tracks_definition(),
                                            ambient: this.music_tracks_definition(),
                                            front_end: this.music_tracks_definition(),
                                            early_game_neutral: this.music_tracks_definition(),
                                            early_game_winning: this.music_tracks_definition(),
                                            early_game_losing: this.music_tracks_definition(),
                                            mid_game_neutral: this.music_tracks_definition(),
                                            mid_game_winning: this.music_tracks_definition(),
                                            mid_game_losing: this.music_tracks_definition(),
                                            late_game_neutral: this.music_tracks_definition(),
                                            late_game_winning: this.music_tracks_definition(),
                                            late_game_losing: this.music_tracks_definition(),
                                            battle_neutral: this.music_tracks_definition(),
                                            battle_winning: this.music_tracks_definition(),
                                            battle_losing: this.music_tracks_definition(),
                                            game_won: this.music_tracks_definition(),
                                            game_lost: this.music_tracks_definition(),
                                        },
                                    }),
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
