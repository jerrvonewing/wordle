import './App.css';

import Board from './components/Board.js';
import Keyboard from './components/Keyboard.js';
import GameOver from './components/GameOver.js';
import {createContext} from 'react';
import React, {useState, useEffect} from 'react';
import {boardDefault, generateWordSet} from './components/Words.js';
import Button, {BUTTON_TYPES_CLASSES} from './components/Button/Button';

export const AppContext = createContext();

function App() {
  
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPosition: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord,setCorrectWord] = useState("");
  
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.generatedWord);
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

      if(currentWord.toLowerCase() === correctWord.toLowerCase()){
        setGameOver({gameOver: true, guessedWord: true});
        return;
      }

      if(currentAttempt.attempt === 5)
        setGameOver({gameOver: true, guessedWord: false});
  }

  const pressDelete = () => {
      if(currentAttempt.letterPosition === 0) return;
      setCurrentAttempt({attempt: currentAttempt.attempt, letterPosition: currentAttempt.letterPosition - 1});

      const newBoard = [...board]
      newBoard[currentAttempt.attempt][currentAttempt.letterPosition -1] = ""
      setBoard(newBoard);
  }

  const resetGame = () => {
    /*
    setCurrentAttempt({attempt: 0, letterPosition: 0});
    setBoard(boardDefault);
    setDisabledLetters([]);
    setGameOver({gameOver: false, guessedWord: false});
    const newBoard = [...board]
    for (let i = 0; i < 6; i++){
      for (let j = 0; j <5; j++){
        newBoard[i][j] = "";

      }
    }
    */
    window.location.reload();

  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle Unlimited</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currentAttempt, setCurrentAttempt,pressLetter,pressEnter,pressDelete, correctWord, disabledLetters, setDisabledLetters, gameOver, setGameOver}}>
        <div className="game">
          <Board/>
          {gameOver.gameOver ? <GameOver /> : <Keyboard/>}
          {gameOver.gameOver ? <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={ () => resetGame()}>Try Again</Button> : ""}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
