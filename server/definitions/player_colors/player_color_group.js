const { schema, color, array } = require('../data_types')

module.exports = class PlayerColorGroup {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder) {}

    create() {
        return schema({
            keys: {
                primary_color: color(),
                main_view_planet_background_color: color(),
                secondary_colors: array({
                    items: color(),
                }),
            },
            required: ['primary_color', 'main_view_planet_background_color', 'secondary_colors'],
        })
    }
}
