import React, { Component } from 'react'
import * as echarts from 'echarts';
import { Card, Col, Row, Button, Tooltip, Tabs, Timeline } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import style from "./home.module.css"
import RankingIcon from '../../components/rankIcon/RankingIcon';
export default class Index extends Component {
  constructor() {
    super()


    this.state = {
      totalData: [
        {
          sell: 1526560,
          up: "12%",
          decline: "18%",
          daySell: 166.3
        },
        {
          sell: 560,
          up: "12%",
          decline: "13%",
          daySell: 16
        },
        {
          sell: 882,
          up: "12%",
          decline: "13%",
          daySell: 16
        },
        {
          sell: 560,
          up: "3%",
          decline: "9%",
          daySell: 16
        },
      ],
      bar:
      {
        "一月": 264,
        "二月": 255,
        "三月": 24,
        "四月": 294,
        "五月": 244,
        "六月": 354,
        "七月": 484,
        "八月": 864,
        "九月": 464,
        "十月": 454,
        "十一月": 694,
        "十二月": 274
      },
      barYear: "2022年",
      markPoint: [],
      ranking: [
        { "北京校区": 54415 },
        { "深圳校区": 45409 },
        { "杭州校区": 35445 },
        { "青岛校区": 32567 },
        { "长沙校区": 31544 },
        { "南京校区": 23516 },
        { "上海校区": 18518 },
      ],
      operation: [
        { name: "王刚", action: "结算了一门课程", time: "2020-08-16" },
        { name: "王刚", action: "新增了一名学员", time: "2020-09-16" },
        { name: "李梦如", action: "删除了排课记录", time: "2020-08-16" },
        { name: "王丽丽", action: "审核了一笔订单", time: "2020-08-16" },
        { name: "刘晓杰", action: "登陆了系统", time: "2020-08-16" },
        { name: "王志", action: "退出了系统", time: "2020-08-16" },
        { name: "王志", action: "退出了系统", time: "2020-08-16" },
        { name: "王刚", action: "结算了一门课程", time: "2020-08-16" },
      ],
      pieData:[
        {value:58,name:"语文"},
        {value:58,name:"数学"},
        {value:58,name:"英语"},
        {value:58,name:"物理"},
        {value:58,name:"化学"},
        {value:58,name:"生物"},
      ]
    }
  }
  // state = {
  //   totalData: [
  //     {
  //       sell: 1526560,
  //       up: "12%",
  //       decline: "18%",
  //       daySell: 166.3
  //     },
  //     {
  //       sell: 560,
  //       up: "12%",
  //       decline: "13%",
  //       daySell: 16
  //     },
  //     {
  //       sell: 882,
  //       up: "12%",
  //       decline: "13%",
  //       daySell: 16
  //     },
  //     {
  //       sell: 560,
  //       up: "3%",
  //       decline: "9%",
  //       daySell: 16
  //     },
  //   ],
  //   bar:
  //   {
  //     "一月": 264,
  //     "二月": 255,
  //     "三月": 24,
  //     "四月": 294,
  //     "五月": 244,
  //     "六月": 354,
  //     "七月": 484,
  //     "八月": 864,
  //     "九月": 464,
  //     "十月": 454,
  //     "十一月": 694,
  //     "十二月": 274
  //   },
  //   barYear: "2022年",
  //   markPoint:[]
  // }
  point = () => {
    let sortedData = this.state.bar
    let show = []
    let num = 0
    for (let i in sortedData) {

      show.push({ name: i, value: sortedData[i], xAxis: num, yAxis: sortedData[i] })
      num++
    }
    return show
  }
  componentDidMount() {
   
    this.proOfClass()
    this.barGraph()

  }
  componentDidUpdate() {
    this.barGraph()
  }
  load=()=>{
    setInterval(() => this.timer(), 10000)
    this.setState({
      markPoint: this.point()
    })
  }
  //------------------------------------------------------------------------------------------柱状图-----------------------------------------------------------------------------------------
  barGraph = () => {
    let myChart = echarts.init(this.bar);
    let option = {
      title: {
        text: this.state.barYear+" 单位（万元）",
        left:"auto"
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
      },
      xAxis: {
        type: 'category',
        data: Object.keys(this.state.bar)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: Object.values(this.state.bar),
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          markPoint: {
            data: this.state.markPoint
          },
        }
      ]
    };
    myChart.setOption(option)
  }
  //-----------------------------------------------------------------------------定时改折现图数据--------------------------------------------------------------------------------------------
  timer = () => {
    let arr = JSON.parse(JSON.stringify(this.state.bar))
    let obj = {}
    for (let i in arr) {
      obj[i] = Math.floor(Math.random() * 1000)
    }
    const dataArray = Object.entries(obj);

    // 使用数组的sort方法进行排序
    dataArray.sort((a, b) => b[1] - a[1]);

    // 将排序后的数组转换回对象
    const sortedData = Object.fromEntries(dataArray);
    let show = []
    let num = 0
    for (let i in sortedData) {

      show.push({ name: i, value: sortedData[i], xAxis: num, yAxis: sortedData[i] })
      num++
    }
    const year = Math.floor(Math.random() * (2023 - 1970 + 1)) + 1970; // 1970年至2023年之间的随机年份
    this.setState({
      bar: sortedData,
      barYear: year + "年",
      markPoint: show
    })
  }
  //------------------------------------------------------------------------------------------折线图-------------------------------------------------------------------------------------
  drowLine=(key,event)=>{
    console.log(key,event)
    setTimeout(()=>{
      let myChart=echarts.init(this.line)
      let option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
          text: 'Gradient Stacked Area Chart'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
   
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: Object.keys(this.state.bar)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: Object.values(this.state.bar)
          },
      
         
        ]
      };
      myChart.setOption(option)
    },0)

  }
  //------------------------------------------------------------------------------------------饼图-----------------------------------------------------------------------------------------
  proOfClass = () => {
    let myChart = echarts.init(this.myPie)
    let option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '学科',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: true
          },
          data: this.state.pieData
        }
      ]
    };
    myChart.setOption(option)
  }
  //----------------------------------------------------------------------------------点击tabs的回调-----------------------------------------------------------------------------------------

  render() {
    return (
      <div className={style.total}>
        <Row gutter={[16]}>
          <Col span={6} className={style.col}>
            <Card size="small">
              <p>总销售额</p> <Tooltip placement="top" title={"吃饭了吗"}><InfoCircleOutlined className={style.icons} /></Tooltip>
              <h3 className={style.num}>￥1526,560</h3>
              <p><span>周同比 <span className={style.up}>15%</span><ArrowUpOutlined className={style.up} /></span><span> 日同比<span className={style.decline}>19%<ArrowDownOutlined /></span></span></p>
              <hr className={style.hr} />
              <p>日销售额 62415</p>
            </Card>
          </Col>
          <Col span={6} className={style.col}>
            <Card size="small">
              <p>访问量</p><Tooltip placement="top" color='yellow' title={"晚上好"}><InfoCircleOutlined className={style.icons} /></Tooltip>
              <h3 className={style.num}>￥1520</h3>
              <p><span>周同比 <span className={style.up}>18%</span><ArrowUpOutlined className={style.up} /></span><span> 日同比<span className={style.decline}>18%<ArrowDownOutlined /></span></span></p>
              <hr className={style.hr} />
              <p>日均访问量 88762415</p>
            </Card>
          </Col>
          <Col span={6} className={style.col}>
            <Card size="small">
              <p>支付笔数</p>
              <h3 className={style.num}>￥26,560</h3><Tooltip placement="top" color="blue" title={"早上好"}><InfoCircleOutlined className={style.icons} /></Tooltip>
              <p><span>周同比 <span className={style.up}>11%</span><ArrowUpOutlined className={style.up} /></span><span> 日同比<span className={style.decline}>16%<ArrowDownOutlined /></span></span></p>
              <hr className={style.hr} />
              <p>转化率  92%</p>
            </Card>
          </Col>
          <Col span={6} className={style.col}>
            <Card size="small">
              <p>流失学员</p>
              <h3 className={style.num}>￥9560</h3><Tooltip placement="top" color="pink" title={"中午好"}><InfoCircleOutlined className={style.icons} /></Tooltip>
              <p><span>周同比 <span className={style.up}>115%</span><ArrowUpOutlined className={style.up} /></span><span> 日同比<span className={style.decline}>9%<ArrowDownOutlined /></span></span></p>
              <hr className={style.hr} />
              <p>流失最多科目: 英语</p>
            </Card>
          </Col>
        </Row>
        <Row className={style.visuali}>
          <Col span={24}>
            <Card>
              <Tabs defaultActiveKey="1" onTabClick={this.drowLine}>
                <Tabs.TabPane tab="销售额" key="1">
                  <Row>
                    <Col span={16}>
                      <div ref={(e => this.bar = e)} className={style.bar_graph}></div>
                    </Col>
                    <Col span={8}>
                      <h3 className={style.ranking}>校区销售额排名</h3>
                      {/* <RankingIcon>1</RankingIcon> */}
                      {this.state.ranking.map((item, index) => {
                        return (
                          <div className={style.schoolinfo} key={index}>
                            <RankingIcon  key={index}>{index + 1}</RankingIcon>
                            <span className={style.school}>{Object.entries(item)[0][0]}</span>
                            <span className={style.amount}>{Object.entries(item)[0][1]}</span>
                          </div>
                        )
                      })}
                      {/* <button onClick={this.debu}>按钮</button> */}
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="销售额" key="2">
                  <Row>
                    <Col span={16}>
                      <div ref={(e => this.line = e)} className={style.bar_graph}></div>
                    </Col>
                    <Col span={8}>
                      <h3 className={style.ranking}>校区访问排名</h3>
                      {/* <RankingIcon>1</RankingIcon> */}
                      {this.state.ranking.map((item, index) => {
                        return (
                          <div className={style.schoolinfo} key={index}>
                            <RankingIcon  key={index}>{index + 1}</RankingIcon>
                            <span className={style.school}>{Object.entries(item)[0][0]}</span>
                            <span className={style.amount}>{Object.entries(item)[0][1]}</span>
                          </div>
                        )
                      })}
                      {/* <button onClick={this.debu}>按钮</button> */}
                    </Col>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
        <Row className={style.visuali} gutter={[16]}>
          <Col span={12} className={style.operate}>
            <Card title="操作动态">
              <Timeline>
                {this.state.operation.map((item, index) => {
                  return (
                    <Timeline.Item key={index} color={index + 1 === 1 ? "green" : (index + 1 === 2 ? "blue" : (index + 1 === 3 ? "yellow" : "red"))}>
                      <p>{item.name}{item.action}</p>
                      <p>操作时间{item.time}</p>
                    </Timeline.Item>
                  )
                })}
              </Timeline>
            </Card>
          </Col>
          <Col span={12} className={style.operate}>
            <Card title="销售额类别比">
              <div className={style.show} ref={e => this.myPie = e}></div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
