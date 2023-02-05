import React from "react";
import {Tabs,Tab} from 'react-bootstrap';

import SurveyTable from "../SurveyTable/SurveyTable";
import ActiveSurveyManager from "../ActiveSurverManager/ActiveSurveyManager";

const SurveyManager = (props) => {
    
    return(
        <Tabs
        defaultActiveKey="designed"
        id="uncontrolled-tab-example"
        className="mb-3"
        >
        <Tab eventKey="designed" title="Designed Survey">
            <SurveyTable />
        </Tab>
        <Tab eventKey="actived" title="Actived Survey">
            <ActiveSurveyManager />
        </Tab>
        
        </Tabs>
    )


}
export default SurveyManager;