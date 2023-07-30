import React from 'react'
import { Modal, Form, DatePicker, Input, Select, message } from 'antd';
import Button from '../../Componenets/button/button';

function Addincome({
    showIncomeModals,
    cancleModalIncomes,
    onFinish
}) {
    const [form] = Form.useForm();

    return (
        <div>
            <Modal
                style={{ fontWeight: 600 }}
                open={showIncomeModals}
                onCancel={cancleModalIncomes}
                footer={null}
                title={'Add Income'}
            >
                <br></br>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={(values) => {
                        onFinish(values, "income");
                        form.resetFields();
                        form.close();
                    }}>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Name"
                        name="Name"
                        rules={[{
                            required: true,
                            message: "Please Input The Name Of the Transaction!"
                        }]}>
                        <Input type='text' className='custom-input' />
                    </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Amount"
                        name="Amount"
                        rules={[{
                            required: true,
                            message: "Please Input The Amount Of the Transaction!"
                        }]}>
                        <Input type='number' className='custom-input' />
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
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="freelance">Freelance</Select.Option>
                            <Select.Option value="investment">Investment</Select.Option>
                        </Select>
                    </Form.Item>
                        <Button text={'Add Income'}  outlined={true}></Button>
                </Form>
            </Modal>

        </div>
    )
}

export default Addincome
