const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class BuffTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                duration_color: this.cache.colors,
                positive_mutation_color: this.cache.colors,
                negative_mutation_color: this.cache.colors,
                unit_positive_buffs_title: this.label_form2(this.cache),
                unit_negative_buffs_title: this.label_form2(this.cache),
                apply_damage_value_line: this.label_form(this.cache),
                apply_damage_penetration_line: this.label_form(this.cache),
                apply_damage_bypass_shields_chance_line: this.label_form(this.cache),
            },
        })
    }
}
