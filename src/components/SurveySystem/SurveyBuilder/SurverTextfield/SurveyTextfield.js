import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const SurveyTextfield = ({data,parentFunction,qid}) => {
   
    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)
    }

  
    return (
        <>
        <Row>
            <Form.Group  controlId={"validationCustom-text-"+qid}>
            <Form.Label >Q{qid.toString()+": "+data.question}</Form.Label>
            <Row>
                <Col md={8}>
                    <Form.Control 
                        type="text" 
                        qid={qid}
                        onChange={setdata} 
                        required={data.required}
                    />
                </Col>
            </Row>
            </Form.Group>
        </Row>
           
       </>
    )
}
export default SurveyTextfield;