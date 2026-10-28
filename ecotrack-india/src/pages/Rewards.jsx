import React from 'react';
import { BADGE_DEFINITIONS } from '../utils/calculations';

/**
 * Rewards Page
 * Badges & achievements gallery showcasing unlocked accomplishments and locked goals.
 */
export default function Rewards({ userData, onNavigate }) {
  const unlockedBadges = new Set(userData.unlockedBadges || []);
  const totalBadges = BADGE_DEFINITIONS.length;
  const unlockedCount = unlockedBadges.size;
  const progressPercent = Math.round((unlockedCount / totalBadges) * 100);

  return (
    <div className="rewards-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Rewards & Badges</h1>
        <p className="page-subtitle">
          Earn recognition badges as you adopt sustainable lifestyle habits and hit eco milestones.
        </p>
      </div>

      {/* Badges Progress Summary Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.2rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div>
          <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', color: '#93c5fd', fontWeight: 700, marginBottom: '0.2rem' }}>
            Achievements Gallery
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {unlockedCount} of {totalBadges} Badges Unlocked ({progressPercent}%)
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            {unlockedCount === totalBadges
              ? 'Incredible! You have unlocked every single EcoTrack India badge!'
              : `Unlock ${totalBadges - unlockedCount} more badges by staying active and taking on diverse challenges.`}
          </p>
        </div>

        <div style={{ minWidth: '220px' }}>
          <div style={{ height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: '#60a5fa',
                width: `${progressPercent}%`,
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>
      </div>

      {/* Badges Gallery Grid */}
      <div className="badges-grid">
        {BADGE_DEFINITIONS.map((badge) => {
          const isUnlocked = unlockedBadges.has(badge.id);

          return (
            <div
              key={badge.id}
              className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="badge-icon-lg">{badge.icon}</div>

              <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.5rem' }}>
                <span className="badge-pill badge-category">{badge.category}</span>
                {isUnlocked ? (
                  <span className="badge-pill badge-points" style={{ background: '#dcfce7', color: '#15803d' }}>
                    ✓ Unlocked
                  </span>
                ) : (
                  <span className="badge-pill" style={{ background: '#f1f5f9', color: '#64748b' }}>
                    🔒 Locked
                  </span>
                )}
              </div>

              <h3 className="badge-name">{badge.title}</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.8rem', flex: 1 }}>
                {badge.description}
              </p>

              <div
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isUnlocked ? '#ecfdf5' : '#f8fafc',
                  border: isUnlocked ? '1px solid #a7f3d0' : '1px solid var(--border-color)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: isUnlocked ? '#065f46' : 'var(--text-subtle)'
                }}
              >
                Requirement: {badge.requirement}
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivation Callout */}
      <div className="card" style={{ marginTop: '2.5rem', textAlign: 'center', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          Want to unlock more badges?
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 1.2rem auto' }}>
          Explore water saving, waste segregation, and electricity conservation challenges today!
        </p>
        <button className="btn btn-primary" onClick={() => onNavigate('challenges')}>
          Go to Eco Challenges →
        </button>
      </div>
    </div>
  );
}
