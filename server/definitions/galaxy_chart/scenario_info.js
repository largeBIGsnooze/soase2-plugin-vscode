const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { schema, boolean, object, integer, enumerate, vector2i, string } = require('../data_types')

module.exports = class ScenarioInfo {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }
    create() {
        const getLocalisation = (key) => {
            try {
                return this.json?.data[key]?.startsWith(':') ? string() : this.cache.localisation
            } catch {
                return string()
            }
        }
        return schema({
            keys: {
                name: getLocalisation('name'),
                description: getLocalisation('description'),
                planet_counts: vector2i(),
                star_counts: vector2i(),
                has_wormholes: boolean(),
                has_npcs: boolean(),
                resources: enumerate({
                    items: ['scenario_options_view_resources_high', 'scenario_options_view_resources_medium', 'scenario_options_view_resources_low'],
                }),
                map_type: enumerate({ items: ['scenario_options_view_map_type_custom', 'scenario_options_view_map_type_generated'] }),
                desired_player_slots_configuration: object({
                    keys: {
                        player_count: integer(),
                        team_count: integer(),
                    },
                }),
                can_gravity_wells_move: boolean(),
            },
        })
    }
}
