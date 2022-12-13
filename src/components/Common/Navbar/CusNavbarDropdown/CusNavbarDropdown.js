import React from "react";
import { NavDropdown } from "react-bootstrap";
import CusNavbarDropdownElement from "../CusNavbarDropdownElement/CusNavbarDropdownElement";




const CusNavbarDropdown = ({data,lang,sindex}) => {
    
/*
 <NavDropdown title={data.Navname[lang]} id="navbarScrollingDropdown">
              {data.child.map(Element => <CusNavbarDropdownElement data={Element} lang={lang}></CusNavbarDropdownElement>)}
            </NavDropdown>
*/

    return(
        <>
           <NavDropdown title={data.navName[lang]} id="navbarScrollingDropdown">
              {data.child.map((Element,index) => <CusNavbarDropdownElement data={Element} lang={lang} key={"navbar-dropdown-"+sindex.toString()+"-element-"+index.toString()}></CusNavbarDropdownElement>)}
            </NavDropdown>
        </>
    )
}

export default CusNavbarDropdown;