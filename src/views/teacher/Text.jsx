import React,{forwardRef,useImperativeHandle} from 'react'

const Text=forwardRef((props,r)=>{
  
    const innerData = "这是子组件的数据";
    useImperativeHandle(r,()=>({
        getChildData: innerData
    }))
    return (
        <div></div>
      )
})

export default Text