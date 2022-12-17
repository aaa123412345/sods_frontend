import React from "react";


import { useState } from "react";

import SidebarChoice from '../SidebarChoice/SidebarChoice'
import { faAngleUp,faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const SidebarDropdown = ({data,lang,sindex}) => {
    const [toggle,setToggle] = useState(false)
    const iconStyle = {display: 'inline'}
    return(
        <>
        <button className="dropdown-btn" onClick={() => setToggle(!toggle)}>
            {data.navName[lang]}
            <span style= {{float:'right'}}>
                {toggle?
                <FontAwesomeIcon icon={faAngleUp} />:
                <FontAwesomeIcon icon={faAngleDown} />
                }
            </span>
        </button>

        {toggle? <div className="dropdown-container">
            {data.child.map((data,index)=> <SidebarChoice data={data} lang={lang} key={"sidebar-choice-"+sindex+"-"+index}/> )}
           
        </div>:<span/>
       
        }
        </>
    )
}

export default SidebarDropdown;