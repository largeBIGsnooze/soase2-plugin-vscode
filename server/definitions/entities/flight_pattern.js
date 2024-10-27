const { schema, array, object, float, vector3f, boolean } = require('../data_types')

module.exports = class FlightPattern {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {}

    create() {
        return schema({
            keys: {
                segments: array({
                    items: object({
                        keys: {
                            forward: vector3f(),
                            up: vector3f(),
                            linear_direction: vector3f(),
                            stop_at_goal: boolean(),
                            move_limits_scalars: object({
                                keys: {
                                    max_linear_speed_scalar: float(),
                                    max_linear_acceleration_scalar: float(),
                                    max_linear_deceleration_scalar: float(),
                                    max_angular_speed_scalar: float(),
                                    max_angular_acceleration_scalar: float(),
                                    max_angular_deceleration_scalar: float(),
                                },
                                required: [
                                    'max_angular_acceleration_scalar',
                                    'max_angular_deceleration_scalar',
                                    'max_angular_speed_scalar',
                                    'max_linear_acceleration_scalar',
                                    'max_linear_deceleration_scalar',
                                    'max_linear_speed_scalar',
                                ],
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
