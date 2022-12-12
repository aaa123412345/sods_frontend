import React from "react";

import {FaAngleDown} from "react-icons/fa"
import {FaAngleUp} from "react-icons/fa"
import { useState } from "react";

import SidebarChoice from '../SidebarChoice/SidebarChoice'



const SidebarDropdown = ({data,lang,sindex}) => {
    const [toggle,setToggle] = useState(false)
    const iconStyle = {display: 'inline'}
    return(
        <>
        <button className="dropdown-btn" onClick={() => setToggle(!toggle)}>
            {data.navName[lang]}
            <span style= {{float:'right'}}>
                {toggle? <FaAngleUp style= {iconStyle} />:<FaAngleDown style= {iconStyle}/>}
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