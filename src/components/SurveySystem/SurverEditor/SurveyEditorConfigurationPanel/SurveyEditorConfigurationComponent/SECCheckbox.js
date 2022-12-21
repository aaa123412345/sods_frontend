import React,{useEffect} from "react";
import { useState } from "react";
import { Form, InputGroup, Button} from "react-bootstrap";
import { faPlus,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SECCheckbox = ({partName,qid,setQDictInChild,qDict,ChildrenSetOK})=>{
    const [required,setRequired] = useState(false)
    const [options,setOptions]=useState([''])
    const [update,setUpdate] = useState(false)
    const [ready,setReady] = useState(false)
    const [deleted,setDeleted] = useState(false)
    const [minselect,setMinselect] = useState(0)
    const [maxselect,setMaxselect] = useState(0)

    const switchDict={
        'on':true,
        'off':false
    }

   function changeRequired(event){
        setRequired(switchDict[event.target.value])
        setQDictInChild('required',switchDict[event.target.value])
   }

   function addOption(){
        setOptions([...options,''])
        setQDictInChild('option',[...options])
        updateCheck()
       
   }

   function removeOption(index){
        
        var arr = options
        //console.log(arr)
        arr.splice(index,1)
       // console.log(arr)
        setOptions(arr)
        setUpdate(!update)
        setQDictInChild('option',[...options])
        updateCheck()
        setDeleted(!deleted)
   }

   function updateOption(event){
        var optionindex = event.target.getAttribute("optionindex")
        var option = event.target.value
        var arr = options
        arr[optionindex]=option
        setOptions(arr)
        setUpdate(!update)
        setQDictInChild('option',[...options]) 
        updateCheck()
        //console.log(options)
   }

   function updateCheck(){
        var ok = true
        var msg = ''
        //check option 
        for(var i=0;i<options.length;i++){
            if(options[i]==''){
                ok=false
                msg = "Options should not be null, you may removed the unused row of option"
                break
            }
        }
        //check required
        if(required){
            if(minselect>maxselect){
                msg = "Max Select should be equal or bigger than Min Select"
                ok = false
            }else if(minselect>options.length||maxselect>options.length){
                msg = "Max Select and Min Select should smaller than option number"
                ok = false
            }else if(minselect<0||maxselect<0){
                msg = "Max Select and Min Select should bigger than 0"
                ok = false
            }
        }
       
        if(!ok){
            ChildrenSetOK(false, msg)
        }else{
            ChildrenSetOK(ok,'')
        }
   }

   function updateSelectMax(e){
        var targetValue = parseInt(e.target.value)
        setMaxselect(targetValue)
        setQDictInChild('maxSelect',targetValue)
        updateCheck()
   }

   function updateSelectMin(e){
        var targetValue = parseInt(e.target.value)
        setMinselect(targetValue)
        
        setQDictInChild('minSelect',targetValue)
        updateCheck()
   }
   

   useEffect(()=>{
        if(!('required' in qDict)){
            setQDictInChild('required',false)
            
        }else{
            setRequired(qDict['required'])
            
        }
        if('option' in qDict){
            //Get exist data
            setOptions(qDict['option'])
        }else{
            //init option
            setOptions([''])
            //setQDictInChild('option',['']) 
        }
        //console.log('qDict')
        //console.log(qDict)
        setReady(true)
    },[]
   )

    function createOptionGroup(defaultValue,index){
        return(
            <InputGroup key={"configuration-panel-inputgroup-"+partName+qid+"-options-"+index+"-delete-"+deleted} style={{width:'100%'}}>
                <Form.Control
                    placeholder="Options"
                    key={"configuration-panel-"+partName+qid+"-options-"+index}
                    aria-label="Options component"
                    defaultValue={defaultValue}
                    style={{width:'70%'}}
                    onChange={updateOption}
                    optionindex={index}
                />
                {index===0?<Button variant="secondary" onClick={addOption} style={{width:'15%'}}>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Button>:''}
                {index!==0?<Button variant="danger" onClick={()=>removeOption(index)} style={{width:'15%'}}>
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></Button>:''}
            </InputGroup>
        )
    }

    function checkboxconfig(){
        return(
            <>
                <Form.Label >Max Select</Form.Label>
                <br></br>
                <Form.Range 
                key={"SERange-1-"+qid+partName}
                style={{'width':'70%'}}
                onChange={updateSelectMax}
                max={options.length}
                min={0}
                step={1}
                defaultValue={maxselect}/>{"  "+maxselect}
            
                
                <br></br>
                <Form.Label >Min Select</Form.Label>
                <br></br>
                <Form.Range 
                key={"SERange-2-"+qid+partName}
                style={{'width':'70%'}}
                onChange={updateSelectMin}
                max={options.length}
                min={0}
                step={1}
                defaultValue={minselect}/>{"  "+minselect}
                <br></br>
            </>
        )
    }

    if(ready){
        return(
            <>
            <div>
            <span className="h5">Options</span>
            {options.map((element,index)=>createOptionGroup(element,index))}
            </div>
            <Form.Check 
                type="switch"
                id="custom-switch"
                key={partName+qid+"SECRadio"}
                label="Required?"
                defaultChecked={'required' in qDict?qDict.required:false}
                onChange={changeRequired}
            />
            {required?checkboxconfig():''}
        
        </>
        )
    }
}

export default SECCheckbox
