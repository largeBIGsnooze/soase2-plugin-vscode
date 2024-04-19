const path = require('path')
const FileHandler = require('./data/file-handler')
const { Log } = require('./utils/logger')
const chokidar = require('chokidar')
const { enumerate } = require('./definitions/data_types')

module.exports = async (modFolder) => {
    const cache = {}
    const modCache = new FileHandler(modFolder)

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
                Log.info('Entity updated:', e)
                if (typeof callback === 'function') return callback(e)
            })
            .on('add', (e) => {
                if (entities.length === 0) return
                for (const entity of entities) {
                    entity.enum.push(basename(e))
                }
                Log.info('Entity changed:', e)
            })
            .on('unlink', (e) => {
                if (entities.length === 0) return
                for (const entity of entities) {
                    const name = basename(e)
                    const idx = entity.enum.findIndex((e) => e === name)
                    entity.enum.splice(idx, 1)
                }
                Log.info('Entity deleted:', e)
            })
    }

    cache.exotic_entities = enumerate({
        items: modCache.readEntities(['entities/*.exotic'], { readFile: false }).map((e) => e?.name),
    })
    cache.player_icons = enumerate({
        items: modCache.readPlayerIcons(),
    })
    cache.research_fields = (type) => enumerate({ items: modCache.readResearchFields(type) })
    cache.player_portraits = enumerate({
        items: modCache.readPlayerPortraits(),
    })
    cache.localisation = enumerate({
        items: modCache.readLocalisation(),
    })
    cache.research_subjects = enumerate({
        items: modCache.readResearchSubjects(),
    })
    cache.planet_components = enumerate({
        items: modCache.readComponents({
            component: 'planet_component',
        }),
    })
    cache.strikecraft_units = enumerate({
        items: modCache.readStrikecraftUnits(),
    })
    cache.ship_components = enumerate({
        items: modCache.readComponents({
            component: 'ship_component',
        }),
    })
    cache.unit_items = enumerate({
        items: modCache.readUnitItems(),
    })
    cache.planets = enumerate({
        items: modCache.readPlanets(),
    })
    cache.build_kinds = enumerate({
        items: modCache.readUnitBuildKinds(),
    })
    cache.color_groups = enumerate({ items: modCache.readColorGroups() })
    cache.exotics = enumerate({
        items: modCache.readExotics(),
    })
    cache.fleet_units = enumerate({ items: modCache.readFleetUnits() })
    cache.exhaust_trail_effects = enumerate({ items: modCache.readExhaustTrailEffects() })
    cache.gravity_well_props = enumerate({ items: modCache.readGravityWellProps() })
    cache.texture_animations = enumerate({ items: modCache.readTextureAnimations() })
    cache.unit_group_names = enumerate({ items: modCache.readUnitNames() })
    cache.skyboxes = enumerate({ items: modCache.readSkyboxes() })
    cache.units = enumerate({ items: modCache.readUnits() })
    cache.buffs = enumerate({ items: modCache.readBuffs() })
    cache.ttf = enumerate({ items: modCache.readFontsTtf() })
    cache.sounds = enumerate({ items: modCache.readSounds({ ext: 'sound' }) })
    cache.ogg = enumerate({ items: modCache.readSounds({ ext: 'ogg' }) })
    cache.textures = enumerate({ items: modCache.readTextures() })
    cache.particle_effects = enumerate({ items: modCache.readParticleEffects() })
    cache.effect_alias_bindings = enumerate({ items: modCache.readEffectAliasBindings() })
    cache.brushes = enumerate({ items: modCache.readBrushes() })
    cache.colors = enumerate({ items: modCache.readColors() })
    cache.fonts = enumerate({ items: modCache.readEntities(['fonts/*.font'])?.map((e) => e?.name) })
    cache.abilities = enumerate({ items: modCache.readAbilities() })
    cache.unit_skins = enumerate({ items: modCache.readUnitSkins() })
    cache.attack_target_types = enumerate({ items: modCache.readAttackTargetTypes() })
    cache.scenarios = enumerate({ items: modCache.readScenarios() })
    cache.shield_effects = enumerate({ items: modCache.readShieldEffects() })
    cache.attack_target_type_groups = enumerate({ items: modCache.readAttackTargetTypeGroups() })
    cache.ship_tags = enumerate({ items: modCache.readShipTags() })
    cache.fillings = (type) => enumerate({ items: modCache.readGravityWellFillings(type) })
    cache.npc_tags = enumerate({ items: modCache.readNpcTags() })
    cache.meshes = enumerate({ items: modCache.readMeshes() })
    cache.special_operation_kinds = enumerate({ items: modCache.readSpecialOperationUnitKinds() })
    cache.action_values = enumerate({ items: modCache.readActionValues() })
    cache.weapon_modifier_ids = enumerate({ items: modCache.readBuffWeaponModifiers() })
    cache.planet_modifier_ids = enumerate({ items: modCache.readBuffPlanetModifiers() })
    cache.npc_rewards = enumerate({ items: modCache.readNpcRewards() })
    cache.child_meshes = enumerate({ items: modCache.readChildMeshes() })
    cache.mesh_materials = enumerate({ items: modCache.readMeshMaterials() })
    cache.pip_groups = enumerate({ items: modCache.readPipGroups() })
    cache.mainview_groups = enumerate({ items: modCache.readMainviewGroups() })
    cache.death_sequence_groups = enumerate({ items: modCache.readDeathSequenceGroups() })
    cache.death_sequences = enumerate({ items: modCache.readDeathSequences() })
    cache.formations = enumerate({ items: modCache.readFormations() })
    cache.weapons = enumerate({ items: modCache.readWeapons() })
    cache.mutations = enumerate({ items: modCache.readUnitMutations() })
    cache.players = enumerate({ items: modCache.readPlayers() })
    cache.strikecraft_kinds = enumerate({ items: modCache.readStrikecraft() })
    cache.action_data_sources = enumerate({ items: modCache.readActionDataSources() })
    cache.target_filters = enumerate({ items: [...modCache.readTargetFilters().target_filters, ...modCache.readTargetFilters().uniform] })
    cache.buff_empire_ids = enumerate({ items: modCache.readBuffModifierIds() })
    cache.beam_effects = enumerate({ items: modCache.readBeamEffects() })
    cache.gui_actions = enumerate({ items: modCache.readAbilityGuiActions() })
    cache.target_filters_uniforms = enumerate({ items: modCache.readTargetFilters().uniform })
    cache.buff_actions = enumerate({ items: modCache.readBuffActions() })
    cache.debris = enumerate({ items: modCache.readDebrisUniform() })
    cache.float_variables = enumerate({ items: modCache.readFloatVariables() })
    cache.unit_variables = enumerate({ items: modCache.readUnitVariableIds() })
    cache.buff_unit_factory_modifiers = enumerate({ items: modCache.readBuffUnitFactoryModifiers() })
    cache.buff_unit_modifiers = enumerate({ items: modCache.readBuffUnitModifiers() })
    cache.weapon_tags = enumerate({ items: modCache.readWeaponTags() })
    cache.loot = enumerate({ items: modCache.readLoots() })
    cache.planet_files = enumerate({ items: modCache.readPlanetFiles() })
    cache.metal_asteroids = enumerate({ items: modCache.readMetalAsteroids() })
    cache.crystal_asteroids = enumerate({ items: modCache.readCrystalAsteroids() })
    cache.planet_bonuses = enumerate({ items: modCache.readPlanetBonuses() })
    cache.planet_artifacts = enumerate({ items: modCache.readPlanetArtifacts() })
    cache.modLogos = enumerate({ items: modCache.readModLogos() })

    setFileWatcher(
        {
            glob: ['localized_text/en.localized_text'],
            func: () => (cache.localisation.enum = modCache.readLocalisation()),
        },
        cache.localisation
    )
    setFileWatcher({ glob: ['effects/*.beam_effect'] }, cache.beam_effects)
    setFileWatcher({ glob: ['effects/*.shield_effect'] }, cache.shield_effects)
    setFileWatcher({ glob: ['scenarios/*.scenario'] }, cache.scenarios)
    setFileWatcher({ glob: ['gui/input_actions.gui'], func: () => (cache.gui_actions.enum = modCache.readAbilityGuiActions()) })
    setFileWatcher({
        glob: ['uniforms/target_filter.uniforms'],
        func: () => (cache.target_filters_uniforms.enum = modCache.readTargetFilters().uniform),
    })
    setFileWatcher({ glob: ['gui/hud_bookmarks_window.gui'] }, cache.pip_groups)
    setFileWatcher({ glob: ['effects/*.exhaust_trail_effect'] }, cache.exhaust_trail_effects)
    setFileWatcher({ glob: ['gravity_well_props/*.gravity_well_props'] }, cache.gravity_well_props)
    setFileWatcher({ glob: ['texture_animations/*.texture_animation'] }, cache.texture_animations)
    setFileWatcher({
        glob: ['entities/*.player'],
        func: () => {
            cache.research_fields = (type) => enumerate({ items: modCache.readResearchFields(type) })
            cache.unit_group_names.enum = modCache.readUnitNames()
        },
    })
    setFileWatcher({ glob: ['uniforms/unit.uniforms'], func: () => (cache.unit_group_names.enum = modCache.readUnitNames()) }, cache.unit_group_names)
    setFileWatcher({ glob: ['skyboxes/*.skybox'] }, cache.skyboxes)
    setFileWatcher({ glob: ['player_icons/*.player_icon'] }, cache.player_icons)
    setFileWatcher({ glob: ['uniforms/special_operation_unit.uniforms'], func: () => (cache.special_operation_kinds.enum = modCache.readSpecialOperationUnitKinds()) })
    setFileWatcher({ glob: ['player_portraits/*.player_portrait'] }, cache.player_portraits)
    setFileWatcher({ glob: ['uniforms/player.uniforms'], func: () => (cache.npc_tags.enum = modCache.readNpcTags()) })
    setFileWatcher({ glob: ['./*.png'] }, cache.modLogos)
    setFileWatcher({ glob: ['mesh_materials/*.mesh_material'] }, cache.mesh_materials)
    setFileWatcher({ glob: ['uniforms/main_view.uniforms'], func: () => (cache.mainview_groups.enum = modCache.readMainviewGroups()) })
    setFileWatcher({ glob: ['meshes/*.mesh'] }, cache.meshes)
    setFileWatcher({ glob: ['entities/*.exotic'] }, cache.exotic_entities)
    setFileWatcher({ glob: ['entities/*.research_subject'] }, cache.research_subjects)
    setFileWatcher(
        {
            glob: ['entities/*.unit_item'],
            func: () => {
                cache.planet_components.enum = modCache.readComponents({ component: 'planet_component' })
                cache.ship_components.enum = modCache.readComponents({ component: 'ship_component' })
                cache.unit_items = modCache.readUnitItems()
                cache.loot = modCache.readLoots()
                cache.planet_bonuses = modCache.readPlanetBonuses()
                cache.planet_artifacts = modCache.readPlanetArtifacts()
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
                cache.strikecraft_units.enum = modCache.readStrikecraftUnits()
                cache.metal_asteroids.enum = modCache.readMetalAsteroids()
                cache.crystal_asteroids.enum = modCache.readCrystalAsteroids()
                cache.fleet_units.enum = modCache.readFleetUnits()
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
                cache.unit_skins.enum = modCache.readUnitSkins()
                cache.effect_alias_bindings.enum = modCache.readEffectAliasBindings()
                cache.child_meshes.enum = modCache.readChildMeshes()
            },
        },
        cache.unit_skins,
        cache.effect_alias_bindings,
        cache.child_meshes
    )
    setFileWatcher({
        glob: ['entities/*.action_data_source'],
        func: () => {
            cache.target_filters = enumerate({ items: [...modCache.readTargetFilters().target_filters, ...modCache.readTargetFilters().uniform] })
            cache.action_values.enum = modCache.readActionValues()
            cache.float_variables.enum = modCache.readFloatVariables()
            cache.buff_actions.enum = modCache.readBuffActions()
            cache.unit_variables.enum = modCache.readUnitVariableIds()
            cache.buff_unit_modifiers.enum = modCache.readBuffUnitModifiers()
            cache.weapon_modifier_ids.enum = modCache.readBuffWeaponModifiers()
            cache.planet_modifier_ids.enum = modCache.readBuffPlanetModifiers()
            cache.buff_unit_factory_modifiers.enum = modCache.readBuffUnitFactoryModifiers()
            cache.buff_empire_ids.enum = modCache.readBuffModifierIds()
        },
    })
    setFileWatcher({ glob: ['uniforms/debris.uniforms'], func: () => (cache.debris.enum = modCache.readDebrisUniform()) })
    setFileWatcher({ glob: ['fonts/*.ttf'] }, cache.ttf)
    setFileWatcher({ glob: ['effects/*.particle_effect'] }, cache.particle_effects)
    setFileWatcher({ glob: ['death_sequences/*.death_sequence_group'] }, cache.death_sequence_groups)
    setFileWatcher({ glob: ['death_sequences/*.death_sequence'] }, cache.death_sequences)
    setFileWatcher({ glob: ['fonts/*.font'] }, cache.fonts)
    setFileWatcher({ glob: ['brushes/*.brushes'] }, cache.brushes)
    setFileWatcher({ glob: ['entities/*.planet'] }, cache.planet_files)
    setFileWatcher({ glob: ['entities/*.weapon'] }, cache.weapons)
    setFileWatcher({ glob: ['textures/*.png', 'textures/*.dds'] }, cache.textures)
    setFileWatcher({ glob: ['uniforms/planet.uniforms'], func: () => (cache.planets.enum = modCache.readPlanets()) })
    setFileWatcher({ glob: ['uniforms/unit_build.uniforms'], func: () => (cache.build_kinds.enum = modCache.readUnitBuildKinds()) })
    setFileWatcher({ glob: ['player_colors/*.player_color_group'] }, cache.color_groups)
    setFileWatcher({ glob: ['uniforms/exotic.uniforms'], func: () => (cache.exotics.enum = modCache.readExotics()) })
    setFileWatcher({ glob: ['entities/unit.entity_manifest'], func: () => (cache.units.enum = modCache.readUnits()) })
    setFileWatcher({ glob: ['entities/buff.entity_manifest'], func: () => (cache.buffs.enum = modCache.readBuffs()) })
    setFileWatcher({ glob: ['colors/named_colors.named_colors'], func: () => (cache.colors.enum = modCache.readColorGroups()) })
    setFileWatcher({ glob: ['sounds/*.sound'] }, cache.sounds)
    setFileWatcher({ glob: ['sounds/*.ogg'] }, cache.ogg)
    setFileWatcher({ glob: ['entities/ability.entity_manifest'], func: () => (cache.abilities.enum = modCache.readAbilities()) })
    setFileWatcher({
        glob: ['uniforms/galaxy_generator.uniforms'],
        func: () => {
            cache.fillings = (type) => enumerate({ items: modCache.readGravityWellFillings(type) })
        },
    })
    setFileWatcher({
        glob: ['uniforms/attack_target_type_group.uniforms'],
        func: () => {
            cache.attack_target_types.enum = modCache.readAttackTargetTypes()
            cache.attack_target_type_groups.enum = modCache.readAttackTargetTypeGroups()
        },
    })

    setFileWatcher({
        glob: ['uniforms/unit_tag.uniforms'],
        func: () => (cache.ship_tags.enum = modCache.readShipTags()),
    })
    setFileWatcher({
        glob: ['entities/npc_reward.entity_manifest'],
        func: () => (cache.npc_rewards.enum = modCache.readNpcRewards()),
    })
    setFileWatcher({ glob: ['entities/formation.entity_manifest'], func: () => (cache.formations.enum = modCache.readFormations()) })
    setFileWatcher({ glob: ['uniforms/unit_mutation.uniforms'], func: () => (cache.mutations.enum = modCache.readUnitMutations()) })
    setFileWatcher({ glob: ['entities/player.entity_manifest'], func: () => (cache.players.enum = modCache.readPlayers()) }, cache.players)
    setFileWatcher({ glob: ['uniforms/strikecraft.uniforms'], func: () => (cache.strikecraft_kinds.enum = modCache.readStrikecraft()) })
    setFileWatcher({ glob: ['entities/action_data_source.entity_manifest'], func: () => (cache.action_data_sources.enum = modCache.readActionDataSources()) })
    setFileWatcher({ glob: ['uniforms/weapon_tags.uniforms'], func: () => (cache.weapon_tags.enum = modCache.readWeaponTags()) })

    return cache
}
