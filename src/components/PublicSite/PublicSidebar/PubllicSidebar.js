import navbardata from '../../../testData/testNavbar.json'
import React from "react";

import { NavLink } from 'react-router-dom';
import Sidebar from '../../Common/Sidebar/Sidebar' 





const PublicSidebar = props =>  {
    return generator(props)
    
}

function generator(props){
    
    return(
        <Sidebar/>
    )
}



export default PublicSidebar;