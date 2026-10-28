import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import Calculator from './pages/Calculator';
import Analytics from './pages/Analytics';
import Rewards from './pages/Rewards';
import EcoGuide from './pages/EcoGuide';

// Storage & Calculations
import {
  loadUserData,
  saveUserData,
  resetUserData,
  getPeriodKey,
  isChallengeCompletedInCurrentPeriod,
  calculateUpdatedStreak
} from './utils/storage';
import { checkBadgeUnlocks } from './utils/calculations';
import { CHALLENGES } from './utils/challengesData';

/**
 * Main Application Root
 * Coordinates global navigation, state management, LocalStorage synchronization, and toast alerts.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userData, setUserData] = useState(() => loadUserData());
  const [toasts, setToasts] = useState([]);

  // Persist userData changes to LocalStorage
  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  // Helper to trigger temporary toast alerts
  const showToast = (message, type = 'success', icon = '✓') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Challenge completion handler with period duplicate prevention
  const handleCompleteChallenge = (challenge) => {
    const isAlreadyDone = isChallengeCompletedInCurrentPeriod(
      userData.completedChallenges,
      challenge.id,
      challenge.frequency
    );

    if (isAlreadyDone) {
      showToast(`Already completed for this ${challenge.frequency} period!`, 'info', 'ℹ️');
      return;
    }

    const now = new Date();
    const periodKey = getPeriodKey(challenge.frequency, now);
    const updatedStreak = calculateUpdatedStreak(userData.streak, userData.lastActiveDate);
    const updatedPoints = userData.points + challenge.points;

    const newCompletion = {
      id: challenge.id,
      completedAt: now.toISOString(),
      periodKey,
      pointsEarned: challenge.points
    };

    const newLogItem = {
      id: Date.now(),
      title: challenge.title,
      category: challenge.category,
      points: challenge.points,
      timestamp: now.toISOString()
    };

    const nextCompleted = [newCompletion, ...(userData.completedChallenges || [])];
    const nextLog = [newLogItem, ...(userData.activityLog || [])];

    const interimUserData = {
      ...userData,
      points: updatedPoints,
      streak: updatedStreak,
      lastActiveDate: now.toISOString(),
      completedChallenges: nextCompleted,
      activityLog: nextLog
    };

    // Check if new badges unlock with this action
    const oldUnlocked = new Set(userData.unlockedBadges || []);
    const updatedBadges = checkBadgeUnlocks(interimUserData, CHALLENGES);

    // Identify newly unlocked badges for celebration
    const newlyUnlocked = updatedBadges.filter((bId) => !oldUnlocked.has(bId));

    const finalUserData = {
      ...interimUserData,
      unlockedBadges: updatedBadges
    };

    setUserData(finalUserData);
    showToast(`Completed: ${challenge.title} (+${challenge.points} pts)`, 'success', '🌱');

    if (newlyUnlocked.length > 0) {
      setTimeout(() => {
        showToast(`New Achievement Badge Unlocked! Check Rewards.`, 'success', '🏆');
      }, 700);
    }
  };

  // Footprint calculation save handler
  const handleSaveFootprint = (calcResult) => {
    const nextHistory = [calcResult, ...(userData.footprintHistory || [])];
    const interimUserData = {
      ...userData,
      footprintHistory: nextHistory
    };

    // Dynamic badge evaluation (unlocks "Carbon Conscious")
    const updatedBadges = checkBadgeUnlocks(interimUserData, CHALLENGES);

    const finalUserData = {
      ...interimUserData,
      unlockedBadges: updatedBadges
    };

    setUserData(finalUserData);
    showToast('Carbon Footprint saved to your profile!', 'success', '💾');
  };

  // Data reset handler
  const handleResetData = () => {
    const cleared = resetUserData();
    setUserData(cleared);
    showToast('All data has been reset to default.', 'info', '🔄');
  };

  // Tab switching helper with smooth scroll to top
  const handleNavigate = (tabKey) => {
    setActiveTab(tabKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        points={userData.points}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'home' && <Home onNavigate={handleNavigate} />}
        {activeTab === 'dashboard' && (
          <Dashboard
            userData={userData}
            onNavigate={handleNavigate}
            onResetData={handleResetData}
          />
        )}
        {activeTab === 'challenges' && (
          <Challenges
            userData={userData}
            onCompleteChallenge={handleCompleteChallenge}
          />
        )}
        {activeTab === 'calculator' && (
          <Calculator
            userData={userData}
            onSaveFootprint={handleSaveFootprint}
          />
        )}
        {activeTab === 'analytics' && (
          <Analytics
            userData={userData}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'rewards' && (
          <Rewards
            userData={userData}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'guide' && <EcoGuide />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div>
            <div style={{ fontWeight: 800, color: 'var(--primary-hover)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
              EcoTrack India
            </div>
            <p className="footer-copy">
              "Small Actions. Big Impact." • Built for Indian households and sustainability advocates.
            </p>
          </div>

          <ul className="footer-links">
            <li>
              <button className="footer-link-btn" onClick={() => handleNavigate('home')}>
                Home
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNavigate('dashboard')}>
                Dashboard
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNavigate('challenges')}>
                Challenges
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNavigate('calculator')}>
                Calculator
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => handleNavigate('guide')}>
                Eco Guide
              </button>
            </li>
          </ul>
        </div>
      </footer>

      {/* Floating Toast Alerts */}
      <Toast toasts={toasts} />
    </div>
  );
}
