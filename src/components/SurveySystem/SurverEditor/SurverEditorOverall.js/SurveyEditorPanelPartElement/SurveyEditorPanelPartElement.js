import React,{ useState } from "react";
import SurveyEditorPanelQuestionElement from "../../SurveyEditorPanelQuestionElement/SurveyEditorPanelQuestionElement";

import { faPlus,faTrashCan, faSquareCaretUp, faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button,OverlayTrigger,Tooltip,ButtonGroup, ButtonToolbar,Collapse} from 'react-bootstrap'


const SurveyEditorPanelPartElement = ({partName,data,deletePart,deleteElement,addElement}) => {
    const [open, setOpen] = useState(true)

    function partAddElement(){
        addElement(partName);
    }

    function partDeletePart(){
        deletePart(partName);
    }

    return(
        <div style={{border: 'solid black'}} className={"mb-3 mt-3"}>
                <ButtonToolbar
                    className="justify-content-between mb-1 mt-1"
                    aria-label="Toolbar with Button groups"
                >
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Collapse</Tooltip>}>
                        <Button variant="secondary" onClick={() => setOpen(!open)}>
                            {data.length+' '}
                            {open?
                            <FontAwesomeIcon icon={faSquareCaretUp}/>:
                            <FontAwesomeIcon icon={faSquareCaretDown}/>}
                        </Button>
                </OverlayTrigger>

                <div className="h3" style={{color:"black"}}>Part {partName}</div>
                    <ButtonGroup>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add a question</Tooltip>}>
                            <Button variant="secondary" onClick={partAddElement}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove a group</Tooltip>}>
                            <Button variant="danger" onClick={partDeletePart}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                    </ButtonToolbar>
                    <div className={open?'d-block':'d-none'}>
                        {
                            data.map(element =>
                            <SurveyEditorPanelQuestionElement 
                                partName={partName} data={element} 
                                deleteElement={deleteElement} key={'part-'+partName+'-qid-'+element.qid}>
                            </SurveyEditorPanelQuestionElement>
                            )
                        }
                    </div>
           
                </div>
    )
}

export default SurveyEditorPanelPartElement