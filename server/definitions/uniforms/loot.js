const { schema, array, object, float, percentage, vector2f, integer, string, enumerate } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class LootUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                levels: array({
                    items: object({
                        keys: {
                            name: this.cache.localisation,
                            collection_duration: float(),
                            decay_duration: float(),
                            collection_range: float(),
                            spawn_position_radius_percentage_from_center: percentage(),
                            spawn_guardians_within_collection_range_scalar: vector2f(),
                        },
                        required: ['name', 'collection_duration', 'decay_duration', 'collection_range', 'spawn_position_radius_percentage_from_center', 'spawn_guardians_within_collection_range_scalar'],
                    }),
                }),
                random_loots: array({
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
                                                    items: float(),
                                                }),
                                                metal: array({
                                                    items: float(),
                                                }),
                                                crystal: array({
                                                    items: float(),
                                                }),
                                            },
                                        }),
                                        chance_for_exotics: percentage(),
                                        exotics: array({
                                            items: object({
                                                keys: {
                                                    weight: integer(),
                                                    bundles: array({
                                                        items: object({
                                                            keys: {
                                                                types: array({
                                                                    items: this.cache.exotics,
                                                                    isUnique: true,
                                                                }),
                                                                counts: array({
                                                                    items: float(),
                                                                }),
                                                            },
                                                        }),
                                                    }),
                                                },
                                            }),
                                        }),
                                        guardian_npc_name: string(),
                                        guardian_supply: vector2f(),
                                        guardian_units: object({
                                            keys: {
                                                random_units: Definitions.units(this.cache.units),
                                            },
                                        }),
                                        rotation_angle_variance: vector2f(),
                                    },
                                }),
                            }),
                            weight: integer(),
                        },
                    }),
                }),
            },
            required: ['levels'],
        })
    }
}
