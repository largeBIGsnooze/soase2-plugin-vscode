const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const loc_keys = require('../../loc_keys')
const { schema, float, string, array, object, color, boolean, enumerate, vector2i, percentage, integer } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class UnitSkin {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    unit_mesh_definition() {
        return object({
            required: ['mesh'],
            keys: {
                mesh: this.cache.meshes,
                is_shadow_blocker: boolean(),
                shader: Definitions.shaders(),
            },
        })
    }

    unit_child_mesh_alias_bindings() {
        return object({
            keys: {
                map: array({
                    items: object({
                        keys: {
                            mesh_alias_name: string(),
                            mesh_definition: this.unit_mesh_definition(),
                        },
                    }),
                }),
            },
        })
    }
    unit_damage_effect_definition() {
        return object({
            keys: {
                hull_percentage_threshold: percentage(),
                max_count: integer(),
                particle_effect: this.cache.particle_effects,
                sound: this.cache.ogg,
                weight: float(),
            },
        })
    }
    unit_damage_effects_definition() {
        return object({
            keys: {
                damage_effects: array({ items: this.unit_damage_effect_definition() }),
                max_damage_effect_count: integer(),
            },
        })
    }
    unit_exhaust_particle_effect_definition() {
        return array({
            items: object({
                keys: {
                    mesh_point: Definitions.meshpoint(),
                    particle_effect: this.cache.particle_effects,
                },
            }),
        })
    }

    unit_exhaust_trail_effect_definition() {
        return array({
            items: object({
                keys: {
                    mesh_point: Definitions.meshpoint(),
                    trail_effect: this.cache.exhaust_trail_effects,
                },
            }),
        })
    }
    unit_exhaust_effects_definition() {
        return object({
            keys: {
                particle_effects: this.unit_exhaust_particle_effect_definition(),
                trail_effects: this.unit_exhaust_trail_effect_definition(),
            },
        })
    }
    unit_flair_effect_definition() {
        try {
            this.json?.data.skin_stages.forEach((skin_stage, skin_idx) => {
                skin_stage.effects.flair_effects.forEach((flair_effect, flair_idx) => {
                    if (flair_effect.constraint === 'has_unit_item') {
                        this.json.validate_keys(`/skin_stages/${skin_idx}/effects/flair_effects/${flair_idx}`, flair_effect, ['unit_item'], [])
                    }
                })
            })
        } catch {}
        return array({
            items: object({
                keys: {
                    mesh_point_name: string(),
                    particle_effect: this.cache.particle_effects,
                    sound: this.cache.ogg,
                    unit_item: this.cache.unit_items,
                    hull_damage_percentage: float(true, 'default=0.5', 0.5),
                    constraint: enumerate({
                        items: [
                            'is_loot_collection_active',
                            'is_exotic_factory_busy',
                            'is_unit_factory_busy',
                            'is_unit_factory_idle',
                            'is_damaged',
                            'has_unit_item',
                            'does_not_have_unit_item',
                            'is_crippled',
                            'is_not_crippled',
                        ],
                    }),
                },
            }),
        })
    }

    unit_hyperspace_effects_definition() {
        return object({
            required: [
                'charge_effect',
                'charge_effect_between_stars',
                'charge_sound',
                'enter_sound',
                'exit_effect',
                'exit_sound',
                'travel_effect',
                'travel_effect_between_stars',
            ],
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
        })
    }

    unit_effects_definition() {
        return object({
            keys: {
                damage_effects: this.unit_damage_effects_definition(),
                flair_effects: this.unit_flair_effect_definition(),
                level_up_effect: this.cache.particle_effects,
                proxy_mesh_effect: this.cache.particle_effects,
                level_up_sound: this.cache.ogg,
                hyperspace_effects: this.unit_hyperspace_effects_definition(),
                shield_effect: this.cache.shield_effects,
                effect_alias_bindings: Definitions.effect_alias_bindings_definition(this.cache),
                exhaust_effects: this.unit_exhaust_effects_definition(),
            },
        })
    }
    unit_gui_definition() {
        return object({
            required: ['description', 'hud_icon', 'name'],
            keys: {
                hud_icon: this.cache.textures('85x40 texture'),
                hud_monochrome_icon: this.cache.textures(
                    'Icon used in the Selection Window colorered with player color. Should map to main_view_icon.'
                ),
                hud_button_icon: this.cache.textures('Icon used on build menu buttons. Vestigual now that we reuse hud_icon consistently.'),
                hud_picture: this.cache.textures('Picture shown at the bottom of the HUD when unit is selected.'),
                tooltip_icon: this.cache.textures(
                    'Tiny picture used next to ship name. Not typically specified, will fallback to hud_monochrome_icon->hud-icon.'
                ),
                name: this.cache.localisation,
                description: this.cache.localisation,
                tooltip_picture: this.cache.textures('Big picture used on tooltips when building unit. (459x216)'),
                hud_selection_window_icon_offet: vector2i(),
                special_operation_names: array({
                    desc: loc_keys.SPECIAL_OPERATION_NAMES,
                    items: object({
                        keys: {
                            kind: this.cache.special_operation_kinds,
                            name: this.cache.localisation,
                        },
                    }),
                }),
            },
        })
    }

    mesh_light_definition() {
        try {
            this.json?.data.skin_stages.forEach((skin_stage, skin_idx) => {
                const light = skin_stage.light
                switch (light.type) {
                    case 'point_finite': {
                        this.json.validate_keys(`/skin_stages/${skin_idx}/light`, light, ['color', 'intensity', 'surface_radius'], ['angle'])
                        break
                    }
                    case 'point_infinite': {
                        this.json.validate_keys(`/skin_stages/${skin_idx}/light`, light, ['color', 'intensity'], ['angle', 'surface_radius'])
                        break
                    }
                    case 'cone': {
                        this.json.validate_keys(`/skin_stages/${skin_idx}/light`, light, ['angle', 'color', 'intensity', 'surface_radius'], [])
                        break
                    }
                    case 'line': {
                        this.json.validate_keys(`/skin_stages/${skin_idx}/light`, light, ['color', 'intensity', 'surface_radius'], ['angle'])
                        break
                    }
                }
            })
        } catch {}
        return object({
            required: ['type'],
            keys: {
                type: enumerate({
                    items: ['point_finite', 'point_infinite', 'cone', 'line'],
                }),
                angle: float(),
                color: color(),
                intensity: float(),
                surface_radius: float(),
            },
        })
    }
    unit_main_view_icon_definition() {
        return object({
            required: ['group'],
            keys: {
                extra_rotation: float(false, loc_keys.EXTRA_ROTATION),
                group: this.cache.mainview_groups,
                icon: this.cache.textures(),
                selected_icon: this.cache.textures(),
                sub_selected_icon: this.cache.textures(),
                is_additive: boolean(),
                has_rotation: boolean(),
                override_icon_background_color: color(),
                use_owner_player_color: boolean(),
            },
        })
    }
    planet_mesh_atmosphere_definition() {
        return object({
            required: [
                'atmosphere_color',
                'atmosphere_spread',
                'cloud_animation_speed',
                'cloud_noise_0_intensity',
                'cloud_noise_0_zoom',
                'cloud_noise_1_intensity',
                'cloud_noise_1_zoom',
                'cloud_rotation_speed',
                'shader',
            ],
            keys: {
                atmosphere_color: color(),
                atmosphere_spread: float(),
                cloud_animation_speed: float(),
                cloud_noise_0_intensity: float(),
                cloud_noise_0_zoom: float(),
                cloud_noise_1_intensity: float(),
                cloud_noise_1_zoom: float(),
                cloud_rotation_speed: float(),
                cloud_noise_texture: this.cache.textures(),
                cloud_material: this.cache.mesh_materials,
                shader: enumerate({ items: ['planet_surface', 'planet_city', 'planet_atmosphere'] }),
            },
        })
    }
    planet_mesh_city_definition() {
        return object({
            required: ['city_material', 'shader'],
            keys: {
                city_material: this.cache.mesh_materials,
                shader: enumerate({ items: ['planet_surface', 'planet_city', 'planet_atmosphere'] }),
            },
        })
    }

    corona_definition() {
        return object({
            required: ['basic_constants', 'color', 'color_texture', 'radius_scalar', 'shader'],
            keys: {
                shader: enumerate({ items: ['planet_corona', 'star_corona'] }),
                color_texture: this.cache.textures(),
                color: color(),
                minimum_visiblity_percent: float(),
                noise_1_intensity: float(),
                noise_0_intensity: float(),
                noise_0_zoom: float(),
                curvature_bleed_distance: float(),
                radius_scalar: float(),
                noise_texture: this.cache.textures(),
                animation_speed: float(),
                noise_1_zoom: float(),
                basic_constants: Definitions.prim3d_basic_cb_data(),
            },
        })
    }
    planet_mesh_definition() {
        return object({
            required: ['mesh'],
            keys: {
                elevator_surface_radius_scalar: float(),
                mesh: this.cache.meshes,
                atmosphere: this.planet_mesh_atmosphere_definition(),
                city: this.planet_mesh_city_definition(),
                corona: this.corona_definition(),
            },
        })
    }
    unit_dialogue_definition() {
        return object({
            keys: {
                ability_cooldown_is_not_completed: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                armor_down: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                spawned: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                ship_component_finished_building: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                shields_down: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                selected: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                retreat: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                order_issued: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                joined_fleet: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                insufficient_antimatter: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                hyperspace_charge_started: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                cannot_hyperspace: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                destroyed: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                attack_order_issued: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
                became_crippled: object({
                    keys: {
                        neutral: array({ items: this.cache.ogg }),
                        scared: array({ items: this.cache.ogg }),
                        smug: array({ items: this.cache.ogg }),
                    },
                }),
            },
        })
    }
    unit_move_sounds_definition() {
        return object({
            keys: {
                engine: this.cache.ogg,
                hyperspace_travel: this.cache.ogg,
                none: this.cache.ogg,
            },
        })
    }
    unit_sounds_definition() {
        return object({
            keys: {
                move_sounds: object({
                    keys: {
                        engine: this.cache.sounds,
                        hyperspace_travel: this.cache.sounds,
                    },
                }),
                dialogue: this.unit_dialogue_definition(),
                move_sounds: this.unit_move_sounds_definition(),
            },
        })
    }
    star_mesh_atmosphere_definition() {
        return object({
            required: ['material', 'noise_texture', 'shader'],
            keys: {
                material: this.cache.mesh_materials,
                noise_texture: this.cache.textures(),
                shader: enumerate({ items: ['star_surface', 'star_atmosphere'] }),
            },
        })
    }
    start_mesh_definition() {
        return object({
            required: ['corona', 'mesh'],
            keys: {
                atmosphere: this.star_mesh_atmosphere_definition(),
                corona: this.corona_definition(),
                mesh: this.cache.meshes,
                shader: enumerate({ items: ['star_surface', 'star_atmosphere'] }),
            },
        })
    }
    create() {
        return schema({
            required: ['skin_stages'],
            keys: {
                name: object({
                    keys: {
                        group: this.cache.unit_group_names,
                    },
                }),
                skin_stages: array({
                    items: object({
                        required: ['is_main_view_icon_visible_camera_distance'],
                        keys: {
                            is_main_view_icon_visible_camera_distance: float(),
                            unit_radius_when_mesh_visible: float(),
                            min_camera_distance: float(),
                            gui: this.unit_gui_definition(),
                            unit_mesh: this.unit_mesh_definition(),
                            child_mesh_alias_bindings: this.unit_child_mesh_alias_bindings(),
                            star_mesh: this.start_mesh_definition(),
                            planet_mesh: this.planet_mesh_definition(),
                            main_view_icon: this.unit_main_view_icon_definition(),
                            effects: this.unit_effects_definition(),
                            sounds: this.unit_sounds_definition(),
                            death_sequence_group: this.cache.death_sequence_groups,
                            light: this.mesh_light_definition(),
                            use_mesh_bounding_sphere_for_hit_effects: boolean(),
                        },
                    }),
                }),
                gravity_well_props: array({
                    items: this.cache.gravity_well_props,
                    isUnique: true,
                }),
            },
        })
    }
}
