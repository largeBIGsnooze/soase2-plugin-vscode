const { DiagnosticReporter } = require('../../data/diagnostic-reporter')
const { prerequisites } = require('../definitions')
const { version, boolean, object, enumerate, schema, array, integer, vector2i, If, float } = require('../data_types')
const Buff = require('./buff')
const Definitions = require('../definitions')
const { NpcModifiers, WeaponModifiers, UnitModifiers, PlanetModifiers, EmpireModifiers, ExoticFactoryModifiers, UnitFactoryModifiers } = require('../modifier_definitions')
const UI = require('../ui_definitions')

module.exports = class ResearchSubject extends Buff {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache)
        this.json = new DiagnosticReporter(fileText, diagnostics)

        this.cache = cache
    }

    get field() {
        try {
            if (this.json.data.domain === 'military') {
                return this.cache.research_fields('military')
            } else {
                return this.cache.research_fields('civilian')
            }
        } catch {}
    }

    get bonus_unit_limits() {
        return object({
            keys: {
                planet: array({
                    items: object({
                        keys: {
                            tag: this.cache.ship_tags,
                            unit_limit: integer(),
                        },
                        required: ['unit_limit', 'tag'],
                    }),
                }),
            },
        })
    }

    get buff_providers() {
        return array({
            items: object({
                keys: {
                    scope: enumerate({
                        items: ['all_owned_units', 'all_phase_lanes'],
                    }),
                    action_data_source: this.cache.action_data_sources,
                    extra_level_prerequisites: array({
                        items: prerequisites(this.cache.research_subjects),
                        isUnique: true,
                    }),
                    buff: this.cache.buffs,
                    tooltip_sub_header_label: this.cache.localisation,
                    tooltip_lines: UI.tooltip_lines(this.cache),
                    all_owned_units_target_filter: this.all_owned_units_target_filter,
                },
            }),
        })
    }

    get all_owned_units_target_filter() {
        return object({
            keys: {
                unit_types: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                ownerships: Definitions.getOwnerships(),
                constraints: super.constraints(),
            },
            required: ['ownerships'],
        })
    }

    get npc_alliance() {
        return object({
            keys: {
                npc_tag: enumerate({
                    items: ['pirates'],
                }),
                alliance_types: array({
                    items: enumerate({
                        items: ['cease_fire', 'share_vision'],
                    }),
                }),
            },
            required: ['alliance_types', 'npc_tag'],
        })
    }

    create() {
        return schema({
            keys: {
                version: version(),
                domain: Definitions.getDomain(),
                tier: this.cache.max_tier_count,
                field: this.field,
                field_coord: vector2i(),
                research_time: float(),
                price: Definitions.price(),
                prerequisites: prerequisites(this.cache.research_subjects),
                exotic_price: Definitions.exotic_price(this.cache.exotics),
                npc_modifiers: NpcModifiers.create(this.cache.research_subjects),
                weapon_modifiers: WeaponModifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache
                ),
                unit_modifiers: UnitModifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache
                ),
                planet_modifiers: PlanetModifiers.createResearchSubject(this.cache.planets),
                empire_modifiers: EmpireModifiers.create(),
                buff_providers: this.buff_providers,
                exotic_factory_modifiers: ExoticFactoryModifiers.create(this.cache.exotics),
                unit_factory_modifiers: UnitFactoryModifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache.build_kinds
                ),
                windfall: Definitions.getWindfall(this.cache.exotics, this.cache.units),
                npc_alliance: this.npc_alliance,
                bonus_unit_limits: this.bonus_unit_limits,
                provides_detection_to_all_trade_ships: boolean(),
                provides_victory_condition_alliance_guard: boolean(),
                name: this.cache.localisation,
                description: this.cache.localisation,
                hud_icon: this.cache.textures,
                tooltip_icon: this.cache.textures,
                tooltip_picture: this.cache.textures,
                extra_text_filter_strings: array({
                    items: this.cache.localisation,
                    isUnique: true,
                }),
            },
            required: ['domain', 'tier', 'field', 'field_coord', 'research_time', 'price', 'name', 'hud_icon'],
        })
    }
}
