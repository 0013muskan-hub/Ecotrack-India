import React from 'react';

/**
 * StatCard Component
 * Displays a single key metric with an icon, numeric value, unit, and explanatory subtitle.
 */
export default function StatCard({ icon, label, value, unit, subtitle, iconBg }) {
  return (
    <div className="stat-card">
      <div 
        className="stat-icon-wrapper" 
        style={iconBg ? { backgroundColor: iconBg } : undefined}
      >
        <span>{icon}</span>
      </div>
      <div className="stat-info">
        <div className="stat-label">{label}</div>
        <div className="stat-value">
          {value}
          {unit && <span className="stat-unit">{unit}</span>}
        </div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}
