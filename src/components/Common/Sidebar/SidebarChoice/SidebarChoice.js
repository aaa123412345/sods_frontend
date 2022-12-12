import React from "react";
import {Link} from 'react-router-dom'

const SidebarChoice = ({data,lang}) => {

   
    return(
        <Link to={data.path[lang]}>{data.navName[lang]}</Link>
       
    )
}

export default SidebarChoice;

