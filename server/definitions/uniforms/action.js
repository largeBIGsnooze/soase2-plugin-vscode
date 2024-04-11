const { schema, array, object, float, string } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class ActionUniform extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
    }

    create() {
        return schema({
            keys: {
                common_action_values: array({
                    items: object({
                        keys: {
                            action_value_id: string(),
                            action_value: object({
                                keys: {
                                    transform_type: super.getTransformType,
                                    values: array({
                                        items: float(false),
                                    }),
                                    transform_unit: object({
                                        keys: {
                                            unit_type: super.getUnitType,
                                        },
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
