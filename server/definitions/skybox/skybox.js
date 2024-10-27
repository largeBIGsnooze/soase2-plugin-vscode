const { schema, color, array, float, object } = require('../data_types')

module.exports = class Skybox {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background_color: color(),
                starfield_layers: array({
                    items: object({
                        keys: {
                            base_color_texture: this.cache.textures(),
                            zoom: float(),
                            speed_scalar: float(),
                        },
                        required: ['base_color_texture', 'speed_scalar', 'zoom'],
                    }),
                }),
                skybox_layers: array({
                    items: object({
                        keys: {
                            base_color_texture: this.cache.textures(),
                            speed_scalar: float(),
                        },
                        required: ['base_color_texture', 'speed_scalar'],
                    }),
                }),
                radiance_texture: this.cache.textures(),
                irradiance_texture: this.cache.textures(),
                dfg_texture: this.cache.textures(),
            },
            required: ['starfield_layers', 'skybox_layers', 'radiance_texture', 'irradiance_texture', 'dfg_texture'],
        })
    }
}
