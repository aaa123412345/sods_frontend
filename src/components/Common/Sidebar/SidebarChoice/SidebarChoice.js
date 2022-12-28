import React from "react";
import {Link} from 'react-router-dom'

const SidebarChoice = ({data}) => {

   
    return(
        <Link to={data.path}>{data.navName}</Link>
       
    )
}

export default SidebarChoice;

