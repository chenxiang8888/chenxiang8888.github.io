const initState={role:"",nickname:""}
export const authReducer=(prevState=initState,action)=>{
    const {type,payload} = action
    if(type==="getAuth"){
        return payload
    }
    return prevState
}
export const menusReducer=(prevState=[],action)=>{
    const {type,payload}=action
    if(type==="getMenus"){
        console.log(12345)
        return payload

    }
    return prevState
}