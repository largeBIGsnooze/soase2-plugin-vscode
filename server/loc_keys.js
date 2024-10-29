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
}
