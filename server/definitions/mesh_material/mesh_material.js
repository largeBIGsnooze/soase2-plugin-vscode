const { schema, float, array, boolean } = require('../data_types')

module.exports = class MeshMaterial {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                base_color_texture: this.cache.textures(),
                normal_texture: this.cache.textures(),
                mask_texture: this.cache.textures(),
                occlusion_roughness_metallic_texture: this.cache.textures(),
                emissive_factor: float(),
                emissive_hue_strength: float(),
                base_color_factor: array({ items: float() }),
                roughness_factor: float(),
                metallic_factor: float(),
                has_transparency: boolean(),
            },
        })
    }
}
