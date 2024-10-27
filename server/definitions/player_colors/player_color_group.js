const { schema, color, array, object } = require('../data_types')

module.exports = class PlayerColorGroup {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder) {}

    create() {
        return schema({
            keys: {
                user_interface_color: color(),
                pip_color: color(),
                main_view_planet_background_color: color(),
                mesh_colors: array({
                    items: object({
                        required: ['primary', 'secondary', 'primary_emissive', 'secondary_emissive'],
                        keys: {
                            primary: color(),
                            secondary: color(),
                            primary_emissive: color(),
                            secondary_emissive: color(),
                        },
                    }),
                }),
            },
            required: ['user_interface_color', 'main_view_planet_background_color', 'mesh_colors'],
        })
    }
}
