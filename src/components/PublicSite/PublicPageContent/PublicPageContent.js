import React from "react";



import { useState,useEffect,useParams } from "react";
import PageBootstrapHandler from "../../PageBuilder/BootstrapHandler/BootstrapHandler";

const PublicPageContent = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

  
    
    
    var link = "http://localhost:3000/"
    const pathname = window.location.pathname

    useEffect(() => {
      fetch(link+pathname.slice(8))
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
        <div className="PageContent">    
          <PageBootstrapHandler data={items}></PageBootstrapHandler>
        </div>
      )
    }
}

export default PublicPageContent;


  

  

