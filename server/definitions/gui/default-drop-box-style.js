const { schema, object, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class DefaultDropBoxStyle extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                background: object({
                    keys: {
                        brush: this.cache.textures,
                    },
                }),
                list_box_style: super.list_box_styles(),
                drop_arrow_width: float(),
                drop_arrow_brush: this.cache.textures,
            },
        })
    }
}
