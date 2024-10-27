const { workspace } = require('vscode')

module.exports = class Config {
    constructor() {}

    static config() {
        return workspace.getConfiguration('soase2-plugin')
    }

    static async get(data) {
        return await this.config().get(data)
    }

    static async update(data, update, configuration) {
        return await this.config().update(data, update, configuration)
    }
}
