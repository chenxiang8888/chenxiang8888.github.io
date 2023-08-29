import { post } from "../utils/request";
export const course=(payload)=>{
    return post('/class/classList',payload)
}
export const deleteClass=(payload)=>{
    return post("/class/deleteClass",payload)
}