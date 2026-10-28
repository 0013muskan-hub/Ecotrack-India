import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { calculateSavings, getUserLevel } from '../utils/calculations';
import { CHALLENGES } from '../utils/challengesData';

/**
 * Dashboard Page
 * Displays user's live sustainability metrics, environmental savings,
 * weekly activity chart, recent activity feed, and reset data modal.
 */
export default function Dashboard({ userData, onNavigate, onResetData }) {
  const [showResetModal, setShowResetModal] = useState(false);

  const { points = 0, streak = 0, completedChallenges = [], activityLog = [] } = userData;
  
  // Derive environmental savings strictly from completed challenges
  const savings = calculateSavings(completedChallenges, CHALLENGES);
  
  // Calculate level info
  const levelInfo = getUserLevel(points);

  // Group last 7 days of activities for the weekly bar chart
  const getWeeklyActivityData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    const today = new Date();

    // Map the last 7 days
    const weekDays = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dayName = days[d.getDay()];
      const dateStr = d.toISOString().split('T')[0];
      weekDays.push({ dayName, dateStr, count: 0 });
    }

    // Populate counts from activityLog
    activityLog.forEach((item) => {
      if (item.timestamp) {
        const itemDateStr = item.timestamp.split('T')[0];
        const match = weekDays.find((w) => w.dateStr === itemDateStr);
        if (match) {
          match.count += 1;
        }
      }
    });

    const maxCount = Math.max(1, ...weekDays.map((w) => w.count));

    return { weekDays, maxCount };
  };

  const { weekDays, maxCount } = getWeeklyActivityData();
  const isNewUser = completedChallenges.length === 0 && (!userData.footprintHistory || userData.footprintHistory.length === 0);

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">Sustainability Dashboard</h1>
          <p className="page-subtitle">Track your environmental progress and verified habit savings.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('challenges')}>
            + Log Habit
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => setShowResetModal(true)}>
            Reset Data
          </button>
        </div>
      </div>

      {/* User Level Rank Banner */}
      <div className="level-banner">
        <div className="level-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🏅</span>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', opacity: 0.9 }}>
              Level {levelInfo.level} Rank
            </span>
          </div>
          <h3>{levelInfo.title}</h3>
          <p>
            {points >= 1000
              ? 'You have reached the highest tier! Keep inspiring others.'
              : `${levelInfo.max - points} more Eco-Points to reach "${levelInfo.nextRank}"`}
          </p>
        </div>

        <div className="level-progress-box">
          <ProgressBar
            label="Level Progress"
            current={points}
            max={levelInfo.max}
            unit="pts"
          />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="stats-grid">
        <StatCard
          icon="🌱"
          label="Total Eco-Points"
          value={points}
          unit="pts"
          subtitle="Earned from verified habits"
        />
        <StatCard
          icon="🔥"
          label="Current Streak"
          value={streak}
          unit={streak === 1 ? 'day' : 'days'}
          subtitle={streak > 0 ? 'Active daily consistency' : 'Log a challenge to start'}
          iconBg="#fef3c7"
        />
        <StatCard
          icon="✓"
          label="Challenges Completed"
          value={completedChallenges.length}
          subtitle="Total tasks finished"
          iconBg="#e0f2fe"
        />
        <StatCard
          icon="☁️"
          label="Est. CO₂ Avoided"
          value={savings.co2SavedKg}
          unit="kg"
          subtitle="Calculated from your habits"
          iconBg="#dcfce7"
        />
      </div>

      {/* Environmental Savings Highlight Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
          Direct Environmental Savings
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.2rem' }}>
          These cumulative savings are calculated from your completed daily & weekly challenges using documented factors.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--primary-subtle)', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-hover)' }}>
              {savings.co2SavedKg} <span style={{ fontSize: '1rem', fontWeight: 600 }}>kg</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)' }}>CO₂ Emissions Avoided</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              From power & transit habits
            </div>
          </div>

          <div style={{ background: '#f0f9ff', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid #bae6fd' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0369a1' }}>
              {savings.waterSavedLiters} <span style={{ fontSize: '1rem', fontWeight: 600 }}>Liters</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0284c7' }}>Freshwater Conserved</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              From bucket baths & tap habits
            </div>
          </div>

          <div style={{ background: '#fef3c7', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid #fde68a' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#b45309' }}>
              {savings.plasticItemsAvoided} <span style={{ fontSize: '1rem', fontWeight: 600 }}>items</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#d97706' }}>Plastic Items Diverted</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Bottles & polythene bags saved
            </div>
          </div>
        </div>
      </div>

      {/* New User Welcome Empty State */}
      {isNewUser && (
        <div className="empty-state" style={{ marginBottom: '2rem' }}>
          <div className="empty-state-icon">👋🌱</div>
          <h3 className="empty-state-title">Welcome to EcoTrack India!</h3>
          <p className="empty-state-desc">
            You don't have any logged activities yet. Follow these 3 simple steps to start building your eco-friendly lifestyle:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: '750px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <strong>1. Mark a Daily Habit</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Go to Challenges and mark your first habit (like carrying a water bottle).
              </p>
            </div>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <strong>2. Calculate Footprint</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Use our India-specific calculator to check your transport & power footprint.
              </p>
            </div>
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <strong>3. Unlock Badges</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Earn badges as you hit consistency streaks and points milestones.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate('challenges')}>
            Start Your First Challenge →
          </button>
        </div>
      )}

      {/* Weekly Activity & Recent Feed Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Weekly Activity Pure CSS Chart */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem' }}>Weekly Habit Activity</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Number of eco-habits completed each day over the past 7 days.
          </p>

          <div className="weekly-chart-wrapper">
            {weekDays.map((item, idx) => {
              const heightPercent = maxCount > 0 ? Math.max(8, Math.round((item.count / maxCount) * 100)) : 8;
              return (
                <div key={idx} className="weekly-col">
                  {item.count > 0 && <span className="weekly-col-val">{item.count}</span>}
                  <div
                    className="weekly-col-bar"
                    style={{ height: `${heightPercent}%` }}
                    title={`${item.count} activities on ${item.dayName} (${item.dateStr})`}
                  />
                  <span className="weekly-col-label">{item.dayName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Recent Activities</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('analytics')}>
              View All
            </button>
          </div>

          {activityLog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No recent activities logged yet.
            </div>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activityLog.slice(0, 5).map((logItem) => (
                <li
                  key={logItem.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.8rem',
                    background: 'var(--bg-muted)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span>🌱</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{logItem.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                        {new Date(logItem.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                        {new Date(logItem.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>
                    +{logItem.points} pts
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Resetting Data */}
      {showResetModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <h3 className="modal-title">Reset All EcoTrack Data?</h3>
            <p className="modal-desc">
              This will erase all your saved points, streak count, completed challenges, and carbon footprint calculations from this browser's Local Storage. 
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowResetModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  onResetData();
                  setShowResetModal(false);
                }}
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
