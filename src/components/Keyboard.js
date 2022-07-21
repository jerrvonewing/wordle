import React from 'react'
import Key from './Key'

function Keyboard() {
  const line1 = ["Q","W","E","R","T","Y","U","I","O","P"]
  const line2 = ["A","S","D","F","G","H","J","K","L"]
  const line3 = ["Z","X","C","V","B","N","M"]

  return (
    <div className="keyboard">
      <div className="row1">
        {line1.map((key) => {
          return <Key keyVal={key}/>;
        })}
      </div>
      <div className="row2">
      {line2.map((key) => {
          return <Key keyVal={key}/>;
        })}
      </div>
      <div className="row3">
      <Key keyVal={"ENTER"} bigKey/>
      {line3.map((key) => {
          return <Key keyVal={key}/>;
        })}
      <Key keyVal={"DELETE"} bigKey/>
      </div>
    </div>
  )
}

export default Keyboard