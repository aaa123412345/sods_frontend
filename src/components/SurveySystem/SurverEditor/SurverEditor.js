import React from "react";
import { useState,useEffect } from 'react';

import { Row,Col,Offcanvas } from "react-bootstrap";

import SurveyBuilder from "../SurveyBuilder/SurveyBuilder";
import SurverEditorOverall from "./SurverEditorOverall.js/SurverEditorOverall";
import SurveyEditorConfigurationPanel from "./SurveyEditorConfigurationPanel/SurveyEditorConfigurationPanel";

import SurveyEditorChecker from "./SurveyEditorChecker";

const SurveyEditor = () => {
    const [show, setShow] = useState(false);
    const [init, setInit] = useState(true);
    const [update, setUpdate] = useState(false);
    const [ready, setReady] = useState(false);
    const [nextPID, setNextPID] = useState(1);
    const [nextQID, setNextQID] = useState(1);
    const [surveySyntax, setSurveySyntax] = useState(false);

    const [surveyData, setSurveyData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => {
        var CheckResult = SurveyEditorChecker(surveyData)
         console.log(CheckResult)
        if(CheckResult.ready){
            setSurveySyntax(true)
            setShow(true)
           
        }else{
            setSurveySyntax(false)
            setShow(false)
        }
        
    };

    //Basic function

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
        all= elementSort(all)
       
        //update State
        setSurveyData(all)
        setUpdate(true)
        setNextPID(nextPidInt)
    }

    //move up and down
    function swap(partID,indexA,indexB){
        var dictlv1 = surveyData
        var dictlv2 = surveyData['questionset']
        var dictlv3 = surveyData.questionset[partID]

        //Get target
        var a = dictlv3.findIndex((element=> element.qid === indexA))
        var b = dictlv3.findIndex((element=> element.qid === indexB))

        //swaping
        var temp = dictlv3[a]
        dictlv3[a] = dictlv3[b]
        dictlv3[b] = temp

        //reset qid
        dictlv3[a].qid=indexA
        dictlv3[b].qid=indexB

        //add Dict
        dictlv2[partID]=dictlv3
        dictlv1['questionset']=dictlv2

        //set State
         //setState
         setUpdate(true)
         setSurveyData(dictlv1)
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
        
        var dictlv1 = surveyData
        var dictlv2 = surveyData['questionset']
        var dictlv3 = surveyData.questionset[partID]
        var curQID = nextQID
        //remove target
        var target = dictlv3.find(element => element.qid == elementID )
        dictlv3=removeItemOnce(dictlv3,target)

        //add Dict
        dictlv2[partID]=dictlv3
        dictlv1['questionset']=dictlv2

        //sort
        dictlv1=elementSort(dictlv1)

         //setState
         setUpdate(true)
         setNextQID(curQID-1)
         setSurveyData(dictlv1)
    }

    function addElement(partID){
        
        var dictlv1 = surveyData
        var dictlv2 = surveyData['questionset']
        var dictlv3 = surveyData.questionset[partID]
        var curQID = nextQID

        var tempElement = {'qid':curQID,'msg':curQID}

        //put in dict
        dictlv3.push(tempElement)
       
        //add Dict
        dictlv2[partID]=dictlv3
        dictlv1['questionset']=dictlv2

        //sort
        dictlv1=elementSort(dictlv1)

        //setState
        setUpdate(true)
        setNextQID(curQID+1)
        setSurveyData(dictlv1)

        
    }

    //Util function

    function elementSort(Dict){
        var dictlv1 = Dict
        var dictlv2 = Dict['questionset']
        var parts = Dict.info.partKey

        //Storing the index for upper element to bottom
        var sindex = 1

        //loop element from start part
        for(var i=0; i<parts.length; i++){

            //Get Arr for specfic part
            var partInQuestionset = dictlv2[parts[i]]

            //loop part arr and sort with index
            for(var j=0; j<partInQuestionset.length;j++,sindex++){
                //Get Dict and set index
               
                var qDict = partInQuestionset[j]
                qDict.qid = sindex
                
                partInQuestionset[j]=qDict
            }

            dictlv2[parts[i]] = partInQuestionset
        }

        dictlv1['questionset'] = dictlv2

        return dictlv1

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

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }

    
    //init
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
        console.log(surveyData, nextQID)
    }
    
    
    if(ready){
        return(
            <>
            
            <Row style={{backgroundColor:"gray",paddingTop:'10px',height:'100%'}}>
                <Col sm={7} style={{overflowY:'scroll',height:'650px',border:'solid black'}}>
                    <SurverEditorOverall handleShow={handleShow} data={surveyData}
                     deletePart={deletePart} deleteElement={deleteElement}
                     addElement={addElement} addPart={addPart} swap={swap}
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
                        {surveySyntax?
                        <SurveyBuilder data={items} testMode={true}></SurveyBuilder>:''
                        }
                    </Offcanvas.Body>
                </Offcanvas>
                
            </Row>
            </>
        )
    }
    
    
}

export default SurveyEditor;

//SurveyEditor => SurveyBuilder => SurveyFormmator => SurveyElementDict => SurveyCoomponent