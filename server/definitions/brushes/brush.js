const loc_keys = require('../../loc_keys')
const { schema, object, enumerate, boolean, vector2i, float, integer, array } = require('../data_types')
const UI = require('../ui_definitions')

module.exports = class Brush {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    brush_state(desc) {
        return object({
            desc: desc,
            keys: {
                texture: this.cache.textures(),
                shader_type: enumerate({
                    desc: loc_keys.SHADER_TYPE,
                    items: ['normal', 'normal_overlay', 'disabled', 'focused', 'pressed', 'hovered', 'hovered_overlay', 'yuv_video'],
                }),
                alpha_multiply: float(true, 'Alpha multiply the brush texture when this state is active', 0, 1),
            },
            required: ['texture'],
        })
    }

    create() {
        return schema({
            keys: {
                normal_state: this.brush_state(loc_keys.NORMAL_STATE),
                disabled_state: this.brush_state(loc_keys.DISABLED_STATE),
                focused_state: this.brush_state(loc_keys.FOCUSED_STATE),
                pressed_state: this.brush_state(loc_keys.PRESSED_STATE),
                hovered_state: this.brush_state(loc_keys.HOVERED_STATE),
                margins: UI.margins(loc_keys.MARGINS),
                is_transient: boolean(loc_keys.IS_TRANSIENT),
                dpi_source: enumerate({
                    items: ['user_interface', 'current_display_size'],
                }),
                supported_dpis: array({
                    desc: loc_keys.SUPPORTED_DPIS,
                    items: integer(false, 100),
                }),
                tiles: object({
                    desc: loc_keys.TILES,
                    keys: {
                        total_count: float(),
                        column_count: float(),
                        tile_size: vector2i(),
                        tile_stride: vector2i(),
                    },
                }),
            },
        })
    }
}
