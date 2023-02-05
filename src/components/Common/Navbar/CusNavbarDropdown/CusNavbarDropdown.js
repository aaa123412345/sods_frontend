import React from "react";
import { NavDropdown } from "react-bootstrap";
import CusNavbarDropdownElement from "../CusNavbarDropdownElement/CusNavbarDropdownElement";

import {useContext} from "react"
import {UserContext} from '../../../../App'
import AuthHandler from "../../AuthHandler/AuthHandler";


const CusNavbarDropdown = ({data,sindex}) => {
    
    const {user} = useContext(UserContext)

 
        return(
            <>
            {
                AuthHandler(data.auth,user)?
                    <NavDropdown title={data.navName} id="navbarScrollingDropdown">
                    {data.child.map((Element,index) => <CusNavbarDropdownElement data={Element}  key={"navbar-dropdown-"+sindex.toString()+"-element-"+index.toString()}></CusNavbarDropdownElement>)}
                    </NavDropdown>
                :''
            }
            </>
        )
    
}

export default CusNavbarDropdown;