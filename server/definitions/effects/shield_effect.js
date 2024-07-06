const { schema, object, color, float } = require('../data_types')

module.exports = class ShieldEffect {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    shield_effect() {
        return object({
            required: ['mesh', 'impact_texture_animation', 'color', 'max_radius', 'duration', 'fps', 'min_radius'],
            keys: {
                mesh: this.cache.meshes,
                impact_texture_animation: this.cache.texture_animations,
                color: color(),
                max_radius: float(),
                duration: float(),
                fps: float(),
                min_radius: float(),
                enabling_mutation: this.cache.mutations,
            },
        })
    }

    create() {
        return schema({
            keys: {
                primary: this.shield_effect(),
                secondary: this.shield_effect(),
            },
        })
    }
}
