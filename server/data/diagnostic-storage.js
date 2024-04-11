const { ERROR, WARN } = require('../constants')
const { DiagnosticLogger } = require('../utils/logger')

module.exports = class DiagnosticStorage {
    messages = {
        invalidJSON: () => this.createDiagnostic(0, `- json parsing failed!`, ERROR),
        nullReference: (reference) => this.createDiagnostic(reference, `- ${reference} reference does not exist`, ERROR),
        unreferenced: (fileName, reference) => this.createDiagnostic('ids', `- ${fileName}_definition not found. id='${reference}'`, WARN),
        fieldCoordMatch: (x, tier) => this.createDiagnostic(x, `- field_coord.x (${x}) has a tier of ${tier} which doesn't match it's explicit tier of ${x}`, ERROR),
        aRequiresB: (key, a, b) => this.createDiagnostic(key, `- '${a}' requires '${b}'`, ERROR),
        requiresKey: (key, requiredKey) => this.createDiagnostic(key, `- '${requiredKey}' is required`, ERROR),
        unusedKey: (key, unusedKey) => this.createDiagnostic(key, `- unused keys: [ '${unusedKey}' ]`, ERROR),
        mapUnusedKeys: (json, field, value, arr) =>
            arr.map((e) => {
                if (field === value && json?.hasOwnProperty(e)) this.messages.unusedKey(e, e)
            }),
    }

    constructor(docText, diagnostics) {
        this.docText = docText
        this.diagnostics = diagnostics
    }

    createDiagnostic(key, message, severity) {
        return this.diagnostics.push(new DiagnosticLogger(this.docText, key).set(message, severity))
    }
}
