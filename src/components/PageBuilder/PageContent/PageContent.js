import React from "react";
import { CircularProgress} from '@chakra-ui/react'

import { useState,useEffect } from "react";
import PageBootstrapHandler from "../../PageBuilder/LayoutHandler/LayoutHandler";

import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import ElementBuilder from "../../PageBuilder/ElementBuilder/ElementBuilder";
import axios from "axios";

import PublicHeader from "../../PublicSite/PublicHeader/PublicHeader";
import PublicNavbar from "../../PublicSite/PublicNavbar/PublicNavbar";
import ServerNavbar from "../../ServerSite/ServerNavbar/ServerNavbar";


const PageContent = ({host,path,subpath,lang,mode}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

  
    
    const getData = async () => {
      try{
       
        const { data } = await axios({
          method: 'get',
          url: host+path,
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
    }, [host,path,lang]);


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <CircularProgress isIndeterminate color='green.300' />;
    } else if(ready) {
      
      return(
        <>

        {items.page.useHeader&&mode==="public"?<PublicHeader/>:''}
        <div className="PageContent" style={items.page.style}> 
            
            {mode==="public"? <PublicNavbar pdata={items.page}></PublicNavbar>:
              <ServerNavbar pdata={items.page}></ServerNavbar>
            }
          

          { items.page.useBootstrap?
          <PageBootstrapHandler data={items.element} path={path} subpath={ subpath}></PageBootstrapHandler>:
          items.element.map((element)=> ElementBuilder({data:element,path:path,subpath:subpath}))
          }
        </div>
        </>
      )
    }
}

export default PageContent;