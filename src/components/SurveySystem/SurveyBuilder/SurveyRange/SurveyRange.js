import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
const SurveyRange = ({data,parentFunction,qid,savedFormData,curPart}) => {

    const [init, setInit] = useState(!(curPart in savedFormData));
    const [value,setValue] = useState(init?0:savedFormData[curPart][qid])

    function setdata(event){
        setValue(event.target.value)
        parentFunction(event.target.getAttribute("qid"),event.target.value)
    }

  
    return (
        <>
        
            <Row>
                <Form.Label >Q{qid.toString()+": "+data.msg}</Form.Label>
                <Col xs={9} md={9}>
                 <Form.Range  
                    qid={qid}
                    onChange={setdata} 
                    min={data.min}
                    max={data.max}
                    step={data.step}
                    defaultValue={init?0:savedFormData[curPart][qid]}
                    />
                </Col>
                <Col xs={2} md={2}>
                {value}
                </Col>
            </Row>
       
         
           
       </>
    )
}
export default SurveyRange;