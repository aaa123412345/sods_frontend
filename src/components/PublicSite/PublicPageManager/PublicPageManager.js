import React from "react";

import PublicSidebar from "../PublicSidebar/PubllicSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import {useParams} from "react-router-dom"
import PageContent from "../../PageBuilder/PageContent/PageContent";



const PublicPageManager = () => {
    let {path,subpath,lang,subsubpath} = useParams();
    const windowSize = useWindowSize();
   
   
    if (typeof windowSize.width !== 'undefined'){
    
        return(
          <div id="site" >
     
            <PublicSidebar lang={lang} setDisplay = {windowSize.width>768 ? true:false}/>

            <div id="content" style={{paddingLeft: windowSize.width>768 ? "200px" : "0px"  }}>
            
            <PageContent host={process.env.REACT_APP_PUBLIC_REST_HOST} 
            path={path} subpath={subpath} subsubpath={subsubpath} lang={lang} mode={'public'}></PageContent>
          
          </div>
        </div>
        )
      
    }
}

//<PublicPageContent path={path} subpath={subpath} lang={lang}/>

export default PublicPageManager;