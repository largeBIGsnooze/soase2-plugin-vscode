const { workspace, ConfigurationTarget } = require('vscode')

module.exports = class Config {
    constructor() {}

    static config() {
        return workspace.getConfiguration('soase2-plugin')
    }

    static get(data) {
        return this.config().get(data)
    }

    static update(data, update) {
        return this.config().update(data, update, ConfigurationTarget.Global)
    }
}
