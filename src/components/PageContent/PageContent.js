import React from "react";
import Components from "../../components";
import contentdata from '../../testData/test.json'

const PageContent = (props) => (
    <div className="PageContent">
        
    {contentdata.map(block => Components(block))}
  </div>
)

export default PageContent;


  

  

