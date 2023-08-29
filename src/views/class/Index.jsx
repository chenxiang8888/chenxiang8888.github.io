import React, { useState, useEffect, useRef } from 'react'
import { Card, Row, Col, Avatar, Skeleton, Switch, message } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { course, deleteClass } from '../../Api/course';
import style from './class.module.css'
import moment from 'moment';
import AddCourse from './addCourse';
const { Meta } = Card;
export default function Index() {
  const [msg, setMsg] = useState(0)
  const [time, setTime] = useState(172800000)
  const [timer1, setTimer1] = useState("48:00:00")
  const [timer2, setTimer2] = useState("48:00:00:999")
  const [day, setDay] = useState("2天0时0分0秒")
  const [courseData,setCourseData]=useState([])
  const [openModal,setOpenModal]=useState(false)
  const modalRef=useRef(null)
  const [mytimer,setMyTimer]=useState(null)

  useEffect(() => {
      const tim=setInterval(() => {
        setTime((prev) => {
          prev = prev - 101
          timer(prev)
          timertwo(prev)
          timer3(prev)
          return prev
        })
      }, 101)
    loadData()
    return clearInterval(tim)
  }, [])

  
  const timer = (time) => {
    let hours = Math.floor(time / 1000 / 60 / 60)
    let minutes = Math.floor((time - hours * 1000 * 60 * 60) / 1000 / 60)
    let second = Math.floor((time - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000)
    setTimer1(`${hours}:${minutes}:${second}`)
  }
  const timertwo = (time) => {
    let hours = Math.floor(time / 1000 / 60 / 60)
    let minutes = Math.floor((time - hours * 1000 * 60 * 60) / 1000 / 60)
    let second = Math.floor((time - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000)
    let m = Math.floor((time - hours * 1000 * 60 * 60 - minutes * 1000 * 60 - second * 1000))
    setTimer2(`${hours}:${minutes}:${second}:${m}`)
  }
  const timer3 = (time) => {
    let d = Math.floor(time / 1000 / 60 / 60 / 24)
    let hours = Math.floor((time - d * 1000 * 60 * 60 * 24) / 1000 / 60 / 60)
    let minutes = Math.floor((time - hours * 1000 * 60 * 60 - d * 1000 * 60 * 60 * 24) / 1000 / 60)
    let second = Math.floor((time - hours * 1000 * 60 * 60 - minutes * 1000 * 60 - d * 1000 * 60 * 60 * 24) / 1000)
    setDay(`${d}天${hours}时${minutes}分${second}秒`)
  }
  // const dele = () => {
  //   tim=setInterval(() => {
  //     setTime((prev) => {
  //       prev = prev - 101
  //       timer(prev)
  //       timertwo(prev)
  //       timer3(prev)
  //       return prev
  //     })
  //   }, 101)
  // }
  const loadData=()=>{
    course().then(res=>{
      setCourseData(res.data)
      console.log(res)
      
    })
  }
  const remove=(e)=>{
    deleteClass({id:e}).then(res=>{
      message.success(res.msg)
      console.log(res)
      loadData()
    })
    console.log(e)
  }
  //----------------------------------------------------------打开domal-------------------------------------------------------------------------------------------------------
  const open=()=>{
    setOpenModal(true)
    modalRef.current.reset()
  }
  return (
    <div>
      
      <AddCourse
      ref={modalRef}
        openModal={openModal}
        setOpenModal={setOpenModal}

      >

      </AddCourse>
      <div className='mud'>
        <Card>
          <Row>
            <Col span={8}>
              <p onClick={timer}>模拟倒计时</p>
              <h3>{timer1}</h3>
            </Col>
            <Col span={8}>
              <p>测评日</p>
              <h3>{timer2}</h3>
            </Col>
            <Col span={8}>
              <p>模拟倒计时</p>
              <h3>{day}</h3>
            </Col>
          </Row>
        </Card>
      </div>
      <div className='mud'>
        <Row gutter={16}>
            {courseData.map(item=>{
              return(
                <Col span={8}  key={item.id}>
                <Card
                 
                  style={{
                    borderRadius:"5px",
                    marginTop: 16,
                  }}
                  actions={[
                    <p onClick={open}>新增排课</p>,
                    <p onClick={()=>remove(item.id)}>删除排课</p>,
                  ]}
                >
                  <Skeleton avatar active loading={false}>
                    <Meta
                      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
                    
                      description={
                      <div>
                        <h1>教室：{item.classroom}</h1>
                        <p>老师：{item.teacher}</p>
                        <p>学科：{item.subject}</p>
                        <p>班型：{item.type==="2"?"小班":"一对一"}</p>
                        <h1 className={style.time}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</h1>
                      </div>
                    }
                    />
                  </Skeleton>
                </Card>
              </Col>
              )
            })}

        </Row>

      </div>
      
    </div>

  )
}
