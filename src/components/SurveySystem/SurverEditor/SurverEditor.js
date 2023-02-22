import React from "react";
import { useState,useEffect } from 'react';
import { Row,Col,Offcanvas, Button } from "react-bootstrap";
import useWindowSize from "../../../hooks/useWindowSize";
import cloneDeep from 'lodash/cloneDeep'

//import user context and related component
import {UserContext} from '../../../App'
import { useContext } from "react";
import axios from 'axios';
import jsonExtractor from "../../Common/RESTjsonextract/RESTjsonextract";
import { Navigate } from 'react-router-dom';

//import children component
import SurveyBuilder from "../SurveyBuilder/SurveyBuilder";
import SurverEditorOverall from "./SurverEditorOverall.js/SurverEditorOverall";
import SurveyEditorConfigurationPanel from "./SurveyEditorConfigurationPanel/SurveyEditorConfigurationPanel";
import SurveyEditorChecker from "./SESyntaxChecker/SESyntaxChecker";




const SurveyEditor = () => {
    //Constant
    const windowsize = useWindowSize()
    
    //user information
    const {user,clearLoginState} = useContext(UserContext)
    const urlParams = new URLSearchParams(window.location.search);

    //page state
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);
    const [init, setInit] = useState(true);
    const [update, setUpdate] = useState(false);
    const [ready, setReady] = useState(false);
    const [configshow, setConfigshow] = useState(false);

    //survey create state
    const [nextPID, setNextPID] = useState(1);
    const [nextQID, setNextQID] = useState(1);
    const [surveyData, setSurveyData] = useState({});
    const [editorMode, setEditorMode] = useState('create'); // 'create' or 'update'
   

    //survey syntax
    const [surveySyntax, setSurveySyntax] = useState(false);

    //survey configuration state
    const [configType, setConfigType] = useState('none')
    const [configData, setConfigData] = useState({})
    const [autoReopenConfig, setAutoReopenConfig] = useState({reopen:false,type:'',data:{}})

    //Offcanvas Show
    const handleConfigShow = () => setConfigshow(true);
    const handleConfigClose = () => setConfigshow(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        var ok = true
        if(configType!=='none'){
            ok = confirmBox("Your unsaved configuration will be lost.")
            if(ok){
                cancelConfig()
            }
        }

        if(ok){
            var CheckResult = SurveyEditorChecker(surveyData)
            console.log(CheckResult)
            if(CheckResult.ready){
                setSurveySyntax(true)
                setShow(true)
            
            }else{
                alert("Some element have invalid/incomplete information")
                setSurveySyntax(false)
                setShow(false)
            }
        }
        
    };

   

    /*
    Basic function
    */
    function updateSurveyData(mode,data){
        var ok = true
        if(configType!=='none'){
            var ok = confirmBox("Your unsaved configuration will be lost.")
            if(ok){
                cancelConfig()
            }
        }
        if(ok){
            if(mode=="deletePart"){
                deletePart(data.partName)
            }
            else if(mode=="swap"){
                swap(data.partName,data.indexA,data.indexB)
            }
            else if(mode=="deleteElement"){
                deleteElement(data.partName,data.qid)
            }
            else if(mode=="addElement"){
                addElement(data.partName)
            }else if(mode=="addPart"){
                addPart()
            }
        }
    }
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

        var tempElement = {'qid':curQID,'msg':'msg'+curQID,'type':''}

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

    /*
    Util function
    */

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

    function confirmBox(string){
        var result = window.confirm(string)
        return result
    }
    /*
    configuration setting function
    */
    function setConfig(type,data){
       
       
        if(configType!=='none'&&type!=='none'){
            var ok = confirmBox("Your unsaved configuration will be lost.")
            if(ok){
                cancelConfig()
                setAutoReopenConfig({reopen:true,type:type,data:data})
            }
        }
        else{
            
                if(type==='overall'){
                    setConfigType('overall')
                    setConfigData(data)
                    
                }else if(type==='element'){
                    //Switch from element to element
                
                        data['qDict']= surveyData.questionset[data.partName].find(e => e.qid === data.qid)
                        setConfigType('element')
                        setConfigData(data)
                
                }

                if(windowsize.width<992){
                    handleConfigShow()
                }
           
        }
    }

    function cancelConfig(){
 
        setConfigData({})
        setConfigType('none')
        if(windowsize.width<572){
            handleConfigClose();
        }
    }

    //Children function
    function updateConfig(savedData){
        var result = window.confirm("Save your configuration?")
        if(result){
            setConfigType('none')
            setConfigData({})
            setUpdate(true)
            if(savedData.updateType === "overall"){
                updateOverallConfig(savedData)
            }else if(savedData.updateType === "element"){
                updateElementConfig(savedData)
            }
        }
        if(windowsize.width<572){
            handleConfigClose();
        }
    }

    function updateOverallConfig(savedData){
        var dictlv1 = surveyData
        var dictlv2 = surveyData['info']

        dictlv2.title = savedData.title
        dictlv2.type = savedData.type
        dictlv2.header = savedData.header
        dictlv2.allowGoBack = savedData.allowGoBack

        dictlv1['info'] = dictlv2
       
        setSurveyData(dictlv1)
    }

    function updateElementConfig(savedData){
        var dictlv1 = surveyData
        var dictlv2 = surveyData['questionset']
        var dictlv3 = surveyData.questionset[savedData.partName]

        var index = dictlv3.findIndex(e => e.qid === savedData.qid)
        dictlv3[index]= {}
        dictlv3[index] = savedData.qDict
    }

    const surveyUpload = async() =>{
        var method
        var url
        if(editorMode === 'create'){
            method = 'post'
            url = process.env.REACT_APP_SURVEY_SYSTEM_HOST+'/survey'
        } else if(editorMode === 'update'){
            method = 'put'
            url = process.env.REACT_APP_SURVEY_SYSTEM_HOST+'/survey/'+urlParams.get('surveyID')
        }
        try{
            const { data } = await axios({
            method: method,
            url: url,
            data: surveyData,
            headers:{
                'token':user.token
            }
            })
        
            var rest = jsonExtractor(data);
            if(rest.response === "success"){
            console.log(rest.data)
            setRedirect(true)
            alert("Upload Success")
    
            
            }else if (rest.response === "undefineerror"){
                console.log("The authentication server is down")
                alert("The service is not avaliable. Please try to login later")
                clearLoginState()
            }else{
                console.log(rest)
                alert("Upload fail")
                clearLoginState()
            }
        }catch (error){
            clearLoginState()
            alert("The survey uploading service is not avaliable at this moment")
        }
    }


    //init
    const items = {
        info:{
            totalpart:0,
            partKey:[],
            type:'Survey',
            title:'',
            header:'',
            allowGoBack:false

        },
        questionset:{
            

        }
    }
    //init with specfic survey
    const getSurveyData = async(id) =>{
        
        try{
            const { data } = await axios({
              method: 'get',
              url: process.env.REACT_APP_SURVEY_SYSTEM_HOST+'/survey/'+id,
              headers:{
                'token':user.token
              },
             
            })
           
            var rest = jsonExtractor(data);
            //console.log(data)
            
            if(rest.response === "success"){
              
              setSurveyData(rest.data)
              setReady(true)
              setInit(false)
              setEditorMode('update')
            }else if (rest.response === "undefineerror"){
              console.log("The authentication server is down")
              alert("The service is not avaliable. Please try to login later")
              clearLoginState()
            }else{
              console.log(rest)
              alert("Get data fail")
              clearLoginState()
            }
          }catch (error){
            clearLoginState()
            alert("The survey uploading service is not avaliable at this moment")
          }
    }


    useEffect(()=>{
        if(init){
            if(urlParams.has('surveyID')){
                getSurveyData(urlParams.get('surveyID'))
            }
            else{
                setSurveyData(items)
                setReady(true)
                setInit(false)
                setEditorMode('create')
            }
        }
       
    },[surveyData])

    //Auto reopen configuration panel
    useEffect(()=>{
        
        if(autoReopenConfig.reopen === true){

            setConfig(autoReopenConfig.type,autoReopenConfig.data)
            setAutoReopenConfig({reopen:false,type:'',data:{}})
            
        }
    },[configType,configData,autoReopenConfig])

    if(update){
        setUpdate(false)
        console.log(surveyData)
    }
    
    
    if(ready){
        
        
        return(
            <>
            {redirect?<Navigate replace to="/server/eng/surveymanager" />:''}
            <Row style={{backgroundColor:"gray",paddingTop:'10px',height:'100%'}}>
                <Col lg={6} style={{overflowY:'scroll',height:'600px',border:'solid black'}}>
                    <SurverEditorOverall handleShow={handleShow} data={cloneDeep(surveyData)}
                     updateSurveyData={updateSurveyData} setConfig={setConfig}
                     ></SurverEditorOverall>
                </Col>
                <Col lg={6} style={{overflowY:'scroll',height:'600px',border:'solid black'}} className={'d-none d-lg-block'}>
                    <SurveyEditorConfigurationPanel 
                    configType={configType} configData={cloneDeep(configData)} surveyData={cloneDeep(surveyData)}  cancelConfig={cancelConfig} 
                    updateConfig={updateConfig} ></SurveyEditorConfigurationPanel>
                </Col>

                                {/*Preview*/}
                <Offcanvas show={show} onHide={handleClose} placement={'end'} style={{color:'black',width:'100%'}}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Preview</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {surveySyntax?
                        <>
                            <SurveyBuilder data={surveyData} testMode={true}></SurveyBuilder>
                            <Button className="mt-5" onClick={()=>{surveyUpload()}}>Click me to upload the survey to server</Button>
                        </>
                        :''
                        }

                    </Offcanvas.Body>
                </Offcanvas>

                             {/*Config moblie version*/}
                <Offcanvas show={configshow} onHide={handleConfigClose} 
                placement={'end'} className={'d-block d-md-none'}  style={{width:'100%', overflowY:'scroll',height:'650px',border:'solid black'}}>
                    <Offcanvas.Header closeButton onClick={cancelConfig}>
                    <Offcanvas.Title>Configuration</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                       
                            <SurveyEditorConfigurationPanel configData={cloneDeep(configData)} surveyData={cloneDeep(surveyData)} cancelConfig={cancelConfig} 
                            configType={configType}  updateConfig={updateConfig}></SurveyEditorConfigurationPanel>
                            
                        
                    </Offcanvas.Body>
                </Offcanvas>
                
            </Row>

            <Row style={{backgroundColor:"gray",height:"100px"}}>

            </Row >
            </>
        )
    }
    
    
}

export default SurveyEditor;

//SurveyEditor => SurveyBuilder => SurveyFormmator => SurveyElementDict => SurveyCoomponent