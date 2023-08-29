import {get, post} from '../utils/request'
export const roleList=()=>{
    return get('/user/getUserList')
}
export const changeAuth=(payload)=>{
    return post("/user/changeRole",payload)
}