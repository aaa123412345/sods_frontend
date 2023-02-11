import React, { useEffect, useState,useContext  } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {UserContext} from "../../../App"

import { Button } from 'react-bootstrap';

var stompClient =null;
const sessionID = "ABCDEF"


const MESSAGE_STATUS = {
    JOIN:"JOIN",
    LEAVE:"LEAVE",
    MESSAGE:"MESSAGE",
    COMMAND:"COMMAND",
    ERROR:"ERROR"
}

const ACTION_TYPE = {
    ADD:"ADD",
    MINUS:"MINUS",
    CLEAR:"CLEAR",
    SYNCHRONIZATION:"SYNCHRONIZATION",
    NONE:"NONE",
    CREATEGROUP:"CREATEGROUP",
    REMOVEGROUP:"REMOVEGROUP",
    FORCEUNSUBSCRIBE:"FORCEUNSUBSCRIBE"
}

const RealTimeVotingRoom = () => {
    const [roomState, setRoomState] = useState({
        isConnect:false,
        isSubscribe:false,
        isJoin:false,
        participantSubmit:0,
        participantJoin:0
    })
    const [clickCount,setClickCount] = useState(0)
    const {user,clearLoginState} = useContext(UserContext)
    const [userData, setUserData] = useState({
        userName: '',
        receiverName: '',
        data: '',
        status:'',
        action:'',
        permission:[]

      });
   

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
        setUserData({...userData,"userName":validatedUserData.UserName,"permission":validatedUserData.Permission})
        setRoomState({...roomState,"isConnect":true})
        
    }
    const subscribe = () =>{
        stompClient.subscribe('/user/'+sessionID+'/private', onPrivateMessage);
        setRoomState({...roomState,"isSubscribe":true});
        userJoin();
       
       
    } 

 

    const unSubscribe = () => {
        userLeave();
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
        setClickCount(data.clickCount)
        setRoomState({...roomState,
            "participantSubmit":data.participantSubmit,"participantJoin":data.participantJoin,"isSubscribe":true})
    }

    const onError = (err) => {
        console.log(err);
        
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

    
    function userControlPlatform(){
        return(
            <>
             <h4>User Data : </h4> 
            <Button onClick={()=>sendPrivateValue(ACTION_TYPE.ADD)}>+ 1</Button>
            <Button onClick={()=>sendPrivateValue(ACTION_TYPE.MINUS)}>- 1</Button>
            </>
        )
    }

    function adminControlPlatform(){
        return(
            <>
            <h4>Admin Action : </h4> 
        <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.CLEAR)}>Clear Data</Button>
        <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.CREATEGROUP)}>Create Room</Button>
        <Button onClick={()=>sendPrivateCommand(ACTION_TYPE.REMOVEGROUP)}>Remove Room</Button>
            </>
        )
    }  

    return (
    <>
        <h1>Current Link to : {sessionID}</h1>
        {roomState.isConnect?
           <><h3>You Are : {userData.userName}</h3>
           <h3>Permission : {userData.permission}</h3></>:
            ''
        }
        
        <h3>Connect : {roomState.isConnect?'true':'false'}</h3> 
        <h3>Subscribe : {roomState.isSubscribe?'true':'false'}</h3> 

        {roomState.isSubscribe?<>
        <h3>User Join : {roomState.participantJoin}</h3>
        <h3>User Submit : {roomState.participantSubmit}</h3>
        <h3>Click Count : {clickCount}</h3> 
        </>:''}
        
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
            userControlPlatform():''    
        }
        {roomState.isConnect?
            adminControlPlatform():''
        }
        
    </>
    )
    /*
    <div className="container">
            {userData.connected?
            <div className="chat-box">
                <div className="member-list">
                    <ul>
                        <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                        {[...privateChats.keys()].map((name,index)=>(
                            <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
                {tab==="CHATROOM" && <div className="chat-content">
                    <ul className="chat-messages">
                        {publicChats.map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                <div className="message-data">{chat.message}</div>
                                {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                        <button type="button" className="send-button" onClick={sendValue}>send</button>
                    </div>
                </div>}
                {tab!=="CHATROOM" && <div className="chat-content">
                    <ul className="chat-messages">
                        {[...privateChats.get(tab)].map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                <div className="message-data">{chat.message}</div>
                                {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                            </li>
                        ))}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                        <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                    </div>
                </div>}
            </div>
            :
            <div className="register">
                <input
                    id="user-name"
                    placeholder="Enter your name"
                    name="userName"
                    value={userData.username}
                    onChange={handleUsername}
                    margin="normal"
                />
                <button type="button" onClick={registerUser}>
                        connect
                </button> 
            </div>}
        </div>
    */
}

export default RealTimeVotingRoom
