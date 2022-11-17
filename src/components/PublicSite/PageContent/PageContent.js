import React from "react";
import Components from "../../../js/json2components";
import contentdata from '../../../testData/testContent.json'

const PageContent = (props) => (
    <div className="PageContent">
        
    {contentdata.map(block => Components(block))}
  </div>
)

export default PageContent;


  

  

