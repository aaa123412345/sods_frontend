import React from "react";

import CusNavbar from "../../Common/Navbar/CusNavbar/CusNavbar";
import { useState,useEffect } from "react";
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";

const ServerNavbar = props =>  {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    
    const host = process.env.REACT_APP_SERVER_REST_HOST
    const pathname = "servernavdata"

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
            <CusNavbar data={items} pdata={props.pdata} />
        )
      }
   
    
}

export default ServerNavbar;