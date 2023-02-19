import React, { useEffect,useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import { useState } from "react";
import { Button,Tabs,Tab,Form, Row, Col, } from "react-bootstrap";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import RealTimeVotingElementDict from "./RealTimeVotingElementDict";
import RealTimeVotingResultDisplayer from "./RealTimeVotingResultDisplayer";
import QRCode from "react-qr-code";

var stompClient =null;
//Enum
const MESSAGE_STATUS = {
    JOIN:"JOIN",
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
    
    const {user,clearLoginState} = useContext(UserContext)
    const [passCode,setPassCode] = useState('')
    const [surveyID,setSurveyID] = useState('')
    const [passCodeReady,setPassCodeReady] = useState(false)
    const [groupCreated,setGroupcreated] = useState(false)
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
    
    /*
    REST AREA
    */

    const createGroup=async()=>{
        const { data } = await axios({
            method: 'post',
            url: process.env.REACT_APP_VOTING_SYSTEM_HOST+'/'+passCode,
            headers:{'token':user.token},
            data:{surveyID}
        })
        alert(data.msg)
        setGroupcreated(true)
    }
    const removeGroup=async(passCode)=>{
        const { data } = await axios({
            method: 'delete',
            url: process.env.REACT_APP_VOTING_SYSTEM_HOST+'/'+passCode,
            headers:{'token':user.token}
        })
        console.log(data)
    }
    const preGetNewPasscode=async()=>{
        var passcodeIsNotUse = false
        do{
            var tmpPassCode = getRandomStr(6)
            const { data } = await axios({
                method: 'get',
                url: process.env.REACT_APP_VOTING_SYSTEM_HOST+'/'+tmpPassCode,
                headers:{'token':user.token}
            })
            
            if(data.code===404){
                break;
            }
        }while(passcodeIsNotUse === false)

        setPassCode(tmpPassCode)
        setPassCodeReady(true)
        
    }

    const checkPasscodeAndConnect=async()=>{ 
        const { data } = await axios({
                method: 'get',
                url: process.env.REACT_APP_VOTING_SYSTEM_HOST+'/'+passCode,
                headers:{'token':user.token}
        })
            
            if(data.code===200){
                //connect
                alert("Connect Success")
                connect();
                
            }
    }

    const createAndConnect = () => {
        createGroup()
        checkPasscodeAndConnect()
    }

    const getRandomStr = (num) =>{
        var str = "ABCDEFGHIJKNMOPQRSTUVWXYZ"
        var result = ""
        for(var i=0;i<num;i++){
            var index = Math.floor(Math.random() * 26)
            result+=str.charAt(index)
        }
        return result;
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
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.userName,
            receiverName:passCode,
            status:MESSAGE_STATUS.JOIN,
            action:ACTION_TYPE.NONE
          };
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
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
        return()=>{
            if(passCodeReady===false){
                preGetNewPasscode()
            }
            if(urlParams.has('surveyID')){
                setSurveyID(urlParams.get('surveyID'))    
            }
        }
    },[])

    /*
    React Component Group
    */

    function createGroupTab(){
        return(
            <Tab eventKey="major" title="Group create/Connect">
                
                <Form.Label className="mt-2">Pass Code : {passCode}</Form.Label><br></br>
                        
                <Form.Label className="mt-2">Survey ID</Form.Label>
                <Form.Control
                    type="text"
                    id="text"
                    onChange={(event)=>setSurveyID(event.target.value)}
                    defaultValue={surveyID}
                            
                />
                <Button className="mt-2" onClick={createGroup}> Create Group</Button>
                <Button className="mt-2" onClick={createAndConnect}> Create And Connect Group</Button>
                <br></br>
                
            </Tab>
        )
    }
    function connectGroupTab(){
        return(
            <Tab eventKey="actived" title="Group Connect">
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
            </Tab>

        )
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
                <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.CLEAR)}>Clear Data</Button>
                <br></br> <br></br>

                <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.SHOWRESULT)}>Show result</Button>
                <br></br> <br></br>
                <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.NEXTQUESTION)}>Next question</Button>
                <br></br> <br></br>
                <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.VOTINGEND)}>End Voting</Button>
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
                        <RealTimeVotingResultDisplayer data={JSON.parse(renderData)}></RealTimeVotingResultDisplayer>
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
        return( 
        <Tab eventKey="votingControl2" title="Method to join this voting">
            
                <Row style={{marginLeft:'auto',marginRight:'auto',width:'80%',textAlign:'center'}}>
                    <h1>Pass code : {votingState.passcode}</h1>
                    {votingState.passcode=== undefined?'':
                    <QRCode value={votingState.passcode} size={256} style={{ height: "auto", maxWidth: "50%", width: "50%",marginLeft:'auto',marginRight:'auto' }} 
                    viewBox={`0 0 256 256`}></QRCode>
                    }
                    
                </Row>
           

        </Tab>)
    }

    

    if(passCodeReady){
       
        return(
            <>
            <Tabs
                defaultActiveKey="designed"
                id="uncontrolled-tab-example"
                className="mb-3"
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