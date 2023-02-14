import React from "react";
import { Form,Row} from "react-bootstrap";
import { useState } from "react";


const SurveyCheckbox = ({data,parentFunction,qid,validated,savedFormData,curPart}) => {
    
    const [selected, setSelected] = useState([]);
    const [init, setInit] = useState(!(curPart in savedFormData))
    const [ready, setReady] = useState(false);
    
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
            setReady(true)
         }else{
            setReady(false)
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

    function errorTextConstructor(){
        var str=""
        if(data.minSelect == data.maxSelect){
            str += "You should select "+data.minSelect+ " option(s)"
        }else if(data.minSelect == 0 || data.maxSelect== data.option.length){
            if(data.minSelect == 0){
                str+=  "You should select at most "+data.maxSelect+ " option(s)"
            }else{
                str+=  "You should select at least "+data.minSelect+ " option(s)"
            }
        }else{
            str += "You should select "+data.minSelect+ " to "+data.maxSelect+" option(s)"
        }
        return str
    }
    

    return (
        <>
        
                <Form.Label >Q{qid.toString()+": "+data.msg}</Form.Label>
                
                <div key={qid.toString()+"-inline-checkbox-main"}  required >
                    {data.option.map((element,index) => checkboxCreator(index+1, element,qid,data.required))}
                </div>
                {
                data.required&&validated&&!ready?
                <span style={{color: '#DC3545' }}>
                    {
                    errorTextConstructor()
                    }
                </span>
                :''
                }
           
          
            
       </>
    )

    function checkboxCreator(index,option,qid,initRequired){
        var required;
        if(init){
            required=initRequired;
        }else{
            required=!ready;
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
                    defaultChecked={init?false:curPart in savedFormData?
                        (savedFormData[curPart][qid].find(e => e === option)===undefined?false:true):false}
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
                    defaultChecked={init?false:(savedFormData[curPart][qid].find(e => e === option)===undefined?false:true)}
                    />
        )
        /*
        isInvalid={!(selected.length>=data.minSelect&&selected.length<=data.minSelect)&&validated}
                isValid={(selected.length>=data.minSelect&&selected.length<=data.minSelect)}
        */
    }
}
export default SurveyCheckbox;