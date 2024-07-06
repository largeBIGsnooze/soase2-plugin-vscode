const { schema, integer, color, array, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DebugStatisticsWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_fill_color: color(),
                background_margins: super.margins(),
                good_value_color: color(),
                ok_value_color: color(),
                bad_value_color: color(),
                unused_value_color: color(),
                item_font: this.cache.fonts,
                item_label_color: color(),
                item_vertical_spacing: integer(),
                fps_font: this.cache.fonts,
                fps_width: integer(),
                performance_monitor_column_widths: array({
                    items: float(),
                }),
                rendering_profiler_scope_column_widths: array({
                    items: float(),
                }),
                main_view_statistic_column_widths: array({
                    items: float(),
                }),
                simulations_units_statistics_column_widths: array({
                    items: float(),
                }),
                networking_statistics_column_widths: array({
                    items: integer(),
                }),
            },
        })
    }
}
