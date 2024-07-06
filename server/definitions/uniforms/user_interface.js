const { schema, object, color, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class UserInterfaceUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {}

    alert() {
        return object({
            keys: {
                min_color: color(),
                max_color: color(),
                total_duration: integer(),
                blink_duration: integer(),
                fade_duration: integer(),
            },
            required: ['min_color', 'max_color', 'total_duration', 'blink_duration', 'fade_duration'],
        })
    }

    create() {
        return schema({
            keys: {
                unspent_ability_points_fill_color: color(),
                unspent_ability_points_fill_blink: Definitions.getBlink(),
                unit_alert: object({
                    keys: {
                        alert_types: object({
                            keys: {
                                ping_attention: this.alert(),
                                ping_attack: this.alert(),
                                ping_defend: this.alert(),
                                rallied_to: this.alert(),
                                positive_buff: this.alert(),
                                negative_buff: this.alert(),
                                targeted_by_ability: this.alert(),
                            },
                            required: ['ping_attention', 'ping_attack', 'ping_defend', 'rallied_to', 'positive_buff', 'negative_buff', 'targeted_by_ability'],
                        }),
                    },
                    required: ['alert_types'],
                }),
                custom_click_failed_sound_spam_threshold: integer(),
            },
            required: ['unspent_ability_points_fill_color', 'unspent_ability_points_fill_blink', 'unit_alert', 'custom_click_failed_sound_spam_threshold'],
        })
    }
}
