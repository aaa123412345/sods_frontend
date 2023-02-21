import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import CryptoJS from 'crypto-js';
import { Modal,Button } from 'react-bootstrap';
import useSendRequest from '../../../hooks/useSendRequest';

import welcomeSound from "../../../assets/sound/interface-welcome-131917.mp3"

const qrScannerDefault = {
  qr:{border:"solid black 5px"},
  text:{backgroundColor:"black",
       height:"100px"}
  
}

const qrScannerLoad = {
  qr:{border:"solid brown 5px"},
  text:{backgroundColor:"brown",
       height:"100px"}
  
}

const qrScannerSuccess = {
  qr:{border:"solid green 5px"},
  text:{backgroundColor:"green",height:"100px"}
}

const qrScannerFailed = {
  qr:{border:"solid red 5px"},
  text:{backgroundColor:"red",height:"100px"}
}

const stateToMsg = {
  "free":"Ready to Scan",
  "success":"Welcome",
  "error":"Invalid QR Code",
  "loading":"loading . . ."
}

const BookingChecker = () =>{
    const [state, setState] = useState('free');
    const [data,setData] = useState({})
    const [start,setStart] = useState(false)
    const [showQRScanner,setShowQRScanner] = useState(false)

    const [activity, setActivity] = useState('')
    const [sound,setSound] = useState(false)
    const [errMsg,setErrMsg] = useState('')

    const [checkHookState,setCheckHookState] = useState({
      activityId:"",
      userID:"",
      active:false
    })
    const checkHook = useSendRequest(process.env.REACT_APP_BOOKING_SYSTEM_HOST+
      'user_arrive_data/'+checkHookState.activityId+'/'+checkHookState.userID
    ,"put",{},checkHookState.active)

    
    
    useEffect(()=>{
      if(!checkHook.isLoaded && checkHookState.active && state === "loading"){
        
        if(checkHook.ready){
         
          setState("success")

        }else if(checkHook.errMsg != ""){
          
          setState("error")
          setErrMsg(checkHook.errMsg)

        }
        console.log(checkHook)
      }
      
    },[checkHook])
    

    useEffect(()=>{
      if(state==="loading" && checkHookState.active === false){
        console.log(data)
        setTimeout(()=>{
          setCheckHookState({
          activityId:data.activityId,
          userID:data.userID,
          active:true
        })
        },500)
        

        
        
      }

      if(state ==="success"){
        if(sound){
          new Audio(welcomeSound).play()
        }
      }
     
      if(state === "success" || state === "error" ){
        
        setTimeout(()=>{
          setData({})
          setState("free")
          setErrMsg('')
          setCheckHookState({
            activityId:"",
            userID:"",
            active:false
          })
         
        },2000)
      }

      
    },[state])

    function setDataWithCrypto(data){
      if(state === "free"){
        var tmpData = ""
        var key = process.env.REACT_APP_QR_CODE_KEY
        

        try{
            var bytes0  = CryptoJS.AES.decrypt(data, key);
            tmpData = bytes0.toString(CryptoJS.enc.Utf8);
            if(tmpData!==""){
              
              var obj = JSON.parse(tmpData)
              if("activityId" in obj && "userID" in obj){
                  
                  if(activity=== ""){
                    setData(JSON.parse(tmpData))
                    setState('loading')
                  }else{
                    if(obj.activityId === activity){
                      setData(JSON.parse(tmpData))
                      setState('loading')
                    }else{
                      setState('error')
                      setErrMsg('Activity ID Error')
                    }
                  }
                 
                  
              }else{
                  setState('error')
                  setErrMsg('Format Error')
              }
              
            }


        }catch(e){
            setState("error")
            setErrMsg('Format Error')
        }
      }
    }

   

    function QRCodeScannerModel(){
        function QRCodeScannerStyle(mode){
          if(state === "free"){
            return qrScannerDefault[mode]
          }else if(state === "success"){
            return qrScannerSuccess[mode]
          }else if(state === "error"){
            return qrScannerFailed[mode]
          }else if(state === "loading"){
            return qrScannerLoad[mode]
          }
        }  
       
      if(start){ 
          return(
              <Modal show={showQRScanner} onHide={()=>{setShowQRScanner(false)}}>
              <Modal.Header closeButton>
              <Modal.Title>{activity===''?'Any Activity':'Activity ID: '+activity}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={QRCodeScannerStyle("qr")}>
                    <QrReader
                    onResult={(result, error) => {
                      if (!!result) {
                        setDataWithCrypto(result?.text);
                      }
            
                      if (!!error) {
                        //console.info(error);
                      }
                    }}
                    
                    
                  />
                </div>
                <div style={QRCodeScannerStyle("text")}>\
                  <span style={{color:"white",textAlign:"center",fontSize:"2em",marginLeft: "auto",marginRight: "auto"}}>
                      {stateToMsg[state]}
                  </span><br></br>
                  <span style={{color:"white",textAlign:"center",fontSize:"1em",marginLeft: "auto",marginRight: "auto"}}>
                      {state === "error"?errMsg:''}
                  </span>
                </div>
              </Modal.Body>
              
              
          </Modal>
          )
      }
    }

    function startScanner(){
        setStart(true)
        setShowQRScanner(true)
    }

    return (
        <>
          <h1>
            Activity Checker
          </h1>

          <h6>Activity ID: (Null for no activity requirnment)</h6>
          <input type="text" onChange={(e)=>{setActivity(e.target.value)}}></input> <br></br>
          <h6>Use Welcome Sound?</h6>
          <input type="checkbox" onChange={()=>{setSound(!sound)}}></input> <br></br>
         
           
          {QRCodeScannerModel()}
           
          <Button onClick={startScanner}>Start Scanner</Button>
        </>
      );
}

export default BookingChecker