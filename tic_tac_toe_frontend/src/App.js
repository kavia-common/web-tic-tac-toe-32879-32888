import React from 'react';
import './App.css';
import './styles/theme.css';
import Game from './components/Game';

/**
 * App shell that sets up the primary page container.
 * Uses Ocean Professional theme variables for styling.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app-root">
      <main className="container">
        <header className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="subtitle">Two players. One board. Classic fun.</p>
        </header>
        <Game />
        <footer className="footer">
          <span className="credit">Ocean Professional • Retro minimal vibes</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
