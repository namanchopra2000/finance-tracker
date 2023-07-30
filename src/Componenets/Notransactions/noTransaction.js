import React from 'react'
import logo from '../../assest/transactions.004d9f02317991455e50b36d9dae2a26 (1).svg';

function NoTransaction() {
    
  return (
    <div className='No-transaction'>
        <img className='no-trans-image' src={logo}></img>
        <p className='no-trans-text'>You Have No Transactions Currently!</p>
     </div>
  )
}

export default NoTransaction
