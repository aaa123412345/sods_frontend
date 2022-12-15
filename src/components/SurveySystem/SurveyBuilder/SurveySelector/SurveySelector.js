import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useState } from "react";

const SurveySelector = ({data,parentFunction,qid}) => {
    
    const [init, setInit] = useState(true);
    
    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)
        setInit(false)
    }

   

    return (
        <>
        
            <Form.Label >Q{qid.toString()+": "+data.question}</Form.Label>
            <Row>
                <Col md={8}>
                    <Form.Select qid={qid} onChange={setdata} key={"sselect-real-"+qid.toString()} required={data.required}>
                        {init?<option></option>:""}
                        {data.option.map((element,index) => optionCreator(index+1, element,qid))}
                    </Form.Select>
                </Col>
            </Row>
           
           
       </>
    )

    function optionCreator(index,option,qid){
        return(
            <option key={qid.toString()+"-sselect-option-"+index.toString()} value={index}>{option}</option>
        )
    }
}
export default SurveySelector;