const { schema, array, object, string, enumerate } = require('../data_types')

module.exports = class AttackTargetTypeGroupUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                attack_target_type_groups: array({
                    items: object({
                        keys: {
                            unit_attack_target_type_group_id: string(),
                            unit_attack_target_type_group: object({
                                keys: {
                                    types: array({
                                        items: enumerate({
                                            items: [
                                                'torpedo',
                                                'strikecraft',
                                                'corvette',
                                                'heavy',
                                                'capital',
                                                'starbase',
                                                'titan',
                                                'light',
                                                'lrm',
                                                'flak',
                                                'defense',
                                            ],
                                        }),
                                        isUnique: true,
                                    }),
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
