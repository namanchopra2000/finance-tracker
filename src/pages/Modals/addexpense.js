import React from 'react'
import { Modal, Form, DatePicker, Input, Select, message } from 'antd';
import Button from '../../Componenets/button/button';

function Addexpense({
    showExpenseModals,
    cancleModalExpenses,
    onFinish
}) {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal 
      style={{ fontWeight: 600 }}
      open={showExpenseModals}  
      onCancel={cancleModalExpenses}
      footer={null}
      title={'Add Expences'}
      >
        <br></br>
         <Form
                    form={form}
                    layout='vertical'
                    onFinish={(values) => {
                        onFinish(values, "expence");
                        form.resetFields();
                    }}>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Name"
                        name="Name"
                        rules={[{
                            required: true,
                            message: "Please Input The Name Of the Transaction!"
                        }]}>
                            <Input type='text' className='custom-input'/>
                        </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Amount"
                        name="Amount"
                        rules={[{
                            required: true,
                            message: "Please Input The Amount Of the Transaction!"
                        }]}>
                            <Input type='number' className='custom-input'/>
                        </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Date"
                        name="Date"
                        rules={[{
                            required: true,
                            message: "Please Input The Date Of the Transaction!"
                        }]}>
                            <DatePicker className="custom-input" format={"YYYY-MM-DD"}></DatePicker>
                        </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Tag"
                        name="Tag"
                        rules={[{
                            required: true,
                            message: "Please Input Tag Of the Transaction!"
                        }]}>
                            <Select className='custom-input'>
                                <Select.Option value="food">Food</Select.Option>
                                <Select.Option value="movie">Movie</Select.Option>
                                <Select.Option value="rent">Rent</Select.Option>
                            </Select>
                        </Form.Item>
                        
                            <Button text={'Add Expences'} outlined={true}></Button>
                </Form>
        
        
        </Modal>
    </div>
  )
}

export default Addexpense
