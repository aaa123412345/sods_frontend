import React from "react";
import Nav from 'react-bootstrap/Nav';

const CusNavbarChoice = ({data}) => {

   
    return(
        <Nav.Link href={data.path}>{data.navName}</Nav.Link>

    )
}

export default CusNavbarChoice;