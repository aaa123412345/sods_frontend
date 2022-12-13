
import React from "react";

import CusNavbar from "../../Common/Navbar/CusNavbar/CusNavbar";
import { useState,useEffect } from "react";

const PublicNavbar = props =>  {
    var lang = 'chi'
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    
    const host = process.env.REACT_APP_REST_HOST
    const pathname = "publicnavdata"

    useEffect(() => {
        fetch(host+pathname)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              setIsReady(true);
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
            <CusNavbar data={items} lang={lang} />
        )
      }
   
    
}

export default PublicNavbar;