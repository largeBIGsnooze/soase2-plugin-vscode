const { schema } = require('../data_types')

module.exports = class DefaultLabelStyle {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                font: this.cache.fonts,
                text_color: this.cache.colors,
            },
            required: ['font', 'text_color'],
        })
    }
}
