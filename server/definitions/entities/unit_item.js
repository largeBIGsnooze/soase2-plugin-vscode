const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { integer, boolean, object, schema, enumerate, array, float, percentage } = require('../data_types')
const Definitions = require('../definitions')
const {
    PlayerModifiers,
    UnitItemExoticFactoryModifiers,
    UnitItemUnitFactoryModifiers,
    UnitItemUnitModifiers,
    UnitItemWeaponModifiers,
    UnitItemPlanetModifiers,
} = require('../modifier_definitions')

module.exports = class UnitItem {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    trade_capacity() {
        return object({
            keys: {
                import_points: integer(),
                export_points: object({
                    keys: {
                        credits: float(false, 'default=0'),
                        crystal: float(false, 'default=0'),
                        metal: float(false, 'default=0'),
                    },
                }),
            },
        })
    }

    other_item_requirements() {
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

    owner_constraint() {
        return object({
            keys: {
                constraint_type: Definitions.constraint_type(),
                weapon_tag: this.cache.weapon_tags,
            },
            required: ['constraint_type'],
        })
    }

    planet_garrison_hud_icons() {
        try {
            if (this.json?.data.is_planet_garrison === true && !this.json.contains(this.json?.data, 'planet_garrison_hud_icons')) {
                this.json.validate_keys('/is_planet_garrison', this.json?.data, ['planet_garrison_hud_icons'], [])
            } else if (this.json?.data.is_planet_garrison === false && this.json.contains(this.json?.data, 'planet_garrison_hud_icons')) {
                this.json.validate_keys('/is_planet_garrison', this.json?.data, [], ['planet_garrison_hud_icons'])
            }
        } catch {}
        return object({
            keys: {
                hold: this.cache.textures(),
                roam_defensive: this.cache.textures(),
                roam_offensive: this.cache.textures(),
            },
        })
    }

    owner_unit_ability_tooltips_definition() {
        return array({
            items: object({
                required: ['ability', 'tooltip_lines'],
                keys: {
                    ability: this.cache.abilities,
                    tooltip_lines: Definitions.tooltip_line(
                        this.json?.data?.owner_unit_ability_tooltips,
                        '/owner_unit_ability_tooltips',
                        this.json,
                        this.cache
                    ),
                },
            }),
        })
    }

    item_type_definition() {
        return enumerate({
            items: ['ship_component', 'planet_component', 'planet_bonus'],
        })
    }

    unit_item_planet_income_rate_transmuter() {
        return object({
            keys: {
                consumed_asset: Definitions.resources(),
                produced_asset: Definitions.resources(),
                produced_scalar: array({ items: float(false) }),
                consumed_percentage: array({ items: percentage() }),
            },
        })
    }

    unit_item_owner_constraint() {
        return object({
            keys: {
                constraint_type: enumerate({ items: ['has_weapon', 'is_carrier'] }),
                weapon_tag: this.cache.weapon_tags,
            },
        })
    }

    phase_resonance_capacitor() {
        return object({
            keys: {
                time_to_store_point: array({ items: integer() }),
            },
        })
    }

    planet_types() {
        return array({ items: this.cache.planets, isUnique: true })
    }

    planet_type_groups() {
        return array({
            items: object({
                keys: {
                    build_prerequisites: Definitions.research_prerequisites(this.cache.research_subjects),
                    planet_types: this.planet_types(),
                },
            }),
        })
    }

    create() {
        const properties = [
            'is_finite',
            'is_ruler_ship',
            'always_show_in_shop',
            'add_back_finite_item_to_player_inventory',
            'build_time',
            'price',
            'exotic_price',
            'required_unit_tags',
            'max_count_on_unit',
            'consumable_stack_count',
            'other_item_requirements',
            'build_prerequisites',
            'owner_constraint',
            'phase_resonance_capacitor',
            'build_group_id',
            'planet_modifiers',
            'planet_types',
            'required_surveying_level',
            'additive_scuttle_time',
            'will_scuttle_destroy_planet_and_strip_resources',
            'is_planet_garrison',
            'required_planet_level',
            'planet_type_groups',
            'planet_garrison_hud_icons',
        ]
        const json_builder = {}
        try {
            if (this.json?.data.item_level_source == 'research_prerequisites_per_level') {
                json_builder['item_level_prerequisites'] = array({ items: Definitions.research_prerequisites(this.cache.research_subjects) })
            }

            switch (this.json?.data.item_type) {
                case 'ship_component':
                    json_builder['always_show_in_shop'] = boolean()
                    json_builder['is_finite'] = boolean()
                    json_builder['is_ruler_ship'] = boolean()
                    json_builder['always_show_in_shop'] = boolean()
                    json_builder['add_back_finite_item_to_player_inventory'] = boolean()
                    json_builder['build_time'] = float()
                    json_builder['price'] = Definitions.price()
                    json_builder['exotic_price'] = Definitions.exotic_price(this.cache)
                    json_builder['required_unit_tags'] = array({ items: this.cache.ship_tags, isUnique: true })
                    json_builder['max_count_on_unit'] = integer()
                    json_builder['consumable_stack_count'] = array({ items: float() })
                    json_builder['other_item_requirements'] = this.other_item_requirements()
                    json_builder['build_prerequisites'] = Definitions.research_prerequisites(this.cache.research_subjects)
                    json_builder['owner_constraint'] = this.unit_item_owner_constraint()
                    json_builder['phase_resonance_capacitor'] = this.phase_resonance_capacitor()
                    json_builder['build_group_id'] = this.cache.unit_item_build_group_ids
                    this.json.validate_keys('', this.json?.data, ['build_group_id'], [], properties)
                    break
                case 'planet_bonus':
                    json_builder['planet_modifiers'] = UnitItemPlanetModifiers.create(this.cache)
                    json_builder['planet_types'] = this.planet_types()
                    json_builder['required_surveying_level'] = array({ items: integer() })
                    this.json.validate_keys('', this.json?.data, [], [], properties)
                    break
                case 'planet_component':
                    json_builder['always_show_in_shop'] = boolean()
                    json_builder['is_finite'] = boolean()
                    json_builder['additive_scuttle_time'] = float()
                    json_builder['will_scuttle_destroy_planet_and_strip_resources'] = boolean()
                    json_builder['is_planet_garrison'] = boolean()
                    json_builder['add_back_finite_item_to_player_inventory'] = boolean()
                    json_builder['build_time'] = float()
                    json_builder['price'] = Definitions.price()
                    json_builder['exotic_price'] = Definitions.exotic_price(this.cache)
                    json_builder['required_unit_tags'] = array({ items: this.cache.ship_tags, isUnique: true })
                    json_builder['max_count_on_unit'] = integer()
                    json_builder['build_group_id'] = this.cache.unit_item_build_group_ids
                    json_builder['required_planet_level'] = integer()
                    json_builder['consumable_stack_count'] = array({ items: float() })
                    json_builder['other_item_requirements'] = this.other_item_requirements()
                    json_builder['planet_modifiers'] = UnitItemPlanetModifiers.create(this.cache)
                    json_builder['planet_type_groups'] = this.planet_type_groups()
                    json_builder['planet_garrison_hud_icons'] = this.planet_garrison_hud_icons()
                    this.json.validate_keys('', this.json?.data, ['planet_type_groups', 'build_group_id'], [], properties)
                    break
            }
        } catch {}
        return schema({
            required: ['description', 'hud_icon', 'item_type', 'name'],
            keys: {
                ability: this.cache.abilities,
                will_make_planet_invulnerable: boolean(),
                name: this.cache.localisation,
                description: this.cache.localisation,
                ability_gui_action: enumerate({ items: ['explore', 'set_rally_point', 'toggle_unit_factory_window', 'toggle_structures_window'] }),
                exotic_factory_modifiers: UnitItemExoticFactoryModifiers.create(),
                hud_icon: this.cache.textures(),
                is_artifact: boolean(),
                item_level_count: integer(true, '', 1),
                item_level_source: enumerate({
                    items: ['research_prerequisites_per_level', 'fixed_level_0'],
                }),
                item_type: this.item_type_definition(),
                owner_unit_ability_tooltips: this.owner_unit_ability_tooltips_definition(),
                planet_income_rate_transmuter: this.unit_item_planet_income_rate_transmuter(),
                player_modifiers: PlayerModifiers.create(this.cache),
                tooltip_icon: this.cache.textures(),
                tooltip_picture: this.cache.textures(),
                trade_capacity: this.trade_capacity(),
                unit_factory_modifiers: UnitItemUnitFactoryModifiers.create(),
                unit_modifiers: UnitItemUnitModifiers.create(this.cache),
                unit_mutations: array({
                    items: this.cache.mutations,
                    isUnique: true,
                }),
                weapon_modifiers: UnitItemWeaponModifiers.create(this.cache),
                arbitary_pre_details_label: this.cache.localisation,
                ...json_builder,
            },
        })
    }
}
