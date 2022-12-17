import React from "react";
import SurveyBuilder from "./SurveyBuilder/SurveyBuilder";
import jsonExtractor from "../Common/RESTjsonextract/RESTjsonextract";
import { useState,useEffect } from "react";


const SurveySystem = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

    const host = process.env.REACT_APP_SURVEY_DATA+props.subpath
    
    useEffect(() => {
      fetch(host)
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
    }, [host])

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(ready) {

      return(
        
         <SurveyBuilder data={items} submitBTN={true}></SurveyBuilder>
      )
    }

    //<SurveyBuilder data={items}></SurveyBuilder>
}
export default SurveySystem;