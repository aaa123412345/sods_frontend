import React from "react";


const SidebarChoice = ({data,lang}) => {

   
    return(
        <a href={data.path[lang]}>{data.navName[lang]}</a>
    )
}

export default SidebarChoice;

