import React from "react";
import SurveyTextfield from "./SurverTextfield/SurveyTextfield";
import SurveySelector from "./SurveySelector/SurveySelector";
import SurveyRadio from "./SurveyRadio/SurveyRadio";
import SurveyCheckbox from "./SurveyCheckbox/SurveyCheckbox";
import SurveyRange from "./SurveyRange/SurveyRange";

const Components = {
    stext:SurveyTextfield,
    sselect:SurveySelector,
    sradio:SurveyRadio,
    schecker:SurveyCheckbox,
    srange:SurveyRange
  };
  
 const SurveyElementDict = ({data,qid,parentFunction}) => {
    var tkey = data.type+qid.toString()
    if (typeof Components[data.type] !== "undefined") {
      return React.createElement(Components[data.type], {
        key: tkey,
        data: data,
        qid: qid,
        parentFunction: parentFunction
      });
    }
    return React.createElement(
      () => <div>The component {data.type} has not been created yet.</div>,
      { key: tkey }
    );
  };

  export default SurveyElementDict;