const loc_keys = require('../../loc_keys')
const { schema, array, object, string, boolean } = require('../data_types')

module.exports = class UnitMutationUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    mutation() {
        return object({
            keys: {
                enabling_mutation: this.cache.mutations,
                disabling_mutations: array({
                    items: this.cache.mutations,
                    isUnique: true,
                }),
            },
        })
    }

    create() {
        return schema({
            required: ['mutations', 'permission_infos', 'suppressors'],
            keys: {
                overwrite_mutations: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_permission_infos: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_suppressors: boolean(loc_keys.OVERWRITE_IDS),
                mutations: array({
                    items: object({
                        keys: {
                            name: string(),
                            localized_name: this.cache.localisation,
                            description: this.cache.localisation,
                            is_positive: boolean(),
                            show_in_buff_tooltip: boolean(),
                        },
                        required: ['name', 'localized_name', 'is_positive'],
                    }),
                }),
                permission_infos: object({
                    keys: {
                        can_use_weapons: this.mutation(),
                        can_hyperspace: this.mutation(),
                        can_be_targeted_by_allies: this.mutation(),
                        can_be_targeted_by_enemies: this.mutation(),
                        can_be_damaged: this.mutation(),
                        can_planet_be_damaged: this.mutation(),
                        can_have_hull_restored: this.mutation(),
                        can_have_armor_restored: this.mutation(),
                        can_use_abilities_when_crippled: this.mutation(),
                        can_create_retargeting_torpedoes: this.mutation(),
                        can_have_shields_bypassed: this.mutation(),
                        can_have_shields_restored: this.mutation(),
                        can_use_weapons_when_crippled: this.mutation(),
                        can_have_shields_burst_restored: this.mutation(),
                        can_passively_regenerate_hull: this.mutation(),
                        can_passively_regenerate_armor: this.mutation(),
                        can_passively_regenerate_shields: this.mutation(),
                        can_use_active_abilities: this.mutation(),
                        can_update_build_progress: this.mutation(),
                        can_be_colonized: this.mutation(),
                        can_launch_or_dock_strikecraft: this.mutation(),
                        can_update_unit_production: this.mutation(),
                    },
                    required: [
                        'can_hyperspace',
                        'can_be_targeted_by_allies',
                        'can_be_targeted_by_enemies',
                        'can_be_damaged',
                        'can_planet_be_damaged',
                        'can_have_hull_restored',
                        'can_have_armor_restored',
                        'can_have_shields_bypassed',
                        'can_have_shields_restored',
                        'can_passively_regenerate_hull',
                        'can_passively_regenerate_armor',
                        'can_passively_regenerate_shields',
                        'can_use_active_abilities',
                        'can_update_build_progress',
                        'can_be_colonized',
                        'can_launch_or_dock_strikecraft',
                        'can_update_unit_production',
                    ],
                }),
                suppressors: array({
                    items: object({
                        keys: {
                            suppressing_mutation: this.cache.mutations,
                            suppressed_mutations: array({
                                items: this.cache.mutations,
                                isUnique: true,
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
