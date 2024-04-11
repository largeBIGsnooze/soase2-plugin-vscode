const { schema, string, object, float, vecInt2, color } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class HudTradeWindow extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                opening_duration: float(),
                closing_duration: float(),
                fade_function: string(),
                move_function: string(),
                container_window: object({
                    keys: {
                        layout: super.layout(),
                        background: super.background(this.cache.textures),
                        content_window: object({
                            keys: {
                                title_label: super.label(this.cache.localisation),
                                import_points_window: object({
                                    keys: {
                                        layout: super.layout(),
                                        background: super.background(this.cache.textures),
                                        header_label: super.label(this.cache.localisation),
                                        points_label: super.label(this.cache.localisation),
                                    },
                                }),
                                export_asset_windows_panel: super.panel(this.cache.localisation, this.cache.colors, this.cache.textures, {
                                    extra_properties: {
                                        asset_window_shared_definition: object({
                                            keys: {
                                                portrait_window: this.window_frame(this.cache.textures, this.cache.fonts, this.cache.colors),
                                                points_window: object({
                                                    keys: {
                                                        layout: super.layout(),
                                                        background: this.cache.textures,
                                                        overlay: this.cache.textures,
                                                        pip_layout_grid: super.layout_grid(),
                                                        pip_counts: vecInt2(),
                                                        small_unused_pip_icon: this.cache.textures,
                                                        small_used_pip_icon: this.cache.textures,
                                                        large_unused_pip_icon: this.cache.textures,
                                                        large_used_pip_icon: this.cache.textures,
                                                        points_per_large_pip: float(),
                                                        large_pip_bar: object({
                                                            keys: {
                                                                layout: super.layout(),
                                                                outline_size: float(),
                                                                outline_color: color(),
                                                                backdrop_color: color(),
                                                                bar_color: color(),
                                                            },
                                                        }),
                                                    },
                                                }),
                                                credits_export_window: object({
                                                    keys: {
                                                        portrait_window: object({
                                                            keys: {
                                                                asset_portrait: this.cache.textures,
                                                            },
                                                        }),
                                                    },
                                                }),
                                                metal_export_window: object({
                                                    keys: {
                                                        portrait_window: object({
                                                            keys: {
                                                                asset_portrait: this.cache.textures,
                                                            },
                                                        }),
                                                    },
                                                }),
                                                crystal_export_window: object({
                                                    keys: {
                                                        portrait_window: object({
                                                            keys: {
                                                                asset_portrait: this.cache.textures,
                                                            },
                                                        }),
                                                    },
                                                }),
                                                increase_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, { isPrefixText: true }),
                                                decrease_button: super.button(this.cache.localisation, this.cache.textures, this.cache.colors, { isPrefixText: true }),
                                            },
                                        }),
                                    },
                                }),
                            },
                        }),
                    },
                }),
            },
        })
    }
}
