import React from "react";
import SurveyEditorPanelQuestionElement from "../../SurveyEditorPanelQuestionElement/SurveyEditorPanelQuestionElement";

import { faPlus,faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button,OverlayTrigger,Tooltip,ButtonGroup, ButtonToolbar} from 'react-bootstrap'

const SurveyEditorPanelPartElement = ({partName,data,deletePart,deleteElement,addElement}) => {
    function partAddElement(){
        addElement(partName);
    }

    function partDeletePart(){
        deletePart(partName);
    }

    return(
        <div style={{outlineStyle: 'solid'}} className={"mb-3 mt-3"}>
                <ButtonToolbar
                    className="justify-content-between mb-1 mt-1"
                    aria-label="Toolbar with Button groups"
                >
                <span></span>
                <h3>Part {partName}</h3>
                <ButtonGroup>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add a question</Tooltip>}>
                        <Button variant="secondary" onClick={partAddElement}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove a group</Tooltip>}>
                        <Button variant="danger" onClick={partDeletePart}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                </ButtonGroup>
                </ButtonToolbar>
                {
                data.map(element =>
                <SurveyEditorPanelQuestionElement 
                partName={partName} data={element} deleteElement={deleteElement} key={'part'-partName-'qid'-element.qid}>
                </SurveyEditorPanelQuestionElement>
                )
                }
           
        </div>
    )
}

export default SurveyEditorPanelPartElement