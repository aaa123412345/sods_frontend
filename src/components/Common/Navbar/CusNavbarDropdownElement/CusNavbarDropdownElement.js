import React from "react";
import { NavDropdown } from "react-bootstrap";

import {useContext} from "react"
import {UserContext} from '../../../../App'
import AuthHandler from "../../AuthHandler/AuthHandler";

const CusNavbarDropdownElement = ({data}) => {
    const {user} = useContext(UserContext)
   
    return(
        <>
        {
            AuthHandler(data.auth,user)?
            <NavDropdown.Item href={data.path}>{data.navName}</NavDropdown.Item>
            :''
        }
        </>
        

    )
}

export default CusNavbarDropdownElement;