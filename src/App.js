import './App.css';

import Board from './components/Board.js';
import Keyboard from './components/Keyboard.js';
import {createContext} from 'react';
import React, {useState, useEffect} from 'react';
import {boardDefault, generateWordSet} from './components/Words.js';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPosition: 0});
  const [wordSet, setWordSet] = useState(new Set());

  const correctWord = "NOISY";
  
  useEffect(() => {
    generateWordSet().then((words) => {

      setWordSet(words.wordSet);
    });
  }, []);
  
  const pressLetter = (keyVal) => {
    if(currentAttempt.letterPosition > 4) return;
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyVal
    setBoard(newBoard)
    setCurrentAttempt({...currentAttempt, letterPosition: currentAttempt.letterPosition + 1});
  }

  const pressEnter = () => {
      //Validates 5 letters are present
      if(currentAttempt.letterPosition !== 5) return;

      let currentWord = "";
      for (let i =0; i < 5; i++){
        currentWord += board[currentAttempt.attempt][i];
      }
      currentWord = currentWord.toLowerCase()
      console.log("The word is " + currentWord)
      if(wordSet.has(currentWord)){
        setCurrentAttempt({attempt: currentAttempt.attempt + 1, letterPosition: 0})
      }
      else{
        alert("Word Not Found");
      }
  }

  const pressDelete = () => {
      if(currentAttempt.letterPosition === 0) return;
      setCurrentAttempt({attempt: currentAttempt.attempt, letterPosition: currentAttempt.letterPosition - 1});

      const newBoard = [...board]
      newBoard[currentAttempt.attempt][currentAttempt.letterPosition -1] = ""
      setBoard(newBoard);
  }


  return (
    <div className="App">
      <nav>
        <h1>Wordle Unlimited</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currentAttempt, setCurrentAttempt,pressLetter,pressEnter,pressDelete, correctWord}}>
        <div className="game">
          <Board/>
          <Keyboard/>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
