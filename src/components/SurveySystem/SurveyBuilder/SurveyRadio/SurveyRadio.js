import React,{useState} from "react";
import { Form } from "react-bootstrap";


const SurveyRadio = ({data,parentFunction,qid,savedFormData,curPart}) => {
    const [init] = useState(!(curPart in savedFormData));

    
    function setdata(event){
        
        parentFunction(event.target.getAttribute("qid"),event.target.value)

    }

   

    return (
        <>
      
                <Form.Label >Q{qid.toString()+": "+data.msg}</Form.Label>
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
            defaultChecked={init?false:(savedFormData[curPart][qid]===option?true:false)}
            required={data.required}
            />
        )
    }
}
export default SurveyRadio;