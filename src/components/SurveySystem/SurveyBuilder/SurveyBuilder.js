import React from "react";
import { Form,Row,Col,Button } from "react-bootstrap";
import { useState } from "react";
import SurveyTextfield from "./SurverTextfield/SurveyTextfield";

const SurveyBuilder = () => {
    const [formData, setformData] = useState({})
   
    function onInput(qid,value){
        let temp = formData
        temp[qid]=value
        setformData(temp)

        console.log(formData)
    }

    

    return (
        
        <Form>
            <SurveyTextfield qid={1} parentFunction={onInput}></SurveyTextfield>
            <SurveyTextfield qid={2} parentFunction={onInput}></SurveyTextfield>
            
            <Button type="submit">
                Submit
            </Button>
        </Form>
      
    )
}
export default SurveyBuilder;