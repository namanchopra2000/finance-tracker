import React from 'react'
import Header from '../Componenets/header/header'
import SingupSingInComponent from '../Componenets/signup/signout'

function SingupSingIn() {
  return (
    <div>
      <Header logout={false}/>
      <div className='wrapper'>
      <SingupSingInComponent/>
      </div>
    </div>
  )
}

export default SingupSingIn