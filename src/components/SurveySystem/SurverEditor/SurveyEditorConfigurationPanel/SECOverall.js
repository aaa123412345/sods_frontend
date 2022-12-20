import React, {useState} from "react";
import { Form,Button } from "react-bootstrap";
import { faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SECOverall = ({surveyData,configData,updateConfig}) => {
    
    const [title,setTitle] = useState("")
    const [type,setType] = useState("")

    function setTitleInData(event){
       
        setTitle(event.target.value)
        
    }

    function setTypeInData(event){
        
        setType(event.target.value)
        
    }

    function handleSave(){
        updateConfig({updateType:"overall",title:title,type:type})
    }

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
                    <Form.Label className="mt-2">Type</Form.Label>
                     <Form.Select aria-label="Default select example" onChange={setTypeInData} defaultValue={surveyData.info.type}>
                        
                        <option value="Survey" >Survey</option>
                        <option value="Vote" >Vote</option>
                    </Form.Select> 
                    <Button variant="primary" type="button" className="mt-2" onClick={handleSave}>
                        <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> {"Save"}
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default SECOverall