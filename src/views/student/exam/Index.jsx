import React, { useEffect, useState, useRef } from 'react'
import { Breadcrumb, Card, Form, Row, Col, Input, Select, DatePicker, Button, Table, Pagination } from 'antd'
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { studentExam } from '../../../Api/student';
import moment from 'moment';
const { Option } = Select
const { RangePicker } = DatePicker;
const customLocale = {
  items_per_page: '/ 页',
  jump_to: '跳至',
  jump_to_confirm: '确定',
  page: '',
};
export default function Index() {
  const [total,setTotal]=useState(0)
  const [dataSource, setDataSource] = useState([])
  const [pageData, setPageData] = useState({ page: 1, pageSize: 10 })
  const formRef = useRef(null)
  useEffect(() => {
    loadData()
    console.log("执行了")
  }, [])
  const loadData = (payload) => {
    let date=formRef.current.getFieldsValue().date||([])
    console.log(date)
    let startDate=date.length>0?moment(date[0]).format('YYYY-MM-DD'):''
    let endDate=date.length>0?moment(date[1]).format('YYYY-MM-DD'):''
    let formDate=formRef.current.getFieldsValue()
    delete formDate.date
    studentExam({...pageData,...formDate,startDate,endDate,...payload}).then(res=>{
      if(res.code===0){
        let data=res.data.map(item=>({...item,key:item.id}))
        setDataSource(data)
        setTotal(res.total)
      }
      console.log(res)
    })
    
  }
  const search = () => {
    console.log(formRef.current.getFieldsValue())
    loadData()
  }
  const reset=()=>{
    formRef.current.resetFields()
  }
  //-----------------------------------------------------------------------------表格-------------------------------------------------------------------------------------------------------
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '考试时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '科目',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '参与班级',
      dataIndex: 'grade',
      key: 'grade',
    },
  ];
//-------------------------------------------------------------------------------------分页----------------------------------------------------------------------------------
const changePage=(page,pageSize)=>{
  console.log(page,pageSize)
  setPageData(prev=>{
    prev={page,pageSize}
    loadData({page,pageSize})
    return prev
  })
}
  return (
    <div>
      <div className='mud'>
        <Breadcrumb>
          <Breadcrumb.Item>学生管理</Breadcrumb.Item>
          <Breadcrumb.Item>考试管理</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='mud'>
        <Card>
          <Form
            name="basic"
            ref={formRef}
            initialValues={
              {
                type:"",
                name:'',
                
              }
            }
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="考试名称"
                  name="name"
                >
                  <Input placeholder='请输入学生姓名' style={{ borderRadius: "5px" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="考试类别"
                  name="type"
                >
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="1">摸底考试</Option>
                    <Option value="2">随堂测试</Option>
                    <Option value="3">期中考试</Option>
                    <Option value="4">周末考试</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="考试日期"
                  name="date"
                >
                  <RangePicker locale={locale} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Button type="primary" onClick={search}>查询</Button>
                  <Button className='ml' onClick={reset}>重置</Button>
                </Form.Item>
              </Col>
            </Row>


          </Form>
        </Card>
      </div>
      <div className='mud'>
        <Card>
          <Table dataSource={dataSource} columns={columns} pagination={false}/>
          <Pagination
          locale={customLocale}
            onChange={changePage}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `总数据 ${total} 条`}
          />
        </Card>
      </div>
    </div>
  )
}
