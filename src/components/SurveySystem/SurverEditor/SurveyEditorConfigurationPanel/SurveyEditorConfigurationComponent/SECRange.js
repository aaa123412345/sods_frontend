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
            ChildrenSetOK(false)
        }if(step<1){
            ChildrenSetOK(false)
        }else{
            ChildrenSetOK(true)
        }
    }

    useEffect(()=>{
        
       
        if(!('max' in qDict)){
            setQDictInChild('max',100)
        }
        if(!('min' in qDict)){
            setQDictInChild('min',0)
        }
        if(!('step' in qDict)){
            setQDictInChild('step',1)
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
                defaultValue={qDict.max}/>{"  "+qDict.max}
            
                
                <br></br>
                <Form.Label >Min</Form.Label>
                <br></br>
                <Form.Range 
                key={"SERange-2-"+qid+partName}
                style={{'width':'70%'}}
                onChange={updateMin}
                defaultValue={qDict.min}/>{"  "+qDict.min}
            
                
            
                <br></br>
                <Form.Label >{'Step'}</Form.Label>
                <br></br>
                <Form.Range 
                    key={"SERange-3-"+qid+partName}
                    onChange={updateStep}
                    style={{'width':'70%'}}
                    max={20}
                    min={1}
                    defaultValue={qDict.step}/>{"  "+qDict.step}
            
                <br></br>
            </>
        )
    }
}

export default SECRange