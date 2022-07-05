import React from 'react'

function Keyboard() {
  const line1 = ["Q","W","E","R","T","Y","U","I","O","P"]
  const line2 = ["A","S","D","F","G","H","J","K","L"]
  const line3 = ["Z","X","C","V","B","N","M"]

  return (
    <div class="keyboard">
      <div class="line1">
        {line1.map((key) => {
          return <div>{key}</div>;
        })}
      </div>
      <div class="line2">
      {line2.map((key) => {
          return <div>{key}</div>;
        })}
      </div>
      <div class="line3">
      {line3.map((key) => {
          return <div>{key}</div>;
        })}
      </div>
    </div>
  )
}

export default Keyboard