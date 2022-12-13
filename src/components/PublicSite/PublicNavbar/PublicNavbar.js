
import React from "react";

import CusNavbar from "../../Common/Navbar/CusNavbar/CusNavbar";
import navbardata from '../../../testData/testNavbar.json'

const PublicNavbar = props =>  {
    var lang = 'chi'

    return(
        <CusNavbar data={navbardata} lang={lang} />
    )
    
}

export default PublicNavbar;