const path = require('path')
const chokidar = require('chokidar')
const { enumerate, string } = require('./definitions/data_types')
const { EntityParser } = require('./data/file-handler')
const fs = require('fs')
const { Log } = require('./utils/logger')

module.exports = async (modFolder) => {
    const cache = {}
    const modCache = new EntityParser(modFolder)

    const setFileWatcher = ({ glob: glob = 'entities', func: callback }, ...entities) => {
        const basename = (param) => path.basename(param, path.extname(param))
        return chokidar
            .watch(glob, {
                persistent: true,
                ignorePermissionErrors: true,
                ignoreInitial: true,
                interval: 2000,
                cwd: modFolder,
            })
            .on('change', (e) => {
                if (typeof callback === 'function') return callback(e)
            })
            .on('add', (e) => {
                if (entities.length === 0) return
                for (const entity of entities) {
                    entity.enum.push(basename(e))
                }
            })
            .on('unlink', (e) => {
                if (entities instanceof Array && entities.length === 0) return
                for (const entity of entities) {
                    const name = basename(e)
                    const idx = entity.enum.findIndex((e) => e === name)
                    entity.enum.splice(idx, 1)
                }
            })
    }

    const initCache = () => {
        cache.exotic_entities = enumerate({
            items: modCache.parseEntityManifest('exotic'),
        })
        cache.player_icons = enumerate({
            items: modCache.parsePlayerIcons(),
        })
        cache.research_fields = (type) =>
            enumerate({
                items: modCache.parseResearchField(type),
            })
        cache.player_portraits = enumerate({
            items: modCache.parsePlayerPortraits(),
        })
        cache.localisation = enumerate({
            items: modCache.parseLocalisation(),
        })
        cache.research_subjects = enumerate({
            items: modCache.parseEntityManifest('research_subject'),
        })
        cache.planet_components = enumerate({
            items: modCache.parseComponents({
                component: 'planet_component',
            }),
        })
        cache.strikecraft_units = enumerate({
            items: modCache.parseStrikecraftUnits(),
        })
        cache.ship_components = enumerate({
            items: modCache.parseComponents({
                component: 'ship_component',
            }),
        })
        cache.unit_items = enumerate({
            items: modCache.parseUnitItems(),
        })
        cache.planets = enumerate({
            items: modCache.parsePlanets(),
        })
        cache.build_kinds = enumerate({
            items: modCache.parseUnitBuildKinds(),
        })
        cache.color_groups = enumerate({
            items: modCache.parseColorGroups(),
        })
        cache.exotics = enumerate({
            items: modCache.parseExotics(),
        })
        cache.race_names = enumerate({
            items: modCache.parseRaceNames(),
        })
        cache.fleet_units = enumerate({
            items: modCache.parseFleetUnits(),
        })
        cache.exhaust_trail_effects = enumerate({
            items: modCache.parseExhaustTrailEffects(),
        })
        cache.gravity_well_props = enumerate({
            items: modCache.parseGravityWellProps(),
        })
        cache.texture_animations = enumerate({
            items: modCache.parseTextureAnimations(),
        })
        cache.unit_group_names = enumerate({
            items: modCache.parseUnitNames(),
        })
        cache.skyboxes = enumerate({
            items: modCache.parseSkyboxes(),
        })
        cache.units = enumerate({
            items: modCache.parseEntityManifest('unit'),
        })
        cache.buffs = enumerate({
            items: modCache.parseEntityManifest('buff'),
        })
        cache.ttf = enumerate({
            items: modCache.parseFontsTtf(),
        })
        cache.sounds = enumerate({
            items: modCache.parseSounds({
                ext: 'sound',
            }),
        })
        cache.ogg = enumerate({
            items: modCache.parseSounds({
                ext: 'ogg',
            }),
        })
        cache.textures = enumerate({
            items: modCache.parseTextures(),
        })
        cache.particle_effects = enumerate({
            items: modCache.parseParticleEffects(),
        })
        cache.effect_alias_bindings = enumerate({
            items: modCache.parseEffectAliasBindings(),
        })
        cache.brushes = enumerate({
            items: modCache.parseBrushes(),
        })
        cache.colors = enumerate({
            items: modCache.parseColors(),
        })
        cache.fonts = enumerate({
            items: modCache
                .read(['fonts/*.font'], {
                    read: false,
                })
                .map((e) => e.basename),
        })
        cache.abilities = enumerate({
            items: modCache.parseEntityManifest('ability'),
        })
        cache.unit_skins = enumerate({
            items: modCache.parseEntityManifest('unit_skin'),
        })
        cache.attack_target_types = string()
        cache.unit_item_build_group_ids = enumerate({
            items: modCache.parseUnitItemBuildGroupIds(),
        })
        cache.unit_build_group_ids = enumerate({
            items: modCache.parseUnitBuildGroupIds(),
        })
        cache.scenarios = enumerate({
            items: modCache.parseScenarios(),
        })
        cache.shield_effects = enumerate({
            items: modCache.parseShieldEffects(),
        })
        cache.attack_target_type_groups = enumerate({
            items: modCache.parseAttackTargetTypeGroups(),
        })
        cache.ship_tags = enumerate({
            items: modCache.parseShipTags(),
        })
        cache.fillings = (type) =>
            enumerate({
                items: modCache.parseGravityWellFillings(type),
            })
        cache.npc_tags = enumerate({
            items: modCache.parseNpcTags(),
        })
        cache.meshes = enumerate({
            items: modCache.parseMeshes(),
        })
        cache.special_operation_kinds = enumerate({
            items: modCache.parseSpecialOperationUnitKinds(),
        })
        cache.action_values = enumerate({
            items: modCache.parseActionValues(),
        })
        cache.weapon_modifier_ids = enumerate({
            items: modCache.parseBuffWeaponModifiers(),
        })
        cache.planet_modifier_ids = enumerate({
            items: modCache.parseBuffPlanetModifiers(),
        })
        cache.npc_rewards = enumerate({
            items: [...modCache.parseEntityManifest('npc_reward'), ''],
        })
        cache.child_meshes = enumerate({
            items: modCache.parseChildMeshes(),
        })
        cache.mesh_materials = enumerate({
            items: modCache.parseMeshMaterials(),
        })
        cache.pip_groups = enumerate({
            items: modCache.parsePipGroups(),
        })
        cache.mainview_groups = enumerate({
            items: modCache.parseMainviewGroups(),
        })
        cache.death_sequence_groups = enumerate({
            items: modCache.parseDeathSequenceGroups(),
        })
        cache.death_sequences = enumerate({
            items: modCache.parseDeathSequences(),
        })
        cache.formations = enumerate({
            items: modCache.parseEntityManifest('formation'),
        })
        cache.weapons = enumerate({
            items: modCache.parseEntityManifestTest('weapon'),
        })
        cache.mutations = enumerate({
            items: modCache.parseUnitMutations(),
        })
        cache.players = enumerate({
            items: modCache.parseEntityManifest('player'),
        })
        cache.strikecraft_kinds = enumerate({
            items: modCache.parseStrikecraft(),
        })
        cache.action_data_sources = enumerate({
            items: modCache.parseEntityManifest('action_data_source'),
        })
        cache.target_filters = enumerate({
            items: [...modCache.parseTargetFilters().target_filters(), ...modCache.parseTargetFilters().uniform()],
        })
        cache.buff_empire_ids = enumerate({
            items: modCache.parseBuffModifierIds(),
        })
        cache.beam_effects = enumerate({
            items: modCache.parseBeamEffects(),
        })
        cache.gui_actions = enumerate({
            items: modCache.parseAbilityGuiActions(),
        })
        cache.target_filters_uniforms = enumerate({
            items: modCache.parseTargetFilters().uniform(),
        })
        cache.buff_actions = enumerate({
            items: modCache.parseBuffActions(),
        })
        cache.debris = enumerate({
            items: modCache.parseDebrisUniform(),
        })
        cache.max_tier_count = enumerate({
            items: modCache.parseResearchTierCount(),
            isIntType: true,
        })
        cache.float_variables = enumerate({
            items: modCache.parseFloatVariables(),
        })
        cache.unit_variables = enumerate({
            items: modCache.parseUnitVariableIds(),
        })
        cache.buff_unit_factory_modifiers = enumerate({
            items: modCache.parseBuffUnitFactoryModifiers(),
        })
        cache.buff_unit_modifiers = enumerate({
            items: modCache.parseBuffUnitModifiers(),
        })
        cache.weapon_tags = enumerate({
            items: modCache.parseWeaponTags(),
        })
        cache.loot = enumerate({
            items: modCache.parseLoots(),
        })
        cache.planet_files = enumerate({
            items: modCache.parsePlanetFiles(),
        })
        cache.metal_asteroids = enumerate({
            items: modCache.parseMetalAsteroids(),
        })
        cache.crystal_asteroids = enumerate({
            items: modCache.parseCrystalAsteroids(),
        })
        cache.planet_bonuses = enumerate({
            items: modCache.parsePlanetBonuses(),
        })
        cache.planet_artifacts = enumerate({
            items: modCache.parsePlanetArtifacts(),
        })
        cache.modLogos = enumerate({
            items: modCache.parseModLogos(),
        })
    }

    const initWatchers = () => {
        setFileWatcher({
            glob: ['uniforms/research.uniforms'],
            func: () =>
                (cache.max_tier_count = enumerate({
                    items: modCache.parseResearchTierCount(),
                    isIntType: true,
                })),
        })
        setFileWatcher(
            {
                glob: ['localized_text/en.localized_text'],
                func: () =>
                    (cache.localisation = enumerate({
                        items: modCache.parseLocalisation(),
                    })),
            },
            cache.localisation
        )
        setFileWatcher(
            {
                glob: ['effects/*.beam_effect'],
            },
            cache.beam_effects
        )
        setFileWatcher(
            {
                glob: ['effects/*.shield_effect'],
            },
            cache.shield_effects
        )
        setFileWatcher(
            {
                glob: ['scenarios/*.scenario'],
            },
            cache.scenarios
        )
        setFileWatcher({
            glob: ['gui/input_actions.gui'],
            func: () => (cache.gui_actions.enum = modCache.parseAbilityGuiActions()),
        })
        setFileWatcher({
            glob: ['uniforms/target_filter.uniforms'],
            func: () => (cache.target_filters_uniforms.enum = modCache.parseTargetFilters().uniform()),
        })
        setFileWatcher(
            {
                glob: ['gui/hud_bookmarks_window.gui'],
            },
            cache.pip_groups
        )
        setFileWatcher(
            {
                glob: ['effects/*.exhaust_trail_effect'],
            },
            cache.exhaust_trail_effects
        )
        setFileWatcher(
            {
                glob: ['gravity_well_props/*.gravity_well_props'],
            },
            cache.gravity_well_props
        )
        setFileWatcher(
            {
                glob: ['texture_animations/*.texture_animation'],
            },
            cache.texture_animations
        )
        setFileWatcher({
            glob: ['entities/*.player'],
            func: () => {
                cache.research_fields = (type) =>
                    enumerate({
                        items: modCache.parseResearchField(type),
                    })
                cache.unit_group_names.enum = modCache.parseUnitNames()
                cache.unit_item_build_group_ids = enumerate({
                    items: modCache.parseUnitItemBuildGroupIds(),
                })
                cache.unit_build_group_ids = enumerate({
                    items: modCache.parseUnitBuildGroupIds(),
                })
            },
        })
        setFileWatcher(
            {
                glob: ['uniforms/unit.uniforms'],
                func: () => (cache.unit_group_names.enum = modCache.parseUnitNames()),
            },
            cache.unit_group_names
        )
        setFileWatcher(
            {
                glob: ['skyboxes/*.skybox'],
            },
            cache.skyboxes
        )
        setFileWatcher(
            {
                glob: ['player_icons/*.player_icon'],
            },
            cache.player_icons
        )
        setFileWatcher({
            glob: ['uniforms/special_operation_unit.uniforms'],
            func: () => (cache.special_operation_kinds.enum = modCache.parseSpecialOperationUnitKinds()),
        })
        setFileWatcher(
            {
                glob: ['player_portraits/*.player_portrait'],
            },
            cache.player_portraits
        )
        setFileWatcher({
            glob: ['uniforms/player.uniforms'],
            func: () => (cache.npc_tags.enum = modCache.parseNpcTags()),
        })
        setFileWatcher(
            {
                glob: ['./*.png'],
            },
            cache.modLogos
        )
        setFileWatcher(
            {
                glob: ['mesh_materials/*.mesh_material'],
            },
            cache.mesh_materials
        )
        setFileWatcher({
            glob: ['uniforms/main_view.uniforms'],
            func: () => (cache.mainview_groups.enum = modCache.parseMainviewGroups()),
        })
        setFileWatcher(
            {
                glob: ['meshes/*.mesh'],
            },
            cache.meshes
        )
        setFileWatcher(
            {
                glob: ['entities/*.research_subject'],
            },
            cache.research_subjects
        )
        setFileWatcher(
            {
                glob: ['entities/*.unit_item'],
                func: () => {
                    cache.planet_components.enum = modCache.parseComponents({
                        component: 'planet_component',
                    })
                    cache.ship_components.enum = modCache.parseComponents({
                        component: 'ship_component',
                    })
                    cache.unit_items.enum = modCache.parseUnitItems()
                    cache.loot.enum = modCache.parseLoots()
                    cache.planet_bonuses.enum = modCache.parsePlanetBonuses()
                    cache.planet_artifacts.enum = modCache.parsePlanetArtifacts()
                },
            },
            cache.planet_components,
            cache.ship_components,
            cache.unit_items,
            cache.loot,
            cache.planet_bonuses,
            cache.planet_artifacts
        )
        setFileWatcher(
            {
                glob: ['entities/*.unit'],
                func: () => {
                    cache.strikecraft_units.enum = modCache.parseStrikecraftUnits()
                    cache.metal_asteroids.enum = modCache.parseMetalAsteroids()
                    cache.crystal_asteroids.enum = modCache.parseCrystalAsteroids()
                    cache.fleet_units.enum = modCache.parseFleetUnits()
                },
            },
            cache.strikecraft_units,
            cache.metal_asteroids,
            cache.crystal_asteroids,
            cache.fleet_units
        )
        setFileWatcher(
            {
                glob: ['entities/*.unit_skin'],
                func: () => {
                    cache.unit_skins.enum = modCache.parseEntityManifest('unit_skin')
                    cache.effect_alias_bindings.enum = modCache.parseEffectAliasBindings()
                    cache.child_meshes.enum = modCache.parseChildMeshes()
                },
            },
            cache.unit_skins,
            cache.effect_alias_bindings,
            cache.child_meshes
        )
        setFileWatcher({
            glob: ['entities/*.action_data_source'],
            func: () => {
                cache.target_filters = enumerate({
                    items: [...modCache.parseTargetFilters().target_filters(), ...modCache.parseTargetFilters().uniform()],
                })
                cache.action_values = enumerate({
                    items: modCache.parseActionValues(),
                })
                cache.float_variables = enumerate({
                    items: modCache.parseFloatVariables(),
                })
                cache.buff_actions = enumerate({
                    items: modCache.parseBuffActions(),
                })
                cache.unit_variables = enumerate({
                    items: modCache.parseUnitVariableIds(),
                })
                cache.buff_unit_modifiers = enumerate({
                    items: modCache.parseBuffUnitModifiers(),
                })
                cache.weapon_modifier_ids = enumerate({
                    items: modCache.parseBuffWeaponModifiers(),
                })
                cache.planet_modifier_ids = enumerate({
                    items: modCache.parseBuffPlanetModifiers(),
                })
                cache.buff_unit_factory_modifiers = enumerate({
                    items: modCache.parseBuffUnitFactoryModifiers(),
                })
                cache.buff_empire_ids = enumerate({
                    items: modCache.parseBuffModifierIds(),
                })
            },
        })
        setFileWatcher({
            glob: ['uniforms/debris.uniforms'],
            func: () => (cache.debris.enum = modCache.parseDebrisUniform()),
        })
        setFileWatcher(
            {
                glob: ['fonts/*.ttf'],
            },
            cache.ttf
        )
        setFileWatcher(
            {
                glob: ['effects/*.particle_effect'],
            },
            cache.particle_effects
        )
        setFileWatcher(
            {
                glob: ['death_sequences/*.death_sequence_group'],
            },
            cache.death_sequence_groups
        )
        setFileWatcher(
            {
                glob: ['death_sequences/*.death_sequence'],
            },
            cache.death_sequences
        )
        setFileWatcher(
            {
                glob: ['fonts/*.font'],
            },
            cache.fonts
        )
        setFileWatcher(
            {
                glob: ['brushes/*.brushes'],
            },
            cache.brushes
        )
        setFileWatcher(
            {
                glob: ['entities/*.planet'],
            },
            cache.planet_files
        )
        setFileWatcher(
            {
                glob: ['entities/*.weapon'],
            },
            cache.weapons
        )
        setFileWatcher(
            {
                glob: ['textures/*.{png,dds}'],
            },
            cache.textures
        )
        setFileWatcher({
            glob: ['uniforms/planet.uniforms'],
            func: () => (cache.planets.enum = modCache.parsePlanets()),
        })
        setFileWatcher({
            glob: ['uniforms/unit_build.uniforms'],
            func: () => (cache.build_kinds.enum = modCache.parseUnitBuildKinds()),
        })
        setFileWatcher(
            {
                glob: ['player_colors/*.player_color_group'],
            },
            cache.color_groups
        )
        setFileWatcher({
            glob: ['uniforms/exotic.uniforms'],
            func: () => (cache.exotics.enum = modCache.parseExotics()),
        })

        // // Entity Manifests
        setFileWatcher({
            glob: ['entities/unit_skin.entity_manifest'],
            func: () => (cache.unit_skins.enum = modCache.parseEntityManifest('unit_skin')),
        })
        setFileWatcher({
            glob: ['entities/unit.entity_manifest'],
            func: () => (cache.units.enum = modCache.parseEntityManifest('unit')),
        })
        setFileWatcher({
            glob: ['entities/buff.entity_manifest'],
            func: () => (cache.buffs.enum = modCache.parseEntityManifest('buff')),
        })
        setFileWatcher({
            glob: ['entities/research_subject.entity_manifest'],
            func: () => (cache.buffs.enum = modCache.parseEntityManifest('research_subject')),
        })
        setFileWatcher({
            glob: ['entities/npc_reward.entity_manifest'],
            func: () => (cache.npc_rewards.enum = modCache.parseEntityManifest('npc_reward')),
        })
        setFileWatcher({
            glob: ['entities/formation.entity_manifest'],
            func: () => (cache.formations.enum = modCache.parseEntityManifest('formation')),
        })
        setFileWatcher({
            glob: ['entities/action_data_source.entity_manifest'],
            func: () => (cache.action_data_sources.enum = modCache.parseEntityManifest('action_data_source')),
        })
        setFileWatcher(
            {
                glob: ['entities/player.entity_manifest'],
                func: () => (cache.players.enum = modCache.parseEntityManifest('player')),
            },
            cache.players
        )
        setFileWatcher({
            glob: ['entities/ability.entity_manifest'],
            func: () => (cache.abilities.enum = modCache.parseEntityManifest('ability')),
        })
        setFileWatcher({
            glob: ['entities/weapon.entity_manifest'],
            func: () => (cache.weapons.enum = modCache.parseEntityManifest('weapon')),
        })
        setFileWatcher({
            glob: ['entities/exotic.entity_manifest'],
            func: () => (cache.exotic_entities.enum = modCache.parseEntityManifest('exotic')),
        })
        // //

        setFileWatcher({
            glob: ['colors/named_colors.named_colors'],
            func: () => (cache.colors.enum = modCache.parseColorGroups()),
        })
        setFileWatcher(
            {
                glob: ['sounds/*.sound'],
            },
            cache.sounds
        )
        setFileWatcher(
            {
                glob: ['sounds/*.ogg'],
            },
            cache.ogg
        )
        setFileWatcher({
            glob: ['uniforms/galaxy_generator.uniforms'],
            func: () => {
                cache.fillings = (type) =>
                    enumerate({
                        items: modCache.parseGravityWellFillings(type),
                    })
            },
        })
        setFileWatcher({
            glob: ['uniforms/attack_target_type_group.uniforms'],
            func: () => {
                cache.attack_target_types = string()
                cache.attack_target_type_groups.enum = modCache.parseAttackTargetTypeGroups()
            },
        })

        setFileWatcher({
            glob: ['uniforms/unit_tag.uniforms'],
            func: () => (cache.ship_tags.enum = modCache.parseShipTags()),
        })
        setFileWatcher({
            glob: ['uniforms/unit_mutation.uniforms'],
            func: () => (cache.mutations.enum = modCache.parseUnitMutations()),
        })
        setFileWatcher({
            glob: ['uniforms/strikecraft.uniforms'],
            func: () => (cache.strikecraft_kinds.enum = modCache.parseStrikecraft()),
        })
        setFileWatcher({
            glob: ['uniforms/weapon_tags.uniforms'],
            func: () => (cache.weapon_tags.enum = modCache.parseWeaponTags()),
        })
    }

    initCache()
    initWatchers()

    return new Proxy(cache, {
        get: function (target, prop) {
            if (prop in target) return target[prop]
            if (prop === 'then') return
            Log.error('Trying to access an invalid cache property:', prop)
        },
    })
}
