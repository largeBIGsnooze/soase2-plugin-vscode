const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const loc_keys = require('../../loc_keys')
const { float, vector3f, object, schema, enumerate, array, percentage, boolean } = require('../data_types')
const Definitions = require('../definitions')
const { WeaponModifiers } = require('../modifier_definitions')

module.exports = class Weapon {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    isTurretType(type) {
        return this.json?.data?.turret?.type === type
    }
    isFiringType(type) {
        return this.json?.data?.firing?.firing_type === type
    }
    torpedo_definition() {
        try {
            if (this.isFiringType('spawn_torpedo')) {
                this.json.validate_keys('/firing', this.json.data.firing, ['torpedo_firing_definition'], ['beam_duration', 'travel_speed'])
                return {
                    torpedo_firing_definition: object({
                        keys: {
                            spawned_unit: this.cache.units,
                            duration: float(),
                            bypass_shields_chance: percentage(),
                            enable_steering_distance_as_radius_scalar: float(),
                        },
                        required: ['duration', 'spawned_unit'],
                    }),
                }
            }
        } catch {}
    }

    projectile_definition() {
        try {
            if (this.isFiringType('projectile')) {
                this.json.validate_keys('/firing', this.json.data.firing, ['travel_speed'], ['beam_duration', 'torpedo_firing_definition'])
                return {
                    charge_duration: float(true),
                    travel_speed: float(true),
                }
            }
        } catch {}
    }

    beam_definition() {
        try {
            if (this.isFiringType('beam')) {
                this.json.validate_keys('/firing', this.json.data.firing, ['beam_duration'], ['travel_speed', 'torpedo_firing_definition'])
                return {
                    beam_duration: float(true),
                }
            }
        } catch {}
    }

    turret_definition() {
        try {
            if (this.isTurretType('biaxial')) {
                this.json.validate_keys('/turret', this.json.data.turret, ['biaxial_base_mesh', 'biaxial_barrel_mesh'], ['gimbal_mesh'])
                return {
                    biaxial_base_mesh: this.cache.child_meshes,
                    biaxial_barrel_mesh: this.cache.child_meshes,
                    barrel_position: vector3f(),
                }
            } else if (this.isTurretType('gimbal')) {
                this.json.validate_keys(
                    '/turret',
                    this.json.data.turret,
                    ['gimbal_mesh'],
                    ['biaxial_base_mesh', 'biaxial_barrel_mesh', 'barrel_position']
                )
                return {
                    gimbal_mesh: this.cache.child_meshes,
                }
            }
        } catch {}
    }

    create() {
        try {
            switch (this.json.data.weapon_type) {
                case 'normal':
                    this.json.validate_keys('/weapon_type', this.json.data, ['damage', 'penetration'], ['bombing_damage'])
                    break
                case 'planet_bombing':
                    this.json.validate_keys('/weapon_type', this.json.data, ['bombing_damage'], ['damage', 'penetration'])
                    break
            }
        } catch {}
        return schema({
            required: ['acquire_target_logic', 'cooldown_duration', 'effects', 'name', 'pitch_speed', 'range', 'weapon_type', 'yaw_speed'],
            keys: {
                name: this.cache.localisation,
                pitch_speed: float(true),
                yaw_speed: float(true),
                weapon_type: Definitions.weapon_type(),
                pitch_firing_tolerance: float(true),
                /* game_version v1.30.0 */
                always_check_is_dead_soon: boolean(),
                /* */
                yaw_firing_tolerance: float(true),
                range: float(),
                cooldown_duration: float(),
                uniforms_target_filter_id: this.cache.target_filters_uniforms,
                weapon_type: Definitions.weapon_type(),
                damage_affect_type: Definitions.damage_affect_type(),
                target_acquired_duration_required_to_fire: float(),
                damage: float(),
                penetration: float(),
                custom_target_filter: Definitions.target_filter_definition(
                    this.json.data?.custom_target_filter,
                    '/custom_target_filter',
                    this.cache,
                    this.json
                ),
                tags: array({
                    items: this.cache.weapon_tags,
                    isUnique: true,
                }),
                modifiers: WeaponModifiers.create(this.cache),
                acquire_target_logic: enumerate({
                    items: ['order_target_only', 'order_target_or_best_target_in_range', 'best_target_in_range'],
                }),
                firing: object({
                    desc: loc_keys.WEAPON_FIRING,
                    required: ['firing_type'],
                    keys: {
                        firing_type: enumerate({
                            items: ['projectile', 'beam', 'missile', 'spawn_torpedo'],
                        }),
                        ...this.torpedo_definition(),
                        ...this.projectile_definition(),
                        ...this.beam_definition(),
                    },
                }),
                effects: Definitions.weapon_effects_definition(this.cache),
                burst_pattern: array({
                    items: float(),
                }),
                turret: object({
                    keys: {
                        type: enumerate({ items: ['none', 'gimbal', 'biaxial'] }),
                        muzzle_positions: array({
                            items: vector3f(),
                        }),
                        ...this.turret_definition(),
                    },
                    required: ['type'],
                }),
                attack_target_type_groups: array({
                    items: this.cache.attack_target_type_groups,
                    isUnique: true,
                }),
                bombing_damage: float(true),
            },
        })
    }
}
