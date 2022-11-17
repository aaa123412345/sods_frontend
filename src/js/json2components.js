import React from "react";
import CImage from "../components/PublicSite/CImage/CImage";
import CMultipleText from "../components/PublicSite/CMultipleText/CMultipleText";
import CText from "../components/PublicSite/CText/CText";
import CVideo from "../components/PublicSite/CVideo/CVideo";

const Components = {
  ctext: CText,
  cimage: CImage,
  cvideo: CVideo,
  cmultipletext: CMultipleText
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