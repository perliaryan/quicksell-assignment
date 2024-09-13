import React from 'react';
import Board from './components/board.js';
import './styles/board.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board</h1>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;