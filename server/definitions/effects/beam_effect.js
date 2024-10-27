const { schema, float, color, object, enumerate, array, vector2f, percentage, version } = require('../data_types')

module.exports = class BeamEffect {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                glow_texture: this.cache.textures(),
                core_texture: this.cache.textures(),
                glow_color: color(),
                core_color: color(),
                width: float(),
                glow_tiling_animation_rate: float(),
                core_tiling_animation_rate: float(),
                core_fade_in_duration: float(),
                core_fade_out_duration: float(),
                light: object({
                    required: ['type', 'color', 'intensity', 'surface_radius'],
                    keys: {
                        type: enumerate({
                            items: ['line'],
                        }),
                        color: color(),
                        intensity: float(),
                        surface_radius: float(),
                    },
                }),
                particle_effects: array({
                    items: object({
                        required: ['particle_effect', 'interval_distance'],
                        keys: {
                            particle_effect: this.cache.particle_effects,
                            interval_distance: vector2f(),
                        },
                    }),
                }),
                basic_constants: object({
                    keys: {
                        depth_fade_opacity: float(),
                        emissive_factor: float(),
                        alpha_ramp_curvature: float(),
                        alpha_ramp_steepness: float(),
                        alpha_ramp_growth_delay: float(),
                        alpha_ramp_max_alpha_scalar: float(),
                    },
                }),
            },
        })
    }
}
