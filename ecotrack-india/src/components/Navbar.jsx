import React, { useState } from 'react';

/**
 * Navbar Component
 * Responsive navigation bar with brand logo, tab switcher, points badge, and mobile toggle.
 */
export default function Navbar({ activeTab, onSelectTab, points }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTabClick = (tabKey) => {
    onSelectTab(tabKey);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'challenges', label: 'Eco Challenges' },
    { key: 'calculator', label: 'Carbon Calculator' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'rewards', label: 'Rewards' },
    { key: 'guide', label: 'Eco Guide' }
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => handleTabClick('home')} role="button" tabIndex={0}>
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
          <span>EcoTrack India</span>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item-btn ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => handleTabClick(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Points Counter & Mobile Menu Button */}
        <div className="nav-actions">
          <div className="points-pill" title="Your Total Eco-Points">
            <span>🌱</span>
            <span>{points} pts</span>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
