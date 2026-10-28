/**
 * EcoTrack India - Environmental Impact & Carbon Calculations
 *
 * NOTE ON METHODOLOGY & DATA SOURCES:
 * - Electricity Grid Factor: 0.71 kg CO2/kWh based on the Central Electricity Authority (CEA)
 *   CO2 Baseline Database for the Indian Power Sector (National grid weighted average).
 * - Petrol Car Factor: 0.17 kg CO2/km based on ARAI/TERI typical Indian 1.2L petrol hatchback.
 * - Two-Wheeler Factor: 0.045 kg CO2/km for typical 100-125cc commuter motorcycle/scooter.
 * - Public Transit: 0.035 kg CO2/passenger-km for urban bus and metro rail in India.
 * - LPG Cylinder: 42.5 kg CO2 per standard domestic 14.2 kg LPG cylinder (MoPNG combustion baseline).
 * - Diet Multipliers: Illustrative benchmark estimates (Vegetarian ~1170 kg CO2e/yr, Non-Veg ~1900 kg CO2e/yr).
 * - Habit savings (water, plastic, electricity) are educational estimates grounded in standard household metrics.
 */

// Official and illustrative Indian emission factors
export const EMISSION_FACTORS = {
  carPerKm: 0.17,             // kg CO2 per km (average petrol car)
  motorcyclePerKm: 0.045,     // kg CO2 per km (average 2-wheeler)
  publicTransitPerKm: 0.035,  // kg CO2 per passenger-km (bus/metro)
  electricityPerKwh: 0.71,    // kg CO2 per kWh (CEA Indian Grid baseline)
  lpgPerCylinder: 42.5,       // kg CO2 per 14.2 kg domestic LPG cylinder
  dietAnnual: {
    vegetarian: 1170,         // kg CO2e per year (~3.2 kg/day)
    eggetarian: 1380,         // kg CO2e per year (~3.8 kg/day)
    nonVegetarian: 1900       // kg CO2e per year (~5.2 kg/day)
  }
};

// National & global annual per-capita emission benchmarks (in kg CO2)
export const BENCHMARKS = {
  indiaAverageAnnualKg: 1900, // ~1.9 metric tonnes CO2 per capita per year (IEA / World Bank data)
  globalAverageAnnualKg: 4700 // ~4.7 metric tonnes CO2 per capita per year
};

/**
 * Calculates carbon footprint breakdown and totals from user inputs.
 * All weekly values are scaled to monthly and annual equivalents.
 */
export function calculateFootprint(inputs) {
  const carKmWeek = Math.max(0, parseFloat(inputs.carKm || 0));
  const bikeKmWeek = Math.max(0, parseFloat(inputs.bikeKm || 0));
  const transitKmWeek = Math.max(0, parseFloat(inputs.transitKm || 0));
  const electricityKwhMonth = Math.max(0, parseFloat(inputs.electricityKwh || 0));
  const lpgCylindersMonth = Math.max(0, parseFloat(inputs.lpgCylinders || 0));
  const householdMembers = Math.max(1, parseInt(inputs.householdMembers || 1, 10));
  const dietType = inputs.diet || 'vegetarian';

  // Annual calculation
  const carAnnualKg = carKmWeek * 52 * EMISSION_FACTORS.carPerKm;
  const bikeAnnualKg = bikeKmWeek * 52 * EMISSION_FACTORS.motorcyclePerKm;
  const transitAnnualKg = transitKmWeek * 52 * EMISSION_FACTORS.publicTransitPerKm;
  const totalTransportAnnualKg = carAnnualKg + bikeAnnualKg + transitAnnualKg;

  // Household electricity & LPG divided by number of household members for per-capita share
  const electricityAnnualKg = (electricityKwhMonth * 12 * EMISSION_FACTORS.electricityPerKwh) / householdMembers;
  const lpgAnnualKg = (lpgCylindersMonth * 12 * EMISSION_FACTORS.lpgPerCylinder) / householdMembers;

  const dietAnnualKg = EMISSION_FACTORS.dietAnnual[dietType] || EMISSION_FACTORS.dietAnnual.vegetarian;

  const totalAnnualKg = totalTransportAnnualKg + electricityAnnualKg + lpgAnnualKg + dietAnnualKg;
  const totalMonthlyKg = totalAnnualKg / 12;
  const totalAnnualTonnes = (totalAnnualKg / 1000).toFixed(2);
  const totalMonthlyTonnes = (totalMonthlyKg / 1000).toFixed(2);

  // Comparison percentage against Indian national average
  const indiaComparisonPercent = Math.round(((totalAnnualKg - BENCHMARKS.indiaAverageAnnualKg) / BENCHMARKS.indiaAverageAnnualKg) * 100);

  return {
    annualKg: Math.round(totalAnnualKg),
    monthlyKg: Math.round(totalMonthlyKg),
    annualTonnes: parseFloat(totalAnnualTonnes),
    monthlyTonnes: parseFloat(totalMonthlyTonnes),
    breakdown: {
      transport: Math.round(totalTransportAnnualKg),
      electricity: Math.round(electricityAnnualKg),
      lpg: Math.round(lpgAnnualKg),
      diet: Math.round(dietAnnualKg)
    },
    transportDetails: {
      car: Math.round(carAnnualKg),
      bike: Math.round(bikeAnnualKg),
      transit: Math.round(transitAnnualKg)
    },
    indiaComparisonPercent,
    calculatedAt: new Date().toISOString()
  };
}

/**
 * Calculates estimated environmental savings derived strictly from completed challenges.
 * Assumptions per challenge:
 * - Water: based on water-saving habits (e.g. bucket bath saves ~40 L).
 * - Plastic: based on single-use items avoided (e.g. reusable bottle/bag saves 1-2 items).
 * - CO2: based on avoided electricity or fuel consumption.
 */
export function calculateSavings(completedChallenges, challengeDefinitions) {
  let co2SavedKg = 0;
  let waterSavedLiters = 0;
  let plasticItemsAvoided = 0;

  // Create lookup dictionary of challenge definitions
  const defMap = {};
  challengeDefinitions.forEach(c => {
    defMap[c.id] = c;
  });

  completedChallenges.forEach(entry => {
    const def = defMap[entry.id];
    if (def && def.estimatedSavings) {
      co2SavedKg += def.estimatedSavings.co2Kg || 0;
      waterSavedLiters += def.estimatedSavings.waterLiters || 0;
      plasticItemsAvoided += def.estimatedSavings.plasticItems || 0;
    }
  });

  return {
    co2SavedKg: parseFloat(co2SavedKg.toFixed(2)),
    waterSavedLiters: Math.round(waterSavedLiters),
    plasticItemsAvoided: Math.round(plasticItemsAvoided)
  };
}

/**
 * Determine user level and title based on total points.
 */
export function getUserLevel(points) {
  if (points < 100) {
    return {
      title: 'Green Seedling',
      level: 1,
      min: 0,
      max: 100,
      progress: Math.min(100, Math.round((points / 100) * 100)),
      nextRank: 'Eco Sprout'
    };
  } else if (points < 300) {
    return {
      title: 'Eco Sprout',
      level: 2,
      min: 100,
      max: 300,
      progress: Math.min(100, Math.round(((points - 100) / 200) * 100)),
      nextRank: 'Earth Guardian'
    };
  } else if (points < 600) {
    return {
      title: 'Earth Guardian',
      level: 3,
      min: 300,
      max: 600,
      progress: Math.min(100, Math.round(((points - 300) / 300) * 100)),
      nextRank: 'Eco Warrior'
    };
  } else if (points < 1000) {
    return {
      title: 'Eco Warrior',
      level: 4,
      min: 600,
      max: 1000,
      progress: Math.min(100, Math.round(((points - 600) / 400) * 100)),
      nextRank: 'Planet Champion'
    };
  } else {
    return {
      title: 'Planet Champion',
      level: 5,
      min: 1000,
      max: 2000,
      progress: 100,
      nextRank: 'Top Tier'
    };
  }
}

/**
 * Badge Definitions with concrete unlock conditions.
 */
export const BADGE_DEFINITIONS = [
  {
    id: 'first_step',
    title: 'First Green Step',
    description: 'Complete your very first sustainability challenge.',
    icon: '🌱',
    category: 'General',
    requirement: '1 challenge completed'
  },
  {
    id: 'eco_pioneer',
    title: 'Eco Pioneer',
    description: 'Earn 100 total Eco-Points across your activities.',
    icon: '🌟',
    category: 'Points',
    requirement: 'Reach 100 Eco-Points'
  },
  {
    id: 'plastic_warrior',
    title: 'Plastic-Free Warrior',
    description: 'Complete 3 plastic or waste-reduction challenges.',
    icon: '🛍️',
    category: 'Waste',
    requirement: '3 waste/plastic challenges'
  },
  {
    id: 'water_saver',
    title: 'Jal Rakshak (Water Saver)',
    description: 'Complete 3 water conservation challenges.',
    icon: '💧',
    category: 'Water',
    requirement: '3 water challenges'
  },
  {
    id: 'energy_master',
    title: 'Urja Mitra (Energy Saver)',
    description: 'Complete 3 electricity conservation challenges.',
    icon: '⚡',
    category: 'Energy',
    requirement: '3 energy challenges'
  },
  {
    id: 'footprint_calculated',
    title: 'Carbon Conscious',
    description: 'Calculate and save your personal carbon footprint.',
    icon: '📊',
    category: 'Calculator',
    requirement: 'Run carbon calculator'
  },
  {
    id: 'streak_starter',
    title: 'Consistency Star',
    description: 'Maintain an active eco-streak of 3 or more days.',
    icon: '🔥',
    category: 'Streak',
    requirement: '3-day active streak'
  },
  {
    id: 'eco_champion',
    title: 'Bharat Eco Champion',
    description: 'Reach 400 Eco-Points and unlock at least 4 other badges.',
    icon: '🏆',
    category: 'Mastery',
    requirement: '400 pts + 4 badges'
  }
];

/**
 * Evaluates which badges should be unlocked based on current user data.
 * Returns array of unlocked badge IDs.
 */
export function checkBadgeUnlocks(userData, challengeDefinitions) {
  const unlocked = new Set(userData.unlockedBadges || []);
  const completed = userData.completedChallenges || [];
  const points = userData.points || 0;
  const streak = userData.streak || 0;
  const footprintHistory = userData.footprintHistory || [];

  // Lookup map for challenge categories
  const catMap = {};
  challengeDefinitions.forEach(c => {
    catMap[c.id] = c.category;
  });

  // 1. First step: completed at least 1 challenge
  if (completed.length >= 1) {
    unlocked.add('first_step');
  }

  // 2. Eco Pioneer: 100 points
  if (points >= 100) {
    unlocked.add('eco_pioneer');
  }

  // 3. Plastic warrior: 3 waste challenges
  const wasteCount = completed.filter(c => catMap[c.id] === 'Waste & Plastic').length;
  if (wasteCount >= 3) {
    unlocked.add('plastic_warrior');
  }

  // 4. Water saver: 3 water challenges
  const waterCount = completed.filter(c => catMap[c.id] === 'Water').length;
  if (waterCount >= 3) {
    unlocked.add('water_saver');
  }

  // 5. Energy master: 3 energy challenges
  const energyCount = completed.filter(c => catMap[c.id] === 'Energy').length;
  if (energyCount >= 3) {
    unlocked.add('energy_master');
  }

  // 6. Carbon Conscious: footprint saved
  if (footprintHistory.length > 0) {
    unlocked.add('footprint_calculated');
  }

  // 7. Consistency Star: 3 day streak
  if (streak >= 3) {
    unlocked.add('streak_starter');
  }

  // 8. Eco Champion: 400 points + at least 4 other badges
  if (points >= 400 && unlocked.size >= 4) {
    unlocked.add('eco_champion');
  }

  return Array.from(unlocked);
}
