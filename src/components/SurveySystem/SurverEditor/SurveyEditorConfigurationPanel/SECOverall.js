import React, {useEffect, useState} from "react";
import { Form,Button } from "react-bootstrap";
import { faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SECOverall = ({surveyData,configData,updateConfig}) => {
    
    const [title,setTitle] = useState("")
    const [type,setType] = useState("")
    const [header,setHeader] = useState("")
    const [allowGoBack,setAllowGoBack] = useState(false)
    const [ready, setReady] = useState(false)

    const switchDict={
        'on':true,
        'off':false
    }

    function setTitleInData(event){
       
        setTitle(event.target.value)
        
    }

    function setTypeInData(event){
        
        setType(event.target.value)
    }

    function setHeaderInData(event){
        setHeader(event.target.value)
    }

    function setAllowGoBackInData(event){
        setAllowGoBack(switchDict[event.target.value])
    }

    function handleSave(){
        updateConfig({updateType:"overall",title:title,type:type,header:header,allowGoBack:allowGoBack})
    }

    useEffect(()=>{
        //console.log(surveyData.info)
        if("title" in surveyData.info){
            setTitle(surveyData.info.title)
        }
        if("header" in surveyData.info){
            setHeader(surveyData.info.header)
        }
        if("allowGoBack" in surveyData.info){
            setAllowGoBack(surveyData.info.allowGoBack)
        }
        if("type" in surveyData.info){
            setType(surveyData.info.type)
        }
        setReady(true)
    },[])
    if(ready){
        return (
            <div className="h1" style={{color:"black",border:'black solid'}}>
                Overall
                <div style={{width:'80%'}}>
                    <Form className="h5">
                        <Form.Label className="mt-2">Title</Form.Label>
                        <Form.Control
                            type="text"
                            id="text"
                            onChange={setTitleInData}
                            defaultValue={surveyData.info.title}
                        />
                        <Form.Label className="mt-2">Header message</Form.Label>
                        <Form.Control
                            type="text"
                            id="text"
                            as="textarea"
                            rows={4}
                            onChange={setHeaderInData}
                            defaultValue={surveyData.info.header}
                        />
                        <Form.Label className="mt-2">Type</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={setTypeInData} defaultValue={surveyData.info.type}>
                            
                            <option value="Survey" >Survey</option>
                            <option value="Vote" >Vote</option>
                        </Form.Select> 

                        <Form.Check 
                            className="mt-2"
                            type="switch"
                            id="custom-switch"
                            key={"SECoverall-custom-switch"}
                            label="Allow Go Back?"
                            defaultChecked={surveyData.info.allowGoBack}
                            onChange={setAllowGoBackInData}
                        />
                        
                        <Button variant="primary" type="button" className="mt-2" onClick={handleSave}>
                            <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> {"Save"}
                        </Button>
                    </Form>

                </div>
            </div>
        )
    }
}

export default SECOverall