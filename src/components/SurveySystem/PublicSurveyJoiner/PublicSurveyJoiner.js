import ActiveSurveyPublicCardViewer from "../ActiveSurveyPubilcCardViewer/ActiveSurveyPubilcCardViewer";
import React, { useState,useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import { Tabs,Tab,Form,Button } from "react-bootstrap";

const PublicSurveyJoiner = () =>{
    const [passCode,setPassCode] = useState('');
    const {user,clearLoginState} = useContext(UserContext)
   


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
            </>
        )
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
            </Tab>
        </Tabs>
        
    )
}

export default PublicSurveyJoiner;