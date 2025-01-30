const loc_keys = require('../../loc_keys')
const { schema, string, object, array, boolean, float, color, enumerate } = require('../data_types')

module.exports = class SpecialOperationUnit {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                /* game_version v1.30.3 */
                overwrite_special_operation_unit_kinds: boolean(loc_keys.OVERWRITE_IDS),
                /* */
                special_operation_unit_kinds: array({
                    items: object({
                        keys: {
                            name: string(),
                            definition: object({
                                keys: {
                                    is_ever_controllable: boolean(),
                                    is_garrison_unit: boolean(),
                                    will_notify_enemy_player_when_entering_gravity_well: boolean(),
                                    cannot_move_out_of_gravity_well: boolean(),
                                    is_detected_when_hyperspacing_in: boolean(),
                                    is_insurgent_unit: boolean(),
                                    should_be_in_planet_defenses_pip_group: boolean(),
                                    max_move_distance_from_owner_planet: float(),
                                    name: this.cache.localisation,
                                    description: this.cache.localisation,
                                    hud_icon: this.cache.textures(),
                                    main_view_icon: object({
                                        keys: {
                                            icon: this.cache.textures(),
                                            mesh_center_offset: float(),
                                        },
                                        required: ['icon', 'mesh_center_offset'],
                                    }),
                                    main_view_icon_fill_color: color(),
                                    duration_start_condition: enumerate({
                                        items: ['when_planet_is_not_enemy', 'when_gravity_well_has_no_attackable_enemy_units', 'immediately'],
                                    }),
                                    will_give_experience: boolean(),
                                    duration: float(),
                                },
                                required: ['is_ever_controllable'],
                            }),
                        },
                    }),
                }),
            },
            required: ['special_operation_unit_kinds'],
        })
    }
}
