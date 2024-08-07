const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')
const { Log } = require('../utils/logger')
const { unit_modifier_types, unit_factory_modifier_types, weapon_modifier_types, planet_modifier_types } = require('../definitions/modifier_types')
const { DiagnosticReporter } = require('./diagnostic-reporter')
const { ERROR } = require('../constants')

class EntityHandler {
    constructor(gameFolder) {
        this.gameFolder = gameFolder
    }
    read(glob, { read: read = true } = {}) {
        return fg
            .globSync(glob, {
                dot: true,
                cwd: this.gameFolder,
            })
            .map((entity) => {
                try {
                    const filePath = path.resolve(this.gameFolder, entity)
                    const baseName = path.basename(entity, path.extname(entity)).toLowerCase()
                    const ext = path.extname(entity).substring(1).toLowerCase()
                    return {
                        uri: filePath,
                        basename: baseName,
                        ext: ext,
                        filename: `${baseName}.${ext}`,
                        content: read ? this.parseContents(fs.readFileSync(filePath, 'utf-8'), `${baseName}.${ext}`) : null,
                    }
                } catch (err) {
                    Log.error('Error during reading:', err)
                }
            })
            .filter(Boolean)
    }
    parseContents(content, fileName) {
        if (!content || !this.toJSON(content)) return [`Unable to read: ${fileName}`]
        if (!this.toJSON(content)) return [`Malformed JSON: ${fileName}`]
        return this.toJSON(content)
    }
    toJSON(content) {
        try {
            return JSON.parse(content)
        } catch (e) {
            // Skip
            // console.log('Could not parse: ', e)
        }
    }
}

class EntityParser extends EntityHandler {
    constructor(gameFolder) {
        super(gameFolder)
    }

    parseEntity(entity) {
        const raw = super.read(entity)
        if (!raw.length || !raw[0]?.content) return [`${entity}, invalid JSON.`]
        return raw[0].content
    }

    parseEntityManifest(manifest, glob = [`entities/${manifest}.entity_manifest`]) {
        const content = this.parseEntity(glob)
        if (!content) return [`missing ${manifest}.entity_manifest`]
        if (!content.ids) return [`${manifest}.entity_manifest, missing 'ids' property`]
        return content.ids.map((e) => e)
    }
    parseEntityManifestTest(manifest, glob = [`entities/${manifest}.entity_manifest`]) {
        const content = this.parseEntity(glob)
        if (!content) return [`missing ${manifest}.entity_manifest`]
        if (!content.ids) return [`${manifest}.entity_manifest, mising 'ids' property`]
        return content.ids.map((e) => e)
    }

    parseUniform(name) {
        const uniform = super.read([`uniforms/${name}.uniforms`])[0]
        if (uniform) return uniform.content
        return []
    }

    parseTextures() {
        const textures = super.read(['./textures/*.{DDS,dds,png,PNG}'], {
            read: false,
        })
        return [...textures.map((e) => e.basename), ...textures.map((e) => e.filename)]
    }
    parseFontsTtf() {
        return super
            .read(['fonts/*.ttf'], {
                read: false,
            })
            .map((e) => e.basename)
    }
    parseAbilityGuiActions() {
        const actions = []
        const gui_actions = this.parseEntity(['gui/input_actions.gui'])
        Object.keys(gui_actions)
            .filter((e) => e.startsWith('toggle'))
            .map((e) => actions.push(e))
        return actions
    }
    parseMainviewGroups(groups = this.parseUniform('main_view').unit_icons) {
        if (groups && groups.groups) return groups.groups.map((e) => e.group)

        return ['']
    }

    parseMeshMaterials() {
        return super
            .read(['mesh_materials/*.mesh_material'], {
                read: false,
            })
            .map((e) => e.basename)
    }
    parseChildMeshes() {
        const child_meshes_set = new Set()
        const child_meshes = super.read(['entities/*.unit_skin'])

        if (child_meshes && child_meshes.length > 0) {
            for (const mesh of child_meshes) {
                if (!mesh.content) continue
                if (mesh.content.hasOwnProperty('skin_stages')) {
                    mesh.content.skin_stages.flatMap((y) => {
                        if (!y.hasOwnProperty('child_mesh_alias_bindings')) return
                        y.child_mesh_alias_bindings.map.map((y) => child_meshes_set.add(y[0]))
                    })
                }
            }
        }
        return child_meshes_set
    }
    parseParticleEffects() {
        return [
            ...super
                .read(['effects/*.particle_effect'], {
                    read: false,
                })
                .map((e) => e.basename),
            ...this.parseEffectAliasBindings(),
        ]
    }
    parseEffectAliasBindings() {
        const effect_alias_binding_set = new Set()
        super.read(['entities/*.action_data_source']).map((e) => e.content?.effect_alias_bindings?.map((y) => (y ? effect_alias_binding_set.add(y[0]) : '')))
        return [...effect_alias_binding_set, ...this.parseUnitSkinEffects()]
    }
    parseUnitSkinEffects() {
        const unit_skin_effect_set = new Set()
        super.read(['entities/*.unit_skin']).map((e) => e.content?.skin_stages?.flatMap((y) => y?.effects?.effect_alias_bindings?.map((e) => (y ? unit_skin_effect_set.add(e[0]) : ''))))
        return unit_skin_effect_set
    }
    parseMeshes() {
        return super
            .read(['meshes/*.mesh'], {
                read: false,
            })
            .map((e) => e.basename)
    }
    parseLocalisation() {
        const loc = super.read(['localized_text/en.localized_text'])[0]?.content
        if (loc) return [...Object.keys(loc), '']
        return ['']
    }
    parseBuffModifierIds() {
        return super
            .read(['entities/*.action_data_source'])
            .flatMap((e) => {
                if (!e.content.hasOwnProperty('buff_empire_modifiers')) return
                return e.content.buff_empire_modifiers?.map((e) => e?.buff_empire_modifier_id)
            })
            .filter((e) => e !== undefined)
    }

    parseComponents({ component: component }) {
        return new Set(
            super
                .read(['entities/*.unit_item'])
                .filter((e) => e.content.item_type === component)
                .map((e) => e.basename)
        )
    }
    parseStrikecraft() {
        return new Strikecraft(this.gameFolder).strikecraft()
    }
    parseStrikecraftUnits() {
        return new Strikecraft(this.gameFolder).units
    }
    parseBuffAgentUnit() {
        return super
            .read(['entities/*.unit'])
            .filter((e) => e.content.hasOwnProperty('is_buff_agent') && e.content.is_buff_agent == true)
            .map((e) => e.basename)
    }
    parseDeathSequences() {
        return new DeathSequence(this.gameFolder).sequences
    }
    parseDeathSequenceGroups() {
        return new DeathSequence(this.gameFolder).groups
    }
    parseColorGroups() {
        return super
            .read(['player_colors/*.player_color_group'], {
                read: false,
            })
            .map((e) => e.basename)
    }
    parseGravityWellUnit() {
        return super
            .read(['entities/*.unit'])
            .filter((e) => e.content.hasOwnProperty('gravity_well'))
            .map((e) => e.basename)
    }
    parseUnitBuildGroupIds() {
        return [...new BuildGroups(this.gameFolder).unit_build_groups, 'starbase']
    }
    parseUnitItemBuildGroupIds() {
        return new BuildGroups(this.gameFolder).ids
    }
    // TODO: Find out target types
    parseAttackTargetTypes() {
        return ['']
    }
    parseWeaponTags(tags = this.parseUniform('weapon').weapon_tags) {
        if (tags) return tags.map((e) => e.name)

        return ['']
    }
    parseNpcTags(tags = this.parseUniform('player')) {
        if (tags && tags.npc) return tags.npc.npc_tags.map((e) => e.name)

        return ['']
    }
    parseTargetFilters() {
        return new TargetFilters(this.gameFolder)
    }
    parseBuffActions() {
        return super
            .read(['entities/*.action_data_source'])
            .filter((e) => e.content.buff_actions)
            .map((e) => e.content.buff_actions.flatMap((y) => y.action_id))
            .flat()
    }

    parseFloatVariables() {
        return super
            .read(['entities/*.action_data_source'])
            .filter((e) => e.content.per_buff_memory_declaration)
            .filter((e) => e.content.per_buff_memory_declaration.float_variable_ids)
            .map((e) => e.content.per_buff_memory_declaration.float_variable_ids)
            .flat()
    }
    parseRaceNames(names = this.parseUniform('player').races) {
        if (names) return names.map((e) => e.name)

        return ['']
    }
    parseModLogos() {
        const logos = super.read(['./*.{png,PNG}'], {
            read: false,
        })
        return [...logos.map((e) => e.basename), ...logos.map((e) => e.filename), '']
    }

    parseBuffUnitModifiers() {
        return [
            ...super
                .read(['entities/*.action_data_source'])
                .filter((e) => e.content.buff_unit_modifiers)
                .map((e) => e.content.buff_unit_modifiers.flatMap((y) => y.buff_unit_modifier_id))
                .flat(),
            ...unit_modifier_types(),
        ]
    }
    parseBuffUnitFactoryModifiers() {
        return [
            ...super
                .read(['entities/*.action_data_source'])
                .filter((e) => e.content.buff_unit_factory_modifiers)
                .map((e) => e.content.buff_unit_factory_modifiers.flatMap((y) => y.buff_unit_factory_modifier_id))
                .flat(),
            ...unit_factory_modifier_types(),
        ]
    }
    parseBuffWeaponModifiers() {
        return [
            ...super
                .read(['entities/*.action_data_source'])
                .filter((e) => e.content.buff_weapon_modifiers)
                .map((e) => e.content.buff_weapon_modifiers.flatMap((y) => y.buff_weapon_modifier_id))
                .flat(),
            ...weapon_modifier_types(),
        ]
    }
    parseBuffPlanetModifiers() {
        return [
            ...super
                .read(['entities/*.action_data_source'])
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
    }

    parseDebrisUniform(debris = this.parseUniform('debris').groups) {
        if (debris) return debris.map((e) => e[0])
        return ['']
    }

    parseActionValues(common_action_values = this.parseUniform('action').common_action_values, action_values = super.read([`entities/*.action_data_source`])) {
        const action_values_set = new Set()

        if (Array.isArray(action_values)) {
            action_values.map((e) => {
                if (e.content && Array.isArray(e.content.action_values)) {
                    e.content.action_values.map((e) => action_values_set.add(e.action_value_id))
                }
            })
        }

        if (Array.isArray(common_action_values) && common_action_values.length > 1) {
            common_action_values.map((e) => action_values_set.add(e.action_value_id))
        }

        return action_values_set
    }

    parseFleetUnits() {
        return super
            .read(['entities/*.unit'])
            .filter((e) => e.content.name?.group === 'fleet')
            .map((e) => e.basename)
    }
    parseResearchField(type) {
        const fields = {
            civilian: [],
            military: [],
        }
        const players = super.read(['entities/*.player'])

        for (const player of players) {
            if (player.content.hasOwnProperty('research')) {
                const research_fields = player.content.research.research_domains
                if (research_fields.civilian) research_fields.civilian.research_fields.map((e) => fields['civilian'].push(e.id))
                if (research_fields.military) research_fields.military.research_fields.map((e) => fields['military'].push(e.id))
            }
        }
        return fields[type] ?? []
    }
    parsePhaseLaneUnit() {
        return super
            .read(['entities/*.unit'])
            .filter((e) => e.content.hasOwnProperty('phase_lane'))
            .map((e) => e.basename)
    }
    parseRallyPointUnit() {
        return super
            .read(['entities/*.unit'])
            .filter((e) => e.content.hasOwnProperty('rally_point'))
            .map((e) => e.basename)
    }
    parseUnitItems() {
        return super.read(['entities/*.unit_item']).map((e) => e.basename)
    }

    parsePlanets(planets = this.parseUniform('planet').planet_types) {
        if (planets) return planets.map((e) => e.name)
        return ['']
    }

    parseBeamEffects() {
        return super.read(['effects/*.beam_effect']).map((e) => e.basename)
    }

    parsePlanetFiles() {
        return super.read(['entities/*_planet.unit']).map((e) => e.basename)
    }
    parsePlanetBonuses() {
        return super
            .read(['entities/*.unit_item'])
            .filter((e) => e.content.item_type === 'planet_bonus')
            .map((e) => e.basename)
    }
    parsePlanetArtifacts() {
        return super
            .read(['entities/*.unit_item'])
            .filter((e) => e.content.item_type === 'planet_artifact')
            .map((e) => e.basename)
    }

    parseSounds({ ext: ext }) {
        return super
            .read([`sounds/*.${ext}`], {
                read: false,
            })
            .map((e) => e.basename)
    }

    parseBrushes() {
        return [
            ...super
                .read(['brushes/*.brush'], {
                    read: false,
                })
                .map((e) => e.basename),
            '',
        ]
    }

    parseMetalAsteroids() {
        return super
            .read(['entities/*.unit'])
            .filter((e) => e.content.asteroid?.asset_type === 'metal')
            .map((e) => e.basename)
    }
    parseCrystalAsteroids() {
        return super
            .read(['entities/*.unit'])
            .filter((e) => e.content.asteroid?.asset_type === 'crystal')
            .map((e) => e.basename)
    }
    parseLoots() {
        return super.read(['entities/*_loot*.unit']).map((e) => e.basename)
    }

    parseShieldEffects() {
        return super.read(['effects/*.shield_effect']).map((e) => e.basename)
    }

    parseShipTags(tags = this.parseUniform('unit_tag').unit_tags) {
        const vanilla_tags = ['planet', 'torpedo', 'star', 'buff_agent', 'asteroid', 'loot', 'debris', 'gravity_well', 'phase_lane', 'cannon_shell']
        if (tags) return new Set([...tags.map((e) => e.name), ...vanilla_tags])

        return vanilla_tags
    }

    parseUnitMutations(mutations = this.parseUniform('unit_mutation').mutations) {
        if (mutations) return mutations.map((e) => e.name)
        return ['']
    }

    parseUnitVariableIds() {
        return super
            .read(['entities/*.action_data_source'])
            .filter((e) => e.content.per_buff_memory_declaration?.unit_variable_ids)
            .flatMap((e) => e.content.per_buff_memory_declaration.unit_variable_ids)
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
        return super.read(['scenarios/*.scenario']).map((e) => e.basename)
    }
    parseSpecialOperationUnitKinds(unit_kinds = this.parseUniform('special_operation_unit').special_operation_unit_kinds) {
        if (unit_kinds) return unit_kinds.map((e) => e.name)
        return ['']
    }

    parseAttackTargetTypeGroups(groups = this.parseUniform('attack_target_type_group').attack_target_type_groups) {
        if (groups) return groups.map((e) => e.unit_attack_target_type_group_id)
        return ['']
    }

    parsePlayerIcons() {
        return super
            .read(['player_icons/*.player_icon'], {
                read: false,
            })
            .map((e) => e.basename)
    }

    parsePlayerPortraits() {
        return super
            .read(['player_portraits/*.player_portrait'], {
                read: false,
            })
            .map((e) => e.basename)
    }

    parseExhaustTrailEffects() {
        return super
            .read(['effects/*.exhaust_trail_effect'], {
                read: false,
            })
            .map((e) => e.basename)
    }

    parsePipGroups() {
        return super.read(['gui/hud_bookmarks_window.gui']).flatMap((e) => Object.keys(e.content.bookmark_window_definition.pip_types))
    }

    parseUnitNames() {
        const unit_names_list = new Set()

        const unit_names = super.read(['entities/*.player'])
        const uniform_unit_names = this.parseUniform('unit').unit_names

        if (unit_names) {
            unit_names.map((e) => {
                if (e.content.hasOwnProperty('unit_names') && Array.isArray(e.content.unit_names)) {
                    e.content.unit_names.map((e) => {
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
    }
    parseGravityWellFillings(type, galaxy_generator = this.parseUniform('galaxy_generator').fillings) {
        const fillings = {
            fillings: [],
            random_fillings: [],
            random_fixtures: [],
            fixtures: [],
        }

        if (galaxy_generator) {
            galaxy_generator.fixture_fillings.map((e) => fillings['fixtures'].push(e.name))
            galaxy_generator.random_fixture_fillings.map((e) => fillings['random_fixtures'].push(e.name))
            galaxy_generator.gravity_well_fillings.map((e) => fillings['fillings'].push(e.name))
            galaxy_generator.random_gravity_well_fillings.map((e) => fillings['random_fillings'].push(e.name))
        }

        if (type === 'all') return new Set([...fillings['fillings'], ...fillings['random_fillings'], ...fillings['fixtures'], ...fillings['random_fixtures']])
        return new Set(fillings[type])
    }

    parseGravityWellProps() {
        return super
            .read(['gravity_well_props/*.gravity_well_props'], {
                read: false,
            })
            .map((e) => e.basename)
    }

    parseTextureAnimations() {
        return super
            .read(['texture_animations/*.texture_animation'], {
                read: false,
            })
            .map((e) => e.basename)
    }
    parseSkyboxes() {
        return super
            .read(['skyboxes/*'], {
                read: false,
            })
            .map((e) => e.basename)
    }
    parseColors() {
        return super
            .read(['colors/named_colors.named_colors'])
            .filter((e) => e.content.named_colors)
            .flatMap((e) => e.content.named_colors.map((y) => y.id))
    }
}

class TargetFilters extends EntityParser {
    constructor(gameFolder) {
        super(gameFolder)
    }
    target_filters() {
        return super
            .read(['entities/*.action_data_source'])
            .filter((e) => e.content.target_filters)
            .map((e) => e.content)
            .flatMap((e) => e.target_filters.map((e) => e.target_filter_id))
    }
    uniform(uniform = super.parseUniform('target_filter').common_target_filters) {
        if (uniform) return uniform.map((e) => e.target_filter_id)
        return ['']
    }
}

class BuildGroups extends EntityParser {
    constructor(gameFolder) {
        super(gameFolder)
        this.entities = super.read(['entities/*.player'])
    }

    parseUnitBuildGroups() {
        return this.entities.filter((e) => e.content.unit_build_groups).flatMap((e) => super.parseEntity([`entities/${e.filename}`]).unit_build_groups.map((e) => e.id))
    }
    parseShipComponents() {
        return this.entities.filter((e) => e.content.ship_component_build_groups).flatMap((e) => super.parseEntity([`entities/${e.filename}`]).ship_component_build_groups.map((e) => e.id))
    }
    parsePlanetComponents() {
        return this.entities
            .filter((e) => e.content.planet_component_build_groups)
            .flatMap((e) => super.parseEntity(`entities/${e.filename}`).planet_component_build_groups)
            .map((e) => e.id)
    }

    get unit_build_groups() {
        return new Set(this.parseUnitBuildGroups())
    }

    get ids() {
        return new Set([...this.parseShipComponents(), ...this.parsePlanetComponents()])
    }
}

class DeathSequence extends EntityParser {
    constructor(gameFolder) {
        super(gameFolder)
    }
    get sequences() {
        return super.read(['death_sequences/*.death_sequence']).map((e) => e.basename)
    }
    get groups() {
        return super.read(['death_sequences/*.death_sequence_group']).map((e) => e.basename)
    }
}

class Strikecraft extends EntityParser {
    constructor(gameFolder) {
        super(gameFolder)
    }

    strikecraft(strikcraft = super.parseUniform('strikecraft').strikecraft_kinds) {
        if (strikcraft) return strikcraft.map((e) => e.name)
        return ['']
    }
    get units() {
        return super
            .read(['entities/*.unit'])
            .filter((e) => e.content.hasOwnProperty('strikecraft'))
            .map((e) => e.basename)
    }
}

module.exports = {
    EntityParser,
}
