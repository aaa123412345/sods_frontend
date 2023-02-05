import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Navigate } from "react-router-dom";

import {useContext} from "react"
import {UserContext} from '../../../../App'
import AuthHandler from "../../AuthHandler/AuthHandler";

const CusNavbarChoice = ({data}) => {
    const {user} = useContext(UserContext)
        
        //<Nav.Link href={data.path} onClick={a}>{data.navName}</Nav.Link>
        return(
            <>
            {AuthHandler(data.auth,user)?
               <Nav.Link href={data.path} >{data.navName}</Nav.Link>
                :''
            }

                
            </>
        )
  
}

export default CusNavbarChoice;