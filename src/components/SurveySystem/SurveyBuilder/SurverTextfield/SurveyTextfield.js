import React from "react";
import { Form } from "react-bootstrap";

const SurveyTextfield = ({data,parentFunction,qid}) => {
   
    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)
    }

  
    return (
        <>
            <Form.Label >Q{qid.toString()+": "+data.question}</Form.Label>
            <Form.Control 
                type="text" 
                qid={qid}
                onChange={setdata} 
            />
           
       </>
    )
}
export default SurveyTextfield;