import React from "react";

import PageBootstrapHandler from "../../PageBuilder/LayoutHandler/LayoutHandler";
import ElementBuilder from "../../PageBuilder/ElementBuilder/ElementBuilder";

import PublicHeader from "../../PublicSite/PublicHeader/PublicHeader";
import PublicNavbar from "../../PublicSite/PublicNavbar/PublicNavbar";
import ServerNavbar from "../../ServerSite/ServerNavbar/ServerNavbar";


import useSendRequest from "../../../hooks/useSendRequest";
import useAuthChecker from "../../../hooks/useAuthChecker";
import { useState } from "react";
import { useEffect } from "react";
import cloneDeep from "lodash.clonedeep";



const PageContent = ({host,path,subpath,subsubpath,lang,mode}) => {
      const [pageActive,setPageActive] = useState(true)
      const page = useSendRequest(host+lang+'/'+path,'get',{},pageActive,true)
      
      const [authHookState,setAuthHookState] = useState({requirePermission:'',active:false});
      const auth = useAuthChecker(authHookState.requirePermission,authHookState.active)

      const [ready,setReady] = useState(false)
      

      useEffect(()=>{
        setReady(false)
        setPageActive(true)
        
      },[host,path,subpath,lang])

      useEffect(()=>{
        if(!page.isLoaded && pageActive){
            if(page.ready){
                try{
                    
                    setAuthHookState({
                      requirePermission:page.items.page.auth,
                      active:true
                    })
                    
                  }catch(e){
                    alert("The page data have error. Please communicate with administrator if this error message exist")
                  }
                  setPageActive(false)
                 
                }else if(page.errMsg !==""){
                  alert(page.errMsg)
                  setPageActive(false)
                }
                //console.log(page)
            }       
        }
      ,[page])

      useEffect(()=>{
       
        if(auth.ready && authHookState.active){
          
          if(auth.result === true){
            setReady(true)
          }else{
            if(auth.redirect!==''){
              window.location.href = auth.redirect
            }
          }
          setAuthHookState({requirePermission:'',active:false})
        }
      },[auth])

     
        if(ready && page.items!=={}){
          var items = page.items
          var useHeader = true
          
         
          return(
            <>
          
            {useHeader&&mode==="public"?<PublicHeader lang={lang}/>:''}
            <div className="PageContent" style={items.page.style}> 
                
                {mode==="public"? <PublicNavbar pdata={items.page} lang={lang}></PublicNavbar>:
                  <ServerNavbar pdata={items.page} lang={lang}></ServerNavbar>
                }
              
              <div style={{paddingLeft:'5px'}}>
                { items.page.useBootstrap?
                <PageBootstrapHandler data={items.element} path={path} subpath={ subpath} lang={lang}></PageBootstrapHandler>:
                items.element.map((element)=> ElementBuilder({data:element,path:path,subpath:subpath,lang:lang}))
                }
              </div>
            </div>
            </>
          )
        }
      }


export default PageContent;