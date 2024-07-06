const { schema, object, float } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class UnitGroupTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                player_name_line_height: float(),
                unit_value_offset: float(),
                unit_count_color: this.cache.colors,
                selected_unit_name_color: this.cache.colors,
                supply_value_label: this.cache.localisation,
                supply_value_color: this.cache.colors,
                special_operation_unit_type_resources: object({
                    keys: {
                        garrison: object({
                            keys: {
                                name: this.cache.localisation,
                                icon: this.cache.textures,
                            },
                        }),
                        local_garrison: object({
                            keys: {
                                name: this.cache.localisation,
                                icon: this.cache.textures,
                            },
                        }),
                        insurgent: object({
                            keys: {
                                name: this.cache.localisation,
                                icon: this.cache.textures,
                            },
                        }),
                        dark_fleet: object({
                            keys: {
                                name: this.cache.localisation,
                                icon: this.cache.textures,
                            },
                        }),
                        trade_escort: object({
                            keys: {
                                name: this.cache.localisation,
                                icon: this.cache.textures,
                            },
                        }),
                    },
                }),
            },
        })
    }
}
