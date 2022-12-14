import React from "react";
import { Form,Row,Col,Button } from "react-bootstrap";


  

const SurveyTextfield = ({parentFunction,qid}) => {
   
    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)
    }

    return (
        
       
        <Form.Control 
            type="text" 
            qid={qid}
            onChange={setdata} 
        />
           
      
    )
}
export default SurveyTextfield;