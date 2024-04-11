const { schema, array, object, float, vector3, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FlightPattern extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
    }

    create() {
        return schema({
            keys: {
                version: float(),
                segments: array({
                    items: object({
                        keys: {
                            forward: vector3(),
                            up: vector3(),
                            linear_direction: vector3(),
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
                                required: ['max_linear_speed_scalar', 'max_linear_acceleration_scalar', 'max_linear_deceleration_scalar', 'max_angular_speed_scalar', 'max_angular_acceleration_scalar', 'max_angular_deceleration_scalar'],
                            }),
                        },
                        required: ['forward', 'up', 'linear_direction', 'stop_at_goal', 'move_limits_scalars'],
                    }),
                }),
            },
        })
    }
}
