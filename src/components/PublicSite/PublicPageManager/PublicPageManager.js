import React from "react";
import PublicNavbar from "../PublicNavbar/PublicNavbar";
import PublicHeader from "../PublicHeader/PublicHeader";
import PublicPageContent from "../PublicPageContent/PublicPageContent";
import PublicSidebar from "../PublicSidebar/PubllicSidebar";



const PublicPageManager = (props) => (
    <div className="publicSite" >
      <PublicSidebar/>
      <div className="content" style={{paddingLeft:"200px"}}>
      <PublicHeader/>
      <PublicPageContent/>
      </div>
     
    </div>
)

export default PublicPageManager;