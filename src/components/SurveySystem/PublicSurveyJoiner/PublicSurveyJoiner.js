import ActiveSurveyPublicCardViewer from "../ActiveSurveyPubilcCardViewer/ActiveSurveyPubilcCardViewer";
import React from "react";
import { Tabs,Tab } from "react-bootstrap";

const PublicSurveyJoiner = () =>{


    return(
        <Tabs
            defaultActiveKey="survey"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="survey" title="Survey" >
                <ActiveSurveyPublicCardViewer/>
            </Tab>
            <Tab eventKey="voting" title="Voting" ></Tab>
        </Tabs>
        
    )
}

export default PublicSurveyJoiner;