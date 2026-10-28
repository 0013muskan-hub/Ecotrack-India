import React, { useState } from 'react';

/**
 * Home / Landing Page
 * Features platform hero, key feature showcases, interactive Indian eco tips, and navigation CTAs.
 */
export default function Home({ onNavigate }) {
  const ECO_TIPS = [
    {
      tip: "Set your AC temperature to 24°C instead of 18°C. According to Bureau of Energy Efficiency (BEE) India, every 1°C increase saves approx. 6% electricity!",
      author: "BEE India Standard"
    },
    {
      tip: "Collect the wastewater expelled by your kitchen RO purifier in a bucket. A typical domestic RO wastes 2-3 glasses of water for every glass purified. Use this reject water to mop floors or water decorative plants.",
      author: "Water Conservation Tip"
    },
    {
      tip: "Keep a foldable cloth or jute bag in your vehicle or backpack. Indian households generate over 25,000 tonnes of plastic waste daily, much of it from single-use vegetable carry bags.",
      author: "Waste Reduction Tip"
    },
    {
      tip: "Turn off your Wi-Fi router, TV setup box, and chargers from the master switchboard at night to avoid vampire standby power consumption.",
      author: "Energy Conservation Tip"
    },
    {
      tip: "Segregate household waste at source into green (wet compostable) and blue (dry recyclables). Unsegregated waste in Indian dump yards generates harmful methane gas.",
      author: "Swachh Bharat Guideline"
    }
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % ECO_TIPS.length);
  };

  const currentTip = ECO_TIPS[currentTipIndex];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-tag">
          <span>🇮🇳</span>
          <span>Made for Indian Households & Citizens</span>
        </div>
        <h1 className="hero-title">
          Small Actions. <span className="highlight">Big Impact.</span>
        </h1>
        <p className="hero-subtitle">
          Empowering Indian households to build eco-friendly habits, track daily sustainable actions, 
          and measure environmental footprint with localized Indian benchmarks.
        </p>

        <div className="hero-cta-group">
          <button className="btn btn-primary" onClick={() => onNavigate('challenges')}>
            <span>🚀 Start Tracking Habits</span>
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('calculator')}>
            <span>📊 Calculate Carbon Footprint</span>
          </button>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-box">🌱</div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>Daily Eco Challenges</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Complete actionable daily micro-habits—from cloth shopping bags at the mandi to bucket baths and turning off appliances.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">⚡</div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>India-Specific Calculator</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Compute your monthly and annual carbon emissions using verified Central Electricity Authority (CEA) factors and ARAI vehicle data.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">🏆</div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>Badges & Level Progress</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Earn Eco-Points, level up from Green Seedling to Planet Champion, and unlock badges for consistency and water/energy savings.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">📚</div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>Practical Eco Guide</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Practical knowledge base on waste segregation, RO water reuse, BEE star ratings, and safe e-waste disposal centers in India.
          </p>
        </div>
      </section>

      {/* Tip of the Day Banner */}
      <section className="tip-banner">
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>💡</span>
            <span style={{ fontWeight: 700, color: 'var(--primary-hover)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Eco Tip of the Day
            </span>
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 500, lineHeight: 1.5, marginBottom: '0.4rem' }}>
            "{currentTip.tip}"
          </p>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Source: {currentTip.author}
          </span>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={handleNextTip}>
          <span>Next Tip ↻</span>
        </button>
      </section>

      {/* Sustainability Mission Section */}
      <section className="card" style={{ marginTop: '2rem', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.8rem', color: 'var(--text-main)' }}>
          Why EcoTrack India?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
          India is home to 1.4 billion people. While India's per-capita carbon footprint (~1.9 tonnes CO₂/year) is lower than the global average (~4.7 tonnes), 
          rapid urbanization is increasing resource demands on electricity, freshwater, and waste management. 
          When individuals make deliberate changes—like reducing single-use plastics, saving potable water, and optimizing energy—the collective impact is colossal.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'var(--bg-muted)', padding: '0.8rem 1.2rem', borderRadius: 'var(--radius-md)', flex: 1, minWidth: '200px' }}>
            <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--primary)' }}>1.9 Tonnes</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>India Avg. CO₂ / person / yr</div>
          </div>
          <div style={{ background: 'var(--bg-muted)', padding: '0.8rem 1.2rem', borderRadius: 'var(--radius-md)', flex: 1, minWidth: '200px' }}>
            <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--secondary)' }}>40 Liters</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Water saved per bucket bath</div>
          </div>
          <div style={{ background: 'var(--bg-muted)', padding: '0.8rem 1.2rem', borderRadius: 'var(--radius-md)', flex: 1, minWidth: '200px' }}>
            <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--accent-amber)' }}>24% Power</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cut by BEE 24°C AC setting</div>
          </div>
        </div>
      </section>
    </div>
  );
}
