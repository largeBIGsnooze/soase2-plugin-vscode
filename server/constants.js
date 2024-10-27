/**
 *  ____   ___    _    ____  _____   ____    ____  _    _   _  ____ ___ _   _
 * / ___| / _ \  / \  / ___|| ____| |___ \  |  _ \| |  | | | |/ ___|_ _| \ | |
 * \___ \| | | |/ _ \ \___ \|  _|     __) | | |_) | |  | | | | |  _ | ||  \| |
 *  ___) | |_| / ___ \ ___) | |___   / __/  |  __/| |__| |_| | |_| || || |\  |
 * |____/ \___/_/   \_\____/|_____| |_____| |_|   |_____\___/ \____|___|_| \_|
 */

exports.ERROR = 1
exports.WARN = 2
exports.INFO = 3
exports.HINT = 4
exports.CONSTANTS = {
    name: 'sins_of_a_solar_empire_ii',
    version: require('../package.json').version,
    source: 'Jabberwocky: Sins 2 Language Server',
    folderRegex: new RegExp('^(?!(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9]))[a-zA-Z_ 0-9]{1,255}$'),
}
