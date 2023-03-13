import React from "react";
import { Card,Col,Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const UserBookingDataCardViewer = ({items,isJoin,lang}) =>{
 
    const { t } = useTranslation()

function BookingSurveyCard(element,index) {
        return (
          <Col style={{display: 'flex', justifyContent: 'center'}} key={'aspcv-card-col-'+index}>
            <Card style={{ width: '18rem'}} key={'aspcv-card-root-'+index}>
              <Card.Body key={'aspcv-card-body-'+index}>
                <Card.Title key={'aspcv-card-Title-'+index}>{element.title + "  ("+element.currentNum+"/"+element.maxQuote+")"}</Card.Title>
                <Card.Subtitle key={'aspcv-card-Subtitle-'+index} className="mb-2 text-muted">{t('bookingCard.locationModel')+" : "+element.location}</Card.Subtitle>
                <Card.Text key={'aspcv-card-info-'+index}>
                  {t('bookingCard.fromModel')+' : ' + element.startTime}
                  <br></br>
                  {t('bookingCard.toModel')+' : '+ element.endTime }
                </Card.Text>
                <Card.Link key={'aspcv-card-Link-'+index} href={"/public/"+lang+"/booking_activity_detailed?isJoin="+isJoin+"&&activityId="+element.bookingActivityId}>{t('bookingCard.detailsModel')}</Card.Link>
                
              </Card.Body>
            </Card>
          </Col>
        );
}


 
    
    return(
      <>
        <Row xs={1} sm={2} md={2} xl={3} xxl={4}  className="g-1">
          {items.length>0? items.map((element,index)=>BookingSurveyCard(element,index)):
          <h3>{t('bookingCard.noItem')}</h3>
          }
          
        </Row>
      </>
        
    )
  
}

export default UserBookingDataCardViewer