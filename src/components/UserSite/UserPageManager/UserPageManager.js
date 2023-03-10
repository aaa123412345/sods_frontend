import React from "react";

import useWindowSize from "../../../hooks/useWindowSize";
import {useParams} from "react-router-dom"
import PageContent from "../../PageBuilder/PageContent/PageContent";
import PublicSidebar from "../../PublicSite/PublicSidebar/PubllicSidebar";

const UserPageManager = () => {
    let {path,subpath,lang} = useParams();
    const windowSize = useWindowSize();
   

    if (typeof windowSize.width !== 'undefined'){
    
        return(
          <div id="site" >
     
            <PublicSidebar lang={lang} setDisplay = {windowSize.width>=768 ? true:false}/>

            <div id="content" style={{paddingLeft: windowSize.width>=768 ? "200px" : "0px"  }}>
            <PageContent host={process.env.REACT_APP_USER_REST_HOST} 
            path={path} subpath={subpath} lang={lang} mode={'public'}></PageContent>
          </div>
        </div>
        )
      
    }
}



export default UserPageManager;