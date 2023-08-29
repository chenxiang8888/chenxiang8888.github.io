import { post } from "../utils/request";
export function teachList(data){
    return post('/teacher/teacherList',data)
}
//--------------------------------------新建老师------------------------------------------------------------------------
export const addTeacher=(payload)=>{
    return post('/teacher/addTeacher',payload)
}

//-------------------------------------编辑教师----------------------------------------------------------------------------
export const editTeacher=(data)=>{
    return post("/teacher/editTeacher",data)
}
//--------------------------------------删除接口------------------------------------------------------------------------------
export const deleteTeacher=(data)=>{
    return post("/teacher/delete",data)
}

export const deleteTeachers=(data)=>{
    return post("/teacher/batchDelete",data)
}