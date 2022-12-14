import React from "react";
import { Form,Row,Col,Button } from "react-bootstrap";
import { useState } from "react";

import SurveyElementDict from "./SurveyElementDict";

const SurveyBuilder = ({data}) => {
    const [formData, setformData] = useState({})
   
    function onInput(qid,value){
        let temp = formData
        temp[qid]=value
        setformData(temp)

        console.log(formData)
    }



    return (
        
        <Form>
            {data.questionset.map((element,index) => <SurveyElementDict 
            data={element} qid={index+1} parentFunction={onInput} 
            key={"surveydict-"+(index+1).toString()}></SurveyElementDict>)}


            <Button type="submit">
                Submit
            </Button>
        </Form>
      
    )
}
export default SurveyBuilder;