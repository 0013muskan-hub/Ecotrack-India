import React, { useState } from 'react';
import { calculateFootprint, EMISSION_FACTORS, BENCHMARKS } from '../utils/calculations';

/**
 * Calculator Page
 * Estimates monthly and annual carbon footprint based on Indian household inputs
 * with documented CEA/ARAI factors, input validation, and Local Storage persistence.
 */
export default function Calculator({ userData, onSaveFootprint }) {
  // Check if there is a previously saved calculation to prefill form
  const lastCalculation = userData.footprintHistory && userData.footprintHistory.length > 0
    ? userData.footprintHistory[0]
    : null;

  const [inputs, setInputs] = useState({
    carKm: '',
    bikeKm: '',
    transitKm: '',
    electricityKwh: '',
    lpgCylinders: '',
    householdMembers: '4',
    diet: 'vegetarian'
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(lastCalculation || null);
  const [showAssumptions, setShowAssumptions] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    // Clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    const checkNonNegative = (val, fieldName) => {
      if (val !== '' && (isNaN(val) || Number(val) < 0)) {
        newErrors[fieldName] = 'Please enter a valid non-negative number';
      }
    };

    checkNonNegative(inputs.carKm, 'carKm');
    checkNonNegative(inputs.bikeKm, 'bikeKm');
    checkNonNegative(inputs.transitKm, 'transitKm');
    checkNonNegative(inputs.electricityKwh, 'electricityKwh');
    checkNonNegative(inputs.lpgCylinders, 'lpgCylinders');

    const members = parseInt(inputs.householdMembers, 10);
    if (isNaN(members) || members < 1 || members > 30) {
      newErrors.householdMembers = 'Household members must be between 1 and 30';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate carbon footprint
  const handleCalculate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const calcResult = calculateFootprint(inputs);
    setResult(calcResult);
  };

  // Save calculation to user profile / LocalStorage
  const handleSave = () => {
    if (result) {
      onSaveFootprint(result);
    }
  };

  return (
    <div className="calculator-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Carbon Footprint Calculator</h1>
        <p className="page-subtitle">
          Estimate your personal carbon footprint based on typical Indian travel, domestic electricity, cooking gas, and diet.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Input Form Card */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Enter Your Activity Data
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Provide your weekly travel and monthly utility consumption. Leave blank or enter 0 if not applicable.
          </p>

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label className="form-label" htmlFor="carKm">
                🚗 Car Travel (Petrol/Diesel)
              </label>
              <input
                type="number"
                id="carKm"
                name="carKm"
                className="form-input"
                placeholder="e.g. 50"
                min="0"
                step="any"
                value={inputs.carKm}
                onChange={handleChange}
              />
              <div className="form-hint">Kilometers driven per week by your car or taxi</div>
              {errors.carKm && <div className="form-error">{errors.carKm}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bikeKm">
                🛵 Two-Wheeler (Motorcycle / Scooter)
              </label>
              <input
                type="number"
                id="bikeKm"
                name="bikeKm"
                className="form-input"
                placeholder="e.g. 60"
                min="0"
                step="any"
                value={inputs.bikeKm}
                onChange={handleChange}
              />
              <div className="form-hint">Kilometers ridden per week on motorcycle or scooter</div>
              {errors.bikeKm && <div className="form-error">{errors.bikeKm}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="transitKm">
                🚌 Public Transit (Bus / Metro)
              </label>
              <input
                type="number"
                id="transitKm"
                name="transitKm"
                className="form-input"
                placeholder="e.g. 40"
                min="0"
                step="any"
                value={inputs.transitKm}
                onChange={handleChange}
              />
              <div className="form-hint">Kilometers travelled per week via metro rail or city bus</div>
              {errors.transitKm && <div className="form-error">{errors.transitKm}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="electricityKwh">
                ⚡ Monthly Household Electricity (kWh / Units)
              </label>
              <input
                type="number"
                id="electricityKwh"
                name="electricityKwh"
                className="form-input"
                placeholder="e.g. 180"
                min="0"
                step="any"
                value={inputs.electricityKwh}
                onChange={handleChange}
              />
              <div className="form-hint">Total units (kWh) consumed per month on your electricity bill</div>
              {errors.electricityKwh && <div className="form-error">{errors.electricityKwh}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lpgCylinders">
                🔥 LPG Cooking Cylinders (14.2 kg)
              </label>
              <input
                type="number"
                id="lpgCylinders"
                name="lpgCylinders"
                className="form-input"
                placeholder="e.g. 1"
                min="0"
                step="any"
                value={inputs.lpgCylinders}
                onChange={handleChange}
              />
              <div className="form-hint">Number of domestic LPG cylinders consumed by your home per month</div>
              {errors.lpgCylinders && <div className="form-error">{errors.lpgCylinders}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="householdMembers">
                👥 Household Size (Persons sharing bills)
              </label>
              <input
                type="number"
                id="householdMembers"
                name="householdMembers"
                className="form-input"
                placeholder="4"
                min="1"
                max="30"
                value={inputs.householdMembers}
                onChange={handleChange}
              />
              <div className="form-hint">Electricity and LPG will be divided equally among members</div>
              {errors.householdMembers && <div className="form-error">{errors.householdMembers}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="diet">
                🥗 Primary Diet Preference
              </label>
              <select
                id="diet"
                name="diet"
                className="form-select"
                value={inputs.diet}
                onChange={handleChange}
              >
                <option value="vegetarian">Vegetarian (Dairy & Plant-based)</option>
                <option value="eggetarian">Eggetarian (Vegetarian + Eggs)</option>
                <option value="nonVegetarian">Non-Vegetarian (Poultry/Fish/Meat)</option>
              </select>
              <div className="form-hint">Food production lifecycle carbon estimate</div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Calculate Footprint
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setInputs({
                    carKm: '',
                    bikeKm: '',
                    transitKm: '',
                    electricityKwh: '',
                    lpgCylinders: '',
                    householdMembers: '4',
                    diet: 'vegetarian'
                  });
                  setErrors({});
                }}
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>

        {/* Results & Breakdown Column */}
        <div>
          {result ? (
            <div className="calculator-results">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Your Carbon Footprint Estimate
                </span>
                <button className="btn btn-primary btn-sm" onClick={handleSave}>
                  💾 Save to Dashboard
                </button>
              </div>

              {/* Total Card */}
              <div className="footprint-hero">
                <div className="footprint-total">
                  {result.annualTonnes}
                  <span className="footprint-total-unit"> tonnes CO₂ / yr</span>
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  Approx. <strong>{result.monthlyKg} kg CO₂</strong> every month
                </div>

                {/* Comparison to Indian Average */}
                <div style={{ marginTop: '0.8rem' }}>
                  {result.annualKg <= BENCHMARKS.indiaAverageAnnualKg ? (
                    <span className="footprint-benchmark-pill benchmark-good">
                      ✓ {Math.abs(result.indiaComparisonPercent)}% below India national average (1.9 T/yr)
                    </span>
                  ) : (
                    <span className="footprint-benchmark-pill benchmark-high">
                      ⚠️ {result.indiaComparisonPercent}% above India national average (1.9 T/yr)
                    </span>
                  )}
                </div>
              </div>

              {/* Category Breakdown Progress Bars */}
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.8rem', color: 'var(--text-main)' }}>
                Emissions Breakdown by Source (Annual)
              </h3>

              <div className="chart-container">
                {/* Transport */}
                <div className="chart-bar-item">
                  <div className="chart-bar-header">
                    <span>🚗 Transportation (Car, Bike, Transit)</span>
                    <span>{result.breakdown.transport} kg CO₂</span>
                  </div>
                  <div className="chart-bar-track">
                    <div
                      className="chart-bar-fill bar-transport"
                      style={{
                        width: `${result.annualKg > 0 ? (result.breakdown.transport / result.annualKg) * 100 : 0}%`
                      }}
                    />
                  </div>
                </div>

                {/* Electricity */}
                <div className="chart-bar-item">
                  <div className="chart-bar-header">
                    <span>⚡ Home Electricity (Grid Share)</span>
                    <span>{result.breakdown.electricity} kg CO₂</span>
                  </div>
                  <div className="chart-bar-track">
                    <div
                      className="chart-bar-fill bar-electricity"
                      style={{
                        width: `${result.annualKg > 0 ? (result.breakdown.electricity / result.annualKg) * 100 : 0}%`
                      }}
                    />
                  </div>
                </div>

                {/* LPG */}
                <div className="chart-bar-item">
                  <div className="chart-bar-header">
                    <span>🔥 Cooking Gas (LPG Cylinders)</span>
                    <span>{result.breakdown.lpg} kg CO₂</span>
                  </div>
                  <div className="chart-bar-track">
                    <div
                      className="chart-bar-fill bar-lpg"
                      style={{
                        width: `${result.annualKg > 0 ? (result.breakdown.lpg / result.annualKg) * 100 : 0}%`
                      }}
                    />
                  </div>
                </div>

                {/* Diet */}
                <div className="chart-bar-item">
                  <div className="chart-bar-header">
                    <span>🥗 Food & Diet Lifecycles</span>
                    <span>{result.breakdown.diet} kg CO₂</span>
                  </div>
                  <div className="chart-bar-track">
                    <div
                      className="chart-bar-fill bar-diet"
                      style={{
                        width: `${result.annualKg > 0 ? (result.breakdown.diet / result.annualKg) * 100 : 0}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Actionable Tip based on highest source */}
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                  💡 High-Impact Reduction Advice:
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {result.breakdown.transport > result.breakdown.electricity ? (
                    'Transportation is your largest emission source. Switching just 20% of your two-wheeler or car trips to metro rail, city buses, or walking can reduce your annual footprint significantly.'
                  ) : (
                    'Electricity is your top household emission category. In India, grid power relies heavily on thermal generation. Switching to BEE 5-star appliances, LED lights, and running AC at 24°C will cut both your bills and emissions.'
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧮</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Your Footprint Summary Will Appear Here
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '340px', margin: '0 auto' }}>
                Fill in the details on the left and click <strong>Calculate Footprint</strong> to generate your detailed breakdown.
              </p>
            </div>
          )}

          {/* Transparent Assumptions & Methodology Card */}
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setShowAssumptions(!showAssumptions)}
            >
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                ℹ️ Calculation Assumptions & Emission Factors
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {showAssumptions ? '▲ Hide' : '▼ View Details'}
              </span>
            </div>

            {showAssumptions && (
              <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <p style={{ marginBottom: '0.6rem' }}>
                  <strong>Important Disclaimer:</strong> All values presented are educational estimates calculated using public Indian environmental baselines. Individual emissions vary based on vehicle model, local electricity mix, and driving habits.
                </p>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>
                    <strong>Electricity Grid:</strong> {EMISSION_FACTORS.electricityPerKwh} kg CO₂ / kWh (Source: Central Electricity Authority - CEA Indian Power Sector Baseline v19).
                  </li>
                  <li>
                    <strong>Petrol Car:</strong> {EMISSION_FACTORS.carPerKm} kg CO₂ / km (Source: ARAI average for Indian 1.2L petrol hatchbacks).
                  </li>
                  <li>
                    <strong>Two-Wheeler:</strong> {EMISSION_FACTORS.motorcyclePerKm} kg CO₂ / km (Source: ARAI typical 100-125cc commuter motorcycle).
                  </li>
                  <li>
                    <strong>Public Transit:</strong> {EMISSION_FACTORS.publicTransitPerKm} kg CO₂ / passenger-km (City bus and metro weighted average).
                  </li>
                  <li>
                    <strong>LPG Cooking Cylinder:</strong> {EMISSION_FACTORS.lpgPerCylinder} kg CO₂ per 14.2 kg domestic cylinder (Ministry of Petroleum & Natural Gas combustion factor).
                  </li>
                  <li>
                    <strong>India National Average:</strong> ~{BENCHMARKS.indiaAverageAnnualKg / 1000} tonnes CO₂ per capita per year (IEA / World Bank database).
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
