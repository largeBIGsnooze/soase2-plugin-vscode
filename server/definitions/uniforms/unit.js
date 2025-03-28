const { schema, array, object, string, float, vector2f, boolean } = require('../data_types')

module.exports = class UnitUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            required: [
                'add_new_phase_lane_max_direct_distance',
                'add_new_phase_lane_min_jump_distance',
                'ai',
                'buff_agent_units_by_effect_size',
                'can_build_items_in_combat',
                'culture_provider_buff_agent_unit',
                'damage_scalar_per_additive_defensive_value',
                'default_gravity_well',
                'default_phase_lane',
                'default_rally_point',
                'dialogue_scared_supply_ratio_threshold',
                'dialogue_scared_when_crippled_enemy_supply_threshold',
                'dialogue_smug_supply_ratio_threshold',
                'disable_weapons_while_channeling_ability_mutation',
                'estimated_incoming_damage_dead_soon_scalar',
                'max_hyperspace_charge_time_unit_count',
                'phase_lane_marked_for_delete_duration_before_release',
                'recently_bombed_time_threshold',
                'recently_damaged_time_threshold',
                'resurrectable_unit_types',
                'scuttle_duration',
                'spawn_in_fixture_build_radius_scalars',
                'spawn_in_fixture_move_area_radius_scalars',
                'starbase_tag',
                'unit_names',
            ],
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
                buff_agent_units_by_effect_size: object({
                    keys: {
                        small_unit: this.cache.units,
                        medium_unit: this.cache.units,
                        large_unit: this.cache.units,
                    },
                }),
                culture_provider_buff_agent_unit: this.cache.culture_provider_units,
                phase_lane_marked_for_delete_duration_before_release: float(),
                disable_weapons_while_channeling_ability_mutation: this.cache.mutations,
                dialogue_scared_when_crippled_enemy_supply_threshold: float(),
                dialogue_scared_supply_ratio_threshold: float(),
                dialogue_smug_supply_ratio_threshold: float(),
                default_gravity_well: this.cache.gravity_well_units,
                default_phase_lane: this.cache.phase_lane_units,
                default_rally_point: this.cache.rally_point_units,
                scuttle_duration: float(),
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
                    required: ['auto_order_engagement_range', 'pathfinding_threat_avoidance_base', 'pathfinding_threat_avoidance_scalar'],
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
