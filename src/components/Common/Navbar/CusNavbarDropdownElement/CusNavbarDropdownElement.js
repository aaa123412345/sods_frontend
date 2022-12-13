import React from "react";
import { NavDropdown } from "react-bootstrap";

const CusNavbarDropdownElement = ({data,lang}) => {

   
    return(
        <NavDropdown.Item href={data.path[lang]}>{data.navName[lang]}</NavDropdown.Item>

    )
}

export default CusNavbarDropdownElement;