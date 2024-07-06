const { EntityParser } = require('../../data/file-handler')
const { schema, array, object, string, float, vector2f, boolean } = require('../data_types')

module.exports = class UnitUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.entityReader = new EntityParser(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                raw_distance_per_gravity_well_distance: float(),
                unit_names: array({
                    items: object({
                        keys: {
                            group_name: string(),
                            localized_text: object({
                                keys: {
                                    id_prefix: string(),
                                },
                            }),
                        },
                    }),
                }),
                buff_agent_unit: this.entityReader.parseBuffAgentUnit(),
                default_gravity_well: this.entityReader.parseGravityWellUnit(),
                default_phase_lane: this.entityReader.parsePhaseLaneUnit(),
                default_rally_point: this.entityReader.parseRallyPointUnit(),
                scuttle_duration: float(),
                max_special_operation_unit_idle_time: float(),
                damage_scalar_per_additive_defensive_value: float(),
                recently_damaged_time_threshold: float(),
                recently_bombed_time_threshold: float(),
                spawn_in_fixture_move_area_radius_scalars: vector2f(),
                spawn_in_fixture_build_radius_scalars: vector2f(),
                add_new_phase_lane_max_direct_distance: float(),
                add_new_phase_lane_min_jump_distance: float(),
                max_hyperspace_charge_time_unit_count: float(),
                can_build_items_in_combat: boolean(),
                estimated_incoming_damage_dead_soon_scalar: float(),
                ai: object({
                    keys: {
                        pathfinding_threat_avoidance_base: float(),
                        pathfinding_threat_avoidance_scalar: float(),
                        auto_order_engagement_range: float(),
                    },
                }),
                resurrectable_unit_types: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                starbase_tag: this.cache.ship_tags,
            },
        })
    }
}
