const DiagnosticStorage = require('../../data/diagnostic-storage')
const { string, integer, boolean, object, schema, enumerate, vecInt2, array, float } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class UnitItem extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.fileText = fileText
        this.diagStorage = new DiagnosticStorage(fileText, diagnostics)
        this.json = JSON.parse(fileText)

        this.cache = cache
    }

    itemTypes() {
        if (this.json?.item_type === 'planet_component' && !this.json?.hasOwnProperty('planet_type_groups')) {
            this.diagStorage.messages.aRequiresB('planet_component', 'planet_component', 'planet_type_groups')
        }

        return enumerate({
            items: ['planet_component', 'planet_bonus', 'planet_artifact', 'ship_component'],
        })
    }

    requiredExcavationLevel() {
        if (this.json?.hasOwnProperty('required_excavation_level') && !this.json?.hasOwnProperty('planet_types')) {
            this.diagStorage.messages.unusedKey('required_excavation_level', 'required_excavation_level')
        }
        return vecInt2()
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
                constraint_type: super.getConstraintType,
                weapon_tag: this.cache.weapon_tags,
            },
        })
    }

    planetGarrisonHudIcons() {
        if (this.json?.is_planet_garrison === true && !this.json?.hasOwnProperty('planet_garrison_hud_icons')) {
            this.diagStorage.messages.requiresKey('is_planet_garrison', 'planet_garrison_hud_icons')
        } else if (this.json?.is_planet_garrison === false && this.json?.hasOwnProperty('planet_garrison_hud_icons')) {
            this.diagStorage.messages.unusedKey('is_planet_garrison', 'planet_garrison_hud_icons')
        }

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
                    tooltip_lines: super.tooltip_lines(this.cache),
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
        })
    }

    create() {
        this.diagStorage.messages.mapUnusedKeys(this.json, this.json?.item_type, 'planet_component', ['is_ruler_ship'])
        this.diagStorage.messages.mapUnusedKeys(this.json, this.json?.item_type, 'planet_bonus', ['is_ruler_ship', 'max_count_on_unit', 'build_prerequisites', 'price', 'exotic_price', 'build_group_id', 'build_time', 'required_unit_tags'])
        this.diagStorage.messages.mapUnusedKeys(this.json, this.json?.item_type, 'planet_artifact', ['is_ruler_ship', 'max_count_on_unit', 'build_prerequisites', 'price', 'exotic_price', 'build_group_id', 'build_time', 'required_unit_tags'])
        return schema({
            keys: {
                version: float(),
                item_type: this.itemTypes(),
                hud_icon: this.cache.textures,
                name: this.cache.localisation,
                tooltip_icon: this.cache.textures,
                tooltip_picture: this.cache.textures,
                description: this.cache.localisation,
                build_time: float(),
                price: super.price,
                exotic_price: super.exotic_price(this.cache.exotics),
                build_prerequisites: super.getResearchSubjects(this.cache.research_subjects),
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
                planet_modifiers: super.create().modifiers.planet_modifiers.create(this.cache.planet_modifier_ids),
                planet_type_groups: super.create().groups.planet_type_groups.create(this.cache.planets, super.getResearchSubjects(this.cache.research_subjects)),
                player_modifiers: super.create().modifiers.player_modifiers.createResearchSubject(super.getResearchSubjects(this.cache.research_subjects), this.cache.planets),
                required_unit_tags: array({
                    items: this.cache.ship_tags,
                    isUnique: true,
                }),
                unit_modifiers: super.create().modifiers.unit_modifiers.create(
                    {
                        hasArrayValues: true,
                    },
                    this.cache
                ),
                trade_capacity: this.tradeCapacity(),
                item_level_count: float(),
                item_level_source: enumerate({ items: ['research_prerequisites_per_level'] }),
                item_level_prerequisites: array({
                    items: super.getResearchSubjects(this.cache.research_subjects),
                    isUnique: true,
                }),
                required_planet_level: float(),
                other_item_requirements: this.otherItemRequirements(),
                consumable_stack_count: array({
                    items: float(),
                }),
                owner_constraint: this.ownerConstraint(),
                weapon_modifiers: super.create().modifiers.weapon_modifiers.create(
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
                unit_factory_modifiers: super.create().modifiers.unit_factory_modifiers.create(
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
