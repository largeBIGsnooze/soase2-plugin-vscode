const { workspace } = require('vscode')

module.exports = class Config {
    constructor() {}

    static copy() {
        return workspace.getConfiguration('soase2-plugin')
    }

    static async getIgnoredFolders() {
        return await this.copy().get('folders.ignore')
    }
    static async getIgnoredExtensions() {
        return await this.copy().get('extensions.ignore')
    }
    static async getFormatterTabsAmount() {
        return await this.copy().get('formatter.tabs')
    }

    static async getWorkspaceFolder() {
        return await this.copy().get('cache.game')
    }
    static async setWorkspace(dir, configuration) {
        return await this.copy().update('cache.game', dir, configuration)
    }
}
