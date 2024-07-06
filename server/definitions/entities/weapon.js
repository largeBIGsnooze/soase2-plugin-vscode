const { DiagnosticReporter } = require('../../data/diagnostic-reporter')
const { float, vector3f, object, schema, enumerate, array, percentage, version } = require('../data_types')
const Definitions = require('../definitions')
const { WeaponModifiers } = require('../modifier_definitions')

class Firing {
    constructor(cache, json) {
        this.json = json
        this.firingData = json.data.firing
        this.cache = cache
    }

    isFiring(type) {
        return this.firingData.firing_type === type
    }
    torpedo_definition() {
        try {
            if (this.isFiring('spawn_torpedo')) {
                this.json.map_required_keys('/firing', this.firingData, ['torpedo_firing_definition'])
                this.json.map_unused_keys('/firing', this.firingData, ['beam_duration', 'travel_speed'])
                return {
                    torpedo_firing_definition: object({
                        keys: {
                            spawned_unit: this.cache.units,
                            buff: this.cache.buffs,
                            buff_data_source: this.cache.action_data_sources,
                            damage_variable_id: this.cache.float_variables,
                            penetration_variable_id: this.cache.float_variables,
                            bypass_shields_chance_variable_id: this.cache.float_variables,
                            duration_variable_id: this.cache.float_variables,
                            duration: float(),
                            bypass_shields_chance: percentage(),
                            enable_steering_distance_as_radius_scalar: float(),
                        },
                        required: ['spawned_unit', 'buff', 'buff_data_source', 'damage_variable_id', 'penetration_variable_id', 'bypass_shields_chance_variable_id', 'duration_variable_id', 'duration'],
                    }),
                }
            }
        } catch {}
    }

    projectile_definition() {
        try {
            if (this.isFiring('projectile')) {
                this.json.map_required_keys('/firing', this.firingData, ['travel_speed'])
                this.json.map_unused_keys('/firing', this.firingData, ['beam_duration', 'torpedo_firing_definition'])
                return {
                    charge_duration: float(),
                    travel_speed: float(),
                }
            }
        } catch {}
    }

    beam_definition() {
        try {
            if (this.isFiring('beam')) {
                this.json.map_required_keys('/firing', this.firingData, ['beam_duration'])
                this.json.map_unused_keys('/firing', this.firingData, ['travel_speed', 'torpedo_firing_definition'])
                return {
                    beam_duration: float(),
                }
            }
        } catch {}
    }

    definition() {
        try {
            this.json.greater_than_zero(this.firingData.beam_duration, '/firing/beam_duration')
            this.json.greater_than_zero(this.firingData.travel_speed, '/firing/travel_speed')
        } catch {}
        return object({
            keys: {
                firing_type: enumerate({
                    items: ['projectile', 'spawn_torpedo', 'beam'],
                }),
                ...this.torpedo_definition(),
                ...this.projectile_definition(),
                ...this.beam_definition(),
            },
        })
    }
}

class Turret {
    constructor(cache, json) {
        this.json = json
        this.cache = cache
    }

    turret_type(type) {
        return this.json.data.turret.type === type
    }

    gimbal_definition() {
        try {
            if (this.turret_type('gimbal')) {
                this.json.map_unused_keys('/turret', this.json.data.turret, ['biaxial_base_mesh', 'biaxial_barrel_mesh', 'barrel_position'])
                this.json.map_required_keys('/turret', this.json.data.turret, ['gimbal_mesh'])
                return {
                    gimbal_mesh: this.cache.child_meshes,
                }
            }
        } catch {}
    }

    biaxial_definition() {
        try {
            if (this.turret_type('biaxial')) {
                this.json.map_unused_keys('/turret', this.json.data.turret, ['gimbal_mesh'])
                this.json.map_required_keys('/turret', this.json.data.turret, ['biaxial_base_mesh', 'biaxial_barrel_mesh'])
                return {
                    biaxial_base_mesh: this.cache.child_meshes,
                    biaxial_barrel_mesh: this.cache.child_meshes,
                    barrel_position: vector3f(),
                }
            }
        } catch {}
    }

    definition() {
        return object({
            keys: {
                type: enumerate({
                    items: ['biaxial', 'gimbal'],
                }),
                muzzle_positions: array({
                    items: vector3f(),
                }),
                ...this.biaxial_definition(),
                ...this.gimbal_definition(),
            },
            required: ['type'],
        })
    }
}

module.exports = class Weapon {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.firing = new Firing(cache, this.json)
        this.turret = new Turret(cache, this.json)
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                version: version(),
                name: this.cache.localisation,
                pitch_speed: float(),
                yaw_speed: float(),
                pitch_firing_tolerance: float(),
                yaw_firing_tolerance: float(),
                range: float(),
                cooldown_duration: float(),
                uniforms_target_filter_id: this.cache.target_filters_uniforms,
                weapon_type: enumerate({
                    items: ['normal', 'planet_bombing'],
                }),
                damage_affect_type: Definitions.damage_affect_type(),
                damage: float(),
                penetration: float(),
                hull_armor_penetration: float(),
                tags: array({
                    items: this.cache.weapon_tags,
                    isUnique: true,
                }),
                modifiers: WeaponModifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache
                ),
                acquire_target_logic: enumerate({
                    items: ['order_target_only', 'order_target_or_best_target_in_range', 'best_target_in_range'],
                }),
                firing: this.firing.definition(),
                effects: Definitions.getEffects(this.cache.particle_effects),
                burst_pattern: array({
                    items: float(),
                }),
                turret: this.turret.definition(),
                attack_target_type_groups: array({
                    items: this.cache.attack_target_type_groups,
                    isUnique: true,
                }),
                bombing_damage: float(),
            },
            required: ['name', 'pitch_speed', 'yaw_speed', 'range', 'cooldown_duration', 'weapon_type', 'firing', 'acquire_target_logic', 'effects'],
        })
    }
}
