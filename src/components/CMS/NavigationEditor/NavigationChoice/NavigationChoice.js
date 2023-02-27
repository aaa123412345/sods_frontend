import React from "react";
import { useState } from "react";

import { faSquarePlus, faSquarePen, faSquareCaretDown,faSquareCaretUp, faSquareMinus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip} from "react-bootstrap";


const NavigationChoice = ({data,mode, configNode, addNode, removeNode, index,sindex,configNodeData}) => {
    const [toggle,setToggle] = useState(false)
    
    function childNode(){
       
        if(data.child.length>0&&toggle){
            return(
                data.child.map((data,i) => <NavigationChoice data={data} addNode={addNode} index={index} sindex={i} configNodeData={configNodeData}
                configNode={configNode} removeNode={removeNode} key={"nav-edit-bar-choice-"+index+"-child-"+i} mode='child'/>)
            )
        }
    }

    function toggleBtn(){
        if(mode === 'parent'){
            if(data.child.length>0){
                return(
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{"Add children"}</Tooltip>}>
                        <FontAwesomeIcon icon={!toggle?faSquareCaretDown:faSquareCaretUp} style={{paddingLeft:'5px'}}
                        onClick={()=>{setToggle(!toggle)}}></FontAwesomeIcon>
                    </OverlayTrigger>
                )
            }
        }
        
    }

    return(
        <>
                   
                <div style={{ paddingLeft:"15px",paddingRight:"15px", borderLeft:"dashed black 1px"}}>
                     {data.navName}
                     
                     {toggleBtn()}
                     {configNodeData.index === index && configNodeData.sindex === sindex?
                     <span style={{fontWeight:"bold"}}>{" (Selected)"}</span>:""}

                    <span style={{float:'right'}}>
                        
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{"Remove This"}</Tooltip>}>
                                <FontAwesomeIcon icon={faSquareMinus} style={{paddingLeft:'5px'}} onClick={()=>{removeNode(index,sindex)}}></FontAwesomeIcon>
                        </OverlayTrigger>

                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{"Add children"}</Tooltip>}>
                                <FontAwesomeIcon icon={faSquarePlus} style={{paddingLeft:'5px'}} onClick={()=>{addNode(index)}}></FontAwesomeIcon>
                        </OverlayTrigger>

                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{"Edit"}</Tooltip>}>
                                <FontAwesomeIcon icon={faSquarePen} style={{paddingLeft:'5px'}} onClick={()=>{configNode(index,sindex)}}></FontAwesomeIcon>
                        </OverlayTrigger>
                        
                    </span>
                    
                       
                    
                    {mode === 'parent'?childNode():''}
                </div>
           
        </>   
    )
}

export default NavigationChoice;

