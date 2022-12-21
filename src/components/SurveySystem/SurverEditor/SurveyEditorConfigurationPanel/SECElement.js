import React, {useEffect, useState} from "react";
import { Form,Button } from "react-bootstrap";
import { faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SEQDictSyntaxChecker from "../SESyntaxChecker/SEQDictSyntaxChecker";

import SECCheckbox from "./SurveyEditorConfigurationComponent/SECCheckbox";
import SECDropDownSelect from "./SurveyEditorConfigurationComponent/SECDropDownSelect";
import SECPlaceholder from "./SECPlaceholder";
import SECRadio from "./SurveyEditorConfigurationComponent/SECRadio";
import SECRange from "./SurveyEditorConfigurationComponent/SECRange";
import SECTectfield from "./SurveyEditorConfigurationComponent/SECTextfield";
import SEQDictSyntaxRemover from "../SESyntaxChecker/SEQDictSyntaxRemover";

const types = ['sparttips','stext','sselect','sradio','schecker','srange']
const typeDict = {
    sparttips:'Tip',
    stext:'Input Text field',
    sselect:'Dropdown Selector',
    sradio:'Radio',
    schecker:'Checker box',
    srange:'Value Selector',
    '':''
}



const ComponentDict ={
    sparttips:SECPlaceholder,
    stext:SECTectfield,
    sselect:SECDropDownSelect,
    sradio:SECRadio,
    schecker:SECCheckbox,
    srange:SECRange,
    '':SECPlaceholder
}

const SECElement = ({surveyData,configData,updateConfig,cancelConfig}) => {
    
    const [qDict, setQDict] = useState({})
    const [update, setUpdate] = useState(false);
    const [subElementReady,setSubElementReady] =  useState(true)
    const [subElementErrMsg,setSubElementErrMsg] =  useState('')
    const [ready,setReady] = useState(false)

    function setTypeInData(event){
        //init
        var q = qDict
        //set to Qdict
        q.type = event.target.value
        setQDict({qid:q.qid,msg:q.msg,type:q.type})
        setUpdate(!update)
        
        
    }

    function setMsgInData(event){
        var q = qDict
        var value = event.target.value
        if(typeof value === 'number'){
            q.msg = value.toString()
        }else{
            q.msg = value
        }
        setQDict(q)
    } 

    function setExistData(){
        //copy data from surveyData to qDict
        Object.entries(surveyData.questionset[configData.partName].find(e => e.qid === configData.qid)).forEach(([key, value]) => {
            //If qDict do not have all data, add back
            if(!(key in qDict)){
                var t = qDict
                t[key]=value
                setQDict(t)
            }

         });
    }

    function checkAndSave(){
        console.log(qDict)
        if(SEQDictSyntaxChecker(qDict,qDict.type)&&SEQDictSyntaxChecker(qDict,'basic')&&subElementReady){
            //Clear unneed varible in qDict
            var t = SEQDictSyntaxRemover(qDict)
            updateConfig({updateType:"element", qid:configData.qid,
            partName:configData.partName, qDict:t})

        }else if(!subElementReady){
            alert(subElementErrMsg)
        }else{
            alert("Incomplete setting")
        }
    }

    //for child
    function setQDictInChild(key,value){
        var t = qDict
        t[key]=value
        setQDict(t)
        console.log(qDict)
    }

    //for child
    function ChildrenSetOK(ok,msg){
        setSubElementReady(ok)
        if(ok){
            setSubElementErrMsg('')
        }else{
            setSubElementErrMsg(msg)
        }
        
    }

    useEffect(()=>{
        
            setExistData()
            setReady(true)
        }
    )
   
    if(ready){
        return (
            <div className="h3" style={{color:"black",border:'black solid'}}>
                {'Element (Part:'+configData.partName+' Qid:'+configData.qid+')'}
                <div style={{width:'80%'}}>
                    <Form className="h5">
                        <Form.Label className="mt-2">Massage/Question</Form.Label>
                        <Form.Control
                            key={configData.partName+configData.qid+'inputMsg'}
                            type="text"
                            id="text"
                            onChange={setMsgInData}
                            placeholder={"Current: "+configData.qDict.msg}
                            required   
                        />
                        <Form.Label className="mt-2">Type</Form.Label>
                        <Form.Select  key={configData.partName+configData.qid+'selectType'} onChange={setTypeInData}>
                        
                        <option value={configData.qDict.type}>{typeDict[configData.qDict.type]}</option>
                        

                        {types.map((element,index) => element!==configData.qDict.type?
                        <option value={element} key={"Element-config-Type-"+index}>{typeDict[element]}</option>:'')}
                        
                        </Form.Select> 
                        {React.createElement(ComponentDict[qDict.type===undefined?configData.qDict.type:qDict.type],{
                            key: "Configuration-element-Panel-Type-"+configData.qDict.type+configData.qid+configData.partName,
                            partName: configData.partName,
                            qid: configData.qid,
                            qDict:Object.assign({},qDict),
                            setQDictInChild: setQDictInChild,
                            ChildrenSetOK: ChildrenSetOK
                        })}    

                        <Button variant="primary" type="button" className="mt-2" onClick={checkAndSave} style={{marginRight:'10px'}}>
                            <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> {"Save"}
                        </Button>
                        <Button variant="primary" type="button" className="mt-2" onClick={()=> cancelConfig()}>
                            {"Cancel"}
                        </Button>
                    </Form>

                </div>
            </div>
        )
    }
    
}

export default SECElement