import React, { useMemo, useState } from 'react';
import Board from './Board';
import { calculateWinner, isDraw, nextPlayer } from '../utils/gameUtils';

/**
 * Game component encapsulates the full Tic Tac Toe game state:
 * - Board state (9 squares)
 * - Turn management
 * - Winner/draw detection
 * - Scoreboard (X/O wins and draws) persisting across rounds
 * Controls:
 * - New Game: resets board only (keeps scores)
 * - Reset Scores: resets board and scores
 */
// PUBLIC_INTERFACE
export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const current = useMemo(() => nextPlayer(squares), [squares]);
  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares), [squares]);

  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const locked = Boolean(winnerInfo) || draw;

  const handleSquareClick = (index) => {
    if (locked || squares[index]) return;
    const next = squares.slice();
    next[index] = current;
    setSquares(next);

    // After placing, check winner/draw to update score synchronously
    const postWinner = calculateWinner(next);
    if (postWinner) {
      setScores((prev) => ({ ...prev, [postWinner.winner]: prev[postWinner.winner] + 1 }));
    } else if (isDraw(next)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const handleNewGame = () => {
    setSquares(Array(9).fill(null));
  };

  const handleResetScores = () => {
    setSquares(Array(9).fill(null));
    setScores({ X: 0, O: 0, draws: 0 });
  };

  const statusText = (() => {
    if (winnerInfo) return `Winner: ${winnerInfo.winner}`;
    if (draw) return "It's a draw";
    return `Turn: ${current}`;
  })();

  const statusBadgeClass = (() => {
    if (winnerInfo?.winner === 'X') return 'badge badge-x';
    if (winnerInfo?.winner === 'O') return 'badge badge-o';
    if (draw) return 'badge badge-draw';
    return current === 'X' ? 'badge badge-x' : 'badge badge-o';
  })();

  const statusBadgeText = (() => {
    if (winnerInfo) return `Winner • ${winnerInfo.winner}`;
    if (draw) return 'Draw';
    return `Player • ${current}`;
  })();

  return (
    <section className="section" aria-live="polite">
      <div className="status-bar">
        <div className="status">
          <div className={statusBadgeClass}>{statusBadgeText}</div>
          <div className="status-text">{statusText}</div>
        </div>
        <div className="controls">
          <button className="btn btn-primary" onClick={handleNewGame}>
            New Game
          </button>
          <button className="btn btn-danger" onClick={handleResetScores}>
            Reset Scores
          </button>
        </div>
      </div>

      <Board squares={squares} onSquareClick={handleSquareClick} locked={locked} />

      <div className="scoreboard" aria-label="Scoreboard">
        <div className="score">
          <span className="label">X Wins</span>
          <span className="value" style={{ color: 'var(--color-primary)' }}>{scores.X}</span>
        </div>
        <div className="score">
          <span className="label">Draws</span>
          <span className="value" style={{ color: 'var(--color-secondary)' }}>{scores.draws}</span>
        </div>
        <div className="score">
          <span className="label">O Wins</span>
          <span className="value" style={{ color: 'var(--color-success)' }}>{scores.O}</span>
        </div>
      </div>
    </section>
  );
}
