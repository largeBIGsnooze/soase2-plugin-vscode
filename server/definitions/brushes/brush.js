const { schema, object, enumerate, boolean, vecInt2, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Brush extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    brush_state() {
        return object({
            keys: {
                texture: this.cache.textures,
                shader_type: enumerate({
                    items: ['pressed', 'disabled', 'normal_overlay', 'hovered_overlay'],
                }),
                alpha_multiply: float(),
            },
        })
    }

    create() {
        return schema({
            keys: {
                normal_state: this.brush_state(),
                disabled_state: this.brush_state(),
                focused_state: this.brush_state(),
                pressed_state: this.brush_state(),
                hovered_state: this.brush_state(),
                margins: super.margins(),
                is_transient: boolean(),
                tiles: object({
                    keys: {
                        total_count: float(),
                        column_count: float(),
                        tile_size: vecInt2(),
                        tile_stride: vecInt2(),
                    },
                }),
            },
        })
    }
}
