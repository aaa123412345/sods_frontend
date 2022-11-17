
import React from "react";

import Sidebar from '../../Common/Sidebar/Sidebar' 
import navbardata from '../../../testData/testNavbar.json'

const PublicSidebar = props =>  {
    var lang = 'chi'

    
    return(
        <Sidebar data={navbardata} lang={lang} />
    )
    
}

export default PublicSidebar;