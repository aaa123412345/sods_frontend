import React, { useEffect, useState,useContext  } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {UserContext} from "../../../App"

import { Button, Form } from 'react-bootstrap';

import useFetch from '../../../hooks/useFetch';

import RealTimeVotingElementDict from './RealTimeVotingElementDict';
import RealTimeVotingResultDisplayer from './RealTimeVotingResultDisplayer';


var stompClient =null;
const sessionID = "ABCDEF"
const surveyID='1624730353662853121'


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

const RealTimeVotingRoom = () => {
    const [roomState, setRoomState] = useState({
        isConnect:false,
        isSubscribe:false,
        isJoin:false,
        
    })
    const [votingState, setVotingState] = useState({})

    const {user,clearLoginState} = useContext(UserContext)
    const [userData, setUserData] = useState({
        UserID:'',
        permission:[]});

    const [renderData, setRenderData] = useState({})
    const [validated,setValidated] = useState(false)
    const [responseData,setResponseData] = useState({})
    

    const {items,isLoaded,ready,error,redirection} = useFetch(process.env.REACT_APP_VOTING_SYSTEM_HOST+'/'+sessionID)
   

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8888/ws');
        stompClient = over(Sock);
        stompClient.connect({token:user.token},onConnected, onError);
        
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
        
    }

    const subscribe = () =>{
        stompClient.subscribe('/user/'+sessionID+'/private', onPrivateMessage);
        setRoomState({...roomState,"isSubscribe":true});
        userJoin();
       
       
    } 

 

    const unSubscribe = () => {
        
        setRoomState({...roomState,"isSubscribe":false})
        stompClient.unsubscribe('/user/'+sessionID+'/private')
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.userName,
            receiverName:sessionID,
            status:MESSAGE_STATUS.JOIN,
            action:ACTION_TYPE.NONE
          };
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    }

    const userLeave=()=>{
        var chatMessage = {
          senderName: userData.userName,
          receiverName:sessionID,
          status:MESSAGE_STATUS.LEAVE,
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

    
    const sendPrivateValueWithData=(action,data)=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.UserID,
            receiverName:sessionID,
            status:MESSAGE_STATUS.MESSAGE,
            action:action,
            data:JSON.stringify(data)
          };
         
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
         
        }
    }

    const sendPrivateValue=(action)=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.userName,
            receiverName:sessionID,
            status:MESSAGE_STATUS.MESSAGE,
            action:action
          };
         
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }
    
    const sendPrivateCommand=(action)=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.userName,
            receiverName:sessionID,
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
            receiverName:sessionID,
            status:MESSAGE_STATUS.COMMAND,
            action:action,
            data:JSON.stringify(data)
          };
         
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget.parentNode;
        
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
         
          setValidated(true);
        }else{
            
            sendPrivateValueWithData(ACTION_TYPE.SUBMIT,responseData)
        }
       
       
      };

    function onInput(qid,value){
        setResponseData({key:qid,value:value})
        
    }

    
    
    function rendering(){
        if(roomState.isSubscribe&&roomState.isConnect){
            if(votingState.clientRenderMethod!== undefined && renderData !== {}){
                if(votingState.clientRenderMethod === CLIENT_RENDER_METHOD.VOTING){
                   
                    
                    return(
                        <>  
                            <h4>User Area:</h4>
                            <Form noValidate validated={validated}>
                                <RealTimeVotingElementDict data={JSON.parse(renderData)} qid={votingState.currentQuestion}
                                validated={validated} parentFunction={onInput} savedFormData={{}} curPart={''}/>
                                <Button onClick={handleSubmit} >Submit</Button>
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
    
    

    function votingStateDisplayer(){
        return(
            <>
            <h3>Voting State:</h3>
            <h4>Clien Render Method: {votingState.clientRenderMethod}</h4>
            <h4>Current Question: {votingState.currentQuestion}</h4>
            <h4>User State: {votingState.participantSubmit+" / "+votingState.participantJoin}</h4>
            <h4>Current Link to : {votingState.passcode}</h4>
            </>
            
        )

    }

    function adminControlPlatform(){
        return(
            <>
            <h4>Admin Action : </h4> 
            <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.CLEAR)}>Clear Data</Button>
            <Button onClick={()=>sendPrivateCommandWithData(ACTION_TYPE.CREATEGROUP,{surveyID:surveyID,surveyFormat:items})}>Create Room</Button>
            <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.REMOVEGROUP)}>Remove Room</Button>
            <br></br>
            <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.SHOWRESULT)}>Show result</Button>
            <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.NEXTQUESTION)}>Next question</Button>
            <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.VOTINGEND)}>End Voting</Button>
            </>
        )
    }  
    if(ready){
       
        return (
        <>
            
            {roomState.isConnect?
            <><h3>You Are : {userData.UserID}</h3>
            <h3>Permission : {userData.permission}</h3></>:
                ''
            }
            
            <h3>Connect : {roomState.isConnect?'true':'false'}</h3> 
            <h3>Subscribe : {roomState.isSubscribe?'true':'false'}</h3> 

        
            
            <h4>User Action : </h4> 
            {roomState.isConnect?
                <Button onClick={()=>disconnect()}>Disconnect</Button>:
                <Button onClick={()=>connect()}>Connect</Button>
            }
            {!roomState.isConnect?'':
                roomState.isSubscribe?
                <Button onClick={()=>unSubscribe()}>Leave room</Button>:
                <Button onClick={()=>subscribe()}>Join room</Button>
            }
            {roomState.isSubscribe?
                votingStateDisplayer():''    
            }
           
            {roomState.isConnect?
                adminControlPlatform():''
            }
            <br></br>
            {rendering()}

            
            
        </>
        )
    }
    
}

export default RealTimeVotingRoom
