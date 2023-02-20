import React from "react";
import { Card,Col,Row } from "react-bootstrap";

const UserBookingDataCardViewer = ({items}) =>{
 

function BookingSurveyCard(element,index) {
        return (
          <Col style={{display: 'flex', justifyContent: 'center'}} key={'aspcv-card-col-'+index}>
            <Card style={{ width: '18rem'}} key={'aspcv-card-root-'+index}>
              <Card.Body key={'aspcv-card-body-'+index}>
                <Card.Title key={'aspcv-card-Title-'+index}>{element.title + "  ("+element.currentNum+"/"+element.maxQuote+")"}</Card.Title>
                <Card.Subtitle key={'aspcv-card-Subtitle-'+index} className="mb-2 text-muted">{"Location: "+element.location}</Card.Subtitle>
                <Card.Text key={'aspcv-card-info-'+index}>
                  {"From : " + element.startTime}
                  <br></br>
                  {"To : "+ element.endTime }
                </Card.Text>
                <Card.Link key={'aspcv-card-Link-'+index} href={"/public/eng/survey?passcode="}>Look Detail</Card.Link>
                
              </Card.Body>
            </Card>
          </Col>
        );
}


 
    
    return(
      <>
        <Row xs={1} sm={2} md={2} xl={3} xxl={4}  className="g-1">
          {items.length>0? items.map((element,index)=>BookingSurveyCard(element,index)):
          <h3>No items can be showed</h3>
          }
          
        </Row>
      </>
        
    )
  
}

export default UserBookingDataCardViewer