import React from "react";
import CImage from "../../Common/LayoutElement/CImage/CImage";
import CMultipleText from "../../Common/LayoutElement/CMultipleText/CMultipleText";
import CText from "../../Common/LayoutElement/CText/CText";
import CVideo from "../../Common/LayoutElement/CVideo/CVideo";

import TourGuideCanvas from "../../TourGuideCanvas/TourGuideCanvas";

const Components = {
  ctext: CText,
  cimage: CImage,
  cvideo: CVideo,
  cmultipletext: CMultipleText,
  ctourguide: TourGuideCanvas
};

export default block => {
  var tkey = block.rank.toString()+block.subrank.toString()+block.type
  if (typeof Components[block.type] !== "undefined") {
    return React.createElement(Components[block.type], {
      key: tkey,
      block: block
    });
  }
  return React.createElement(
    () => <div>The component {block.type} has not been created yet.</div>,
    { key: tkey }
  );
};