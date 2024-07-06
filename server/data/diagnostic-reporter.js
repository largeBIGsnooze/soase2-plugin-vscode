const sourceMap = require('json-source-map')
const { ERROR } = require('../constants')
const { PointerDiagnosticLogger, DiagnosticLogger } = require('../utils/logger')
const { has } = require('../utils/utils')

class Property {
    constructor(text) {
        try {
            this._map = sourceMap.parse(text)
            this._pointers = null
            this._data = null
        } catch {}
    }

    get pointers() {
        return this._map.pointers
    }

    get data() {
        return this._map.data
    }
}

class DiagnosticReporter extends Property {
    constructor(docText, diagnostics) {
        super(docText)
        this.diagnostics = diagnostics
        this.docText = docText
    }
    createPointerDiagnostic(pointer, message, severity) {
        return this.diagnostics.push(new PointerDiagnosticLogger(super.pointers[pointer]).set(message, severity))
    }

    createDiagnostic(key, message, severity) {
        return this.diagnostics.push(new DiagnosticLogger(this.docText, key).set(message, severity))
    }

    invalidJSON() {
        return this.createDiagnostic(0, `- json parsing failed!`, ERROR)
    }

    unused_key(pointer, value) {
        return this.createPointerDiagnostic(pointer, `- unused key: '${value}'`, ERROR)
    }

    key_requires(pointer, value) {
        return this.createPointerDiagnostic(pointer, `- '${value}' is required`, ERROR)
    }

    map_unused_keys(pointer, data, keys) {
        const unusedKeys = []
        for (const prop of keys) {
            if (has(data, prop)) {
                unusedKeys.push(prop)
            }
        }
        if (unusedKeys.length > 0) {
            this.createPointerDiagnostic(pointer, `- unused keys: [ ${unusedKeys.join(', ')} ]`, ERROR)
        }
    }
    map_required_keys(pointer, data, keys) {
        const requiredKeys = []
        for (const prop of keys) {
            if (!has(data, prop)) {
                requiredKeys.push(prop)
            }
        }
        if (requiredKeys.length > 0) {
            this.createPointerDiagnostic(pointer, `- required keys: [ ${requiredKeys.join(', ')} ]`, ERROR)
        }
    }

    greater_than_zero(prop, pointer) {
        if (prop <= 0) {
            return this.createPointerDiagnostic(pointer, `- '${pointer.split('/').pop()}' must be > 0`, ERROR)
        }
    }
    greater_than(prop, pointer, value) {
        if (prop < value) {
            return this.createPointerDiagnostic(pointer, `- '${pointer.split('/').pop()}' '${prop}' must be >= '${value}'`, ERROR)
        }
    }
}

module.exports = {
    DiagnosticReporter,
}
