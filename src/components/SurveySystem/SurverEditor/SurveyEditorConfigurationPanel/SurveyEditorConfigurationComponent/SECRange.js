import React, { useState,useEffect } from "react";
import { Form } from "react-bootstrap";

const SECRange = ({partName,qid,setQDictInChild,qDict,ChildrenSetOK}) =>{
    const [min,setMin] = useState(0)
    const [max,setMax] = useState(0)
    const [step,setStep] = useState(0)
    const [ready,setReady] = useState(false)

    function updateMax(e){
        var targetValue = parseInt(e.target.value)
        setMax(targetValue)
        console.log(targetValue)
        setQDictInChild('max',targetValue)
        updateCheck()
    }

    function updateMin(e){
        var targetValue = parseInt(e.target.value)
        setMin(targetValue)
        setQDictInChild('min',targetValue)
        updateCheck()
    }

    function updateStep(e){
        var targetValue = parseInt(e.target.value)
        setStep(targetValue)
        setQDictInChild('step',targetValue)
        updateCheck()
    }

    function updateCheck(){
        if(max<=min){
            ChildrenSetOK(false, "Max should bigger than Min")
        }if(step<1){
            ChildrenSetOK(false, "Step should be a position not zero value")
        }else{
            ChildrenSetOK(true)
        }
    }

    useEffect(()=>{
        
        if(!('max' in qDict)){
            setQDictInChild('max',100)
            setMax(100)
        }else{
            setMax(qDict['max'])
        }
        if(!('min' in qDict)){
            setQDictInChild('min',0)
            setMin(0)
        }else{
            setMin(qDict['min'])
        }

        if(!('step' in qDict)){
            setQDictInChild('step',1)
            setStep(1)
        }else{
            setStep(qDict['step'])
        }
        setReady(true)
    })
    if(ready){
        return (
            <>
                <Form.Label >Max</Form.Label>
                <br></br>
                <Form.Range 
                key={"SERange-1-"+qid+partName}
                style={{'width':'70%'}}
                onChange={updateMax}
                max={1000}
                defaultValue={max}/>{"  "+max}
            
                
                <br></br>
                <Form.Label >Min</Form.Label>
                <br></br>
                <Form.Range 
                key={"SERange-2-"+qid+partName}
                style={{'width':'70%'}}
                onChange={updateMin}
                defaultValue={min}/>{"  "+min}
            
                
            
                <br></br>
                <Form.Label >{'Step'}</Form.Label>
                <br></br>
                <Form.Range 
                    key={"SERange-3-"+qid+partName}
                    onChange={updateStep}
                    style={{'width':'70%'}}
                    max={20}
                    min={1}
                    defaultValue={step}/>{"  "+step}
            
                <br></br>
            </>
        )
    }
}

export default SECRange