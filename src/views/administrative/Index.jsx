import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Breadcrumb, Button, Modal, Radio, Table, message, Badge, Descriptions } from 'antd'
import { roleList, changeAuth } from '../../Api/authorization';

export default function Index() {
  const [flag, setFlag] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [authValue, setAuthValue] = useState(1)

  useEffect(() => {
    loadData()
  }, [])
  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '手机号码',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return <Button type="primary" onClick={() => setAuth(record)} style={{ borderRadius: "3px" }}>设置权限</Button>
      }
    },
  ];
  const setAuth = (e) => {
    setFlag(true)
    setAuthValue({ role: e.role, id: e.id })
    console.log(e)
  }
  const loadData = () => {
    roleList().then(res => {
      const data = res.data.map((item, index) => ({ ...item, key: index + 1 }))
      setDataSource(data)
    })
  }
  //弹窗
  const handleOk = () => {
    console.log(authValue)
    changeAuth(authValue).then(res => {
      message.success(res.msg)
      console.log(res)
      setFlag(false)
      loadData()
    })
  }
  const handleCancel = () => {
    setFlag(false)

  }
  const authChange = (e) => {
    console.log(e.target)

    setAuthValue({ role: e.target.value, id: authValue.id })
  }
  //----------------------------------------------------------------------销冠----------------------------------------------------------------------------------------------------------

  return (
    <div className='mud'>
      <Modal title="权限设置" open={flag} onOk={handleOk} onCancel={handleCancel}>
        <Radio.Group onChange={authChange} value={authValue.role}>
          <Radio value='admin'>管理员/老板</Radio>
          <Radio value='teacher'>老师/咨询师</Radio>
          <Radio value='manager'>部门经理</Radio>
        </Radio.Group>
      </Modal>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Table dataSource={dataSource} columns={columns} style={{width:"100%"}}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Descriptions bordered>
              <Descriptions.Item label="销售冠军">王明君</Descriptions.Item>
              <Descriptions.Item label="课时冠军">萧琪琪</Descriptions.Item>
              <Descriptions.Item label="金牌讲师">郭诗云</Descriptions.Item>
              <Descriptions.Item label="起始时间">2018-04-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="截至时间" span={2}>
                2019-04-24 18:00:00
              </Descriptions.Item>
              <Descriptions.Item label="本月亏盈" span={3}>

                <Badge status="processing" text="盈利320万元" />
              </Descriptions.Item>
              <Descriptions.Item label="收益科目">数学</Descriptions.Item>
              <Descriptions.Item label="较差科目">语文</Descriptions.Item>
              <Descriptions.Item label="进步科目">数学</Descriptions.Item>
              <Descriptions.Item label="备注">
              综合趋势有所下降，主要受国家政策影响，老师离职率较高，需要管控人员走动， 数学是主要盈利科目，英语报名人数较少，英语老师有空闲，排班不满的情况
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  )
}