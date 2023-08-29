import React, { Component, useEffect, useState } from 'react'
import { Badge, Calendar, Avatar, List, Card, Row, Col, DatePicker } from 'antd';
import { connect } from "react-redux"
import style from './personal.module.css'
import locale from 'antd/es/date-picker/locale/zh_CN';
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";





function Index(props) {
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  //---------------------------------------初始化state--------------------------------------------------------------------------------------------------------------
  const [greeting, setGreeting] = useState('')
  //---------------------------------------解构需要的数据------------------------------------------------------------------------------------------------------------
  const { nickname } = props.msg.authReducer
  //-------------------------------------------生命周期-------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    nowTime()
  })
  //--------------------------------------------判断现在的时间是中午还是晚上------------------------------------------------------------------------------------------
  const nowTime = () => {
    const now = new Date()
    const hours = now.getHours()
    if (hours < 12) {
      setGreeting("早上好")
    } else if (hours > 12 && hours < 18) {
      setGreeting("中午好")
    } else {
      setGreeting("晚上好")
    }
  }
  //---------------------------------------------------------------日历组件------------------------------------------------------------------------------------------------
  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: '王皓的妈妈约回访.' },
          { type: 'success', content: '刘立签合同.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: '写月度总结.' },
          { type: 'success', content: '发工资.' },
          { type: 'error', content: '例会.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: '还房贷' },
          { type: 'success', content: '下午去北京出差' },
          { type: 'error', content: '去财务报销发票' },
          { type: 'error', content: '销售部例会' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const monthCellRender = (value) => {

  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );

  };

  const change = (data, mode) => {
   

  }
  return (
    <div>
      <Row className='mud'>
        <Col span={24}>
          <Card>
            <Row>
              <Col span={18}>
                <h2>{greeting} , {nickname} , 准备吃点什么呢 ？</h2>
                <p>课程咨询师 | 禾苗教育-IT技术部-教育管理系统后台</p>
              </Col>
              <Col span={6} className={`${style.clearfix} ${style.text}}`}>

                <div className={`fl ${style.box}`}>
                  <p>转化学员数</p>
                  <h2>56</h2>
                </div>
                <div className={`fl ${style.box} ${style.rank}`}>
                  <p>团队排名</p>
                  <h2>5/23</h2>
                </div>
                <div className={`fl ${style.box}`}>
                  <p>本月目标</p>
                  <h2>2,345</h2>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

      </Row>
      <Row className='mud'>
        <Col span={24}>
          <Card className='clearfix'>
            <Row className={style.agenda}>
              <Col span={8}>
                <div >
                  <p>我的待办</p>
                  <h1>8个任务</h1>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <p>本周任务平均处理时间</p>
                  <h1>30分钟</h1>
                </div>
              </Col>
              <Col span={8}>
                <div >
                  <p>本周对接学员数</p>
                  <h1>33个</h1>
                </div>
              </Col>
            </Row>



          </Card>
        </Col>
      </Row>
      <Row className='mud'>
        <Col span={24}>
          <Card className='clearfix'>
            <Row>
              <Col span={16}>
                <div >

                  <Calendar monthCellRender={monthCellRender} dateCellRender={dateCellRender} locale={locale} onPanelChange={change} />;
                </div>
              </Col>
              <Col span={8}>
                <Row>
                  <Col span={22} offset={2}>
                    <div>
                      <Card title="操作面板">
                        <Card.Grid style={gridStyle}>操作一</Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>
                          操作二
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>操作三</Card.Grid>
                        <Card.Grid style={gridStyle}>操作四</Card.Grid>
                        <Card.Grid style={gridStyle}>操作五</Card.Grid>
                        <Card.Grid style={gridStyle}>操作六</Card.Grid>
                        <Card.Grid style={gridStyle}>操作七</Card.Grid>
                        <Card.Grid style={gridStyle}>操作八</Card.Grid>
                      </Card>
                    </div>
                    <div className='mt'>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                              title={<a href="https://ant.design">{item.title}</a>}
                              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>

            </Row>



          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default connect(
  state => ({ msg: state })
)(Index)
