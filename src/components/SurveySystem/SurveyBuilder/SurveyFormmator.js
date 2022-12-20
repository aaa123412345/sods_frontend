import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import SurveyElementDict from "./SurveyElementDict"

const SurveyFormmator = ({data,qid,parentFunction,validated,savedFormData,curPart}) => {
   
   
  
    return (
        <>
        <Row className='mt-3'>
            <Form.Group  controlId={"validationCustom-"+data.type+"-"+qid}>
                <SurveyElementDict 
                data={data} qid={qid} parentFunction={parentFunction} validated={validated} 
                savedFormData={savedFormData} curPart={curPart}
                key={"surveydict-"+(qid).toString()}></SurveyElementDict>
            </Form.Group>
        </Row>
           
       </>
    )
}
export default SurveyFormmator;