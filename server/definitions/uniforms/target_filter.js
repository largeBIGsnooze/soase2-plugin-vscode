const { schema, array, object, string, enumerate } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class TargetFilterUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                common_target_filters: array({
                    items: object({
                        keys: {
                            target_filter_id: string(),
                            target_filter: object({
                                keys: {
                                    unit_types: array({
                                        items: this.cache.ship_tags,
                                        isUnique: true,
                                    }),
                                    ownerships: super.getOwnerships,
                                    constraints: array({
                                        items: object({
                                            keys: {
                                                constraint_type: super.getConstraintType,
                                                constraints: array({
                                                    items: object({
                                                        keys: {
                                                            constraint_type: super.getConstraintType,
                                                            constraint: object({
                                                                keys: {
                                                                    constraint_type: super.getConstraintType,
                                                                },
                                                            }),
                                                        },
                                                    }),
                                                }),
                                            },
                                        }),
                                    }),
                                    exemptions: array({
                                        items: enumerate({ items: ['is_fully_unbuilt', 'is_dead'] }),
                                        isUnique: true,
                                    }),
                                },
                            }),
                        },
                    }),
                }),
                in_phase_space_mutation: this.cache.mutations,
            },
        })
    }
}
