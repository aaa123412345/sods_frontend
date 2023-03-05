import React, { useEffect,useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import { useState } from "react";
import { Button,Tabs,Tab,Form, Row, Col,Card } from "react-bootstrap";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import RealTimeVotingElementDict from "./RealTimeVotingElementDict";
import RealTimeVotingResultDisplayer from "./RealTimeVotingResultDisplayer";
import QRCode from "react-qr-code";

import VotingSelector from "./VotingSelector";

import useSendRequest from "../../../hooks/useSendRequest";

var stompClient =null;
//Enum
const MESSAGE_STATUS = {
    JOIN:"JOIN",
    ADMINJOIN:"ADMINJOIN",
    LEAVE:"LEAVE",
    MESSAGE:"MESSAGE",
    COMMAND:"COMMAND",
    ERROR:"ERROR"
}

const ACTION_TYPE = {
    
    SUBMIT:"SUBMIT",
    CLEAR:"CLEAR",
    SYNCHRONIZATION:"SYNCHRONIZATION",
    NONE:"NONE",
    CREATEGROUP:"CREATEGROUP",
    REMOVEGROUP:"REMOVEGROUP",
    FORCEUNSUBSCRIBE:"FORCEUNSUBSCRIBE",
    SHOWRESULT:"SHOWRESULT",
    NEXTQUESTION:"NEXTQUESTION",
    VOTINGEND:"VOTINGEND",
}

const CLIENT_RENDER_METHOD = {
    VOTING:"VOTING",
    SHOWRESULT:"SHOWRESULT"
}


const VotingAdmin = () => {
    const [tabKey,setTabKey] = useState('major')
    const {user,clearLoginState} = useContext(UserContext)
    const [passCode,setPassCode] = useState('')
    const [surveyID,setSurveyID] = useState('')
    const [passCodeReady,setPassCodeReady] = useState(false)
    const [groupCreated,setGroupcreated] = useState(false)
    const [currentQuestionMsg,setCurrentQuestionMsg] = useState('')

    const urlParams = new URLSearchParams(window.location.search);


    const [roomState, setRoomState] = useState({
        isConnect:false,
        isSubscribe:false,
        
    })
    const [votingState, setVotingState] = useState({})

    const [userData, setUserData] = useState({
        UserID:'',
        permission:[]});

    const [renderData, setRenderData] = useState({})
    const [validated,setValidated] = useState(false)
    const [responseData,setResponseData] = useState({})

    const [initActive,setInitActive] = useState(true)
    const initHook = useSendRequest(process.env.REACT_APP_VOTING_SYSTEM_HOST+'/'+'getExist','get',{},initActive)
    const [initData,setInitData] = useState({})

     const [actionHookState,setActionHookState] = useState({
        method:'',
        data:{},
        active:false
    })
    const actionHook = useSendRequest(process.env.REACT_APP_VOTING_SYSTEM_HOST+'/passcode/'+passCode
    ,actionHookState.method,actionHookState.data,actionHookState.active)

   
    /*
    REST AREA
    */
    useEffect(()=>{
        if(!actionHook.isLoaded && actionHookState.active){
            if(actionHook.ready){
                if(actionHookState.method === 'get'){
                    alert("Connect Success")
                    connect();
                }else if(actionHookState.method === 'post'){
                    alert("Create Success")
                    setGroupcreated(true)
                    window.location.reload();
                }else if(actionHookState.method === 'delete'){
                    alert("Remove Success")
                    window.location.reload();
                }
                setActionHookState({
                    method:'',
                    data:{},
                    active:false
                })
            }else if(actionHook.errMsg !== ''){
                alert(actionHook.errMsg)
                setActionHookState({
                    method:'',
                    data:{},
                    active:false
                })
            }
        }
    },[actionHook])

    const createGroup=()=>{
        setActionHookState({
            method:'post',
            data:{surveyID},
            active:true
        })
    }

    const removeGroup=()=>{
        setActionHookState({
            method:'delete',
            data:{},
            active:true
        })
        
    }
    

    const checkPasscodeAndConnect=()=>{ 
        setActionHookState({
            method:'get',
            data:{},
            active:true
        })
        
           
    }

    const createAndConnect = () => {
        createGroup()
        checkPasscodeAndConnect()
    }

   

    /*
    Web socket
    */

    const connect =()=>{
        let Sock = new SockJS(process.env.REACT_APP_WEBSOCKET_HOST);
        stompClient = over(Sock);
        stompClient.connect({token:user.token}, onConnected, onError);
        
    }

    const disconnect=()=>{
        if(roomState.isSubscribe){
            unSubscribe();
        }
        stompClient.disconnect();
        setRoomState({...roomState,"isConnect":false})
    }

    const onConnected = (data) => {
        var validatedUserData = JSON.parse(data.headers['user-name'])
        setUserData({...userData,"UserID":validatedUserData.UserID,"permission":[...userData.permission,validatedUserData.Permission]})
        setRoomState({...roomState,"isConnect":true})
        subscribe()
        
    }

    const subscribe = () =>{
        
            stompClient.subscribe('/user/'+passCode+'/private', onPrivateMessage);
            setRoomState({...roomState,"isSubscribe":true});
            
            userJoin();
        
       
       
    } 

    const unSubscribe = () => {
        
        setRoomState({...roomState,"isSubscribe":false})
        stompClient.unsubscribe('/user/'+passCode+'/private')
        alert("Voting Finnish")
        setTabKey('major')
    }

    const userJoin=()=>{
        
          var chatMessage = {
            senderName: userData.userName,
            receiverName:passCode,
            status:MESSAGE_STATUS.ADMINJOIN,
            action:ACTION_TYPE.NONE
          };
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setTabKey('votingControl')
    }

    const onPrivateMessage = (payload)=>{
        
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData)

        if(payloadData.status === MESSAGE_STATUS.COMMAND){
            actionExecutor(payloadData)
        }
        
    }

    const actionExecutor= (payloadData) =>{
        var action = payloadData.action
        var data = JSON.parse(payloadData.data)
        switch(action){
            case ACTION_TYPE.FORCEUNSUBSCRIBE: unSubscribe();break;
            case ACTION_TYPE.SYNCHRONIZATION: doSynchronization(data);break;
        }
    }

    const doSynchronization = (data)=>{
        //setClickCount(data.clickCount)

        if('renderData' in data){
            console.log(data.renderData)
           setRenderData(data.renderData)
        }
        if('currentQuestionMsg' in data){
            setCurrentQuestionMsg(data.currentQuestionMsg)
        }
        setVotingState(data)
    }

    const onError = (err) => {
        console.log(err);
        
    }
    
    const sendPrivateCommand=(action)=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.userName,
            receiverName:passCode,
            status:MESSAGE_STATUS.COMMAND,
            action:action
           
          };
         
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const sendPrivateCommandWithData=(action,data)=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.userName,
            receiverName:passCode,
            status:MESSAGE_STATUS.COMMAND,
            action:action,
            data:JSON.stringify(data)
          };
         
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    useEffect(()=>{
        
            if(!passCodeReady){
                setPassCodeReady(true)
                
            }
            if(urlParams.has('surveyID')){
                setSurveyID(urlParams.get('surveyID'))    
            }
        
    },[])

    /*
    React Component Group
    */

    function createGroupTab(){
       
        return(
            <Tab eventKey="major" title="Group create/Connect">
                
                <Row>
                    
                    <Col>
                        <VotingSelector createGroup={createGroup} createAndConnect={createAndConnect}
                        setPasscode= {setPassCode} setSurveyID={setSurveyID}></VotingSelector>
                    </Col>
                </Row>
            </Tab>
        )
    }
    function connectGroupTab(){
        if(!initHook.isLoaded&&initActive){
            if(initHook.ready){
                setInitActive(false)
                setInitData(initHook.items)
               
            }
        }
        
        
            
            
            return(
                <Tab eventKey="actived" title="Group Connect">
                    <Row>
                            <Col>
                                <Form.Label className="mt-2">Pass Code (Letter only):</Form.Label><br></br>
                                <Form.Control
                                type="text"
                                id="text"
                                style={{width:'30%'}}
                                onChange={(event)=>{
                                    var bigStr = event.target.value.toUpperCase();
                                    setPassCode(bigStr)
                                        
                                }}
                                onKeyDown={(event)=>{
                                    var pressed = event.key               
                                    if(!((pressed>='A'&&pressed<='Z')||(pressed>='a'&&pressed<='z')||pressed==='Backspace')){
                                        event.preventDefault();
                                    }
                                }}
                                onInput={(e)=>{e.target.value = ("" + e.target.value).toUpperCase();}}
                                />
                                <Button className="mt-2" onClick={checkPasscodeAndConnect}> Connect Group</Button>
                            </Col>
                            <Col>
                                <Row xs={1} sm={1} md={1} xl={2} xxl={2}  className="g-1">
                                    {Array.isArray(initData)? initData.map((element,index)=>VotingCard(element,index)):''}
                                </Row>
                            </Col>
                        </Row>
                    </Tab>
            )
        
        
    }

    function VotingCard(element,index) {
        return (
          <Col style={{display: 'flex', justifyContent: 'center'}} key={'aspcv-card-col-'+index}>
            <Card style={{ width: '18rem'}} key={'aspcv-card-root-'+index}>
              <Card.Body key={'aspcv-card-body-'+index}>
                <Card.Title key={'aspcv-card-Title-'+index}>{element.passcode}</Card.Title>
                <Card.Subtitle key={'aspcv-card-Subtitle-'+index} className="mb-2 text-muted">{JSON.parse(element.surveyID).surveyID}</Card.Subtitle>
                <Card.Text key={'aspcv-card-info-'+index}>
                  {"("+element.participantSubmit+"/"+element.participantJoin+")"}
                </Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
        );
    }
        
    


   

    function votingStateDisplayer(){
        return(
            <>
            <h3>Voting State:</h3>
            <h4>Clien Render Method: {votingState.clientRenderMethod}</h4>
            <h4>Current Question: {votingState.currentQuestion}</h4>
            <h4>User State: {votingState.participantSubmit+" / "+votingState.participantJoin}</h4>
            
            </>
            
        )

    }

    function adminControlPlatform(){
       
        return(
            
            <Row>
                <Col>
                    {votingStateDisplayer()}
                </Col>
                <Col>
                <h4>Admin Action : </h4> 
                <br></br>
                
                {votingState.clientRenderMethod === CLIENT_RENDER_METHOD.SHOWRESULT?
                ''
                :<>
                    <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.SHOWRESULT)}>Show result</Button>
                <br></br> <br></br>
                </>}
                
               
                {votingState.currentQuestion == votingState.maxQuestion?
                <Button onClick={()=>{
                    sendPrivateCommand(ACTION_TYPE.VOTINGEND)
                    alert("Voting End")
                    window.location.reload()
                }}>End Voting</Button>:
                <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.NEXTQUESTION)}>Next question</Button>
                     }
                
                </Col>
            </Row>
            
        )
    } 

    function rendering(){
        if(roomState.isSubscribe){
            if(votingState.clientRenderMethod!== undefined && renderData !== {}){
                if(votingState.clientRenderMethod === CLIENT_RENDER_METHOD.VOTING){     
                    return(
                        <>  
                            <h4>User Area:</h4>
                            <Form noValidate validated={validated}>
                                <RealTimeVotingElementDict data={JSON.parse(renderData)} qid={votingState.currentQuestion}
                                validated={validated} parentFunction={()=>{}} savedFormData={{}} curPart={''}/>
                                
                            </Form>
                        </>
                    
                    )
                }else if(votingState.clientRenderMethod === CLIENT_RENDER_METHOD.SHOWRESULT){
                    return(
                        <>
                        {currentQuestionMsg !== ''?<h4>{currentQuestionMsg}</h4>:''}
                        <RealTimeVotingResultDisplayer data={JSON.parse(renderData)}></RealTimeVotingResultDisplayer>
                        </>
                        
                    )
                }
            }
        }
    }

    function votingControlTab(){
        return( 
        <Tab eventKey="votingControl" title="Voting State">
            <Row>
                <Col>
                    {adminControlPlatform()}
                </Col>
                <Col>
                    {rendering()}
                </Col>
            </Row>

        </Tab>)
    }

    function votingControlTab2(){
        var url = window.location.host + "/public/eng/vote_client?passCode="+votingState.passcode
        return( 
        <Tab eventKey="votingControl2" title="Method to join this voting">
            
                <Row style={{marginLeft:'auto',marginRight:'auto',width:'80%',textAlign:'center'}}>
                    <h1>Pass code : {votingState.passcode}</h1>
                    {votingState.passcode=== undefined?'':
                    <QRCode value={url} size={256} style={{ height: "auto", maxWidth: "50%", width: "50%",marginLeft:'auto',marginRight:'auto' }} 
                    viewBox={`0 0 256 256`}></QRCode>
                    }
                    
                </Row>
           

        </Tab>)
    }

    

    if(passCodeReady){
       
        return(
            <>
            <Tabs
                activeKey={tabKey}
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={(k)=> setTabKey(k)}
            >
                {!roomState.isSubscribe?
                createGroupTab():''}

                {!roomState.isSubscribe?
                connectGroupTab():''}

                {roomState.isSubscribe?
                votingControlTab():''}

                {roomState.isSubscribe?
                votingControlTab2():''}

               
                
                
                
                
            </Tabs>
               
            </>
        )
    }

}


export default VotingAdmin;