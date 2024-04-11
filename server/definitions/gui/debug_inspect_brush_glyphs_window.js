const { schema, object, vecInt2 } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugInspectBrushGlyphsWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                initial_state: super.initial_state(),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        thumbnail_container_layout: super.layout(),
                        thumbnail_size: vecInt2(),
                        thumbnail_stride: vecInt2(),
                    },
                }),
            },
        })
    }
}
