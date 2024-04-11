const { schema, object, color, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugContextWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                anchor_location_on_tooltip: super.anchor(),
                anchor_location_on_attachment_area: super.anchor(),
                background_fill_color: color(),
                single_step_tick_color: this.cache.colors,
                player_option_value_color: this.cache.colors,
                tooltip_definition: object({
                    keys: {
                        content_margins: super.margins(),
                        min_line_width: float(),
                        section_vertical_gap: float(),
                        line_definitions: object({
                            keys: {
                                standard: super.line_definition(this.cache.fonts, this.cache.colors),
                                title: super.line_definition(this.cache.fonts, this.cache.colors),
                                sub_header: super.line_definition(this.cache.fonts, this.cache.colors),
                            },
                        }),
                        default_description_definition: object({
                            keys: {
                                font: this.cache.fonts,
                                text_color: this.cache.colors,
                                text_width: float(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
