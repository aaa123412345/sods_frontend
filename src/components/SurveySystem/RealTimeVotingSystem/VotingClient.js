import React, { useEffect,useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import { useState } from "react";
import { Button,Tabs,Tab,Form, Row, Col, } from "react-bootstrap";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import RealTimeVotingElementDict from "./RealTimeVotingElementDict";
import RealTimeVotingResultDisplayer from "./RealTimeVotingResultDisplayer";
import useSendRequest from "../../../hooks/useSendRequest";


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
    

    const urlParams = new URLSearchParams(window.location.search);

    const [showSubmitBtn,setShowSubmitBtn] = useState(true);


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

    const [checkSubmitActive,setCheckSubmitActive] = useState(false)
    const checkSubmit = useSendRequest(process.env.REACT_APP_VOTING_SYSTEM_HOST+'/checkSubmit/'+passCode,'get',{},checkSubmitActive)
    
    const [checkPasscodeActive,setCheckPasscodeActive] = useState(false)
    const checkPasscode = useSendRequest(process.env.REACT_APP_VOTING_SYSTEM_HOST+'/passcode/'+passCode,'get',{},checkPasscodeActive,true)
   
    
    /*UseEffect*/
    useEffect(()=>{
        if(user.token!== ''){
            if(urlParams.has('passCode')){
                if(passCode===''){
                    setPassCode(urlParams.get('passCode'))
                }else{
                    setCheckPasscodeActive(true)
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

    useEffect(()=>{
        if(!checkPasscode.isLoaded&&checkPasscodeActive){
            if(checkPasscode.ready){
                setCheckPasscodeActive(false)
                setCheckSubmitActive(true)
                connect()
            }else if(checkPasscode.errMsg!==""){
                alert(checkPasscode.errMsg)
            }
        }
    },[checkPasscode])

    useEffect(()=>{
        if(!checkSubmit.isLoaded&&checkSubmitActive){
            if(checkSubmit.ready){

                if('isSubmit' in checkSubmit.items){
                    setShowSubmitBtn(!checkSubmit.items.isSubmit)
                }

                setCheckSubmitActive(false)
            }else if(checkSubmit.errMsg!==""){
                alert(checkPasscode.errMsg)
            }
        }
    },[checkSubmit])

    /*
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
*/
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
        alert("Connect Success")
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
        alert("Voting End, Thank you.")
        window.location.href("public/eng/survey_list")
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
            //console.log(data.renderData)
           setRenderData(data.renderData)
        }
        if('clientRenderMethod' in data){
            if(data.clientRenderMethod === CLIENT_RENDER_METHOD.SHOWRESULT){
                setShowSubmitBtn(true)
            }
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
            setShowSubmitBtn(false)
            sendPrivateValueWithData(ACTION_TYPE.SUBMIT,responseData)
        }
       
       
      };

    function onInput(qid,value){
        setResponseData({key:qid,value:value})
        
    }
    /*
    React Component Group
    */
    function rendering(){
        if(roomState.isSubscribe && checkSubmit.ready){
            if(votingState.clientRenderMethod!== undefined && renderData !== {}){
                if(votingState.clientRenderMethod === CLIENT_RENDER_METHOD.VOTING){     
                    return(
                        <>  
                            <h4>User Area:</h4>
                            <Form noValidate validated={validated}>
                                <RealTimeVotingElementDict data={JSON.parse(renderData)} qid={votingState.currentQuestion}
                                validated={validated} parentFunction={onInput} savedFormData={{}} curPart={''}/>
                                {showSubmitBtn?
                                <Button onClick={handleSubmit} className="mt-3">Submit</Button>:
                                "You Are Submitted"
                                }
                                
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