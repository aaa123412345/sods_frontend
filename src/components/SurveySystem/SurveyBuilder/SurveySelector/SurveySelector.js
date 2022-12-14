import React from "react";
import { Form } from "react-bootstrap";

const SurveySelector = ({data,parentFunction,qid}) => {
   
    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)
    }

    return (
        <>
            <Form.Label >Q{qid.toString()+": "+data.question}</Form.Label>
            <Form.Select aria-label="Default select example" qid={qid} onChange={setdata} key={"sselect-real-"+qid.toString()}>
               
                {data.option.map((element,index) => optionCreator(index+1, element,qid))}
            </Form.Select>
           
       </>
    )

    function optionCreator(index,option,qid){
        return(
            <option key={qid.toString()+"-sselect-option-"+index.toString()} value={index}>{option}</option>
        )
    }
}
export default SurveySelector;