const { schema, string, object, integer, vector2 } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class CommonTooltip extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.cache = cache
    }

    fancy_header() {
        return object({
            keys: {
                vertical_gaps: object({
                    keys: {
                        bottom_to_icon: integer(true),
                        bottom_to_text: integer(true),
                        bottom_to_primary_only_text: integer(true),
                        bottom_to_big_number: integer(true),
                        primary_and_secondary_text: integer(true),
                        post_content: integer(true),
                    },
                }),
                horizontal_gaps: object({
                    keys: {
                        left_to_icon: integer(true),
                        icon_to_text: integer(true),
                        text_to_big_number: integer(true),
                        right_to_big_number: integer(true),
                    },
                }),
                content_height: integer(true),
                icon_size: vector2(),
                primary_text_font: this.cache.fonts,
                secondary_text_font: this.cache.fonts,
                big_number_text_font: this.cache.fonts,
            },
        })
    }

    create() {
        return schema({
            keys: {
                fancy_header: this.fancy_header(),
                price_label_text: this.cache.localisation,
                refund_label_text: this.cache.localisation,
                rate_per_minute_postfix: this.cache.localisation,
                asset_delta_event_header_text: this.cache.localisation,
                rate_per_second_postfix: this.cache.localisation,
                seconds_duration_postfix: this.cache.localisation,
                minutes_duration_postfix: this.cache.localisation,
                seconds_ago_postfix: this.cache.localisation,
                minutes_ago_postfix: this.cache.localisation,
                input_mappings: super.label_form(this.cache),
                unit_count_prefix: string(),
                count_postfix: string(),
                gravity_well_distance_postfix: string(),
                is_enabled_value_text: this.cache.localisation,
                is_not_enabled_value_text: this.cache.localisation,
                is_enabled_value_color: this.cache.colors,
                is_not_enabled_value_color: this.cache.colors,
                yes_text: this.cache.localisation,
                no_text: this.cache.localisation,
                not_ok_query_color: this.cache.colors,
                slash_value_separator_text: this.cache.localisation,
                space_value_separator_text: this.cache.localisation,
                dash_value_separator_text: this.cache.localisation,
                exotic_price_label: this.cache.localisation,
                default_exotic_name_color: this.cache.colors,
                insufficient_exotic_name_color: this.cache.colors,
                sufficient_exotic_name_color: this.cache.colors,
                asset_value_horizontal_gap: integer(),
                asset_value_column_width: integer(),
                warning_description_color: this.cache.colors,
                exotic_count_color: this.cache.colors,
                upgrade_arrow_icon: this.cache.textures,
                reverse_arrow_icon: this.cache.textures,
                upgrade_arrow_offset: integer(),
                unit_tag_color: this.cache.colors,
                planet_type_color: this.cache.colors,
                weapon_tag_color: this.cache.colors,
                build_kind_color: this.cache.colors,
                strikecraft_kind_color: this.cache.colors,
                npc_tag_color: this.cache.colors,
                exotic_type_color: this.cache.colors,
                list_truncated_text: string(),
                player_alliance_simple_relationship_names: object({
                    keys: {
                        friendly: this.label_form2(this.cache),
                        enemy: this.label_form2(this.cache),
                        neutral: this.label_form2(this.cache),
                    },
                }),
            },
        })
    }
}
