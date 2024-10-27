const { schema, array, object, float, integer, version } = require('../data_types')

module.exports = class Formation {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {}

    create() {
        return schema({
            keys: {
                rank_distances: array({
                    items: float(),
                }),
                rank_groups: array({
                    items: object({
                        keys: {
                            width_scalar: float(true, '', 0),
                            column_spacing: float(true, '', 0),
                            row_spacing: float(true, '', 0),
                        },
                        required: ['width_scalar', 'column_spacing', 'row_spacing'],
                    }),
                }),
                pattern: object({
                    keys: {
                        items: array({
                            items: object({
                                keys: {
                                    group_index: integer(),
                                    column_weight: float(true, '', 0),
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
