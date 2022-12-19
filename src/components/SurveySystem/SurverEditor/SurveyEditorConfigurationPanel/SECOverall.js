import React, {useState} from "react";
import { Form,Button } from "react-bootstrap";
import { faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SECOverall = ({surveyData,configData,updateConfig}) => {
    const [data,setdata] = useState(surveyData)

    function setTitleInData(event){
        let t = data
        t.info.title = event.target.value
    }

    function setTypeInData(event){
        let t = data
        t.info.type = event.target.value
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
                        defaultValue={data.info.title}
                    />
                    <Form.Label className="mt-2">Type</Form.Label>
                     <Form.Select aria-label="Default select example" onChange={setTypeInData} defaultValue={data.info.type}>
                        
                        <option value="Survey" >Survey</option>
                        <option value="Vote" >Vote</option>
                    </Form.Select> 
                    <Button variant="primary" type="button" className="mt-2" onClick={()=>updateConfig(data)}>
                        <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> {"Save"}
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default SECOverall