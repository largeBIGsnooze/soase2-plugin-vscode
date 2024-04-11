const DiagnosticStorage = require('../../data/diagnostic-storage')
const { boolean, object, enumerate, schema, array, integer, vecInt2, If, float } = require('../data_types')
const Definitions = require('../definitions')

const expectedTier = (x) => {
    return Math.floor(x / 2)
}

module.exports = class ResearchSubject extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.json = JSON.parse(fileText)
        this.diagStorage = new DiagnosticStorage(fileText, diagnostics)

        this.cache = cache
    }

    get getField() {
        if (this.json?.domain === 'military') {
            return this.cache.research_fields('military')
        } else {
            return this.cache.research_fields('civilian')
        }
    }

    get getFieldCoord() {
        try {
            let x = this.json?.field_coord[0]

            if (this.json?.tier && this.json?.tier !== expectedTier(x)) {
                this.diagStorage.messages.fieldCoordMatch(x, expectedTier(x))
            }
        } catch (err) {
            // Silent
        }

        return vecInt2()
    }

    get getBonusUnitLimits() {
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

    get getBuffProviders() {
        return array({
            items: object({
                keys: {
                    scope: enumerate({
                        items: ['all_owned_units', 'all_phase_lanes'],
                    }),
                    action_data_source: this.cache.action_data_sources,
                    extra_level_prerequisites: array({
                        items: super.getResearchSubjects(this.cache.research_subjects),
                        isUnique: true,
                    }),
                    buff: this.cache.buffs,
                    tooltip_sub_header_label: this.cache.localisation,
                    tooltip_lines: this.tooltip_lines(this.cache.localisation, this.cache.unit_items, this.cache.units, this.cache.action_values, this.cache.buff_unit_modifiers, this.cache.weapon_modifier_ids, this.cache.planet_modifier_ids, this.cache.buff_unit_factory_modifiers),
                    all_owned_units_target_filter: '',
                },
                condition: If({
                    key: 'scope',
                    value: 'all_owned_units',
                    requires: ['all_owned_units_target_filter'],
                    properties: {
                        all_owned_units_target_filter: this.getAllOwnedUnitsTargetFilter,
                    },
                }),
            }),
        })
    }

    get getAllOwnedUnitsTargetFilter() {
        return object({
            keys: {
                unit_types: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                ownerships: super.getOwnerships,
                constraints: super.getConstraints(this.cache.weapon_tags, this.cache.buffs, this.cache.mutations, this.cache.action_values, this.cache.units),
            },
            required: ['ownerships'],
        })
    }

    get getNpcAlliance() {
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
                version: float(),
                domain: super.getDomain,
                tier: enumerate({
                    items: [0, 1, 2, 3, 4],
                    isIntType: true,
                }),
                field: this.getField,
                field_coord: this.getFieldCoord,
                research_time: float(),
                price: super.price,
                prerequisites: super.getResearchSubjects(this.cache.research_subjects),
                exotic_price: super.exotic_price(this.cache.exotics),
                npc_modifiers: super.create().modifiers.npc_modifiers.create(super.getResearchSubjects(this.cache.research_subjects)),
                weapon_modifiers: super.create().modifiers.weapon_modifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    super.getResearchSubjects(this.cache.research_subjects),
                    this.cache.weapon_tags
                ),
                unit_modifiers: super.create().modifiers.unit_modifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache.ship_tags,
                    this.cache.action_values,
                    this.cache.buff_unit_modifiers
                ),
                planet_modifiers: super.create().modifiers.planet_modifiers.createResearchSubject(this.cache.planets),
                empire_modifiers: super.create().modifiers.empire_modifiers.create(),
                buff_providers: this.getBuffProviders,
                exotic_factory_modifiers: super.create().modifiers.exotic_factory_modifiers.create(this.cache.exotics),
                unit_factory_modifiers: super.create().modifiers.unit_factory_modifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache.build_kinds
                ),
                windfall: super.getWindfall(this.cache.exotics, this.cache.units),
                npc_alliance: this.getNpcAlliance,
                bonus_unit_limits: this.getBonusUnitLimits,
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
