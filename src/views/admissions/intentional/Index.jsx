import React, { useEffect, useState} from 'react'
import { Breadcrumb, Card, Form, Input, Row, Col, Button,Table, message,Tag} from "antd"
import { studentList } from '../../../Api/student'
import {useHistory} from "react-router-dom"

export default function Index(props) {
  const history=useHistory()
  //----------------------------------------------------生命周期---------------------------------------------------------------------------------------------
  useEffect(()=>{
    loadData()
  },[])
  //---------------------------------------------------state----------------------------------------------------------------------------------------------------
  const [dataSource,setDataSource]=useState([])
  //--------------------------------------------------表格columns---------------------------------------------------------------------------------------------
  const loadData=()=>{
    studentList().then(res=>{
      if(res.code===0){
        let data=res.data.map((item,index)=>({...item,key:index}))
        setDataSource(data)
        console.log(res.data)
      }
      
    })
    
  }
  const columns = [
    {
      title:"序号",
      dataIndex:"key",
      key:"key",
      render:(text)=>{
        return text+1
      },
      fixed: 'left',
      width:"150px"
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width:"150px"
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render:(text,record,index)=>text===1?"男":"女",
      width:"150px"
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(text)=>{
        if(text===1){
          return  <Tag color="#2db7f5">转化成功</Tag>
        }else if(text===2){
          return <Tag color="#87d068">待转化</Tag>
        }else{
          return <Tag color="#108ee9">转化失败</Tag>
        }
      },
      width:"150px"
    },
    {
      title: '试听状态',
      dataIndex: 'audition',
      key: 'audition',
      render:(text)=>text===1?"已转试听":"未转试听",
      width:"150px"
    },
    {
      title: '招生来源',
      dataIndex: 'source',
      key: 'source',
      width:"150px",
    },
    {
      title: '手机号码',
      dataIndex: 'tel',
      key: 'tel',
      width:"150px",
    },
    {
      title: '年级',
      dataIndex: 'grade',
      key: ' grade',
      width:"150px",
    },
    {
      title: '意向级别',
      dataIndex: 'level',
      key: ' level',
      width:"150px",
    },
    {
      title: '主负责人',
      dataIndex: 'principal',
      key: 'principal',
      width:"150px",
    },
    {
      title: '详情',
      
      key: 'detals',
      render:(text,record,index)=><Button type="primary" size='small' onClick={()=>details(record)}>详情</Button>,
      width:"150px"
    },
    
  ];
  const details=(record)=>{
    history.push(`/index/admissions/solicitation?name=${record.name}`)
    console.log(history,record)
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
    columnTitle:"选择",
    columnWidth:"80px"
  };
  return (
    <div>
      <div className='mud'>
        <Breadcrumb>
          <Breadcrumb.Item>招生管理</Breadcrumb.Item>
          <Breadcrumb.Item>意向学员管理</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='mud'>
        <Card>
          <Form
            name='basic'

          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="姓名"
                  name="name"
                >
                  <Input
                    placeholder='请输入教师姓名'
                    style={{ width: "70%" }}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="负责人"
                  name="principal"
                >
                  <Input
                    placeholder='请输入负责人'
                  ></Input> 
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Button type="primary">查询</Button>
                  <Button className='ml'>重置</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div className='mud'>
        <Card>
          <Button type="primary" className='ml' shape="round">新增</Button>
          <Button type="primary" className='ml' danger shape="round">删除</Button>
          <Button type="primary" className='ml' shape="round">转化为正式学员</Button>
          <Button type="primary" className='ml' shape="round">取消转化</Button>
        </Card>
      </div>
      <div className='mud'>
      <Table 
      dataSource={dataSource}
       columns={columns}
        rowSelection={{...rowSelection,}} 
        scroll={{y:600}}  
        width="100%"
         />;
      </div>
    </div>
  )
}
