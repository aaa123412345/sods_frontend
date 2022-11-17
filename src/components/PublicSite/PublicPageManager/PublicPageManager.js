import React from "react";
import ConfiguratedNavbar from "../ConfiguredNavbar/ConfiguratedNavbar";
import Header from "../Header/Header";
import PageContent from "../PageContent/PageContent";



const PublicPageManager = (props) => (
    <div className="publicSite" >
      <Header/>
      <ConfiguratedNavbar/>
      <PageContent/>
    </div>
)

export default PublicPageManager;