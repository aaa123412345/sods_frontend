import React from "react";
import SurveyTextfield from "./SurverTextfield/SurveyTextfield";
import SurveySelector from "./SurveySelector/SurveySelector";
import SurveyRadio from "./SurveyRadio/SurveyRadio";
import SurveyCheckbox from "./SurveyCheckbox/SurveyCheckbox";
import SurveyRange from "./SurveyRange/SurveyRange";
import SurveyPartHeader from "./SurverPartHeader/SurverPartHeader";

const Components = {
    stext:SurveyTextfield,
    sselect:SurveySelector,
    sradio:SurveyRadio,
    schecker:SurveyCheckbox,
    srange:SurveyRange,
    sparttips:SurveyPartHeader
  };
  
 const SurveyElementDict = ({data,qid,parentFunction,validated,savedFormData,curPart}) => {
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

  export default SurveyElementDict;