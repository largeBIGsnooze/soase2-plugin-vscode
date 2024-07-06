const { schema, object, vecInt2, percentage } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudProductionWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                bar_size: vecInt2(),
                buttons_panel: object({
                    keys: {
                        layout: super.layout(),
                        button_size: vecInt2(),
                        button_stride: vecInt2(),
                        button_shared_definition: object({
                            keys: {
                                planet_track_upgrade_title_prefix_text: this.cache.localisation,
                                not_in_dragging_group_alpha: percentage(),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
