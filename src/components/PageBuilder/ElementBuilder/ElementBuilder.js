import React from "react";
import CImage from "../../Common/LayoutElement/CImage/CImage";
import CMultipleText from "../../Common/LayoutElement/CMultipleText/CMultipleText";
import CText from "../../Common/LayoutElement/CText/CText";
import CVideo from "../../Common/LayoutElement/CVideo/CVideo";
import CResposiveTable from "../../Common/LayoutElement/CResposiveTable/CResposiveTable";

//Special Component
import TourGuideCanvas from "../../TourGuideCanvas/TourGuideCanvas";
import LoginPage from "../../LoginSystem/LoginPage";
import LogoutPage from "../../LoginSystem/LogoutPage";

import SurveyEditor from "../../SurveySystem/SurverEditor/SurverEditor";
import SurveyManager from "../../SurveySystem/SurverManager/SurveyManager";
import SurveyLoader from "../../SurveySystem/SurveyLoader";
import ActiveSurveyConfigPanel from "../../SurveySystem/ActiveSurveyConfigPanel/ActiveSurveyConfigPanel";
import ActiveSurveyManager from "../../SurveySystem/ActiveSurverManager/ActiveSurveyManager";
import PublicSurveyJoiner from "../../SurveySystem/PublicSurveyJoiner/PublicSurveyJoiner";

import VotingAdmin from "../../SurveySystem/RealTimeVotingSystem/VotingAdmin";
import VotingClient from "../../SurveySystem/RealTimeVotingSystem/VotingClient";
import VotingSelector from "../../SurveySystem/RealTimeVotingSystem/VotingSelector";

import BookingActivityEditor from "../../BookingSystem/Admin/BookingActivityEditor";
import BookingAdminManager from "../../BookingSystem/Admin/BookingAdminManager";
import BookingClientManager from "../../BookingSystem/Client/BookingClientManager";
import BookingClientDetailed from "../../BookingSystem/Client/BookingClientDetailed";


const Components = {
  ctext: CText,
  cimage: CImage,
  cvideo: CVideo,
  cmultipletext: CMultipleText,
  ctourguide: TourGuideCanvas,
  surveyeditor: SurveyEditor,
  crestable:CResposiveTable,

  cloginpage:LoginPage,
  logoutPage:LogoutPage,

  surveyUserJoiner:PublicSurveyJoiner,
  survey:SurveyLoader,
  surveyeditor: SurveyEditor,
  surveymanager:SurveyManager,
  activeSurveyConfigPanel:ActiveSurveyConfigPanel,
  activeSurveyManager:ActiveSurveyManager,
  
  votingAdmin:VotingAdmin,
  votingClient:VotingClient,
  votingSelector:VotingSelector,
  
  bookingActivityEditor:BookingActivityEditor,
  bookingAdminManager:BookingAdminManager,
  bookingClientManager:BookingClientManager,
  bookingClientDetailed:BookingClientDetailed,
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