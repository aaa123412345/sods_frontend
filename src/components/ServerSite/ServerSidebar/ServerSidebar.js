import React from "react";

import Sidebar from '../../Common/Sidebar/Sidebar' 
import { useState,useEffect } from "react";
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";

const ServerSidebar = props =>  {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    
    const host = process.env.REACT_APP_PAGE_IMPORTANT_ELEMENT_REST_HOST
    const pathname = "servernavdata"

    useEffect(() => {
        var useLanguage = process.env.REACT_APP_USE_LANGUAGE;
        var url;
      
        if(useLanguage){
          url = host+props.lang+'/'+pathname
        }else{
          url = host+pathname
        }
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              var rest = jsonExtractor(result);
            if(rest.response == "success"){
              setIsLoaded(true);
              setItems(rest.data);
              setIsReady(true);
            }else{
              /*Error */
              setIsLoaded(true);
              setError(error);
            }
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [pathname])
  
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else if(ready) {

        return(
            <Sidebar data={items} setDisplay={props.setDisplay} />
        )
      }
    
  
    
}

export default ServerSidebar;