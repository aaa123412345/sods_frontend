import React from "react"
import { Col, Row } from "react-bootstrap";
import { useContext,useEffect, useState } from "react";
import axios from 'axios';
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import {UserContext} from "../../../App"
import SurveyBuilder from "../SurveyBuilder/SurveyBuilder";
import { Form,Button } from "react-bootstrap";

import { Navigate } from 'react-router-dom';
import useSendRequest from "../../../hooks/useSendRequest";

const ActiveSurveyConfigPanel = (props) => {

    const {user,clearLoginState} = useContext(UserContext)
    const [ready,setReady] = useState(false)
    const [mode,setMode] = useState('create');
    const [activeID,setActiveID] = useState('');
    const [surveyData, setSurveyData] = useState({});
    const [seletedSurvey, setSeletedSurvey] = useState('');
    const [redirectActiveSurvey,setRedirectActiveSurvey] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    

    const [userConfigData, setUserConfigData] = useState(
        {surveyId:'',startTime:'',endTime:'',information:'',allowAnonymous:false,allowPublicSearch:false})
    
 
   

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

    const getActiveInformation = async(id) =>{
        try{
            const { data } = await axios({
              method: 'get',
              url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+"/active_survey/"+id,
              headers:{
                'token':user.token
              }
             
            
            })
           
            var rest = jsonExtractor(data);
           // console.log(rest)
            
            if(rest.response === "success"){
              
              
              setConfigData('surveyId',rest.data.surveyId)
              setConfigData('startTime',rest.data.startTime)
              setConfigData('endTime',rest.data.endTime)
              setConfigData('information',rest.data.information)
              setSeletedSurvey(rest.data.surveyId)
              
             
              
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

    useEffect(()=>{
        
        if(urlParams.has('surveyID')){
            setConfigData('surveyId',urlParams.get('surveyID'))
            setSeletedSurvey(urlParams.get('surveyID'))
        }
        if(urlParams.has('activeSurveyID')){
           
            setActiveID(urlParams.get('activeSurveyID'))
            setMode('update')
            getActiveInformation(urlParams.get('activeSurveyID'))
        }
        getAllSurvey()
    },[])

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

    function setInformation(event){
        //console.log(event.target.value)
        setConfigData('information',event.target.value)
    }

    function setEndTime(event){
        //console.log(event.target.value)
        setConfigData('endTime',event.target.value)
    }

    function setAllowAnonymous(event){
       
        setConfigData('allowAnonymous',event.target.checked)
    }

    function setAllowPublicSearch(event){
        setConfigData('allowPublicSearch',event.target.checked)
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
            setRedirectActiveSurvey(true)
            
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
            <Form.Select onChange={selectedSurveyChange} defaultValue={seletedSurvey}>
                <option value=''>Select Any Survey to show the preview</option>
                {data.map((e,index) => 
                    <option value={e.surveyId} key={"survey-selector-option-"+index}>{e.surveyId +': '+e.surveyTitle}</option>
                )}
            </Form.Select>
        )
    }

    if(redirectActiveSurvey){
        return(<Navigate replace to={"/server/"+props.lang+"/surveymanager"} />)
    }
    else if(ready){
        
            return(
                <Row>
                    <Col xs='12' md='6'>
                        {surveySelector(surveyData)}
                            <Form.Label className="mt-2">Active Information</Form.Label>
                            <Form.Control
                                type="text"
                                id="text"
                                as="textarea"
                                rows={4}
                                onChange={setInformation}
                                defaultValue={mode==='update'?userConfigData.information:''}
                                
                            /><br></br><br></br>
                        <label >Start (date and time):</label>
                        <input type="datetime-local" id="starttime" name="starttime"
                        onChange={setStartTime} defaultValue={mode==='update'?userConfigData.startTime:''}></input><br></br><br></br>
                        <label >End (date and time):</label>
                        <input type="datetime-local" id="endtime" name="endtime" onChange={setEndTime}
                        defaultValue={mode==='update'?userConfigData.endTime:''}></input> <br></br><br></br>
                        
                        <Form.Check 
                            type='checkbox'     
                            id='ASCP-checkbox-1'   
                            label='Allow Anonymous?'
                            key='ASCP-checkbox-1'
                            onChange={setAllowAnonymous}
                            defaultChecked={mode==='update'?userConfigData.allowAnonymous:false}
                        />
                            <Form.Check 
                            type='checkbox'
                            id='ASCP-checkbox-2'   
                            label='Allow Public Search'
                            key='ASCP-checkbox-2'
                            onChange={setAllowPublicSearch}
                            defaultChecked={mode==='update'?userConfigData.allowPublicSearch:false}
                        />

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
        
       
    }
}

export default ActiveSurveyConfigPanel;