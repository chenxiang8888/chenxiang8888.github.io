import React,{ useState,useEffect } from 'react'
import style from "./RankingIcon.module.css"
export default function RankingIcon(props) {
  const [styleName,setStyleName]=useState('')
  useEffect(()=>{
    change()
  })
  const change=()=>{
    if(props.children===1){
      setStyleName("fist")
    }else if(props.children===2){
      setStyleName("two")
    }else if(props.children===3){
      setStyleName("three")
    }else{
      setStyleName("other")
    }
  }
  return (
    <div className={style.rank}>
          <div className={style[styleName]}>{props.children}</div>
    </div>
  )
}
