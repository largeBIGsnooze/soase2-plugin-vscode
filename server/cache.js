const path = require('path')
const { enumerate, string } = require('./definitions/data_types')
const { EntityParser } = require('./data/file_handler')
const { Log } = require('./utils/logger')
const fs = require('fs')
const loc_keys = require('./loc_keys')

class Filewatcher {
    constructor(gameFolder, textures, action_values, cache) {
        this.gameFolder = gameFolder
        this.filewatchers = new Map()
        this.reader = new EntityParser(this.gameFolder)
        this.textures = textures
        this.action_values = action_values
        this.cache = cache
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

    getFilewatchers() {
        return this.filewatchers
    }

    clearFilewatchers() {
        for (const [key, watcher] of this.filewatchers) {
            watcher.close()
            this.filewatchers.delete(key)
        }
    }

    watchDir(dir, callback) {
        const watchFolder = path.resolve(this.gameFolder, dir)
        if (!fs.existsSync(watchFolder)) return
        if (this.filewatchers.has(dir)) {
            this.filewatchers.get(dir).close()
        }

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
        fs.watch(this.gameFolder, (event, eventFolder) => {
            if (event === 'rename') {
                for (const folder of this.WATCHED_FOLDERS) {
                    if (eventFolder === folder) {
                        this.clearFilewatchers()
                        this.cache = this.getCacheStorage()
                        this.watch()
                        console.log('Reloading watchers...', Array.from(this.filewatchers.keys()))
                    }
                }
            }
        })
    }

    getCacheStorage() {
        this.cache.exotic_entities = enumerate({
            items: this.reader.parseEntityManifest('exotic'),
        })
        this.cache.player_icons = enumerate({
            items: this.reader.parsePlayerIcons(),
        })
        this.cache.research_fields = enumerate({
            desc: loc_keys.RESEARCH_FIELDS,
            items: this.reader.parseResearchFields(),
        })
        this.cache.player_portraits = enumerate({
            items: this.reader.parsePlayerPortraits(),
        })
        this.cache.localisation = enumerate({
            desc: loc_keys.LOCALIZED_TEXT,
            items: this.reader.parseLocalisation(),
        })
        this.cache.research_subjects = enumerate({
            items: this.reader.parseEntityManifest('research_subject'),
        })
        this.cache.planet_components = enumerate({
            items: this.reader.parseComponents('planet_component'),
        })
        this.cache.strikecraft_units = enumerate({
            items: this.reader.parseStrikecraftUnits(),
        })
        this.cache.ship_components = enumerate({
            items: this.reader.parseComponents('ship_component'),
        })
        this.cache.unit_items = enumerate({
            items: this.reader.parseUnitItems(),
        })
        this.cache.planets = enumerate({
            items: this.reader.parsePlanets(),
        })
        this.cache.build_kinds = enumerate({
            items: this.reader.parseUnitBuildKinds(),
        })
        this.cache.color_groups = enumerate({
            items: this.reader.parseColorGroups(),
        })
        this.cache.exotics = enumerate({
            items: this.reader.parseExotics(),
        })
        this.cache.race_names = enumerate({
            items: this.reader.parseRaceNames(),
        })
        this.cache.fleet_units = enumerate({
            items: this.reader.parseFleetUnits(),
        })
        this.cache.exhaust_trail_effects = enumerate({
            items: this.reader.parseExhaustTrailEffects(),
        })
        this.cache.gravity_well_props = enumerate({
            items: this.reader.parseGravityWellProps(),
        })
        this.cache.texture_animations = enumerate({
            items: this.reader.parseTextureAnimations(),
        })
        this.cache.unit_group_names = enumerate({
            items: this.reader.parseUnitNames(),
        })
        this.cache.skyboxes = enumerate({
            items: this.reader.parseSkyboxes(),
        })
        this.cache.units = enumerate({
            items: this.reader.parseEntityManifest('unit'),
        })
        this.cache.buffs = enumerate({
            items: this.reader.parseEntityManifest('buff'),
        })
        this.cache.ttf = enumerate({
            items: this.reader.parseFontsTtf(),
        })
        this.cache.sounds = enumerate({
            items: this.reader.parseSounds('sound'),
        })
        this.cache.ogg = enumerate({
            items: this.reader.parseSounds('ogg'),
        })
        this.textures = this.reader.parseTextures()
        this.cache.textures = (desc = loc_keys.TEXTURES) => {
            return enumerate({
                desc: desc,
                items: this.textures,
            })
        }
        this.cache.particle_effects = enumerate({
            items: [...this.reader.parseParticleEffects(), ...this.reader.parseEffectAliasBindings()],
        })
        this.cache.effect_alias_bindings = enumerate({
            items: this.reader.parseEffectAliasBindings(),
        })
        this.cache.brushes = enumerate({
            items: this.reader.parseBrushes(),
        })
        this.cache.colors = enumerate({
            items: this.reader.parseColors(),
        })
        this.cache.fonts = enumerate({
            items: this.reader
                .read(['fonts/*.font'], {
                    read: false,
                })
                .map((e) => e.basename),
        })
        this.cache.abilities = enumerate({
            items: this.reader.parseEntityManifest('ability'),
        })
        this.cache.unit_skins = enumerate({
            items: this.reader.parseEntityManifest('unit_skin'),
        })
        this.cache.attack_target_types = string()
        this.cache.unit_item_build_group_ids = enumerate({
            items: this.reader.parseUnitItemBuildGroupIds(),
        })
        this.cache.unit_build_group_ids = enumerate({
            items: this.reader.parseUnitBuildGroupIds(),
        })
        this.cache.scenarios = enumerate({
            items: this.reader.parseScenarios(),
        })
        this.cache.shield_effects = enumerate({
            items: this.reader.parseShieldEffects(),
        })
        this.cache.attack_target_type_groups = enumerate({
            items: this.reader.parseAttackTargetTypeGroups(),
        })
        this.cache.ship_tags = enumerate({
            desc: loc_keys.SHIP_TAGS,
            items: this.reader.parseShipTags(),
        })
        this.cache.user_interface_sounds = enumerate({
            items: this.reader.parseUserInterfaceSounds(),
        })

        this.cache.fixture_fillings = enumerate({ items: this.reader.parseGravityWellFixtureFillings() })
        this.cache.random_fixture_fillings = enumerate({ items: this.reader.parseGravityWellRandomFixtureFillings() })
        this.cache.gravity_well_fillings = enumerate({ items: this.reader.parseGravityWellFillings() })
        this.cache.random_gravity_well_fillings = enumerate({ items: this.reader.parseGravityWellRandomFillings() })
        this.cache.moon_fillings = enumerate({ items: this.reader.parseMoonFillings() })
        this.cache.node_fillings = enumerate({ items: this.reader.parseNodeFillings() })

        this.cache.npc_tags = enumerate({
            items: this.reader.parseNpcTags(),
        })
        this.cache.meshes = enumerate({
            items: this.reader.parseMeshes(),
        })
        this.cache.special_operation_kinds = enumerate({
            items: this.reader.parseSpecialOperationUnitKinds(),
        })
        this.action_values = this.reader.parseActionValues()
        this.cache.action_values = (desc = '') => {
            return enumerate({
                desc: desc,
                items: this.action_values,
            })
        }
        this.cache.weapon_modifier_ids = enumerate({
            items: this.reader.parseBuffWeaponModifiers(),
        })
        this.cache.planet_modifier_ids = enumerate({
            items: this.reader.parseBuffPlanetModifiers(),
        })
        this.cache.random_skybox_fillings = enumerate({
            items: this.reader.parseRandomSkyboxFillings(),
        })
        this.cache.npc_rewards = enumerate({
            items: [...this.reader.parseEntityManifest('npc_reward'), ''],
        })
        this.cache.child_meshes = enumerate({
            items: this.reader.parseChildMeshes(),
        })
        this.cache.mesh_materials = enumerate({
            items: this.reader.parseMeshMaterials(),
        })
        this.cache.pip_groups = enumerate({
            items: this.reader.parsePipGroups(),
        })
        this.cache.mainview_groups = enumerate({
            items: this.reader.parseMainviewGroups(),
        })
        this.cache.death_sequence_groups = enumerate({
            items: this.reader.parseDeathSequenceGroups(),
        })
        this.cache.death_sequences = enumerate({
            items: this.reader.parseDeathSequences(),
        })
        this.cache.formations = enumerate({
            items: this.reader.parseEntityManifest('formation'),
        })
        this.cache.weapons = enumerate({
            desc: loc_keys.WEAPONS,
            items: this.reader.parseEntityManifest('weapon'),
        })
        this.cache.mutations = enumerate({
            items: this.reader.parseUnitMutations(),
        })
        this.cache.players = enumerate({
            items: this.reader.parseEntityManifest('player'),
        })
        this.cache.strikecraft_kinds = enumerate({
            items: this.reader.parseStrikecraft(),
        })
        this.cache.action_data_sources = enumerate({
            items: this.reader.parseEntityManifest('action_data_source'),
        })
        this.cache.target_filters = enumerate({
            items: [...this.reader.parseTargetFilters(), ...this.reader.parseTargetFiltersUniform()],
        })
        this.cache.buff_empire_ids = enumerate({
            items: this.reader.parseBuffModifierIds(),
        })
        this.cache.beam_effects = enumerate({
            items: this.reader.parseBeamEffects(),
        })
        this.cache.target_filters_uniforms = enumerate({
            items: this.reader.parseTargetFiltersUniform(),
        })
        this.cache.buff_actions = enumerate({
            items: this.reader.parseBuffActions(),
        })
        this.cache.hud_skins = enumerate({
            items: this.reader.parseHudSkins(),
        })
        this.cache.debris = enumerate({
            items: this.reader.parseDebrisUniform(),
        })
        this.cache.max_tier_count = enumerate({
            desc: loc_keys.RESEARCH_TIER,
            items: this.reader.parseResearchTierCount(),
            isIntType: true,
        })
        this.cache.float_variables = enumerate({
            items: this.reader.parseFloatVariables(),
        })
        this.cache.unit_variables = enumerate({
            items: this.reader.parseUnitVariableIds(),
        })
        this.cache.buff_unit_factory_modifiers = enumerate({
            items: this.reader.parseBuffUnitFactoryModifiers(),
        })
        this.cache.buff_unit_modifiers = enumerate({
            items: this.reader.parseBuffUnitModifiers(),
        })
        this.cache.weapon_tags = enumerate({
            items: this.reader.parseWeaponTags(),
        })
        this.cache.loot = enumerate({
            items: this.reader.parseLoots(),
        })
        this.cache.planet_files = enumerate({
            items: this.reader.parsePlanetFiles(),
        })
        this.cache.metal_asteroids = enumerate({
            items: this.reader.parseMetalAsteroids(),
        })
        this.cache.crystal_asteroids = enumerate({
            items: this.reader.parseCrystalAsteroids(),
        })
        this.cache.planet_bonuses = enumerate({
            items: this.reader.parsePlanetBonuses(),
        })
        this.cache.planet_artifacts = enumerate({
            items: this.reader.parsePlanetArtifacts(),
        })
        // this.cache.mod_images = enumerate({
        //     items: this.reader.parseModImages(),
        // })

        this.cache.gravity_wells = enumerate({
            items: [
                ...this.reader.parseGravityWellFillings(),
                ...this.reader.parseGravityWellRandomFixtureFillings(),
                ...this.reader.parseGravityWellRandomFillings(),
                ...this.reader.parseGravityWellFixtureFillings(),
            ],
        })
        this.cache.textures = (desc = loc_keys.TEXTURES) => {
            return enumerate({
                desc: desc,
                items: this.textures,
            })
        }
        return this.cache
    }

    watch() {
        this.watchDir('textures', (textureName) => {
            if (textureName?.endsWith('.dds') || textureName?.endsWith('.png')) {
                this.textures = this.reader.parseTextures()
            }
        })
        this.watchDir('effects', (entityName) => {
            if (entityName?.endsWith('.particle_effect')) {
                this.cache.particle_effects.enum = [...this.reader.parseParticleEffects(), ...this.reader.parseEffectAliasBindings()]
            }
            if (entityName?.endsWith('.shield_effect')) {
                this.cache.shield_effects.enum = this.reader.parseShieldEffects()
            }
            if (entityName?.endsWith('.beam_effect')) {
                this.cache.beam_effects.enum = this.reader.parseBeamEffects()
            }
            if (entityName?.endsWith('.exhaust_trail_effects')) {
                this.cache.exhaust_trail_effects.enum = this.reader.parseExhaustTrailEffects()
            }
        })
        this.watchDir('localized_text', (entityName) => {
            if (entityName === 'en.localized_text') {
                new Promise((resolve) =>
                    setTimeout(() => {
                        this.cache.localisation.enum = this.reader.parseLocalisation()
                        resolve()
                    }, 1000)
                )
            }
        })
        this.watchDir('scenarios', (entityName) => {
            if (entityName?.endsWith('.scenario')) {
                this.cache.scenarios.enum = this.reader.parseScenarios()
            }
        })
        this.watchDir('gui', (entityName) => {
            if (entityName === 'hud_bookmarks_window.gui') {
                this.cache.pip_groups.enum = this.reader.parsePipGroups()
            }
        })
        this.watchDir('gravity_well_props', (entityName) => {
            if (entityName?.endsWith('.gravity_well_props')) {
                this.cache.gravity_well_props.enum = this.reader.parseGravityWellProps()
            }
        })
        this.watchDir('texture_animations', (entityName) => {
            if (entityName?.endsWith('.texture_animation')) {
                this.cache.texture_animations.enum = this.reader.parseTextureAnimations()
            }
        })
        this.watchDir('skyboxes', (entityName) => {
            if (entityName?.endsWith('.skybox')) {
                this.cache.skyboxes.enum = this.reader.parseSkyboxes()
            }
        })
        this.watchDir('player_icons', (entityName) => {
            if (entityName?.endsWith('.player_icon')) {
                this.cache.player_icons.enum = this.reader.parsePlayerIcons()
            }
        })
        this.watchDir('player_portraits', (entityName) => {
            if (entityName?.endsWith('.player_portrait')) {
                this.cache.player_portraits.enum = this.reader.parsePlayerPortraits()
            }
        })
        this.watchDir('mesh_materials', (entityName) => {
            if (entityName?.endsWith('.mesh_material')) {
                this.cache.mesh_materials.enum = this.reader.parseMeshMaterials()
            }
        })
        this.watchDir('meshes', (entityName) => {
            if (entityName?.endsWith('.mesh')) {
                this.cache.meshes.enum = this.reader.parseMeshes()
            }
        })
        this.watchDir('entities', (entityName) => {
            if (entityName?.endsWith('.unit')) {
                this.cache.strikecraft_units.enum = this.reader.parseStrikecraftUnits()
                this.cache.metal_asteroids.enum = this.reader.parseMetalAsteroids()
                this.cache.crystal_asteroids.enum = this.reader.parseCrystalAsteroids()
                this.cache.fleet_units.enum = this.reader.parseFleetUnits()
            }
            if (entityName?.endsWith('.planet')) {
                this.cache.planet_files.enum = this.reader.parsePlanetFiles()
            }
            if (entityName?.endsWith('.unit_item')) {
                this.cache.planet_components.enum = this.reader.parseComponents('planet_component')
                this.cache.ship_components.enum = this.reader.parseComponents('ship_component')
                this.cache.unit_items.enum = this.reader.parseUnitItems()
                this.cache.loot.enum = this.reader.parseLoots()
                this.cache.planet_bonuses.enum = this.reader.parsePlanetBonuses()
                this.cache.planet_artifacts.enum = this.reader.parsePlanetArtifacts()
            }
            if (entityName?.endsWith('.unit_skin')) {
                this.cache.effect_alias_bindings.enum = this.reader.parseEffectAliasBindings()
                this.cache.child_meshes.enum = this.reader.parseChildMeshes()
            }

            if (entityName?.endsWith('.player')) {
                this.cache.user_interface_sounds.enum = this.reader.parseUserInterfaceSounds()
                this.cache.research_fields.enum = this.reader.parseResearchFields()
                this.cache.unit_group_names.enum = this.reader.parseUnitNames()
                this.cache.unit_item_build_group_ids.enum = this.reader.parseUnitItemBuildGroupIds()
                this.cache.unit_build_group_ids.enum = this.reader.parseUnitBuildGroupIds()
            }
            if (entityName?.endsWith('.action_data_source')) {
                this.cache.target_filters.enum = [...this.reader.parseTargetFilters(), ...this.reader.parseTargetFiltersUniform()]
                this.cache.action_values.enum = this.reader.parseActionValues()
                this.cache.float_variables.enum = this.reader.parseFloatVariables()
                this.cache.buff_actions.enum = this.reader.parseBuffActions()
                this.cache.unit_variables.enum = this.reader.parseUnitVariableIds()
                this.cache.buff_unit_modifiers.enum = this.reader.parseBuffUnitModifiers()
                this.cache.weapon_modifier_ids.enum = this.reader.parseBuffWeaponModifiers()
                this.cache.planet_modifier_ids.enum = this.reader.parseBuffPlanetModifiers()
                this.cache.buff_unit_factory_modifiers.enum = this.reader.parseBuffUnitFactoryModifiers()
                this.cache.buff_empire_ids.enum = this.reader.parseBuffModifierIds()
            }

            if (entityName === 'unit_skin.entity_manifest') {
                this.cache.unit_skins.enum = this.reader.parseEntityManifest('unit_skin')
            }
            if (entityName === 'unit.entity_manifest') {
                this.cache.units.enum = this.reader.parseEntityManifest('unit')
            }
            if (entityName === 'buff.entity_manifest') {
                this.cache.buffs.enum = this.reader.parseEntityManifest('buff')
            }
            if (entityName === 'research_subject.entity_manifest') {
                this.cache.research_subjects.enum = this.reader.parseEntityManifest('research_subject')
            }
            if (entityName === 'npc_reward.entity_manifest') {
                this.cache.npc_rewards.enum = this.reader.parseEntityManifest('npc_reward')
            }
            if (entityName === 'formation.entity_manifest') {
                this.cache.formations.enum = this.reader.parseEntityManifest('formation')
            }
            if (entityName === 'action_data_source.entity_manifest') {
                this.cache.action_data_sources.enum = this.reader.parseEntityManifest('action_data_source')
            }
            if (entityName === 'player.entity_manifest') {
                this.cache.players.enum = this.reader.parseEntityManifest('player')
            }
            if (entityName === 'ability.entity_manifest') {
                this.cache.abilities.enum = this.reader.parseEntityManifest('ability')
            }
            if (entityName === 'weapon.entity_manifest') {
                this.cache.weapons.enum = this.reader.parseEntityManifest('weapon')
            }
            if (entityName === 'exotic.entity_manifest') {
                this.cache.exotic_entities.enum = this.reader.parseEntityManifest('exotic')
            }
        })

        this.watchDir('uniforms', (entityName) => {
            if (entityName === 'debris.uniforms') {
                this.cache.debris.enum = this.reader.parseDebrisUniform()
            }
            if (entityName === 'planet.uniforms') {
                this.cache.planets.enum = this.reader.parsePlanets()
            }
            if (entityName === 'exotic.uniforms') {
                this.cache.exotics.enum = this.reader.parseExotics()
            }
            if (entityName === 'unit_build.uniforms') {
                this.cache.build_kinds.enum = this.reader.parseUnitBuildKinds()
            }
            if (entityName === 'unit.uniforms') {
                this.cache.unit_group_names.enum = this.reader.parseUnitNames()
            }
            if (entityName === 'hud_skin.uniforms') {
                this.cache.unit_group_names.enum = this.reader.parseHudSkins()
            }
            if (entityName === 'player.uniforms') {
                this.cache.npc_tags.enum = this.reader.parseNpcTags()
            }
            if (entityName === 'main_view.uniforms') {
                this.cache.mainview_groups.enum = this.reader.parseMainviewGroups()
            }
            if (entityName === 'attack_target_type_group.uniforms') {
                this.cache.attack_target_types.enum = string()
                this.cache.attack_target_type_groups.enum = this.reader.parseAttackTargetTypeGroups()
            }
            if (entityName === 'unit_tag.uniforms') {
                this.cache.ship_tags.enum = this.reader.parseShipTags()
            }
            if (entityName === 'unit_mutation.uniforms') {
                this.cache.mutations.enum = this.reader.parseUnitMutations()
            }
            if (entityName === 'strikecraft.uniforms') {
                this.cache.strikecraft_kinds.enum = this.reader.parseStrikecraft()
            }
            if (entityName === 'weapon.uniforms') {
                this.cache.weapon_tags.enum = this.reader.parseWeaponTags()
            }
            if (entityName === 'research.uniforms') {
                this.cache.max_tier_count.enum = this.reader.parseResearchTierCount()
            }
            if (entityName === 'target_filter.uniforms') {
                this.cache.target_filters_uniforms.enum = this.reader.parseTargetFiltersUniform()
            }
            if (entityName === 'special_operation_unit.uniforms') {
                this.cache.special_operation_kinds.enum = this.reader.parseSpecialOperationUnitKinds()
            }
            if (entityName === 'random_skybox_filling.uniforms') {
                this.cache.random_skybox_fillings.enum = this.reader.parseRandomSkyboxFillings()
            }

            if (entityName === 'galaxy_generator.uniforms') {
                this.cache.fixture_fillings.enum = this.reader.parseGravityWellFixtureFillings()
                this.cache.random_fixture_fillings.enum = this.reader.parseGravityWellRandomFixtureFillings()
                this.cache.gravity_well_fillings.enum = this.reader.parseGravityWellFillings()
                this.cache.random_gravity_well_fillings.enum = this.reader.parseGravityWellRandomFillings()
                this.cache.gravity_wells.enum = [
                    ...this.reader.parseGravityWellFillings(),
                    ...this.reader.parseGravityWellRandomFixtureFillings(),
                    ...this.reader.parseGravityWellRandomFillings(),
                    ...this.reader.parseGravityWellFixtureFillings(),
                ]
                this.cache.moon_fillings.enum = this.reader.parseMoonFillings()
                this.cache.node_fillings.enum = this.reader.parseNodeFillings()
            }
        })

        this.watchDir('player_colors', (entityName) => {
            if (entityName?.endsWith('.player_color_group')) {
                this.cache.color_groups.enum = this.reader.parseColorGroups()
            }
        })
        this.watchDir('fonts', (entityName) => {
            if (entityName?.endsWith('.ttf')) {
                this.cache.ttf.enum = this.reader.parseFontsTtf()
            }
            if (entityName?.endsWith('.font')) {
                this.cache.fonts.enum = this.reader.parseFonts()
            }
        })
        this.watchDir('death_sequences', (entityName) => {
            if (entityName?.endsWith('.death_sequence')) {
                this.cache.death_sequences.enum = this.reader.parseDeathSequences()
            }
            if (entityName?.endsWith('.death_sequence_group')) {
                this.cache.death_sequence_groups.enum = this.reader.parseDeathSequenceGroups()
            }
        })
        this.watchDir('brushes', (entityName) => {
            if (entityName?.endsWith('.brush')) {
                this.cache.brushes.enum = this.reader.parseBrushes()
            }
        })
        this.watchDir('colors', (entityName) => {
            if (entityName === 'named_colors.named_colors') {
                this.cache.colors.enum = this.reader.parseColorGroups()
            }
        })
        this.watchDir('sounds', (entityName) => {
            if (entityName?.endsWith('.sound')) {
                this.cache.sounds.enum = this.reader.parseSounds('sound')
            }
            if (entityName?.endsWith('.ogg')) {
                this.cache.ogg.enum = this.reader.parseSounds('ogg')
            }
        })
    }
}

module.exports = async (modFolder) => {
    const cache = {}
    let textures, action_values

    const fw = new Filewatcher(modFolder, textures, action_values, cache)

    fw.watch()
    fw.watchRoot()

    return new Proxy(fw.getCacheStorage(), {
        get: function (target, prop) {
            if (prop in target) return target[prop]
            if (prop === 'then' || prop === 'toJSON') return
            Log.error('Trying to access an invalid cache property:', prop)
        },
    })
}
