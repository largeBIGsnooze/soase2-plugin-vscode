const { schema, object } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class HudReplayWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: super.window(this.cache.textures, {
                properties: {
                    active_player_button: super.button(this.cache),
                    full_visibility_toggle_button: super.button(this.cache, {
                        extra_properties: {
                            highlighted_icon: this.cache.textures,
                            full_visibility_active_tooltip_title: this.cache.localisation,
                            full_visibility_inactive_tooltip_title: this.cache.localisation,
                            tooltip_description: this.cache.localisation,
                        },
                    }),
                    timeline_bar: object({
                        keys: {
                            layout: super.layout(),
                            background: this.cache.textures,
                            bar_layout: super.layout(),
                            fill_brush: this.cache.textures,
                            buffer_brush: this.cache.textures,
                            cursor_brush: this.cache.textures,
                            tooltip_title: this.cache.localisation,
                            tooltip_description: this.cache.localisation,
                        },
                    }),
                },
            }),
        })
    }
}
