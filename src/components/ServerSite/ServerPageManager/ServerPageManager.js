import React from "react";
import ServerSidebar from "../ServerSidebar/ServerSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import {useParams} from "react-router-dom"
import {useState} from "react";

import ServerPageContent from "../ServerPageContent/ServerPageContent";



const ServerPageManager = (props) => {
    
    let {path,subpath} = useParams();
    const [mobile,setMoblie] = useState(false)
    const windowSize = useWindowSize();

    if (typeof windowSize.width !== 'undefined'){
    
        return(
          <div id="site" >
     
            <ServerSidebar setDisplay = {windowSize.width>768 ? true:false}/>

            <div id="content" style={{paddingLeft: windowSize.width>768 ? "200px" : "0px"  }}>
               
                <ServerPageContent path={path} subpath={subpath}/>
          
          </div>
        </div>
        )
      
    }
}

export default ServerPageManager;