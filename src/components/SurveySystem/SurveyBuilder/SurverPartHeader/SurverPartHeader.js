import React from "react";
import { Form } from "react-bootstrap";

const SurveyPartHeader = ({data}) => {
   
    
  
    return (
        <>
      
            <Form.Label >{data.msg}</Form.Label>
            
            
           
       </>
    )
}
export default SurveyPartHeader;