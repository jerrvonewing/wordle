import React, {useContext, useEffect} from 'react'
import { AppContext} from '../App'

function Letter({letterPosition, attemptValue}) {
    const {board, currentAttempt, correctWord, setDisabledLetters} = useContext(AppContext);
    const letter = board[attemptValue][letterPosition];


    const correct = correctWord[letterPosition] === letter.toLowerCase();
    const almost = !correct && letter !== "" && correctWord.includes(letter.toLowerCase());
    const letterState = currentAttempt.attempt > attemptValue && 
    (correct ? "correct" : almost ? "almost" : "error");

  
    useEffect(() => {
      if(letter !== "" && !correct && !almost) {
        setDisabledLetters((prev) => [...prev, letter]);
      }
    }, [currentAttempt.attempt]);
  return (
        <div className="letter" id={letterState}>
        {letter}
        </div>
  );
}

export default Letter;