import React from "react";
import Nav from 'react-bootstrap/Nav';

const CusNavbarChoice = ({data,lang}) => {

   
    return(
        <Nav.Link href={data.path[lang]}>{data.navName[lang]}</Nav.Link>

    )
}

export default CusNavbarChoice;