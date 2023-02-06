import React from "react";
import SurveyBuilder from "./SurveyBuilder/SurveyBuilder";
import jsonExtractor from "../Common/RESTjsonextract/RESTjsonextract";
import { useState,useEffect,useContext } from "react";
import {UserContext} from "../../App"
import axios from "axios";

import { Navigate } from 'react-router-dom';


const SurveyLoader = (props) => {
    const [error, setError] = useState(null);
    
    const [ready, setIsReady] = useState(false);
    const [items, setItems] = useState([]);
    const [redirectLogin,setRedirectLogin] = useState(false);
    const [redirectSurveyList,setRedirectSurveyList] = useState(false);
   
    const {user,clearLoginState} = useContext(UserContext)
    const urlParams = new URLSearchParams(window.location.search);
   
    
    const getData = async (passcode) => {
      try{
        
        const { data } = await axios({
          method: 'get',
          url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+"/survey/passcode/"+passcode,
          headers:{
            'token':user.token
          }
         
        
        })
        var rest = jsonExtractor(data);
        if(rest.response === "success"){
          
          setItems(rest.data);
          setIsReady(true);
        }else{
          
          
          setError(error);
          setRedirectLogin(true);

          
        }
      }catch (error){
         
          setError(error);
          
      }
    };

    const upload = async(userdata) =>{
        
      try{
          const { data } = await axios({
          method: 'post',
          url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+'/survey/submit/'+items.activeSurveyID,
          data: userdata,
          headers:{
              'token':user.token
          }
          })
      
          var rest = jsonExtractor(data);
          if(rest.response === "success"){
            alert("Upload Success")
            setRedirectSurveyList(true)
          }else if (rest.response === "undefineerror"){
            console.log("The authentication server is down")
            alert("The service is not avaliable. Please try to login later")
            setRedirectLogin(true);
          }else{
            console.log(rest)
            alert("Upload fail")
          }
      }catch (error){
      
          alert("The survey uploading service is not avaliable at this moment")
      }
    }

    

    useEffect(() => {
      if(urlParams.has('passcode')){
        getData(urlParams.get('passcode'));
      }else{
        
        setRedirectSurveyList(true)
      }
      
    }, []);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if(redirectSurveyList) {
      return(<Navigate replace to={"/public/"+props.lang+"/survey_list"} />)
    } else if(redirectLogin) {
      return(<Navigate replace to={"/user/"+props.lang+"/login"} />)
    } else if(ready) {
      //<SurveyBuilder data={items} testMode={false}></SurveyBuilder>
      return(
        <>
        
          <SurveyBuilder data={items.surveyFormat} testMode={false} uploadMethod={upload}></SurveyBuilder>
          
        </>
      )
    }

    
}
export default SurveyLoader;

//SurveySystem => SurveyBuilder => SurveyFormmator => SurveyElementDict => SurveyCoomponent