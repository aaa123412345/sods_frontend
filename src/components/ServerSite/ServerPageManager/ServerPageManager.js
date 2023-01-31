import React from "react";
import ServerSidebar from "../ServerSidebar/ServerSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import {useParams} from "react-router-dom"


import PageContent from "../../PageBuilder/PageContent/PageContent";



const ServerPageManager = (props) => {
    
  let {path,subpath,lang,subsubpath} = useParams();

    const windowSize = useWindowSize();

    if (typeof windowSize.width !== 'undefined'){
    
        return(
          <div id="site" >
     
            <ServerSidebar lang={lang} setDisplay = {windowSize.width>768 ? true:false}/>

            <div id="content" style={{paddingLeft: windowSize.width>768 ? "200px" : "0px"  }}>
               
                
                <PageContent host={process.env.REACT_APP_SERVER_REST_HOST} 
            path={path} subpath={subpath} lang={lang} mode={'private'}></PageContent>
          
          </div>
        </div>
        )
      
    }
}

export default ServerPageManager;