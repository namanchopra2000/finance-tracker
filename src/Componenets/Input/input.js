import React from 'react'
import "./style.css"

function Input({type ,lable , state , setState , placeholder} ) {
  return (
    <div className='input-wrapper'>
      <h3 className='lable'>{lable}</h3>
      <input type={type} className='custom-input' placeholder={placeholder} value={state} onChange={(e)=>{setState(e.target.value)}}/>
    </div>
  )
}

export default Input
