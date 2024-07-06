const { schema, string, object } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class CultureTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                culture_icon: this.cache.textures,
                culture_header_label_text: this.cache.localisation,
                no_culture_description: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                waiting_for_dominant_player_established_decription: object({
                    keys: {
                        text: this.cache.localisation,
                        color: this.cache.colors,
                    },
                }),
                dominant_player_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                    },
                }),
                dominant_percentage_color_when_max: this.cache.colors,
                dominant_percentage_color_when_increasing: this.cache.colors,
                dominant_percentage_color_when_decreasing: this.cache.colors,
                player_rates_header_text: this.cache.localisation,
                player_resistance_rates_header_text: this.cache.localisation,
                provides_detection_line: object({
                    keys: {
                        label_text: this.cache.localisation,
                        label_color: this.cache.colors,
                    },
                }),
                culture_rate_provided_line: object({
                    keys: {
                        icon: this.cache.textures,
                        label_text: this.cache.localisation,
                        value_color: this.cache.colors,
                    },
                }),
                established_culture_side_effects_header: this.cache.localisation,
                friendly_planet_modifiers_header: this.cache.localisation,
                enemy_planet_modifiers_header: this.cache.localisation,
                friendly_unit_modifiers_header: this.cache.localisation,
                enemy_unit_modifiers_header: this.cache.localisation,
            },
        })
    }
}
