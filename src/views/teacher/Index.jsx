import React, { Component, useRef, useState, useEffect } from 'react'
import { Row, Col, Card, Button, Select, Form, Input, Table, Tag, Pagination, message } from 'antd'
import Search from 'antd/lib/transfer/search';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import style from './teacher.module.css'
import { teachList ,deleteTeacher,deleteTeachers} from '../../Api/teacher';
import CreateTeacher from './CreateTeacher';
import Text from './Text';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import moment from 'moment';
const customLocale = {
  items_per_page: '/ 页',
  jump_to: '跳至',
  jump_to_confirm: '确定',
  page: '',
};
const { Option } = Select;
export default function Index() {
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: "center",
      render: (_, __, index) => index + 1
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => text === 1 ? "男" : "女"
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (text) => {
        if (text === 1) {
          return <Tag color="#f50">初级教师</Tag>
        } else if (text === 2) {
          return <Tag color="#2db7f5">中级教师</Tag>
        } else if (text === 3) {
          return <Tag color="#87d068">高级教师</Tag>
        } else {
          return <Tag color="#108ee9">特级教师</Tag>
        }
      }
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
      render: (text) => text === "1" ? "兼职" : "全职"
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
      width: 150,
      key: 'address',
      render: (text,record,index) => {
        return <div>
          <Button type="primary" size='small' onClick={()=>edit(record)}>编辑</Button>
          <Button type="danger" className='ml' size='small' onClick={()=>removeTeach(record)}>删除</Button>
        </div>
      }
    },
  ];
  //=======================================状态==========================================================================================================
  const [rowId,setRowId]=useState([])
  const modalRef=useRef(null)
  const [title,setTitle]=useState('')
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([])
  const [deletes, SetDelete] = useState(true)
  const [pageData, setPageData] = useState({ page: "1", pageSize: 10 })
  const [form] = Form.useForm();
  const [listId,setListId]=useState(null)
  const formRef = useRef(null)
  const [defaultRow,setDefaultRow]=useState([])
  //--------------------------------------------生命周期------------------------------------------------------------------------------------
  useEffect(() => {
    console.log(pageData,123)
    loadData()
    
  }, [pageData])
  const onReset = () => {
    form.resetFields();
    loadData()
  }
  const search = (values) => {
    const searchData = form.getFieldsValue()

    loadData(searchData)
  }
  //------------------------------------------------------加载数据 ----------------------------------------------------------------------------------
  const loadData = (msg={}) => {
    setLoading(true)
    teachList({...pageData,...msg }).then((res) => {
     
      let data = res.data.map(item => {
        return { ...item, key: item.id }
      })
      setDataSource(data)
      setTotal(res.total)
      setLoading(false)
      console.log(res)
      setDefaultRow(ress=>{
        ress=res.data.map(item=>item.id).slice(0,6)
        ress.length>0?SetDelete(false):SetDelete(true)
        return ress
      })
      
    }).catch(() => {
      setLoading = false
    })
  }
  //-------------------------------------------------------------分页--------------------------------------------------------------------------------------
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>上一页</a>;
    }
    if (type === 'next') {
      return <a>下一页</a>;
    }
    return originalElement;
  };
  const onChange=(page,pageSize)=>{
    setPageData({page,pageSize})
    
  }
  // const onShowSizeChange=(page,pageSize)=>{
  //   console.log(page,pageSize)
   
  // }
  
  //==========================================================选择框=============================================================================================
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setDefaultRow(prev=>{
        prev=selectedRowKeys
        return prev
      })
      setRowId(selectedRowKeys)
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      selectedRowKeys.length>0?SetDelete(false):SetDelete(true)
    
    },
    selectedRowKeys:defaultRow

    
   
  };
  //----------------------------------------------------------------批量删除-----------------------------------------------------------------------------------------
  const removeTeachers=()=>{
    deleteTeachers({ids:rowId}).then((res)=>{
      if(res.code===0){
        SetDelete(true)
        message.success(res.msg)
      }
      loadData()
      
    }).catch(()=>{})
  }
  //1---------------------------------------------------------------编辑-----------------------------------------------------------------------------------------------
  const edit=(record)=>{
    let birth=moment(record.birth)
    let date=moment(record.date)
    setListId(record.id)
    setTitle("编辑员工")
    console.log(record)

    setIsModalOpen(true)
    modalRef.current.form.setFieldsValue({...record,birth,date})
   
    console.log(modalRef)
  }
  //-----------------------------------------------------------------删除---------------------------------------------------------------------------------------------
  const removeTeach=(recore)=>{
    let id=recore.id
    deleteTeacher({id}).then((res)=>{
      if(res.code===0){
        message.success(res.msg)
        loadData()
      }
      console.log(res)
    }).catch(()=>{})
  }
  //----------------------------------------------------------------新建员工---------------------------------------------------------------------------------------------
  const newHires=()=>{
    setTitle("新建员工")
    modalRef.current.form.resetFields()
    setIsModalOpen(true)
    
  }
  return (
    <div className='mt'>
      <Text ></Text>
      <CreateTeacher
      listId={listId}
        ref={modalRef}
        title={title}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        loadData={loadData}
      ></CreateTeacher>
      <div className='mud'>
        <Card>
          <Form
            ref={formRef}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            form={form}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="姓名"
                  name="name"
                >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="科目"
                  name="subject"

                >
                  <Select
                    placeholder="全部"
                  >
                    <Option value="">全部</Option>
                    <Option value="语文">语文</Option>
                    <Option value="数学">数学</Option>
                    <Option value="英语">英语</Option>
                    <Option value="物理">物理 </Option>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物 </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="手机号"
                  name="tel"
                >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Button type='primary' onClick={search}>查询</Button>
                  <Button className='ml' onClick={onReset}>重置</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <div className='mt'>
          <Card >
            <Button type='primary' className='mr' onClick={newHires}>新建员工</Button>
            <Button danger disabled={deletes} onClick={removeTeachers}>批量删除</Button>
          </Card>
        </div>
        <div className={style.tablex}>
          <Card>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowSelection={{ ...rowSelection }}
              loading={loading}
              pagination={false}
            />
            <Pagination 
            showQuickJumper 
            current={pageData.page}
            total={total}
             onChange={onChange} 
            showTotal={(total) => `总数据 ${total} 条`}
            locale={customLocale}
            // onShowSizeChange={onShowSizeChange}
            />
          </Card>
          <div>

          </div>
        </div>
      </div>

    </div>
  )
}

