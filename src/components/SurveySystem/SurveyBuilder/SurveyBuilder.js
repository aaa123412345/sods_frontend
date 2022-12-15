import React from "react";
import { Form,Row,Col,Button } from "react-bootstrap";
import { useState } from "react";

import SurveyFormmator from "./SurveyFormmator";

const SurveyBuilder = ({data}) => {
    const [formData, setformData] = useState({})
    const [validated, setValidated] = useState(false);
   
    function onInput(qid,value){
        let temp = formData
        temp[qid]=value
        setformData(temp)

       
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
       
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          console.log("no ok")
        }else{
            console.log("ok")
             console.log(formData)
        }
       
        setValidated(true);
      };

    return (
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

            {data.questionset.map((element,index) => <SurveyFormmator
            data={element} qid={index+1} parentFunction={onInput} validated={validated} 
            key={"surveydict-"+(index+1).toString()}></SurveyFormmator>)}


            <Button type="submit">
                Submit
            </Button>
        </Form>
      
    )
}
export default SurveyBuilder;