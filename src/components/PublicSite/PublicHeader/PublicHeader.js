import React from "react";
import { useState,useEffect } from "react";
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";

const PublicHeader = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    
    const host = process.env.REACT_APP_PAGE_IMPORTANT_ELEMENT_REST_HOST
    const pathname = "publicheader"

    useEffect(() => {
        fetch(host+pathname)
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
            <div className="Header">
                <img src={items.src} alt={items.alt} style={items.style}></img>
        
            </div>
        )
      }
}

export default PublicHeader;