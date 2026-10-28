import React from 'react';

/**
 * ChallengeCard Component
 * Displays a single sustainability habit or challenge, its impact, and completion action.
 */
export default function ChallengeCard({ challenge, isCompleted, onComplete }) {
  const { title, description, category, frequency, points, icon, impactLabel } = challenge;

  return (
    <div className={`challenge-card ${isCompleted ? 'completed' : ''}`}>
      <div>
        <div className="challenge-header">
          <span className="challenge-icon">{icon}</span>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="badge-pill badge-points">+{points} pts</span>
            <span className="badge-pill badge-frequency">{frequency}</span>
          </div>
        </div>

        <h3 className="challenge-title">{title}</h3>
        <p className="challenge-desc">{description}</p>

        {impactLabel && (
          <div className="challenge-impact-box">
            <span>🌿</span>
            <span>{impactLabel}</span>
          </div>
        )}
      </div>

      <div className="challenge-footer">
        <span className="badge-pill badge-category">{category}</span>

        {isCompleted ? (
          <div className="completed-badge-label">
            <span>✓ Completed</span>
          </div>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onComplete(challenge)}
          >
            Mark Done
          </button>
        )}
      </div>
    </div>
  );
}
