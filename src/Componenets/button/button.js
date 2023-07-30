import React from 'react'
import "./button.css"

// common button which is used for whole product there is two buttons if outlined true export outlined button else export normal filled button 

function Button({ text, outlined , onClick , loader}) {
  return (
    <button disabled={loader} onClick={onClick} className={outlined ? "outlined" : "btn"}>{text}</button>
  )
}

export default Button; 