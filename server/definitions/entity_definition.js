const { CONSTANTS, ERROR } = require('../constants')
const Document = require('../providers/document')
const Utils = require('../utils/utils')
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
const InputActions = require('./gui/input_actions')
const CultureTooltip = require('./gui/culture_tooltip')
const UnitTooltip = require('./gui/unit_tooltip')
const PlanetTooltip = require('./gui/planet_tooltip')
const ActionTooltip = require('./gui/action_tooltip')
const ResearchTooltip = require('./gui/research_tooltip')
const NpcTooltip = require('./gui/npc_tooltip')
const FrontEndMessageDialog = require('./gui/front_end_message_dialog')
const FailedQueryTooltip = require('./gui/failed_query_tooltip')
const HudIconButton = require('./gui/hud_icon_button')
const DialogFrameBackground = require('./gui/dialog_frame_background')
const ItemTooltip = require('./gui/item_tooltip')
const BindInputMappingDialog = require('./gui/bind_input_mapping_dialog')
const BuffTooltip = require('./gui/buff_tooltip')
const CommonTooltip = require('./gui/common_tooltip')
const DebugStatisticsWindow = require('./gui/debug_statistics_window')
const ModifierTooltip = require('./gui/modifier_tooltip')
const HudPlayerAllianceOfferWindow = require('./gui/hud_player_alliance_offer_window')
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
const FlightPattern = require('./entities/flight-pattern')
const Ability = require('./entities/ability')
const ActionDataSource = require('./entities/action_data_source')
const LocalizedText = require('./localized_text/localized_text')
const MeshMaterial = require('./mesh_material/mesh_material')
const ExoticUniform = require('./uniforms/exotic')
const TextureAnimation = require('./texture_animations/texture_animation')
const FrontEndLobbyWindow = require('./gui/front_end_lobby_window')
const HudColonizedPlanetsWindow = require('./gui/hud_colonized_planets_window')
const HudResearchWindow = require('./gui/hud_research_window')
const UnitSkin = require('./entities/unit_skin')
const AbilityTooltip = require('./gui/ability_tooltip')
const ChatButtonStyle = require('./gui/chat')
const Hud = require('./gui/hud')
const AllianceLockDurationButtonStyle = require('./gui/alliance_lock_duration')
const BasicTextListButtonStyle = require('./gui/basic_text_list')
const WeaponTooltip = require('./gui/weapon_tooltip')
const WaterMarkWindow = require('./gui/watermark_window')
const UnitGroupTooltip = require('./gui/unit_group_tooltip')
const BindInputMappingDialogActionName = require('./gui/bind_input_mapping_dialog_action_name')
const BindInputMappingDialogInputMapping = require('./gui/bind_input_mapping_dialog_input_mapping')
const BuildExoticHeaderLabelStyle = require('./gui/build_exotic_header')
const BuildExoticStatusLabelStyle = require('./gui/build_exotic_status')
const CheckboxButtonStyle = require('./gui/checkbox')
const ColonyListBoxStyle = require('./gui/colony_list')
const DebugChangeSkyboxWindow = require('./gui/debug_change_skybox_window')
const DebugCommandPaletteWindow = require('./gui/debug_command_palette_window')
const DebugContextWindow = require('./gui/debug_context_window')
const DebugGuiViewSnapshotWindow = require('./gui/debug_gui_view_snapshot_window')
const DebugGui = require('./gui/debug_gui')
const DebugInspectBrushGlyphsWindow = require('./gui/debug_inspect_brush_glyphs_window')
const DebugInspectCameraWindow = require('./gui/debug_inspect_camera_window')
const SettingsWindow = require('./gui/settings_window')
const Brush = require('./brushes/brush')
const DeathSequence = require('./death_sequences/death-sequence')
const DeathSequenceGroup = require('./death_sequences/death-sequence-group')
const DebugInspectFontGlyphsWindow = require('./gui/debug_inspect_font_glyphs_window')
const DebugInspectGuiWindow = require('./gui/debug_inspect_gui_window')
const DebugInspectPostProcessWindow = require('./gui/debug_inspect_post_process_window')
const DebugInspectSettingsWindow = require('./gui/debug_inspect_settings_window')
const DebugOutputWindow = require('./gui/debug_output_window')
const DiplomacyDemandTitleLabelStyle = require('./gui/diplomacy_demand_title')
const DebugSpawnUnitItemWindow = require('./gui/debug_spawn_unit_item_window')
const DebugSpawnUnitWindow = require('./gui/debug_spawn_unit_window')
const DebugStartNpcAuctionWindow = require('./gui/debug_start_npc_auction_window')
const DebugToolCloseButtonButtonStyle = require('./gui/debug_tool_close_button')
const DebugToolTitleLabelLabelStyle = require('./gui/debug_tool_title_label')
const DebugWatchPlayerWindow = require('./gui/debug_watch_player_window')
const DebugWatchSimulationWindow = require('./gui/debug_watch_simulation_window')
const DebugWatchUnitWindow = require('./gui/debug_watch_unit_window')
const DebugButtonStyle = require('./gui/debug-button-style')
const DebugDropBoxStyle = require('./gui/debug-dropbox-style')
const DebugListBoxStyle = require('./gui/debug-listbox-style')
const FrontEnd = require('./gui/front_end')
const DebugTextEntryBoxStyle = require('./gui/debug-text-entry-box-style')
const DefaultButtonStyle = require('./gui/default-button-style')
const DefaultDropBoxStyle = require('./gui/default-drop-box-style')
const DefaultLabelStyle = require('./gui/default-label-style')
const DefaultListBoxStyle = require('./gui/default-list-box-style')
const DefaultReflexBoxStyle = require('./gui/default-reflect-box-style')
const DefaultScrollBarStyle = require('./gui/default-scroll-bar-style')
const DefaultTextEntryBoxStyle = require('./gui/default-text-entry-box-style')
const DialogTitleLabelStyle = require('./gui/dialog_title-label-style')
const DialogueWithClawFrameButtonStyle = require('./gui/dialogue_with_claw_frame-button-style')
const DialogueButtonStyle = require('./gui/dialogue-button-style')
const DiplomacyOfferPlayerLabelStyle = require('./gui/diplomacy_offer_player-label-style')
const DiplomacyOfferTitleLabelStyle = require('./gui/diplomacy_offer_title-label-style')
const DiplomacyPlayerLabelStyle = require('./gui/diplomacy_player-label-style')
const DropBoxListListBoxStyle = require('./gui/drop_box_list-list-box-style')
const EmpireTooltip = require('./gui/empire_tooltip')
const EscapeMenu = require('./gui/escape_menu')
const ExoticFactoryDeliverableButtonStyle = require('./gui/exotic_factory_deliverable-button-style')
const ExoticTooltip = require('./gui/exotic_tooltip')
const FleetListListBoxStyle = require('./gui/fleet_list-list-box-style')
const FleetTooltip = require('./gui/fleet_tooltip')
const FrontEndAddModDialog = require('./gui/front_end_add_mod_dialog')
const FrontEndDialogTitleLabelStyle = require('./gui/front_end_dialog_title-label-style')
const FrontEndDialogueBarButtonStyle = require('./gui/front_end_dialogue_bar-button-style')
const FrontEndGameSummaryDialog = require('./gui/front_end_game_summary_dialog')
const LoadScreen = require('./gui/load_screen')
const FrontEndGdprAcceptDialog = require('./gui/front_end_gdpr_accept_dialog')
const FrontEndIntroMovie = require('./gui/front_end_intro_movie')
const HudTopBar = require('./gui/hud_top_bar')
const FrontEndJoinServerWithGameCodeDialog = require('./gui/front_end_join_server_with_game_code_dialog')
const FrontEndLanHostNewGameWindow = require('./gui/front_end_lan_host_new_game_window')
const FrontEndLanHostSavedGameWindow = require('./gui/front_end_lan_host_saved_game_window')
const FrontEndLanJoinGameWindow = require('./gui/front_end_lan_join_game_window')
const FrontEndLanWindow = require('./gui/front_end_lan_window')
const FrontEndLobbyChatWindow = require('./gui/front_end_lobby_chat_window')
const FrontEndLobbyDialogPlayerNameLabelStyle = require('./gui/front_end_lobby_dialog_player_name-label-style')
const FrontEndLobbyDialogTeamPanelHeaderLabelStyle = require('./gui/front_end_lobby_dialog_team_panel_header-label-style')
const HudShipWindow = require('./gui/hud_ship_window')
const HudStructuresWindow = require('./gui/hud_structures_window')
const FrontEndLobbyTeamCountLabelStyle = require('./gui/front_end_lobby_team_count-label-style')
const FrontEndLobbyTeamPanelsListBoxStyle = require('./gui/front_end_lobby_team_panels-label-box-style')
const FrontEndMessageDialogMessageLabelStyle = require('./gui/front_end_message_dialog_message-label-style')
const FrontEndMessageListBoxStyle = require('./gui/front_end_message-list-box-style')
const FrontEndModdingBrowseLocalFilesystemWindow = require('./gui/front_end_modding_browse_local_filesystem_window')
const FrontEndModdingBrowseServiceProviderWindow = require('./gui/front_end_modding_browse_service_provider_window')
const FrontEndModdingManageWindow = require('./gui/front_end_modding_manage_window')
const FrontEndModdingWindow = require('./gui/front_end_modding_window')
const FrontEndMultiPlayerHostNewGameWindow = require('./gui/front_end_multi_player_host_new_game_window')
const FrontEndMultiPlayerHostSavedGameWindow = require('./gui/front_end_multi_player_host_saved_game_window')
const FrontEndMultiPlayerJoinGameWindow = require('./gui/front_end_multi_player_join_game_window')
const FrontEndMultiPlayerWindow = require('./gui/front_end_multi_player_window')
const FrontEndPlayerThemePickerDialog = require('./gui/front_end_player_theme_picker_dialog')
const FrontEndScenarioPickerFilterLabelLabelStyle = require('./gui/front_end_scenario_picker_filter_label-label-style')
const FrontEndSinglePlayerLoadGameWindow = require('./gui/front_end_single_player_load_game_window')
const FrontEndSinglePlayerNewGameWindow = require('./gui/front_end_single_player_new_game_window')
const FrontEndSinglePlayerWindow = require('./gui/front_end_single_player_window')
const FrontEndTitleScreen = require('./gui/front_end_title_screen')
const FrontEndTopBarButtonStyle = require('./gui/front_end_top_bar-button-style')
const FrontEndVersionLabelStyle = require('./gui/front_end_version-label-style')
const FrontEndWatchingViewWindow = require('./gui/front_end_watching_view_window')
const FrontEndWelcomeDialog = require('./gui/front_end_welcome_dialog')
const FrontEndListBoxStyle = require('./gui/front_end-list-box-style')
const GameInputActionNameLabelStyle = require('./gui/game_input_action_name-label-style')
const GameInputGroupHeaderLabelStyle = require('./gui/game_input_group_header-label-style')
const GravityWellTooltip = require('./gui/gravity_well_tooltip')
const HudTitleLabelStyle = require('./gui/hud_title-label-style')
const TitleScreenLabelStyle = require('./gui/title_screen-label-style')
const HudAdvancedPlanetWindow = require('./gui/hud_advanced_planet_window')
const HudAdvancedShipWindow = require('./gui/hud_advanced_ship_window')
const HudBookmarksWindow = require('./gui/hud_bookmarks_window')
const HudBottomBar = require('./gui/hud_bottom_bar')
const HudCarrierWindow = require('./gui/hud_carrier_window')
const HudChatWindow = require('./gui/hud_chat_window')
const HudChatWindowListBoxStyle = require('./gui/hud_chat_window-list-box-style')
const HudChatWindowTextEntryBoxStyle = require('./gui/hud_chat_window-text-entry-box-style')
const HudDarkSquareButtonStyle = require('./gui/hud_dark_square-button-style')
const HudDarkTextDisplayButtonStyle = require('./gui/hud_dark_text_display-button-style')
const HudDarkWideButtonStyle = require('./gui/hud_dark_wide-button-style')
const HudEmpireUnitsWindow = require('./gui/hud_empire_units_window')
const HudExoticFactoryWindow = require('./gui/hud_exotic_factory_window')
const ModMetaData = require('./mod_meta_data/mod_meta_data')
const HudFeedbackWindow = require('./gui/hud_feedback_window')
const HudFutureOrbitsBar = require('./gui/hud_future_orbits_bar')
const HudIconAndTextActionButtonStyle = require('./gui/hud_icon_and_text_action-button-style')
const HudIconAndTextLabelStyle = require('./gui/hud_icon_and_text-label-style')
const HudIconLargeExoticsButtonStyle = require('./gui/hud_icon_large_exotics-button-style')
const HudIconOnlyActionButtonStyle = require('./gui/hud_icon_only_action-button-style')
const HudIconOnlyLabelStyle = require('./gui/hud_icon_only-label-style')
const HudIconWideOpaqueButtonStyle = require('./gui/hud_icon_wide_opaque-button-style')
const HudIconWideButtonStyle = require('./gui/hud_icon_wide-button-style')
const HudIconButtonStyle = require('./gui/hud_icon-button-style')
const HudIncreaseAbilityLevelButtonStyle = require('./gui/hud_increase_ability_level-button-style')
const HudNotificationsWindow = require('./gui/hud_notifications_window')
const HudNpcAuctionBidButtonStyle = require('./gui/hud_npc_auction_bid-button-style')
const HudNpcInteractionWindow = require('./gui/hud_npc_interaction_window')
const HudNpcMarketsWindow = require('./gui/hud_npc_markets_window')
const HudNpcsWindow = require('./gui/hud_npcs_window')
const HudPhaseResonanceAvailablePointsValueLabelStyle = require('./gui/hud_phase_resonance_available_points_value-label-style')
const HudPhaseResonanceAvailablePointsLabelStyle = require('./gui/hud_phase_resonance_available_points')
const HudPhaseResonanceLevelLabelStyle = require('./gui/hud_phase_resonance_level-label-style')
const HudPhaseResonanceTrackTitleLabelStyle = require('./gui/hud_phase_resonance_track_title-label-style')
const HudPhaseResonanceWindow = require('./gui/hud_phase_resonance_window')
const HudPlanetWindow = require('./gui/hud_planet_window')
const HudPlayerVictoryDialog = require('./gui/hud_player_victory_dialog')
const HudPlayerWindow = require('./gui/hud_players_window')
const HudProductionWindow = require('./gui/hud_production_window')
const HudPurchasePlanetComponentsWindow = require('./gui/hud_purchase_planet_components_window')
const IconOnlyButtonStyle = require('./gui/icon_only-button-style')
const HudPurchaseShipComponentsWindow = require('./gui/hud_purchase_ship_components_window')
const PipGroupTooltip = require('./gui/pip_group_tooltip')
const HudReplayWindow = require('./gui/hud_replay_window')
const HudResearchSubjectIconButtonStyle = require('./gui/hud_research_subject_icon-button-style')
const HudResearchTextFilterTextEntryBoxStyle = require('./gui/hud_research_text_filter-text-entry-box-style')
const HudResearchWindowTierButtonButtonStyle = require('./gui/hud_research_window_tier_button-button-style')
const HudResearchWindowListBoxStyle = require('./gui/hud_research_window-list-box-style')
const HudSaveGameDialog = require('./gui/hud_save_game_dialog')
const HudSelectionWindow = require('./gui/hud_selection_window')
const HudTitleWithCenterTextGlowLabelStyle = require('./gui/hud_title_with_center_text_glow-label-style')
const HudTitleWithTextGlowLabelStyle = require('./gui/hud_title_with_text_glow-label-style')
const HudTradeWindow = require('./gui/hud_trade_window')
const HudUnitFactoryWindow = require('./gui/hud_unit_factory_window')
const HudUnitNameLargeTextEntryBoxStyle = require('./gui/hud_unit_name_large-text-entry-box-style')
const HudUnitNameWithDarkBackgroundTextEntryBoxStyle = require('./gui/hud_unit_name_with_dark_background-text-entry-box-style')
const SpecialOperationUnit = require('./uniforms/special_operation_unit')
const BeamEffect = require('./effects/beam_effect')
const ShieldEffect = require('./effects/shield_effect')
const ExhaustTrailEffect = require('./effects/exhaust_trail_effect')
const HudSkinUniform = require('./uniforms/hud_skin')
const RandomSkyboxFillingUniforms = require('./uniforms/random_skybox_filling')
const WelcomeMessage = require('./welcome_message/welcome_message')
const GdprAcceptData = require('./gdpr_accept_data/gdpr_accept_data')

module.exports = class EntityDefinition extends Document {
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
        ['special_operation_unit.uniforms']: SpecialOperationUnit,
        ['hud_skin.uniforms']: HudSkinUniform,
        ['random_skybox_filling.uniforms']: RandomSkyboxFillingUniforms,
    }

    static gui = {
        // Gui //
        ['input_actions.gui']: InputActions,
        ['culture_tooltip.gui']: CultureTooltip,
        ['unit_tooltip.gui']: UnitTooltip,
        ['planet_tooltip.gui']: PlanetTooltip,
        ['action_tooltip.gui']: ActionTooltip,
        ['research_tooltip.gui']: ResearchTooltip,
        ['npc_tooltip.gui']: NpcTooltip,
        ['front_end_message_dialog.gui']: FrontEndMessageDialog,
        ['failed_query_tooltip.gui']: FailedQueryTooltip,
        ['hud_icon_button.gui']: HudIconButton,
        ['dialog_frame_background.gui']: DialogFrameBackground,
        ['item_tooltip.gui']: ItemTooltip,
        ['bind_input_mapping_dialog.gui']: BindInputMappingDialog,
        ['buff_tooltip.gui']: BuffTooltip,
        ['common_tooltip.gui']: CommonTooltip,
        ['debug_statistics_window.gui']: DebugStatisticsWindow,
        ['modifier_tooltip.gui']: ModifierTooltip,
        ['hud_player_alliance_offer_window.gui']: HudPlayerAllianceOfferWindow,
        ['front_end_lobby_window.gui']: FrontEndLobbyWindow,
        ['hud_colonized_planets_window.gui']: HudColonizedPlanetsWindow,
        ['hud_research_window.gui']: HudResearchWindow,
        ['ability_tooltip.gui']: AbilityTooltip,
        ['chat.button_style']: ChatButtonStyle,
        ['hud.gui']: Hud,
        ['weapon_tooltip.gui']: WeaponTooltip,
        ['alliance_lock_duration.button_style']: AllianceLockDurationButtonStyle,
        ['basic_text_list.button_style']: BasicTextListButtonStyle,
        ['watermark_window.gui']: WaterMarkWindow,
        ['unit_group_tooltip.gui']: UnitGroupTooltip,
        ['bind_input_mapping_dialog_action_name.label_style']: BindInputMappingDialogActionName,
        ['bind_input_mapping_dialog_input_mapping.label_style']: BindInputMappingDialogInputMapping,
        ['build_exotic_header.label_style']: BuildExoticHeaderLabelStyle,
        ['build_exotic_status.label_style']: BuildExoticStatusLabelStyle,
        ['checkbox.button_style']: CheckboxButtonStyle,
        ['colony_list.list_box_style']: ColonyListBoxStyle,
        ['debug_change_skybox_window.gui']: DebugChangeSkyboxWindow,
        ['debug_command_pallete_window.gui']: DebugCommandPaletteWindow,
        ['debug_context_window.gui']: DebugContextWindow,
        ['debug_gui_view_snapshot_window.gui']: DebugGuiViewSnapshotWindow,
        ['debug_gui.gui']: DebugGui,
        ['debug_inspect_brush_glyphs_window.gui']: DebugInspectBrushGlyphsWindow,
        ['debug_inspect_camera_window.gui']: DebugInspectCameraWindow,
        ['debug_inspect_font_glyphs_window.gui']: DebugInspectFontGlyphsWindow,
        ['settings_window.gui']: SettingsWindow,
        ['debug_inspect_gui_window.gui']: DebugInspectGuiWindow,
        ['debug_inspect_post_process_window.gui']: DebugInspectPostProcessWindow,
        ['debug_inspect_settings_window.gui']: DebugInspectSettingsWindow,
        ['debug_output_window.gui']: DebugOutputWindow,
        ['diplomacy_demand_title.label_style']: DiplomacyDemandTitleLabelStyle,
        ['debug_spawn_unit_item_window.gui']: DebugSpawnUnitItemWindow,
        ['debug_spawn_unit_window.gui']: DebugSpawnUnitWindow,
        ['debug_start_npc_auction_window.gui']: DebugStartNpcAuctionWindow,
        ['debug_tool_close_button.button_style']: DebugToolCloseButtonButtonStyle,
        ['debug_tool_title_label.label_style']: DebugToolTitleLabelLabelStyle,
        ['debug_watch_player_window.gui']: DebugWatchPlayerWindow,
        ['debug_watch_simulation_window.gui']: DebugWatchSimulationWindow,
        ['debug_watch_unit_window.gui']: DebugWatchUnitWindow,
        ['debug.button_style']: DebugButtonStyle,
        ['debug.drop_box_style']: DebugDropBoxStyle,
        ['debug.list_box_style']: DebugListBoxStyle,
        ['front_end.gui']: FrontEnd,
        ['debug.text_entry_box_style']: DebugTextEntryBoxStyle,
        ['default.button_style']: DefaultButtonStyle,
        ['default.drop_box_style']: DefaultDropBoxStyle,
        ['default.label_style']: DefaultLabelStyle,
        ['default.list_box_style']: DefaultListBoxStyle,
        ['default.reflect_box_style']: DefaultReflexBoxStyle,
        ['default.scroll_bar_style']: DefaultScrollBarStyle,
        ['default.text_entry_box_style']: DefaultTextEntryBoxStyle,
        ['dialog_title.label_style']: DialogTitleLabelStyle,
        ['dialogue_with_claw_frame.button_style']: DialogueWithClawFrameButtonStyle,
        ['dialogue.button_style']: DialogueButtonStyle,
        ['diplomacy_offer_player.label_style']: DiplomacyOfferPlayerLabelStyle,
        ['diplomacy_offer_title.label_style']: DiplomacyOfferTitleLabelStyle,
        ['diplomacy_player.label_style']: DiplomacyPlayerLabelStyle,
        ['drop_box_list.list_box_style']: DropBoxListListBoxStyle,
        ['empire_tooltip.gui']: EmpireTooltip,
        ['escape_menu.gui']: EscapeMenu,
        ['exotic_tooltip.gui']: ExoticTooltip,
        ['exotic_factory_deliverable.button_style']: ExoticFactoryDeliverableButtonStyle,
        ['fleet_list.list_box_style']: FleetListListBoxStyle,
        ['fleet_tooltip.gui']: FleetTooltip,
        ['front_end_add_mod_dialog.gui']: FrontEndAddModDialog,
        ['front_end_dialog_title.label_style']: FrontEndDialogTitleLabelStyle,
        ['front_end_dialogue_bar.button_style']: FrontEndDialogueBarButtonStyle,
        ['front_end_game_summary_dialog.gui']: FrontEndGameSummaryDialog,
        ['load_screen.gui']: LoadScreen,
        ['front_end_gdpr_accept_dialog.gui']: FrontEndGdprAcceptDialog,
        ['front_end_intro_movie.gui']: FrontEndIntroMovie,
        ['hud_top_bar.gui']: HudTopBar,
        ['front_end_join_server_with_game_code_dialog.gui']: FrontEndJoinServerWithGameCodeDialog,
        ['front_end_lan_host_new_game_window.gui']: FrontEndLanHostNewGameWindow,
        ['front_end_lan_host_saved_game_window.gui']: FrontEndLanHostSavedGameWindow,
        ['front_end_lan_join_game_window.gui']: FrontEndLanJoinGameWindow,
        ['front_end_lan_window.gui']: FrontEndLanWindow,
        ['front_end_lobby_chat_window.gui']: FrontEndLobbyChatWindow,
        ['front_end_lobby_dialog_player_name.label_style']: FrontEndLobbyDialogPlayerNameLabelStyle,
        ['front_end_lobby_dialog_team_panel_header.label_style']: FrontEndLobbyDialogTeamPanelHeaderLabelStyle,
        ['front_end_lobby_team_count.label_style']: FrontEndLobbyTeamCountLabelStyle,
        ['front_end_lobby_team_panels.list_box_style']: FrontEndLobbyTeamPanelsListBoxStyle,
        ['front_end_message_dialog_message.label_style']: FrontEndMessageDialogMessageLabelStyle,
        ['hud_ship_window.gui']: HudShipWindow,
        ['front_end_message.list_box_style']: FrontEndMessageListBoxStyle,
        ['hud_structures_window.gui']: HudStructuresWindow,
        ['front_end_modding_browse_local_filesystem_window.gui']: FrontEndModdingBrowseLocalFilesystemWindow,
        ['front_end_modding_browse_service_provider_window.gui']: FrontEndModdingBrowseServiceProviderWindow,
        ['front_end_modding_manage_window.gui']: FrontEndModdingManageWindow,
        ['front_end_modding_window.gui']: FrontEndModdingWindow,
        ['front_end_multi_player_host_new_game_window.gui']: FrontEndMultiPlayerHostNewGameWindow,
        ['front_end_multi_player_host_saved_game_window.gui']: FrontEndMultiPlayerHostSavedGameWindow,
        ['front_end_multi_player_join_game_window.gui']: FrontEndMultiPlayerJoinGameWindow,
        ['front_end_multi_player_window.gui']: FrontEndMultiPlayerWindow,
        ['front_end_player_theme_picker_dialog.gui']: FrontEndPlayerThemePickerDialog,
        ['front_end_scenario_picker_filter_label.label_style']: FrontEndScenarioPickerFilterLabelLabelStyle,
        ['front_end_single_player_load_game_window.gui']: FrontEndSinglePlayerLoadGameWindow,
        ['front_end_single_player_new_game_window.gui']: FrontEndSinglePlayerNewGameWindow,
        ['front_end_single_player_window.gui']: FrontEndSinglePlayerWindow,
        ['front_end_title_screen.gui']: FrontEndTitleScreen,
        ['front_end_top_bar.button_style']: FrontEndTopBarButtonStyle,
        ['front_end_version.label_style']: FrontEndVersionLabelStyle,
        ['front_end_watching_view_window.gui']: FrontEndWatchingViewWindow,
        ['front_end_welcome_dialog.gui']: FrontEndWelcomeDialog,
        ['front_end.list_box_style']: FrontEndListBoxStyle,
        ['game_input_action_name.label_style']: GameInputActionNameLabelStyle,
        ['game_input_group_header.label_style']: GameInputGroupHeaderLabelStyle,
        ['gravity_well_tooltip.gui']: GravityWellTooltip,
        ['hud_title.label_style']: HudTitleLabelStyle,
        ['title_screen.label_style']: TitleScreenLabelStyle,
        ['hud_advanced_planet_window.gui']: HudAdvancedPlanetWindow,
        ['hud_advanced_ship_window.gui']: HudAdvancedShipWindow,
        ['hud_bookmarks_window.gui']: HudBookmarksWindow,
        ['hud_bottom_bar.gui']: HudBottomBar,
        ['hud_carrier_window.gui']: HudCarrierWindow,
        ['hud_chat_window.gui']: HudChatWindow,
        ['hud_chat_window.list_box_style']: HudChatWindowListBoxStyle,
        ['hud_chat_window.text_entry_box_style']: HudChatWindowTextEntryBoxStyle,
        ['hud_dark_square.button_style']: HudDarkSquareButtonStyle,
        ['hud_dark_text_display.button_style']: HudDarkTextDisplayButtonStyle,
        ['hud_dark_wide.button_style']: HudDarkWideButtonStyle,
        ['hud_empire_units_window.gui']: HudEmpireUnitsWindow,
        ['hud_exotic_factory_window.gui']: HudExoticFactoryWindow,
        ['hud_feedback_window.gui']: HudFeedbackWindow,
        ['hud_future_orbits_bar.gui']: HudFutureOrbitsBar,
        ['hud_icon_and_text_action.button_style']: HudIconAndTextActionButtonStyle,
        ['hud_icon_and_text.label_style']: HudIconAndTextLabelStyle,
        ['hud_icon_large_exotics.button_style']: HudIconLargeExoticsButtonStyle,
        ['hud_icon_only_action.button_style']: HudIconOnlyActionButtonStyle,
        ['hud_icon_only.label_style']: HudIconOnlyLabelStyle,
        ['hud_icon_wide_opaque.button_style']: HudIconWideOpaqueButtonStyle,
        ['hud_icon_wide.button_style']: HudIconWideButtonStyle,
        ['hud_icon.button_style']: HudIconButtonStyle,
        ['hud_increase_ability_level.button_style']: HudIncreaseAbilityLevelButtonStyle,
        ['hud_notifications_window.gui']: HudNotificationsWindow,
        ['hud_npc_auction_bid.button_style']: HudNpcAuctionBidButtonStyle,
        ['hud_npc_interaction_window.gui']: HudNpcInteractionWindow,
        ['hud_npc_markets_window.gui']: HudNpcMarketsWindow,
        ['hud_npcs_window.gui']: HudNpcsWindow,
        ['hud_phase_resonance_available_points_value.label_style']: HudPhaseResonanceAvailablePointsValueLabelStyle,
        ['hud_phase_resonance_available_points.label_style']: HudPhaseResonanceAvailablePointsLabelStyle,
        ['hud_phase_resonance_level.label_style']: HudPhaseResonanceLevelLabelStyle,
        ['hud_phase_resonance_track_title.label_style']: HudPhaseResonanceTrackTitleLabelStyle,
        ['hud_phase_resonance_window.gui']: HudPhaseResonanceWindow,
        ['hud_planet_window.gui']: HudPlanetWindow,
        ['hud_player_victory_dialog.gui']: HudPlayerVictoryDialog,
        ['hud_players_window.gui']: HudPlayerWindow,
        ['icon_only.button_style']: IconOnlyButtonStyle,
        ['hud_production_window.gui']: HudProductionWindow,
        ['hud_purchase_planet_components_window.gui']: HudPurchasePlanetComponentsWindow,
        ['hud_purchase_ship_components_window.gui']: HudPurchaseShipComponentsWindow,
        ['pip_group_tooltip.gui']: PipGroupTooltip,
        ['hud_replay_window.gui']: HudReplayWindow,
        ['hud_research_subject_icon.button_style']: HudResearchSubjectIconButtonStyle,
        ['hud_research_text_filter.text_entry_box_style']: HudResearchTextFilterTextEntryBoxStyle,
        ['hud_research_window_tier_button.button_style']: HudResearchWindowTierButtonButtonStyle,
        ['hud_research_window.list_box_style']: HudResearchWindowListBoxStyle,
        ['hud_save_game_dialog.gui']: HudSaveGameDialog,
        ['hud_selection_window.gui']: HudSelectionWindow,
        ['hud_title_with_center_text_glow.label_style']: HudTitleWithCenterTextGlowLabelStyle,
        ['hud_title_with_text_glow.label_style']: HudTitleWithTextGlowLabelStyle,
        ['hud_trade_window.gui']: HudTradeWindow,
        ['hud_unit_factory_window.gui']: HudUnitFactoryWindow,
        ['hud_unit_name_large.text_entry_box_style']: HudUnitNameLargeTextEntryBoxStyle,
        ['hud_unit_name_with_dark_background.text_entry_box_style']: HudUnitNameWithDarkBackgroundTextEntryBoxStyle,
    }

    static effects = {
        exhaust_trail_effect: ExhaustTrailEffect,
        beam_effect: BeamEffect,
        shield_effect: ShieldEffect,
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
    }
    static entities = {
        ['.mod_meta_data']: ModMetaData,
        //
        player: Player,
        weapon: Weapon,
        unit_item: UnitItem,
        buff: Buff,
        entity_manifest: EntityManifest,
        research_subject: ResearchSubject,
        formation: Formation,
        exotic: Exotic,
        flight_pattern: FlightPattern,
        ability: Ability,
        action_data_source: ActionDataSource,
        npc_reward: NpcReward,
        unit: Unit,
        unit_skin: UnitSkin,
        localized_text: LocalizedText,
        mesh_material: MeshMaterial,
    }
    static files = {
        ...this.entities,
        ...this.uniforms,
        // ...this.gui, // TODO: Finish this later...
        ...this.effects,
        ...this.misc,
    }

    constructor(languageService, schemaService) {
        super(languageService, schemaService)
        this.DEFAULT_SCHEMA = {
            $schema: 'http://json-schema.org/draft-07/schema',
            type: 'object',
            properties: {},
        }
    }

    async init({ params: params = undefined, fileText: fileText = undefined, gameInstallationFolder: gameInstallationFolder, filePath: filePath = undefined } = {}, cache) {
        let file

        if (typeof params !== 'undefined') {
            file = Utils.getDocumentElement(params.document.uri)
            this.configureSchema(params.document.getText(), file.uri.substring(1), file.name, cache, gameInstallationFolder)
        } else {
            file = Utils.getDocumentElement(filePath)
            this.configureSchema(fileText, file.uri.substring(1), file.name, cache, gameInstallationFolder)
        }
    }

    defineSchema(schema) {
        return this.languageService.configure({
            validate: true,
            schemas: [{ fileMatch: ['*'], schema: schema }],
        })
    }

    configureSchema(fileText, fileExt, fileName, cache, gameInstallationFolder) {
        const Entity = EntityDefinition.files[`${fileName}.${fileExt}`] || EntityDefinition.files[fileExt] || EntityDefinition.files[fileName]
        try {
            if (Entity) {
                return this.defineSchema(new Entity({ fileText: fileText, fileExt: fileExt, fileName: fileName }, EntityDefinition.diagnostics, gameInstallationFolder, cache).create())
            } else {
                EntityDefinition.nonschemed_files.push(`${fileName}.${fileExt}`)
                return this.defineSchema(this.DEFAULT_SCHEMA)
            }
        } catch (err) {
            // Log.error('Error during schema configuration', err)
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
        } catch (ignore) {
            //Log.error("Error during JSON validation: ", err)
        }
    }
}
