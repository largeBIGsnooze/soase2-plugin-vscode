const { schema } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class PipGroupTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                friendly_ships_player_name_postfix: this.cache.localisation,
                enemy_ships_player_name_postfix: this.cache.localisation,
                fleet_moving_to_gravity_well_title_postfix: this.cache.localisation,
                fleet_deliverables_title_postfix: this.cache.localisation,
                last_detected_description: super.label_form2(this.cache),
            },
        })
    }
}
