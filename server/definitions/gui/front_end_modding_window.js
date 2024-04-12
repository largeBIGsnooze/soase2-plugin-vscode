const { schema, object, vecInt2, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class FrontEndModdingWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                layout: super.layout(),
                background_window: super.background_window(this.cache),
                overlay_window: super.background_window(this.cache),
                mods_list_box_shared_definition: object({
                    keys: {
                        list_box_style: super.list_box_styles(),
                        logo_layout: super.layout(),
                        name_layout: super.layout(),
                        name_font: this.cache.fonts,
                        name_color: this.cache.colors,
                        name_color_when_not_compatible: this.cache.colors,
                    },
                }),
                mod_tooltip: object({
                    keys: {
                        logo_size: vecInt2(),
                        logo_margins: super.margins(),
                        description_color: this.cache.colors,
                        version_line: super.label_form(this.cache),
                        not_compatible_description: super.label_form2(this.cache),
                        current_compatiblity_version_line: super.label_form(this.cache),
                        mod_compatiblity_version_line: super.label_form(this.cache),
                        will_change_simulation_description: super.label_form2(this.cache),
                        popularity_rank_line: super.label_form(this.cache),
                        downloads_total_line: super.label_form(this.cache),
                        subscribers_total_line: super.label_form(this.cache),
                        rating_line: super.label_form(this.cache),
                        rating_color_when_positive: this.cache.colors,
                        rating_color_when_negative: this.cache.colors,
                        rating_color_when_unrated: this.cache.colors,
                    },
                }),
                mod_panel_shared_definition: object({
                    keys: {
                        logo_box_layout: super.layout(),
                        logo_box_shared_definition: object({
                            keys: {
                                name_layout: super.layout(),
                                name_background_color: color(),
                                name_text_color: this.cache.colors,
                                name_font: this.cache.fonts,
                            },
                        }),
                        short_description_label_style: super.label_style(),
                        short_description_label_layout: super.layout(),
                        long_description_box_style: super.box_style(),
                        long_description_box_layout: super.layout(),
                        action_button_style: super.style(),
                        enable_action_button_layout: super.layout(),
                        disable_action_button_layout: super.layout(),
                        action_button_texts: object({
                            keys: {
                                enable_local_filesystem_mod: this.cache.localisation,
                                disable_local_filesystem_mod: this.cache.localisation,
                                subscribe_to_mod: this.cache.localisation,
                                unsubscribe_from_mod: this.cache.localisation,
                            },
                        }),
                    },
                }),
                view_buttons_panel: object({
                    keys: {
                        layout: super.layout(),
                        orientation: super.orientation(),
                        manage_button: super.button(this.cache),
                        browse_service_provider_button: super.button(this.cache),
                        browse_local_filesystem_button: super.button(this.cache),
                    },
                }),
                view_windows_panel: object({
                    keys: {
                        layout: super.layout(),
                    },
                }),
            },
        })
    }
}
