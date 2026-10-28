import React from 'react';

/**
 * ProgressBar Component
 * Accessible visual progress indicator with label and percentage.
 */
export default function ProgressBar({ label, current, max, unit = '', color }) {
  const percentage = max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 0;

  return (
    <div className="progress-container">
      {(label || current !== undefined) && (
        <div className="progress-header">
          <span>{label}</span>
          <span>
            {current} {unit} / {max} {unit} ({percentage}%)
          </span>
        </div>
      )}
      <div className="progress-track" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="progress-fill" 
          style={{ 
            width: `${percentage}%`,
            ...(color ? { background: color } : {})
          }} 
        />
      </div>
    </div>
  );
}
