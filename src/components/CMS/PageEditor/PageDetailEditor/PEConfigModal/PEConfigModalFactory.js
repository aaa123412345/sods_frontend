
import React from "react";
import PEConfigText from "./PEConfigComponent/PEConfigText"
import PEConfigImage from "./PEConfigComponent/PEConfigImage";
import PEConfigVideo from "./PEConfigComponent/PEConfigVideo";
import PEConfigTable from "./PEConfigComponent/PEConfigTable";
import PEConfigMultipleText from "./PEConfigComponent/PEConfigMultipleText";

const ElementDictionary = {
    'ctext': PEConfigText,
    'cimage': PEConfigImage,
    'cvideo': PEConfigVideo,
    'crestable': PEConfigTable,
    'cmultipletext': PEConfigMultipleText
}

const PEConfigModalFactory = ({type,editData,command}) => {
    if (typeof ElementDictionary[type] !== "undefined") {
        return React.createElement(ElementDictionary[type], {
          key: type + "-config-in-page-editor",
          keyPass : type+ "-config-in-page-editor",
          editData:editData,
          command:command
        });
      }
      return React.createElement(
        () => <div>The component {type} has not been created yet.</div>,
        { key: type + "-config-in-page-editor" }
      );
}

export default PEConfigModalFactory