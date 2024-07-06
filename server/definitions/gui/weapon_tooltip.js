const { schema, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class WeaponTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                weapon_header_name: this.cache.localisation,
                weapon_header_dps: this.cache.localisation,
                weapon_header_penetration: this.cache.localisation,
                weapon_name_offset: float(),
                weapon_penetration_offset: float(),
                weapon_needs_required_item_color: this.cache.colors,
            },
        })
    }
}
