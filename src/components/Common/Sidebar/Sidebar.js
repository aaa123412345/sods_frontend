
import React from "react";

import './Sidebar.css';

import SidebarChoice from './SidebarChoice/SidebarChoice';
import SidebarDropdown from './SidebarDropdown/SidebarDropdown';

//Json to sidebar

//have format requirnment in json

const Sidebar = ({data,setDisplay}) =>  {

    return (
        <div className="sidenav" style={{display: setDisplay?'block':'none', color:'black'}}>
            {data.navdata.map((data,index) => data["child"].length == 0? 
            <SidebarChoice data={data} key={"sidebar-choice-"+index} />:
            <SidebarDropdown data={data}  key={"sidebar-choice-"+index} sindex={index}/>)}
        </div>
    )
    
}






export default Sidebar;