import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useState } from "react";

const SurveySelector = ({data,parentFunction,qid,savedFormData,curPart}) => {
    
    const [init, setInit] = useState(!(curPart in savedFormData));
    
    
    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)
        setInit(false)
    }

   

    return (
        <>
        
            <Form.Label >Q{qid.toString()+": "+data.msg}</Form.Label>
            <Row>
                <Col md={8}>
                    <Form.Select qid={qid} onChange={setdata} key={"sselect-real-"+qid.toString()}
                     required={data.required} defaultValue={init?'':curPart in savedFormData?savedFormData[curPart][qid]:''}>
                        {init?<option></option>:""}
                        {data.option.map((element,index) => optionCreator(index+1, element,qid))}
                    </Form.Select>
                </Col>
            </Row>
           
           
       </>
    )

    function optionCreator(index,option,qid){
        return(
            <option key={qid.toString()+"-sselect-option-"+index.toString()} value={option}>{option}</option>
        )
    }
}
export default SurveySelector;