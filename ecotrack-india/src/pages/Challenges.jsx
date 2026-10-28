import React, { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import { CHALLENGES, CATEGORIES } from '../utils/challengesData';
import { isChallengeCompletedInCurrentPeriod } from '../utils/storage';

/**
 * Challenges Page
 * Allows users to browse and complete daily and weekly sustainability challenges.
 * Includes category and status filtering, duplicate prevention, and point awards.
 */
export default function Challenges({ userData, onCompleteChallenge }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFrequency, setSelectedFrequency] = useState('all'); // 'all', 'daily', 'weekly'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'completed'

  const completedList = userData.completedChallenges || [];

  // Filter challenges based on user selections
  const filteredChallenges = CHALLENGES.filter((challenge) => {
    // 1. Category filter
    if (selectedCategory !== 'All' && challenge.category !== selectedCategory) {
      return false;
    }

    // 2. Frequency filter
    if (selectedFrequency !== 'all' && challenge.frequency !== selectedFrequency) {
      return false;
    }

    // 3. Status filter
    const isDone = isChallengeCompletedInCurrentPeriod(completedList, challenge.id, challenge.frequency);
    if (statusFilter === 'pending' && isDone) return false;
    if (statusFilter === 'completed' && !isDone) return false;

    return true;
  });

  const totalCompletedCount = CHALLENGES.filter((c) =>
    isChallengeCompletedInCurrentPeriod(completedList, c.id, c.frequency)
  ).length;

  return (
    <div className="challenges-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Eco Challenges & Habits</h1>
        <p className="page-subtitle">
          Take on actionable daily and weekly challenges designed for Indian households. 
          Earn Eco-Points and track your real environmental impact.
        </p>
      </div>

      {/* Summary Banner */}
      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '1.8rem' }}>🎯</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-hover)' }}>
              {totalCompletedCount} of {CHALLENGES.length} Challenges Completed Today / This Week
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Daily habits reset at midnight. Weekly challenges refresh every Sunday.
            </div>
          </div>
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>
          Keep your streak alive! 🔥
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Filter Controls: Frequency & Status */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Period:</span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.88rem' }}
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
          >
            <option value="all">All Periods</option>
            <option value="daily">Daily Only</option>
            <option value="weekly">Weekly Only</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status:</span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.88rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Only</option>
            <option value="completed">Completed Only</option>
          </select>
        </div>
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No challenges found</h3>
          <p className="empty-state-desc">
            No challenges match your selected filters. Try choosing "All" in the category or status filters.
          </p>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFrequency('all');
              setStatusFilter('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="challenges-grid">
          {filteredChallenges.map((challenge) => {
            const isCompleted = isChallengeCompletedInCurrentPeriod(
              completedList,
              challenge.id,
              challenge.frequency
            );

            return (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                isCompleted={isCompleted}
                onComplete={onCompleteChallenge}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
