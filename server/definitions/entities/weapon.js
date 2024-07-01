const DiagnosticStorage = require('../../data/diagnostic-storage')
const { float, vector3, object, schema, enumerate, array, percentage } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class Weapon extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)
        this.fileText = fileText
        this.diagnostics = diagnostics
        this.gameInstallationFolder = gameInstallationFolder
        this.diagStorage = new DiagnosticStorage(this.fileText, diagnostics)

        this.fileName = fileName

        this.cache = cache
    }

    torpedoFiringDefinition() {
        return object({
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
        })
    }

    firing() {
        const json = JSON.parse(this.fileText)

        const isSpawnTorpedo = () => {
            return json?.firing?.firing_type === 'spawn_torpedo'
        }

        const hasTorpedoFiringDefinition = () => {
            return json?.firing?.hasOwnProperty('torpedo_firing_definition')
        }

        if (isSpawnTorpedo() && !hasTorpedoFiringDefinition()) {
            this.diagStorage.messages.requiresKey('firing_type', 'torpedo_firing_definition')
        }

        if (!isSpawnTorpedo() && hasTorpedoFiringDefinition()) {
            this.diagStorage.messages.unusedKey('firing_type', 'torpedo_firing_definition')
        }

        return object({
            keys: {
                firing_type: enumerate({
                    items: ['projectile', 'spawn_torpedo', 'beam'],
                }),
                travel_speed: float(),
                beam_duration: float(),
                charge_duration: float(),
                torpedo_firing_definition: this.torpedoFiringDefinition(),
            },
        })
    }

    turret() {
        return object({
            keys: {
                type: enumerate({
                    items: ['biaxial', 'gimbal'],
                }),
                biaxial_base_mesh: this.cache.child_meshes,
                biaxial_barrel_mesh: this.cache.child_meshes,
                barrel_position: vector3(),
                gimbal_mesh: this.cache.child_meshes,
                muzzle_positions: array({
                    items: vector3(),
                }),
            },
            required: ['type'],
        })
    }

    create() {
        return schema({
            keys: {
                version: float(),
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
                damage_affect_type: super.damageAffectType,
                damage: float(),
                penetration: float(),
                hull_armor_penetration: float(),
                tags: array({
                    items: this.cache.weapon_tags,
                    isUnique: true,
                }),
                modifiers: super.create().modifiers.weapon_modifiers.create(
                    {
                        hasArrayValues: false,
                    },
                    this.cache
                ),
                acquire_target_logic: enumerate({
                    items: ['order_target_only', 'order_target_or_best_target_in_range', 'best_target_in_range'],
                }),
                firing: this.firing(),
                effects: super.getEffects(this.cache.particle_effects),
                burst_pattern: array({
                    items: float(),
                }),
                turret: this.turret(),
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
