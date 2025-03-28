const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const loc_keys = require('../../loc_keys')
const { boolean, object, enumerate, schema, array, integer, exclusiveArray, vector2i, float } = require('../data_types')
const Definitions = require('../definitions')
const {
    EmpireModifiers,
    ExoticFactoryModifiers,
    NpcModifiers,
    PlanetModifiers,
    PlayerModifiers,
    StrikecraftModifiers,
    UnitFactoryModifiers,
    UnitModifiers,
    WeaponModifiers,
} = require('../modifier_definitions')

module.exports = class ResearchSubject {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    bonus_unit_limits() {
        return object({
            keys: {
                star: array({
                    items: object({
                        required: ['unit_limit'],
                        keys: {
                            tag: this.cache.ship_tags,
                            unit_limit: integer(),
                        },
                    }),
                }),
                global: array({
                    items: object({
                        required: ['unit_limit'],
                        keys: {
                            tag: this.cache.ship_tags,
                            unit_limit: integer(),
                        },
                    }),
                }),
                planet: array({
                    items: object({
                        required: ['unit_limit'],
                        keys: {
                            tag: this.cache.ship_tags,
                            unit_limit: integer(),
                        },
                    }),
                }),
            },
        })
    }
    buff_providers(ctx, ptr) {
        const json_builder = {}
        try {
            if (Array.isArray(ctx)) {
                ctx.forEach((provider, i) => {
                    if (provider.scope == 'all_owned_units') {
                        json_builder['all_owned_units_target_filter'] = Definitions.target_filter_definition(
                            provider.all_owned_units_target_filter,
                            ptr + `/${i}/all_owned_units_target_filter`,
                            this.cache,
                            this.json
                        )
                        this.json.validate_keys(ptr + `/${i}`, provider, ['all_owned_units_target_filter'], [])
                    }
                })
            }
        } catch {}
        return array({
            items: object({
                keys: {
                    action_data_source: this.cache.action_data_sources,
                    buff: this.cache.buffs,
                    extra_level_prerequisites: exclusiveArray({
                        items: Definitions.research_prerequisites(this.cache.research_subjects),
                        minItems: 1,
                        maxItems: 5,
                    }),
                    scope: enumerate({ items: ['all_owned_units', 'all_phase_lanes', 'all_established_dominant_culture_gravity_wells'] }),
                    tooltip_lines: Definitions.tooltip_line(this.json?.data.buff_providers, '/buff_providers', this.json, this.cache),
                    tooltip_sub_header_label: this.cache.localisation,
                    ...json_builder,
                },
            }),
        })
    }

    npc_alliance_definition() {
        return object({
            keys: {
                npc_tag: enumerate({ items: ['pirates'] }),
                alliance_types: array({
                    items: enumerate({
                        items: ['cease_fire', 'share_vision', 'synergy'],
                    }),
                }),
            },
            required: ['alliance_types', 'npc_tag'],
        })
    }

    create() {
        try {
            const tier = this.json?.data?.tier
            const field_coord_x = this.json?.data?.field_coord[0]

            if (tier && tier !== Math.floor(field_coord_x / 2)) {
                this.json.reportAtPos(
                    '/field_coord',
                    `field_coord.x (${field_coord_x}) has a tier of ${Math.floor(
                        field_coord_x / 2
                    )} which doesn't match it's explicit tier of ${tier}`
                )
            }
        } catch {}

        return schema({
            required: ['domain', 'field', 'field_coord', 'name', 'name_uppercase', 'price', 'research_time', 'tier'],
            keys: {
                field: this.cache.research_fields,
                field_coord: vector2i(loc_keys.FIELD_COORD),
                tier: this.cache.max_tier_count,
                all_culture_known: boolean(),
                bonus_unit_limits: this.bonus_unit_limits(),
                buff_providers: this.buff_providers(this.json?.data?.buff_providers, '/buff_providers'),
                arbitary_research_line: Definitions.arbitary_research_line_definition(this.cache),
                description: this.cache.localisation,
                domain: Definitions.domain('Research type'),
                empire_modifiers: EmpireModifiers.create(),
                exotic_factory_modifiers: ExoticFactoryModifiers.create(this.cache),
                exotic_price: Definitions.exotic_price(this.cache),
                extra_text_filter_strings: array({ items: this.cache.localisation, isUnique: true }),
                hud_icon: this.cache.textures(),
                name: this.cache.localisation,
                name_uppercase: this.cache.localisation,
                npc_alliance: this.npc_alliance_definition(),
                npc_modifiers: NpcModifiers.create(this.cache),
                planet_modifiers: PlanetModifiers.create(this.cache),
                player_modifiers: PlayerModifiers.create(this.cache),
                prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                price: Definitions.price_definition(),
                provides_detection_to_all_trade_ships: boolean(),
                provides_dominant_culture_detection: boolean(),
                provides_victory_condition_alliance_guard: boolean(),
                required_allied_player_race: this.cache.players,
                research_time: float(true, loc_keys.RESEARCH_TIME),
                strikecraft_modifiers: StrikecraftModifiers.create(this.cache),
                tooltip_icon: this.cache.textures(),
                tooltip_picture: this.cache.textures(),
                unit_factory_modifiers: UnitFactoryModifiers.create(this.cache),
                unit_modifiers: UnitModifiers.create(this.cache),
                weapon_modifiers: WeaponModifiers.create(this.cache),
                windfall: Definitions.windfall_definition(this.cache),
            },
        })
    }
}
