import React from "react";

import NavbarDropdown from "../CusNavbarDropdown/CusNavbarDropdown";
import NavChoice from "../CusNavbarChoice/CusNavbarChoice";

const CusNavbarbuilder = ({data}) =>  {

   

    const navd = data.data.navdata
    const lang = data.lang
    /*
    {data.navdata.map((data,index) => data["child"].length == 0? 
            <NavChoice data={data} lang={lang} key={"navbar-choice-"+index} />:
            <NavbarDropdown data={data} lang={lang} key={"navbar-dropdown-"+index} sindex={index}/>)}
    */
    return (
        <>
             {navd.map((data,index) => data["child"].length == 0? 
            <NavChoice data={data} lang={lang} key={"navbar-choice-"+index} />:
            <NavbarDropdown data={data} lang={lang} key={"navbar-dropdown-"+index} sindex={index}/>)}
        </>
    )
    
}
export default CusNavbarbuilder;