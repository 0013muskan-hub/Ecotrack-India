/**
 * EcoTrack India - Local Storage & Data Persistence Utility
 *
 * Provides safe reads, writes, validation, and reset helpers for
 * client-side data persistence in browser LocalStorage.
 */

const STORAGE_KEY = 'ecotrack_india_user_data_v1';

// Default initial state for a brand new user
export const DEFAULT_USER_DATA = {
  points: 0,
  streak: 0,
  lastActiveDate: null,
  completedChallenges: [], // array of { id, completedAt, periodKey, pointsEarned }
  footprintHistory: [],    // array of saved calculation results
  unlockedBadges: [],      // array of unlocked badge IDs
  activityLog: []          // chronological log of actions { id, title, category, points, timestamp }
};

/**
 * Safely loads user data from LocalStorage.
 * Falls back to default state if data is missing, invalid, or corrupted.
 */
export function loadUserData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_USER_DATA };
    }
    const parsed = JSON.parse(raw);
    return {
      points: Number.isFinite(parsed.points) ? parsed.points : 0,
      streak: Number.isFinite(parsed.streak) ? parsed.streak : 0,
      lastActiveDate: parsed.lastActiveDate || null,
      completedChallenges: Array.isArray(parsed.completedChallenges) ? parsed.completedChallenges : [],
      footprintHistory: Array.isArray(parsed.footprintHistory) ? parsed.footprintHistory : [],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
      activityLog: Array.isArray(parsed.activityLog) ? parsed.activityLog : []
    };
  } catch (err) {
    console.error('EcoTrack: Could not parse localStorage data. Using defaults.', err);
    return { ...DEFAULT_USER_DATA };
  }
}

/**
 * Safely saves the user state to LocalStorage.
 */
export function saveUserData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('EcoTrack: Failed to save data to localStorage.', err);
  }
}

/**
 * Completely clears EcoTrack data and resets to blank state.
 */
export function resetUserData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('EcoTrack: Failed to clear localStorage.', err);
  }
  return { ...DEFAULT_USER_DATA };
}

/**
 * Generates a period key for daily or weekly reset logic.
 * Daily key format: "daily-YYYY-MM-DD"
 * Weekly key format: "weekly-YYYY-Wxx"
 */
export function getPeriodKey(frequency = 'daily', date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  if (frequency === 'daily') {
    return `daily-${year}-${month}-${day}`;
  }

  // Calculate approximate ISO week number for weekly challenges
  const startOfYear = new Date(year, 0, 1);
  const pastDaysOfYear = (d - startOfYear) / 86400000;
  const weekNum = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  return `weekly-${year}-W${weekNum}`;
}

/**
 * Checks whether a given challenge has already been completed in the current period.
 * Prevents duplicate points award during the same day or week.
 */
export function isChallengeCompletedInCurrentPeriod(completedChallenges, challengeId, frequency = 'daily') {
  if (!Array.isArray(completedChallenges)) return false;
  const currentPeriod = getPeriodKey(frequency);
  return completedChallenges.some(
    item => item.id === challengeId && item.periodKey === currentPeriod
  );
}

/**
 * Calculates updated streak count based on the last active date and today.
 * If activity was yesterday, increment streak.
 * If activity was today, keep streak.
 * If activity was more than 1 day ago, reset streak to 1.
 */
export function calculateUpdatedStreak(currentStreak, lastActiveDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!lastActiveDate) {
    return 1; // First day active!
  }

  const lastDate = new Date(lastActiveDate);
  lastDate.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Already logged something today
    return Math.max(1, currentStreak);
  } else if (diffDays === 1) {
    // Consecutive day!
    return currentStreak + 1;
  } else {
    // Gap of more than 1 day
    return 1;
  }
}
