

export const filterRouter=(data,role)=>{

    return data.filter(item=>{
        if(item.children){
            item.children=filterRouter(item.children,role)
        }
        return item.meta.role.includes(role)

    })
}

export   const  menuTree=(data)=>{
    return data.map(item=>{
       if(item.children){
         menuTree(item.children)
       }
       return  { label: item.meta.title, key: item.path }
     })
   }