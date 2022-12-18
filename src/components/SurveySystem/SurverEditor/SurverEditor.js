import React from "react";
import { useState,useEffect } from 'react';

import { Row,Col,Offcanvas } from "react-bootstrap";

import SurveyBuilder from "../SurveyBuilder/SurveyBuilder";
import SurverEditorOverall from "./SurverEditorOverall.js/SurverEditorOverall";
import SurveyEditorConfigurationPanel from "./SurveyEditorConfigurationPanel/SurveyEditorConfigurationPanel";

const SurveyEditor = () => {
    const [show, setShow] = useState(false);
    const [init, setInit] = useState(true);
    const [update, setUpdate] = useState(false);
    const [ready, setReady] = useState(false);
    const [nextPID, setNextPID] = useState(1);
    const [nextQID, setNextQID] = useState(1);

    const [surveyData, setSurveyData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deletePart(partID){
        var all = surveyData
        var temp = surveyData['questionset']
        var nextPidInt = nextPID-1
        
        delete temp[partID]
        
        //save to state
        all['questionset']=temp
        all.info.partKey= removeItemOnce( all.info.partKey, partID)
        all.info.totalpart--;

        //resort
        all=deletePartReSort(partID,all)
        console.log(all)
        //update State
        setSurveyData(all)
        setUpdate(true)
        setNextPID(nextPidInt)
    }

    function deletePartReSort(target,dict){
        var intTarget = parseInt(target)
        var keyArr = dict.info.partKey
        for(var i = target-1;i<keyArr.length;i++){
            //part key resort
            keyArr[i]=(keyArr[i]-1).toString()

        }

        for(var i = intTarget;i<dict.info.totalpart+1;i++){
            //questionset dict resort
            //swap if remove 2, then 3:{} => 2:{}
            dict.questionset[i]=dict.questionset[i+1]
        }
        delete dict['questionset'][(dict.info.totalpart+1).toString()]
        return dict   
    }

    
    function addPart(){
        //init
        var all = surveyData
        var temp = surveyData['questionset']
        var nextPidInt = nextPID+1
        var partid = nextPID.toString()

        //create null array foor part
        temp[partid]=[]

        //save to state
        all['questionset']=temp
        all.info.partKey.push(partid)
        all.info.totalpart++;
        setSurveyData(all)

        //Auto increase Next ID
        setNextPID(nextPidInt)
        setUpdate(true)
       
    }

    function deleteElement(partID,elementID){

    }

    function addElement(partID){
        
    }

    function partSort(){
        
    }

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }

    const items = {
        header:{},
        info:{
            totalpart:0,
            partKey:[]
        },
        questionset:{
            

        }
    }

    useEffect(()=>{
        if(init){
            setSurveyData(items)
            setReady(true)
            setInit(false)
        }
       
    },[surveyData])

    if(update){
        setUpdate(false)
    }
    
    
    if(ready){
        return(
            <Row style={{backgroundColor:"gray",height:'100%',paddingTop:'10px'}}>
                <Col sm={7}>
                    <SurverEditorOverall handleShow={handleShow} data={surveyData}
                     deletePart={deletePart} deleteElement={deleteElement}
                     addElement={addElement} addPart={addPart}
                     ></SurverEditorOverall>
                </Col>
                <Col sm={5}>
                    <SurveyEditorConfigurationPanel></SurveyEditorConfigurationPanel>
            
                </Col>

                <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Preview</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <SurveyBuilder data={items} testMode={true}></SurveyBuilder>
                    </Offcanvas.Body>
                </Offcanvas>
                
            </Row>
        )
    }
    

}

export default SurveyEditor;

//SurveyEditor => SurveyBuilder => SurveyFormmator => SurveyElementDict => SurveyCoomponent