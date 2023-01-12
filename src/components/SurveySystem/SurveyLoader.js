import React from "react";
import SurveyBuilder from "./SurveyBuilder/SurveyBuilder";
import jsonExtractor from "../Common/RESTjsonextract/RESTjsonextract";
import { useState,useEffect } from "react";
import axios from "axios";


const SurveyLoader = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

    const host = process.env.REACT_APP_SURVEY_DATA+props.subpath
    
    const getData = async () => {
      try{
        const { data } = await axios.get(host);
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
    }, [host]);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(ready) {

      return(
        
         <SurveyBuilder data={items} testMode={false}></SurveyBuilder>
      )
    }

    
}
export default SurveyLoader;

//SurveySystem => SurveyBuilder => SurveyFormmator => SurveyElementDict => SurveyCoomponent