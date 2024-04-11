const { schema, object, color, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DefaultReflexBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                list_box_style: super.list_box_styles(),
                text_entry_box_style: super.list_box_styles(),
                drop_box_style: super.drop_box_styles(),
                name_color: color(),
                expanded_arrow: this.cache.textures,
                not_expanded_arrow: this.cache.textures,
                indent_width: float(),
                expand_arrow_width: float(),
                expand_arrow_layout: super.layout(),
                color_box_spacing: float(),
                color_box_layout: super.layout(),
                toggle_button_style: super.style(),
                browse_button_spacing: float(),
                browse_button_layout: super.layout(),
                value_text_colors: object({
                    keys: {
                        white: color(),
                        red: color(),
                        green: color(),
                        dimmed_white: color(),
                        dimmed_red: color(),
                        dimmed_green: color(),
                    },
                }),
                value_column_min_width: float(),
            },
        })
    }
}
