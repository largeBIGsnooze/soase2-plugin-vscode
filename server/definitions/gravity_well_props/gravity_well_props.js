const { schema, array, object, float, string, integer } = require('../data_types')

module.exports = class GravityWellProps {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.cache = cache
    }

    create() {
        return schema({
            keys: {
                mesh_clusters: array({
                    items: object({
                        keys: {
                            position: object({
                                keys: {
                                    distance: array({
                                        items: float(),
                                    }),
                                },
                            }),
                            mesh_count: array({
                                items: float(),
                            }),
                            angular_speed: array({
                                items: float(),
                            }),
                            meshes: array({
                                items: string(),
                            }),
                        },
                        required: ['position', 'mesh_count', 'angular_speed', 'meshes'],
                    }),
                }),
                cloud_groups: array({
                    items: object({
                        keys: {
                            cloud_count: array({
                                items: float(),
                            }),
                            cloud_definition: object({
                                keys: {
                                    position: object({
                                        keys: {
                                            distance: array({
                                                items: float(),
                                            }),
                                        },
                                    }),
                                    particle_count: array({
                                        items: float(),
                                    }),
                                    particle_width: array({
                                        items: float(),
                                    }),
                                    particle_offset: array({
                                        items: float(),
                                    }),
                                    textures: array({
                                        items: this.cache.textures,
                                        isUnique: true,
                                    }),
                                    basic_constants: object({
                                        keys: {
                                            emissive_factor: integer(),
                                        },
                                    }),
                                },
                                required: ['position'],
                            }),
                        },
                    }),
                }),
            },
        })
    }
}
