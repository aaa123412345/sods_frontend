import React from "react";
import { useState,useEffect } from "react";
import useSendRequestWithCache from "../../../hooks/useSendRequestWithCache";




const PublicHeader = ({lang}) => {
    
    const [items, setItems] = useState([]);
    const [ready, setIsReady] = useState(false);

    const host = process.env.REACT_APP_PAGE_IMPORTANT_ELEMENT_REST_HOST
    const pathname = "publicheader"
    const initHook = useSendRequestWithCache(host+lang+'/'+pathname,'get',{},true,false,true);
    
    
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
            <div className="Header">
                <img src={items.src} alt={items.alt} style={items.style}></img>
        
            </div>
        )
      }
    }


export default PublicHeader;