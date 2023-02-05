import React from "react"
import { Col, Row } from "react-bootstrap";
import { useContext,useEffect, useState } from "react";
import axios from 'axios';
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import {UserContext} from "../../../App"
import SurveyBuilder from "../SurveyBuilder/SurveyBuilder";
import { Form,Button } from "react-bootstrap";


const ActiveSurveyConfigPanel = () => {

    const user = useContext(UserContext)
    const [ready,setReady] = useState(false);
    const [surveyData, setSurveyData] = useState({});
    const [seletedSurvey, setSeletedSurvey] = useState('');
    

    const [userConfigData, setUserConfigData] = useState({surveyId:'',startTime:'',endTime:''})

    const getAllSurvey = async() =>{
       
        try{
            const { data } = await axios({
              method: 'get',
              url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+"/survey_with_format",
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
            }else{
              console.log(rest)
              alert("Get data fail")
            }
          }catch (error){
           
            alert("The survey uploading service is not avaliable at this moment")
          }
    }

    useEffect(()=>{getAllSurvey()},[])

    function selectedSurveyChange(event){
        setSeletedSurvey(event.target.value)
        setConfigData('surveyId',event.target.value)
    }

    function setConfigData(key,value){
        var tmp = userConfigData
        tmp[key] = value
        setUserConfigData(tmp)
    }

    function setStartTime(event){
        //console.log(event.target.value)
        setConfigData('startTime',event.target.value)
    }

    function setEndTime(event){
        //console.log(event.target.value)
        setConfigData('endTime',event.target.value)
    }

    function checkAndSubmit(){
        var ok = true
        if(userConfigData.surveyId=== ''||userConfigData.startTime=== ''||userConfigData.endTime=== '') {
            ok = false
            alert("Incomplete")
        }
        if(userConfigData.startTime >= userConfigData.endTime){
            ok = false
            alert("End Time should be later than Start Time")
        }
        if(ok){
            surveyActiveUpload()
        }
        
    }

    const surveyActiveUpload = async() =>{
        
        try{
            const { data } = await axios({
            method: 'post',
            url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+'/active_survey',
            data: userConfigData,
            headers:{
                'token':user.token
            }
            })
        
            var rest = jsonExtractor(data);
            if(rest.response === "success"){
            
           
            alert("Upload Success")
    
            
            }else if (rest.response === "undefineerror"){
            console.log("The authentication server is down")
            alert("The service is not avaliable. Please try to login later")
            }else{
            console.log(rest)
            alert("Upload fail")
            }
        }catch (error){
        
            alert("The survey uploading service is not avaliable at this moment")
        }
    }


    function surveySelector(data){
        return(
            <Form.Select onChange={selectedSurveyChange} defaultValue=''>
                <option value=''>Select Any Survey to show the preview</option>
                {data.map((e,index) => 
                    <option value={e.surveyId} key={"survey-selector-option-"+index}>{e.surveyId +': '+e.surveyTitle}</option>
                )}
            </Form.Select>
        )
    }

    if(ready){
        if(seletedSurvey !== ''){
            var a= JSON.parse(surveyData.find(e=>e.surveyId === seletedSurvey).surveyFormat)
            
        }
        return(
            <Row>
                <Col xs='12' md='6'>
                    
                    <br></br>
                    {surveySelector(surveyData)}
                    
                    <br></br>
                    <label >Start (date and time):</label>
                    <input type="datetime-local" id="starttime" name="starttime" onChange={setStartTime}></input>
                    <br></br>
                    <br></br>
                    <label >End (date and time):</label>
                    <input type="datetime-local" id="endtime" name="endtime" onChange={setEndTime}></input>
                    <br></br>
                    <br></br>
                    <Button onClick={checkAndSubmit}>Submit</Button>
                </Col>
                <Col xs='12' md='6' style={{backgroundColor:'lightgray'}}>
                {seletedSurvey === ''?
                '':
                <SurveyBuilder data={JSON.parse(surveyData.find(e=>e.surveyId === seletedSurvey).surveyFormat)} testMode={true}></SurveyBuilder>
                    }
                </Col>
            </Row>
        )
        //<SurveyBuilder data={JSON.parse(surveyData.find(e=>e.surveyId === seletedSurvey).surveyFormat} testMode={true}></SurveyBuilder>
    }
}

export default ActiveSurveyConfigPanel;