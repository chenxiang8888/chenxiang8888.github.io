import {post} from "../utils/request"
const nowLogin = (data)=>{
   return  post("/user/login",data)
}










export {nowLogin}