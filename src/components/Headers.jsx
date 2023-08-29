import React, { Component } from 'react'

import { connect } from "react-redux"
import { DownOutlined ,UserDeleteOutlined,PoweroffOutlined} from '@ant-design/icons';
import { Card, MenuProps, Button, Dropdown, Space } from 'antd';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import style from './headrs.module.css'
import { authAction,menusAction } from '../redux/actions/authAction';
function Headers(props){
    const {push}=useHistory()
    const {nickname}=props.info.authReducer
    const onClick = ({ key }) => {
        if(key==="1"){
            push("/index/personal")
        }else if(key==="2"){
            sessionStorage.clear()
            props.authAction({role:"",nickname:""})
            props.menusAction([])
            push('/login')
        }
    };

        const items = [
            {
                key: '1',
                label: "个人中心",
                icon:<UserDeleteOutlined />
            },
            {
                key: '2',
                label: "退出登录",
                icon:<PoweroffOutlined />
            },
        ]

        return (
            <div className={style.drop}>
                <Dropdown
                    menu={{
                        items,
                        onClick,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                           你好呀，{nickname}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        )
    }

export default connect(
    state => ({ msg: state }),
    {authAction,menusAction}
)(Headers)