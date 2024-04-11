module.exports = {
    validate: async () => await require('vscode').commands.executeCommand('soase2-plugin.validateFilesButton'),
}
