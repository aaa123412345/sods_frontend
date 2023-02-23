import React, { useEffect,useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import { useState } from "react";
import { Button,Tabs,Tab,Form, Row, Col, } from "react-bootstrap";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import RealTimeVotingElementDict from "./RealTimeVotingElementDict";
import RealTimeVotingResultDisplayer from "./RealTimeVotingResultDisplayer";


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


const VotingClient = () => {
    
    const {user,clearLoginState} = useContext(UserContext)
    const [passCode,setPassCode] = useState('')
    
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
    



    const checkPasscodeAndConnect=async()=>{ 
        const { data } = await axios({
                method: 'get',
                url: process.env.REACT_APP_VOTING_SYSTEM_HOST+'/passcode/'+passCode,
                headers:{'token':user.token}
        })
            
            if(data.code===200){
                //connect
                alert("Connect Success")
                connect();
                
            }
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

        subscribe()
        
    }

    const subscribe = () =>{
        
            stompClient.subscribe('/user/'+passCode+'/private', onPrivateMessage);
            setRoomState({"isConnect":true,"isSubscribe":true});
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
    
    const sendPrivateValueWithData=(action,data)=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.UserID,
            receiverName:passCode,
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
            receiverName:passCode,
            status:MESSAGE_STATUS.MESSAGE,
            action:action
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

    useEffect(()=>{
        if(user.token!== ''){
            if(urlParams.has('passCode')){
                if(passCode===''){
                    setPassCode(urlParams.get('passCode'))
                }else{
                checkPasscodeAndConnect();

                }
            }else{
                alert("You shoulld go these page with valid Passcode.")
                window.location.href = "/public/eng/survey_list"
            }
        }else{
            alert("You should go this page with login state.")
            window.location.href = "/user/eng/login"
           
        }
        
        
         
    },[passCode])

    /*
    React Component Group
    */
  
    

    function rendering(){
        if(roomState.isSubscribe){
            if(votingState.clientRenderMethod!== undefined && renderData !== {}){
                if(votingState.clientRenderMethod === CLIENT_RENDER_METHOD.VOTING){     
                    return(
                        <>  
                            <h4>User Area:</h4>
                            <Form noValidate validated={validated}>
                                <RealTimeVotingElementDict data={JSON.parse(renderData)} qid={votingState.currentQuestion}
                                validated={validated} parentFunction={onInput} savedFormData={{}} curPart={''}/>
                                <Button onClick={handleSubmit} className="mt-3">Submit</Button>
                            </Form>
                            
                        </>
                    
                    )
                }else if(votingState.clientRenderMethod === CLIENT_RENDER_METHOD.SHOWRESULT){
                    return(
                        <> 
                            <h3>Current Question:</h3> 
                            {votingState.currentQuestionMsg}
                            <RealTimeVotingResultDisplayer data={JSON.parse(renderData)}></RealTimeVotingResultDisplayer>
                        </>
                       
                    )
                }
            }
        }
    }

    
    

    

   
        return(
            <>
            {rendering()}
               
            </>
        )
    

}


export default  VotingClient;