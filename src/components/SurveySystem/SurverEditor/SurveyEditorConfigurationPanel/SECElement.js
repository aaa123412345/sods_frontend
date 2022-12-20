import React, {useEffect, useState} from "react";
import { Form,Button } from "react-bootstrap";
import { faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SEQDictSyntaxChecker from "../SESyntaxChecker/SEQDictSyntaxChecker";

const types = ['sparttips','stext','sselect','sradio','schecker','srange']
const typeDict = {
    sparttips:'Tip',
    stext:'Input Text field',
    sselect:'Dropdown Selector',
    sradio:'Radio',
    schecker:'Checker box',
    srange:'Value Selector'
}

const SECElement = ({surveyData,configData,updateConfig,cancelConfig,autoSaveCurConfig}) => {
    
    const [qDict, setQDict] = useState({})
    const [init, setInit] = useState(true)

    function setTypeInData(event){
        //init
        var q = qDict
        //set to Qdict
        q.type = event.target.value
        setQDict(q)
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
            var t = qDict
            t[key]=value
            setQDict(t)

         });
    }

    function checkAndSave(){
        console.log(qDict)
        if(SEQDictSyntaxChecker(qDict,qDict.type)&&SEQDictSyntaxChecker(qDict,'basic')){

            updateConfig({updateType:"element", qid:configData.qid,
            partName:configData.partName, qDict:qDict})
        }else{
            alert("Incomplete setting")
        }
    }

    useEffect(()=>{
        
        
            setExistData()
        
        }
    )
    
    
    return (
        <div className="h3" style={{color:"black",border:'black solid'}}>
            {'Element (Part:'+configData.partName+' Qid:'+configData.qid+')'}
            <div style={{width:'80%'}}>
                <Form className="h5">
                    <Form.Label className="mt-2">Massage/Question</Form.Label>
                   
                    
                    <Form.Control
                        type="text"
                        id="text"
                        onChange={setMsgInData}
                        placeholder={"Current: "+configData.qDict.msg}
                        required   
                    />
                    
                    <Form.Label className="mt-2">Type</Form.Label>
                     <Form.Select aria-label="Default select example" onChange={setTypeInData}>
                      {<option>{"Current: "+typeDict[configData.qDict.type]}</option>}
                      {types.map((element,index) => element!==configData.qDict.type?
                       <option value={element} key={"Element-config-Type-"+index}>{typeDict[element]}</option>:'')}
                       
                    </Form.Select> 

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

export default SECElement