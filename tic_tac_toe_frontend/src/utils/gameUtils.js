export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /**
   * Determine if a winner exists for the given flat 3x3 array of squares.
   * Returns: { winner: 'X' | 'O', line: number[] } | null
   */
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isDraw(squares) {
  /**
   * Check if the board is a draw (no null cells and no winner).
   */
  return squares.every(Boolean) && !calculateWinner(squares);
}

// PUBLIC_INTERFACE
export function nextPlayer(squares) {
  /**
   * Compute which mark plays next based on the current board state.
   */
  const xCount = squares.filter((s) => s === 'X').length;
  const oCount = squares.filter((s) => s === 'O').length;
  return xCount === oCount ? 'X' : 'O';
}
