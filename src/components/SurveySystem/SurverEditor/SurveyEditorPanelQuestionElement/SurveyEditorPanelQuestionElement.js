import React from "react";
import { faAngleUp,faAngleDown,faClose,faGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Button,Stack,OverlayTrigger,Tooltip,Row,Col,ButtonGroup} from 'react-bootstrap'

const SurveyEditorPanelQuestionElement = ({partName,data,deleteElement}) =>{
    function deleteQElement(){
        deleteElement(partName,data.qid)
    }

    return(
        <Row style={{outlineStyle: 'dotted'}}>
            <Stack direction="horizontal" gap={1}>
                <Col xs={6} sm={5} lg={5} md={5} xl={8}>
                    {"Qid"+data.qid+"msg"+data.msg}
                </Col>
                <Col xs={6} sm={7} lg={7} md={7} xl={4}>
                    <Row style={{marginLeft:0,marginRight:0}}>
                        <ButtonGroup aria-label="Basic example" className="mt-1 mb-1">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Configure the question</Tooltip>}>
                                <Button variant="secondary"><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></Button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Move up</Tooltip>}>
                                <Button variant="secondary"><FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon></Button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Move Down</Tooltip>}>
                                <Button variant="secondary"><FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon></Button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove</Tooltip>}>
                                <Button variant="danger" onClick={deleteQElement}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></Button>
                            </OverlayTrigger>
                        </ButtonGroup>
                    </Row>
                </Col>
            </Stack>
        </Row>
    )
}

export default SurveyEditorPanelQuestionElement;