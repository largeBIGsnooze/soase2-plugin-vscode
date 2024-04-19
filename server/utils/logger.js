const { CONSTANTS } = require('../constants')
const Utils = require('./utils')
class Log {
    /**
     * Logs information to the language server
     */
    constructor() {}

    static warn(...messages) {
        return console.log(`[ ⚠️ Warning - ${this.timeStamp()}]: %s`, ...messages)
    }

    static error(...messages) {
        return console.log(`[ ⛔️ Error - ${this.timeStamp()}]: %s`, ...messages)
    }

    static info(...messages) {
        return console.log(` [ 🛈 Info - ${this.timeStamp()}]: %s`, ...messages)
    }

    static timeStamp = () => new Date().toLocaleTimeString('en-US')
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
        const position = {
            line: Utils.getLineNumber(this.docText, this.line ?? 0),
            character: Utils.getCharacterNumber(this.docText, this.line ?? 0),
        }
        return {
            range: { start: position, end: position },
            message: message,
            severity: severity,
            code: 0,
            source: CONSTANTS.source,
        }
    }
}

module.exports = {
    DiagnosticLogger,
    Log,
}
