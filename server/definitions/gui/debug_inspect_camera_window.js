const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugInspectCameraWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                title_text: string(),
                initial_state: super.initial_state(),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        reflect_box: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        pan_label: super.pan(),
                        pan_left_button: super.pan(),
                        pan_right_button: super.pan(),
                        pan_up_button: super.pan(),
                        pan_down_button: super.pan(),
                        pan_forward_button: super.pan(),
                        pan_backward_button: super.pan(),
                        rotate_label: super.pan(),
                        rotate_left_button: super.pan(),
                        rotate_right_button: super.pan(),
                        rotate_up_button: super.pan(),
                        rotate_down_button: super.pan(),
                        tweaks_window: object({
                            keys: {
                                layout: super.layout(),
                                enable_tweaks_button: super.pan(),
                                pan_x_negative_button: super.pan(),
                                pan_x_positive_button: super.pan(),
                                pan_y_negative_button: super.pan(),
                                pan_y_positive_button: super.pan(),
                                pan_z_negative_button: super.pan(),
                                pan_z_positive_button: super.pan(),
                                yaw_negative_button: super.pan(),
                                yaw_positive_button: super.pan(),
                                pitch_negative_button: super.pan(),
                                pitch_positive_button: super.pan(),
                                roll_negative_button: super.pan(),
                                roll_positive_button: super.pan(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
