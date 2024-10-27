const path = require('path')
const { enumerate, string } = require('./definitions/data_types')
const { EntityParser } = require('./data/file_handler')
const { Log } = require('./utils/logger')
const fs = require('fs')
module.exports = async (modFolder) => {
    const cache = {}
    const watchers = new Map()
    const reader = new EntityParser(modFolder)
    let textures, action_values

    const WATCHED_FOLDERS = [
        'brushes',
        'colors',
        'cursors',
        'death_sequences',
        'effects',
        'entities',
        'textures',
        'fonts',
        'gravity_well_props',
        'gui',
        'localized_text',
        'meshes',
        'mesh_materials',
        'player_colors',
        'player_icons',
        'player_portraits',
        'scenarios',
        'skyboxes',
        'sounds',
        'texture_animations',
        'uniforms',
    ]

    const setWatcher = (caches, folder, extensions, callback) => {
        const folderPath = path.resolve(modFolder, folder)

        if (!fs.existsSync(folderPath) || watchers.has(folderPath)) {
            return
        }

        const watcher = fs
            .watch(folderPath, (event, fileName) => {
                try {
                    if (fileName == null) return

                    const name = fileName.toLowerCase()
                    if (event == 'rename' && !fs.existsSync(path.resolve(folder, name))) {
                        if (extensions.some((e) => name.endsWith(e))) {
                            for (const cache of caches) {
                                try {
                                    const idx = cache.enum.findIndex((e) => e === path.basename(name, path.extname(name)))
                                    if (idx !== -1) {
                                        cache.enum.splice(idx, 1)
                                    }
                                } catch (e) {
                                    console.log('Error at: ', cache)
                                }
                            }
                        }
                    }

                    if (event == 'change') {
                        if (extensions.some((e) => name.endsWith(e))) {
                            callback().forEach((result, i) => {
                                if (caches[i].type == 'textures') {
                                    textures = result
                                } else if (caches[i].type == 'action_values') {
                                    action_values = result
                                } else {
                                    caches[i].enum = result
                                }
                            })
                        }
                    }
                } catch (err) {
                    Log.error(err, folder, extensions)
                }
            })
            .on('error', () => {})
        watchers.set(folderPath, watcher)
        return watcher
    }

    const initCache = () => {
        cache.exotic_entities = enumerate({
            items: reader.parseEntityManifest('exotic'),
        })
        cache.player_icons = enumerate({
            items: reader.parsePlayerIcons(),
        })
        cache.research_fields = enumerate({
            desc: 'Sections of the research tree it will be placed on',
            items: reader.parseResearchFields(),
        })
        cache.player_portraits = enumerate({
            items: reader.parsePlayerPortraits(),
        })
        cache.localisation = enumerate({
            desc: '*.localized_text strings',
            items: reader.parseLocalisation(),
        })
        cache.research_subjects = enumerate({
            items: reader.parseEntityManifest('research_subject'),
        })
        cache.planet_components = enumerate({
            items: reader.parseComponents({
                component: 'planet_component',
            }),
        })
        cache.strikecraft_units = enumerate({
            items: reader.parseStrikecraftUnits(),
        })
        cache.ship_components = enumerate({
            items: reader.parseComponents({
                component: 'ship_component',
            }),
        })
        cache.unit_items = enumerate({
            items: reader.parseUnitItems(),
        })
        cache.planets = enumerate({
            items: reader.parsePlanets(),
        })
        cache.build_kinds = enumerate({
            items: reader.parseUnitBuildKinds(),
        })
        cache.color_groups = enumerate({
            items: reader.parseColorGroups(),
        })
        cache.exotics = enumerate({
            items: reader.parseExotics(),
        })
        cache.race_names = enumerate({
            items: reader.parseRaceNames(),
        })
        cache.fleet_units = enumerate({
            items: reader.parseFleetUnits(),
        })
        cache.exhaust_trail_effects = enumerate({
            items: reader.parseExhaustTrailEffects(),
        })
        cache.gravity_well_props = enumerate({
            items: reader.parseGravityWellProps(),
        })
        cache.texture_animations = enumerate({
            items: reader.parseTextureAnimations(),
        })
        cache.unit_group_names = enumerate({
            items: reader.parseUnitNames(),
        })
        cache.skyboxes = enumerate({
            items: reader.parseSkyboxes(),
        })
        cache.units = enumerate({
            items: reader.parseEntityManifest('unit'),
        })
        cache.buffs = enumerate({
            items: reader.parseEntityManifest('buff'),
        })
        cache.ttf = enumerate({
            items: reader.parseFontsTtf(),
        })
        cache.sounds = enumerate({
            items: reader.parseSounds({
                ext: 'sound',
            }),
        })
        cache.ogg = enumerate({
            items: reader.parseSounds({
                ext: 'ogg',
            }),
        })

        textures = reader.parseTextures()
        cache.textures = (desc = 'Name of texture') => {
            return enumerate({
                desc: desc,
                items: textures,
            })
        }

        cache.particle_effects = enumerate({
            items: reader.parseParticleEffects(),
        })
        cache.effect_alias_bindings = enumerate({
            items: reader.parseEffectAliasBindings(),
        })
        cache.brushes = enumerate({
            items: reader.parseBrushes(),
        })
        cache.colors = enumerate({
            items: reader.parseColors(),
        })
        cache.fonts = enumerate({
            items: reader
                .read(['fonts/*.font'], {
                    read: false,
                })
                .map((e) => e.basename),
        })
        cache.abilities = enumerate({
            items: reader.parseEntityManifest('ability'),
        })
        cache.unit_skins = enumerate({
            items: reader.parseEntityManifest('unit_skin'),
        })
        cache.attack_target_types = string()
        cache.unit_item_build_group_ids = enumerate({
            items: reader.parseUnitItemBuildGroupIds(),
        })
        cache.unit_build_group_ids = enumerate({
            items: reader.parseUnitBuildGroupIds(),
        })
        cache.scenarios = enumerate({
            items: reader.parseScenarios(),
        })
        cache.shield_effects = enumerate({
            items: reader.parseShieldEffects(),
        })
        cache.attack_target_type_groups = enumerate({
            items: reader.parseAttackTargetTypeGroups(),
        })
        cache.ship_tags = enumerate({
            items: reader.parseShipTags(),
        })
        cache.user_interface_sounds = enumerate({
            items: reader.parseUserInterfaceSounds(),
        })

        cache.fixture_fillings = enumerate({ items: reader.parseGravityWellFixtureFillings() })
        cache.random_fixture_fillings = enumerate({ items: reader.parseGravityWellRandomFixtureFillings() })
        cache.gravity_well_fillings = enumerate({ items: reader.parseGravityWellFillings() })
        cache.random_gravity_well_fillings = enumerate({ items: reader.parseGravityWellRandomFillings() })

        cache.npc_tags = enumerate({
            items: reader.parseNpcTags(),
        })
        cache.meshes = enumerate({
            items: reader.parseMeshes(),
        })
        cache.special_operation_kinds = enumerate({
            items: reader.parseSpecialOperationUnitKinds(),
        })
        action_values = reader.parseActionValues()
        cache.action_values = (desc = '') => {
            return enumerate({
                desc: desc,
                items: action_values,
            })
        }
        cache.weapon_modifier_ids = enumerate({
            items: reader.parseBuffWeaponModifiers(),
        })
        cache.planet_modifier_ids = enumerate({
            items: reader.parseBuffPlanetModifiers(),
        })
        cache.npc_rewards = enumerate({
            items: [...reader.parseEntityManifest('npc_reward'), ''],
        })
        cache.child_meshes = enumerate({
            items: reader.parseChildMeshes(),
        })
        cache.mesh_materials = enumerate({
            items: reader.parseMeshMaterials(),
        })
        cache.pip_groups = enumerate({
            items: reader.parsePipGroups(),
        })
        cache.mainview_groups = enumerate({
            items: reader.parseMainviewGroups(),
        })
        cache.death_sequence_groups = enumerate({
            items: reader.parseDeathSequenceGroups(),
        })
        cache.death_sequences = enumerate({
            items: reader.parseDeathSequences(),
        })
        cache.formations = enumerate({
            items: reader.parseEntityManifest('formation'),
        })
        cache.weapons = enumerate({
            items: reader.parseEntityManifest('weapon'),
        })
        cache.mutations = enumerate({
            items: reader.parseUnitMutations(),
        })
        cache.players = enumerate({
            items: reader.parseEntityManifest('player'),
        })
        cache.strikecraft_kinds = enumerate({
            items: reader.parseStrikecraft(),
        })
        cache.action_data_sources = enumerate({
            items: reader.parseEntityManifest('action_data_source'),
        })
        cache.target_filters = enumerate({
            items: [...reader.parseTargetFilters(), ...reader.parseTargetFiltersUniform()],
        })
        cache.buff_empire_ids = enumerate({
            items: reader.parseBuffModifierIds(),
        })
        cache.beam_effects = enumerate({
            items: reader.parseBeamEffects(),
        })
        cache.target_filters_uniforms = enumerate({
            items: reader.parseTargetFiltersUniform(),
        })
        cache.buff_actions = enumerate({
            items: reader.parseBuffActions(),
        })
        cache.hud_skins = enumerate({
            items: reader.parseHudSkins(),
        })
        cache.debris = enumerate({
            items: reader.parseDebrisUniform(),
        })
        cache.max_tier_count = enumerate({
            desc: 'Research tier',
            items: reader.parseResearchTierCount(),
            isIntType: true,
        })
        cache.float_variables = enumerate({
            items: reader.parseFloatVariables(),
        })
        cache.unit_variables = enumerate({
            items: reader.parseUnitVariableIds(),
        })
        cache.buff_unit_factory_modifiers = enumerate({
            items: reader.parseBuffUnitFactoryModifiers(),
        })
        cache.buff_unit_modifiers = enumerate({
            items: reader.parseBuffUnitModifiers(),
        })
        cache.weapon_tags = enumerate({
            items: reader.parseWeaponTags(),
        })
        cache.loot = enumerate({
            items: reader.parseLoots(),
        })
        cache.planet_files = enumerate({
            items: reader.parsePlanetFiles(),
        })
        cache.metal_asteroids = enumerate({
            items: reader.parseMetalAsteroids(),
        })
        cache.crystal_asteroids = enumerate({
            items: reader.parseCrystalAsteroids(),
        })
        cache.planet_bonuses = enumerate({
            items: reader.parsePlanetBonuses(),
        })
        cache.planet_artifacts = enumerate({
            items: reader.parsePlanetArtifacts(),
        })
        cache.mod_images = enumerate({
            items: reader.parseModImages(),
        })

        cache.gravity_wells = enumerate({
            items: [
                ...reader.parseGravityWellFillings(),
                ...reader.parseGravityWellRandomFixtureFillings(),
                ...reader.parseGravityWellRandomFillings(),
                ...reader.parseGravityWellFixtureFillings(),
            ],
        })
    }

    const initWatchers = () => {
        setWatcher([cache.localisation], 'localized_text', ['en.localized_text'], () => [reader.parseLocalisation()])

        setWatcher([cache.scenarios], 'scenarios', ['scenario'], () => [reader.parseScenarios()])
        setWatcher([cache.pip_groups], 'gui', ['hud_bookmarks_window.gui'], () => [reader.parsePipGroups()])
        setWatcher([cache.gravity_well_props], 'gravity_well_props', ['gravity_well_props'], () => [reader.parseGravityWellProps()])
        setWatcher([cache.texture_animations], 'texture_animations', ['texture_animation'], () => [reader.parseTextureAnimations()])

        setWatcher([cache.skyboxes], 'skyboxes', ['skybox'], () => [reader.parseSkyboxes()])
        setWatcher([cache.player_icons], 'player_icons', ['player_icon'], () => [reader.parsePlayerIcons()])

        setWatcher([cache.player_portraits], 'player_portraits', ['player_portrait'], () => [reader.parsePlayerPortraits()])
        setWatcher([cache.mod_images], '', ['png'], () => [reader.parseModImages()])
        setWatcher([cache.mesh_materials], 'mesh_materials', ['mesh_material'], () => [reader.parseMeshMaterials()])
        setWatcher([cache.meshes], 'meshes', ['mesh'], () => [reader.parseMeshes()])

        setWatcher(
            [
                cache.strikecraft_units,
                cache.metal_asteroids,
                cache.crystal_asteroids,
                cache.fleet_units,

                cache.weapons,
                cache.planet_files,

                cache.planet_components,
                cache.ship_components,
                cache.unit_items,
                cache.loot,
                cache.planet_bonuses,
                cache.planet_artifacts,

                cache.unit_skins,
                cache.effect_alias_bindings,
                cache.child_meshes,

                cache.user_interface_sounds,
                cache.research_fields,
                cache.unit_group_names,
                cache.unit_item_build_group_ids,
                cache.unit_build_group_ids,

                cache.target_filters,
                { type: 'action_values', enum: action_values },
                cache.float_variables,
                cache.buff_actions,
                cache.unit_variables,
                cache.buff_unit_modifiers,
                cache.weapon_modifier_ids,
                cache.planet_modifier_ids,
                cache.buff_unit_factory_modifiers,
                cache.buff_empire_ids,
            ],
            'entities',
            [
                'unit',
                'unit',
                'unit',
                'unit',
                'weapon',
                'planet',

                'unit_item',
                'unit_item',
                'unit_item',
                'unit_item',
                'unit_item',
                'unit_item',

                'unit_skin',
                'unit_skin',
                'unit_skin',

                'player',
                'player',
                'player',
                'player',
                'player',

                'action_data_source',
                'action_data_source',
                'action_data_source',
                'action_data_source',
                'action_data_source',
                'action_data_source',
                'action_data_source',
                'action_data_source',
                'action_data_source',
                'action_data_source',
            ],
            () => [
                reader.parseStrikecraftUnits(),
                reader.parseMetalAsteroids(),
                reader.parseCrystalAsteroids(),
                reader.parseFleetUnits(),
                reader.parseEntityManifest('weapon'),
                reader.parsePlanetFiles(),

                reader.parseComponents({
                    component: 'planet_component',
                }),
                reader.parseComponents({
                    component: 'ship_component',
                }),
                reader.parseUnitItems(),
                reader.parseLoots(),
                reader.parsePlanetBonuses(),
                reader.parsePlanetArtifacts(),

                reader.parseEntityManifest('unit_skin'),
                reader.parseEffectAliasBindings(),
                reader.parseChildMeshes(),

                reader.parseUserInterfaceSounds(),
                reader.parseResearchFields(),
                reader.parseUnitNames(),
                reader.parseUnitItemBuildGroupIds(),
                reader.parseUnitBuildGroupIds(),

                [...reader.parseTargetFilters(), ...reader.parseTargetFiltersUniform()],
                reader.parseActionValues(),
                reader.parseFloatVariables(),
                reader.parseBuffActions(),
                reader.parseUnitVariableIds(),
                reader.parseBuffUnitModifiers(),
                reader.parseBuffWeaponModifiers(),
                reader.parseBuffPlanetModifiers(),
                reader.parseBuffUnitFactoryModifiers(),
                reader.parseBuffModifierIds(),
            ],
            true
        )

        setWatcher(
            [
                cache.debris,
                cache.planets,
                cache.exotics,
                cache.build_kinds,
                cache.unit_group_names,
                cache.hud_skins,
                cache.npc_tags,
                cache.mainview_groups,
                cache.attack_target_types,
                cache.attack_target_type_groups,
                cache.ship_tags,
                cache.mutations,
                cache.strikecraft_kinds,
                cache.weapon_tags,
                cache.max_tier_count,
                cache.target_filters_uniforms,
                cache.special_operation_kinds,
            ],
            'uniforms',
            [
                'debris.uniforms',
                'planet.uniforms',
                'exotic.uniforms',
                'unit_build.uniforms',
                'unit.uniforms',
                'hud_skin.uniforms',
                'player.uniforms',
                'main_view.uniforms',
                'attack_target_type_group.uniforms',
                'unit_tag.uniforms',
                'unit_mutation.uniforms',
                'strikecraft.uniforms',
                'weapon_tags.uniforms',
                'research.uniforms',
                'target_filter.uniforms',
                'special_operation_unit.uniforms',
            ],
            () => [
                reader.parseDebrisUniform(),
                reader.parsePlanets(),
                reader.parseExotics(),
                reader.parseUnitBuildKinds(),
                reader.parseUnitNames(),
                reader.parseHudSkins(),
                reader.parseNpcTags(),
                reader.parseMainviewGroups(),
                string(),
                reader.parseAttackTargetTypeGroups(),
                reader.parseShipTags(),
                reader.parseUnitMutations(),
                reader.parseStrikecraft(),
                reader.parseWeaponTags(),
                reader.parseResearchTierCount(),
                reader.parseTargetFiltersUniform(),
                reader.parseSpecialOperationUnitKinds(),
            ],
            true
        )

        setWatcher([cache.color_groups], 'player_colors', ['player_color_group'], () => [reader.parseColorGroups()])
        setWatcher([cache.ttf, cache.fonts], 'fonts', ['ttf', 'font'], () => [reader.parseFontsTtf(), reader.parseFonts()])

        setWatcher(
            [cache.particle_effects, cache.beam_effects, cache.shield_effects, cache.exhaust_trail_effects],
            'effects',
            ['particle_effect', 'beam_effect', 'shield_effect', 'exhaust_trail_effect'],
            () => [reader.parseParticleEffects(), reader.parseBeamEffects(), reader.parseShieldEffects(), reader.parseExhaustTrailEffects()]
        )
        setWatcher(
            [cache.death_sequences, cache.death_sequence_groups],
            'death_sequences',
            ['death_sequence', 'death_sequence_group'],
            () => [reader.parseDeathSequences(), reader.parseDeathSequenceGroups()],
            true
        )
        setWatcher([cache.brushes], 'brushes', ['brush'], () => [reader.parseBrushes()])

        setWatcher([{ type: 'textures', enum: textures }], 'textures', ['.png', '.dds'], () => [reader.parseTextures()])

        // // Entity Manifests
        setWatcher(
            [
                cache.unit_skins,
                cache.units,
                cache.buffs,
                cache.research_subjects,
                cache.npc_rewards,
                cache.formations,
                cache.action_data_sources,
                cache.players,
                cache.abilities,
                cache.weapons,
                cache.exotic_entities,
            ],
            'entities',
            [
                'unit_skin.entity_manifest',
                'unit.entity_manifest',
                'buff.entity_manifest',
                'research_subject.entity_manifest',
                'npc_reward.entity_manifest',
                'formation.entity_manifest',
                'action_data_source.entity_manifest',
                'player.entity_manifest',
                'ability.entity_manifest',
                'weapon.entity_manifest',
                'exotic.entity_manifest',
            ],
            () => [
                reader.parseEntityManifest('unit_skin'),
                reader.parseEntityManifest('unit'),
                reader.parseEntityManifest('buff'),
                reader.parseEntityManifest('research_subject'),
                reader.parseEntityManifest('npc_reward'),
                reader.parseEntityManifest('formation'),
                reader.parseEntityManifest('action_data_source'),
                reader.parseEntityManifest('player'),
                reader.parseEntityManifest('ability'),
                reader.parseEntityManifest('weapon'),
                reader.parseEntityManifest('exotic'),
            ],
            true
        )
        // //

        setWatcher([cache.colors], 'colors', ['named_colors.named_colors'], () => [reader.parseColorGroups()])
        setWatcher([cache.sounds, cache.ogg], 'sounds', ['sound', 'ogg'], () => [
            reader.parseSounds({
                ext: 'sound',
            }),
            reader.parseSounds({
                ext: 'ogg',
            }),
        ])
        setWatcher(
            [
                cache.fixture_fillings,
                cache.random_fixture_fillings,
                cache.gravity_well_fillings,
                cache.random_gravity_well_fillings,
                cache.gravity_wells,
            ],
            'uniforms',
            ['galaxy_generator.uniforms'],
            () => [
                reader.parseGravityWellFixtureFillings(),
                reader.parseGravityWellRandomFixtureFillings(),
                reader.parseGravityWellFillings(),
                reader.parseGravityWellRandomFillings(),
                [
                    ...reader.parseGravityWellFillings(),
                    ...reader.parseGravityWellRandomFixtureFillings(),
                    ...reader.parseGravityWellRandomFillings(),
                    ...reader.parseGravityWellFixtureFillings(),
                ],
            ],
            true
        )
    }

    initCache()
    initWatchers()

    fs.watch(modFolder, (parentEvent, parentFolder) => {
        if (parentEvent == 'rename') {
            for (const folder of WATCHED_FOLDERS) {
                if (parentFolder === folder) {
                    for (const watcher of watchers.values()) {
                        watcher.close()
                    }
                    watchers.clear()
                    initWatchers()
                    Log.info('Reloading watchers: ', Array.from(watchers.keys()).sort())
                }
            }
        }
    })

    return new Proxy(cache, {
        get: function (target, prop) {
            if (prop in target) return target[prop]
            if (prop === 'then' || prop === 'toJSON') return
            Log.error('Trying to access an invalid cache property:', prop)
        },
    })
}
