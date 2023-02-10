import React from "react";

import PageBootstrapHandler from "../../PageBuilder/LayoutHandler/LayoutHandler";
import ElementBuilder from "../../PageBuilder/ElementBuilder/ElementBuilder";

import PublicHeader from "../../PublicSite/PublicHeader/PublicHeader";
import PublicNavbar from "../../PublicSite/PublicNavbar/PublicNavbar";
import ServerNavbar from "../../ServerSite/ServerNavbar/ServerNavbar";


import useFetch from "../../../hooks/useFetch";
import page404 from "../../Common/Page404/Page404";



const PageContent = ({host,path,subpath,subsubpath,lang,mode}) => {
    const {items,isLoaded,ready,error,redirection} = useFetch(host+lang+'/'+path)

      if (error) {
        console.log("Error")
      } else if (isLoaded) {
        
      } else {
       
        if(ready) {
        
          return(
            <>
          
            {items.page.useHeader&&mode==="public"?<PublicHeader lang={lang}/>:''}
            <div className="PageContent" style={items.page.style}> 
                
                {mode==="public"? <PublicNavbar pdata={items.page} lang={lang}></PublicNavbar>:
                  <ServerNavbar pdata={items.page} lang={lang}></ServerNavbar>
                }
              

              { items.page.useBootstrap?
              <PageBootstrapHandler data={items.element} path={path} subpath={ subpath} lang={lang}></PageBootstrapHandler>:
              items.element.map((element)=> ElementBuilder({data:element,path:path,subpath:subpath,lang:lang}))
              }
            </div>
            </>
          )
        }else{
          return(redirection)

        }
    }
    
}

export default PageContent;