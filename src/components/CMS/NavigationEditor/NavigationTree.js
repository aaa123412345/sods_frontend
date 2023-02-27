
import React from "react";

import NavigationChoice from "./NavigationChoice/NavigationChoice";
import { faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip} from "react-bootstrap";

const NavigationTree = ({data, configNode, addNode, removeNode,configNodeData}) =>  {

    
    if(data.navdata !== undefined){
        
    
        return (
           
            <div style={{border:"solid black 3px"}}>
                RootNode
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{"Add children"}</Tooltip>}>
                                <FontAwesomeIcon icon={faSquarePlus} onClick={()=>{addNode(-1)}}></FontAwesomeIcon>
                </OverlayTrigger>
                <div style={{ paddingLeft:"15px"}}> 
                    {data.navdata.map((data,index) => <NavigationChoice data={data} index={index} sindex={-1} addNode={addNode} removeNode={removeNode}
                    configNode={configNode} configNodeData={configNodeData} key={"nav-edit-bar-choice-"+index} mode='parent'/>)}
                </div>
            </div>
        )
    }
    
}






export default NavigationTree;