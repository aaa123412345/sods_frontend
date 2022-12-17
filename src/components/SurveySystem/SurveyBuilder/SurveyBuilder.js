import React, { useEffect, useState } from "react";
import { Form,Button, Row } from "react-bootstrap";


import SurveyFormmator from "./SurveyFormmator";

const SurveyBuilder = ({data,submitBTN}) => {
    const [formData, setformData] = useState({})
    const [validated, setValidated] = useState(false);
    const [curPart, setCurPart] = useState(1)
    const [totalPart, setTotalPart] = useState(0)

//Parent function for recieving all data that sent by child
    function onInput(qid,value){
        var temp=formData

        //For init the Dictionary formdata: {'1':{'q1':1,'q2':2},'2':{'q1':3,'q2':4}}
        if(!(curPart in formData)){
          
            temp[curPart] = {}
        }
       
        temp[curPart][qid]=value
      
        setformData(temp)
        console.log(formData)
       
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
       
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          console.log("no ok")
          setValidated(true);
        }else{
            console.log("ok")
            console.log(formData)
        }
       
       
      };

    const CheckAndNext = (event)=>{
        const form = event.currentTarget.parentNode
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            //Not ok
            setValidated(true);

          }else{
              //next page
                var c = curPart;
                c++;
                setCurPart(c)
                setValidated(false);
          }
         
          
    }

     useEffect(()=>{
        setTotalPart(data.info.totalpart)
       
    }) 

    

    return (
        
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
             {data.questionset[curPart.toString()].map((element,index) => <SurveyFormmator
            data={element} qid={index+1} parentFunction={onInput} validated={validated} 
            key={"surveydict-"+(index+1).toString()}></SurveyFormmator>)}
            
           
             { submitBTN&&curPart==totalPart?
                <Button type="submit" >
                    Submit
                </Button>:''
             }
             { curPart!=totalPart?
                <Button type="button" onClick={CheckAndNext}>
                    Next Page {curPart+'/'+totalPart}
                </Button>:''
             }
          
        </Form>
      
    )

    /*
   
    */
}
export default SurveyBuilder;