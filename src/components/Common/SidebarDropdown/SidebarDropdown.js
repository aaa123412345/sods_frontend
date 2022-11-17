import React from "react";

import {FaAngleDown} from "react-icons/fa"
import {FaAngleUp} from "react-icons/fa"

import { useState } from "react";

const SidebarDropdown = (props) => {
    const [toggle,setToggle] = useState(false)

    return(
        <>
        <button className="dropdown-btn" onClick={() => setToggle(!toggle)}>Dropdown 
        {toggle? <FaAngleUp/>:<FaAngleDown/> }
        
        
        </button>
        {toggle? <div className="dropdown-container">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>:<span/>
       
        }
        </>
    )
}

export default SidebarDropdown;