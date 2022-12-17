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
        info:{
            totalpart:2
        },
        questionset:{
        '1':[
            {
                qid:1,
                type:"stext",
                question:"A ?",
                required:true
            }
        ],
        '2':[
            {
                qid:2,
                type:"stext",
                question:"B ?",
                required:true
            }
        ]

    }
    }

    function offcanvas(btnname){
        return(
            <>
            
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Preview</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SurveyBuilder data={items} testMode={true}></SurveyBuilder>
                </Offcanvas.Body>
            </Offcanvas>
          </>
        )
    }
    

    return(
        <Row style={{backgroundColor:"gray",height:'100%',paddingTop:'10px'}}>
            <Col sm={7}>
                <SurverEditorOverall handleShow={handleShow}></SurverEditorOverall>
            </Col>
            <Col sm={5}>
                Design
            {offcanvas("test")}
            </Col>
            
        </Row>
    )

}

export default SurveyEditor;

//SurveyEditor => SurveyBuilder => SurveyFormmator => SurveyElementDict => SurveyCoomponent