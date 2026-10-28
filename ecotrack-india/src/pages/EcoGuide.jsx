import React, { useState } from 'react';

/**
 * EcoGuide Page
 * Educational resource hub with actionable sustainability guides for Indian households.
 * Includes search filter and category navigation.
 */
export default function EcoGuide() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const GUIDES = [
    {
      id: 'g1_waste',
      category: 'Waste Management',
      title: 'Home Waste Segregation: Green, Blue & Black Bins',
      icon: '♻️',
      summary: 'Master the 2-bin & 3-bin rule practiced across Indian municipalities under Swachh Bharat Mission.',
      keyPoints: [
        'Green Bin (Wet Waste): Cooked food scraps, fruit/vegetable peels, tea leaves, eggshells, garden clippings. Compostable within 30-45 days.',
        'Blue Bin (Dry Waste): Milk packets (rinsed and dried), newspapers, cardboard, metal cans, plastic wrappers, glass bottles.',
        'Red/Black Bin (Hazardous/Sanitary): Diapers, sanitary pads, expired medicine strips, tube lights, paints, and insecticide bottles.',
        'Pro-Tip: Always rinse milk pouches and yogurt tubs with a little water before tossing into the dry bin to prevent foul smells and pest infestations.'
      ]
    },
    {
      id: 'g2_water',
      category: 'Water Conservation',
      title: 'Tackling the Urban Water Crisis: Simple Home Practices',
      icon: '💧',
      summary: 'Conserve municipal supply and groundwater through proven low-effort modifications.',
      keyPoints: [
        'Bucket Bath vs Shower: A standard overhead shower delivers 10-15 liters per minute. A bucket and mug uses just 15-20 liters total, saving over 50 liters every bath.',
        'RO Reject Water: Domestic reverse osmosis purifiers discard 2 to 3 liters of water for every liter purified. Route the reject pipe into a 20L plastic drum to use for toilet flushing and floor washing.',
        'Faucet Aerators: Install affordable screw-on aerators (costing ~₹100-150) on washbasin and kitchen taps to reduce water flow by 40% without compromising pressure.',
        'Fixing Dripping Taps: A faucet dripping at 1 drop per second loses over 3,000 liters of freshwater each year.'
      ]
    },
    {
      id: 'g3_energy',
      category: 'Energy Efficiency',
      title: 'BEE Star Ratings & The 24°C Air Conditioner Rule',
      icon: '⚡',
      summary: 'Cut electricity utility bills while reducing reliance on coal-heavy thermal grid power.',
      keyPoints: [
        'The 24°C AC Standard: Running an air conditioner at 24°C instead of 18°C or 20°C provides optimal thermal comfort when paired with a slow ceiling fan, while consuming 20-25% less units.',
        'BEE Star Ratings: Always check the Bureau of Energy Efficiency (BEE) star label when purchasing refrigerators, geysers, or air conditioners. A 5-star appliance pays for its premium within 18 months.',
        'LED Lighting: Replace incandescent bulbs and CFLs with LEDs. A 9W LED provides the same lumen output as a 60W tungsten bulb while lasting 5 times longer.',
        'Instant Geyser Management: Switch geysers off immediately once water is heated. Storage geysers keep reheating water in standby cycles, silently driving up peak electricity consumption.'
      ]
    },
    {
      id: 'g4_reusable',
      category: 'Plastic-Free Living',
      title: 'Indian Traditional Alternatives to Single-Use Plastics',
      icon: '🛍️',
      summary: 'Reviving time-tested, sustainable Indian practices that keep plastics out of landfills.',
      keyPoints: [
        'The Humble Cloth Thaili: Keep two foldable cotton or jute bags inside your scooter boot or purse for impromptu vegetable and kirana shopping.',
        'Stainless Steel Dabbas: Indian stainless steel tiffin boxes and containers are completely non-toxic, infinitely reusable, and replace flimsy plastic takeaway containers.',
        'Clay Matkas / Earthen Pots: In hot months, terracotta matkas chill drinking water naturally through evaporative cooling, eliminating the need for refrigerated plastic bottles.',
        'Refuse Plastic Cutlery: When ordering food through delivery apps, uncheck the "Add disposable cutlery" option and use household spoons and forks.'
      ]
    },
    {
      id: 'g5_ewaste',
      category: 'E-Waste Disposal',
      title: 'Safe E-Waste Management & CPCB Recycling Centers',
      icon: '📱',
      summary: 'Properly disposing of old smartphones, chargers, dead batteries, and electronic appliances.',
      keyPoints: [
        'Never Trash Batteries: Alkaline and lithium-ion batteries leak toxic lead, mercury, and cadmium into groundwater when dumped in municipal garbage.',
        'CPCB Authorized E-Waste Centers: Under the E-Waste Management Rules, electronics manufacturers must provide take-back drop-off bins at authorized service centers and retail electronics showrooms (like Croma and Reliance Digital).',
        'Bulk Cables and Chargers: Gather uncoiled broken charging cables and adapter bricks in a cardboard box and drop them off during authorized neighborhood e-waste collection drives.',
        'Device Wipe Before Handover: Always perform a factory reset and remove memory/SIM cards before recycling any smartphone or computer.'
      ]
    }
  ];

  const guideCategories = ['All', 'Waste Management', 'Water Conservation', 'Energy Efficiency', 'Plastic-Free Living', 'E-Waste Disposal'];

  // Filter based on category and search query
  const filteredGuides = GUIDES.filter((guide) => {
    const matchesCat = activeCategory === 'All' || guide.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' ||
      guide.title.toLowerCase().includes(query) ||
      guide.summary.toLowerCase().includes(query) ||
      guide.keyPoints.some((p) => p.toLowerCase().includes(query));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="eco-guide-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Indian Sustainability Eco Guide</h1>
        <p className="page-subtitle">
          Practical, actionable knowledge base designed for everyday Indian households, apartment complexes, and urban centers.
        </p>
      </div>

      {/* Search Bar & Categories */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ maxWidth: '600px', marginBottom: '1.2rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="🔍 Search guides (e.g. AC 24 degrees, RO water, dry waste, batteries)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          {guideCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guides List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredGuides.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔎</div>
            <h3 className="empty-state-title">No matching guides found</h3>
            <p className="empty-state-desc">
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredGuides.map((guide) => (
            <div key={guide.id} className="card" style={{ padding: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '2rem' }}>{guide.icon}</span>
                <div>
                  <span className="badge-pill badge-category" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                    {guide.category}
                  </span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
                    {guide.title}
                  </h2>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.2rem', fontStyle: 'italic' }}>
                {guide.summary}
              </p>

              <div style={{ background: 'var(--bg-muted)', padding: '1.2rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Actionable Implementation Steps:
                </div>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {guide.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
