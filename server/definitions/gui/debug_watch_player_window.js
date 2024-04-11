const { schema, string, object, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class DebugWatchPlayerWindow extends Definitions {
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
                                player_index_drop_box: super.button2(),
                                set_active_player_button: object({
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
                                missions_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                theme_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                purchase_requests_view_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                            },
                        }),
                        view_container_window: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        properties_reflect_box: object({
                            keys: {
                                layout: super.layout(),
                            },
                        }),
                        missions_list_box: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                            },
                        }),
                        purchase_requests_list_box: object({
                            keys: {
                                layout: super.layout(),
                                style: super.style(),
                            },
                        }),
                        theme_window: object({
                            keys: {
                                layout: super.layout(),
                                primary_color_drop_box: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                                secondary_color_drop_box: super.button(this.cache.localisation, this.cache.textures, this.cache.colors),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
