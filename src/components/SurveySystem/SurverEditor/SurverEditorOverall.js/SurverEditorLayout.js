import React from "react";

import { faListOl,faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Button,Stack,OverlayTrigger,Tooltip,Row} from 'react-bootstrap'
import SurveyEditorPanelPartElement from "./SurveyEditorPanelPartElement/SurveyEditorPanelPartElement";

const SurverEditorOverall = ({handleShow}) =>{
    return(
        <>
        <div style={{marginLeft:'auto',marginRight:'auto',width:'90%',textAlign:'center'}}>
            <Row>
                <Stack direction="horizontal" gap={1}>
                    <h1>Overall</h1>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add the Part</Tooltip>}>
                        <Button variant="secondary"><FontAwesomeIcon icon={faSquarePlus}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                   
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Show Preview </Tooltip>}>
                        <Button variant="secondary" onClick={handleShow}><FontAwesomeIcon icon={faListOl}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                </Stack>
            
                <SurveyEditorPanelPartElement></SurveyEditorPanelPartElement>
            </Row>

        </div>
        </>
    )
}

export default SurverEditorOverall;