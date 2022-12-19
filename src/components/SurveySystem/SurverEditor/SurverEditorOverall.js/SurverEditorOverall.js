import React from "react";

import { faListOl,faSquarePlus, faUserGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Button,Stack,OverlayTrigger,Tooltip,Row} from 'react-bootstrap'
import SurveyEditorPanelPartElement from "./SurveyEditorPanelPartElement/SurveyEditorPanelPartElement";

const SurverEditorOverall = ({handleShow,data,deletePart,deleteElement,addPart,addElement,swap,setConfig}) =>{
   

    return(
        <>
        <div style={{marginLeft:'auto',marginRight:'auto',
        width:'90%',textAlign:'center',overflowX:'hidden',border:'double black',marginTop:'10px'}}>
            <Row>
                <Stack direction="horizontal" gap={1}>
                    <div className="h1" style={{color:"black"}}>Overall</div>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add the Part</Tooltip>}>
                        <Button variant="secondary" onClick={addPart}><FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon></Button>
                    </OverlayTrigger>

                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Overall coonfiguration</Tooltip>}>
                        <Button variant="secondary" onClick={()=>setConfig('overall',{})}><FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                   
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Show Preview </Tooltip>}>
                        <Button variant="secondary" onClick={handleShow}><FontAwesomeIcon icon={faListOl}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                </Stack>
               
                {data.info.partKey.map(element=>
                <SurveyEditorPanelPartElement data={data.questionset[element]} partName={element}
                 deletePart={deletePart} deleteElement={deleteElement} swap={swap} setConfig={setConfig}
                 addElement={addElement} key={'part-'+element+'-panel'}>
                 </SurveyEditorPanelPartElement>
                )}
                
            </Row>

        </div>
        </>
    )
}

export default SurverEditorOverall;