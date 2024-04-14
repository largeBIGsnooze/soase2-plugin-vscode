const { schema, float, string, array, object, color, boolean, enumerate, vecInt2, If } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class UnitSkin extends Definitions {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        super(gameInstallationFolder)

        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                version: float(),
                skin_stages: array({
                    items: object({
                        keys: {
                            is_main_view_icon_visible_camera_distance: float(),
                            unit_radius_when_mesh_visible: float(),
                            min_camera_distance: float(),
                            gui: object({
                                keys: {
                                    hud_icon: this.cache.textures,
                                    hud_monochrome_icon: this.cache.textures,
                                    hud_button_icon: this.cache.textures,
                                    hud_picture: this.cache.textures,
                                    tooltip_icon: this.cache.textures,
                                    name: this.cache.localisation,
                                    description: this.cache.localisation,
                                    hud_selection_window_icon_offet: vecInt2(),
                                },
                            }),
                            unit_mesh: object({
                                keys: {
                                    mesh: this.cache.meshes,
                                    shader: super.getShaders,
                                    is_shadow_blocker: boolean(),
                                },
                            }),
                            child_mesh_alias_bindings: object({
                                keys: {
                                    map: array({
                                        items: array({
                                            items: [
                                                string(),
                                                object({
                                                    keys: {
                                                        mesh: this.cache.meshes,
                                                        shader: super.getShaders,
                                                        is_shadow_blocker: boolean(),
                                                    },
                                                }),
                                            ],
                                            isUnique: true,
                                        }),
                                        isUnique: true,
                                    }),
                                },
                            }),
                            star_mesh: super.planet({
                                textures: this.cache.textures,
                                meshes: this.cache.meshes,
                                properties: {
                                    atmosphere: object({
                                        keys: {
                                            shader: super.getShaders,
                                            material: this.cache.mesh_materials,
                                            noise_texture: this.cache.textures,
                                        },
                                    }),
                                },
                            }),
                            planet_mesh: super.planet({
                                textures: this.cache.textures,
                                meshes: this.cache.meshes,
                                properties: {
                                    city: object({
                                        keys: {
                                            shader: super.getShaders,
                                            city_material: this.cache.mesh_materials,
                                            city_level_texture: this.cache.textures,
                                        },
                                    }),
                                    atmosphere: object({
                                        keys: {
                                            shader: super.getShaders,
                                            cloud_material: this.cache.mesh_materials,
                                            cloud_noise_texture: this.cache.textures,
                                            cloud_rotation_speed: float(),
                                            cloud_animation_speed: float(),
                                            cloud_noise_0_zoom: float(),
                                            cloud_noise_0_intensity: float(),
                                            cloud_noise_1_zoom: float(),
                                            cloud_noise_1_intensity: float(),
                                            atmosphere_color: color(),
                                            atmosphere_spread: float(),
                                        },
                                    }),
                                },
                            }),
                            main_view_icon: object({
                                keys: {
                                    group: this.cache.mainview_groups,
                                    icon: this.cache.textures,
                                    selected_icon: this.cache.textures,
                                    sub_selected_icon: this.cache.textures,
                                    is_additive: boolean(),
                                    has_rotation: boolean(),
                                    override_icon_background_color: color(),
                                    use_owner_player_color: boolean(),
                                },
                            }),
                            effects: object({
                                keys: {
                                    flair_effects: array({
                                        items: object({
                                            keys: {
                                                mesh_point_name: string(),
                                                particle_effect: this.cache.particle_effects,
                                                sound: this.cache.ogg,
                                                constraint: enumerate({
                                                    items: ['is_unit_factory_idle', 'is_exotic_factory_busy', 'has_unit_item', 'is_unit_factory_busy', 'is_loot_collection_active', 'is_crippled', 'is_damaged'],
                                                }),
                                                unit_item: '',
                                            },
                                            condition: If({
                                                key: 'constraint',
                                                value: 'has_unit_item',
                                                requires: ['unit_item'],
                                                properties: {
                                                    unit_item: this.cache.unit_items,
                                                },
                                            }),
                                        }),
                                    }),
                                    level_up_effect: this.cache.particle_effects,
                                    level_up_sound: this.cache.ogg,
                                    hyperspace_effects: object({
                                        keys: {
                                            charge_effect: this.cache.particle_effects,
                                            charge_effect_between_stars: this.cache.particle_effects,
                                            charge_effect_destabilized: this.cache.particle_effects,
                                            travel_effect: this.cache.particle_effects,
                                            travel_effect_between_stars: this.cache.particle_effects,
                                            travel_effect_destabilized: this.cache.particle_effects,
                                            exit_effect: this.cache.particle_effects,
                                            exit_sound: this.cache.ogg,
                                            charge_sound: this.cache.ogg,
                                            enter_sound: this.cache.ogg,
                                        },
                                    }),
                                    shield_effect: this.cache.shield_effects,
                                    effect_alias_bindings: array({
                                        items: array({
                                            items: [
                                                string(),
                                                object({
                                                    keys: {
                                                        particle_effect: this.cache.particle_effects,
                                                        beam: this.cache.beam_effects,
                                                        sounds: array({
                                                            items: this.cache.sounds,
                                                            isUnique: true,
                                                        }),
                                                    },
                                                }),
                                            ],
                                            isUnique: true,
                                        }),
                                    }),
                                    exhaust_effects: object({
                                        keys: {
                                            particle_effects: array({
                                                items: object({
                                                    keys: {
                                                        mesh_point: string(),
                                                        particle_effect: this.cache.particle_effects,
                                                    },
                                                }),
                                            }),
                                            trail_effects: array({
                                                items: object({
                                                    required: ['trail_effect'],
                                                    keys: {
                                                        trail_effect: this.cache.exhaust_trail_effects,
                                                    },
                                                }),
                                            }),
                                        },
                                    }),
                                },
                            }),
                            sounds: object({
                                keys: {
                                    move_sounds: object({
                                        keys: {
                                            engine: this.cache.sounds,
                                            hyperspace_travel: this.cache.sounds,
                                        },
                                    }),
                                    dialogue: object({
                                        keys: {
                                            spawned: array({
                                                items: this.cache.sounds,
                                                isUnique: true,
                                            }),
                                            selected: array({
                                                items: this.cache.sounds,
                                                isUnique: true,
                                            }),
                                            order_issued: array({
                                                items: this.cache.sounds,
                                                isUnique: true,
                                            }),
                                            attack_order_issued: array({
                                                items: this.cache.sounds,
                                                isUnique: true,
                                            }),
                                            hyperspace_charge_started: array({
                                                items: this.cache.sounds,
                                                isUnique: true,
                                            }),
                                        },
                                    }),
                                },
                            }),
                            death_sequence_group: this.cache.death_sequence_groups,
                            light: object({
                                keys: {
                                    type: enumerate({ items: ['point_infinite'] }),
                                    color: color(),
                                    intensity: float(),
                                },
                            }),
                            use_mesh_bounding_sphere_for_hit_effects: boolean(),
                        },
                    }),
                }),
                gravity_well_props: array({
                    items: this.cache.gravity_well_props,
                    isUnique: true,
                }),
            },
            required: ['skin_stages'],
        })
    }
}
