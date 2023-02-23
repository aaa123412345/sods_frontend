import React from "react"
import { Col, Row } from "react-bootstrap";
import { useContext,useEffect, useState } from "react";
import axios from 'axios';
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import {UserContext} from "../../../App"
import SurveyBuilder from "../SurveyBuilder/SurveyBuilder";
import { Form,Button } from "react-bootstrap";

import { faSync} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const VotingSelector = (prop) => {

    const {user,clearLoginState} = useContext(UserContext)
    const [ready,setReady] = useState(false);
    const [surveyData, setSurveyData] = useState({});
    const [seletedSurvey, setSeletedSurvey] = useState('');
    const [passCode,setPassCode] = useState('')
    const urlParams = new URLSearchParams(window.location.search);
    
    const getAllSurvey = async() =>{
       
        try{
            const { data } = await axios({
              method: 'get',
              url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+"/survey?type=Vote&&withFormat=True",
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
        prop.setSurveyID(event.target.value)
        
    }

    const setRandomPasscode = () =>{
        var num = 6
        var str = "ABCDEFGHIJKNMOPQRSTUVWXYZ"
        var result = ""
        for(var i=0;i<num;i++){
            var index = Math.floor(Math.random() * str.length)
            result+=str.charAt(index)
        }
        setPassCode(result)
        prop.setPasscode(result)
    }


    useEffect(()=>{

        
        if(urlParams.has('surveyID')){
           
            setSeletedSurvey(urlParams.get('surveyID'))
        }
        setRandomPasscode()
        getAllSurvey()
    },[])


    function surveySelector(data){
        return(
            <Form.Select onChange={selectedSurveyChange} defaultValue={seletedSurvey} style={{width:"50%"}}>
                <option value=''>Select Any Survey to show the preview</option>
                {data.map((e,index) => 
                    <option value={e.surveyId} key={"survey-selector-option-"+index}>{e.surveyId +': '+e.surveyTitle}</option>
                )}
            </Form.Select>
        )
    }

   

   if(ready){
       
        return(
            <Row>
                <Col xs='12' md='6'>
                <Form.Label className="mt-2">Pass Code (6 Letter): </Form.Label><br></br>
                        {passCode}
                        <Button size="sm" style={{marginLeft:"20px"}} onClick={setRandomPasscode}> <FontAwesomeIcon icon={faSync}></FontAwesomeIcon></Button>
                        <br></br>
                        {surveySelector(surveyData)}
                        <br></br>

                    <Button className="mt-2" onClick={prop.createGroup}> Create Group</Button>
                    <Button className="mt-2" onClick={prop.createAndConnect}> Create And Connect Group</Button>
                    <br></br>
                    <br></br>
                    
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