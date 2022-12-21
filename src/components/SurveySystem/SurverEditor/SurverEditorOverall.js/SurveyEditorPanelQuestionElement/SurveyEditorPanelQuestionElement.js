import React, {useState} from "react";
import { faAngleUp,faAngleDown,faClose,faGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Button,Stack,OverlayTrigger,Tooltip,Row,Col,ButtonGroup} from 'react-bootstrap'


const SurveyEditorPanelQuestionElement = ({partName,data,updateSurveyData,canMoveUp,canMoveDown,setConfig}) =>{

   
    const deleteQElement= () => {
        var result = window.confirm("Delete the Element ("+"Qid"+data.qid+"msg"+data.msg+") in Part "+partName+" ?")
        if(result){
          
            updateSurveyData('deleteElement',{partName:partName,qid:data.qid})
        }
    }

    const swapUp = () =>{
        updateSurveyData('swap',{partName:partName,indexA:data.qid-1,indexB:data.qid})

    }

    const swapDown = () =>{
        updateSurveyData('swap',{partName:partName,indexA:data.qid,indexB:data.qid+1})
       
    }
    


    return(
        <>
        
        <Row style={{ borderTop: 'black solid'}}>
            <Stack direction="horizontal" gap={1}>
                <Col xs={6} sm={5} lg={5} md={5} xl={8} style={{color:"black"}}>
                    {"#"+data.qid+": "+data.msg}
                </Col>
                <Col xs={6} sm={7} lg={7} md={7} xl={4}>
                    <Row style={{marginLeft:0,marginRight:0}}>
                        <ButtonGroup aria-label="Basic example" className="mt-1 mb-1">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Configure the question</Tooltip>}>
                                <Button variant="secondary" onClick={()=>setConfig('element',{qid:data.qid,partName:partName})}><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></Button>
                            </OverlayTrigger>
                            {canMoveUp?
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Move up</Tooltip>}>
                                <Button variant="secondary" onClick={swapUp}><FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon></Button>
                            </OverlayTrigger>:
                                ''
                            }
                            {canMoveDown?
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Move Down</Tooltip>}>
                                <Button variant="secondary" onClick={swapDown}><FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon></Button>
                            </OverlayTrigger>:
                                ''
                            }
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove</Tooltip>}>
                                <Button variant="danger" onClick={deleteQElement}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></Button>
                            </OverlayTrigger>
                        </ButtonGroup>
                    </Row>
                </Col>
            </Stack>
        </Row>
        </>
    )
}

export default SurveyEditorPanelQuestionElement;