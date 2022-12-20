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

const SECElement = ({surveyData,configData,updateConfig}) => {
    const [data,setdata] = useState(surveyData)
    const [init, setInit] = useState(true)

    const [qDict, setQDict] = useState(surveyData.questionset[configData.partName].find(e => e.qid === configData.qid))


    function setTypeInData(event){
        //init
        var q = qDict
        setInit(false)

    
        //set to Qdict
        q.type = event.target.value
        setQDict(q)

        console.log(qDict)
    }

    function setMsgInData(event){
        var q = qDict
       
        q.msg = event.target.value
        setQDict(q)

        console.log(qDict)

    } 

    function checkAndSave(event){
        
        if(SEQDictSyntaxChecker(qDict,qDict.type)){
            
            //set whole dict
            let t = data.questionset[configData.partName].find(e => e.qid === configData.qid)
            t = qDict
            
            updateConfig(data)
        }else{
            alert("Incomplete setting")
        }
    }

    
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
                        defaultValue={qDict.msg}
                        required
                    />
                    <Form.Label className="mt-2">Type</Form.Label>
                     <Form.Select aria-label="Default select example" onChange={setTypeInData} defaultValue={qDict.type}>
                      {init?<option></option>:''}
                      {types.map((element,index) => <option value={element} key={"Element-config-Type-"+index}>{typeDict[element]}</option>)}
                       
                    </Form.Select> 

                    <Button variant="primary" type="button" className="mt-2" onClick={checkAndSave}>
                        <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> {"Save"}
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default SECElement