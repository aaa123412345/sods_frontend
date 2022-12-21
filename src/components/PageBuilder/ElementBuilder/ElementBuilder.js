import React from "react";
import CImage from "../../Common/LayoutElement/CImage/CImage";
import CMultipleText from "../../Common/LayoutElement/CMultipleText/CMultipleText";
import CText from "../../Common/LayoutElement/CText/CText";
import CVideo from "../../Common/LayoutElement/CVideo/CVideo";
import SurveySystem from "../../SurveySystem/SurveySystem";
import SurveyEditor from "../../SurveySystem/SurverEditor/SurverEditor";
import CResposiveTable from "../../Common/LayoutElement/CResposiveTable/CResposiveTable";
import TourGuideCanvas from "../../TourGuideCanvas/TourGuideCanvas";

const Components = {
  ctext: CText,
  cimage: CImage,
  cvideo: CVideo,
  cmultipletext: CMultipleText,
  ctourguide: TourGuideCanvas,
  survey: SurveySystem,
  surveyeditor: SurveyEditor,
  crestable:CResposiveTable
};

export default block => {
  var tkey = block.data.rank.toString()+block.data.subrank.toString()+block.data.type
  if (typeof Components[block.data.type] !== "undefined") {
    return React.createElement(Components[block.data.type], {
      key: tkey,
      block: block.data,
      path:block.path,
      subpath:block.subpath
    });
  }
  return React.createElement(
    () => <div>The component {block.data.type} has not been created yet.</div>,
    { key: tkey }
  );
};