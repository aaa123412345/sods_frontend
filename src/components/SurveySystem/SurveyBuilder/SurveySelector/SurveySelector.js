import React from "react";
import { Form } from "react-bootstrap";
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
            <Form.Select aria-label="Default select example" qid={qid} onChange={setdata} key={"sselect-real-"+qid.toString()}>
                {init?<option></option>:""}
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