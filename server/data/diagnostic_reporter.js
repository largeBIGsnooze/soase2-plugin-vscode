const sourceMap = require('json-source-map')
const { ERROR, CONSTANTS } = require('../constants')

class Property {
    constructor(text) {
        try {
            this._map = sourceMap.parse(text)
            this.pointers = null
            this.data = null
        } catch {}
    }

    get pointers() {
        return this._map.pointers
    }

    get data() {
        try {
            return this._map.data
        } catch {}
    }
}

class PointerDiagnosticLogger {
    constructor(pointer) {
        this.pointer = pointer
    }
    set(message, severity) {
        const start = {
            line: this.pointer.value.line,
            character: this.pointer.value.column,
        }
        const end = {
            line: this.pointer.value.line,
            character: this.pointer.valueEnd.column,
        }
        return {
            range: {
                start: start,
                end: end,
            },
            message: message,
            severity: severity,
            code: 0,
            source: CONSTANTS.source,
        }
    }
}

class DiagnosticLogger {
    /**
     * Represents a diagnostic, such as a compiler error or warning
     */
    constructor(docText, field) {
        this.docText = docText
        this.field = field
        this.line = new RegExp(`\\b${field}\\b`).exec(docText)?.index
    }

    set(message, severity) {
        return {
            range: {
                start: {
                    line: 0,
                    character: 0,
                },
                end: {
                    line: 0,
                    character: 0,
                },
            },
            message: message,
            severity: severity,
            code: 0,
            source: CONSTANTS.source,
        }
    }
}
class DiagnosticReporter extends Property {
    constructor(docText, diagnostics) {
        super(docText)
        this.diagnostics = diagnostics
        this.docText = docText
    }
    reportAtPos(pointer, message, severity = ERROR) {
        return this.diagnostics.push(new PointerDiagnosticLogger(super.pointers[pointer]).set(message, severity))
    }

    createDiagnostic(key, message, severity = ERROR) {
        return this.diagnostics.push(new DiagnosticLogger(this.docText, key).set(message, severity))
    }

    invalidJSON() {
        return this.createDiagnostic(0, `- json parsing failed!`)
    }

    validate_keys(pointer, data, required, unused, optional = []) {
        const requiredKeys = [],
            unusedKeys = []

        required.forEach((prop) => {
            if (!this.contains(data, prop)) requiredKeys.push(prop)
        })

        unused.forEach((prop) => {
            if (required.includes(prop) || optional.includes(prop)) return
            if (this.contains(data, prop)) unusedKeys.push(prop)
        })

        if (requiredKeys.length > 0) {
            this.reportAtPos(pointer, `- required keys: [ ${requiredKeys.join(', ')} ]`)
        }
        if (unusedKeys.length > 0) {
            this.reportAtPos(pointer, `- unused keys: [ ${unusedKeys.join(', ')} ]`)
        }
    }

    contains(text, prop) {
        return text.hasOwnProperty(prop)
    }
}

module.exports = {
    DiagnosticReporter,
}
