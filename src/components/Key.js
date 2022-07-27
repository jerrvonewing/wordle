import React, {useContext} from 'react'
import { AppContext} from '../App'

function Key({keyVal, bigKey, disabled}) {
    const {pressLetter,pressEnter,pressDelete} = useContext(AppContext)

    const selectLetter = () => {
        //When user hits Enter
        if(keyVal === "ENTER")
            pressEnter();
        else if(keyVal === "DELETE") 
            pressDelete();
        else
            pressLetter(keyVal);
    }

return (
    <div className="key" id={bigKey ? "big": disabled && "disabled"} onClick={selectLetter}>{keyVal}</div>
    )
}

export default Key