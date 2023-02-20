import React from "react";
import { Card,Col,Row } from "react-bootstrap";


import useSendRequest from "../../../hooks/useSendRequest";

const ActiveSurveyPublicCardViewer = () =>{
 

  const {items,isLoaded,ready,error,redirection} = 
  useSendRequest(process.env.REACT_APP_SURVEY_SYSTEM_HOST+"/active_survey_current",'get',{},true)


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


  if(ready){
    console.log(items)
    return(
      <>
        <Row xs={1} sm={2} md={2} xl={3} xxl={4}  className="g-1">
          {items.map((element,index)=>ActiveSurveyCard(element,index))}
          
        </Row>
      </>
        
    )
  }
}

export default ActiveSurveyPublicCardViewer