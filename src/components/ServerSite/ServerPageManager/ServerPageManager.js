import React from "react";
import ServerSidebar from "../ServerSidebar/ServerSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import {useParams} from "react-router-dom"
import {useState} from "react";

import ServerPageContent from "../ServerPageContent/ServerPageContent";



const ServerPageManager = (props) => {
    
    let {path} = useParams();
    const [mobile,setMoblie] = useState(false)
    const windowSize = useWindowSize();

    if (typeof windowSize.width !== 'undefined'){
    
        return(
          <div className="serverSite" >
     
            <ServerSidebar setDisplay = {windowSize.width>768 ? true:false}/>

            <div className="content" style={{paddingLeft: windowSize.width>768 ? "200px" : "0px"  }}>
               
                <ServerPageContent />
          
          </div>
        </div>
        )
      
    }
}

export default ServerPageManager;