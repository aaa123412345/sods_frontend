import ActiveSurveyPublicCardViewer from "../ActiveSurveyPubilcCardViewer/ActiveSurveyPubilcCardViewer";
import React, { useState,useContext } from "react";
import { UserContext } from "../../../App";
import { Tabs,Tab,Form,Button,Modal } from "react-bootstrap";
import { QrReader } from "react-qr-reader";

const PublicSurveyJoiner = () =>{
    const [passCode,setPassCode] = useState('');
    const {user,clearLoginState} = useContext(UserContext)
    const [showQRScanner,setShowQRScanner] = useState(false)
    
   

    const redirect = () => {
        window.location.href = "/public/eng/vote_client?passCode="+passCode;
    }

    function VotingConnector(){
        return(
            <>
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
        <Button className="mt-2" onClick={redirect}> Connect Group</Button>
        <Button className="mt-2" onClick={()=>{setShowQRScanner(true)}}> QRCode Scanner</Button>
        </>
        )
    }

    function checkAndRedirect(data){
        var tmpCode = data.substring(data.length-6)
        var autoRedirect = true
        for (const c of tmpCode){
            if(!(c>='A'&&c<='Z')){
                autoRedirect = false
                break;
            }
        }
        if(autoRedirect){
            window.location.href = "/public/eng/vote_client?passCode="+tmpCode;
        }
    }

    function QRCodeScannerModel(){
        if(showQRScanner){
            return(
                <Modal show={showQRScanner} onHide={()=>{setShowQRScanner(false)}}>
                <Modal.Header closeButton>
                <Modal.Title>{"QR Code Scanner"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            checkAndRedirect(result?.text)

                        }
            
                        if (!!error) {
                        //console.info(error);
                        }
                    }}
                    
                    
                    />
                
                
                </Modal.Body>
            </Modal>
            )
        }
    
  }

    return(
        <Tabs
            defaultActiveKey="survey"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="survey" title="Survey" >
                <ActiveSurveyPublicCardViewer/>
            </Tab>
            <Tab eventKey="voting" title="Voting" >
                {VotingConnector()}
                {QRCodeScannerModel()}
            </Tab>
        </Tabs>
        
    )
}

export default PublicSurveyJoiner;