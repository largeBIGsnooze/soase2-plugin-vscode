const { schema, float, array, boolean, object, integer, enumerate, string, vector2f } = require('../data_types')

module.exports = class GalaxyChart {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    galaxy_chart_phase_lane_definition() {
        return array({
            items: object({
                required: ['id', 'node_a', 'node_b'],
                keys: {
                    id: integer(),
                    node_a: integer(),
                    node_b: integer(),
                    type: enumerate({
                        items: ['normal', 'star', 'wormhole'],
                    }),
                },
            }),
        })
    }
    galaxy_chart_node_ownership_definition() {
        return object({
            keys: {
                are_secondary_fixtures_owned: boolean(),
                npc_filling_name: string(),
                npc_filling_type: enumerate({
                    items: ['militia', 'guardian', 'enemy_faction', 'friendly_faction'],
                }),
                player_index: integer(),
            },
        })
    }
    child_nodes_definition(depth = 0, maxDepth = 2) {
        if (depth > maxDepth) return {}
        return object({
            required: ['filling_name', 'id'],
            keys: {
                /* game_version v1.32.0 */
                artifact_name: string(),
                /* */
                chance_of_first_planet_bonus: float(),
                chance_of_loot: float(),
                chance_of_retrograde_orbit: float(),
                chance_of_second_planet_bonus: float(),
                child_nodes: array({
                    items: this.child_nodes_definition(depth + 1, maxDepth),
                }),
                design_name: string(),
                filling_name: string(),
                has_artifact: boolean(),
                id: integer(),
                ignore_orbit_overlap_checks: boolean(),
                inherit_original_parent_orbit_direction: boolean(),
                loot_level: integer(),
                orbit_speed_scalar: float(),
                original_parent_id: integer(),
                ownership: this.galaxy_chart_node_ownership_definition(),
                position: vector2f(),
                primary_fixture_override_name: string(),
                rotation: float(),
                sync_orbit_to_parent: boolean(),
            },
        })
    }

    create() {
        return schema({
            required: ['phase_lanes', 'root_nodes', 'skybox'],
            keys: {
                phase_lanes: this.galaxy_chart_phase_lane_definition(),
                recommended_team_count: integer(),
                root_nodes: array({
                    items: this.child_nodes_definition(),
                }),
                skybox: string(),
            },
        })
    }
}
