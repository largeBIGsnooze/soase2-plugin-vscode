const { schema, boolean, object, integer, enumerate, vector2i } = require('../data_types')

module.exports = class ScenarioInfo {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                name: this.cache.localisation,
                description: this.cache.localisation,
                planet_counts: vector2i(),
                star_counts: vector2i(),
                has_wormholes: boolean(),
                has_npcs: boolean(),
                resources: enumerate({ items: ['scenario_options_view_resources_high'] }),
                map_type: enumerate({ items: ['scenario_options_view_map_type_custom'] }),
                desired_player_slots_configuration: object({
                    keys: {
                        player_count: integer(),
                        team_count: integer(),
                    },
                }),
            },
        })
    }
}
