const { schema, string, object, vecInt2 } = require('../data_types')
const Definitions = require('../modifier_definitions')

module.exports = class FrontEndModdingBrowseServiceProviderWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                not_authenticated_label: super.label(this.cache),
                terms_of_use_text_label: super.label(this.cache),
                accept_terms_of_use_button: super.button(this.cache),
                filter_window: object({
                    keys: {
                        layout: super.layout(),
                        text_filter_window: object({
                            keys: {
                                layout: super.layout(),
                                background: super.background(this.cache.textures),
                                icon: super.icon(this.cache.textures),
                                text_entry: super.text_entry(),
                                clear_button: super.button(this.cache),
                            },
                        }),
                        has_current_compatibility_version_button: super.button(this.cache, {
                            extra_properties: {
                                highlighted_icon: this.cache.textures,
                            },
                        }),
                        current_compatiblity_version_line: super.label_form(this.cache),
                        sort_field_drop_box: object({
                            keys: {
                                layout: super.layout(),
                                sort_field_names: object({
                                    keys: {
                                        downloads_today: this.cache.localisation,
                                        downloads_total: this.cache.localisation,
                                        subscriber_count: this.cache.localisation,
                                        rating: this.cache.localisation,
                                        date_marked_live: this.cache.localisation,
                                        date_updated: this.cache.localisation,
                                    },
                                }),
                            },
                        }),
                        tag_buttons_panel_shared_definition: object({
                            keys: {
                                header_label_layout: super.layout(),
                                header_label_style: super.header_label_style(),
                                tag_buttons_layout_grid: super.layout_grid(),
                                tag_button: super.button(this.cache, {
                                    extra_properties: {
                                        enabled_icon: this.cache.textures,
                                        disabled_icon: this.cache.textures,
                                    },
                                }),
                            },
                        }),
                        type_tag_buttons_panel: object({
                            keys: {
                                layout: super.layout(),
                                header_label_text: this.cache.localisation,
                                cosmetic_tag_button: object({
                                    keys: {
                                        text: this.cache.localisation,
                                        layout_grid_coord: vecInt2(),
                                        // TODO: Grab tags from mod.io later...
                                        tag: string(),
                                    },
                                }),
                                audio_tag_button: object({
                                    keys: {
                                        text: this.cache.localisation,
                                        layout_grid_coord: vecInt2(),
                                        tag: string(),
                                    },
                                }),
                                gameplay_tag_button: object({
                                    keys: {
                                        text: this.cache.localisation,
                                        layout_grid_coord: vecInt2(),
                                        tag: string(),
                                    },
                                }),
                                scenario_tag_button: object({
                                    keys: {
                                        text: this.cache.localisation,
                                        layout_grid_coord: vecInt2(),
                                        tag: string(),
                                    },
                                }),
                            },
                        }),
                        race_tag_buttons_panel: object({
                            keys: {
                                layout: super.layout(),
                                header_label_text: this.cache.localisation,
                                trader_tag_button: object({
                                    keys: {
                                        text: this.cache.localisation,
                                        layout_grid_coord: vecInt2(),
                                        tag: string(),
                                    },
                                }),
                                vasari_tag_button: object({
                                    keys: {
                                        text: this.cache.localisation,
                                        layout_grid_coord: vecInt2(),
                                        tag: string(),
                                    },
                                }),
                            },
                        }),
                    },
                }),
                mods_list_box: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
                mod_panel: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
            },
        })
    }
}
