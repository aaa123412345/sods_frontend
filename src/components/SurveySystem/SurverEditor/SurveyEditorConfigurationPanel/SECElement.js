import React, {useState} from "react";
import { Form,Button } from "react-bootstrap";
import { faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const types = ['sparttips','stext','sselect','sradio','schecker','srange']
const typeDict = {
    sparttips:'Tip',
    stext:'Input Text field',
    sselect:'Dropdown Selector',
    sradio:'Radio',
    schecker:'Checker box',
    srange:'Value Selector'
}
const conditions = {
    'basic':[
        {name:"qid",type:"number"},
        {name:"type",type:"string"},
        {name:"msg",type:"string"}
    ]
    ,'sparttips':[


    ]
    ,'stext':[

    ]
    ,'sselect':[

    ]
    ,'sradio':[

    ]
    ,'schecker':[

    ]
    ,'srange':[

    ]
}

const SECElement = ({surveyData,configData,updateConfig}) => {
    const [data,setdata] = useState(surveyData)


    function setTypeInData(){

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
                        onChange={setTypeInData}
                        defaultValue={surveyData.questionset[configData.partName].find(e => e.qid === configData.qid).msg}
                    />
                    <Form.Label className="mt-2">Type</Form.Label>
                     <Form.Select aria-label="Default select example" onChange={setTypeInData} defaultValue={1}>
                      {types.map((element,index) => <option value={element} key={"Element-config-Type-"+index}>{typeDict[element]}</option>)}
                       
                    </Form.Select> 

                    <Button variant="primary" type="button" className="mt-2" onClick={()=>updateConfig(data)}>
                        <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> {"Save"}
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default SECElement