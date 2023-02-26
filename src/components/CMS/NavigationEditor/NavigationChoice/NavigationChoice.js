import React from "react";
import { useState } from "react";


const NavigationChoice = ({data,mode}) => {
    const [toggle,setToggle] = useState(false)
    
    function childNode(){
       
        if(data.child.length>0&&toggle){
            return(
                data.child.map((data,index) => <NavigationChoice data={data} key={"nav-edit-bar-choice-child-"+index} mode='child'/>)
               
            )
        }
    }

    return(
        <>
                   
                <div style={{ paddingLeft:"15px", borderLeft:"dotted black 3px"}}>
                    {data.navName}
                    {mode === 'parent'?childNode():''}
                </div>
           
        </>   
    )
}

export default NavigationChoice;

