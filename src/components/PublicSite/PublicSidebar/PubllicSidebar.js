
import React from "react";

import Sidebar from '../../Common/Sidebar/Sidebar' 
import { useState,useEffect } from "react";

import useSendRequestWithCache from "../../../hooks/useSendRequestWithCache";
//import useSendRequest from "../../../hooks/useSendRequest";

const PublicSidebar = props =>  {
    
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    
    const host = process.env.REACT_APP_PAGE_IMPORTANT_ELEMENT_REST_HOST
    const pathname = "publicnavdata"
    const initHook =useSendRequestWithCache(host+props.lang+'/'+pathname,'get',{},true,false,true);

    useEffect(()=>{
      if(!initHook.isLoaded){
        if(initHook.ready){
            if(initHook.items !== undefined){
                setItems(initHook.items)
                setIsReady(true)
            } 
        }else if(initHook.errMsg !== ""){
            alert(initHook.errMsg)
        }
      }

  },[initHook])
    
  
      
  if(ready){
        return(
          <Sidebar data={items}  setDisplay={props.setDisplay}/>
        )
  }
      
    
   //<Sidebar data={items} lang={lang} setDisplay={props.setDisplay}/>
    
}

export default PublicSidebar;