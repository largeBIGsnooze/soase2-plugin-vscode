const path = require('path')

module.exports = class Utils {
    constructor() {}

    static getLineNumber(text, index) {
        return text.substring(0, index).split('\n').length - 1
    }

    static getCharacterNumber(text, index) {
        return index - text.lastIndexOf('\n', index) - 1
    }

    static getDocumentElement(text) {
        return {
            uri: path.extname(text),
            name: path.basename(text, path.extname(text)),
        }
    }

    static has(text, prop) {
        return text.hasOwnProperty(prop)
    }
}
