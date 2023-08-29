import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { Button, Modal, Form, Row, Col, Input, DatePicker, Space, Select, message } from 'antd';
import moment from 'moment';
import { addClass } from '../../Api/student';
import { useState } from 'react';
const { Option } = Select
export default forwardRef(function AddCourse(props, ref) {
    const [form] = Form.useForm();
    const [flag, setFlag] = useState(false)
    const reset = () => {
        console.log(form)
        form.resetFields()
    }
    const handleOk = () => {
        form.validateFields().then(res => {
            setFlag(true)
            let time = moment(res.time).format('YYYY-MM-DD')
            addClass({ ...res, time }).then(res => {
                message.success(res.msg)
                props.setOpenModal(false)
                setFlag(false)
                console.log(res)
            })
            console.log(1, res)
        }).catch((err) => { 
            setFlag(false)
            message.error(err)
        })

    }
    const handleCancel = () => {
        props.setOpenModal(false)
    }
    useImperativeHandle(ref, () => ({ reset }))
    return (
        <div>
            <Modal 
            confirmLoading={flag}
            title="新增排课" 
            open={props.openModal} 
            onOk={handleOk} 
            onCancel={handleCancel}>
             
                <Form

                    form={form}
                    name="basic"
                    labelCol={{ span: 5 }}
                    initialValues={
                        {
                            type: "1"
                        }
                    }
                >
                    <Row>
                        <Col span={22}>
                            <Form.Item
                                label="教室"
                                name="classroom"
                                rules={[{ required: true, message: "不能为空" }]}
                            >
                                <Input placeholder='如A教101室'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={22}>
                            <Form.Item
                                label="老师"
                                name="teacher"
                                rules={[{ required: true, message: "不能为空" }]}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={22}>
                            <Form.Item
                                label="学科"
                                name="subject"
                                rules={[{ required: true, message: "不能为空" }]}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={22}>
                            <Form.Item
                                label="上课时间"
                                name="time"
                                rules={[{ required: true, message: "不能为空" }]}
                            >
                                <DatePicker showTime placeholder='请选择时间' />
                            </Form.Item>
                        </Col>
                        <Col span={22}>
                            <Form.Item
                                label="班型"
                                name="type"
                                rules={[{ required: true, message: "不能为空" }]}
                            >
                                <Select>
                                    <Option value='1'>一对一</Option>
                                    <Option value='2'>大班</Option>
                                    <Option value='3'>小班</Option>
                                    <Option value='4'>精英班</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
)