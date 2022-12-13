import React from "react";
import PublicHeader from "../PublicHeader/PublicHeader";
import PublicPageContent from "../PublicPageContent/PublicPageContent";
import PublicSidebar from "../PublicSidebar/PubllicSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import {useParams} from "react-router-dom"
import {useState} from "react";


const PublicPageManager = () => {
    let {path} = useParams();
    const [mobile,setMoblie] = useState(false)
    const windowSize = useWindowSize();

    if (typeof windowSize.width !== 'undefined'){
      if(windowSize.width>768){
        return(
          DesktopLayoout()
        )
      }else{
        return(
          MobileLayoout()
        )
      }
    }

   
    
}

function DesktopLayoout(){
  return(
    <div className="publicSite" >
    <PublicSidebar/>
    <div className="content" style={{paddingLeft:"200px"}}>
    <PublicHeader/>
    <PublicPageContent />
    </div>
  </div>
  )
}

function MobileLayoout(){
  return(
    <div className="publicSite" >
    <div className="content">
    <PublicHeader/>
    <PublicPageContent />
    </div>
  </div>
  )
}

export default PublicPageManager;