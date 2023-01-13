import React from "react";


import { useState,useContext } from "react";

import SidebarChoice from '../SidebarChoice/SidebarChoice'
import { faAngleUp,faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {UserContext} from '../../../../App'
import AuthHandler from "../../AuthHandler/AuthHandler";




const SidebarDropdown = ({data,sindex}) => {
    const user = useContext(UserContext)
    const [toggle,setToggle] = useState(false)
    
    const iconStyle = {display: 'inline'}
    if(AuthHandler(data.auth,user)){
        return(
            <>
            <button className="dropdown-btn" onClick={() => setToggle(!toggle)}>
                {data.navName}
                <span style= {{float:'right'}}>
                    {toggle?
                    <FontAwesomeIcon icon={faAngleUp} />:
                    <FontAwesomeIcon icon={faAngleDown} />
                    }
                </span>
            </button>

            {toggle? <div className="dropdown-container">
                {data.child.map((data,index)=> <SidebarChoice data={data} key={"sidebar-choice-"+sindex+"-"+index}/> )}
            
            </div>:<span/>
        
            }
            </>
        )
    }else{
        return(<></>)
    }
}

export default SidebarDropdown;