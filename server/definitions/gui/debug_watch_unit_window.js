const { schema, string, object } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugWatchUnitWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                title_text: string(),
                initial_state: super.initial_state(),
                content_window: object({
                    keys: {
                        layout: super.layout(),
                        header_window: object({
                            keys: {
                                layout: super.layout(),
                                unit_id_box: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                track_selected_unit_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                focus_on_watched_unit_button: object({
                                    keys: {
                                        layout: super.layout(),
                                        style: super.style(),
                                        text: string(),
                                    },
                                }),
                            },
                        }),
                        view_buttons_panel: object({
                            keys: {
                                layout: super.layout(),
                                orientation: super.orientation(),
                                properties_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                orders_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                segments_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                buffs_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                weapons_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                sounds_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                tweaks_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                            },
                        }),
                        view_container_window: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        unit_reflect_box: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        orders_list_box: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        sounds_list_box: object({
                            keys: {
                                style: super.style(),
                                header_text_color: this.cache.colors,
                                layout: super.layout(),
                            },
                        }),
                        segments_list_box: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        buffs_list_box: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        weapons_list_box: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        weapon_reflect_box: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                        tweaks_window: super.tweaks_window(),
                    },
                }),
            },
        })
    }
}
