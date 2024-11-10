const loc_keys = require('../../loc_keys')
const { schema, array, object, string, enumerate, boolean } = require('../data_types')

module.exports = class AttackTargetTypeGroupUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                overwrite_attack_target_type_groups: boolean(loc_keys.OVERWRITE_IDS),
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
