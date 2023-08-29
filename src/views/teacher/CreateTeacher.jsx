import React, { useState ,forwardRef,useImperativeHandle} from 'react'
import { addTeacher,editTeacher } from '../../Api/teacher';
import moment from 'moment';
import { Modal, Form, Row, Col, Input, Select, DatePicker, Radio,message } from 'antd'

const { Option } = Select
function CreateTeacher(props,ref) {
    const [flag,setFlag]=useState(false)
    useImperativeHandle(ref,()=>({
        form
    }))
    let listId=props.title==="新建员工"?{}:props.listId
    const fn=props.title==="新建员工"?addTeacher:editTeacher
    const [form] = Form.useForm();
    const handleOk = () => {
        form.validateFields().then((res)=>{
            setFlag(true)
            let birth=moment(res.birth).format("YYYY-MM-DD")
            let date=moment(res.date).format("YYYY-MM-DD")
            fn({...res,birth,date,id:listId}).then((res)=>{
                setFlag(false)
                console.log(res)
                message.success(res.msg)
                form.resetFields()
                props.setIsModalOpen(false)
                props.loadData()
            }).catch((res)=>{setFlag(false)})
            console.log(res)
        }).catch((err)=>{setFlag(false)})
    };

    const handleCancel = () => {
        props.setIsModalOpen()
    };
    return (
        <div>
            <Modal
            confirmLoading={flag} 
            loading={true}
            title={props.title} 
            open={props.isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            width={1000}
            >
                <Form
                    name="basic"
                    labelCol={8}
                    wrapperCol={12}
                    layout="horizontal"
                    form={form}
                >
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="姓名"
                                rules={[{ required: true, message: "姓名不能为空" }]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                name="gender"
                                label="性别"
                                rules={[{ required: true, message: "性别不能为空" }]}
                            >
                                <Select>
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="level"
                                label="级别"
                                rules={[{ required: true, message: "级别不能为空" }]}
                            >
                                <Select>
                                    <Option value={1}>初级教师</Option>
                                    <Option value={2}>中级教师</Option>
                                    <Option value={3}>高级教师</Option>
                                    <Option value={4}>特级教师</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="grade"
                                label="年级"
                                rules={[{ required: true, message: "年级不能为空" }]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                name="subject"
                                label="科目"
                                rules={[{ required: true, message: "科目不能为空" }]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                name="date"
                                label="入职日期"
                                rules={[{ required: true, message: "入职日期不能为空" }]}
                            >
                                <DatePicker style={{width:"100%"}}></DatePicker>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="类型"
                                name="type"
                                rules={[{ required: true, message: "类型不能为空" }]}
                            >
                                <Radio.Group >
                                    <Radio value="1">全职</Radio>
                                    <Radio value="2">兼职</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="手机号码"
                                name="tel"
                                rules={[{ required: true, message: "手机号码不能为空" }]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="毕业院校"
                                name="school"
                                rules={[{ required: true, message: "毕业院校不能为空" }]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="出生年月"
                                name="birth"
                                rules={[{ required: true, message: "出生年月不能为空" }]}
                            >
                                <DatePicker style={{width:"100%"}}></DatePicker>
                            </Form.Item>
                            <Form.Item
                                label="家庭住址"
                                name="address"
                                rules={[{ required: true, message: "家庭住址不能为空" }]}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label=" 学历 "
                                name="education"
                                rules={[{ required: true, message: "学历不能为空" }]}

                            >
                                <Input style={{marginLeft:"10%",width:"90%"}}  maxLength={20} showCount ></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
export default forwardRef(CreateTeacher)