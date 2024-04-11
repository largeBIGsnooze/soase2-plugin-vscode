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
                available_exotic_count_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                building_exotic_count_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                reserved_exotic_count_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                build_time_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                waiting_for_factory_to_be_built_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                building_progress_percentage_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                no_items_require_exotics: super.label_form2(this.cache.localisation, this.cache.colors),
                reserved_for_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                waiting_for_exotics_line: super.label_form(this.cache.localisation, this.cache.colors, this.cache.textures),
                waiting_for_exotics_count_value_color: this.cache.colors,
                waiting_for_exotics_progress_percentage_color: this.cache.colors,
            },
        })
    }
}
