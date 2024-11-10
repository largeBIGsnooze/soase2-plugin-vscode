const loc_keys = require('../../loc_keys')
const { schema, array, object, float, percentage, vector2f, integer, string, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class LootUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    exotics_definition() {
        return array({
            items: object({
                required: ['bundles', 'weight'],
                keys: {
                    weight: integer(),
                    bundles: array({
                        items: object({
                            required: ['counts', 'types'],
                            keys: {
                                types: array({
                                    items: this.cache.exotics,
                                    isUnique: true,
                                }),
                                counts: array({
                                    items: integer(),
                                }),
                            },
                        }),
                    }),
                },
            }),
        })
    }

    random_loots_definition() {
        return array({
            items: object({
                keys: {
                    levels: array({
                        items: object({
                            keys: {
                                loot_units: array({
                                    items: this.cache.loot,
                                    isUnique: true,
                                }),
                                experience_given: float(),
                                chance_for_two_assets: percentage(),
                                chance_for_three_assets: percentage(),
                                assets: object({
                                    keys: {
                                        credits: array({
                                            items: integer(),
                                        }),
                                        metal: array({
                                            items: integer(),
                                        }),
                                        crystal: array({
                                            items: integer(),
                                        }),
                                    },
                                }),
                                chance_for_exotics: percentage(),
                                exotics: this.exotics_definition(),
                                guardian_npc_name: string(),
                                guardian_supply: vector2f(),
                                guardian_units: Definitions.spawn_units_definition(this.cache),
                                rotation_angle_variance: vector2f(),
                            },
                        }),
                    }),
                    weight: integer(),
                },
            }),
        })
    }

    create() {
        return schema({
            keys: {
                overwrite_random_loots: boolean(loc_keys.OVERWRITE_IDS),
                levels: array({
                    items: object({
                        required: [
                            'collection_duration',
                            'collection_range',
                            'decay_duration',
                            'name',
                            'spawn_guardians_within_collection_range_scalar',
                            'spawn_position_radius_percentage_from_center',
                        ],
                        keys: {
                            name: this.cache.localisation,
                            collection_duration: float(),
                            decay_duration: float(),
                            collection_range: float(),
                            spawn_position_radius_percentage_from_center: percentage(),
                            spawn_guardians_within_collection_range_scalar: vector2f(),
                        },
                    }),
                }),
                random_loots: this.random_loots_definition(),
            },
            required: ['levels'],
        })
    }
}
