import React from "react";
import { Form,Row} from "react-bootstrap";
import { useState } from "react";


const SurveyCheckbox = ({data,parentFunction,qid,validated}) => {
    
    const [selected, setSelected] = useState([]);
    const [init, setInit] = useState(true)
    const [validation, setValidation] = useState(false);
    
    function setdata(event){
        let target = event.target.value


        let found = selected.find(element => element === target);
        let temp = selected

       


        //update state
        if(found){
            temp=removeItemOnce(temp,target)
        }else{
            temp.push(target)
        }

         //Update checkbox require array
         if(temp.length>= data.minSelect && temp.length<= data.maxSelect){
            setValidation(false)
         }else{
            setValidation(true)
         }

        setInit(false)
       

        //update parent
        parentFunction(event.target.getAttribute("qid"),selected)
       
    }

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }

    

    return (
        <>
         <Row>
             <Form.Group controlId={"validationCustom-checkbox-"+qid}  >
                <Form.Label >Q{qid.toString()+": "+data.question}</Form.Label>
                
                <div key={qid.toString()+"-inline-checkbox-main"} className="mb-3" required >
                    {data.option.map((element,index) => checkboxCreator(index+1, element,qid,data.required))}
                </div>
           
            </Form.Group>
        </Row>
            
       </>
    )

    function checkboxCreator(index,option,qid,initRequired){
        var required;
        if(init){
            required=initRequired;
        }else{
            required=validation;
        }
        if(!validated){
            return(
                    <Form.Check
                    inline
                    label={option}
                    name={"checkbox-group-"+qid.toString()}
                    type="checkbox"
                    qid={qid}
                    value={option}
                    key={qid.toString()+"-checkbox-option-"+index.toString()}
                    onChange={setdata}
                    required={required}
                    />
            )
        }else return(
                    <Form.Check
                    inline
                    label={option}
                    name={"checkbox-group-"+qid.toString()}
                    type="checkbox"
                    qid={qid}
                    value={option}
                    key={qid.toString()+"-checkbox-option-"+index.toString()}
                    onChange={setdata}
                    required={required}
                    isValid={!required}
                    isInvalid={required}
                    />
        )
        /*
        isInvalid={!(selected.length>=data.minSelect&&selected.length<=data.minSelect)&&validated}
                isValid={(selected.length>=data.minSelect&&selected.length<=data.minSelect)}
        */
    }
}
export default SurveyCheckbox;