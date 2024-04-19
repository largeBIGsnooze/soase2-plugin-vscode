const weapon_modifier_types = () => {
    return ['planet_bombing', 'cooldown_duration', 'damage', 'range', 'tracking_speed', 'hull_armor_penetration', 'bypass_shields_chance']
}

const unit_factory_modifier_types = () => {
    return ['build_time']
}

const unit_modifier_types = () => {
    return [
        'hyperspace_speed',
        'shield_point_restore_cooldown_duration_after_damage_taken',
        'ability_antimatter_cost',
        'self_build_time',
        'strikecraft_build_time',
        'credit_income_rate',
        'trade_import_points',
        'culture_rate',
        'culture_resistance_rate',
        'ability_cooldown_duration',
        'damage_taken',
        'experience_given_on_death',
        'armor_strength',
        'hull_point_restore_cooldown_duration_after_damage_taken',
        'shield_burst_restore_cooldown_duration',
        'shield_burst_restore_points',
        'hull_crippled_percentage',
        'armor_point_restore_rate',
        'max_armor_points',
        'max_antimatter',
        'antimatter_restore_rate',
        'max_linear_speed',
        'max_angular_speed',
        'civilian_research_points',
        'military_research_points',
        'max_squadron_capacity',
        'hull_armor',
        'max_hull_points',
        'hull_point_restore_rate',
        'hyperspace_charge_time',
        'max_shield_points',
        'armor_point_restore_cooldown_duration_after_damage_taken',
        'shield_point_restore_rate',
        'shield_mitigation',
        'ship_component_price',
        'experience_gained_from_unit_death',
        'loot_collection_duration',
        'experience_gained_from_loot_collection',
        'experience_gained_from_planet_bombing',
        'max_linear_acceleration',
        'phase_resonance_bonus_duration',
    ]
}

const empire_modifier_types = () => {
    return [
        'research_rate',
        'influence_points_recharge_rate',
        'max_influence_points',
        'crystal_income_rate',
        'metal_income_rate',
        'credit_income_rate',
        'research_time',
        'bounty_increase',
        'npc_reputation_rate_from_dominant_culture',
        'percentage_of_other_players_total_credit_income',
        'trade_credits_income_rate',
        'trade_metal_income_rate',
        'trade_crystal_income_rate',
    ]
}

const planet_modifier_types = () => {
    return [
        'research_rate',
        'research_time',
        'max_influence_points',
        'factory_exotic_build_time',
        'factory_unit_build_time',
        'factory_unit_build_price',
        'max_health_points',
        'bombing_damage_taken',
        'any_development_track_build_price',
        'mining_track_metal_income_rate',
        'buy_crystal_credits_cost',
        'sell_crystal_credits_received',
        'buy_metal_credits_cost',
        'sell_metal_credits_received',
        'max_civilian_structure_slots',
        'structure_build_price',
        'commerce_track_credit_income_rate',
        'structure_build_time',
        'any_development_track_build_time',
        'gravity_well_radius',
        'max_military_structure_slots',
        'mining_track_crystal_income_rate',
        'civilian_research_points',
        'military_research_points',
        'auction_bid_any',
        'culture_rate',
        'culture_resistance_rate',
        'defense_track_build_price',
        'defense_track_build_time',
        'max_garrison_supply',
        'orbital_extraction_crystal_income_rate',
        'orbital_extraction_metal_income_rate',
        'health_points_restore_rate',
        'max_planet_component_slots',
        'planet_component_price',
        'excavation_track_build_price',
        'excavation_track_build_time',
    ]
}

module.exports = {
    weapon_modifier_types,
    unit_modifier_types,
    planet_modifier_types,
    unit_factory_modifier_types,
    empire_modifier_types,
}
