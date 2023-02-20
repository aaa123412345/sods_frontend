import React from "react";
import { useEffect,useState,useContext } from "react";
import { Col, Row, Button,Modal } from "react-bootstrap";
import useSendRequest from "../../../hooks/useSendRequest";
import {UserContext} from '../../../App'
import QRCode from "react-qr-code";

const BookingClientDetailed = () => {
    const fontSize = "2vw"

    const [initHookActive,setInitHookAcive] = useState(false)
    const [checkHookActive,setCheckHookActive] = useState(false)
    const [showQRCode, setShowQRCode] = useState(false)

    const [isJoin,setIsJoin] = useState(false)
    const {user} = useContext(UserContext)

    const [activityId, setActivityId] = useState('')
    const [userActionState,setUserActionState] = useState({
        method:'',
        active:false
    })


    const init = 
    useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+'booking_activity_information/'+activityId,'get',{},initHookActive)

    const checkJoin =
    useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+'user_arrive_data/client/'+activityId,'get',{},checkHookActive)
    
    const userAction = 
    useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+'user_arrive_data/client/'+activityId, 
    userActionState.method,{},userActionState.active)


    const urlParams = new URLSearchParams(window.location.search);

    function QRCodeModel(){
        return(
            <Modal show={showQRCode} onHide={()=>{setShowQRCode(false)}}>
            <Modal.Header closeButton>
              <Modal.Title>Activity QR Code (For Checker)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <QRCode value={"/user_arrive_data/"+activityId+"/"+user.userId} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%",marginLeft:'auto',marginRight:'auto' }} 
                    viewBox={`0 0 256 256`}></QRCode>
            </Modal.Body>
            
          </Modal>
        )
    }

    useEffect(()=>{
        if(user.token !== ''){
            setCheckHookActive(true)
        }
    },[])

    useEffect(()=>{
        if(activityId === ''){
            if(urlParams.has('activityId')){
                setActivityId(urlParams.get('activityId'))
            }else{
                alert("Missing value. You should not go this page with the href directily.")
                window.location.href = "/public/eng/booking_manager"
            }
           
        }else{
            setInitHookAcive(true)
        }
       
    },[activityId])

    useEffect(()=>{
        if(!userAction.isLoaded && userActionState.active){
            if(userAction.ready){
                if(userActionState.method==='post'){
                    alert("Join Activity Success")
                    setIsJoin(true)
                    setUserActionState({
                        ...userActionState,
                        active:false
                    })
                }else if(userActionState.method==='delete'){
                    alert("Leave Activity Success")
                    setIsJoin(false)
                    setUserActionState({
                        ...userActionState,
                        active:false
                    })
                }
            }
        }
    },[userAction])

    useEffect(()=>{
        if(!checkJoin.isLoaded && checkHookActive){
            if(checkJoin.ready){
                setIsJoin(true)
                setCheckHookActive(false)
            }else if(checkJoin.errMsg !== ''){
                setIsJoin(false)
                setCheckHookActive(false)
            }

        }
    },[checkJoin])

    function joinActivity(){
        setUserActionState({
            method:'post',
            active:true
        })
    }

    function leaveActivity(){
        setUserActionState({
            method:'delete',
            active:true
        })
    }

    if(!init.isLoaded){
        if(!isJoin.isLoaded && isJoin.ready){
            setIsJoin(true)
        }
        if(init.ready ){
           
            return(
                <>
                    <div style={{width:"70%"}}>
                        <Row>
                            <Col md={6}>
                                <h3 style={{fontSize:fontSize}}>Title:</h3>
                            </Col>
                            <Col md={6}>
                                <h3 style={{fontSize:fontSize}}>{init.items.title}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h3 style={{fontSize:fontSize}}>Content:</h3>
                            </Col>
                            <Col md={6}>
                                <p id="textcontent">
                                    {init.items.content}
                                </p>
                            </Col>
                        </Row>   
                        <Row>
                            <Col>
                                <h3 style={{fontSize:fontSize}}>{"Quote: ("+init.items.currentNum+"/"+init.items.maxQuote+")"}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h3 style={{fontSize:fontSize}}>Start Time:</h3>
                            </Col>
                            <Col md={6}>
                                <h3 style={{fontSize:fontSize}}>{init.items.startTime}</h3>
                            </Col>
                        </Row> 
                        <Row>
                            <Col md={6}>
                                <h3 style={{fontSize:fontSize}}>End Time:</h3>
                            </Col>
                            <Col md={6}>
                                <h3 style={{fontSize:fontSize}}>{init.items.endTime}</h3>
                            </Col>
                        </Row> 
                        <Row>
                            <div style={{width:"33%"}}>
                                <Button onClick={joinActivity} disabled={user.token === ''?true:isJoin}>Join</Button>
                            </div>
                            <div style={{width:"33%"}}>
                                <Button onClick={leaveActivity} disabled={user.token === ''?true:!isJoin}>Leave</Button>
                            </div>
                            <div style={{width:"33%"}}>
                                <Button onClick={()=> setShowQRCode(true)} disabled={user.token === ''?true:!isJoin}>QR Code</Button>
                            </div>
                        </Row>
                    </div>  
                    {QRCodeModel()}   
                </>
            )
        }
    }
}

export default BookingClientDetailed;