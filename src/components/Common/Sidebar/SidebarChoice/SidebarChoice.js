import React,{useContext} from "react";
import {Link} from 'react-router-dom'

import {UserContext} from '../../../../App'
import AuthHandler from "../../AuthHandler/AuthHandler";

const SidebarChoice = ({data}) => {
    const {user} = useContext(UserContext)
    
    return(
        <>
            {AuthHandler(data.auth,user)?<Link to={data.path}>{data.navName}</Link>:''}
        </>
        
       
    )
}

export default SidebarChoice;

