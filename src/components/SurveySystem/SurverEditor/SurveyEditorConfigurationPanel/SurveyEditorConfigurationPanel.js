import React from "react";
import SECOverall from "./SECOverall";
import SECPartSetting from "./SECPartSetting";
import SECElement from "./SECElement";
import SECPlaceholder from "./SECPlaceholder";

const ComponentDict = {
    overall:SECOverall,
    part:SECPartSetting,
    element:SECElement,
    none:SECPlaceholder
}

const SurveyEditorConfigurationPanel = ({surveyData,configData,configType,updateConfig}) => {
    return (
        <div className="h1" style={{color:"black"}}>
            Setting
            <div className="pl-3">
                
                { React.createElement(ComponentDict[configType], {
                key: "Configuration-"+configType+"-Panel",
                surveyData:surveyData,
                configData:configData,
                updateConfig:updateConfig
                })}
                
            </div>
        </div>
    )
}

export default SurveyEditorConfigurationPanel