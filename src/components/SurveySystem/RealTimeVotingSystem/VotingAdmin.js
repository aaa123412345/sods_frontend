import React, { useEffect,useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import { useState } from "react";
import { Button,Tabs,Tab,Form, } from "react-bootstrap";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

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
                subscribe();
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
            }else{
                alert("You should go this page with the surveyID")
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
                    <Form.Label className="mt-2">Pass Code :</Form.Label><br></br>
                    <Form.Control
                    type="text"
                    id="text"
                    onChange={(event)=>setPassCode(event.target.value)}     
                />
                <Button className="mt-2" onClick={checkPasscodeAndConnect}> Connect Group</Button>
            </Tab>

        )
    }

    function votingControlPlatform(){
        return( <Tab eventKey="actived" title="Voting State">




            
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
                votingControlPlatform():''}

               
                
                
                
                
            </Tabs>
               
            </>
        )
    }

}


export default VotingAdmin;