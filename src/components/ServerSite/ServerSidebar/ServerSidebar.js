import React from "react";

import Sidebar from '../../Common/Sidebar/Sidebar' 
import serverNavData from '../../../testData/testServerSidebar.json'

const ServerSidebar = props =>  {
    var lang = 'chi'

    
    return(
        <Sidebar data={serverNavData} lang={lang} />
    )
    
}

export default ServerSidebar;