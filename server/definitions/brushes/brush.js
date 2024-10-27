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
                    desc: "Control the shader this brush will be rendered with. Default is 'normal'",
                    items: ['normal', 'normal_overlay', 'disabled', 'focused', 'pressed', 'hovered', 'hovered_overlay', 'yuv_video'],
                }),
                alpha_multiply: float(true, 'Alpha multiply the brush texture when this state is active', undefined, 1),
            },
            required: ['texture'],
        })
    }

    create() {
        return schema({
            keys: {
                normal_state: this.brush_state('Normal or default state of the brush'),
                disabled_state: this.brush_state('The UI element is disabled.'),
                focused_state: this.brush_state('The UI element has focus. All keyboard input will be directed here before others.'),
                pressed_state: this.brush_state('The UI element has be pressed, typically indicating the mouse button is down.'),
                hovered_state: this.brush_state('The UI element is hovered, typically the mouse cursor is over it.'),
                margins: UI.margins(
                    'When stretched will define the 9 pieces that are composited. \nhttps://docs.unity3d.com/Manual/9SliceSprites.html'
                ),
                is_transient: boolean(
                    'If true this texture will be loaded and loaded on demand and NOT optimized onto a texture page. Only make true for large textures that should not stay resident.'
                ),
                dpi_source: enumerate({
                    items: ['user_interface', 'current_display_size'],
                }),
                supported_dpis: array({
                    desc: 'What DPI this brush natively supports for higher resolution textures.\nBy convention texture names must be post-fixed with the DPI value to be found.\nFor example picture.png would also need picture150.png side-by-side if supported DPI of 150 was added.\nTypically should be [150, 200] if this feature is being used.',
                    items: integer(false, 100),
                }),
                tiles: object({
                    desc: 'Allows a brush to consist of multiple distinct pieces. Typically used for flipbook animations.',
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
