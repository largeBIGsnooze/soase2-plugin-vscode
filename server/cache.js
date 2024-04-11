const path = require('path')
const FileHandler = require('./data/file-handler')
const { Log } = require('./utils/logger')
const chokidar = require('chokidar')
const { enumerate } = require('./definitions/data_types')

module.exports = async (modFolder) => {
    const cache = {}
    const modCache = new FileHandler(modFolder)

    const setFileWatcher = (folder, { subfolder: subfolder = 'entities' }, callback) => {
        return chokidar
            .watch(path.resolve(folder, subfolder), {
                persistent: true,
                ignorePermissionErrors: true,
                ignoreInitial: true,
                interval: 2000,
                depth: 5,
                ignored: '*.txt|*.dll',
                cwd: '.',
            })
            .on('all', (e) => callback(e))
            .on('error', (e) => Log.error(e))
    }

    cache.entities = enumerate({
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

    setFileWatcher(modFolder, { subfolder: 'gui/input_actions.gui' }, () => (cache.gui_actions = enumerate({ items: modCache.readAbilityGuiActions() })))
    setFileWatcher(modFolder, { subfolder: 'uniforms/target_filter.uniforms' }, () => (cache.target_filters_uniforms = enumerate({ items: modCache.readTargetFilters().uniform })))

    setFileWatcher(modFolder, { subfolder: 'gui/hud_bookmarks_window.gui' }, () => (cache.pip_groups = enumerate({ items: modCache.readPipGroups() })))

    setFileWatcher(modFolder, { subfolder: 'effects/*.exhaust_trail_effect' }, () => (cache.exhaust_trail_effects = enumerate({ items: modCache.readExhaustTrailEffects() })))

    setFileWatcher(modFolder, { subfolder: 'gravity_well_props/*.gravity_well_props' }, () => (cache.gravity_well_props = enumerate({ items: modCache.readGravityWellProps() })))
    setFileWatcher(modFolder, { subfolder: 'texture_animations/*.texture_animation' }, () => (cache.texture_animations = enumerate({ items: modCache.readTextureAnimations() })))
    setFileWatcher(modFolder, { subfolder: 'entities/*.player' }, () => {
        cache.unit_group_names = enumerate({ items: modCache.readUnitNames() })
        cache.research_fields = (type) => enumerate({ items: modCache.readResearchFields(type) })
    })
    setFileWatcher(modFolder, { subfolder: 'skyboxes/*.skybox' }, () => (cache.skyboxes = enumerate({ items: modCache.readSkyboxes() })))
    setFileWatcher(modFolder, { subfolder: 'player_icons/*.player_icon' }, () => {
        cache.player_icons = enumerate({
            items: modCache.readPlayerIcons(),
        })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/special_operation_unit.uniforms' }, () => {
        cache.special_operation_kinds = enumerate({
            items: modCache.readSpecialOperationUnitKinds(),
        })
    })
    setFileWatcher(modFolder, { subfolder: 'player_portraits/*.player_portrait' }, () => {
        cache.player_portraits = enumerate({
            items: modCache.readPlayerPortraits(),
        })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/player.uniforms' }, () => {
        cache.npc_tags = enumerate({
            items: modCache.readNpcTags(),
        })
    })
    setFileWatcher(modFolder, { subfolder: './*.png' }, () => (cache.modLogos = enumerate({ items: modCache.readModLogos() })))
    setFileWatcher(modFolder, { subfolder: 'mesh_materials/*.mesh_material' }, () => (cache.mesh_materials = enumerate({ items: modCache.readMeshMaterials() })))
    setFileWatcher(modFolder, { subfolder: 'uniforms/main_view.uniforms' }, () => (cache.mainview_groups = enumerate({ items: modCache.readMainviewGroups() })))
    setFileWatcher(modFolder, { subfolder: 'meshes/*.mesh' }, () => (cache.meshes = enumerate({ items: modCache.readMeshes() })))
    setFileWatcher(modFolder, { subfolder: 'localized_text/*.localized_text' }, () => {
        cache.localisation = enumerate({ items: modCache.readLocalisation() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/*' }, () => {
        cache.entities = enumerate({ items: modCache.readEntities(['entities/*'], { readFile: false })?.map((e) => e?.name) })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/*.research_subject' }, () => {
        cache.research_subjects = enumerate({ items: modCache.readResearchSubjects() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/*.unit_item' }, () => {
        cache.planet_components = enumerate({
            items: modCache.readComponents({
                component: 'planet_component',
            }),
        })
        cache.ship_components = enumerate({
            items: modCache.readComponents({
                component: 'ship_component',
            }),
        })
        cache.unit_items = enumerate({ items: modCache.readUnitItems() })
        cache.loot = enumerate({ items: modCache.readLoots() })
        cache.planet_bonuses = enumerate({ items: modCache.readPlanetBonuses() })
        cache.planet_artifacts = enumerate({ items: modCache.readPlanetArtifacts() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/*.unit' }, () => {
        cache.strikecraft_units = enumerate({ items: modCache.readStrikecraftUnits() })
        cache.metal_asteroids = enumerate({ items: modCache.readMetalAsteroids() })
        cache.crystal_asteroids = enumerate({ items: modCache.readCrystalAsteroids() })
        cache.fleet_units = enumerate({ items: modCache.readFleetUnits() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/*.unit_skin' }, () => {
        cache.unit_skins = enumerate({ items: modCache.readUnitSkins() })
        cache.effect_alias_bindings = enumerate({ items: modCache.readEffectAliasBindings() })
        cache.child_meshes = enumerate({ items: modCache.readChildMeshes() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/*.action_data_source' }, () => {
        cache.target_filters = enumerate({ items: modCache.readTargetFilters() })
        cache.action_values = enumerate({ items: modCache.readActionValues() })
        cache.float_variables = enumerate({ items: modCache.readFloatVariables() })
        cache.buff_actions = enumerate({ items: modCache.readBuffActions() })
        cache.unit_variables = enumerate({ items: modCache.readUnitVariableIds() })
        cache.buff_unit_modifiers = enumerate({ items: modCache.readBuffUnitModifiers() })
        cache.weapon_modifier_ids = enumerate({ items: modCache.readBuffWeaponModifiers() })
        cache.planet_modifier_ids = enumerate({ items: modCache.readBuffPlanetModifiers() })
        cache.buff_unit_factory_modifiers = enumerate({ items: modCache.readBuffUnitFactoryModifiers() })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/debris.uniforms' }, () => {
        cache.debris = enumerate({ items: modCache.readDebrisUniform() })
    })
    setFileWatcher(modFolder, {}, () => {
        cache.ttf = enumerate({ items: modCache.readFontsTtf() })
    })
    setFileWatcher(modFolder, { subfolder: 'effects/*.particle_effect' }, () => {
        cache.particle_effects = enumerate({ items: modCache.readParticleEffects() })
    })
    setFileWatcher(
        modFolder,
        {
            subfolder: 'death_sequences/*.death_sequence_group',
        },
        () => {
            cache.death_sequence_groups = enumerate({
                items: modCache.readDeathSequenceGroups(),
            })
        }
    )
    setFileWatcher(modFolder, { subfolder: 'death_sequences/*.death_sequence' }, () => {
        cache.death_sequences = enumerate({ items: modCache.readDeathSequences() })
    })
    setFileWatcher(modFolder, { subfolder: 'fonts/*.font' }, () => {
        cache.fonts = enumerate({ items: modCache.readEntities(['fonts/*.font'])?.map((e) => e?.name) })
    })
    setFileWatcher(modFolder, { subfolder: 'brushes/*.brushes' }, () => {
        cache.brushes = enumerate({ items: modCache.readBrushes() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/*.planet' }, () => {
        cache.planet_files = enumerate({ items: modCache.readPlanetFiles() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/*.weapon' }, () => {
        cache.weapons = enumerate({ items: modCache.readWeapons() })
    })
    setFileWatcher(modFolder, { subfolder: 'textures/*' }, () => {
        cache.textures = enumerate({ items: modCache.readTextures() })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/planet.uniforms' }, () => {
        cache.planets = enumerate({ items: modCache.readPlanets() })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/unit_build.uniforms' }, () => {
        cache.build_kinds = enumerate({ items: modCache.readUnitBuildKinds() })
    })
    setFileWatcher(modFolder, { subfolder: 'player_colors/*.player_color_group' }, () => {
        cache.color_groups = enumerate({ items: modCache.readColorGroups() })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/exotic.uniforms' }, () => {
        cache.exotics = enumerate({ items: modCache.readExotics() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/unit.entity_manifest' }, () => {
        cache.units = enumerate({ items: modCache.readUnits() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/buff.entity_manifest' }, () => {
        cache.buffs = enumerate({
            items: modCache.readBuffs(),
        })
    })
    setFileWatcher(modFolder, { subfolder: 'colors/named_colors.named_colors' }, () => {
        cache.colors = enumerate({ items: modCache.readColors() })
    })
    setFileWatcher(modFolder, { subfolder: 'sounds/*.sound' }, () => {
        cache.sounds = enumerate({
            items: modCache.readSounds({
                ext: 'sound',
            }),
        })
    })
    setFileWatcher(modFolder, { subfolder: 'sounds/*.ogg' }, () => {
        cache.ogg = enumerate({
            items: modCache.readSounds({
                ext: 'ogg',
            }),
        })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/ability.entity_manifest' }, () => {
        cache.abilities = enumerate({ items: modCache.readAbilities() })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/galaxy_generator.uniforms' }, () => {
        cache.fillings = (type) => enumerate({ items: modCache.readGravityWellFillings(type) })
    })
    setFileWatcher(
        modFolder,
        {
            subfolder: 'uniforms/attack_target_type_group.uniforms',
        },
        () => {
            cache.attack_target_types = enumerate({ items: modCache.readAttackTargetTypes() })
            cache.attack_target_type_groups = enumerate({ items: modCache.readAttackTargetTypeGroups() })
        }
    )
    setFileWatcher(modFolder, { subfolder: 'uniforms/unit_tag.uniforms' }, () => {
        cache.ship_tags = enumerate({ items: modCache.readShipTags() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/npc_reward.entity_manifest' }, () => {
        cache.npc_rewards = enumerate({ items: modCache.readNpcRewards() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/formation.entity_manifest' }, () => {
        cache.formations = enumerate({ items: modCache.readFormations() })
    })

    setFileWatcher(modFolder, { subfolder: 'uniforms/unit_mutation.uniforms' }, () => {
        cache.mutations = enumerate({ items: modCache.readUnitMutations() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/player.entity_manifest' }, () => {
        cache.players = enumerate({ items: modCache.readPlayers() })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/strikecraft.uniforms' }, () => {
        cache.strikecraft_kinds = enumerate({ items: modCache.readStrikecraft() })
    })
    setFileWatcher(modFolder, { subfolder: 'entities/action_data_source.entity_manifest' }, () => {
        cache.action_data_sources = enumerate({ items: modCache.readActionDataSources() })
    })
    setFileWatcher(modFolder, { subfolder: 'uniforms/weapon_tags.uniforms' }, () => {
        cache.weapon_tags = enumerate({
            items: modCache.readWeaponTags(),
        })
    })

    return cache
}
