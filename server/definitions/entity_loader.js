const { CONSTANTS, ERROR } = require('../constants')
const Document = require('../providers/document')
const WeaponUniform = require('./uniforms/weapon')
const StrikecraftUniform = require('./uniforms/strikecraft')
const ActionUniform = require('./uniforms/action')
const AttackTargetTypeGroupUniform = require('./uniforms/attack_target_type_group')
const CultureUniform = require('./uniforms/culture')
const DebrisUniform = require('./uniforms/debris')
const FormationUniform = require('./uniforms/formation')
const FrontEndUniform = require('./uniforms/front_end')
const FutureOrbitUniform = require('./uniforms/future_orbit')
const UnitTagUniform = require('./uniforms/unit_tag')
const TargetFilterUniform = require('./uniforms/target_filter')
const PlayerColorUniform = require('./uniforms/player_color')
const MusicUniform = require('./uniforms/music')
const GalaxyGeneratorUniform = require('./uniforms/galaxy_generator')
const GameRendererUniform = require('./uniforms/game_renderer')
const GuiUniform = require('./uniforms/gui')
const NamedColors = require('./colors/named_colors')
const Icons = require('./player_icons/icons')
const PlayerColorGroup = require('./player_colors/player_color_group')
const Skybox = require('./skybox/skybox')
const Font = require('./font/font')
const GravityWellProps = require('./gravity_well_props/gravity_well_props')
const Cursor = require('./cursor/cursor')
const Player = require('./entities/player')
const UserInterfaceUniform = require('./uniforms/user_interface')
const UnitBuildUniform = require('./uniforms/unit_build')
const UnitMutationUniform = require('./uniforms/unit_mutation')
const UnitBarUniform = require('./uniforms/unit_bar')
const UnitUniform = require('./uniforms/unit')
const ResearchUniform = require('./uniforms/research')
const ScenarioUniform = require('./uniforms/scenario')
const PlayerAiUniform = require('./uniforms/player_ai')
const Sound = require('./sound/sound')
const PlanetTrackUniform = require('./uniforms/planet_track')
const PlanetUniform = require('./uniforms/planet')
const LootUniform = require('./uniforms/loot')
const MainViewUniform = require('./uniforms/main_view')
const NotificationUniform = require('./uniforms/notification')
const PlayerUniform = require('./uniforms/player')
const Unit = require('./entities/unit')
const ResearchSubject = require('./entities/research_subject')
const NpcReward = require('./entities/npc_reward')
const UnitItem = require('./entities/unit_item')
const Weapon = require('./entities/weapon')
const Buff = require('./entities/buff')
const EntityManifest = require('./entities/entity_manifest')
const Formation = require('./entities/formation')
const Exotic = require('./entities/exotic')
const FlightPattern = require('./entities/flight_pattern')
const Ability = require('./entities/ability')
const ActionDataSource = require('./entities/action_data_source')
const LocalizedText = require('./localized_text/localized_text')
const MeshMaterial = require('./mesh_material/mesh_material')
const ExoticUniform = require('./uniforms/exotic')
const TextureAnimation = require('./texture_animations/texture_animation')
const UnitSkin = require('./entities/unit_skin')
const Brush = require('./brushes/brush')
const DeathSequence = require('./death_sequences/death_sequence')
const DeathSequenceGroup = require('./death_sequences/death_sequence_group')
const ModMetaData = require('./mod_meta_data/mod_meta_data')
const SpecialOperationUnit = require('./uniforms/special_operation_unit')
const BeamEffect = require('./effects/beam_effect')
const ShieldEffect = require('./effects/shield_effect')
const ExhaustTrailEffect = require('./effects/exhaust_trail_effect')
const HudSkinUniform = require('./uniforms/hud_skin')
const RandomSkyboxFillingUniforms = require('./uniforms/random_skybox_filling')
const WelcomeMessage = require('./welcome_message/welcome_message')
const GdprAcceptData = require('./gdpr_accept_data/gdpr_accept_data')
const { Log } = require('../utils/logger')
const PlayerRaceUniform = require('./uniforms/player_race')
const TutorialUniform = require('./uniforms/tutorial')
const GalaxyChart = require('./galaxy_chart/galaxy_chart')
const ScenarioInfo = require('./galaxy_chart/scenario_info')
const GalaxyChartFillings = require('./galaxy_chart/galaxy_chart_fillings')
const ParticleEffect = require('./particle_effects/particle_effect')

const path = require('path')
const ScenarioScene = require('./galaxy_chart/scenario_scene')
const GalaxyChartGeneratorParams = require('./galaxy_chart/galaxy_chart_generator_params')

module.exports = class EntityLoader extends Document {
    static diagnostics = []
    static nonschemed_files = []
    static uniforms = {
        // Uniforms //
        ['weapon.uniforms']: WeaponUniform,
        ['strikecraft.uniforms']: StrikecraftUniform,
        ['action.uniforms']: ActionUniform,
        ['attack_target_type_group.uniforms']: AttackTargetTypeGroupUniform,
        ['culture.uniforms']: CultureUniform,
        ['debris.uniforms']: DebrisUniform,
        ['formation.uniforms']: FormationUniform,
        ['front_end.uniforms']: FrontEndUniform,
        ['future_orbit.uniforms']: FutureOrbitUniform,
        ['unit_tag.uniforms']: UnitTagUniform,
        ['target_filter.uniforms']: TargetFilterUniform,
        ['player_color.uniforms']: PlayerColorUniform,
        ['music.uniforms']: MusicUniform,
        ['galaxy_generator.uniforms']: GalaxyGeneratorUniform,
        ['game_renderer.uniforms']: GameRendererUniform,
        ['user_interface.uniforms']: UserInterfaceUniform,
        ['unit_build.uniforms']: UnitBuildUniform,
        ['unit_mutation.uniforms']: UnitMutationUniform,
        ['unit_bar.uniforms']: UnitBarUniform,
        ['gui.uniforms']: GuiUniform,
        ['unit.uniforms']: UnitUniform,
        ['research.uniforms']: ResearchUniform,
        ['scenario.uniforms']: ScenarioUniform,
        ['player_ai.uniforms']: PlayerAiUniform,
        ['planet_track.uniforms']: PlanetTrackUniform,
        ['planet.uniforms']: PlanetUniform,
        ['loot.uniforms']: LootUniform,
        ['main_view.uniforms']: MainViewUniform,
        ['notification.uniforms']: NotificationUniform,
        ['player.uniforms']: PlayerUniform,
        ['exotic.uniforms']: ExoticUniform,
        ['player_race.uniforms']: PlayerRaceUniform,
        ['special_operation_unit.uniforms']: SpecialOperationUnit,
        ['hud_skin.uniforms']: HudSkinUniform,
        ['random_skybox_filling.uniforms']: RandomSkyboxFillingUniforms,

        /* game_version v1.28.16 */
        ['tutorial.uniforms']: TutorialUniform,
        /* */
    }

    static effects = {
        exhaust_trail_effect: ExhaustTrailEffect,
        beam_effect: BeamEffect,
        shield_effect: ShieldEffect,
        // particle_effect: ParticleEffect,
    }

    static misc = {
        // // Colors //
        ['named_colors.named_colors']: NamedColors,
        // Player Icons ///
        icon: Icons,
        player_icon: Icons,
        player_portrait: Icons,
        // Player Colors //
        player_color_group: PlayerColorGroup,
        // Skybox //
        skybox: Skybox,
        // Font //
        font: Font,
        // Gravity Well Props //
        gravity_well_props: GravityWellProps,
        // Cursor //
        cursor: Cursor,
        // Sound //
        sound: Sound,
        // Texture Animation //
        texture_animation: TextureAnimation,
        // Brushes //
        brush: Brush,
        // Death Sequence
        death_sequence: DeathSequence,
        death_sequence_group: DeathSequenceGroup,
        // Welcome Message
        welcome_message: WelcomeMessage,
        // Gdpr Accept Data
        gdpr_accept_data: GdprAcceptData,
        // Galaxy Chart
        ['galaxy_chart.json']: GalaxyChart,
        ['scenario_info.json']: ScenarioInfo,
        ['galaxy_chart_fillings.json']: GalaxyChartFillings,
        ['.scenario_scene']: ScenarioScene,
        ['galaxy_chart_generator_params.json']: GalaxyChartGeneratorParams,
    }
    static entities = {
        ['.mod_meta_data']: ModMetaData,
        //
        buff: Buff,
        ability: Ability,
        action_data_source: ActionDataSource,
        player: Player,
        weapon: Weapon,
        unit_item: UnitItem,
        entity_manifest: EntityManifest,
        research_subject: ResearchSubject,
        formation: Formation,
        exotic: Exotic,
        flight_pattern: FlightPattern,
        npc_reward: NpcReward,
        unit: Unit,
        unit_skin: UnitSkin,
        localized_text: LocalizedText,
        mesh_material: MeshMaterial,
    }

    static files = {
        ...this.entities,
        ...this.uniforms,
        ...this.effects,
        ...this.misc,
    }

    constructor(languageService, schemaService) {
        super(languageService, schemaService)
        this.DEFAULT_SCHEMA = { type: 'object', properties: {} }
    }

    async init({ params = undefined, fileText = undefined, filePath = undefined, gameInstallationFolder, cache }) {
        if (typeof params !== 'undefined') {
            this.configureSchema(params.document.getText(), params.document.uri, cache, gameInstallationFolder)
        } else {
            this.configureSchema(fileText, filePath, cache, gameInstallationFolder)
        }
    }

    defineSchema(schema) {
        return this.languageService.configure({
            validate: true,
            schemas: [{ fileMatch: ['*'], schema: schema }],
        })
    }

    configureSchema(fileText, fileName, cache, gameInstallationFolder) {
        const name = path.basename(fileName, path.extname(fileName))
        const ext = path.extname(fileName).substring(1)

        const Entity = EntityLoader.files[`${name}.${ext}`] || EntityLoader.files[ext] || EntityLoader.files[name]
        try {
            if (Entity) {
                return this.defineSchema(
                    new Entity(
                        {
                            fileText: fileText,
                            fileExt: ext,
                            fileName: name,
                        },
                        EntityLoader.diagnostics,
                        gameInstallationFolder,
                        cache
                    ).create()
                )
            } else {
                EntityLoader.nonschemed_files.push(`${name}.${ext}`)
                return this.defineSchema(this.DEFAULT_SCHEMA)
            }
        } catch (err) {
            Log.error('Error', err, fileName)
        }
    }

    async jsonDoValidation(docText, uri) {
        try {
            const { parseDoc, parseJSON } = super.provideDocument(uri, docText)
            const validationResults = await this.languageService.doValidation(parseDoc, parseJSON)
            return validationResults.map((result) => ({
                range: result.range,
                severity: ERROR,
                message: result.message,
                source: CONSTANTS.source,
            }))
        } catch (err) {
            Log.error(`Error during JSON validation: ${uri}`, err)
        }
    }
}
