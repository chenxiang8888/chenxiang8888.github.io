import axios from "axios";
import {message } from "antd"
const service=axios.create({
    baseURL:"http://47.98.219.152:3000",

})

service.interceptors.request.use((req)=>{
    if(sessionStorage.getItem("token")){
        req.headers["Authorization"]=`bearer ${sessionStorage.getItem("token")}`
    }
    return req
})

service.interceptors.response.use((res)=>{
    const {data}=res
    if(data.code===0){
        return data
    }else{
        message.error(data.msg||"请求失败")
        return Promise.reject(data||"请求失败")
    }
},(res)=>{
    message.error("请求失败")
    
    return Promise.reject("请求失败")
})

const get=(url,params)=>{
    let config={
        method:"get",
        url,
    }
    if(params){
        config.params=params
    }
    return service(config)
}
const post=(url,data)=>{
    let config={
        method:"post",
        url,
    }
    if(data){
        config.data=data
    }
    return service(config)
}

export {get,post}