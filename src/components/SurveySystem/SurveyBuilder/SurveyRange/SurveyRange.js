import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
const SurveyRange = ({data,parentFunction,qid}) => {
    const [value,setValue] = useState(0)

    function setdata(event){
        setValue(event.target.value)
        parentFunction(event.target.getAttribute("qid"),event.target.value)
    }

  
    return (
        <>
         <Row>
            <Form.Label >Q{qid.toString()+": "+data.question}</Form.Label>
            <Row>
                <Col xs={11} md={11}>
                 <Form.Range  
                    qid={qid}
                    onChange={setdata} 
                    min={data.min}
                    max={data.max}
                    step={data.step}
                    />
                </Col>
                <Col xs={1} md={1}>
                {value}
                </Col>
            </Row>
        </Row>
         
           
       </>
    )
}
export default SurveyRange;