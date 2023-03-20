import React from "react";

import PageBootstrapHandler from "../../PageBuilder/LayoutHandler/LayoutHandler";
import ElementBuilder from "../../PageBuilder/ElementBuilder/ElementBuilder";

import PublicHeader from "../../PublicSite/PublicHeader/PublicHeader";
import PublicNavbar from "../../PublicSite/PublicNavbar/PublicNavbar";
import ServerNavbar from "../../ServerSite/ServerNavbar/ServerNavbar";

//import useSendRequestWithCache from "../../../hooks/useSendRequestWithCache";
import useSendRequest from "../../../hooks/useSendRequest";

import useAuthChecker from "../../../hooks/useAuthChecker";
import { useState } from "react";
import { useEffect } from "react";




const PagePreview = ({items}) => {
        const path = "temp"
        const subpath = "temp"
        const lang = "temp"
        
        if(items!==null){
         
          return(
            <>
          
           
            <div className="PageContent" style={items.page.style}> 
              <div style={{paddingLeft:'5px'}}>
                { items.page.useBootstrap?
                <PageBootstrapHandler data={items.element} path={path} subpath={ subpath} lang={lang}></PageBootstrapHandler>:
                items.element.map((element)=> ElementBuilder({data:element,path:path,subpath:subpath,lang:lang}))
                }
              </div>
            </div>
            </>
          )
        }
      }


export default PagePreview;