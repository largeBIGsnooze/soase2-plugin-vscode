const { schema, object, integer } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class ActionTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                action_value_colors: object({
                    keys: {
                        neutral: this.cache.colors,
                        positive: this.cache.colors,
                        negative: this.cache.colors,
                    },
                }),
                action_value_ratio_gap: integer(),
                action_value_ratio_colors: object({
                    keys: {
                        per_spell_power: this.cache.colors,
                    },
                }),
            },
        })
    }
}
