import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'
import { Breadcrumb, Card, Form, Input, Row, Col, Button, Table, message, Tag, Steps } from "antd"
import style from './solicitation.module.css'
const { Step } = Steps;
export default function Index() {
  const history = useHistory()
  const goBack = () => {
    history.goBack(1)
  }
  const items=[
    {title:"报名咨询",description:"线上对接预约"},
    {title:"门店咨询",description:"课程顾问李老师接待"},
    {title:"办理入学",description:"安排校区及开课时间"},
    {title:"开课",description:"安排班级"},
  ]
  return (
    <div>
      <div className='mud'>
        <Breadcrumb>
          <Breadcrumb.Item>招生管理</Breadcrumb.Item>
          <Breadcrumb.Item>邀约查询</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='mud'>
        <Card>
          <div className={style.goback}>
            <Button onClick={goBack} >返回</Button>
          </div>
        </Card>
      </div>
      <div className='mud'>
        <Card>
          <h4 className={style.title}>家长信息</h4>
          <Row>
            <Col span={6}>
              <p>姓名:陈研清</p>
              <p>年龄:37</p>
              <p>满意因素：环境好，老师素质高</p>
            </Col>
            <Col span={6}>
              <p>电话:15789887654</p>
              <p>文化程度：本科</p>
              <p>不满意因素：费用贵</p>
            </Col>
            <Col span={6}>
              <p>家庭住址：北京市朝阳区</p>
              <p>关系：母亲</p>
              <p>其他意向机构：学而思</p>
            </Col>
            <Col span={6}>
              <p>咨询课程：三年级数学</p>
              <p>意向成度:2</p>
              <p>备注：再考虑一下，预计一星期内回复</p>
            </Col>
          </Row>
        </Card>
      </div>
      <div className='mud'>
        <Card>
          <h4 className={style.title}>学生信息</h4>
          <Row>
            <Col span={6}>
              <p>姓名:罗梦雨</p>
              <p>学校：育才小学</p>
              <p>语文成绩:87</p>
            </Col>
            <Col span={6}>
              <p>性别： 女</p>
              <p>班级排名:16</p>
              <p>数学成绩:45</p>
            </Col>
            <Col span={6}>
              <p>年龄:10</p>
              <p>弱势学科：数学</p>
              <p>英语成绩:82</p>
            </Col>
            <Col span={6}>
              <p>年级：三年级</p>
              <p>优劣势：活泼好动，注意力不集中，有不认真的习惯</p>
              <p>备注：数学比较偏科，语文英语不够拔尖</p>
            </Col>
          </Row>
        </Card>
      </div>
      <div className='mud'>
        <Card>
          <h4 className={style.title}>课程咨询师信息</h4>
          <Row>
            <Col span={6}>
              <p>姓名:徐光华</p>
              <p>沟通时长:2小时</p>
              <p>所属校区：中心校区</p>
            </Col>
            <Col span={6}>
              <p>工号:2018070633</p>
              <p>服务态度：很好</p>
              <p>入职年限：两年</p>
            </Col>
            <Col span={6}>
              <p>职位：课程咨询师</p>
              <p>月单量:27</p>
            </Col>
            <Col span={6}>
              <p>电话:16654378763</p>
              <p>客户投诉：无</p>
            </Col>
          </Row>
        </Card>
      </div>
      <div className='mud'>
        <Card>
          <Steps current={1} items={items}>
          </Steps>
        </Card>
      </div>
    </div>

  )
} 
