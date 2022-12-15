import React from "react";
import { Form, Row } from "react-bootstrap";


const SurveyRadio = ({data,parentFunction,qid}) => {
    

    
    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)

    }

   

    return (
        <>
      
                <Form.Label >Q{qid.toString()+": "+data.question}</Form.Label>
                <div key={qid.toString()+"-inline-radio-main"} className="mb-3">
                 {data.option.map((element,index) => radioCreator(index+1, element,qid))}
                </div>
           
           
       </>
    )

    function radioCreator(index,option,qid){
        return(
           
            <Form.Check
            inline
            label={option}
            name={"radio-group-"+qid.toString()}
            type="radio"
            qid={qid}
            value={option}
            key={qid.toString()+"-radio-option-"+index.toString()}
            onClick={setdata}
            required={data.required}
            />
        )
    }
}
export default SurveyRadio;