import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import SurveyElementDict from "./SurveyElementDict"

const SurveyFormmator = ({data,qid,parentFunction,validated}) => {
   
   
  
    return (
        <>
        <Row className='mt-3'>
            <Form.Group  controlId={"validationCustom-"+data.type+"-"+qid}>
                <SurveyElementDict 
                data={data} qid={qid} parentFunction={parentFunction} validated={validated} 
                key={"surveydict-"+(qid).toString()}></SurveyElementDict>
            </Form.Group>
        </Row>
           
       </>
    )
}
export default SurveyFormmator;