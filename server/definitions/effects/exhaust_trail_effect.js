const { schema, object, float, boolean } = require('../data_types')

module.exports = class ExhaustTrailEffect {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                texture: this.cache.textures(),
                start_width: float(),
                middle_width: float(),
                middle_offset: float(),
                max_width_scalar: float(),
                segment_duration: float(),
                max_trail_length: float(),
                render_with_player_color: boolean(),
                segment_max_length: float(),
                basic_constants: object({
                    required: ['alpha_ramp_curvature', 'alpha_ramp_steepness', 'alpha_ramp_growth_delay', 'alpha_ramp_max_alpha_scalar'],
                    keys: {
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
