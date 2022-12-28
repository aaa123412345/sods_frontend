import React from "react";
import { NavDropdown } from "react-bootstrap";

const CusNavbarDropdownElement = ({data}) => {

   
    return(
        <NavDropdown.Item href={data.path}>{data.navName}</NavDropdown.Item>

    )
}

export default CusNavbarDropdownElement;