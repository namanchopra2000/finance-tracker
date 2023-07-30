import React from 'react'
import { Card, Row } from 'antd';
import Button from '../button/button';


function Cards({
  showmodalIncome , 
  showmodalExpense ,
  income ,
  expense ,
  balance
}) {
  return (
    <div>
      <Row className='my-row'>
      <Card className='my-card' title="Current Balance" bordered={true}>
      <p>₹{balance}</p>
        <Button text={"Reset Balance"} outlined={true} loader={false}/>
      </Card>
      <Card className='my-card' title="Total Income" bordered={true}>
      <p>₹{income}</p>
        <Button text={"Add Income"} outlined={true} loader={false} onClick={showmodalIncome}/>
      </Card>
      <Card className='my-card' title="Total Expences" bordered={true}>
      <p>₹{expense}</p>
        <Button text={"Add Expences"} outlined={true} loader={false} onClick={showmodalExpense}/>
      </Card>
  </Row>
    </div>
  )
}

export default Cards
