import { Line, Pie } from '@ant-design/charts';
import React from 'react'

function Charts({sortedTrans}) {
  console.log(sortedTrans);
    const data = sortedTrans.filter((item)=>{
      if(item.type == "income")
      {
       return {date:item.date , amount:item.amount}
    }});

    const spendingData = sortedTrans.filter((transaction)=>{
      if(transaction.type == "expence")
      {
        return{ tag:transaction.tag  , amount:transaction.amount};
      }
    })
    
      const config = {
        data:data,
        width: 850,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };


     const category = [
      {tag:"food" , amount:0},
      {tag:"movie" , amount:0},
      {tag:"rent" , amount:0},
    ]
     
    spendingData.forEach((item)=>{
      if(item.tag == "food"){
        category[0].amount += item.amount 
      }
      else if(item.tag == "movie"){
        category[1].amount += item.amount 
      }
      else if(item.tag == "rent"){
        category[2].amount += item.amount 
      }
    })
    


     const spendindConfig = {
      data :category,
      width: 400,
      height: 400,
      angleField: 'amount',
      colorField: 'tag',
    };
     
  return (
    <div className='charts-wrapper'>
      <div className='linechart'>
        <h2>Your Analytics</h2>
        <Line {...config}  />
      </div>
      <div className='piechart'>
        <h2>Your Spendings</h2> 
        <Pie {...spendindConfig}/>
      </div>
    </div>

  )
}

export default Charts
