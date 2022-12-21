import React,{ useState } from "react";
import SurveyEditorPanelQuestionElement from "../SurveyEditorPanelQuestionElement/SurveyEditorPanelQuestionElement";

import { faPlus,faTrashCan, faSquareCaretUp, faSquareCaretDown, faGears} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button,OverlayTrigger,Tooltip,ButtonGroup, ButtonToolbar} from 'react-bootstrap'


const SurveyEditorPanelPartElement = ({partName,data,updateSurveyData,setConfig}) => {
    const [open, setOpen] = useState(true)

    function partAddElement(){
        updateSurveyData('addElement',{partName:partName})
       
    }

    function partDeletePart(){
        var result = window.confirm("Delete the Part "+partName+" ?")
        if(result){

            updateSurveyData('deletePart',{partName:partName})
        }
    }

    return(
        <div style={{border: 'solid black'}} className={"mb-3 mt-3"}>
                <ButtonToolbar
                    className="justify-content-between mb-1 mt-1"
                    aria-label="Toolbar with Button groups"
                >
                    <ButtonGroup>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{open?'Collapse':'Expand'}</Tooltip>}>
                                <Button variant="dark" onClick={() => setOpen(!open)}>
                                    {data.length+' '}
                                    {open?
                                    <FontAwesomeIcon icon={faSquareCaretUp}/>:
                                    <FontAwesomeIcon icon={faSquareCaretDown}/>}
                                </Button>
                        </OverlayTrigger>
                      
                    </ButtonGroup>

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
                            data.map((element,index) =>
                            <SurveyEditorPanelQuestionElement 
                                partName={partName} data={element} setConfig={setConfig}
                                canMoveUp={index!=0? true:false} canMoveDown={index!=data.length-1?true:false}
                                updateSurveyData={updateSurveyData} key={'part-'+partName+'-qid-'+element.qid}>
                            </SurveyEditorPanelQuestionElement>
                            )
                        }
                    </div>
           
                </div>
    )
}

export default SurveyEditorPanelPartElement