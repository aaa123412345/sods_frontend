import React from "react";
import PublicNavbar from "../PublicNavbar/PublicNavbar";
import PublicHeader from "../PublicHeader/PublicHeader";
import PublicPageContent from "../PublicPageContent/PublicPageContent";
import PublicSidebar from "../PublicSidebar/PubllicSidebar";



const PublicPageManager = (props) => (
    <div className="publicSite" >
      <PublicHeader/>
      <PublicSidebar/>
      <PublicPageContent/>
    </div>
)

export default PublicPageManager;