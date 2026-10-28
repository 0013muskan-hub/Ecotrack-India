/**
 * EcoTrack India - Challenge Definitions
 *
 * Each challenge includes realistic Indian lifestyle context, frequency,
 * points awarded, and transparent educational estimates of environmental savings.
 */

export const CHALLENGES = [
  {
    id: 'c1_bottle',
    title: 'Carry a Reusable Water Bottle',
    description: 'Carry your own stainless steel or copper bottle instead of purchasing packaged plastic water bottles.',
    category: 'Waste & Plastic',
    frequency: 'daily',
    points: 15,
    icon: '🍶',
    impactLabel: 'Avoids 1 PET bottle (~25g plastic)',
    estimatedSavings: {
      plasticItems: 1,
      co2Kg: 0.08,
      waterLiters: 3 // Water footprint of producing 1 PET bottle
    }
  },
  {
    id: 'c2_cloth_bag',
    title: 'Bring Cloth / Jute Bag for Mandi Shopping',
    description: 'Use a durable cloth thaili or jute bag when buying vegetables, fruits, or groceries.',
    category: 'Waste & Plastic',
    frequency: 'daily',
    points: 20,
    icon: '🛍️',
    impactLabel: 'Avoids 2-3 thin polythene bags',
    estimatedSavings: {
      plasticItems: 2,
      co2Kg: 0.05,
      waterLiters: 0
    }
  },
  {
    id: 'c3_waste_segregation',
    title: 'Segregate Wet & Dry Waste at Home',
    description: 'Keep kitchen scraps (wet organic) separate from dry recyclables (paper, plastic, metal) before municipal pickup.',
    category: 'Waste & Plastic',
    frequency: 'daily',
    points: 25,
    icon: '♻️',
    impactLabel: 'Prevents landfill methane & aids recycling',
    estimatedSavings: {
      plasticItems: 1,
      co2Kg: 0.20,
      waterLiters: 0
    }
  },
  {
    id: 'c4_bucket_bath',
    title: 'Take a Bucket Bath Instead of Shower',
    description: 'Use a bucket and mug (15-20L) instead of a 10-minute overhead shower (80-100L).',
    category: 'Water',
    frequency: 'daily',
    points: 20,
    icon: '🪣',
    impactLabel: 'Saves approx. 40-60 Liters of water',
    estimatedSavings: {
      waterLiters: 40,
      co2Kg: 0.03, // Saved borewell/pump motor electricity
      plasticItems: 0
    }
  },
  {
    id: 'c5_tap_off',
    title: 'Turn Off Tap While Brushing & Shaving',
    description: 'Never leave the washbasin tap running continuously while brushing or applying soap.',
    category: 'Water',
    frequency: 'daily',
    points: 15,
    icon: '🚰',
    impactLabel: 'Saves 8-12 Liters per session',
    estimatedSavings: {
      waterLiters: 10,
      co2Kg: 0.01,
      plasticItems: 0
    }
  },
  {
    id: 'c6_ro_water_reuse',
    title: 'Harvest RO Reject or AC Drain Water',
    description: 'Collect wastewater expelled by your domestic RO purifier or AC drain pipe for floor mopping or plants.',
    category: 'Water',
    frequency: 'daily',
    points: 25,
    icon: '💧',
    impactLabel: 'Harvests 15-25 Liters of greywater',
    estimatedSavings: {
      waterLiters: 20,
      co2Kg: 0.02,
      plasticItems: 0
    }
  },
  {
    id: 'c7_switch_off_lights',
    title: 'Switch Off Lights & Fans When Leaving',
    description: 'Develop the reflex to flip switches off whenever you step out of an empty room.',
    category: 'Energy',
    frequency: 'daily',
    points: 15,
    icon: '💡',
    impactLabel: 'Saves ~0.3-0.5 kWh electricity',
    estimatedSavings: {
      co2Kg: 0.25,
      waterLiters: 0,
      plasticItems: 0
    }
  },
  {
    id: 'c8_ac_24_degrees',
    title: 'Set Air Conditioner to 24°C',
    description: 'Run your AC at 24°C (as mandated by BEE India standards) with a ceiling fan for optimal comfort and power saving.',
    category: 'Energy',
    frequency: 'daily',
    points: 20,
    icon: '❄️',
    impactLabel: 'Cuts AC electricity consumption by up to 24%',
    estimatedSavings: {
      co2Kg: 0.85,
      waterLiters: 0,
      plasticItems: 0
    }
  },
  {
    id: 'c9_unplug_chargers',
    title: 'Unplug Idle Chargers & Appliances',
    description: 'Disconnect smartphone chargers, laptop adapters, and TV setup boxes when not in active use.',
    category: 'Energy',
    frequency: 'daily',
    points: 10,
    icon: '🔌',
    impactLabel: 'Eliminates phantom standby power drain',
    estimatedSavings: {
      co2Kg: 0.07,
      waterLiters: 0,
      plasticItems: 0
    }
  },
  {
    id: 'c10_short_walk',
    title: 'Walk or Cycle for Short Trips (< 2 km)',
    description: 'Skip taking the scooter, bike, or auto for nearby neighborhood errands, milk runs, or temple visits.',
    category: 'Mobility',
    frequency: 'daily',
    points: 25,
    icon: '🚶',
    impactLabel: 'Saves ~0.15 kg petrol CO2 emissions',
    estimatedSavings: {
      co2Kg: 0.15,
      waterLiters: 0,
      plasticItems: 0
    }
  },
  {
    id: 'c11_zero_food_waste',
    title: 'Zero Food Waste — Finish Your Thali',
    description: 'Serve only what you need and avoid throwing edible cooked food into the trash.',
    category: 'Lifestyle',
    frequency: 'daily',
    points: 15,
    icon: '🍛',
    impactLabel: 'Prevents landfill organic methane emissions',
    estimatedSavings: {
      co2Kg: 0.30,
      waterLiters: 5,
      plasticItems: 0
    }
  },
  {
    id: 'c12_sun_dry_clothes',
    title: 'Sun-Dry Laundry on Clothesline',
    description: 'Take advantage of natural Indian sunshine rather than running an electric tumble dryer or heavy heat cycle.',
    category: 'Energy',
    frequency: 'daily',
    points: 20,
    icon: '☀️',
    impactLabel: 'Saves 1.2-1.8 kWh drying cycle energy',
    estimatedSavings: {
      co2Kg: 0.85,
      waterLiters: 0,
      plasticItems: 0
    }
  },
  {
    id: 'c13_public_transit_commute',
    title: 'Use Public Transit (Metro / City Bus) for Commute',
    description: 'Replace private car or cab rides with metro or city buses for your work or college travel this week.',
    category: 'Mobility',
    frequency: 'weekly',
    points: 50,
    icon: '🚌',
    impactLabel: 'Avoids ~4.5 kg CO2 vs solo vehicle travel',
    estimatedSavings: {
      co2Kg: 4.50,
      waterLiters: 0,
      plasticItems: 0
    }
  },
  {
    id: 'c14_zero_plastic_week',
    title: 'Zero Single-Use Plastic Shopping Week',
    description: 'Refuse all disposable straws, plastic cups, polythene carry bags, and plastic cutlery for 7 consecutive days.',
    category: 'Waste & Plastic',
    frequency: 'weekly',
    points: 60,
    icon: '🌿',
    impactLabel: 'Diverts ~15 single-use plastic items',
    estimatedSavings: {
      plasticItems: 15,
      co2Kg: 0.50,
      waterLiters: 0
    }
  }
];

export const CATEGORIES = [
  'All',
  'Waste & Plastic',
  'Energy',
  'Water',
  'Mobility',
  'Lifestyle'
];
