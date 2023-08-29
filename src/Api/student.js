import { post } from "../utils/request";
export const studentList=()=>{
    return post('/student/studentList')
}
export const studentExam=(payload)=>{
    return post('/student/exam',payload)
}
export const addClass=(payload)=>{
    return post('/class/addClass',payload)
}