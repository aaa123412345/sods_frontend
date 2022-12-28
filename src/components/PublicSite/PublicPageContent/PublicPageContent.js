import React from "react";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { useState,useEffect } from "react";
import PageBootstrapHandler from "../../PageBuilder/LayoutHandler/LayoutHandler";
import PublicNavbar from "../PublicNavbar/PublicNavbar";
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import ElementBuilder from "../../PageBuilder/ElementBuilder/ElementBuilder";
import axios from "axios";
import PublicHeader from "../PublicHeader/PublicHeader";


const PublicPageContent = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

  
    const host = process.env.REACT_APP_PUBLIC_REST_HOST
    const pathname = props.path
    const lang = props.lang
    
    const getData = async () => {
      try{
       
        const { data } = await axios({
          method: 'get',
          url: host+pathname,
          data: ''
        })
        
       
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
      getData()
    }, [host,pathname,lang]);


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <CircularProgress isIndeterminate color='green.300' />;
    } else if(ready) {
      
      return(
        <>
        {items.page.useHeader?<PublicHeader/>:''}
        <div className="PageContent" style={items.page.style}> 
          <PublicNavbar pdata={items.page}></PublicNavbar>   
          { items.page.useBootstrap?
          <PageBootstrapHandler data={items.element} path={ props.path} subpath={ props.subpath}></PageBootstrapHandler>:
          items.element.map((element)=> ElementBuilder({data:element,path:props.path,subpath:props.subpath}))
          }
        </div>
        </>
      )
    }
}

export default PublicPageContent;


  

  

