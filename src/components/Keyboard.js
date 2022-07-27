import React, {useEffect, useContext, useCallback} from 'react'
import Key from './Key'
import { AppContext} from '../App'

function Keyboard() {
  const {pressEnter,pressDelete,pressLetter, disabledLetters} = useContext(AppContext)

  const line1 = ["Q","W","E","R","T","Y","U","I","O","P"]
  const line2 = ["A","S","D","F","G","H","J","K","L"]
  const line3 = ["Z","X","C","V","B","N","M"]

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i)
  }

  const handleKeyboard = useCallback((event) => {
      if (event.key === "Enter"){
        pressEnter();
      }
      else if (event.key === "Backspace"){
        pressDelete();
      }
      else if(isLetter(event.key) === false){
        return;
      }
      else{
        line1.forEach((key) => {
          if(event.key.toLowerCase() === key.toLowerCase()){
            pressLetter(key)
          } 
        });       
        line2.forEach((key) => {
          if(event.key.toLowerCase() === key.toLowerCase()){
            pressLetter(key)
          }
        });
        line3.forEach((key) => {
          if(event.key.toLowerCase() === key.toLowerCase()){
            pressLetter(key)
          }
        });
      }   
    });

    


  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    
    return() => {
      document.removeEventListener("keydown", handleKeyboard);
    };  
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="row1">
        {line1.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>;
        })}
      </div>
      <div className="row2">
      {line2.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>;
        })}
      </div>
      <div className="row3">
      <Key keyVal={"ENTER"} bigKey/>
      {line3.map((key) => {
          return <Key keyVal={key} disabled={disabledLetters.includes(key)}/>;
        })}
      <Key keyVal={"DELETE"} bigKey/>
      </div>
    </div>
  )
}

export default Keyboard