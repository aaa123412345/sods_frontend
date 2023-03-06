
import React from "react";

import NavigationChoice from "./NavigationChoice/NavigationChoice";
import { faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip} from "react-bootstrap";

const NavigationTree = ({data, configNode, addNode, removeNode,configNodeData,swapNode}) =>  {

    
    if(data.navdata !== undefined){
        var size = data.navdata.length;
    
        return (
           
            <div style={{border:"solid black 3px"}}>
                RootNode
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{"Add children"}</Tooltip>}>
                                <FontAwesomeIcon icon={faSquarePlus} onClick={()=>{addNode(-1)}}></FontAwesomeIcon>
                </OverlayTrigger>
                <div style={{ paddingLeft:"15px"}}> 
                    {data.navdata.map((data,index) => <NavigationChoice data={data} index={index} sindex={-1} 
                    addNode={addNode} removeNode={removeNode} swapNode={swapNode}
                    configNode={configNode} configNodeData={configNodeData} key={"nav-edit-bar-choice-"+index} mode='parent' max={size}/>)}
                </div>
            </div>
        )
    }
    
}






export default NavigationTree;