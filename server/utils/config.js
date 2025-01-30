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
    static async getModFolder() {
        return await this.copy().get('cache.mod')
    }
    static async setFolder(dir, type, configuration) {
        return await this.copy().update(`cache.${type}`, dir, configuration)
    }
    static isValidVanillaFolder(folderPath) {
        return path.basename(folderPath).startsWith('SinsII') || path.basename(folderPath).startsWith('Sins2')
    }
    static isValidModPath(folderPath) {
        return fs.readdirSync(folderPath).some((e) => e.includes('.mod_meta_data'))
    }
}
