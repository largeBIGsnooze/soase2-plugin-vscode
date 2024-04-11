const { schema, array, string, color, object } = require('../data_types')

module.exports = class NamedColors {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder) {}

    create() {
        return schema({
            keys: {
                named_colors: array({
                    items: object({
                        keys: {
                            id: string(),
                            color: color(),
                        },
                        required: ['id', 'color'],
                    }),
                }),
                required: ['named_colors'],
            },
        })
    }
}
