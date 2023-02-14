import React from "react"
import { Col, Row } from "react-bootstrap";
import { useContext,useEffect, useState } from "react";
import axios from 'axios';
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import {UserContext} from "../../../App"
import SurveyBuilder from "../SurveyBuilder/SurveyBuilder";
import { Form,Button } from "react-bootstrap";



const VotingSelector = () => {

    const {user,clearLoginState} = useContext(UserContext)
    const [ready,setReady] = useState(false);
    const [surveyData, setSurveyData] = useState({});
    const [seletedSurvey, setSeletedSurvey] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    
    const getAllSurvey = async() =>{
       
        try{
            const { data } = await axios({
              method: 'get',
              url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+"/survey_vote_only",
              headers:{
                'token':user.token
              }
             
            
            })
           
            var rest = jsonExtractor(data);
           // console.log(rest)
            
            if(rest.response === "success"){
              
              setSurveyData(rest.data)
              
              setReady(true)
              
            }else if (rest.response === "undefineerror"){
              console.log("The authentication server is down")
              alert("The service is not avaliable. Please try to login later")
              clearLoginState()
            }else{
              console.log(rest)
              alert("Get data fail")
              clearLoginState()
            }
          }catch (error){
            clearLoginState()
            alert("The survey uploading service is not avaliable at this moment")
          }
    }

    function selectedSurveyChange(event){
        setSeletedSurvey(event.target.value)
        
    }


    useEffect(()=>{

        
        if(urlParams.has('surveyID')){
           
            setSeletedSurvey(urlParams.get('surveyID'))
        }
        
        getAllSurvey()
    },[])


    function surveySelector(data){
        return(
            <Form.Select onChange={selectedSurveyChange} defaultValue={seletedSurvey}>
                <option value=''>Select Any Survey to show the preview</option>
                {data.map((e,index) => 
                    <option value={e.surveyId} key={"survey-selector-option-"+index}>{e.surveyId +': '+e.surveyTitle}</option>
                )}
            </Form.Select>
        )
    }

    function jump(){

    }

   if(ready){
       
        return(
            <Row>
                <Col xs='12' md='6'>
                    {surveySelector(surveyData)}
                    
                    <Button onClick={()=>{window.location.href="/server/eng/vote_admin?surveyID="+seletedSurvey}}>Submit</Button>
                </Col>
                <Col xs='12' md='6' style={{backgroundColor:'lightgray'}}>
                {seletedSurvey === ''?
                '':
                <SurveyBuilder data={JSON.parse(surveyData.find(e=>e.surveyId === seletedSurvey).surveyFormat)} testMode={true}></SurveyBuilder>
                    }
                </Col>
            </Row>
        )
       
    }
}

export default VotingSelector;