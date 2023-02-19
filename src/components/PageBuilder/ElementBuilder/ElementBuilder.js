import React from "react";
import CImage from "../../Common/LayoutElement/CImage/CImage";
import CMultipleText from "../../Common/LayoutElement/CMultipleText/CMultipleText";
import CText from "../../Common/LayoutElement/CText/CText";
import CVideo from "../../Common/LayoutElement/CVideo/CVideo";

import SurveyEditor from "../../SurveySystem/SurverEditor/SurverEditor";
import CResposiveTable from "../../Common/LayoutElement/CResposiveTable/CResposiveTable";
import TourGuideCanvas from "../../TourGuideCanvas/TourGuideCanvas";
import ARTreasureEditor from "../../ARTreasureEditor/ARTreasureEditor";
import LoginPage from "../../LoginSystem/LoginPage";
import SurveyManager from "../../SurveySystem/SurverManager/SurveyManager";
import ActiveSurveyConfigPanel from "../../SurveySystem/ActiveSurveyConfigPanel/ActiveSurveyConfigPanel";
import ActiveSurveyManager from "../../SurveySystem/ActiveSurverManager/ActiveSurveyManager";

import SurveyLoader from "../../SurveySystem/SurveyLoader";
import VotingAdmin from "../../SurveySystem/RealTimeVotingSystem/VotingAdmin";
import VotingClient from "../../SurveySystem/RealTimeVotingSystem/VotingClient";
import VotingSelector from "../../SurveySystem/RealTimeVotingSystem/VotingSelector";
import PublicSurveyJoiner from "../../SurveySystem/PublicSurveyJoiner/PublicSurveyJoiner";
import LogoutPage from "../../LoginSystem/LogoutPage";

const Components = {
  ctext: CText,
  cimage: CImage,
  cvideo: CVideo,
  cmultipletext: CMultipleText,
  ctourguide: TourGuideCanvas,
  cartreasureeditor: ARTreasureEditor,
  surveyeditor: SurveyEditor,
  crestable:CResposiveTable,
  cloginpage:LoginPage,
  surveymanager:SurveyManager,
  activeSurveyConfigPanel:ActiveSurveyConfigPanel,
  activeSurveyManager:ActiveSurveyManager,
  surveyUserJoiner:PublicSurveyJoiner,
  survey:SurveyLoader,
  votingAdmin:VotingAdmin,
  votingClient:VotingClient,
  votingSelector:VotingSelector,
  logoutPage:LogoutPage
};

export default block => {
  var tkey = block.data.rank.toString()+block.data.subrank.toString()+block.data.type
  if (typeof Components[block.data.type] !== "undefined") {
    return React.createElement(Components[block.data.type], {
      key: tkey,
      block: block.data,
      path:block.path,
      subpath:block.subpath,
      keyPass : tkey,
      lang:block.lang
    });
  }
  return React.createElement(
    () => <div>The component {block.data.type} has not been created yet.</div>,
    { key: tkey }
  );
};