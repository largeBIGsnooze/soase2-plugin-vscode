const { schema } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class ExoticTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                available_exotic_count_line: super.label_form(this.cache),
                building_exotic_count_line: super.label_form(this.cache),
                reserved_exotic_count_line: super.label_form(this.cache),
                build_time_line: super.label_form(this.cache),
                waiting_for_factory_to_be_built_line: super.label_form(this.cache),
                building_progress_percentage_line: super.label_form(this.cache),
                no_items_require_exotics: super.label_form2(this.cache),
                reserved_for_line: super.label_form(this.cache),
                waiting_for_exotics_line: super.label_form(this.cache),
                waiting_for_exotics_count_value_color: this.cache.colors,
                waiting_for_exotics_progress_percentage_color: this.cache.colors,
            },
        })
    }
}
