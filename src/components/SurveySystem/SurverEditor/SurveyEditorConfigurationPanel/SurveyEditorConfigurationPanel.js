import React,{useEffect,useState} from "react";
import SECOverall from "./SECOverall";
import SECElement from "./SECElement";
import SECPlaceholder from "./SECPlaceholder";


const ComponentDict = {
    overall:SECOverall,
    element:SECElement,
    none:SECPlaceholder
}

const SurveyEditorConfigurationPanel = ({surveyData,configData,configType,updateConfig,cancelConfig,autoSaveCurConfig }) => {
    const [ready,setReady] = useState(false);
    
    useEffect(()=>{
        setReady(true)
    },[configData])

    if(ready){
        return (
            <div className="h1" style={{color:"black"}}>
                Setting
                <div className="pl-3">
                    
                    { React.createElement(ComponentDict[configType], {
                    key: "Configuration-"+configType+"-Panel",
                    surveyData:{...surveyData},
                    configData:{...configData},
                    updateConfig:updateConfig,
                    cancelConfig:cancelConfig,
                    autoSaveCurConfig:autoSaveCurConfig
                    })}
                    
                </div>
            </div>
        )
    }
}

export default SurveyEditorConfigurationPanel