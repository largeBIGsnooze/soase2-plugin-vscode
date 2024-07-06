const { DiagnosticReporter } = require('../../data/diagnostic-reporter')
const { prerequisites } = require('../definitions')
const { has } = require('../../utils/utils')
const { version, integer, boolean, object, schema, enumerate, vector2i, array, float } = require('../data_types')
const UI = require('../ui_definitions')
const Definitions = require('../definitions')
const { PlanetModifiers, PlanetTypeGroups, PlayerModifiers, UnitModifiers, WeaponModifiers, UnitFactoryModifiers } = require('../modifier_definitions')

module.exports = class UnitItem {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    get item_type() {
        try {
            switch (this.json.data.item_type) {
                case 'planet_component': {
                    this.json.map_unused_keys('', this.json.data, ['is_ruler_ship', 'build_prerequisites', 'weapon_modifiers', 'owner_constraint', 'phase_resonance_capacitor', 'required_excavation_level', 'planet_types', 'unit_modifiers', 'unit_factory_modifiers'])

                    this.json.map_required_keys('', this.json.data, ['planet_type_groups'])
                    break
                }
                case 'planet_bonus': {
                    this.json.map_unused_keys('', this.json.data, [
                        'is_ruler_ship',
                        'planet_type_groups',
                        'add_back_finite_item_to_player_inventory',
                        'is_finite',
                        'is_planet_garrison',
                        'build_group_id',
                        'exotic_price',
                        'build_prerequisites',
                        'build_time',
                        'weapon_modifiers',
                        'additive_scuttle_time',
                        'required_unit_tags',
                        'price',
                        'always_show_in_shop',
                        'consumable_stack_count',
                        'max_count_on_unit',
                        'required_planet_level',
                        'owner_constraint',
                        'phase_resonance_capacitor',
                        'other_item_requirements',
                        'unit_modifiers',
                        'unit_factory_modifiers',
                        'will_scuttle_destroy_planet_and_strip_resources',
                    ])

                    break
                }
                case 'planet_artifact': {
                    this.json.map_unused_keys('', this.json.data, [
                        'is_ruler_ship',
                        'planet_type_groups',
                        'add_back_finite_item_to_player_inventory',
                        'is_finite',
                        'is_planet_garrison',
                        'build_group_id',
                        'exotic_price',
                        'build_prerequisites',
                        'build_time',
                        'weapon_modifiers',
                        'additive_scuttle_time',
                        'required_unit_tags',
                        'price',
                        'always_show_in_shop',
                        'consumable_stack_count',
                        'max_count_on_unit',
                        'required_planet_level',
                        'owner_constraint',
                        'phase_resonance_capacitor',
                        'other_item_requirements',
                        'unit_modifiers',
                        'unit_factory_modifiers',
                        'will_scuttle_destroy_planet_and_strip_resources',
                    ])
                    break
                }
                case 'ship_component': {
                    this.json.map_unused_keys('', this.json.data, [
                        'planet_type_groups',
                        'add_back_finite_item_to_player_inventory',
                        'is_planet_garrison',
                        'additive_scuttle_time',
                        'required_planet_level',
                        'planet_modifiers',
                        'required_excavation_level',
                        'planet_types',
                        'will_scuttle_destroy_planet_and_strip_resources',
                    ])

                    this.json.map_required_keys('', this.json.data, ['build_group_id'])
                    break
                }
                default: {
                    break
                }
            }
        } catch {}
        return enumerate({
            items: ['planet_component', 'planet_bonus', 'planet_artifact', 'ship_component'],
        })
    }

    requiredExcavationLevel() {
        try {
            if (has(this.json.data, 'required_excavation_level') && !has(this.json.data, 'planet_types')) {
                this.json.unused_key('/required_excavation_level', 'required_excavation_level')
            }
        } catch {}
        return vector2i()
    }

    tradeCapacity() {
        return object({
            keys: {
                import_points: float(),
                export_points: object({
                    keys: {
                        credits: float(),
                        metal: float(),
                        crystal: float(),
                    },
                }),
            },
        })
    }

    otherItemRequirements() {
        return object({
            keys: {
                mutually_exclusive_items: array({
                    items: this.cache.unit_items,
                    isUnique: true,
                }),
                needed_items: array({
                    items: this.cache.unit_items,
                    isUnique: true,
                }),
            },
        })
    }

    ownerConstraint() {
        return object({
            keys: {
                constraint_type: Definitions.getConstraintType(),
                weapon_tag: this.cache.weapon_tags,
            },
            required: ['constraint_type'],
        })
    }

    planetGarrisonHudIcons() {
        try {
            if (this.json.data.is_planet_garrison === true && !has(this.json.data, 'planet_garrison_hud_icons')) {
                this.json.key_requires('/is_planet_garrison', 'planet_garrison_hud_icons')
            } else if (this.json.data.is_planet_garrison === false && has(this.json.data, 'planet_garrison_hud_icons')) {
                this.json.unused_key('/is_planet_garrison', 'planet_garrison_hud_icons')
            }
        } catch {}
        return object({
            keys: {
                hold: this.cache.textures,
                roam_defensive: this.cache.textures,
                roam_offensive: this.cache.textures,
            },
        })
    }

    ownerUnitAbilityTooltips() {
        return array({
            items: object({
                keys: {
                    ability: this.cache.abilities,
                    tooltip_lines: UI.tooltip_lines(this.cache),
                },
            }),
        })
    }

    phaseResonanceCapacitor() {
        return object({
            keys: {
                time_to_store_point: array({
                    items: float(),
                }),
            },
            required: ['time_to_store_point'],
        })
    }

    create() {
        return schema({
            keys: {
                version: version(),
                item_type: this.item_type,
                hud_icon: this.cache.textures,
                name: this.cache.localisation,
                tooltip_icon: this.cache.textures,
                tooltip_picture: this.cache.textures,
                description: this.cache.localisation,
                build_time: float(),
                price: Definitions.price(),
                exotic_price: Definitions.exotic_price(this.cache.exotics),
                build_prerequisites: prerequisites(this.cache.research_subjects),
                max_count_on_unit: integer(),
                build_group_id: this.cache.unit_item_build_group_ids,
                ability: this.cache.abilities,
                planet_types: array({
                    items: this.cache.planets,
                    isUnique: true,
                }),
                required_excavation_level: this.requiredExcavationLevel(),
                always_show_in_shop: boolean(),
                is_finite: boolean(),
                planet_modifiers: PlanetModifiers.create(this.cache.planet_modifier_ids),
                planet_type_groups: PlanetTypeGroups.create(this.cache.planets, this.cache.research_subjects),
                player_modifiers: PlayerModifiers.createResearchSubject(this.cache.research_subjects, this.cache.planets),
                required_unit_tags: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                unit_modifiers: UnitModifiers.create(
                    {
                        hasArrayValues: true,
                    },
                    this.cache
                ),
                trade_capacity: this.tradeCapacity(),
                item_level_count: float(),
                item_level_source: enumerate({
                    items: ['research_prerequisites_per_level'],
                }),
                item_level_prerequisites: array({
                    items: prerequisites(this.cache.research_subjects),
                    isUnique: true,
                }),
                required_planet_level: float(),
                other_item_requirements: this.otherItemRequirements(),
                consumable_stack_count: array({
                    items: float(),
                }),
                owner_constraint: this.ownerConstraint(),
                weapon_modifiers: WeaponModifiers.create(
                    {
                        hasArrayValues: true,
                    },
                    this.cache
                ),
                is_planet_garrison: boolean(),
                planet_garrison_hud_icons: this.planetGarrisonHudIcons(),
                unit_mutations: array({
                    items: this.cache.mutations,
                    isUnique: true,
                }),
                owner_unit_ability_tooltips: this.ownerUnitAbilityTooltips(),
                unit_factory_modifiers: UnitFactoryModifiers.create(
                    {
                        hasArrayValues: true,
                    },
                    this.cache.build_kinds
                ),
                ability_gui_action: this.cache.gui_actions,
                add_back_finite_item_to_player_inventory: boolean(),
                phase_resonance_capacitor: this.phaseResonanceCapacitor(),
                will_scuttle_destroy_planet_and_strip_resources: boolean(),
                additive_scuttle_time: float(),
                is_ruler_ship: boolean(),
            },
            required: ['item_type', 'hud_icon', 'name', 'description'],
        })
    }
}
