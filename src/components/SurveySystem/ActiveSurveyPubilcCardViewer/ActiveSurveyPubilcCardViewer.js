import React from "react";
import { Card,Col,Row } from "react-bootstrap";
import {UserContext} from "../../../App"
import { useContext,useEffect, useState } from "react";
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import axios from 'axios';


const ActiveSurveyPublicCardViewer = () =>{
  const {user,clearLoginState} = useContext(UserContext)
  const [surveyData, setSurveyData] = useState({});
  const [ready,setReady] = useState(false);

  const getAllActiveSurvey = async() =>{
    try{
        const { data } = await axios({
          method: 'get',
          url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+"/active_survey_current",
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
    function ActiveSurveyCard(element,index) {
        return (
          <Col style={{display: 'flex', justifyContent: 'center'}} key={'aspcv-card-col-'+index}>
            <Card style={{ width: '18rem'}} key={'aspcv-card-root-'+index}>
              <Card.Body key={'aspcv-card-body-'+index}>
                <Card.Title key={'aspcv-card-Title-'+index}>{element.information}</Card.Title>
                <Card.Subtitle key={'aspcv-card-Subtitle-'+index} className="mb-2 text-muted">{"Passcode: "+element.passCode}</Card.Subtitle>
                <Card.Text key={'aspcv-card-info-'+index}>
                  {"From : " + element.startTime}
                  <br></br>
                  {"To : "+ element.endTime }
                </Card.Text>
                <Card.Link key={'aspcv-card-Link-'+index} href={"/public/eng/survey?passcode="+element.passCode}>Do</Card.Link>
                
              </Card.Body>
            </Card>
          </Col>
        );
    }

    useEffect(()=>{
     
      getAllActiveSurvey()
  },[])
  if(ready){
    console.log(surveyData)
    return(
      <>
        <Row xs={1} sm={2} md={2} xl={3} xxl={4}  className="g-1">
          {surveyData.map((element,index)=>ActiveSurveyCard(element,index))}
          
        </Row>
      </>
        
    )
  }
}

export default ActiveSurveyPublicCardViewer