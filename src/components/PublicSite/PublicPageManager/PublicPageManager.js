import React from "react";
import PublicHeader from "../PublicHeader/PublicHeader";
import PublicPageContent from "../PublicPageContent/PublicPageContent";
import PublicSidebar from "../PublicSidebar/PubllicSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import {useParams} from "react-router-dom"
import {useState} from "react";


const PublicPageManager = () => {
    let {path,subpath} = useParams();
    const windowSize = useWindowSize();
   

    if (typeof windowSize.width !== 'undefined'){
    
        return(
          <div id="site" >
     
            <PublicSidebar setDisplay = {windowSize.width>768 ? true:false}/>

            <div id="content" style={{paddingLeft: windowSize.width>768 ? "200px" : "0px"  }}>
            
          <PublicHeader/>
          <PublicPageContent path={path} subpath={subpath}/>
          </div>
        </div>
        )
      
    }
}



export default PublicPageManager;