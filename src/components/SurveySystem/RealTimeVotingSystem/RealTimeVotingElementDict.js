import React from "react";

import SurveySelector from "../SurveyBuilder/SurveySelector/SurveySelector";
import SurveyRadio from "../SurveyBuilder/SurveyRadio/SurveyRadio";
import SurveyCheckbox from "../SurveyBuilder/SurveyCheckbox/SurveyCheckbox";
import SurveyRange from "../SurveyBuilder/SurveyRange/SurveyRange";
import SurveyTextfield from "../SurveyBuilder/SurverTextfield/SurveyTextfield";

const Components = {
    stext:SurveyTextfield,
    sselect:SurveySelector,
    sradio:SurveyRadio,
    schecker:SurveyCheckbox,
    srange:SurveyRange,
 
  };
  
 const RealTimeVotingElementDict = ({data,qid,parentFunction,validated,savedFormData,curPart}) => {
    var tkey = data.type+qid.toString()

    if (typeof Components[data.type] !== "undefined") {
      return React.createElement(Components[data.type], {
        key: tkey,
        data: data,
        qid: qid,
        parentFunction: parentFunction,
        validated:validated,
        savedFormData:savedFormData,
        curPart:curPart
        
      });
    }
    return React.createElement(
      () => <div>The component {data.type} has not been created yet.</div>,
      { key: tkey }
    );
  };

  export default RealTimeVotingElementDict;