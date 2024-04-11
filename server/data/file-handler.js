const fs = require('fs')
const path = require('path')
const { Log } = require('../utils/logger')
const { planet_modifier_types, weapon_modifier_types, unit_modifier_types, unit_factory_modifier_types } = require('../definitions/modifier_types')
const fg = require('fast-glob')

module.exports = class FileHandler {
    constructor(gameInstallationFolder) {
        this.gameInstallationFolder = gameInstallationFolder
    }

    readEntities(globPattern, { readFile: readFile = true } = {}) {
        return fg
            .globSync(globPattern, { dot: true, cwd: this.gameInstallationFolder })
            .map((entity) => {
                try {
                    const filePath = path.resolve(this.gameInstallationFolder, entity)
                    const name = path.basename(entity, path.extname(entity)).toLowerCase()
                    const ext = path.extname(entity).substring(1).toLowerCase()
                    return {
                        entityUri: filePath,
                        name: name,
                        ext: ext,
                        basename: `${name}.${ext}`,
                        content: readFile ? fs.readFileSync(filePath, 'utf-8') : '',
                    }
                } catch (err) {
                    Log.error('Error during reading entities: ', err)
                }
            })
            .filter((e) => e !== undefined)
    }

    readEntityManifest(manifest) {
        try {
            return [...JSON.parse(this.readEntities([`entities/${manifest}.entity_manifest`])[0]?.content)?.ids?.map((e) => e), '']
        } catch (e) {
            return ''
        }
    }

    readEntity(file) {
        try {
            return this.readEntities(file)[0]?.content
        } catch (e) {
            return ''
        }
    }

    readUniform(file, name, callback) {
        try {
            const uniform = JSON.parse(fs.readFileSync(path.resolve(this.gameInstallationFolder, 'uniforms', `${file}.uniforms`)))
            if (typeof callback === 'function') {
                return callback(uniform[name])
            } else return uniform[name].map((e) => e)
        } catch (e) {
            return ''
        }
    }

    readTextures() {
        try {
            const textures = this.readEntities(['textures/*'], { readFile: false })
            return [...textures.map((e) => e?.name), ...textures.map((e) => e?.basename), ...this.readEntities(['brushes/*.brush'], { readFile: false }).map((e) => e?.name), '']
        } catch (e) {
            return ''
        }
    }

    readFontsTtf() {
        try {
            return this.readEntities(['fonts/*.ttf'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    *readAbilityGuiActions() {
        try {
            const gui_actions = JSON.parse(this.readEntity(['gui/input_actions.gui']))
            for (const action of Object.keys(gui_actions)) {
                if (action.startsWith('toggle')) yield action
            }
        } catch (e) {
            return ''
        }
    }

    readMainviewGroups() {
        try {
            return this.readUniform('main_view', 'unit_icons', (e) => e?.groups?.map((e) => e?.group))
        } catch (e) {
            return ''
        }
    }

    readMeshMaterials() {
        try {
            return this.readEntities(['mesh_materials/*.mesh_material']).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readChildMeshes() {
        const child_meshes_list = new Set()
        try {
            const child_meshes = this.readEntities(['entities/*.unit_skin'])

            if (child_meshes && child_meshes.length > 0) {
                child_meshes.map((e) => JSON.parse(e.content)?.skin_stages?.flatMap((y) => y?.child_mesh_alias_bindings?.map?.map((e) => child_meshes_list.add(e[0])))).flat()
            }
            return child_meshes_list
        } catch (e) {
            return ''
        }
    }
    // this.readEntities(['entities/*.unit_skin'])
    //             .map((e) => JSON.parse(e.content)?.skin_stages?.flatMap((y) => y?.effects?.effect_alias_bindings?.map((e) => e[0])))
    //             .flat()
    //             .filter((e) => e !== undefined)

    readParticleEffects() {
        try {
            return [...this.readEntities(['effects/*.particle_effect'], { readFile: false }).map((e) => e?.name), ...this.readEffectAliasBindings()]
        } catch (e) {
            return ''
        }
    }

    readMeshes() {
        try {
            return this.readEntities(['meshes/*.mesh'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readLocalisation() {
        try {
            const loc = this.readEntity(['localized_text/en.localized_text'])
            if (JSON.parse(loc)) return [...Object.keys(JSON.parse(loc)), '']
        } catch (e) {
            return ''
        }
    }

    readComponents({ component: component }) {
        try {
            return new Set(
                this.readEntities(['entities/*.unit_item'])
                    .filter((e) => JSON.parse(e.content)?.item_type === component)
                    .map((e) => e?.name)
            )
        } catch (e) {
            return ''
        }
    }

    readStrikecraft() {
        try {
            return this.readUniform('strikecraft', 'strikecraft_kinds').map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readStrikecraftUnits() {
        try {
            return this.readEntities(['entities/*.unit'])
                .filter((e) => JSON.parse(e.content).hasOwnProperty('strikecraft'))
                .map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readColorGroups() {
        try {
            return this.readEntities(['player_colors/*.player_color_group'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readBuffAgentUnit() {
        try {
            return this.readEntities(['entities/*.unit'])
                .filter((e) => JSON.parse(e.content).hasOwnProperty('is_buff_agent') && JSON.parse(e.content).is_buff_agent == true)
                .map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readDeathSequences() {
        try {
            return this.readEntities(['death_sequences/*.death_sequence']).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readDeathSequenceGroups() {
        try {
            return this.readEntities(['death_sequences/*.death_sequence_group']).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readGravityWellUnit() {
        try {
            return this.readEntities(['entities/*.unit'])
                .filter((e) => JSON.parse(e.content).hasOwnProperty('gravity_well'))
                .map((e) => e.name)
        } catch (e) {
            return ''
        }
    }

    // TODO: Find out target types
    readAttackTargetTypes() {
        try {
            return new Set(
                this.readUniform('attack_target_type_group', 'attack_target_type_groups')
                    .map((e) => e?.unit_attack_target_type_group)
                    .flatMap((y) => y?.types.map((g) => g))
            )
        } catch (e) {
            return ''
        }
    }

    readWeapons() {
        try {
            return this.readEntities(['entities/*.weapon']).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readWeaponTags() {
        try {
            return this.readUniform('weapon', 'weapon_tags').map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readActionDataSources() {
        try {
            return this.readEntityManifest('action_data_source')
        } catch (e) {
            return ''
        }
    }

    readUnitSkins() {
        try {
            return this.readEntityManifest('unit_skin')
        } catch (e) {
            return ''
        }
    }

    readTargetFilters() {
        try {
            return {
                target_filters: this.readEntities(['entities/*.action_data_source'])
                    .map((e) => JSON.parse(e.content)?.target_filters?.flatMap((y) => y?.target_filter_id))
                    .flat(),
                uniform: this.readUniform('target_filter', 'common_target_filters').map((e) => e?.target_filter_id),
            }
        } catch (e) {
            return { target_filters: [], uniform: [] }
        }
    }

    readBuffActions() {
        try {
            return this.readEntities(['entities/*.action_data_source'])
                .map((e) => JSON.parse(e.content)?.buff_actions?.flatMap((e) => e?.action_id))
                .flat()
                .filter((e) => e !== undefined)
        } catch (e) {
            return ''
        }
    }

    readFloatVariables() {
        try {
            return this.readEntities(['entities/*.action_data_source'])
                .map((e) => JSON.parse(e.content)?.per_buff_memory_declaration?.float_variable_ids)
                .flat()
                .filter((e) => e !== undefined)
        } catch (e) {
            return ''
        }
    }

    readUnitSkinEffects() {
        try {
            return new Set(
                this.readEntities(['entities/*.unit_skin'])
                    .map((e) => JSON.parse(e.content)?.skin_stages?.flatMap((y) => y?.effects?.effect_alias_bindings?.map((e) => e[0])))
                    .flat()
            )
        } catch (e) {
            return ''
        }
    }

    readEffectAliasBindings() {
        try {
            return [
                ...this.readUnitSkinEffects(),
                ...new Set(
                    Array.from(
                        this.readEntities(['entities/*.action_data_source'])
                            .map((e) => JSON.parse(e.content)?.effect_alias_bindings?.map((y) => y[0]))
                            .flat()
                            .filter((e) => e !== undefined)
                    )
                ),
            ]
        } catch (e) {
            return ''
        }
    }

    readRaceNames() {
        try {
            return this.readUniform('player', 'races').map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readModLogos() {
        try {
            const logos = this.readEntities(['./*.png'], { readFile: false }).map((e) => e?.basename)
            return [...logos, '']
        } catch (e) {
            return ''
        }
    }

    readBuffUnitModifiers() {
        try {
            return [
                ...this.readEntities(['entities/*.action_data_source'])
                    .map((e) => JSON.parse(e.content)?.buff_unit_modifiers?.flatMap((y) => y?.buff_unit_modifier_id))
                    .flat()
                    .filter((e) => e !== undefined),
                ...unit_modifier_types(),
            ]
        } catch (e) {
            return ''
        }
    }

    readBuffUnitFactoryModifiers() {
        try {
            return [
                ...this.readEntities(['entities/*.action_data_source'])
                    .map((e) => JSON.parse(e.content)?.buff_unit_factory_modifiers?.flatMap((y) => y?.buff_unit_factory_modifier_id))
                    .flat(),
                ...unit_factory_modifier_types(),
            ]
        } catch (e) {
            return ''
        }
    }

    readBuffWeaponModifiers() {
        try {
            return [
                ...this.readEntities(['entities/*.action_data_source'])
                    .map((e) => JSON.parse(e.content)?.buff_weapon_modifiers?.flatMap((y) => y?.buff_weapon_modifier_id))
                    .flat()
                    .filter((e) => e !== undefined),
                ...weapon_modifier_types(),
            ]
        } catch (e) {
            return ''
        }
    }

    readBuffPlanetModifiers() {
        try {
            return [
                ...this.readEntities(['entities/*.action_data_source'])
                    .map((e) => JSON.parse(e.content)?.buff_planet_modifiers?.flatMap((y) => y?.buff_planet_modifier_id))
                    .flat()
                    .filter((e) => e !== undefined),
                ...planet_modifier_types(),
            ]
        } catch (e) {
            return ''
        }
    }

    readDebrisUniform() {
        try {
            return this.readUniform('debris', 'groups').map((e) => e[0])
        } catch (e) {
            return ''
        }
    }

    readActionValues() {
        const action_values_list = new Set()
        try {
            const action_values = this.readEntities(['entities/*.action_data_source'])
            const uniforms_action_values = this.readUniform('action', 'common_action_values')

            if (action_values && action_values.length > 0) {
                action_values.map((e) => JSON.parse(e.content)?.action_values?.flatMap((y) => action_values_list.add(y?.action_value_id)))
            }

            if (uniforms_action_values && uniforms_action_values.length > 0) {
                uniforms_action_values.map((e) => action_values_list.add(e?.action_value_id))
            }

            return Array.from(action_values_list).flat()
        } catch (e) {
            return ''
        }
    }

    readFleetUnits() {
        try {
            return this.readEntities(['entities/*.unit'])
                .filter((e) => JSON.parse(e.content)?.name?.group === 'fleet')
                .map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readResearchFields(type) {
        const fields = { civilian: ['civilian_regeneration'], military: ['civilian_regeneration'] }
        try {
            const players = this.readEntities(['entities/*.player'])

            for (const player of players) {
                const content = JSON.parse(player.content)
                if (content.hasOwnProperty('research')) {
                    const research_fields = content?.research?.research_domains
                    if (research_fields.civilian) {
                        research_fields.civilian?.research_fields?.map((e) => fields['civilian'].push(e?.id))
                    }
                    if (research_fields.military) {
                        research_fields.military?.research_fields?.map((e) => fields['military'].push(e?.id))
                    }
                }
            }
            return fields[type]
        } catch (e) {
            return { civilian: ['civilian_regeneration'], military: ['civilian_regeneration'] }
        }
    }

    readPhaseLaneUnit() {
        try {
            return this.readEntities(['entities/*.unit'])
                .filter((e) => JSON.parse(e.content).hasOwnProperty('phase_lane'))
                .map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readRallyPointUnit() {
        try {
            return this.readEntities(['entities/*.unit'])
                .filter((e) => JSON.parse(e.content).hasOwnProperty('rally_point'))
                .map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readFormations() {
        try {
            return this.readEntityManifest('formation')
        } catch (e) {
            return ''
        }
    }

    readUnitItems() {
        try {
            return this.readEntities(['entities/*.unit_item']).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readResearchSubjects() {
        try {
            return this.readEntities(['entities/*.research_subject'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readPlanets() {
        try {
            return this.readUniform('planet', 'planet_types').map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readPlanetFiles() {
        try {
            return this.readEntities(['entities/*_planet.unit']).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readPlanetBonuses() {
        try {
            return this.readEntities(['entities/*.unit_item'])
                .filter((e) => JSON.parse(e.content)?.item_type === 'planet_bonus')
                .map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }
    readPlanetArtifacts() {
        try {
            return this.readEntities(['entities/*.unit_item'])
                .filter((e) => JSON.parse(e.content)?.item_type === 'planet_artifact')
                .map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readSounds({ ext: ext }) {
        try {
            return this.readEntities([`sounds/*.${ext}`]).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readBrushes() {
        try {
            return [...this.readEntities(['brushes/*.brush'], { readFile: false }).map((e) => e?.name), '']
        } catch (e) {
            return ''
        }
    }

    readMetalAsteroids() {
        try {
            return this.readEntities(['entities/*.unit'])
                .filter((e) => JSON.parse(e.content)?.asteroid?.asset_type === 'metal')
                .map((e) => e.name)
        } catch (e) {
            return ''
        }
    }
    readCrystalAsteroids() {
        try {
            return this.readEntities(['entities/*.unit'])
                .filter((e) => JSON.parse(e.content)?.asteroid?.asset_type === 'crystal')
                .map((e) => e.name)
        } catch (e) {
            return ''
        }
    }
    readLoots() {
        try {
            return this.readEntities(['entities/*_loot*.unit']).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readNpcTags() {
        try {
            return this.readUniform('player', 'npc', (e) => e?.npc_tags?.map((y) => y?.name))
        } catch (e) {
            return ''
        }
    }

    readShipTags() {
        const vanilla_tags = ['planet', 'torpedo', 'star', 'buff_agent', 'asteroid', 'loot', 'debris', 'gravity_well', 'phase_lane', 'cannon_shell']
        try {
            return new Set([...this.readUniform('unit_tag', 'unit_tags').map((e) => e?.name), ...vanilla_tags])
        } catch (e) {
            return ''
        }
    }

    readUnitMutations() {
        try {
            return this.readUniform('unit_mutation', 'mutations').map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readUnitVariableIds() {
        try {
            return this.readEntities(['entities/*.action_data_source'])
                .map((e) => JSON.parse(e.content)?.per_buff_memory_declaration?.unit_variable_ids)
                .flat()
        } catch (e) {
            return ''
        }
    }

    readPlayers() {
        try {
            return this.readEntityManifest('player')
        } catch (e) {
            return ''
        }
    }

    readUnitBuildKinds() {
        try {
            return this.readUniform('unit_build', 'build_kinds').map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readExotics() {
        try {
            return this.readUniform('exotic', 'type_datas').map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }
    readUnits() {
        try {
            return this.readEntityManifest('unit')
        } catch (e) {
            return ''
        }
    }
    readBuffs() {
        try {
            return this.readEntityManifest('buff')
        } catch (e) {
            return ''
        }
    }

    readSpecialOperationUnitKinds() {
        try {
            return this.readUniform('special_operation_unit', 'special_operation_unit_kinds')?.map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readAttackTargetTypeGroups() {
        try {
            return this.readUniform('attack_target_type_group', 'attack_target_type_groups')?.map((e) => e?.unit_attack_target_type_group_id)
        } catch (e) {
            return ''
        }
    }

    readPlayerIcons() {
        try {
            return this.readEntities(['player_icons/*.player_icon'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readPlayerPortraits() {
        try {
            return this.readEntities(['player_portraits/*.player_portrait'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readNpcRewards() {
        try {
            return this.readEntityManifest('npc_reward')
        } catch (e) {
            return ''
        }
    }
    readAbilities() {
        try {
            return this.readEntityManifest('ability')
        } catch (e) {
            return ''
        }
    }

    readExhaustTrailEffects() {
        try {
            return this.readEntities(['effects/*.exhaust_trail_effect'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readPipGroups() {
        try {
            return Array.from(this.readEntities(['gui/hud_bookmarks_window.gui']).map((e) => Object.keys(JSON.parse(e.content)?.bookmark_window_definition?.pip_types))).flat()
        } catch (e) {
            return ''
        }
    }

    readUnitNames() {
        const unit_names_list = new Set()
        try {
            const unit_names = this.readEntities(['entities/*.player'])
            const uniform_unit_names = this.readUniform('unit', 'unit_names')

            if (unit_names) {
                unit_names.map((e) => {
                    const unit_names = JSON.parse(e.content)
                    if (unit_names.hasOwnProperty('unit_names') && unit_names.unit_names.length > 0) {
                        unit_names.unit_names.map((e) => {
                            unit_names_list.add(e?.group_name)
                        })
                    }
                })
            }

            if (uniform_unit_names) {
                uniform_unit_names.map((e) => {
                    unit_names_list.add(e?.group_name)
                })
            }
            return unit_names_list.add('loot').add('ship_loot')
        } catch (e) {
            return ''
        }
    }

    readGravityWellFillings(type) {
        const readFixtures = () => {
            try {
                return this.readUniform('galaxy_generator', 'fillings', (e) => e?.random_fixture_fillings?.map((e) => e?.name))
            } catch (e) {
                return ''
            }
        }

        const fillings = { fillings: [], random: [], fixtures: readFixtures() }
        try {
            this.readUniform('galaxy_generator', 'fillings', (e) => e?.gravity_well_fillings?.map((e) => fillings['fillings'].push(e?.name)))
            this.readUniform('galaxy_generator', 'fillings', (e) => e?.random_gravity_well_fillings?.map((e) => fillings['random'].push(e?.name)))
            if (type === 'all') return new Set([...fillings['fillings'], ...fillings['random']])
            return new Set(fillings[type])
        } catch (e) {
            return { fillings: [], random: [], fixtures: [] }
        }
    }

    readGravityWellProps() {
        try {
            return this.readEntities(['gravity_well_props/*.gravity_well_props'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readTextureAnimations() {
        try {
            return this.readEntities(['texture_animations/*.texture_animation']).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }

    readSkyboxes() {
        try {
            return this.readEntities(['skyboxes/*'], { readFile: false }).map((e) => e?.name)
        } catch (e) {
            return ''
        }
    }
    readColors() {
        try {
            return JSON.parse(this.readEntity(['colors/named_colors.named_colors']))?.named_colors?.map((e) => e?.id)
        } catch (e) {
            return ''
        }
    }
}
