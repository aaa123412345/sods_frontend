import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const SurveyTextfield = ({data,parentFunction,qid,savedFormData,curPart}) => {
    const [init] = useState(!(curPart in savedFormData))

    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)
    }

    
  
    return (
        <>
      
            <Form.Label >Q{qid.toString()+": "+data.msg}</Form.Label>
            <Row>
                <Col md={8}>
                    <Form.Control 
                        type="text" 
                        qid={qid}
                        onChange={setdata} 
                        required={data.required}
                        defaultValue={init?'':savedFormData[curPart][qid]}
                    />
                </Col>
            </Row>
            
           
       </>
    )
}
export default SurveyTextfield;