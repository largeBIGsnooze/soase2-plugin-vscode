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

module.exports = {
    Log,
}
