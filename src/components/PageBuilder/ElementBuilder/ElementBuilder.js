import React,{lazy} from "react";

const CImage = React.lazy(()=>import("../../Common/LayoutElement/CImage/CImage"))
const CMultipleText = React.lazy(()=>import("../../Common/LayoutElement/CMultipleText/CMultipleText"))
const CText = React.lazy(()=>import("../../Common/LayoutElement/CText/CText"))
const CVideo = React.lazy(()=>import("../../Common/LayoutElement/CVideo/CVideo"))
const CResposiveTable = React.lazy(()=>import("../../Common/LayoutElement/CResposiveTable/CResposiveTable"))

const TourGuideCanvas = React.lazy(()=>import("../../TourGuideCanvas/TourGuideCanvas"))
const ARTreasureEditor = React.lazy(()=>import("../../ARTreasureEditor/ARTreasureEditor"))
const LoginPage = React.lazy(()=>import("../../LoginSystem/LoginPage"))
const LogoutPage = React.lazy(()=>import("../../LoginSystem/LogoutPage"))

const SurveyEditor = React.lazy(()=>import("../../SurveySystem/SurverEditor/SurverEditor"))
const SurveyManager = React.lazy(()=>import("../../SurveySystem/SurverManager/SurveyManager"))
const SurveyLoader = React.lazy(()=>import("../../SurveySystem/SurveyLoader"))
const ActiveSurveyConfigPanel = React.lazy(()=>import("../../SurveySystem/ActiveSurveyConfigPanel/ActiveSurveyConfigPanel"))
const ActiveSurveyManager = React.lazy(()=>import("../../SurveySystem/ActiveSurverManager/ActiveSurveyManager"))
const PublicSurveyJoiner = React.lazy(()=>import("../../SurveySystem/PublicSurveyJoiner/PublicSurveyJoiner"))

const VotingAdmin = React.lazy(()=>import("../../SurveySystem/RealTimeVotingSystem/VotingAdmin"))
const VotingClient = React.lazy(()=>import("../../SurveySystem/RealTimeVotingSystem/VotingClient"))
const VotingSelector = React.lazy(()=>import("../../SurveySystem/RealTimeVotingSystem/VotingSelector"))

const BookingActivityEditor = React.lazy(()=>import("../../BookingSystem/Admin/BookingActivityEditor"))
const BookingAdminManager = React.lazy(()=>import("../../BookingSystem/Admin/BookingAdminManager"))
const BookingClientManager = React.lazy(()=>import("../../BookingSystem/Client/BookingClientManager"))
const BookingClientDetailed = React.lazy(()=>import("../../BookingSystem/Client/BookingClientDetailed"))

const Crush = React.lazy(()=>import("../../MiniGame/Crush/Crush"))
const Snake = React.lazy(()=>import("../../MiniGame/Snake/snake"))

const NavigationEditor = React.lazy(()=>import("../../CMS/NavigationEditor/NavigationEditor"))
const LanguageEditor = React.lazy(()=>import("../../CMS/LanguageEditor/LanguageEditor"))
const FileManager = React.lazy(()=>import("../../CMS/FTP/FileManager"))
const PageEditor = React.lazy(()=>import("../../CMS/PageEditor/PageEditor"))

/*
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
*/

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

  navigationEditor:NavigationEditor,
  languageEditor:LanguageEditor,
  fileManager:FileManager,
  pageEditor:PageEditor,

  crushgame:Crush,
  snakegame:Snake,

  
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