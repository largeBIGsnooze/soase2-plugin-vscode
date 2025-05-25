const loc_keys = require('../../loc_keys')
const { schema, array, boolean, object, enumerate } = require('../data_types')

module.exports = class ScenarioUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    scenarios_definition() {
        return array({
            items: object({
                keys: {
                    product_id: enumerate({ items: ['dlc_PathsToPower'] }),
                    scenarios: array({ items: this.cache.scenarios, isUnique: true }),
                },
            }),
        })
    }

    create() {
        return schema({
            keys: {
                /* game_version v1.30.3 */
                overwrite_scenarios: boolean(loc_keys.OVERWRITE_IDS),
                overwrite_fake_server_scenarios: boolean(loc_keys.OVERWRITE_IDS),
                /* */
                scenarios: array({
                    items: this.cache.scenarios,
                    isUnique: true,
                }),
                /* game_version v1.41 */
                dlc_multiplayer_scenarios: this.scenarios_definition(),
                /* */
                /* game_version v1.40.14 */
                dlc_scenarios: this.scenarios_definition(),
                /* */
                fake_server_scenarios: array({
                    items: this.cache.scenarios,
                    isUnique: true,
                }),
            },
            required: ['fake_server_scenarios', 'scenarios'],
        })
    }
}
