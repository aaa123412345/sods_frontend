import React from "react";

import { faAngleUp,faAngleDown,faClose,faGear,faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {Button,Stack,OverlayTrigger,Tooltip,Row,Col} from 'react-bootstrap'

const SurverEditorOverall = () =>{
    return(
        <>
        <div style={{marginLeft:'auto',marginRight:'auto',width:'90%',textAlign:'center'}}>
            <Row>
                <Stack direction="horizontal" gap={1}>
                    <h1>Overall</h1>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add the question</Tooltip>}>
                        <Button variant="secondary"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
                    </OverlayTrigger>
                </Stack>
            
                <div style={{outlineStyle: 'solid',width:'90%'}}>
                    
                        Part 1
                    
                        <Row style={{outlineStyle: 'dotted'}}>
                            <Stack direction="horizontal" gap={1}>
                                <Col xs={6} sm={6} lg={7} md={6} xl={8}>
                                    ABC
                                </Col>
                                <Col xs={6} sm={6} lg={5} md={6} xl={4}>
                                    <Row style={{marginLeft:0,marginRight:0}}>
                                        <Col lg={3}  sm={3} xs={3} style={{padding:0}}>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Configure the question</Tooltip>}>
                                                <Button variant="secondary"><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></Button>
                                            </OverlayTrigger>
                                        </Col>
                                        <Col lg={3} sm={3} xs={3} style={{padding:0}}>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Move up</Tooltip>}>
                                                <Button variant="secondary"><FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon></Button>
                                            </OverlayTrigger>
                                        </Col>
                                        <Col lg={3}  sm={3} xs={3} style={{padding:0}}>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Move Down</Tooltip>}>
                                                <Button variant="secondary"><FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon></Button>
                                            </OverlayTrigger>
                                        </Col>
                                        <Col lg={3}  sm={3} xs={3} style={{padding:0}}>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Remove</Tooltip>}>
                                                <Button variant="danger"><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></Button>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Col>
                            </Stack>
                        </Row>
                    
                </div>
            </Row>

        </div>
        </>
    )
}

export default SurverEditorOverall;