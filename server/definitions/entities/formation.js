const { schema, array, object, float, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Formation extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
    }

    create() {
        return schema({
            keys: {
                version: float(),
                rank_distances: array({
                    items: float(),
                }),
                rank_groups: array({
                    items: object({
                        keys: {
                            width_scalar: float(),
                            column_spacing: float(),
                            row_spacing: float(),
                        },
                    }),
                }),
                pattern: object({
                    keys: {
                        items: array({
                            items: object({
                                keys: {
                                    group_index: integer(),
                                    column_weight: float(),
                                },
                                required: ['group_index', 'column_weight'],
                            }),
                        }),
                    },
                    required: ['items'],
                }),
            },
            required: ['pattern', 'rank_groups', 'rank_distances'],
        })
    }
}
