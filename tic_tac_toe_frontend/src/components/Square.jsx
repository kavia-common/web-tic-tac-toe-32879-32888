import React from 'react';

/**
 * A single board square displaying X or O and handling click events.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - disabled: boolean
 */
export default function Square({ value, onClick, disabled }) {
  const className = `square ${value === 'X' ? 'mark-x' : value === 'O' ? 'mark-o' : ''}`;

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Board cell ${value ? 'occupied by ' + value : 'empty'}`}
    >
      <span className="mark">{value ?? ''}</span>
    </button>
  );
}
