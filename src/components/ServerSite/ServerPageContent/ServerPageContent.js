import React from "react";


import { useState,useEffect } from "react";
import PageBootstrapHandler from "../../PageBuilder/BootstrapHandler/BootstrapHandler";
import ServerNavbar from "../ServerNavbar/ServerNavbar";
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import ElementBuilder from "../../PageBuilder/ElementBuilder/ElementBuilder";

import axios from "axios";

const ServerPageContent = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

    const host = process.env.REACT_APP_SERVER_REST_HOST
    const pathname = props.path
  
    const getData = async () => {
      try{
        const { data } = await axios.get(host+pathname);
        var rest = jsonExtractor(data);
        if(rest.response === "success"){
          setIsLoaded(true);
          setItems(rest.data);
          setIsReady(true);
        }else{
          
          setIsLoaded(true);
          setError(error);
        }
      }catch (error){
          setIsLoaded(true);
          setError(error);
      }
    };

    useEffect(() => {
      getData();
    }, [host,pathname]);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(ready) {

      return(
        <div className="PageContent" style={items.page.style}> 
          <ServerNavbar pdata={items.page}></ServerNavbar>
          { items.page.useBootstrap?
          <PageBootstrapHandler data={items.element} path={ props.path} subpath={ props.subpath}></PageBootstrapHandler>:
          items.element.map((element)=> ElementBuilder({data:element,path:props.path,subpath:props.subpath}))
          }
         
        </div>
      )
    }
}

export default ServerPageContent;


  

  

