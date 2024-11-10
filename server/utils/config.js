const fs = require('fs')
const path = require('path')
module.exports = class Config {
    constructor() {}

    static copy() {
        const { workspace } = require('vscode')
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
    static async getVanillaInstallation() {
        return await this.copy().get('cache.vanilla')
    }
    static async getWorkspaceFolder() {
        return await this.copy().get('cache.mod')
    }
    static async setWorkspace(dir, configuration) {
        return await this.copy().update('cache.mod', dir, configuration)
    }
    static isValidGamePath(basePath) {
        if (path.basename(basePath).startsWith('SinsII')) return true
        if (basePath !== '' && fs.readdirSync(basePath).some((e) => e.includes('.mod_meta_data'))) return true
        return false
    }
}
