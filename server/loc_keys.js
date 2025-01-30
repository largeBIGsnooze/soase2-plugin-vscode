module.exports = {
    SHIP_TAGS: `
ship tag definitions can be found in

\`uniforms/unit_tags.uniforms\`
`,

    TEXTURES: `Name of texture`,
    RESEARCH_TIER: `Research tier`,
    WEAPONS: `
weapon definitions can be found in

\`entities/weapon.entity_manifest\`
`,
    STACKING_OWNERSHIP_TYPE: `
Controls how duplicate instances are grouped together for stacking.

\`per_player\` each player has their own stack.

\`for_all_players\` share the same stack.

\`default=for_all_players\`
`,
    LOCALIZED_TEXT: `
localisation keys can be found in

\`localized_text/en.localized_text\`
`,
    RESEARCH_FIELDS: `Sections of the research tree it will be placed on`,
    ARE_MUTATIONS_FINITE: `
Change how the other parts of the simulation handle these mutations.

For example if finite disabling mutations won't cause other queries to fail based on capabilities of the unit (\`can_hyperspace\`).

\`default=true\``,
    BUFF_AGENT_EFFECT_SIZE_REFERENCE_UNIT: `
determines the action_effect size of the buff agent that is created.

default=\`current_spawner\``,
    IS_CULTURE_PROVIDER: `
Specify whether the buff_agent supports culture_provider functionality or not.

\`default=false\``,

    SUPPORTED_DPIS: `
What DPI this brush natively supports for higher resolution textures.

By convention texture names must be post-fixed with the DPI value to be found.

For example picture.png would also need picture150.png side-by-side if supported DPI of 150 was added.

Typically should be [150, 200] if this feature is being used.`,
    IS_TRANSIENT: `
If true this texture will be loaded and loaded on demand and NOT optimized onto a texture page.

Only make true for large textures that should not stay resident.`,
    MARGINS: `
When stretched will define the 9 pieces that are composited.

https://docs.unity3d.com/Manual/9SliceSprites.html`,
    TILES: `
Allows a brush to consist of multiple distinct pieces.

Typically used for flipbook animations.`,

    IS_CHANGE_GRAVITY_WELL_TO_HYPERSPACE_DESTINATION_ENABLED: `

Set to false if this unit is not intended to live on in the destination gravity well.

For example orbital cannon shell.`,
    HOVERED_STATE: `Normal or default state of the brush`,
    PRESSED_STATE: `The UI element has be pressed, typically indicating the mouse button is down.`,
    FOCUSED_STATE: `
The UI element has focus.
All keyboard input will be directed here before others.`,
    DISABLED_STATE: `The UI element is disabled.`,
    NORMAL_STATE: `The UI element is hovered, typically the mouse cursor is over it.`,
    SHADER_TYPE: `
Control the shader this brush will be rendered with.

Default is \`normal\``,
    OVERWRITE_IDS: 'Whether or not to merge with vanilla definitions',
    BUFF_EMPIRE_MODIFIER_ID: 'id of buff_empire_modifier found in `action_data_source`',
    BUFF_WEAPON_MODIFIER_ID: 'id of buff_weapon_modifier found in `action_data_source`',
    BUFF_UNIT_MODIFIER_ID: 'id of buff_unit_modifier found in `action_data_source`',
    BUFF_PLANET_MODIFIER_ID: 'id of buff_planet_modifier_id found in `action_data_source`',
    BUFF_UNIT_FACTORY_MODIFIER_ID: 'id of unit_factory_modifier found in `action_data_source`',
    APPLY_DAMAGE: 'used for showing torpedo damage on tooltip',
    BUFF_WEAPON_MODIFIER_TAGS: 'If not empty, this modifier will only be applied to weapons that contain one of these tags.',
    HYPERSPACE_BETWEEN_STARS_RESEARCH: 'research required to travel between stars',
    FIELD_COORD: 'The `X` and `Y` coordinates on the research screen.',
    RESEARCH_TIME: 'Time it takes to finish the research subject, in **seconds**',
    EXTRA_ROTATION: 'extra rotation applied to icon (due to icon being reused in selection window)',
    ALPHA_MULTIPLY: 'Alpha multiply the brush texture when this state is active',
    WEAPON_TAGS: 'If not empty, this modifier will only be applied to weapons that contain one of these tags.',
    WORMHOLE_RESEARCH: 'research required to travel through wormholes',
    SPECIAL_OPERATION_NAMES: 'Allows overriding the name when unit is a special operation unit (ex. garrison)',
    CUSTOM_DEBRIS: 'Specific debris are big pieces only meant for this unit.',
    WEAPON_FIRING: 'if not provided the weapon will never fire (handy for simulating turrets that are cosmetic only like an eye)',
    EXECUTION_INTERVAL_COUNT_VALUE: 'Maximum number of executions. If not specified will execute infinitely.',
    EXECUTION_INTERVAL_VALUE: 'Interval between each execution. If not specified will be executed every update.',
    EXECUTIONS_PER_INTERVAL_VALUE: 'How many executions per interval. Default to 1.',
    FIRST_ACTION_DELAY_TIME_VALUE: 'Delay before first execution',
    ACTION_ID: 'optional reference to an action in action_data_source. only applies if this action is part of an action_group!',
    CHANCE_VALUE: `
\`0\`=constraint will never pass

\`1\`=constraint will always pass
`,
    ACTIVE_DURATION: 'This buff will be made dead after this duration time has elapsed',
    MAKE_DEAD_WHEAN_NO_CHILD_BUFFS_EXIST_DELAY_TIME: `
Delay time before make_dead_when_no_child_buffs_exist is evaluated.

Purpose is to allow child buffs time to be created.
`,
    SURFACE_RADIUS: `used for planetes to define the surface for abilities (see action value transform_type: \`surface_radius\`) as the radius of planets extends beyond the surface for gameplay reasons.`,
    STRUCTURE_BUILD_RADIUS: `
Radius taken up when building.

Used to keep structures from one another.

This property will always be empty if doesn't have a "build" component.

It can be set for non-structures but will be unused by the game.
`,
    EASING_FUNCTION: `


[https://www.easings.net]("https://www.easings.net")
`,
    HUD_BUTTON_ICON: `
Icon used on build menu buttons.
Vestigual now that we reuse hud_icon consistently.`,
    WILL_FLEET_RETREET: `
if false fleets will never retreat from battle even if losing.

default=true`,
    ASTEROID_TIERS: `Index of the asteroid set to pick from in \`planet.uniforms\``,
}
