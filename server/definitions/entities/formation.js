const { schema, array, object, float, integer, version } = require('../data_types')

module.exports = class Formation {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {}

    create() {
        return schema({
            keys: {
                version: version(),
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
