const { schema, array, object, integer, string, vector2f, enumerate, boolean, color, float, vector3f, angle } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class ParticleEffect {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    constants() {
        return object({
            keys: {
                noise_constants_0: object({
                    keys: {
                        u_pan_speed: float(false),
                        v_pan_speed: float(false),
                        u_scale: float(false),
                        v_scale: float(false),
                        global_scale: float(false),
                    },
                }),
                noise_constants_1: object({
                    keys: {
                        u_pan_speed: float(false),
                        v_scale: float(false),
                        u_scale: float(false),
                        v_pan_speed: float(false),
                        global_scale: float(false),
                    },
                }),
                u_strength: float(false),
                v_strength: float(false),
                erosion_test: float(false),
                erosion_softness: float(),
            },
        })
    }

    create() {
        return schema({
            keys: {
                nodes: array({
                    items: object({
                        keys: {
                            id: integer(),
                            name: string(),
                            x: vector2f(),
                            y: vector2f(),
                            z: vector2f(),
                            yaw: vector2f(),
                            pitch: vector2f(),
                            roll: vector2f(),
                        },
                    }),
                }),
                emitter_to_node_attachments: array({
                    items: object({
                        keys: {
                            attacher_id: integer(),
                            attachee_id: integer(),
                        },
                    }),
                }),
                modifier_to_emitter_attachments: array({
                    items: object({
                        keys: {
                            attacher_id: integer(),
                            attachee_id: integer(),
                        },
                    }),
                }),
                modifiers: array({
                    items: object({
                        keys: {
                            id: integer(),
                            name: string(),
                            type: enumerate({ items: ['rotate', 'push', 'size', 'color', 'float_property', 'drag'] }),
                            angular_velocity: vector2f(),
                            axis_of_rotation: vector3f(),
                            property_type: enumerate({
                                items: [
                                    'alpha',
                                    'width_and_height_scale',
                                    'erosion_test_base',
                                    'distortion_scalar',
                                    'width_scale',
                                    'height_scale',
                                    'width_and_height',
                                ],
                            }),
                            property_value: object({
                                keys: {
                                    type: enumerate({ items: ['ease'] }),
                                    range: vector2f(),
                                    easing_function: Definitions.easing_functions(),
                                    easing_values: vector2f(),
                                },
                            }),
                            coefficient_generator: object({
                                keys: {
                                    type: enumerate({ items: ['ease'] }),
                                    range: vector2f(),
                                    easing_function: Definitions.easing_functions(),
                                    easing_values: vector2f(),
                                },
                            }),
                            change_duration_context: enumerate({ items: ['particle_time_elapsed'] }),
                            change_duration: vector2f(),
                            begin_color: color(),
                            end_color: color(),
                            will_oscillate: boolean(),
                            particle_time_offset: vector2f(),
                            start_delay: vector2f(),
                            width_change_rate: vector2f(),
                            width_stop: vector2f(),

                            direction: vector3f(),
                            height_stop: vector2f(),
                            oscillate_duration: vector2f(),
                            height_change_rate: vector2f(),
                            particle_time_duration: vector2f(),
                            force: object({
                                keys: {
                                    type: enumerate({ items: ['random', 'constant'] }),
                                    range: vector2f(),
                                },
                            }),
                            op: enumerate({
                                items: [
                                    'to_point_in_emitter_space',
                                    'around_axis',
                                    'to_point_in_effect_space',
                                    'random_jitter',
                                    'fixed_in_effect_space',
                                ],
                            }),
                            point: vector3f(),
                        },
                    }),
                }),
                emitters: array({
                    items: object({
                        keys: {
                            id: integer(),
                            name: string(),
                            type: enumerate({
                                items: ['point', 'ring', 'sphere'],
                            }),
                            is_visible: boolean(),
                            emit_start_delay: vector2f(),
                            emit_duration: vector2f(),
                            emit_max_particle_count: vector2f(),
                            emit_particle_count_is_always_one: boolean(),
                            emit_rate: object({
                                keys: {
                                    behavior: enumerate({ items: ['square_wave', 'increase', 'decrease'] }),
                                    primary_emit_rate: vector2f(),
                                    primary_time: vector2f(),
                                    secondary_emit_rate: vector2f(),
                                    secondary_time: vector2f(),
                                },
                            }),
                            use_surface: boolean(),
                            use_edge: boolean(),
                            radius_x: vector2f(),
                            radius_y: vector2f(),
                            radius_z: vector2f(),
                            normal_offset: vector2f(),
                            normal_velocity: vector2f(),
                            radial_velocity: vector2f(),
                            azimuthal_tangential_velocity: vector2f(),
                            polar_tangential_velocity: vector2f(),
                            latitude_angle_range: vector2f(),
                            longitude_angle_range: vector2f(),
                            tangential_velocity: vector2f(),
                            angle_range: vector2f(),
                            angle_range_behavior: enumerate({ items: ['random', 'sequence_loop'] }),
                            angle_range_sequence_size: integer(),
                            forward_velocity: vector2f(),
                            angle_variance: vector2f(),
                            particle: object({
                                keys: {
                                    type: enumerate({ items: ['billboard', 'mesh'] }),
                                    render_layer: float(false),
                                    max_duration: vector2f(),
                                    initial_alpha: vector2f(),
                                    mass: vector2f(),
                                    camera_offset: vector2f(),
                                    external_color: enumerate({ items: ['primary'] }),
                                    color: color(),
                                    fade_in_time: vector2f(),
                                    fade_out_time: vector2f(),
                                    billboard: object({
                                        keys: {
                                            render_with_additive_blending: boolean(),
                                            shader_type: enumerate({
                                                items: ['uber_only_gradient', 'uber_multiply_color', 'uber_add_color', 'uber_overlay_color'],
                                            }),
                                            width: vector2f(),
                                            height: vector2f(),
                                            facing_type: enumerate({
                                                items: ['face_particle_direction', 'face_camera_by_rotating_on_particle_direction'],
                                            }),
                                            anchor: enumerate({ items: ['bottom', 'top'] }),
                                            rotation: vector2f(),
                                            rotation_speed: vector2f(),
                                            gradient_texture: this.cache.textures(),
                                            distortion_texture: this.cache.textures(),
                                            erosion_texture: this.cache.textures(),
                                            refraction_texture: this.cache.textures(),
                                            refraction_mask_texture: this.cache.textures(),
                                            initial_erosion_noise_offset_u: vector2f(),
                                            initial_erosion_noise_offset_v: vector2f(),
                                            initial_refraction_scalar: vector2f(),
                                            random_flip_texture_horizontal_chance: float(),
                                            random_flip_texture_vertical_chance: float(),
                                            initial_distortion_scalar: vector2f(),
                                            texture_0: this.cache.textures(),
                                            texture_1: this.cache.textures(),
                                            texture_animation_fps: vector2f(),
                                            texture_animation: this.cache.texture_animations,
                                            texture_animation_first_frame: enumerate({ items: ['random', 'sequential'] }),
                                            texture_animation_next_frame: enumerate({ items: ['random'] }),
                                            uber_constants: object({
                                                keys: {
                                                    basic_constants: object({
                                                        keys: {
                                                            emissive_factor: float(),
                                                            depth_fade_opacity: float(),
                                                            alpha_ramp_steepness: float(),
                                                            depth_fade_distance: float(),
                                                            alpha_ramp_curvature: float(),
                                                            alpha_ramp_growth_delay: float(),
                                                            alpha_ramp_max_alpha_scalar: float(),
                                                        },
                                                    }),
                                                    refraction_constants: this.constants(),
                                                    gradient_constants: object({
                                                        keys: {
                                                            gradient_pan_start: float(),
                                                        },
                                                    }),
                                                    erosion_constants: this.constants(),
                                                    distortion_constants: this.constants(),
                                                },
                                            }),
                                        },
                                    }),
                                    mesh: object({
                                        keys: {
                                            scale: vector2f(),
                                            mesh: this.cache.meshes,
                                        },
                                    }),
                                    light: object({
                                        keys: {
                                            type: enumerate({ items: ['point_finite', 'cone'] }),
                                            color: color(),
                                            intensity: float(),
                                            angle: angle(),
                                            surface_radius: float(),
                                        },
                                    }),
                                },
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
