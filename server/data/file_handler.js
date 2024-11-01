const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')
const { Log } = require('../utils/logger')
const { unit_modifier_types, unit_factory_modifier_types, weapon_modifier_types, planet_modifier_types } = require('../definitions/modifier_types')

class EntityParser {
    constructor(gameFolder) {
        this.gameFolder = gameFolder
    }

    read(glob, { read: read = true, directories: directories = false } = {}) {
        return fg
            .globSync(glob, {
                dot: true,
                cwd: this.gameFolder,
                onlyDirectories: directories,
            })
            .map((entity) => {
                try {
                    const filePath = path.resolve(this.gameFolder, entity)

                    const baseName = path.basename(entity, path.extname(entity)).toLowerCase()
                    const ext = path.extname(entity).substring(1).toLowerCase()

                    if (directories) {
                        return {
                            basename: baseName,
                            uri: filePath,
                        }
                    } else {
                        return {
                            uri: filePath,
                            basename: baseName,
                            ext: ext,
                            filename: `${baseName}.${ext}`,
                            content: read ? this.parseContents(fs.readFileSync(filePath, 'utf-8')) : null,
                        }
                    }
                } catch (err) {
                    Log.error('Error during reading:', err)
                }
            })
            .filter(Boolean)
    }

    parseContents(content) {
        try {
            return JSON.parse(content)
        } catch (e) {
            return ['']
        }
    }

    parseEntity(entity) {
        const raw = this.read(entity)
        return raw[0]?.content
    }

    parseEntityManifest(manifest) {
        const content = this.parseEntity([`entities/${manifest}.entity_manifest`])
        if (content && content.ids) return content.ids.map((e) => e)
        return ['']
    }

    parseUniform(name) {
        const uniform = this.read([`uniforms/${name}.uniforms`])[0]
        if (uniform) return uniform.content
        return ['']
    }

    parseHudSkins(hud_skins = this.read(['uniforms/hud_skin.uniforms'])) {
        if (hud_skins[0]?.content) return hud_skins[0].content?.hud_skin_names
        return ['']
    }

    parseTextures() {
        const textures = this.read(['textures/*.dds', 'textures/*.png'], { read: false })

        return [...textures.map((e) => e.basename), ...textures.map((e) => e.filename), '']
    }
    parseFontsTtf() {
        return this.read(['fonts/*.ttf'], {
            read: false,
        }).map((e) => e.basename)
    }
    parseMainviewGroups(groups = this.parseUniform('main_view').unit_icons) {
        if (groups && groups.groups) return groups.groups.map((e) => e.group)

        return ['']
    }

    parseMeshMaterials(
        mesh_materials = this.read(['mesh_materials/*.mesh_material'], {
            read: false,
        }).map((e) => e.basename)
    ) {
        if (mesh_materials) return mesh_materials
        return ['']
    }
    parseChildMeshes() {
        const child_meshes_set = new Set()
        const child_meshes = this.read(['entities/*.unit_skin'])

        if (child_meshes && child_meshes.length > 0) {
            for (const mesh of child_meshes) {
                if (!mesh.content) continue
                if (mesh.content.hasOwnProperty('skin_stages')) {
                    mesh.content.skin_stages.flatMap((y) => {
                        if (!y.hasOwnProperty('child_mesh_alias_bindings')) return
                        y?.child_mesh_alias_bindings?.map?.map((y) => child_meshes_set.add(y.mesh_alias_name))
                    })
                }
            }
        }
        return Array.from(child_meshes_set)
    }
    parseParticleEffects() {
        return this.read(['effects/*.particle_effect'], {
            read: false,
        }).map((e) => e.basename)
    }
    parseEffectAliasBindings() {
        const effect_alias_binding_set = new Set()
        this.read(['entities/*.action_data_source']).map((e) =>
            e.content?.effect_alias_bindings?.map((y) => (y ? effect_alias_binding_set.add(y.alias_name) : ''))
        )
        return [...effect_alias_binding_set, ...this.parseUnitSkinEffects()]
    }
    parseUnitSkinEffects() {
        const unit_skin_effect_set = new Set()
        this.read(['entities/*.unit_skin']).map((e) =>
            e.content?.skin_stages?.flatMap((y) => y?.effects?.effect_alias_bindings?.map((e) => (y ? unit_skin_effect_set.add(e.alias_name) : '')))
        )
        return Array.from(unit_skin_effect_set)
    }
    parseMeshes() {
        return this.read(['meshes/*.mesh'], {
            read: false,
        }).map((e) => e.basename)
    }
    parseLocalisation() {
        const loc = this.read(['localized_text/en.localized_text'])[0]?.content
        if (loc) return [...Object.keys(loc), '']
        return ['']
    }
    parseBuffModifierIds() {
        return this.read(['entities/*.action_data_source'])
            .flatMap((e) => {
                if (!e.content.hasOwnProperty('buff_empire_modifiers')) return
                return e.content.buff_empire_modifiers?.map((e) => e?.buff_empire_modifier_id)
            })
            .filter((e) => e !== undefined)
    }

    parseComponents(component) {
        return Array.from(
            new Set(
                this.read(['entities/*.unit_item'])
                    .filter((e) => e.content?.item_type === component)
                    .map((e) => e.basename)
            )
        )
    }
    parseStrikecraft(strikecrafts = this.parseUniform('strikecraft').strikecraft_kinds) {
        if (strikecrafts) return strikecrafts.map((e) => e.name)
        return ['']
    }

    parseStrikecraftUnits() {
        return this.read(['entities/*.unit'])
            .filter((e) => e.content?.strikecraft)
            .map((e) => e.basename)
    }
    parseBuffAgentUnit() {
        return this.read(['entities/*.unit'])
            .filter((e) => e.content?.is_buff_agent && e.content.is_buff_agent == true)
            .map((e) => e.basename)
    }
    parseDeathSequences(death_sequences = this.read(['death_sequences/*.death_sequence']).map((e) => e.basename)) {
        if (death_sequences) return death_sequences
        return ['']
    }
    parseDeathSequenceGroups() {
        return this.read(['death_sequences/*.death_sequence_group']).map((e) => e.basename)
    }

    parseFonts() {
        return this.read(['fonts/*.font'], {
            read: false,
        }).map((e) => e.basename)
    }
    parseColorGroups() {
        return this.read(['player_colors/*.player_color_group'], {
            read: false,
        }).map((e) => e.basename)
    }
    parseGravityWellUnit() {
        return this.read(['entities/*.unit'])
            .filter((e) => e.content?.gravity_well)
            .map((e) => e.basename)
    }
    parseUnitBuildGroupIds(unit_build_groups = this.read(['entities/*.player'])) {
        if (unit_build_groups)
            return Array.from([
                ...new Set(
                    unit_build_groups
                        .filter((e) => e.content.unit_build_groups)
                        .flatMap((e) => this.parseEntity([`entities/${e.filename}`]).unit_build_groups.map((e) => e.id))
                ),
                'civilian',
                'starbase',
                'structure',
                'military',
            ])
        return ['']
    }

    parseUnitItemBuildGroupIds() {
        try {
            return Array.from(
                new Set([
                    ...this.read(['entities/*.player'])
                        .filter((e) => e.content.ship_component_build_groups)
                        .flatMap((e) => this.parseEntity([`entities/${e.filename}`]).ship_component_build_groups.map((e) => e.id)),
                    ...this.read(['entities/*.player'])
                        .filter((e) => e.content.planet_component_build_groups)
                        .flatMap((e) => this.parseEntity(`entities/${e.filename}`).planet_component_build_groups)
                        .map((e) => e.id),
                ])
            )
        } catch {
            return ['']
        }
    }
    // TODO: Find out target types
    parseAttackTargetTypes() {
        return ['']
    }
    parseWeaponTags(tags = this.parseUniform('weapon')) {
        if (tags && tags.weapon_tags) return tags.weapon_tags.map((e) => e.name)
        return ['']
    }
    parseNpcTags(tags = this.parseUniform('player')) {
        if (tags && tags.npc) return tags.npc.npc_tags.map((e) => e.name)
        return ['']
    }
    parseTargetFilters() {
        return this.read([`entities/*.action_data_source`])
            .flatMap((e) => e.content.target_filters?.map((y) => y.target_filter_id))
            .filter((e) => e !== undefined)
    }

    parseTargetFiltersUniform(uniform = this.parseUniform('target_filter').common_target_filters) {
        if (uniform) return uniform.map((e) => e.target_filter_id)
        return ['']
    }
    parseBuffActions() {
        return this.read(['entities/*.action_data_source'])
            .filter((e) => e.content.buff_actions)
            .map((e) => e.content.buff_actions.flatMap((y) => y.action_id))
            .flat()
    }

    parseFloatVariables(float_variables = this.read(['entities/*.action_data_source'])) {
        if (float_variables)
            return float_variables
                .filter((e) => e.content.per_buff_memory_declaration)
                .filter((e) => e.content.per_buff_memory_declaration.float_variable_ids)
                .map((e) => e.content.per_buff_memory_declaration.float_variable_ids)
                .flat()
        return ['']
    }
    parseRaceNames(names = this.parseUniform('player_race').races) {
        if (names) return names.map((e) => e.name)

        return ['']
    }
    parseModImages() {
        const logos = this.read(['*'], { read: false }).filter((e) => e?.filename.endsWith('.png'))
        return [...logos.map((e) => e.filename), '']
    }

    parseBuffUnitModifiers() {
        return [
            ...this.read(['entities/*.action_data_source'])
                .filter((e) => e.content.buff_unit_modifiers)
                .map((e) => e.content.buff_unit_modifiers.flatMap((y) => y.buff_unit_modifier_id))
                .flat(),
            ...unit_modifier_types(),
        ]
    }
    parseBuffUnitFactoryModifiers() {
        return [
            ...this.read(['entities/*.action_data_source'])
                .filter((e) => e.content.buff_unit_factory_modifiers)
                .map((e) => e.content.buff_unit_factory_modifiers.flatMap((y) => y.buff_unit_factory_modifier_id))
                .flat(),
            ...unit_factory_modifier_types(),
        ]
    }
    parseBuffWeaponModifiers() {
        return [
            ...this.read(['entities/*.action_data_source'])
                .filter((e) => e.content.buff_weapon_modifiers)
                .map((e) => e.content.buff_weapon_modifiers.flatMap((y) => y.buff_weapon_modifier_id))
                .flat(),
            ...weapon_modifier_types(),
        ]
    }
    parseBuffPlanetModifiers() {
        return [
            ...this.read(['entities/*.action_data_source'])
                .filter((e) => e.content.buff_planet_modifiers)
                .map((e) => e.content.buff_planet_modifiers.flatMap((y) => y.buff_planet_modifier_id))
                .flat(),
            ...planet_modifier_types(),
        ]
    }

    parseResearchTierCount(tiers = this.parseUniform('research')) {
        if (tiers && tiers.max_tier_count)
            return [
                ...Array.from({
                    length: tiers.max_tier_count + 1,
                }).keys(),
            ]
        return ['']
    }

    parseDebrisUniform(debris = this.parseUniform('debris').groups) {
        if (debris) return debris.map((e) => e[0])
        return ['']
    }

    parseActionValues(
        common_action_values = this.parseUniform('action').common_action_values,
        action_values = this.read([`entities/*.action_data_source`])
    ) {
        const action_values_set = new Set()
        try {
            action_values.map((e) => {
                if (Array.isArray(e.content.action_values)) {
                    e.content.action_values.map((e) => action_values_set.add(e?.action_value_id))
                }
            })
            common_action_values.map((e) => action_values_set.add(e?.action_value_id))
        } catch {}

        return Array.from(action_values_set)
    }

    parseFleetUnits() {
        return this.read(['entities/*.unit'])
            .filter((e) => e.content.hasOwnProperty('fleet'))
            .map((e) => e.basename)
    }

    parseResearchFields() {
        const fields = []
        try {
            for (const player of this.read(['entities/*.player'])) {
                if (player?.content?.research) {
                    player.content.research.research_domains.civilian.research_fields.map((e) => fields.push(e?.id))
                    player.content.research.research_domains.military.research_fields.map((e) => fields.push(e?.id))
                }
            }
        } catch {}
        return [...fields, 'civilian_temp', 'military_temp']
    }

    parsePhaseLaneUnit() {
        return this.read(['entities/*.unit'])
            .filter((e) => e.content.hasOwnProperty('phase_lane'))
            .map((e) => e.basename)
    }
    parseRallyPointUnit() {
        return this.read(['entities/*.unit'])
            .filter((e) => e.content.hasOwnProperty('rally_point'))
            .map((e) => e.basename)
    }
    parseUnitItems() {
        return this.read(['entities/*.unit_item']).map((e) => e.basename)
    }

    parsePlanets(planets = this.parseUniform('planet').planet_types) {
        if (planets) return planets.map((e) => e.name)
        return ['']
    }

    parseUserInterfaceSounds(interfaceSounds = this.read(['entities/*.player']).map((e) => e.content)) {
        return interfaceSounds.flatMap((e) => (e.sounds && e.sounds.user_interface_sounds ? Object.keys(e.sounds.user_interface_sounds) : ['']))
    }

    parseBeamEffects() {
        return this.read(['effects/*.beam_effect']).map((e) => e.basename)
    }

    parsePlanetFiles() {
        return this.read(['entities/*_planet.unit']).map((e) => e.basename)
    }
    parsePlanetBonuses() {
        return this.read(['entities/*.unit_item'])
            .filter((e) => e.content.item_type === 'planet_bonus')
            .map((e) => e.basename)
    }
    parsePlanetArtifacts() {
        return this.read(['entities/*.unit_item'])
            .filter((e) => e.content.is_artifact === true)
            .map((e) => e.basename)
    }

    parseSounds(ext) {
        return this.read([`sounds/*.${ext}`], {
            read: false,
        }).map((e) => e.basename)
    }

    parseBrushes() {
        return [
            ...this.read(['brushes/*.brush'], {
                read: false,
            }).map((e) => e.basename),
            '',
        ]
    }

    parseMetalAsteroids(asteroids = this.read(['entities/*.unit']).filter((e) => e.content.asteroid?.asset_type === 'metal')) {
        if (asteroids) return asteroids.map((e) => e.basename)
        return ['']
    }
    parseCrystalAsteroids(asteroids = this.read(['entities/*.unit']).filter((e) => e.content.asteroid?.asset_type === 'crystal')) {
        if (asteroids) return asteroids.map((e) => e.basename)
        return ['']
    }
    parseLoots() {
        return this.read(['entities/*_loot*.unit']).map((e) => e.basename)
    }

    parseShieldEffects() {
        return this.read(['effects/*.shield_effect']).map((e) => e.basename)
    }

    parseShipTags(tags = this.parseUniform('unit_tag')) {
        const vanilla_tags = ['planet', 'torpedo', 'star', 'buff_agent', 'asteroid', 'loot', 'debris', 'gravity_well', 'phase_lane', 'cannon_shell']
        if (tags && tags.unit_tags) return Array.from(new Set([...tags.unit_tags.map((e) => e.name), ...vanilla_tags]))

        return vanilla_tags
    }

    parseUnitMutations(mutations = this.parseUniform('unit_mutation').mutations) {
        if (mutations) return mutations.map((e) => e.name)
        return ['']
    }

    parseUnitVariableIds(unit_variables = this.read(['entities/*.action_data_source'])) {
        if (unit_variables) {
            return unit_variables
                .filter((e) => e.content.per_buff_memory_declaration?.unit_variable_ids)
                .flatMap((e) => e.content.per_buff_memory_declaration.unit_variable_ids)
        }

        return ['']
    }

    parseUnitBuildKinds(kinds = this.parseUniform('unit_build').build_kinds) {
        if (kinds) return kinds.map((e) => e.name)
        return ['']
    }

    parseExotics(exotics = this.parseUniform('exotic').type_datas) {
        if (exotics) return exotics.map((e) => e.name)
        return ['']
    }

    parseScenarios() {
        return this.read(['scenarios/*.scenario'], { read: false }).map((e) => e.basename)
    }
    parseSpecialOperationUnitKinds(unit_kinds = this.parseUniform('special_operation_unit')) {
        if (unit_kinds && unit_kinds.special_operation_unit_kinds) {
            return unit_kinds.special_operation_unit_kinds.map((e) => e.name)
        }
        return ['']
    }

    parseAttackTargetTypeGroups(groups = this.parseUniform('attack_target_type_group')) {
        if (groups && groups.attack_target_type_groups) {
            return groups.attack_target_type_groups.map((e) => e.unit_attack_target_type_group_id)
        }
        return ['']
    }

    parsePlayerIcons() {
        return this.read(['player_icons/*.player_icon'], {
            read: false,
        }).map((e) => e.basename)
    }

    parsePlayerPortraits() {
        return this.read(['player_portraits/*.player_portrait'], {
            read: false,
        }).map((e) => e.basename)
    }

    parseExhaustTrailEffects(
        effects = this.read(['effects/*.exhaust_trail_effect'], {
            read: false,
        })
    ) {
        if (effects) {
            return effects.map((e) => e.basename)
        }
        return ['']
    }

    parsePipGroups(pips = this.read(['gui/hud_bookmarks_window.gui'])) {
        if (pips) {
            return pips.flatMap((e) => {
                if (e.content.bookmark_window_definition && e.content.bookmark_window_definition.pip_types) {
                    return Object.keys(e.content.bookmark_window_definition.pip_types)
                }
            })
        }
        return ['']
    }

    parseUnitNames() {
        try {
            const unit_names_list = new Set()

            const unit_names = this.read(['entities/*.player'])
            const uniform_unit_names = this.parseUniform('unit')

            if (unit_names) {
                unit_names.map((e) => {
                    if (e.content.hasOwnProperty('unit_names') && Array.isArray(e.content.unit_names)) {
                        e.content.unit_names.map((e) => {
                            unit_names_list.add(e?.group_name)
                        })
                    }
                })
            }

            if (uniform_unit_names && uniform_unit_names.unit_names) {
                uniform_unit_names.unit_names.map((e) => {
                    unit_names_list.add(e?.group_name)
                })
            }
            return Array.from([...unit_names_list, 'loot', 'ship_loot'])
        } catch {
            return ['']
        }
    }

    parseNodeFillings(fillings = this.parseUniform('galaxy_generator')) {
        if (fillings && fillings.fillings && fillings.fillings.node_fillings) {
            return fillings.fillings.node_fillings.map((e) => e?.name)
        }
        return ['']
    }
    parseMoonFillings(fillings = this.parseUniform('galaxy_generator')) {
        if (fillings && fillings.fillings && fillings.fillings.moon_fillings) {
            return fillings.fillings.moon_fillings.map((e) => e?.name)
        }
        return ['']
    }

    parseRandomSkyboxFillings(fillings = this.parseUniform('random_skybox_filling')) {
        if (fillings && fillings.random_skybox_fillings) {
            return fillings.random_skybox_fillings?.map((e) => e?.name)
        }
        return ['']
    }
    parseGravityWellFixtureFillings(fillings = this.parseUniform('galaxy_generator')) {
        if (fillings && fillings.fillings && fillings.fillings.fixture_fillings) {
            return fillings.fillings.fixture_fillings.map((e) => e.name)
        }
        return ['']
    }
    parseGravityWellRandomFixtureFillings(fillings = this.parseUniform('galaxy_generator')) {
        if (fillings && fillings.fillings && fillings.fillings.random_fixture_fillings) {
            return fillings.fillings.random_fixture_fillings.map((e) => e?.name)
        }
        return ['']
    }
    parseGravityWellFillings(fillings = this.parseUniform('galaxy_generator')) {
        if (fillings && fillings.fillings && fillings.fillings.gravity_well_fillings) {
            return this.parseUniform('galaxy_generator').fillings.gravity_well_fillings.map((e) => e?.name)
        }
        return ['']
    }
    parseGravityWellRandomFillings(fillings = this.parseUniform('galaxy_generator')) {
        if (fillings && fillings.fillings && fillings.fillings.random_gravity_well_fillings) {
            return fillings.fillings?.random_gravity_well_fillings.map((e) => e?.name)
        }
        return ['']
    }

    parseGravityWellProps() {
        try {
            return this.read(['gravity_well_props/*.gravity_well_props'], {
                read: false,
            }).map((e) => e.basename)
        } catch {
            return ['']
        }
    }

    parseTextureAnimations() {
        return this.read(['texture_animations/*.texture_animation'], {
            read: false,
        }).map((e) => e.basename)
    }
    parseSkyboxes() {
        return this.read(['skyboxes/*'], { read: false }).map((e) => e.basename)
    }
    parseColors() {
        return this.read(['colors/named_colors.named_colors'])
            .filter((e) => e.content.named_colors)
            .flatMap((e) => e.content.named_colors.map((y) => y.id))
    }
}

module.exports = {
    EntityParser,
}
