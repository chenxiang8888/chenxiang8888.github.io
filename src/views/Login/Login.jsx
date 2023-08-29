import React, { useRef } from 'react'
import style from "./login.module.css"
import { useHistory } from "react-router-dom"
import { nowLogin } from '../../Api/login';
import { Card, Tabs, Button, Checkbox, Form, Input, message } from 'antd';
import { post } from '../../utils/request';
import { connect } from "react-redux"
import { authAction ,menusAction} from '../../redux/actions/authAction';
import { asyncRouterMap } from '../../common/mapRouter';
import { filterRouter } from '../../utils/filterMap';
function Login(props) {
    const loginRef = useRef(null)
    const history = useHistory()
    const { role, nickname } = props.info.authReducer
    const login = () => {
        //--------------------------登录按钮-----------------------------------
        loginRef.current.validateFields().then((res) => {
            if (res.username) {
                nowLogin(res).then((res) => {
                    sessionStorage.setItem("token", res.token)
                    props.authAction({ nickname: res.nickname, role: res.role })
                   
                    const menus=filterRouter(asyncRouterMap,res.role)
                    props.menusAction(menus)
                    history.push("/index/home")
                }).catch((err) => {

                })
            }
        }).catch((err) => {

        })
    }
    //---------------------------------------------注册--------------------------    
    const register = (value) => {
        post('/user/register', value).then((res) => {
            message.success(res.msg)
        }).catch((err => {
            console.log(err)
        }))
    }
    const tabPages = [
        {
            label: '手机号密码登陆', key: 'item-1', children: <Form
                ref={loginRef}
                name="basic"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名称' }]}
                >
                    <Input placeholder='请输入你的手机号' />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }, { pattern: /^\d{4,8}$/, message: "密码为4-8位数字" }]}
                >
                    <Input.Password placeholder='请输入你的密码' />
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }} onClick={login}>
                    立即登录
                </Button>
            </Form>
        }, // 注册
        {
            label: '新用户注册', key: 'item-2', children: <Form
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={register}
            >
                <Form.Item
                    name="username"

                    rules={[{ required: true, message: '请输入您的手机号' }, { pattern: /^(?:\+?86)?1[3-9]\d{9}$/, message: "请输入正确的手机号" },]}
                    validateTrigger="onBlur"
                >
                    <Input placeholder='请输入您的手机号' />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入您的密码' }]}
                >
                    <Input.Password placeholder='请输入您的密码' />
                </Form.Item>
                <Form.Item
                    name="nickname"
                    rules={[{ required: true, message: '请输入您的姓名' }]}
                >
                    <Input placeholder='请输入您的姓名' />
                </Form.Item>


                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        立即注册
                    </Button>
                </Form.Item>
            </Form>
        },
    ];

    return (
        <div className={style.wrap}>
            <Card title="好学教育后台管理系统" bordered={false} style={{ width: 500 }} headStyle={{ textAlign: "center", fontSize: "28px" }}>
                <Tabs items={tabPages} />
            </Card>
        </div>
    )
}
export default connect(
    state => ({ info: state }),
    { authAction ,menusAction}
)(Login)