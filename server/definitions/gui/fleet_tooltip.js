const { schema, array } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FleetTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                remote_ships_header_line: super.label_form(this.cache),
                fleet_deliverables_header_line: super.label_form(this.cache),
                empty_fleet_description_blocks: array({
                    items: super.label_form2(this.cache),
                }),
            },
        })
    }
}
