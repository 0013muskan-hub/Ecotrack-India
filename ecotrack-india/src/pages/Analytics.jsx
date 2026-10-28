import React from 'react';
import { calculateSavings, getUserLevel } from '../utils/calculations';
import { CHALLENGES } from '../utils/challengesData';
import ProgressBar from '../components/ProgressBar';

/**
 * Analytics Page
 * Detailed visual progress, category breakdown, milestone targets,
 * and complete chronological activity log using pure CSS & JS.
 */
export default function Analytics({ userData, onNavigate }) {
  const { points = 0, completedChallenges = [], activityLog = [] } = userData;
  const savings = calculateSavings(completedChallenges, CHALLENGES);
  const levelInfo = getUserLevel(points);

  // Group completed challenges by category
  const categoryCounts = {
    'Waste & Plastic': 0,
    'Energy': 0,
    'Water': 0,
    'Mobility': 0,
    'Lifestyle': 0
  };

  const challengeMap = {};
  CHALLENGES.forEach((c) => {
    challengeMap[c.id] = c;
  });

  completedChallenges.forEach((entry) => {
    const c = challengeMap[entry.id];
    if (c && categoryCounts[c.category] !== undefined) {
      categoryCounts[c.category] += 1;
    }
  });

  const totalCompleted = completedChallenges.length;

  // Milestone targets
  const milestones = [
    { target: 100, label: 'First Century (100 pts)', icon: '🌱' },
    { target: 250, label: 'Eco Enthusiast (250 pts)', icon: '🌿' },
    { target: 500, label: 'Green Guardian (500 pts)', icon: '🌳' },
    { target: 1000, label: 'Planet Champion (1000 pts)', icon: '👑' }
  ];

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Progress & Analytics</h1>
        <p className="page-subtitle">
          In-depth breakdown of your sustainable actions, environmental contributions, and milestone achievements.
        </p>
      </div>

      {/* Cumulative Impact Cards */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>CUMULATIVE CO₂ AVOIDED</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-hover)', margin: '0.3rem 0' }}>
            {savings.co2SavedKg} <span style={{ fontSize: '1rem', fontWeight: 500 }}>kg CO₂</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
            Equivalent to approx. {Math.round(savings.co2SavedKg / 0.17)} km of avoided petrol car travel
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>FRESHWATER SAVED</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0369a1', margin: '0.3rem 0' }}>
            {savings.waterSavedLiters} <span style={{ fontSize: '1rem', fontWeight: 500 }}>Liters</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
            Equivalent to approx. {Math.round(savings.waterSavedLiters / 20)} domestic water buckets
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #d97706' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>PLASTICS DIVERTED</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#b45309', margin: '0.3rem 0' }}>
            {savings.plasticItemsAvoided} <span style={{ fontSize: '1rem', fontWeight: 500 }}>items</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
            Single-use bottles, pouches & carry bags refused
          </div>
        </div>
      </div>

      {/* Milestone Trackers & Category Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Milestone Targets */}
        <div className="card">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
            Eco-Point Milestones
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
            Your journey toward becoming a recognized Planet Champion.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {milestones.map((ms) => {
              const achieved = points >= ms.target;
              return (
                <div key={ms.target}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    <span>{ms.icon} {ms.label}</span>
                    <span style={{ color: achieved ? 'var(--primary)' : 'var(--text-muted)' }}>
                      {achieved ? '✓ Achieved!' : `${points} / ${ms.target} pts`}
                    </span>
                  </div>
                  <ProgressBar
                    current={Math.min(points, ms.target)}
                    max={ms.target}
                    color={achieved ? 'var(--primary)' : undefined}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Habit Category Distribution */}
        <div className="card">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
            Habits by Category
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
            Distribution of your completed sustainability tasks across focus areas.
          </p>

          {totalCompleted === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
              Complete challenges to view your category distribution.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(categoryCounts).map(([catName, count]) => {
                const percent = Math.round((count / totalCompleted) * 100);
                return (
                  <div key={catName}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      <span>{catName}</span>
                      <span>{count} completed ({percent}%)</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Activity History Feed Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Full Activity Log</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Chronological log of all recorded actions and Eco-Points earned.
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Total Entries: {activityLog.length}
          </span>
        </div>

        {activityLog.length === 0 ? (
          <div className="empty-state" style={{ padding: '2.5rem 1rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>No activities recorded yet.</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: '0.8rem' }} onClick={() => onNavigate('challenges')}>
              Log Your First Habit
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="activity-feed-table">
              <thead>
                <tr>
                  <th>Action / Habit</th>
                  <th>Category</th>
                  <th>Points</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {activityLog.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      🌱 {item.title}
                    </td>
                    <td>
                      <span className="badge-pill badge-category" style={{ fontSize: '0.75rem' }}>
                        {item.category || 'Habit'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      +{item.points} pts
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {new Date(item.timestamp).toLocaleString([], {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
