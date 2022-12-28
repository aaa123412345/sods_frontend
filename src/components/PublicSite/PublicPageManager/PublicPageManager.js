import React from "react";
import PublicPageContent from "../PublicPageContent/PublicPageContent";
import PublicSidebar from "../PublicSidebar/PubllicSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import {useParams} from "react-router-dom"



const PublicPageManager = () => {
    let {path,subpath,lang} = useParams();
    const windowSize = useWindowSize();
   

    if (typeof windowSize.width !== 'undefined'){
    
        return(
          <div id="site" >
     
            <PublicSidebar setDisplay = {windowSize.width>768 ? true:false}/>

            <div id="content" style={{paddingLeft: windowSize.width>768 ? "200px" : "0px"  }}>
            
          
          <PublicPageContent path={path} subpath={subpath} lang={lang}/>
          </div>
        </div>
        )
      
    }
}



export default PublicPageManager;