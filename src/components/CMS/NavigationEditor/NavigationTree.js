
import React from "react";

import NavigationChoice from "./NavigationChoice/NavigationChoice";


const NavigationTree = ({data}) =>  {

    
    if(data.navdata !== undefined){
        console.log(data.navdata)
        console.log(typeof data.navdata)
    
        return (
           
            <div style={{border:"solid black 3px"}}>
                RootNode
                <div style={{ paddingLeft:"15px"}}> 
                    {data.navdata.map((data,index) => <NavigationChoice data={data} key={"nav-edit-bar-choice-"+index} mode='parent'/>)}
                </div>
            </div>
        )
    }
    
}






export default NavigationTree;