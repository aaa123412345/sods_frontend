import React from "react";
import SurveyEditorPanelQuestionElement from "../../SurveyEditorPanelQuestionElement/SurveyEditorPanelQuestionElement";

import { faPlus,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button,OverlayTrigger,Tooltip,ButtonGroup, ButtonToolbar} from 'react-bootstrap'

const SurveyEditorPanelPartElement = () => {
    return(
        <div style={{outlineStyle: 'solid'}}>
                 <ButtonToolbar
                    className="justify-content-between mb-1 mt-1"
                    aria-label="Toolbar with Button groups"
                >
                <span></span>
                <h3>Part 1</h3>
                <ButtonGroup>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add a question</Tooltip>}>
                        <Button variant="secondary"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove a group</Tooltip>}>
                        <Button variant="danger"><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                </ButtonGroup>
                </ButtonToolbar>
                
                <SurveyEditorPanelQuestionElement></SurveyEditorPanelQuestionElement>
           
        </div>
    )
}

export default SurveyEditorPanelPartElement