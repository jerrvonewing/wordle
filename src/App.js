import './App.css';

import Board from './components/Board.js';
import Keyboard from './components/Keyboard.js';
import {createContext} from 'react';
import React, {useState} from 'react';
import {boardDefault} from './components/Words.js';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard}}>
        <Board/>
        <Keyboard/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
