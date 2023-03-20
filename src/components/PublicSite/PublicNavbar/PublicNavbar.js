
import React from "react";

import CusNavbar from "../../Common/Navbar/CusNavbar/CusNavbar";
import { useState,useEffect } from "react";
import useSendRequestWithCache from "../../../hooks/useSendRequestWithCache";
//import useSendRequest from "../../../hooks/useSendRequest";

const PublicNavbar = props =>  {
   
  const [ready, setIsReady] = useState(false);
  const [items, setItems] = useState([]);
    const lang = props.lang
    const host = process.env.REACT_APP_PAGE_IMPORTANT_ELEMENT_REST_HOST
    const pathname = "publicnavdata"
    const initHook = useSendRequestWithCache(host+props.lang+'/'+pathname,'get',{},true,false,true);

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
            <CusNavbar data={items} lang={lang} pdata={props.pdata} mode = "public"/>
        )
  }
      
   
    
}

export default PublicNavbar;