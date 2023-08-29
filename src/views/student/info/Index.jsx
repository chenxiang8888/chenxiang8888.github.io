import React, { useState, useRef } from 'react'
import style from './info.module.css'
import { Row, Col, Card, Button, Select, Form, Input, Table, Breadcrumb, Radio,Pagination  } from 'antd'
import { DownOutlined, UpOutlined } from "@ant-design/icons"
const { Option } = Select;
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: '科目',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: '入职日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '手机号码',
    dataIndex: 'tel',
    key: 'tel',
  },
  {
    title: '毕业院校',
    dataIndex: 'school',
    key: 'school',
  },
  {
    title: '出生年月',
    dataIndex: 'birth',
    key: 'birth',
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '学历',
    dataIndex: 'education',
    key: 'education',
  },
  {
    title: '操作',
    dataIndex: 'operaton',
    key: 'address',
  },
];
export default function Index() {
  const formRef = useRef(null)
  const [flag, setFlag] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [myMore, setMyMore] = useState("more")
  const myRef = useRef(null)
  const changeFlxible = () => {
    console.log(myRef.current.classList)
    if (flag) {
      setMyMore('more')
      setFlag(!flag)
    } else {
      setMyMore('')
      setFlag(!flag)
    }
  }
  const search = (value) => {
    let arr = formRef.current.getFieldsValue()
    console.log(arr)
  }
  const reset = () => {
    formRef.current.resetFields()
  }
  const radioChange=(e)=>{
    console.log(e.target.value)
  }
  return (
    <div>
      <div className='mud'>
        <Breadcrumb>
          <Breadcrumb.Item>学生管理</Breadcrumb.Item>
          <Breadcrumb.Item>学生信息</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='mud'>
        <Card>
          <Form
            name="basic"
            initialValues={{
              subject: '',
              grade:'',
              type:'',
            }}
            ref={formRef}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="姓名"
                  name="name"
                >
                  <Input placeholder='请输入学生姓名'></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="科目"
                  name="subject"
                >
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="1">数学</Option>
                    <Option value="2">英语</Option>
                    <Option value="3">语文</Option>
                    <Option value="4">物理</Option>
                    <Option value="5">化学</Option>
                    <Option value="6">生物</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="年级"
                  name='grade'
                >
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="1">一年级</Option>
                    <Option value="2">二年级</Option>
                    <Option value="3">三年级</Option>
                    <Option value="4">四年级</Option>
                    <Option value="5">五年级</Option>
                    <Option value="6">六年级</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Row className={style.flexible}>
                    <Col span={12} onClick={changeFlxible}>
                      {flag ? "收起" : `展开`}{flag ? <UpOutlined></UpOutlined> : <DownOutlined></DownOutlined>}
                    </Col>
                    <Col span={12}>
                      <Button type='primary' onClick={search}>查询</Button>
                      <Button className='ml' onClick={reset}>重置</Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} ref={myRef} className={style[myMore]}>
              <Col span={6}>
                <Form.Item
                  label="班型"
                  name="type"

                >
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="1">一对一</Option>
                    <Option value="2">小班</Option>
                    <Option value="3">大班</Option>
                    <Option value="4">精英班</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="家长姓名"
                  name='parent'
                >
                  <Input placeholder='请输入家长姓名'></Input>
                </Form.Item>

              </Col>
              <Col span={6}>
                <Form.Item
                  label="班主任"
                  name="headTeacher"
                >
                  <Input placeholder='请输入班主任姓名'></Input>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div className='mud'>
        <Card>
          <Radio.Group
          onChange={radioChange}
            defaultValue="a"
            style={{
              marginTop: 16,
            }}
          >
            <Radio.Button value="a">全部</Radio.Button>
            <Radio.Button value="b">中心校区</Radio.Button>
            <Radio.Button value="c">顺义校区</Radio.Button>
            <Radio.Button value="d">大兴校区</Radio.Button>
            <Radio.Button value="e">昌平校区</Radio.Button>
          </Radio.Group>  
        </Card>
      </div>
      <div className='mud'>
        <Card>
          <Table
            dataSource={dataSource}
            columns={columns}
          />
           <Pagination showQuickJumper defaultCurrent={2} total={500} showSizeChanger={false} />
        </Card>
      </div>

    </div>
  )
}
