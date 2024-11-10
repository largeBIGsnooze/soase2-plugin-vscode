const path = require('path')
const { enumerate, string } = require('./definitions/data_types')
const { EntityReader } = require('./data/file_handler')
const { Log } = require('./utils/logger')
const fs = require('fs')
const loc_keys = require('./loc_keys')
const Config = require('./utils/config')

class Filewatcher {
    constructor(filewatchers, gameFolder, vanillaFolder, isWatchingVanilla) {
        this.isWatchingVanilla = isWatchingVanilla
        this.gameFolder = gameFolder
        this.filewatchers = filewatchers
        this.reader = new EntityReader(this.gameFolder)
        this.vanillaFolder = vanillaFolder
        this.vanillaReader = new EntityReader(this.vanillaFolder)
        this.textures = null
        this.action_values = null
        this.cache = {
            action_values: {},
            exotic_entities: {},
            player_icons: {},
            research_fields: {},
            player_portraits: {},
            localisation: {},
            research_subjects: {},
            planet_components: {},
            strikecraft_units: {},
            ship_components: {},
            unit_items: {},
            planets: {},
            build_kinds: {},
            color_groups: {},
            exotics: {},
            race_names: {},
            fleet_units: {},
            exhaust_trail_effects: {},
            gravity_well_props: {},
            texture_animations: {},
            unit_group_names: {},
            skyboxes: {},
            units: {},
            buffs: {},
            ttf: {},
            sounds: {},
            ogg: {},
            textures: {},
            particle_effects: {},
            effect_alias_bindings: {},
            brushes: {},
            colors: {},
            fonts: {},
            abilities: {},
            unit_skins: {},
            attack_target_types: {},
            unit_item_build_group_ids: {},
            unit_build_group_ids: {},
            scenarios: {},
            shield_effects: {},
            attack_target_type_groups: {},
            ship_tags: {},
            user_interface_sounds: {},
            fixture_fillings: {},
            random_fixture_fillings: {},
            gravity_well_fillings: {},
            random_gravity_well_fillings: {},
            moon_fillings: {},
            node_fillings: {},
            npc_tags: {},
            meshes: {},
            special_operation_kinds: {},
            weapon_modifier_ids: {},
            planet_modifier_ids: {},
            random_skybox_fillings: {},
            npc_rewards: {},
            child_meshes: {},
            mesh_materials: {},
            pip_groups: {},
            mainview_groups: {},
            death_sequence_groups: {},
            death_sequences: {},
            formations: {},
            weapons: {},
            mutations: {},
            players: {},
            strikecraft_kinds: {},
            action_data_sources: {},
            target_filters: {},
            buff_empire_ids: {},
            beam_effects: {},
            target_filters_uniforms: {},
            buff_actions: {},
            hud_skins: {},
            debris: {},
            max_tier_count: {},
            float_variables: {},
            unit_variables: {},
            buff_unit_factory_modifiers: {},
            buff_unit_modifiers: {},
            weapon_tags: {},
            loot: {},
            planet_files: {},
            metal_asteroids: {},
            crystal_asteroids: {},
            planet_bonuses: {},
            planet_artifacts: {},
            gravity_wells: {},
        }
        this.WATCHED_FOLDERS = [
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
    }

    clearFilewatchers() {
        for (const [key, watcher] of this.filewatchers) {
            watcher.close()
            this.filewatchers.delete(key)
        }
        this.filewatchers?.get('<root>')?.close()
        this.filewatchers?.delete('<root>')
    }

    watchDir(dir, callback) {
        const watchFolder = path.resolve(this.gameFolder, dir)
        if (!fs.existsSync(watchFolder)) return
        let timeout
        const watcher = fs
            .watch(watchFolder, { recursive: false }, (event, filename) => {
                if (filename === null) return
                if (event === 'rename') {
                    callback(filename)
                    console.log(event, filename)
                } else if (event === 'change') {
                    if (!timeout) {
                        callback(filename)
                        console.log(event, filename)
                        timeout = setTimeout(() => {
                            timeout = null
                        }, 50)
                    }
                }
            })
            .on('error', () => {})
        this.filewatchers.set(dir, watcher)
    }

    watchRoot() {
        if (!fs.existsSync(this.gameFolder)) return
        const rootwatcher = fs.watch(this.gameFolder, (event, eventFolder) => {
            if (event === 'rename') {
                for (const folder of this.WATCHED_FOLDERS) {
                    if (eventFolder === folder) {
                        this.clearFilewatchers()
                        this.watchRoot()
                        this.cache = this.setCacheStorage()
                        this.watchEntities()
                        console.log('Reloading watchers...', Array.from(this.filewatchers.keys()))
                    }
                }
            }
        })
        this.filewatchers.set('<root>', rootwatcher)
    }

    getCacheStorage() {
        return this.cache
    }

    setCacheStorage() {
        this.cache.exotic_entities = enumerate({
            items: this.append('exotic_entities', [{ func: 'parseEntityManifest', _args: 'exotic' }]),
        })

        this.cache.player_icons = enumerate({ items: this.append('player_icons', [{ func: 'parsePlayerIcons' }]) })

        this.cache.research_fields = enumerate({
            desc: loc_keys.RESEARCH_FIELDS,
            items: this.append('research_fields', [{ func: 'parseResearchFields' }]),
        })

        this.cache.player_portraits = enumerate({
            items: this.append('player_portraits', [{ func: 'parsePlayerPortraits' }]),
        })

        this.cache.localisation = enumerate({
            desc: loc_keys.LOCALIZED_TEXT,
            items: this.append('localisation', [{ func: 'parseLocalisation' }]),
        })

        this.cache.research_subjects = enumerate({
            items: this.append('research_subjects', [{ func: 'parseEntityManifest', _args: 'research_subject' }]),
        })

        this.cache.planet_components = enumerate({
            items: this.append('planet_components', [{ func: 'parseComponents', _args: 'planet_component' }]),
        })

        this.cache.strikecraft_units = enumerate({
            items: this.append('strikecraft_units', [{ func: 'parseStrikecraftUnits' }]),
        })

        this.cache.ship_components = enumerate({
            items: this.append('ship_components', [{ func: 'parseComponents', _args: 'ship_component' }]),
        })

        this.cache.unit_items = enumerate({
            items: this.append('unit_items', [{ func: 'parseUnitItems' }]),
        })

        this.cache.planets = enumerate({
            items: this.append('planets', [{ func: 'parsePlanets' }]),
        })

        this.cache.build_kinds = enumerate({
            items: this.append('build_kinds', [{ func: 'parseUnitBuildKinds' }]),
        })

        this.cache.color_groups = enumerate({
            items: this.append('color_groups', [{ func: 'parseColorGroups' }]),
        })

        this.cache.exotics = enumerate({
            items: this.append('exotics', [{ func: 'parseExotics' }]),
        })

        this.cache.race_names = enumerate({
            items: this.append('race_names', [{ func: 'parseRaceNames' }]),
        })

        this.cache.fleet_units = enumerate({
            items: this.append('fleet_units', [{ func: 'parseFleetUnits' }]),
        })

        this.cache.exhaust_trail_effects = enumerate({
            items: this.append('exhaust_trail_effects', [{ func: 'parseExhaustTrailEffects' }]),
        })

        this.cache.gravity_well_props = enumerate({
            items: this.append('gravity_well_props', [{ func: 'parseGravityWellProps' }]),
        })

        this.cache.texture_animations = enumerate({
            items: this.append('texture_animations', [{ func: 'parseTextureAnimations' }]),
        })

        this.cache.unit_group_names = enumerate({
            items: this.append('unit_group_names', [{ func: 'parseUnitNames' }]),
        })

        this.cache.skyboxes = enumerate({
            items: this.append('skyboxes', [{ func: 'parseSkyboxes' }]),
        })

        this.cache.units = enumerate({
            items: this.append('units', [{ func: 'parseEntityManifest', _args: 'unit' }]),
        })

        this.cache.buffs = enumerate({
            items: this.append('buffs', [{ func: 'parseEntityManifest', _args: 'buff' }]),
        })

        this.cache.ttf = enumerate({
            items: this.append('ttf', [{ func: 'parseFontsTtf' }]),
        })

        this.cache.sounds = enumerate({
            items: this.append('sounds', [{ func: 'parseSounds', _args: 'sound' }]),
        })

        this.cache.ogg = enumerate({
            items: this.append('ogg', [{ func: 'parseSounds', _args: 'ogg' }]),
        })

        this.cache.particle_effects = enumerate({
            items: this.append('particle_effects', [{ func: 'parseParticleEffects' }, { func: 'parseEffectAliasBindings' }]),
        })

        this.cache.effect_alias_bindings = enumerate({
            items: this.append('effect_alias_bindings', [{ func: 'parseEffectAliasBindings' }]),
        })

        this.cache.brushes = enumerate({
            items: this.append('brushes', [{ func: 'parseBrushes' }]),
        })

        this.cache.colors = enumerate({
            items: this.append('colors', [{ func: 'parseColors' }]),
        })

        this.cache.fonts = enumerate({
            items: this.append('fonts', [{ func: 'parseFonts' }]),
        })

        this.cache.abilities = enumerate({
            items: this.append('abilities', [{ func: 'parseEntityManifest', _args: 'ability' }]),
        })

        this.cache.unit_skins = enumerate({
            items: this.append('unit_skins', [{ func: 'parseEntityManifest', _args: 'unit_skin' }]),
        })

        this.cache.attack_target_types = string()

        this.cache.unit_item_build_group_ids = enumerate({
            items: this.append('unit_item_build_group_ids', [{ func: 'parseUnitItemBuildGroupIds' }]),
        })

        this.cache.unit_build_group_ids = enumerate({
            items: this.append('unit_build_group_ids', [{ func: 'parseUnitBuildGroupIds' }]),
        })

        this.cache.scenarios = enumerate({
            items: this.append('scenarios', [{ func: 'parseScenarios' }]),
        })

        this.cache.shield_effects = enumerate({
            items: this.append('shield_effects', [{ func: 'parseShieldEffects' }]),
        })

        this.cache.attack_target_type_groups = enumerate({
            items: this.append('attack_target_type_groups', [{ func: 'parseAttackTargetTypeGroups' }]),
        })

        this.cache.ship_tags = enumerate({
            desc: loc_keys.SHIP_TAGS,
            items: this.append('ship_tags', [{ func: 'parseShipTags' }]),
        })

        this.cache.user_interface_sounds = enumerate({
            items: this.append('user_interface_sounds', [{ func: 'parseUserInterfaceSounds' }]),
        })

        this.cache.fixture_fillings = enumerate({
            items: this.append('fixture_fillings', [{ func: 'parseGravityWellFixtureFillings' }]),
        })
        this.cache.random_fixture_fillings = enumerate({
            items: this.append('random_fixture_fillings', [{ func: 'parseGravityWellRandomFixtureFillings' }]),
        })
        this.cache.gravity_well_fillings = enumerate({
            items: this.append('gravity_well_fillings', [{ func: 'parseGravityWellFillings' }]),
        })
        this.cache.random_gravity_well_fillings = enumerate({
            items: this.append('random_gravity_well_fillings', [{ func: 'parseGravityWellRandomFillings' }]),
        })
        this.cache.moon_fillings = enumerate({
            items: this.append('moon_fillings', [{ func: 'parseMoonFillings' }]),
        })
        this.cache.node_fillings = enumerate({
            items: this.append('node_fillings', [{ func: 'parseNodeFillings' }]),
        })
        this.cache.npc_tags = enumerate({
            items: this.append('npc_tags', [{ func: 'parseNpcTags' }]),
        })
        this.cache.meshes = enumerate({
            items: this.append('meshes', [{ func: 'parseMeshes' }]),
        })
        this.cache.special_operation_kinds = enumerate({
            items: this.append('special_operation_kinds', [{ func: 'parseSpecialOperationUnitKinds' }]),
        })

        this.action_values = this.append((result) => (this.cache.action_values = result), [{ func: 'parseActionValues' }])

        this.cache.action_values = (desc = '') => {
            return enumerate({
                desc: desc,
                items: this.action_values,
            })
        }
        this.cache.weapon_modifier_ids = enumerate({
            items: this.append('weapon_modifier_ids', [{ func: 'parseBuffWeaponModifiers' }]),
        })
        this.cache.planet_modifier_ids = enumerate({
            items: this.append('planet_modifier_ids', [{ func: 'parseBuffPlanetModifiers' }]),
        })
        this.cache.random_skybox_fillings = enumerate({
            items: this.append('random_skybox_fillings', [{ func: 'parseRandomSkyboxFillings' }]),
        })
        this.cache.npc_rewards = enumerate({
            items: this.append('npc_rewards', [{ func: 'parseEntityManifest', _args: 'npc_reward' }]),
        })
        this.cache.child_meshes = enumerate({
            items: this.append('child_meshes', [{ func: 'parseChildMeshes' }]),
        })
        this.cache.mesh_materials = enumerate({
            items: this.append('mesh_materials', [{ func: 'parseMeshMaterials' }]),
        })
        this.cache.pip_groups = enumerate({
            items: this.append('pip_groups', [{ func: 'parsePipGroups' }]),
        })
        this.cache.mainview_groups = enumerate({
            items: this.append('mainview_groups', [{ func: 'parseMainviewGroups' }]),
        })
        this.cache.death_sequence_groups = enumerate({
            items: this.append('death_sequence_groups', [{ func: 'parseDeathSequenceGroups' }]),
        })
        this.cache.death_sequences = enumerate({
            items: this.append('death_sequences', [{ func: 'parseDeathSequences' }]),
        })
        this.cache.formations = enumerate({
            items: this.append('formations', [{ func: 'parseEntityManifest', _args: 'formation' }]),
        })
        this.cache.weapons = enumerate({
            desc: loc_keys.WEAPONS,
            items: this.append('weapons', [{ func: 'parseEntityManifest', _args: 'weapon' }]),
        })
        this.cache.mutations = enumerate({
            items: this.append('mutations', [{ func: 'parseUnitMutations' }]),
        })
        this.cache.players = enumerate({
            items: this.append('players', [{ func: 'parseEntityManifest', _args: 'player' }]),
        })
        this.cache.strikecraft_kinds = enumerate({
            items: this.append('strikecraft_kinds', [{ func: 'parseStrikecraft' }]),
        })
        this.cache.action_data_sources = enumerate({
            items: this.append('action_data_sources', [{ func: 'parseEntityManifest', _args: 'action_data_source' }]),
        })
        this.cache.target_filters = enumerate({
            items: this.append('target_filters', [{ func: 'parseTargetFilters' }, { func: 'parseTargetFiltersUniform' }]),
        })
        this.cache.buff_empire_ids = enumerate({
            items: this.append('buff_empire_ids', [{ func: 'parseBuffModifierIds' }]),
        })
        this.cache.beam_effects = enumerate({
            items: this.append('beam_effects', [{ func: 'parseBeamEffects' }]),
        })
        this.cache.target_filters_uniforms = enumerate({
            items: this.append('target_filters_uniforms', [{ func: 'parseTargetFiltersUniform' }]),
        })
        this.cache.buff_actions = enumerate({
            items: this.append('buff_actions', [{ func: 'parseBuffActions' }]),
        })
        this.cache.hud_skins = enumerate({
            items: this.append('hud_skins', [{ func: 'parseHudSkins' }]),
        })
        this.cache.debris = enumerate({
            items: this.append('debris', [{ func: 'parseDebrisUniform' }]),
        })
        this.cache.max_tier_count = enumerate({
            desc: loc_keys.RESEARCH_TIER,
            items: this.append('max_tier_count', [{ func: 'parseResearchTierCount' }]),
            isIntType: true,
        })
        this.cache.float_variables = enumerate({
            items: this.append('float_variables', [{ func: 'parseFloatVariables' }]),
        })
        this.cache.unit_variables = enumerate({
            items: this.append('unit_variables', [{ func: 'parseUnitVariableIds' }]),
        })
        this.cache.buff_unit_factory_modifiers = enumerate({
            items: this.append('buff_unit_factory_modifiers', [{ func: 'parseBuffUnitFactoryModifiers' }]),
        })
        this.cache.buff_unit_modifiers = enumerate({
            items: this.append('buff_unit_modifiers', [{ func: 'parseBuffUnitModifiers' }]),
        })
        this.cache.weapon_tags = enumerate({
            items: this.append('weapon_tags', [{ func: 'parseWeaponTags' }]),
        })
        this.cache.loot = enumerate({
            items: this.append('loot', [{ func: 'parseLoots' }]),
        })
        this.cache.planet_files = enumerate({
            items: this.append('planet_files', [{ func: 'parsePlanetFiles' }]),
        })
        this.cache.metal_asteroids = enumerate({
            items: this.append('metal_asteroids', [{ func: 'parseMetalAsteroids' }]),
        })
        this.cache.crystal_asteroids = enumerate({
            items: this.append('crystal_asteroids', [{ func: 'parseCrystalAsteroids' }]),
        })
        this.cache.planet_bonuses = enumerate({
            items: this.append('planet_bonuses', [{ func: 'parsePlanetBonuses' }]),
        })
        this.cache.planet_artifacts = enumerate({
            items: this.append('planet_artifacts', [{ func: 'parsePlanetArtifacts' }]),
        })

        // this.cache.mod_images = enumerate({
        //     items: this.reader.parseModImages(),
        // })
        this.cache.gravity_wells = enumerate({
            items: this.append('gravity_wells', [
                { func: 'parseGravityWellFillings' },
                { func: 'parseGravityWellRandomFixtureFillings' },
                { func: 'parseGravityWellRandomFillings' },
                { func: 'parseGravityWellFixtureFillings' },
            ]),
        })
        this.textures = this.append((result) => (this.cache.textures = result), [{ func: 'parseTextures' }])
        this.cache.textures = (desc = loc_keys.TEXTURES) => {
            return enumerate({
                desc: desc,
                items: this.textures,
            })
        }

        return this.cache
    }

    appendAsync(args) {
        return new Promise((resolve) => setTimeout(() => resolve(this.append({}, args)), 1000))
    }
    append(cache, args) {
        const builder = []
        if (this.isWatchingVanilla && this.gameFolder !== this.vanillaFolder) {
            args.forEach(({ func, _args }) => builder.push(...this.reader[func](_args), ...this.vanillaReader[func](_args)))
        } else {
            args.forEach(({ func, _args }) => builder.push(...this.reader[func](_args)))
        }
        if (typeof cache === 'function') {
            return cache(builder)
        } else if (typeof cache === 'string') {
            this.cache[cache].enum = builder
        }
        return builder
    }

    watchEntities() {
        this.watchDir('textures', (textureName) => {
            if (textureName?.endsWith('.dds') || textureName?.endsWith('.png')) {
                this.append((result) => (this.textures = result), [{ func: 'parseTextures' }])
            }
        })
        this.watchDir('effects', (entityName) => {
            if (entityName?.endsWith('.particle_effect')) {
                this.append('particle_effects', [{ func: 'parseParticleEffects' }, { func: 'parseEffectAliasBindings' }])
            }
            if (entityName?.endsWith('.shield_effect')) {
                this.append('shield_effects', [
                    {
                        func: 'parseShieldEffects',
                    },
                ])
            }
            if (entityName?.endsWith('.beam_effect')) {
                this.append('beam_effects', [
                    {
                        func: 'parseBeamEffects',
                    },
                ])
            }
            if (entityName?.endsWith('.exhaust_trail_effects')) {
                this.append('exhaust_trail_effects', [
                    {
                        func: 'parseExhaustTrailEffects',
                    },
                ])
            }
        })
        this.watchDir('localized_text', (entityName) => {
            if (entityName === 'en.localized_text') {
                this.appendAsync([
                    {
                        func: 'parseLocalisation',
                    },
                ]).then((result) => {
                    this.cache.localisation.enum = result
                })
            }
        })
        this.watchDir('scenarios', (entityName) => {
            if (entityName?.endsWith('.scenario')) {
                this.append('scenarios', [
                    {
                        func: 'parseScenarios',
                    },
                ])
            }
        })
        this.watchDir('gui', (entityName) => {
            if (entityName === 'hud_bookmarks_window.gui') {
                this.append('pip_groups', [
                    {
                        func: 'parsePipGroups',
                    },
                ])
            }
        })
        this.watchDir('gravity_well_props', (entityName) => {
            if (entityName?.endsWith('.gravity_well_props')) {
                this.append('gravity_well_props', [
                    {
                        func: 'parseGravityWellProps',
                    },
                ])
            }
        })
        this.watchDir('texture_animations', (entityName) => {
            if (entityName?.endsWith('.texture_animation')) {
                this.append('texture_animations', [
                    {
                        func: 'parseTextureAnimations',
                    },
                ])
            }
        })
        this.watchDir('skyboxes', (entityName) => {
            if (entityName?.endsWith('.skybox')) {
                this.append('skyboxes', [
                    {
                        func: 'parseSkyboxes',
                    },
                ])
            }
        })
        this.watchDir('player_icons', (entityName) => {
            if (entityName?.endsWith('.player_icon')) {
                this.append('player_icons', [
                    {
                        func: 'parsePlayerIcons',
                    },
                ])
            }
        })
        this.watchDir('player_portraits', (entityName) => {
            if (entityName?.endsWith('.player_portrait')) {
                this.append('player_portraits', [
                    {
                        func: 'parsePlayerPortraits',
                    },
                ])
            }
        })
        this.watchDir('mesh_materials', (entityName) => {
            if (entityName?.endsWith('.mesh_material')) {
                this.append('mesh_materials', [
                    {
                        func: 'parseMeshMaterials',
                    },
                ])
            }
        })
        this.watchDir('meshes', (entityName) => {
            if (entityName?.endsWith('.mesh')) {
                this.append('meshes', [
                    {
                        func: 'parseMeshes',
                    },
                ])
            }
        })
        this.watchDir('entities', (entityName) => {
            if (entityName?.endsWith('.unit')) {
                this.append('strikecraft_units', [
                    {
                        func: 'parseStrikecraftUnits',
                    },
                ])
                this.append('metal_asteroids', [
                    {
                        func: 'parseMetalAsteroids',
                    },
                ])
                this.append('crystal_asteroids', [
                    {
                        func: 'parseCrystalAsteroids',
                    },
                ])
                this.append('fleet_units', [
                    {
                        func: 'parseFleetUnits',
                    },
                ])
            }
            if (entityName?.endsWith('.planet')) {
                this.append('planet_files', [
                    {
                        func: 'parsePlanetFiles',
                    },
                ])
            }
            if (entityName?.endsWith('.unit_item')) {
                this.append('planet_components', [
                    {
                        func: 'parseComponents',
                        _args: 'planet_component',
                    },
                ])
                this.append('ship_components', [
                    {
                        func: 'parseComponents',
                        _args: 'ship_component',
                    },
                ])
                this.append('unit_items', [
                    {
                        func: 'parseUnitItems',
                    },
                ])
                this.append('loot', [
                    {
                        func: 'parseLoots',
                    },
                ])
                this.append('planet_bonuses', [
                    {
                        func: 'parsePlanetBonuses',
                    },
                ])
                this.append('planet_artifacts', [
                    {
                        func: 'parsePlanetArtifacts',
                    },
                ])
            }
            if (entityName?.endsWith('.unit_skin')) {
                this.append('effect_alias_bindings', [
                    {
                        func: 'parseEffectAliasBindings',
                    },
                ])
                this.append('child_meshes', [
                    {
                        func: 'parseChildMeshes',
                    },
                ])
            }

            if (entityName?.endsWith('.player')) {
                this.append('user_interface_sounds', [
                    {
                        func: 'parseUserInterfaceSounds',
                    },
                ])
                this.append('research_fields', [
                    {
                        func: 'parseResearchFields',
                    },
                ])
                this.append('unit_group_names', [
                    {
                        func: 'parseUnitNames',
                    },
                ])
                this.append('unit_item_build_group_ids', [
                    {
                        func: 'parseUnitItemBuildGroupIds',
                    },
                ])
                this.append('unit_build_group_ids', [
                    {
                        func: 'parseUnitBuildGroupIds',
                    },
                ])
            }
            if (entityName?.endsWith('.action_data_source')) {
                this.append('target_filters', [
                    {
                        func: 'parseTargetFilters',
                    },
                    {
                        func: 'parseTargetFiltersUniform',
                    },
                ])
                this.append(
                    (result) => (this.action_values = result),
                    [
                        {
                            func: 'parseActionValues',
                        },
                    ]
                )
                this.append('float_variables', [
                    {
                        func: 'parseFloatVariables',
                    },
                ])
                this.append('buff_actions', [
                    {
                        func: 'parseBuffActions',
                    },
                ])
                this.append('unit_variables', [
                    {
                        func: 'parseUnitVariableIds',
                    },
                ])
                this.append('buff_unit_modifiers', [
                    {
                        func: 'parseBuffUnitModifiers',
                    },
                ])
                this.append('weapon_modifier_ids', [
                    {
                        func: 'parseBuffWeaponModifiers',
                    },
                ])
                this.append('planet_modifier_ids', [
                    {
                        func: 'parseBuffPlanetModifiers',
                    },
                ])
                this.append('buff_unit_factory_modifiers', [
                    {
                        func: 'parseBuffUnitFactoryModifiers',
                    },
                ])
                this.append('buff_empire_ids', [
                    {
                        func: 'parseBuffModifierIds',
                    },
                ])
            }

            if (entityName === 'unit_skin.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'unit_skin',
                    },
                ]).then((result) => {
                    this.cache.unit_skins.enum = result
                })
            }
            if (entityName === 'unit.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'unit',
                    },
                ]).then((result) => {
                    this.cache.units.enum = result
                })
            }
            if (entityName === 'buff.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'buff',
                    },
                ]).then((result) => {
                    this.cache.buffs.enum = result
                })
            }
            if (entityName === 'research_subject.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'research_subject',
                    },
                ]).then((result) => {
                    this.cache.research_subjects.enum = result
                })
            }
            if (entityName === 'npc_reward.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'npc_reward',
                    },
                ]).then((result) => {
                    this.cache.npc_rewards.enum = result
                })
            }
            if (entityName === 'formation.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'formation',
                    },
                ]).then((result) => {
                    this.cache.formations.enum = result
                })
            }
            if (entityName === 'action_data_source.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'action_data_source',
                    },
                ]).then((result) => {
                    this.cache.action_data_sources.enum = result
                })
            }
            if (entityName === 'player.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'player',
                    },
                ]).then((result) => {
                    this.cache.players.enum = result
                })
            }
            if (entityName === 'ability.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'ability',
                    },
                ]).then((result) => {
                    this.cache.abilities.enum = result
                })
            }
            if (entityName === 'weapon.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'weapon',
                    },
                ]).then((result) => {
                    this.cache.weapons.enum = result
                })
            }
            if (entityName === 'exotic.entity_manifest') {
                this.appendAsync([
                    {
                        func: 'parseEntityManifest',
                        _args: 'exotic',
                    },
                ]).then((result) => {
                    this.cache.exotic_entities.enum = result
                })
            }
        })

        this.watchDir('uniforms', (entityName) => {
            if (entityName === 'player_race.uniforms') {
                this.append('race_names', [
                    {
                        func: 'parseRaceNames',
                    },
                ])
            }
            if (entityName === 'debris.uniforms') {
                this.append('debris', [
                    {
                        func: 'parseDebrisUniform',
                    },
                ])
            }
            if (entityName === 'planet.uniforms') {
                this.append('planets', [
                    {
                        func: 'parsePlanets',
                    },
                ])
            }
            if (entityName === 'exotic.uniforms') {
                this.append('exotics', [
                    {
                        func: 'parseExotics',
                    },
                ])
            }
            if (entityName === 'unit_build.uniforms') {
                this.append('build_kinds', [
                    {
                        func: 'parseUnitBuildKinds',
                    },
                ])
            }
            if (entityName === 'unit.uniforms') {
                this.append('unit_group_names', [
                    {
                        func: 'parseUnitNames',
                    },
                ])
            }
            if (entityName === 'hud_skin.uniforms') {
                this.append('hud_skins', [
                    {
                        func: 'parseHudSkins',
                    },
                ])
            }
            if (entityName === 'player.uniforms') {
                this.append('npc_tags', [
                    {
                        func: 'parseNpcTags',
                    },
                ])
            }
            if (entityName === 'main_view.uniforms') {
                this.append('mainview_groups', [
                    {
                        func: 'parseMainviewGroups',
                    },
                ])
            }
            if (entityName === 'attack_target_type_group.uniforms') {
                this.cache.attack_target_types.enum = string()
                this.append('attack_target_type_groups', [
                    {
                        func: 'parseAttackTargetTypeGroups',
                    },
                ])
            }
            if (entityName === 'unit_tag.uniforms') {
                this.append('ship_tags', [
                    {
                        func: 'parseShipTags',
                    },
                ])
            }
            if (entityName === 'unit_mutation.uniforms') {
                this.append('mutations', [
                    {
                        func: 'parseUnitMutations',
                    },
                ])
            }
            if (entityName === 'strikecraft.uniforms') {
                this.append('strikecraft_kinds', [
                    {
                        func: 'parseStrikecraft',
                    },
                ])
            }
            if (entityName === 'weapon.uniforms') {
                this.append('weapon_tags', [
                    {
                        func: 'parseWeaponTags',
                    },
                ])
            }
            if (entityName === 'research.uniforms') {
                this.append('max_tier_count', [
                    {
                        func: 'parseResearchTierCount',
                    },
                ])
            }
            if (entityName === 'target_filter.uniforms') {
                this.append('target_filters_uniforms', [
                    {
                        func: 'parseTargetFiltersUniform',
                    },
                ])
            }
            if (entityName === 'special_operation_unit.uniforms') {
                this.append('special_operation_kinds', [
                    {
                        func: 'parseSpecialOperationUnitKinds',
                    },
                ])
            }
            if (entityName === 'random_skybox_filling.uniforms') {
                this.append('random_skybox_fillings', [
                    {
                        func: 'parseRandomSkyboxFillings',
                    },
                ])
            }

            if (entityName === 'galaxy_generator.uniforms') {
                this.append('fixture_fillings', [
                    {
                        func: 'parseGravityWellFixtureFillings',
                    },
                ])
                this.append('random_fixture_fillings', [
                    {
                        func: 'parseGravityWellRandomFixtureFillings',
                    },
                ])
                this.append('gravity_well_fillings', [
                    {
                        func: 'parseGravityWellFillings',
                    },
                ])
                this.append('random_gravity_well_fillings', [
                    {
                        func: 'parseGravityWellRandomFillings',
                    },
                ])
                this.append('gravity_wells', [
                    {
                        func: 'parseGravityWellFillings',
                    },
                    {
                        func: 'parseGravityWellRandomFixtureFillings',
                    },
                    {
                        func: 'parseGravityWellRandomFillings',
                    },
                    {
                        func: 'parseGravityWellFixtureFillings',
                    },
                ])
                this.append('moon_fillings', [
                    {
                        func: 'parseMoonFillings',
                    },
                ])
                this.append('node_fillings', [
                    {
                        func: 'parseNodeFillings',
                    },
                ])
            }
        })

        this.watchDir('player_colors', (entityName) => {
            if (entityName?.endsWith('.player_color_group')) {
                this.append('color_groups', [
                    {
                        func: 'parseColorGroups',
                    },
                ])
            }
        })
        this.watchDir('fonts', (entityName) => {
            if (entityName?.endsWith('.ttf')) {
                this.append('ttf', [
                    {
                        func: 'parseFontsTtf',
                    },
                ])
            }
            if (entityName?.endsWith('.font')) {
                this.append('fonts', [
                    {
                        func: 'parseFonts',
                    },
                ])
            }
        })
        this.watchDir('death_sequences', (entityName) => {
            if (entityName?.endsWith('.death_sequence')) {
                this.append('death_sequences', [
                    {
                        func: 'parseDeathSequences',
                    },
                ])
            }
            if (entityName?.endsWith('.death_sequence_group')) {
                this.append('death_sequence_groups', [
                    {
                        func: 'parseDeathSequenceGroups',
                    },
                ])
            }
        })
        this.watchDir('brushes', (entityName) => {
            if (entityName?.endsWith('.brush')) {
                this.append('brushes', [
                    {
                        func: 'parseBrushes',
                    },
                ])
            }
        })
        this.watchDir('colors', (entityName) => {
            if (entityName === 'named_colors.named_colors') {
                this.append('colors', [
                    {
                        func: 'parseColorGroups',
                    },
                ])
            }
        })
        this.watchDir('sounds', (entityName) => {
            if (entityName?.endsWith('.sound')) {
                this.append('sounds', [
                    {
                        func: 'parseSounds',
                        _args: 'sound',
                    },
                ])
            }
            if (entityName?.endsWith('.ogg')) {
                this.append('ogg', [
                    {
                        func: 'parseSounds',
                        _args: 'ogg',
                    },
                ])
            }
        })
    }
}

module.exports = ({ modFolder, vanillaFolder = null, modFilewatchers = new Map() }) => {
    const fw = new Filewatcher(modFilewatchers, modFolder, vanillaFolder, Config.isValidGamePath(vanillaFolder))

    fw.clearFilewatchers()
    fw.watchRoot()
    fw.setCacheStorage()
    fw.watchEntities()

    return new Proxy(fw.getCacheStorage(), {
        get: function (target, prop) {
            if (prop in target) return target[prop]
            if (prop === 'then' || prop === 'toJSON') return
            Log.error('Trying to access an invalid cache property:', prop)
        },
    })
}
