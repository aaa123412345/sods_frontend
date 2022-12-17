import React from "react";
import { Row,Col } from "react-bootstrap";
import SurveyBuilder from "../SurveyBuilder/SurveyBuilder";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SurverEditorOverall from "./SurverEditorOverall.js/SurverEditorLayout";

const SurveyEditor = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const items = {
        header:{},
        questionset:[
            {
                type:"stext",
                question:"A ?",
                required:true
            }
        ]
    }

    function offcanvas(btnname){
        return(
            <>
            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SurveyBuilder data={items} submitBTN={false}></SurveyBuilder>
                </Offcanvas.Body>
            </Offcanvas>
          </>
        )
    }
    

    return(
        <Row style={{backgroundColor:"gray",height:'100%',paddingTop:'10px'}}>
            <Col sm={7}>
                <SurverEditorOverall></SurverEditorOverall>
            </Col>
            <Col sm={5}>
                Design
            {offcanvas("test")}
            </Col>
            
        </Row>
    )

}

export default SurveyEditor;