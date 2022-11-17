import navbardata from '../../../testData/testNavbar.json'
import React from "react";

import './Sidebar.css';

import SidebarChoice from '../SidebarChoice/SidebarChoice';
import SidebarDropdown from '../SidebarDropdown/SidebarDropdown';

const Sidebar = props =>  {
    
    return (
        <div className="sidenav">
            <SidebarChoice/>
            <SidebarDropdown/>
        </div>
    )
    
}





export default Sidebar;