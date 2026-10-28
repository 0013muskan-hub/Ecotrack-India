import React from 'react';

/**
 * Toast Component
 * Displays lightweight floating notification alerts for user actions.
 */
export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || 'success'}`}>
          <span>{toast.icon || '✓'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
