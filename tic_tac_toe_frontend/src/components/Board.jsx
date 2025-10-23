import React from 'react';
import Square from './Square';

/**
 * Board renders the 3x3 grid.
 * Props:
 * - squares: string[] length 9 containing 'X' | 'O' | null
 * - onSquareClick: (index: number) => void
 * - locked: boolean (prevents further plays when true)
 */
export default function Board({ squares, onSquareClick, locked }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onSquareClick(idx)}
          disabled={locked || Boolean(value)}
        />
      ))}
    </div>
  );
}
